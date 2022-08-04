import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/customer'

describe('Customer', () => {
  let customer1
  let customer2
  let customer3

  beforeEach(() => {
    customer1 = new Customer(1, "Abby")
    customer2 = new Customer(2, "Will")
    customer3 = new Customer(3, "Mason")
    customersData = [customer1, customer2, customer3]
  })

  it.skip('Should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it.skip('should calculate the total cost of all bookings', () => {
    expect(customer.findTotalCost(1)).to.equal('$835.78')
    expect(customer.findTotalCost(43)).to.equal('$0.00')
  })


})
