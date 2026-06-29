import { faker } from '@faker-js/faker'

const uniqueEmail = () =>
  `aqa.reg+${faker.string.alphanumeric(10)}@example.com`.toLowerCase()

class User {
  constructor(overrides = {}) {
    this.name = overrides.name ?? 'John'
    this.lastName = overrides.lastName ?? 'Doe'
    this.email = overrides.email ?? uniqueEmail()
    this.password = overrides.password ?? 'Password1'
  }

  get repeatPassword() {
    return this.password
  }

  static random(overrides = {}) {
    return new User(overrides)
  }
}

export { User }
