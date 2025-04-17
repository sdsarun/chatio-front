"use client"

// core
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import * as yup from "yup";

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
import { Form, FormField, FormItem } from "@/core/components/ui/form";
import { Separator } from "@/core/components/ui/separator";
import { Alert, AlertDescription } from '@/core/components/ui/alert';
import Link from "next/link";

// icons
import { Mars, Venus, VenusAndMars } from "lucide-react";

// api
import { completeProfile } from '@/core/services/auth/actions/complete-profile';

// constants
import { UserGenderType } from '@/core/services/graphql/graphql';

// types
import type { Session } from 'next-auth';
import type { GraphQLError } from 'graphql';

export type FormOnboardingProps = {
  session: Session;
}

export const onBoardingSchema = yup.object({
  gender: yup.mixed().oneOf(Object.values(UserGenderType)).required("Gender is required")
})

export type OnBoardingSchema = yup.InferType<typeof onBoardingSchema>;

export default function FormOnboarding({
  session
}: FormOnboardingProps) {
  const router = useRouter();
  const { update: updateSession } = useSession({ required: true });

  const [isPending, startPending] = useTransition();
  const [errors, setErrors] = useState<readonly GraphQLError[]>([]);

  const submitRef = useRef<HTMLButtonElement>(null);

  const form = useForm({
    defaultValues: {
      gender: UserGenderType.Male
    },
    resolver: yupResolver(onBoardingSchema)
  });

  const onValid = (formValues: OnBoardingSchema) => {
    startPending(async () => {
      const { data: completeProfileResult, errors } = await completeProfile({
        userId: session!.user!.id!,
        gender: formValues.gender as UserGenderType
      });

      if (errors) {
        setErrors(errors);
      } else {
        await updateSession(completeProfileResult?.updateUserProfile)
        router.refresh();
      }
    });
  };

  return (
    <Card className="w-full max-w-md mx-5 sm:mx-auto md:max-w-md lg:max-w-lg xl:max-w-lg rounded-md">
      <CardHeader>
        <CardTitle className='flex flex-col gap-4'>
          {errors.map(({ message }) => (
            <Alert key={message} variant="destructive">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          ))}
          <h1>Before you start...</h1>
        </CardTitle>
        <CardDescription>Select your gender so we can match you with the right people.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(onValid)}>
            <h1 className="font-bold">I am:</h1>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Button
                      name="male-gender"
                      type="button"
                      size={"lg"}
                      variant={form.watch("gender") === UserGenderType.Male ? "default" : "outline"}
                      onClick={() => field.onChange(UserGenderType.Male)}
                    >
                      <Mars />
                      Male
                    </Button>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Button
                      name="female-gender"
                      type="button"
                      size={"lg"}
                      variant={form.watch("gender") === UserGenderType.Female ? "default" : "outline"}
                      onClick={() => field.onChange(UserGenderType.Female)}
                    >
                      <Venus />
                      Female
                    </Button>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Button
                      name="rather-not-way-gender"
                      type="button"
                      size={"lg"}
                      variant={
                        form.watch("gender") === UserGenderType.RatherNotSay ? "default" : "outline"
                      }
                      onClick={() => field.onChange(UserGenderType.RatherNotSay)}
                    >
                      <VenusAndMars />
                      Rather not say
                    </Button>
                  </FormItem>
                )}
              />
            </div>
            <p className="text-xs">*You cannot change your gender after you register.</p>
            <Separator />
            <div>
              <p className="text-sm">
                I&apos;m at least <span className="text-orange-500 font-bold">18 years old</span> and
                have read and agree to the{" "}
                <Link
                  href={"/terms"}
                  target="_blank"
                  className="underline-offset-4 hover:underline font-bold"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href={"/privacy-policy/"}
                  target="_blank"
                  className="underline-offset-4 hover:underline font-bold"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>

            <button ref={submitRef} type="submit" hidden />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          name="agree"
          type="submit"
          className="w-full font-semibold"
          size={"lg"}
          onClick={() => submitRef.current?.click()}
          isLoading={isPending}
        >
          I agree, Let&apos;s go
        </Button>
      </CardFooter>
    </Card>
  );
}
