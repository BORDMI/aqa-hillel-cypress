const elements = {
  modal: () => cy.get('.modal-content'),
  title: () => cy.get('.modal-content h4'),
  name: () => cy.get('#signupName'),
  lastName: () => cy.get('#signupLastName'),
  email: () => cy.get('#signupEmail'),
  password: () => cy.get('#signupPassword'),
  repeatPassword: () => cy.get('#signupRepeatPassword'),
  registerButton: () => cy.get('.modal-content button.btn-primary'),
  errorFor: (name) =>
    elements[name]().parents('.form-group').first().find('.invalid-feedback'),
}

const SENSITIVE_FIELDS = ['password', 'repeatPassword']

const INVALID_BORDER_COLOR = 'rgb(220, 53, 69)'

class RegistrationModal {

  shouldBeVisible() {
    elements.modal().should('be.visible')
    elements.title().should('contain', 'Registration')
    return this
  }

  shouldBeClosed() {
    elements.modal().should('not.exist')
    return this
  }

  field(name) {
    return elements[name]()
  }

  registerButton() {
    return elements.registerButton()
  }

  errorFor(name) {
    return elements.errorFor(name)
  }

  shouldHaveErrorBorder(name) {
    elements[name]().should('have.class', 'is-invalid')
    elements[name]().should('have.css', 'border-color', INVALID_BORDER_COLOR)
    return this
  }

  shouldBeValid(name) {
    elements[name]().should('not.have.class', 'is-invalid')
    this.errorFor(name).should('not.exist')
    return this
  }

  type(name, value) {
    const options = SENSITIVE_FIELDS.includes(name) ? { sensitive: true } : {}
    elements[name]().type(value, options)
    return this
  }

  focus(name) {
    elements[name]().focus()
    return this
  }

  blur(name) {
    elements[name]().blur()
    return this
  }

  fill({ name, lastName, email, password, repeatPassword }) {
    if (name !== undefined) this.type('name', name)
    if (lastName !== undefined) this.type('lastName', lastName)
    if (email !== undefined) this.type('email', email)
    if (password !== undefined) this.type('password', password)
    if (repeatPassword !== undefined) this.type('repeatPassword', repeatPassword)
    return this
  }

  submit() {
    elements.registerButton().click()
    return this
  }

  clear(name) {
    elements[name]().clear()
    return this
  }
}

export const registrationModal = new RegistrationModal()
