"use client"

// core
import { useCallback, useEffect, useState } from "react"

// components
import { Button } from "@/core/components/ui/button"
import { copyTextToClipboard } from "@/core/utils/common/copy-to-clipboard"
import { CheckIcon, ClipboardIcon } from "lucide-react"

type CopyButtonProps = React.ComponentProps<typeof Button> & {
  value?: string;
}

export default function CopyButton({
  value,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState<boolean>(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHasCopied(false)
    }, 2000)
    return () => clearTimeout(timeoutId);
  }, [hasCopied])

  const copyToClipboard = useCallback(() => {
    if (value) {
      copyTextToClipboard(value)
      setHasCopied(true)
    }
  }, [value])

  return (
    <Button
      size="icon-xs"
      variant="ghost"
      onClick={copyToClipboard}
      {...props}
    >
      {hasCopied ? (
        <CheckIcon />
      ) : (
        <ClipboardIcon />
      )}
      <span className="sr-only">Copy</span>
    </Button>
  )
}