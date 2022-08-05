import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/customer'

describe('Customer', () => {
  let customer1
  let customer2
  let customersData

  beforeEach(() => {
    customer1 = new Customer(1)
    customer2 = new Customer(2)
    customersData =  [
      {id: 1, name: "Leatha Ullrich"},
      {id: 2, name: "Rocio Schuster"},
    ]
  })

  it('Should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('Should find customers names from id number', () => {
    customer1.getName(customersData)
    customer2.getName(customersData)
    expect(customer1.name).to.equal("Leatha Ullrich")
    expect(customer2.name).to.equal("Rocio Schuster")
  })
})
