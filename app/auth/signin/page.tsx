import FormSignIn from "@/features/auth/components/form-signin";

import type { PageProps } from "@/core/types/next";

export type SignInPageProps = PageProps<undefined, {
  callbackUrl?: string;
  code?: string;
}>

export default async function SignInPage({
  searchParams
}: SignInPageProps) {
  const { callbackUrl, code } = await searchParams;

  return (
    <main className="flex-1 flex justify-center items-center">
      <FormSignIn
        callbackUrl={callbackUrl}
        errorMessage={code}
      />
    </main>
  );
}
