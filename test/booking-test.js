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
      roomNumber: 5
    },
    {
      id: "5fwrgu4i7k55hl6t5",
      userID: 43,
      date: "2022/01/24",
      roomNumber: 2
    },
    {
      id: "5fwrgu4i7k55hl6t6",
      userID: 1,
      date: "2022/01/10",
      roomNumber: 7
    },
    {
    id: "5fwrgu4i7k55hl7ac",
    userID: 10,
    date: "2022/02/11",
    roomNumber: 8
    },
    {
    id: "5fwrgu4i7k55hl7ad",
    userID: 39,
    date: "2022/04/22",
    roomNumber: 9
    }]
    roomData = [{
      number: 1,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 358.4
      },
      {
      number: 2,
      roomType: "suite",
      bidet: false,
      bedSize: "full",
      numBeds: 2,
      costPerNight: 477.38
      },
      {
      number: 3,
      roomType: "single room",
      bidet: false,
      bedSize: "king",
      numBeds: 1,
      costPerNight: 491.14
      },
      {
      number: 4,
      roomType: "single room",
      bidet: false,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 429.44
      },
      {
      number: 5,
      roomType: "single room",
      bidet: true,
      bedSize: "queen",
      numBeds: 2,
      costPerNight: 340.17
      },
      {
      number: 6,
      roomType: "junior suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 397.02
      },
      {
      number: 7,
      roomType: "single room",
      bidet: false,
      bedSize: "queen",
      numBeds: 2,
      costPerNight: 231.46
      },
      {
      number: 8,
      roomType: "junior suite",
      bidet: false,
      bedSize: "king",
      numBeds: 1,
      costPerNight: 261.26
      },
      {
      number: 9,
      roomType: "single room",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 200.39
      },
      {
      number: 10,
      roomType: "suite",
      bidet: false,
      bedSize: "twin",
      numBeds: 1,
      costPerNight: 497.64
      }]
    booking = new Booking(bookingsData, roomData)

  })

  it('Should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should find corresponding room details', () => {
    expect(booking.getRoomInfo([{
      id: "5fwrgu4i7k55hl6sz",
      userID: 1,
      date: "2022/04/22",
      roomNumber: 5
    },
    {
      id: "5fwrgu4i7k55hl6t5",
      userID: 43,
      date: "2022/01/24",
      roomNumber: 2
    }])).to.deep.equal([{
    number: 2,
    roomType: "suite",
    bidet: false,
    bedSize: "full",
    numBeds: 2,
    costPerNight: 477.38
  },
    {
    number: 5,
    roomType: "single room",
    bidet: true,
    bedSize: "queen",
    numBeds: 2,
    costPerNight: 340.17
  }])
})


  it('should find available rooms by date', () => {
    expect(booking.availableRoomsByDate("2022/04/22")).to.deep.equal([{
      number: 1,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 358.4
      },
      {
      number: 2,
      roomType: "suite",
      bidet: false,
      bedSize: "full",
      numBeds: 2,
      costPerNight: 477.38
      },
      {
      number: 3,
      roomType: "single room",
      bidet: false,
      bedSize: "king",
      numBeds: 1,
      costPerNight: 491.14
      },
      {
      number: 4,
      roomType: "single room",
      bidet: false,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 429.44
      },
      {
      number: 6,
      roomType: "junior suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 397.02
      },
      {
      number: 7,
      roomType: "single room",
      bidet: false,
      bedSize: "queen",
      numBeds: 2,
      costPerNight: 231.46
      },
      {
      number: 8,
      roomType: "junior suite",
      bidet: false,
      bedSize: "king",
      numBeds: 1,
      costPerNight: 261.26
      },
      {
      number: 10,
      roomType: "suite",
      bidet: false,
      bedSize: "twin",
      numBeds: 1,
      costPerNight: 497.64
      }])

    // expect(booking.availableRoomsByDate("2022/01/24")).to.deep.equal([{
    //   number: 1,
    //   roomType: "residential suite",
    //   bidet: true,
    //   bedSize: "queen",
    //   numBeds: 1,
    //   costPerNight: 358.4
    //   },
    //   {
    //   number: 3,
    //   roomType: "single room",
    //   bidet: false,
    //   bedSize: "king",
    //   numBeds: 1,
    //   costPerNight: 491.14
    //   },
    //   {
    //   number: 4,
    //   roomType: "single room",
    //   bidet: false,
    //   bedSize: "queen",
    //   numBeds: 1,
    //   costPerNight: 429.44
    //   },
    //   {
    //   number: 5,
    //   roomType: "single room",
    //   bidet: true,
    //   bedSize: "queen",
    //   numBeds: 2,
    //   costPerNight: 340.17
    //   },
    //   {
    //   number: 6,
    //   roomType: "junior suite",
    //   bidet: true,
    //   bedSize: "queen",
    //   numBeds: 1,
    //   costPerNight: 397.02
    //   },
    //   {
    //   number: 7,
    //   roomType: "single room",
    //   bidet: false,
    //   bedSize: "queen",
    //   numBeds: 2,
    //   costPerNight: 231.46
    //   },
    //   {
    //   number: 8,
    //   roomType: "junior suite",
    //   bidet: false,
    //   bedSize: "king",
    //   numBeds: 1,
    //   costPerNight: 261.26
    //   },
    //   {
    //   number: 9,
    //   roomType: "single room",
    //   bidet: true,
    //   bedSize: "queen",
    //   numBeds: 1,
    //   costPerNight: 200.39
    //   },
    //   {
    //   number: 10,
    //   roomType: "suite",
    //   bidet: false,
    //   bedSize: "twin",
    //   numBeds: 1,
    //   costPerNight: 497.64
    //   }])
  })

})
