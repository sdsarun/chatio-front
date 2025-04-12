// core
import { auth } from '@/core/lib/auth';

// components
import FormOnboarding from '@/features/auth/components/form-onboarding';

export default async function page() {
  const session = await auth();
  return (
    <div className="flex-1 flex justify-center items-center">
      <FormOnboarding session={session!} />
    </div>
  )
}
