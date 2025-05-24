import { Separator } from '@/core/components/ui/separator'
import { Skeleton } from '@/core/components/ui/skeleton'

function UserDirectMessageContainerSkeleton() {
  return (
    <section className='flex flex-col gap-2'>
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-10 bg-zinc-200/20 opacity-50 border-2' />
        <Separator contentClassName='text-sm font-bold'>Direct Messages</Separator>
      </div>
      {Array.from({ length: 1 }).map((_, index) => (
        <div key={index} className='flex items-center gap-2'>
          <Skeleton className='h-9 w-9 rounded-full' />
          <div className='flex flex-col flex-1 gap-1'>
            <Skeleton className='h-4' />
            <Skeleton className='h-4 w-[80%]' />
          </div>
        </div>
      ))}
    </section>
  )
}

function UserFriendContainerSkeleton() {
  return (
    <section className='flex flex-col gap-2'>
      <div className='flex items-center gap-2'>
        <Skeleton className='h-8 w-16' />
        <Skeleton className='h-8 w-10' />
        <Skeleton className='h-8 w-16' />
      </div>
      <Skeleton className='h-9 bg-zinc-200/20 opacity-50 border-2' />
      {Array.from({ length: 1 }).map((_, index) => (
        <div key={index} className='flex items-center gap-2'>
          <Skeleton className='h-9 w-9 rounded-full' />
          <div className='flex flex-col flex-1 gap-1'>
            <Skeleton className='h-4' />
            <Skeleton className='h-4 w-[80%]' />
          </div>
        </div>
      ))}
    </section>
  )
}

export {
  UserDirectMessageContainerSkeleton,
  UserFriendContainerSkeleton,
}