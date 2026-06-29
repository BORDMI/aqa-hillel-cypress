const elements = {
  signUpButton: () => cy.contains('button', 'Sign up'),
  signInButton: () => cy.get('header').contains('button', 'Sign In'),
}

class HomePage {
  open() {
    cy.visit('/')
    return this
  }

  clickSignUp() {
    elements.signUpButton().click()
    return this
  }

  clickSignIn() {
    elements.signInButton().click()
    return this
  }
}

export const homePage = new HomePage()
