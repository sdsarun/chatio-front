"use client";

// core
import { usePathname, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";

// components
import { Button } from "@/core/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/core/components/ui/card";
import { Separator } from "@/core/components/ui/separator";
import { Alert, AlertDescription } from "@/core/components/ui/alert";

export type FormSignInProps = {
  callbackUrl?: string;
  errorMessage?: string;
};

export default function FormSignIn({ callbackUrl, errorMessage }: FormSignInProps) {
  const router = useRouter();
  const pathname = usePathname()

  const [internalErrorMessage, setInternalErrorMessage] = useState<string | undefined>(errorMessage);
  const [socialSignInLoading, setSocialSignInLoading] = useState<string | null>(null);
  const [isGuestSignInPending, startGuestSignInPending] = useTransition();

  const handleSocialSignIn = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const providerName = event.currentTarget.name;
    setSocialSignInLoading(providerName);
    await signIn(providerName, { redirect: !!callbackUrl, redirectTo: callbackUrl });
  };

  const handleCredentialSignIn = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const providerName = event.currentTarget.name;
    startGuestSignInPending(async () => {
      const signInError = await signIn(providerName, { redirect: !!callbackUrl, redirectTo: callbackUrl });
      if (!signInError) {
        return router.refresh();
      }

      if (signInError?.code) {
        setInternalErrorMessage(signInError.code);
        router.replace(pathname.concat(`?code=${encodeURIComponent(signInError.code)}`));
      }
    });
  };

  return (
    <Card className="w-full max-w-md mx-5 sm:mx-auto md:max-w-md lg:max-w-lg xl:max-w-lg rounded-md">
      <CardHeader>
        <CardTitle className="flex flex-col gap-4">
          {internalErrorMessage && (
            <Alert variant="destructive">
              <AlertDescription>{internalErrorMessage}</AlertDescription>
            </Alert>
          )}
          <h1>Welcome to ChatIO</h1>
        </CardTitle>
        <CardDescription>
          Sign in to your account and start chatting with strangers!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Button
          name="google"
          className="w-full font-semibold"
          variant={"outline"}
          size={"lg"}
          onClick={handleSocialSignIn}
          isLoading={socialSignInLoading === "google"}
        >
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="block">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
            <path fill="none" d="M0 0h48v48H0z" />
          </svg>
          Continue with Google
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col justify-between gap-4">
        <div className="flex items-center gap-4 w-full">
          <Separator className="flex-1" />
          <span className="text-muted-foreground text-sm">or</span>
          <Separator className="flex-1" />
        </div>
        <Button
          name="guest-credential"
          className="w-full font-semibold"
          size={"lg"}
          onClick={handleCredentialSignIn}
          isLoading={isGuestSignInPending}
        >
          Continue as Guest
        </Button>
      </CardFooter>
    </Card>
  );
}
