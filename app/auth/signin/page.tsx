import FormSignIn from "@/features/auth/components/form-signin";

import type { PageProps } from "@/core/types/next";

export type SignInPageProps = PageProps<undefined, {
  callbackUrl?: string;
  error?: string;
}>

export default async function SignInPage({
  searchParams
}: SignInPageProps) {
  const { callbackUrl, error } = await searchParams;

  return (
    <div className="flex-1 flex justify-center items-center">
      <FormSignIn
        callbackUrl={callbackUrl}
        error={error}
      />
    </div>
  );
}
