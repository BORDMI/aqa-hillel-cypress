const elements = {
  modal: () => cy.get('.modal-content'),
  title: () => cy.get('.modal-content h4'),
  email: () => cy.get('#signinEmail'),
  password: () => cy.get('#signinPassword'),
  loginButton: () => cy.get('.modal-content button.btn-primary'),
}

class SignInModal {
  shouldBeVisible() {
    elements.modal().should('be.visible')
    elements.title().should('contain', 'Log in')
    return this
  }

  shouldBeClosed() {
    elements.modal().should('not.exist')
    return this
  }

  typeEmail(email) {
    elements.email().type(email)
    return this
  }

  typePassword(password) {
    elements.password().type(password, { sensitive: true })
    return this
  }

  submit() {
    elements.loginButton().click()
    return this
  }

  login(email, password) {
    this.typeEmail(email)
    this.typePassword(password)
    this.submit()
    return this
  }
}

export const signInModal = new SignInModal()
