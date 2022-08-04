import chai from 'chai';
const expect = chai.expect;

import Room from '../src/classes/room'

describe('Room', () => {
  let roomA
  let roomB

  beforeEach(() => {
    roomA = new Room(15, "residential suite", true, "queen", 1, 358.4)
    roomB = new Room(12, "suite", false, "full", 2, 477.38)
  })

  it('Should be a function', () => {
    expect(Room).to.be.a('function');
  });

  it('should have a number', () => {
    expect(roomA.number).to.equal(15);
  });

  it('should have a room type', () => {
    expect(roomA.roomType).to.equal("residential suite")
    expect(roomB.roomType).to.equal("suite")
  })

  it('should be able to have a bidet', () => {
    expect(roomA.bidet).to.equal(true)
    expect(roomB.bidet).to.equal(false)
  })

  it('should have a bed size', () => {
    expect(roomA.bedSize).to.equal("queen")
    expect(roomB.bedSize).to.equal("full")
  })

  it('should have a number of beds', () => {
    expect(roomA.numBeds).to.equal(1)
    expect(roomB.numBeds).to.equal(2)
  })

  it('should have a cost per night', () => {
    expect(roomA.costPerNight).to.equal(358.4)
    expect(roomB.costPerNight).to.equal(477.38)
  })
})
