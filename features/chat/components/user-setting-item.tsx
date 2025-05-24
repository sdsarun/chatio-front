import React from 'react';

type UserSettingsItemProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function UserSettingsItem({ title, description, children }: UserSettingsItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold">{title}</h2>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      <div className="self-center">
        {children}
      </div>
    </div>
  );
}
