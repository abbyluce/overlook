class Customer {
  constructor(id) {
    this.id = id
    this.name
  }

  getName(customersData) {
    this.name = customersData.filter(customer => this.id === customer.id).map(customer => customer.name)
  }

  //from id get name, bookings etc.
  //methods to get room numbers, dates, etc.



  // addFutureBooking(booking) {
  //     this.futureBookings.push(booking)
  // }

  findTotalCost(bookings) {
    let totalCost = this.findExistingBookings(customerID, bookings).reduce((sum, room) => {
      sum += room.costPerNight
      return sum
    }, 0)
    return `$${(totalCost).toFixed(2)}`
  }
}

export default Customer
