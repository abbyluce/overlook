class Booking {
  constructor(bookingsData, roomData) {
    this.bookingsData = bookingsData
    this.roomData = roomData
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


  availableRoomsByDate(requestedDate) {
    const bookingDateMatches = this.bookingsData.filter(booking => requestedDate === booking.date)
    let bookedRoomMatches = this.getRoomInfo(bookingDateMatches)
    return this.roomData.filter(room => {
      return !bookedRoomMatches.some(bookedRoom => {
        return room.number === bookedRoom.number
      })
    })
  }



    //take room data. subtract room objects where the numbers line up with the bookDateMatch room numbers
    //OR build new array of all room data but do not include room numbers that match with bookings
}


export default Booking
