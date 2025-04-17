import { cn } from "@/core/lib/utils";
import { MessageCircleQuestion, LucideProps } from "lucide-react";

type AppLogoProps = {
  rootClassName?: string;
  text?: string;
  iconProps?: LucideProps
  textProps?: React.ComponentProps<"p">;
};

function AppLogo({
  rootClassName,
  text = "ChatIO",
  textProps,
  iconProps
}: AppLogoProps) {
  return (
    <div className={cn("flex items-center gap-1", rootClassName)}>
      <MessageCircleQuestion 
        {...iconProps} 
        className={cn("w-5 h-5", iconProps?.className)} 
      />
      <p 
        {...textProps}
        className={cn("text-base font-extrabold", textProps?.className)}
      >
        {text}
      </p>
    </div>
  );
}

export {
  type AppLogoProps,
  AppLogo,
};
