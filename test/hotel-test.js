import chai from 'chai';
const expect = chai.expect;

import Booking from '../src/classes/booking'
import Room from '../src/classes/room'
import Customer from '../src/classes/customer'
import Hotel from '../src/classes/hotel'

describe('Hotel', () => {
  let room1
  let room2
  let room3
  let room4
  let room5
  let room6
  let room7
  let room8
  let room9
  let room10
  let roomData
  let bookingA
  let bookingB
  let bookingC
  let bookingsData
  let customer1
  let customer2
  let customer3
  let customersData
  let hotel

  beforeEach(() => {
    room1 = new Room(1, "residential suite", true, "queen", 1, 358.4)
    room2 = new Room(2, "suite", false, "full", 2, 477.38)
    room3 = new Room(3, "single room", false, "king", 1, 491.14)
    room4 = new Room(4, "single room", false, "queen", 1, 429.44)
    room5 = new Room(5, "single room", true, "queen", 2, 340.17)
    room6 = new Room(6, "junior suite", true, "queen", 1, 397.02)
    room7 = new Room(7, "single room", false, "queen", 2, 231.46)
    room8 = new Room(8, "junior suite", false, "king", 1, 261.26)
    room9 = new Room(9, "single room", true, "queen", 1, 200.39)
    room10 = new Room(10, "suite", false, "twin", 1, 497.64)
    roomData = [room1, room2, room3, room4, room5, room6, room7, room8, room9, room10]
    customer1 = new Customer(1, "Abby")
    customer2 = new Customer(2, "Will")
    customer3 = new Customer(3, "Mason")
    customersData = [customer1, customer2, customer3]
    bookingA = new Booking(customer1, "2022/04/22", room5)
    bookingB = new Booking(customer2, "2022/04/22", room2)
    bookingC = new Booking(customer3, "2022/01/10", room7)
    bookingsData = [bookingA, bookingB, bookingC]
    hotel = new Hotel(bookingsData, roomData, customersData)
  })

  it('Should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('Should have bookings', () => {
    expect(hotel.bookingsData).to.deep.equal([bookingA, bookingB, bookingC])
  });

  it('Should have rooms', () => {
    expect(hotel.roomData).to.deep.equal([room1, room2, room3, room4, room5, room6, room7, room8, room9, room10])
  });

  it('Should have customers', () => {
    expect(hotel.customersData).to.deep.equal([customer1, customer2])
  });

  it('Should find existing customer bookings', () => {
    expect(hotel.findExistingBookings(customer1)).to.deep.equal([bookingA])
  })

  it('Should get corresponding room details from bookings', () => {
    expect(hotel.getRoomInfo([bookingA, bookingC])).to.deep.equal([room5, room7])
    expect(hotel.getRoomInfo([bookingC])).to.deep.equal([room7])
  })

  it('should find available rooms by date', () => {
    expect(hotel.availableRoomsByDate("2022/04/22")).to.deep.equal([room1, room3, room4, room6, room7, room8, room9, room10])
    expect(hotel.availableRoomsByDate("2022/01/12")).to.deep.equal([room1, room2, room3, room4, room5, room6, room7, room8, room9, room10])
  })
})
