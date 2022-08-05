class Booking {
  constructor(customer, date, room) {
    this.userID = customer.id
    this.date = date
    this.roomNumber = room.number
  }
}


export default Booking
