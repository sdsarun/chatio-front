"use client";

import React from "react";
import Link from "next/link";

// components
import { Button } from "@/core/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/core/components/ui/card";

export default function AuthErrorPage() {
  return (
    <main className="flex-1 flex justify-center items-center px-4">
      <Card className="w-full max-w-md mx-auto rounded-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold text-destructive">
            Oops, something went wrong.
          </CardTitle>
          <CardDescription className="text-center text-sm text-muted-foreground">
            We couldn&apos;t sign you in. Please try again in a few moments. If the issue persists, please contact support.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col gap-4">
          <Link href="/auth/signin" replace>
            <Button className="w-full" size="lg">
              Try Again
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
