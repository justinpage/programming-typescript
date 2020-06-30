type Reservation = string

type Reserve = {
  (from: Date, to: Date, destination: string): Reservation
  (from: Date, destination: string): Reservation
  (destination: string): Reservation
}

let reserve: Reserve = (
  fromOrDestination: Date | string,
  toOrDestination?: Date | string,
  destination?: string
) => {

  if (toOrDestination instanceof Date && destination !== undefined) {
    return "Book a one-way trip"
  }
  if (typeof toOrDestination === 'string') {
    return "Book a round trip"
  }
  if (typeof fromOrDestination === 'string') {
    return "You are now on vacation"
  }

  return "You are not going anywhere"
}

console.log(reserve(new Date(), new Date(), 'Bali'))
console.log(reserve(new Date(), 'Bali'))
console.log(reserve('Bali'))
