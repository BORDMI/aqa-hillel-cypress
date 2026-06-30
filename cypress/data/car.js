import { faker } from '@faker-js/faker'

class Car {
  static AUDI_MODELS = ['TT', 'R8', 'Q7', 'A6', 'A8']

  constructor(overrides = {}) {
    this.brand = overrides.brand ?? 'Audi'
    this.model = overrides.model ?? faker.helpers.arrayElement(Car.AUDI_MODELS)
    this.mileage = overrides.mileage ?? faker.number.int({ min: 100, max: 500 })
  }

  get name() {
    return `${this.brand} ${this.model}`
  }

  static random(overrides = {}) {
    return new Car(overrides)
  }
}

export { Car }
