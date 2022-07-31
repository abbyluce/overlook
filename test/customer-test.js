import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/customer'

describe('Customer', () => {
  let customer
  let bookingsData
  let roomData

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
      number: 3,
      roomType: "single room",
      bidet: false,
      bedSize: "king",
      numBeds: 1,
      costPerNight: 491.14
    }]
    customer = new Customer(bookingsData, roomData)

  })

  it('Should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be able to find an existing booking', () => {
    expect(customer.findExistingBookings(1)).to.deep.equal([{
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

    expect(customer.findExistingBookings(43)).to.deep.equal([])
  })

  it('should calculate the total cost of all bookings', () => {
    expect(customer.findTotalCost(1)).to.equal('$835.78')
    expect(customer.findTotalCost(43)).to.equal('$0.00')
  })


})
