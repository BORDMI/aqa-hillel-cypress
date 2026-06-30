import { faker } from '@faker-js/faker'

class FuelExpense {
  constructor(overrides = {}) {
    this.reportedAt = overrides.reportedAt ?? new Date().toISOString().slice(0, 10)
    this.mileage = overrides.mileage ?? faker.number.int({ min: 600, max: 1000 })
    this.liters = overrides.liters ?? faker.number.int({ min: 10, max: 60 })
    this.totalCost = overrides.totalCost ?? faker.number.int({ min: 20, max: 150 })
  }

  payload(carId) {
    return {
      carId,
      reportedAt: this.reportedAt,
      mileage: this.mileage,
      liters: this.liters,
      totalCost: this.totalCost,
      forceMileage: true,
    }
  }

  static random(overrides = {}) {
    return new FuelExpense(overrides)
  }
}

export { FuelExpense }
