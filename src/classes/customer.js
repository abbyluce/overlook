class Customer {
  constructor(id) {
    this.id = id
    this.name
  }

  getName(customersData) {
    this.name = customersData.filter(customer => this.id === customer.id).map(customer => customer.name)[0]
  }
}

export default Customer
