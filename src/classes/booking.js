class Booking {
  constructor(bookingsData, roomData) {
    this.bookingsData = bookingsData
    this.roomData = roomData
  }

  availableRoomsByDate(requestedDate) {
    let availableRooms = []
    const availBookings = this.bookingsData.filter(booking => requestedDate !== booking.date)
    this.roomData.forEach(room => {
      availBookings.forEach(booking => {
        if (room.number === booking.roomNumber) {
          availableRooms.push(room)
        }
      })
    })
    return availableRooms
  }

}

export default Booking
