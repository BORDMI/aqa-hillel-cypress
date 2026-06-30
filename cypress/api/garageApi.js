class GarageApi {
  request(options) {
    return cy
      .env(['BASIC_AUTH_USERNAME', 'BASIC_AUTH_PASSWORD'])
      .then(({ BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD }) => {
        const auth = { username: BASIC_AUTH_USERNAME, password: BASIC_AUTH_PASSWORD }

        return cy.request({ auth, ...options })
      })
  }

  signIn(email, password) {
    return this.request({
      method: 'POST',
      url: '/api/auth/signin',
      body: { email, password, remember: false },
    })
  }

  getCars() {
    return this.request({ method: 'GET', url: '/api/cars' })
  }

  createCar(payload) {
    return this.request({ method: 'POST', url: '/api/cars', body: payload })
  }

  createExpense(payload) {
    return this.request({ method: 'POST', url: '/api/expenses', body: payload })
  }

  deleteCar(id) {
    return this.request({ method: 'DELETE', url: `/api/cars/${id}` })
  }
}

export const garageApi = new GarageApi()
