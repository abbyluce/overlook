class Customer {
  constructor(bookingsData, roomData) {
    this.bookingsData = bookingsData
    this.roomData = roomData
  }

  findExistingBookings(customerID) {
    let existingRooms = []
    const existingBookings = this.bookingsData.filter(booking => customerID === booking.userID)
    this.roomData.forEach(room => {
      existingBookings.forEach(booking => {
        if (room.number === booking.roomNumber) {
          existingRooms.push(room)
        }
      })
    })
    return existingRooms
  }

  findTotalCost(customerID) {
    let totalCost = this.findExistingBookings(customerID).reduce((sum, room) => {
      sum += room.costPerNight
      return sum
    }, 0)
    return `$${(totalCost).toFixed(2)}`
  }
}

export default Customer
