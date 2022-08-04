class Hotel {
  constructor(bookingsData, roomData, customersData) {
    this.bookingsData = bookingsData
    this.roomData = roomData
    this.customersData = customersData
  }

  findExistingBookings(customer) {
    return this.bookingsData.filter(booking => customer.id === booking.userID)
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

}

export default Hotel
