import { Button } from '@/core/components/ui/button';
import { signOut } from '@/core/lib/auth';
import { LoaderCircle } from 'lucide-react';

export default async function NewChatPage() {
  return (
    <div>
      <LoaderCircle className='animate-spin' />
      <Button onClick={async () => {
        "use server"
        await signOut();
      }}>Sign out</Button>
    </div>
  )
}
