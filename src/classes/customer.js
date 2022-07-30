class Customer {
  constructor(id, bookingsData) {
    this.id = 
    this.name
    this.bookings = []
  }

  findBookings() {
    bookingsData.forEach(booking => {
    if (this.id === booking.userID) {
      this.bookings.push(booking)
    }
  })
  }

  findTotalCost() {

  }
}

export default Customer
