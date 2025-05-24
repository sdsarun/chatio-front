"use client"

// core
import React, { useRef } from 'react'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, UseFormReturn } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '@/core/components/ui/form';

// components
import { Button } from '@/core/components/ui/button';
import { Textarea } from '@/core/components/ui/textarea';
import { Send } from 'lucide-react';

// utils
import { cn } from '@/core/lib/utils';

const ENTER_KEY: string = 'Enter';

const chatInputFormSchema = yup.object({
  content: yup.string().required()
});

type ChatInputFormValues = yup.InferType<typeof chatInputFormSchema>;
type ChatInputProps = {
  rootClassName?: string;
  onSubmit?: (values: ChatInputFormValues, form: UseFormReturn<ChatInputFormValues>) => void;
};

export default function ChatInput({
  rootClassName,
  onSubmit,
}: ChatInputProps) {
  const submitRef = useRef<HTMLButtonElement>(null);
  const formChatInput = useForm<ChatInputFormValues>({
    defaultValues: {
      content: "",
    },
    resolver: yupResolver(chatInputFormSchema),
  });

  const handleChatInputSubmit = (values: ChatInputFormValues) => {
    if (typeof onSubmit === "function") {
      onSubmit(values, formChatInput);
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === ENTER_KEY && !event.shiftKey) {
      event.preventDefault();
      submitRef.current?.click()
    }
  }

  const handlePaste = ({ }: React.ClipboardEvent<HTMLTextAreaElement>) => {
  }

  return (
    <div className={cn('flex-1 flex flex-col bg-accent my-2 rounded-lg', rootClassName)}>
      <Form {...formChatInput}>
        <form onSubmit={formChatInput.handleSubmit(handleChatInputSubmit)} className='flex items-center flex-1'>
          <FormField
            control={formChatInput.control}
            name='content'
            render={({ field }) => (
              <FormItem className='flex-1 relative'>
                <FormControl>
                  <Textarea
                    {...field}
                    className='resize-none min-h-9 flex-1 pr-9 focus-visible:border-none focus-visible:ring-0 border-none max-h-[140px]'
                    placeholder='Message'
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                  />
                </FormControl>
                <Button
                  className='absolute top-[1px] right-1'
                  variant="link"
                  size="icon"
                  type='submit'
                  disabled={field?.value?.length === 0}
                >
                  <Send />
                </Button>
              </FormItem>
            )}
          />
          <Button ref={submitRef} type='submit' hidden />
        </form>
      </Form>
    </div>
  )
}
