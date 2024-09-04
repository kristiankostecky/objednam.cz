'use client'

import { Button } from '@/components/ui/button'
import { QUERY_STATE_KEY } from '@/config/query'
import { useClearQueryStates } from '@/lib/hooks/use-clear-query-states'
import { cn } from '@/lib/utils'
import { addDays, format, isToday, isTomorrow, parse, subDays } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useState } from 'react'

function getVisibleDates(date: Date) {
  if (isToday(date)) {
    return [date, addDays(date, 1), addDays(date, 2), addDays(date, 3)]
  }

  return [subDays(date, 1), date, addDays(date, 1), addDays(date, 2)]
}

const STATE_DATE_FORMAT = 'yyyy-MM-dd'

function formatDate(date: Date): { day: string; date: string } {
  const formattedDate = format(date, 'MM.dd.')

  if (isToday(date)) {
    return { day: 'Today', date: formattedDate }
  }
  if (isTomorrow(date)) {
    return { day: 'Tomorrow', date: formattedDate }
  }
  return { day: format(date, 'EEEE'), date: formattedDate }
}

export function DayPicker() {
  const [selectedDate, _setSelectedDate] = useQueryState(QUERY_STATE_KEY.DATE, {
    shallow: false,
    clearOnDefault: true,
    defaultValue: format(new Date(), STATE_DATE_FORMAT),
  })

  const [visibleDates, setVisibleDates] = useState<Array<Date>>(
    getVisibleDates(parse(selectedDate, STATE_DATE_FORMAT, new Date()))
  )
  const clearTime = useClearQueryStates([QUERY_STATE_KEY.TIME])
  const setSelectedDate = (date: string) => {
    _setSelectedDate(date)
    clearTime()
  }

  return (
    <div className="flex w-full justify-between gap-2">
      <Button
        variant="outline"
        onClick={() => {
          setVisibleDates((prev) => {
            const prevDate = subDays(prev[0], 1)
            const prevDatesWithoutLast = prev.toSpliced(prev.length - 1, 1)
            return [prevDate, ...prevDatesWithoutLast]
          })
        }}
        disabled={isToday(visibleDates[0])}
      >
        <ChevronLeft className="size-3" />
      </Button>
      <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-4">
        {visibleDates.map((date, index) => (
          <Button
            className={cn('w-full flex-col', {
              'hidden md:flex': index > 1,
            })}
            key={date.toISOString()}
            variant={
              selectedDate === format(date, STATE_DATE_FORMAT)
                ? 'default'
                : 'outline'
            }
            onClick={() => {
              setSelectedDate(format(date, STATE_DATE_FORMAT))
            }}
          >
            <span className="hidden sm:block">{formatDate(date).day}</span>
            <span>{formatDate(date).date}</span>
          </Button>
        ))}
      </div>
      <Button
        variant="outline"
        onClick={() => {
          setVisibleDates((prev) => {
            const nextDate = addDays(prev[prev.length - 1], 1)
            const prevDatesWithoutFirst = prev.toSpliced(0, 1)
            return [...prevDatesWithoutFirst, nextDate]
          })
        }}
      >
        <ChevronRight className="size-3" />
      </Button>
    </div>
  )
}
