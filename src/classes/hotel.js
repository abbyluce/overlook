class Hotel {
  constructor(bookingsData, roomData, customersData) {
    this.bookingsData = bookingsData
    this.roomData = roomData
    this.customersData = customersData
    this.availableRooms
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
    return existingBookings.sort((a,b) => b.date[3] - a.date[3])
  }

  availableRoomsByDate(requestedDate) {
    const bookingDateMatches = this.bookingsData.filter(booking => requestedDate === booking.date)
    let bookedRoomMatches = this.getRoomInfo(bookingDateMatches)
    this.availableRooms = this.roomData.filter(room => {
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

  findTotalCost(customer) {
    let totalCost = this.findExistingBookings(customer).reduce((sum, booking) => {
      sum += booking.cost
      return sum
    }, 0)
    return `$${(totalCost).toFixed(2)}`
  }

  filterByTags(tags, rooms) {
    if (tags.length === 0) {
      return this.availableRooms
    }
    const filteredRooms = []
    this.availableRooms.forEach(room => {
      tags.forEach(tag => {
        if(room.roomType === tag && !filteredRooms.includes(room)) {
          filteredRooms.push(room)
        }
      })
    })
    return filteredRooms
  }
}


export default Hotel
