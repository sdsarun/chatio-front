"use client";

// core
import { useRouter } from "next/navigation";
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
  error?: string;
};

export default function FormSignIn({ callbackUrl, error }: FormSignInProps) {
  const router = useRouter();

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
      await signIn(providerName, { redirect: !!callbackUrl, redirectTo: callbackUrl });
      router.refresh();
    });
  };

  return (
    <Card className="w-[448px]">
      <CardHeader>
        <CardTitle className="flex flex-col gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <h1>Welcome to ChatIO</h1>
        </CardTitle>
        <CardDescription>Sign in to your account and start chatting with strangers!</CardDescription>
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
        <Button
          name="discord"
          className="w-full font-semibold"
          variant={"outline"}
          size={"lg"}
          onClick={handleSocialSignIn}
          isLoading={socialSignInLoading === "discord"}
          hidden
        >
          <svg
            id="Discord-Logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 126.644 96"
            width="100"
            height="100"
          >
            <defs>
              <style>{`.cls-1{fill:#5865F2;}`}</style>
            </defs>
            <path
              id="Discord-Symbol-Blurple"
              className="cls-1"
              d="M81.15,0c-1.2376,2.1973-2.3489,4.4704-3.3591,6.794-9.5975-1.4396-19.3718-1.4396-28.9945,0-.985-2.3236-2.1216-4.5967-3.3591-6.794-9.0166,1.5407-17.8059,4.2431-26.1405,8.0568C2.779,32.5304-1.6914,56.3725.5312,79.8863c9.6732,7.1476,20.5083,12.603,32.0505,16.0884,2.6014-3.4854,4.8998-7.1981,6.8698-11.0623-3.738-1.3891-7.3497-3.1318-10.8098-5.1523.9092-.6567,1.7932-1.3386,2.6519-1.9953,20.281,9.547,43.7696,9.547,64.0758,0,.8587.7072,1.7427,1.3891,2.6519,1.9953-3.4601,2.0457-7.0718,3.7632-10.835,5.1776,1.97,3.8642,4.2683,7.5769,6.8698,11.0623,11.5419-3.4854,22.3769-8.9156,32.0509-16.0631,2.626-27.2771-4.496-50.9172-18.817-71.8548C98.9811,4.2684,90.1918,1.5659,81.1752.0505l-.0252-.0505ZM42.2802,65.4144c-6.2383,0-11.4159-5.6575-11.4159-12.6535s4.9755-12.6788,11.3907-12.6788,11.5169,5.708,11.4159,12.6788c-.101,6.9708-5.026,12.6535-11.3907,12.6535ZM84.3576,65.4144c-6.2637,0-11.3907-5.6575-11.3907-12.6535s4.9755-12.6788,11.3907-12.6788,11.4917,5.708,11.3906,12.6788c-.101,6.9708-5.026,12.6535-11.3906,12.6535Z"
            />
          </svg>
          Continue with Discord
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
          Continues with Guest
        </Button>
      </CardFooter>
    </Card>
  );
}
