const BASIC_AUTH = {
  username: 'guest',
  password: 'welcome2qauto',
}

Cypress.Commands.overwrite('visit', (originalFn, url, options = {}) => {
  return originalFn(url, { auth: BASIC_AUTH, ...options })
})
