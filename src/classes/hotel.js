class Hotel {
  constructor(bookingsData, roomData, customersData) {
    this.bookingsData = bookingsData
    this.roomData = roomData
    this.customersData = customersData
  }

  findExistingBookings(customer) {
    const existingBookings = this.bookingsData.filter(booking => customer.id === booking.userID)
    this.roomData.filter(room => {
      existingBookings.map(booking => {
      if (room.number === booking.roomNumber) {
        booking.roomType = room.roomType
        booking.cost = room.costPerNight
      }
    })
  })
    console.log(existingBookings)
    return existingBookings
}

  availableRoomsByDate(requestedDate) {
    const bookingDateMatches = this.bookingsData.filter(booking => requestedDate === booking.date)
    let bookedRoomMatches = this.getRoomInfo(bookingDateMatches)
    return this.roomData.filter(room => {
      return !bookedRoomMatches.some(bookedRoom => {
        return room.number === bookedRoom.number
      })
    })
  }

  getRoomInfo(bookings) {
    return this.roomData.reduce((list, room) => {
            bookings.forEach(booking => {
                if (booking.roomNumber === room.number) {
                        list.push(room)
                }
            })
            return list
        }, [])
  }

  findTotalCost(bookings) {
    let totalCost = this.findExistingBookings(customerID, bookings).reduce((sum, room) => {
      sum += room.costPerNight
      return sum
    }, 0)
    return `$${(totalCost).toFixed(2)}`
  }
}


export default Hotel
