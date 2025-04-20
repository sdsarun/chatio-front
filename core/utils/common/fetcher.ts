export default function fetcherFactory(
  baseURL?: string,
  options?: {
    defaultHeaders?: Record<string, string>;
    timeout?: number; // Default timeout for all requests
    log?: boolean; // Enable logging globally
  }
) {
  const { defaultHeaders = {}, timeout: defaultTimeout, log: globalLog = false } = options ?? {};

  const formattedBaseURL = baseURL?.endsWith("/") ? baseURL : `${baseURL}/`;

  return async function (
    url: string,
    requestOptions?: RequestInit & {
      params?: string[][] | Record<string, any> | string | URLSearchParams;
      timeout?: number; // timeout for this specific request
      log?: boolean; // enable logging per request
    }
  ): Promise<Response> {
    const {
      params,
      timeout: requestTimeout,
      log = globalLog,
      ...requestInitOptions
    } = requestOptions ?? {};

    // Build the URL safely using baseURL and params
    const formattedURL: string = url.startsWith("/") ? url.slice(1) : url;
    const requestURL = new URL(formattedURL, formattedBaseURL);

    if (params) {
      const searchParams = new URLSearchParams(params);
      requestURL.search = searchParams.toString();
    }

    // Merge default headers with user-defined headers
    const headers = {
      "Content-Type": "application/json", // Default Content-Type
      ...defaultHeaders, // Default headers from factory
      ...(requestInitOptions.headers || {}), // User-defined headers
    };

    // Setup fetch options
    const finalOptions: RequestInit = {
      ...requestInitOptions,
      headers,
    };

    // Handle timeout with AbortController
    const controller = new AbortController();
    const effectiveTimeout = requestTimeout ?? defaultTimeout;

    let timeoutId: NodeJS.Timeout | undefined;

    if (effectiveTimeout) {
      timeoutId = setTimeout(() => controller.abort(), effectiveTimeout);
      finalOptions.signal = controller.signal;
    }

    // Log request details if log is enabled
    if (log) {
      console.log("Request:", {
        method: finalOptions.method || "GET",
        url: requestURL.toString(),
        headers,
        body: finalOptions.body,
        timeout: effectiveTimeout,
      });
    }

    const response = await fetch(requestURL.toString(), finalOptions);

    // Clear timeout after successful fetch
    if (timeoutId) clearTimeout(timeoutId);

    // Throw an error if the response status is not OK
    if (!response.ok) {
      console.error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    // Log response details if log is enabled
    if (log) {
      console.log("Response:", response.status);
    }

    return response;
  };
}