"use client"

// core
import dynamic from 'next/dynamic';
import { isValidElement, useState } from 'react';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';

// components
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/core/components/ui/alert-dialog';
import { Button } from '@/core/components/ui/button';
import { DrawerDialog, DrawerDialogContent, DrawerDialogDescription, DrawerDialogTitle, DrawerDialogTrigger } from '@/core/components/ui/drawer-dialog';
import { Loading } from '@/core/components/ui/loading';
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from '@/core/components/ui/sidebar';
import { LogOut, Settings2, User2, type LucideIcon } from "lucide-react";

const UserSettingsPreferences = dynamic(() => import("@/features/chat/components/user-settings-preferences"), {
  loading: ({ isLoading }) => <Loading isLoading={isLoading} fullscreen className='absolute' />,
});

const UserSettingsMyAccount = dynamic(() => import("@/features/chat/components/user-settings-my-account"), {
  loading: ({ isLoading }) => <Loading isLoading={isLoading} fullscreen className='absolute' />,
});

export type UserSettingsProps = {
  activeTabKey?: string;
  user?: Session["user"];
}

export type UserSettingsConfig = {
  sidebar: SidebarSection[];
  tabs: Record<string, React.ComponentType>;
};

export type SidebarSection = {
  title?: string;
  separator?: boolean;
  items?: SidebarMenuAction[];
};

export type SidebarMenuAction = {
  /**
    * A unique key identifying the menu action.
    * Used for tab selection or tracking active state.
    */
  key: string;

  /**
   * The label to display for the menu item.
   * 
   * - If a string or number: it will be displayed with optional icon and standard button behavior.
   * - If a ReactNode (like a custom component): it will be rendered directly and is responsible for its own layout and click handling.
   */
  label: React.ReactNode;

  /**
   * Optional icon to display alongside the label.
   * 
   * ⚠️ This is only used when `label` is a string or number.
   * If `label` is a custom ReactNode, this icon will be ignored.
   */
  icon?: LucideIcon;

  /**
  * Prevents this menu item from ever being marked as active,
  * even if its key matches the selected tab key.
  * 
  * Useful for items like logout buttons or custom components that manage their own state.
  */
  canActive?: boolean;
};

const defaultActiveMenu: string = 'Preferences';

const settings: UserSettingsConfig = {
  sidebar: [
    {
      title: "Account",
      items: [
        {
          key: "MyAccount",
          label: "My Account",
          icon: User2,
        },
        {
          key: defaultActiveMenu,
          label: "Preferences",
          icon: Settings2,
        },
      ]
    },
    {
      separator: true
    },
    {
      items: [
        {
          key: "Logout",
          label: <UserLogoutItem />,
        }
      ]
    }
  ],
  tabs: {
    MyAccount: UserSettingsMyAccount,
    Preferences: UserSettingsPreferences,
  }
};

function UserSettings({ activeTabKey, user }: UserSettingsProps) {
  const [selectedTabKey, setSelectedTabKey] = useState<string>(activeTabKey ?? defaultActiveMenu);

  const handleSidebarClick = (item: SidebarMenuAction) => {
    if (item?.canActive === false) {
      return;
    }

    setSelectedTabKey(item.key);
  };

  const TabContent: React.ComponentType<{ user?: Session["user"] }> = settings.tabs[selectedTabKey] || EmptyTabContent;

  return (
    <div className='flex-1 flex'>
      <aside className='flex-1/3 max-w-[240px] bg-sidebar'>
        {settings.sidebar.map((section, idx) => {
          if (section.separator) {
            return <SidebarSeparator key={`sep-${idx}`} className='mx-0' />;
          }
          return (
            <SidebarGroup key={`group-${idx}`}>
              {section.title && <SidebarGroupLabel>{section.title}</SidebarGroupLabel>}
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items?.map((item) => {
                    const isLabelReactNode = isValidElement(item.label);

                    return (
                      <SidebarMenuItem key={item.key}>
                        {isLabelReactNode ? item.label :
                          <SidebarMenuButton
                            className='flex items-center justify-start w-full cursor-pointer'
                            onClick={() => handleSidebarClick(item)}
                            isActive={selectedTabKey === item.key}
                          >
                            {item.icon && <item.icon className='mr-2' />}
                            <div>{item.label}</div>
                          </SidebarMenuButton>
                        }
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </aside>
      <section className='flex-2/3 h-[700px] flex-col overflow-y-auto px-14 py-9 relative'>
        <TabContent user={user} />
      </section>
    </div>
  );
}

function UserSettingsDrawerDialog({
  drawerDialogRootProps,
  children,
  user,
  activeTabKey,
}: React.PropsWithChildren<UserSettingsProps & {
  drawerDialogRootProps?: React.ComponentProps<typeof DrawerDialog>;
  user?: Session["user"];
}>) {
  return (
    <DrawerDialog {...drawerDialogRootProps}>
      {children && <DrawerDialogTrigger asChild>{children}</DrawerDialogTrigger>}
      <DrawerDialogContent className="overflow-hidden p-0 gap-0 flex md:max-h-[700px] md:max-w-[700px] lg:max-w-[1150px]">
        <DrawerDialogTitle />
        <DrawerDialogDescription />
        <UserSettings
          user={user}
          activeTabKey={activeTabKey}
        />
      </DrawerDialogContent>
    </DrawerDialog>
  );
}

function EmptyTabContent() {
  return null;
}

function UserLogoutItem() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <SidebarMenuButton className='flex items-center justify-start w-full cursor-pointer' >
          <LogOut className='mr-2' />
          <div>Logout</div>
        </SidebarMenuButton>
      </AlertDialogTrigger>
      <AlertDialogContent className='w-md'>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to sign out?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={async () => signOut()}
          >Sign out</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export {
  UserSettings,
  UserSettingsDrawerDialog
};

