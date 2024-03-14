import React from 'react'

export default function FormattedDate({datestring}:{datestring: string}) {
    const date = new Date(datestring);

  return (
    <span>
      {date.toLocaleDateString([], {year: 'numeric', month: 'short', day: '2-digit'})} {date.toLocaleTimeString()}
    </span>
  )
}
