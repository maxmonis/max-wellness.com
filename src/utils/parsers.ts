import { hasChars, hasMessage } from "./validators"

export function extractErrorMessage(error: unknown) {
  if (hasChars(error)) return error
  if (hasMessage(error)) return error.message
  return "An unexpected error occurred"
}

export function getDate(date: string) {
  const [year, month, day] = date.split("-")
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  return (
    `${months[parseInt(month) - 1]} ${Math.abs(0 - parseInt(day))}` +
    (parseInt(year) === new Date().getFullYear() ? "" : `, '${year.slice(2)}`)
  )
}

export function getPositiveInt(value: string | number) {
  return Math.abs(parseInt(value + "")) || 0
}
