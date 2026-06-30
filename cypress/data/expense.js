import { faker } from '@faker-js/faker'

class FuelExpense {
  constructor(overrides = {}) {
    this.mileage = overrides.mileage ?? faker.number.int({ min: 600, max: 1000 })
    this.liters = overrides.liters ?? faker.number.int({ min: 10, max: 60 })
    this.totalCost = overrides.totalCost ?? faker.number.int({ min: 20, max: 150 })
  }

  static random(overrides = {}) {
    return new FuelExpense(overrides)
  }
}

export { FuelExpense }
