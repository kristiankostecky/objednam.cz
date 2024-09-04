import { TimeSlot, TimeSlotSkeleton } from '@/components/time-slot'
import { addHours, differenceInHours, format, set } from 'date-fns'

async function generateMockTimeSlots(startTime: Date, endTime: Date) {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000))
  const hoursBetweenStartAndEnd = Math.abs(
    differenceInHours(startTime, endTime)
  )

  const slots = Array.from({ length: hoursBetweenStartAndEnd }, (_, index) => {
    const slotTime = addHours(startTime, index)
    const originalCapacity = Math.floor(Math.random() * 10) + 1
    return {
      Time: format(slotTime, 'HH:mm'),
      Capacity: originalCapacity - Math.floor(Math.random() * originalCapacity),
      OriginalCapacity: originalCapacity,
    }
  })
  return slots
}

export async function TimeSlots({ date }: { date: Date }) {
  const startDate = set(date, { hours: 10, minutes: 0 })
  const endDate = addHours(startDate, 9)
  const timeSlots = await generateMockTimeSlots(startDate, endDate)

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {timeSlots.map((slot, index) => (
        <TimeSlot
          key={index}
          time={slot.Time}
          capacity={slot.Capacity}
          originalCapacity={slot.OriginalCapacity}
        />
      ))}
    </div>
  )
}

export function TimeSlotsSkeleton() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 9 }).map((_, index) => (
        <TimeSlotSkeleton key={index} />
      ))}
    </div>
  )
}
