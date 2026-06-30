import { homePage } from '../pages/home.page'
import { signInModal } from '../pages/components/signin.modal'
import { garagePage } from '../pages/garage.page'

Cypress.Commands.overwrite('visit', (originalFn, url, options = {}) => {
  return cy
    .env(['BASIC_AUTH_USERNAME', 'BASIC_AUTH_PASSWORD'])
    .then(({ BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD }) => {
      const auth = {
        username: BASIC_AUTH_USERNAME,
        password: BASIC_AUTH_PASSWORD,
      }

      return originalFn(url, { auth, ...options })
    })
})

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    })
  }

  return originalFn(element, text, options)
})

Cypress.Commands.add('login', (email, password) => {
  homePage.open()
  homePage.clickSignIn()
  signInModal.shouldBeVisible()
  signInModal.login(email, password)
  signInModal.shouldBeClosed()
  garagePage.shouldBeOpen()
})

Cypress.Commands.add('clearBrowserStorages', () => {
  cy.clearAllCookies()
  cy.clearAllLocalStorage()
  cy.clearAllSessionStorage()
})

Cypress.Commands.add('resetCars', () => {
  cy.env([
    'BASIC_AUTH_USERNAME',
    'BASIC_AUTH_PASSWORD',
    'USER_EMAIL',
    'USER_PASSWORD',
  ]).then(({ BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD, USER_EMAIL, USER_PASSWORD }) => {
    const auth = { username: BASIC_AUTH_USERNAME, password: BASIC_AUTH_PASSWORD }

    cy.request({
      method: 'POST',
      url: '/api/auth/signin',
      auth,
      body: { email: USER_EMAIL, password: USER_PASSWORD, remember: false },
    })

    cy.request({ method: 'GET', url: '/api/cars', auth }).then(({ body }) => {
      body.data.forEach((car) => {
        cy.request({ method: 'DELETE', url: `/api/cars/${car.id}`, auth })
      })
    })
  })
})