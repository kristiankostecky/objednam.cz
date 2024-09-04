import { DayPicker } from '@/components/day-picker'
import { TimeSlots, TimeSlotsSkeleton } from '@/components/time-slots'
import { routes } from '@/config/routes'
import { format, isBefore, startOfDay } from 'date-fns'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { z } from 'zod'

const searchParamsSchema = z.object({
  date: z.coerce.date().optional().default(new Date()), // TODO: there can be difference in timezones on server and client but this is for a mock data so it doesn't matter
})

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | Array<string> | undefined>
}) {
  const { date } = searchParamsSchema.parse(searchParams)

  if (isBefore(startOfDay(date), startOfDay(new Date()))) {
    // do not allow viewing past days
    redirect(routes.home)
  }

  return (
    <main className="flex grow flex-col">
      <div className="container flex flex-col items-center gap-4 py-6">
        <DayPicker key={searchParams.date ? undefined : 'key'} />
        <h2 className="text-2xl font-bold">
          {format(date, 'EEEE, MMMM d, yyyy')}
        </h2>
        <Suspense key={date.toString()} fallback={<TimeSlotsSkeleton />}>
          <TimeSlots date={date} />
        </Suspense>
      </div>
    </main>
  )
}
