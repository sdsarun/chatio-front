import React from 'react'

export type UserSettingsContainerProps = React.ComponentProps<"section">;

export default function UserSettingsContainer({ children, ...props }: UserSettingsContainerProps) {
  return (
    <section {...props}>{children}</section>
  )
}
