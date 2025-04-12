import { Button } from '@/core/components/ui/button';
import { ModeToggle } from '@/core/components/ui/toggle-theme';
import { signOut } from '@/core/lib/auth';
import { LoaderCircle } from 'lucide-react';

export default async function NewChatPage() {
  return (
    <div>
      <ModeToggle />
      <LoaderCircle className='animate-spin' />
      <Button onClick={async () => {
        "use server"
        await signOut();
      }}>Sign out</Button>
    </div>
  )
}
