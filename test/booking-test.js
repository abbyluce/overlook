import chai from 'chai';
const expect = chai.expect;

import Booking from '../src/classes/booking'
import Room from '../src/classes/room'
import Customer from '../src/classes/customer'

describe('Booking', () => {
  let room1
  let room2
  let customer1
  let customer2
  let bookingA
  let bookingB

  beforeEach(() => {
    room1 = new Room(1, "residential suite", true, "queen", 1, 358.4)
    room2 = new Room(2, "suite", false, "full", 2, 477.38)
    customer1 = new Customer(1, "Abby")
    customer2 = new Customer(2, "Will")
    bookingA = new Booking(customer1, "2022/04/22", room1)
    bookingB = new Booking(customer2, "2022/04/22", room2)

  })

  it('Should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('Should have a customer ID', () => {
    expect(bookingA.userID).to.equal(1)
    expect(bookingB.userID).to.equal(2)
  });

  it('Should have a date', () => {
    expect(bookingA.date).to.equal("2022/04/22")
    expect(bookingB.date).to.equal("2022/04/22")
  });

  it('Should have a room number', () => {
    expect(bookingA.roomNumber).to.equal(1)
    expect(bookingB.roomNumber).to.equal(2)
  });
})
