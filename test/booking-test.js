import chai from 'chai';
const expect = chai.expect;

import Booking from '../src/classes/booking'

describe('Booking', () => {
  let bookingsData
  let roomData
  let booking

  beforeEach(() => {
    bookingsData = [{
      id: "5fwrgu4i7k55hl6sz",
      userID: 1,
      date: "2022/04/22",
      roomNumber: 15
    },
    {
      id: "5fwrgu4i7k55hl6t5",
      userID: 43,
      date: "2022/01/24",
      roomNumber: 24
    },
    {
      id: "5fwrgu4i7k55hl6t6",
      userID: 1,
      date: "2022/01/10",
      roomNumber: 12
    }]
    roomData = [{
      number: 15,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 358.4
    },
    {
      number: 12,
      roomType: "suite",
      bidet: false,
      bedSize: "full",
      numBeds: 2,
      costPerNight: 477.38
    },
    {
      number: 24,
      roomType: "single room",
      bidet: false,
      bedSize: "king",
      numBeds: 1,
      costPerNight: 491.14
    }]
    booking = new Booking(bookingsData, roomData)

  })

  it('Should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should find available rooms by date', () => {
    expect(booking.availableRoomsByDate("2022/04/22")).to.deep.equal([{
      number: 12,
      roomType: "suite",
      bidet: false,
      bedSize: "full",
      numBeds: 2,
      costPerNight: 477.38
    },
    {
      number: 24,
      roomType: "single room",
      bidet: false,
      bedSize: "king",
      numBeds: 1,
      costPerNight: 491.14
    }])

    expect(booking.availableRoomsByDate("2022/01/24")).to.deep.equal([{
      number: 15,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 358.4
    },
    {
      number: 12,
      roomType: "suite",
      bidet: false,
      bedSize: "full",
      numBeds: 2,
      costPerNight: 477.38
    }])
  })

})
