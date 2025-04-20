export type Params = Record<string, string | string[] | undefined>;
export type SearchParams = Record<string, string | string[] | undefined>;

export type PageProps<P = Params, S = SearchParams> = {
  params: Promise<P>;
  searchParams: Promise<S>;
};

export type LayoutProps<P = Params> = {
  children: React.ReactNode;
  params: Promise<P>;
};

export type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};