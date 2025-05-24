// core
import React from 'react'

type ChatMessageHeaderProps = {
  aka?: string;
  timestamp?: string | Date;
};
function ChatMessageHeader({ aka, timestamp }: ChatMessageHeaderProps) {
  const datetime = timestamp instanceof Date ? timestamp.toLocaleString() : timestamp;
  const datetimeDisplay = timestamp instanceof Date ? timestamp.toLocaleString() : timestamp;
  return (
    <div className='flex items-center gap-2'>
      <h3 className='font-bold'>{aka}</h3>
      {timestamp && (
        <time
          className='text-xs text-muted-foreground font-semibold '
          dateTime={datetime}
        >{datetimeDisplay}</time>
      )}
    </div>
  )
}

type ChatMessageProps = React.ComponentPropsWithRef<"div"> & {
  message?: React.ReactNode;
};
function ChatMessage({
  message,
  ...props
}: ChatMessageProps) {
  if (typeof message === "string") {
    return (
      <div {...props}>
        <span>{message}</span>
      </div>
    )
  }

  return null;
}

export {
  ChatMessageHeader,
  ChatMessage
}