'use client'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { QUERY_STATE_KEY } from '@/config/query'
import { useQueryState } from 'nuqs'

export function TimeSlot({
  time,
  capacity,
  originalCapacity,
}: {
  time: string
  capacity: number
  originalCapacity: number
}) {
  const [selectedTime, setSelectedTime] = useQueryState(QUERY_STATE_KEY.TIME)

  return (
    <Button
      variant={selectedTime === time ? 'default' : 'outline'}
      className="h-20 flex-col"
      onClick={() => {
        setSelectedTime(time)
      }}
    >
      <span className="text-lg font-semibold">{time}</span>
      <span className="text-sm text-muted-foreground">
        Available: {capacity}/{originalCapacity}
      </span>
    </Button>
  )
}

export function TimeSlotSkeleton() {
  return <Skeleton className="h-20 w-full" />
}
