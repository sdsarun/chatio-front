"use client"

// core
import { useState } from "react";

// components
import { Button } from "@/core/components/ui/button";

type ButtonSelectGroupValue = string | number;

export type ButtonSelectGroupProps = {
  rootClassName?: string;
  mode?: "single" | "multiple";
  requireSelection?: boolean;
  items?: (React.ComponentProps<typeof Button> & {
    label: React.ReactNode;
    value: ButtonSelectGroupValue;
  })[];
  size?: React.ComponentProps<typeof Button>["size"];
  defaultValue?: ButtonSelectGroupValue[];
  value?: ButtonSelectGroupValue[];
  onChange?: (selectedKeys: ButtonSelectGroupValue[]) => void;
}

function ButtonSelectGroup({
  rootClassName,
  mode = "single",
  requireSelection = false,
  items,
  size = "sm",
  defaultValue,
  value,
  onChange,
}: ButtonSelectGroupProps) {
  const [internalSelected, setInternalSelected] = useState<ButtonSelectGroupValue[]>(defaultValue || []);

  const isControlled = value !== undefined;
  const selected = isControlled ? value! : internalSelected;

  const toggleSelected = (newValue: ButtonSelectGroupValue) => {
    let nextSelected: ButtonSelectGroupValue[];

    const isSelected = selected.includes(newValue);

    if (isSelected) {
      if (requireSelection && selected.length === 1) {
        nextSelected = selected;
      } else {
        nextSelected = selected.filter((selectedValue) => selectedValue !== newValue);
      }
    } else {
      if (mode === "single") {
        nextSelected = [newValue];
      } else {
        nextSelected = [...selected, newValue];
      }
    }

    if (!isControlled) {
      setInternalSelected(nextSelected);
    }

    if (typeof onChange === "function") {
      onChange(nextSelected);
    }
  };

  return (
    <div className={rootClassName}>
      {items?.map(({ value, label, onClick, size: itemSize, ...props }) => (
        <Button
          key={value}
          variant={selected.includes(value) ? "default" : "secondary"}
          size={itemSize || size}
          onClick={(event) => {
            toggleSelected(value);
            if (typeof onClick === "function") {
              onClick(event);
            }
          }}
          {...props}
        >
          {label}
        </Button>
      ))}
    </div>
  )
}

export {
  ButtonSelectGroup
};
