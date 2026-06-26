const GARAGE_URL = '/panel/garage'

class GaragePage {
  shouldBeOpen() {
    cy.url().should('include', GARAGE_URL)
    return this
  }
}

export const garagePage = new GaragePage()
