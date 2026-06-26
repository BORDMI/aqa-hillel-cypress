import { homePage } from '../../pages/home.page'
import { registrationModal } from '../../pages/components/registration.modal'
import { garagePage } from '../../pages/garage.page'
import { User } from '../../data/user'

describe('Qauto — registration', {}, () => {
  beforeEach(() => {
    homePage.open()
    homePage.clickSignUp()
    registrationModal.shouldBeVisible()
  })

  describe('Required fields', () => {
    const REQUIRED = [
      { label: 'Name', field: 'name', message: 'Name is required' },
      { label: 'Last name', field: 'lastName', message: 'Last name is required' },
      { label: 'Email', field: 'email', message: 'Email required' },
      { label: 'Password', field: 'password', message: 'Password required' },
      { label: 'Re-enter password', field: 'repeatPassword', message: 'Re-enter password required' },
    ]

    REQUIRED.forEach(({ label, field, message }) => {
      it(`shows a validation error and a red border when "${label}" is left empty`, () => {
        registrationModal.focus(field)
        registrationModal.blur(field)
        registrationModal.shouldHaveErrorBorder(field)
        registrationModal.errorFor(field).should('contain', message)
      })
    })
  })

  describe('Invalid values', () => {
    describe('Name', () => {

      it('rejects a Name that contains non-letter characters', () => {
        registrationModal.type('name', '123')
        registrationModal.blur('name')
        registrationModal.errorFor('name').should('contain', 'Name is invalid')
      })

      it('rejects a Name shorter than 2 characters', () => {
        registrationModal.type('name', 'a')
        registrationModal.blur('name')
        registrationModal.errorFor('name').should('contain', 'Name has to be from 2 to 20 characters long')
      })

      it('rejects a Name longer than 20 characters', () => {
        registrationModal.type('name', 'a'.repeat(21))
        registrationModal.blur('name')
        registrationModal.errorFor('name').should('contain', 'Name has to be from 2 to 20 characters long')
      })

      it('name field is not accept a name longer than 20 characters with spaces', () => {
        registrationModal.type('name', ' '.repeat(20) + 'a') 
        registrationModal.blur('name')
        registrationModal.errorFor('name').should('contain', 'Name has to be from 2 to 20 characters long')
      })
    })

    describe('Last name', () => {

      it('rejects a Last name that contains non-letter characters', () => {
        registrationModal.type('lastName', '123')
        registrationModal.blur('lastName')
        registrationModal.errorFor('lastName').should('contain', 'Last name is invalid')
      })

      it('rejects a Last name longer than 20 characters', () => {
        registrationModal.type('lastName', 'a'.repeat(21))
        registrationModal.blur('lastName')
        registrationModal.errorFor('lastName').should('contain', 'Last name has to be from 2 to 20 characters long')
      })

      it('last name field is not accept a last name longer than 20 characters with spaces', () => {
        registrationModal.type('lastName', ' '.repeat(20) + 'a')
        registrationModal.blur('lastName')
        registrationModal.errorFor('lastName').should('contain', 'Last name has to be from 2 to 20 characters long')
      })
    })

    describe('Email', () => {
      it('rejects an incorrectly formatted email', () => {
        registrationModal.type('email', 'not-an-email')
        registrationModal.blur('email')
        registrationModal.errorFor('email').should('contain', 'Email is incorrect')
      })
    })

    describe('Password', () => {
      it('rejects a password that does not meet the complexity rules', () => {
        registrationModal.type('password', 'short')
        registrationModal.blur('password')
        registrationModal
          .errorFor('password')
          .should(
            'contain',
            'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
          )
      })

    it('rejects mismatched passwords', () => {
      registrationModal.type('password', 'Password1')
      registrationModal.type('repeatPassword', 'Password2')
      registrationModal.blur('repeatPassword')
      registrationModal.errorFor('repeatPassword').should('contain', 'Passwords do not match')
    })
  })

  describe('Register button state', () => {
    it('is disabled while the form is empty', () => {
      registrationModal.registerButton().should('be.disabled')
    })

    it('is disabled while the form contains invalid data', () => {
      registrationModal.fill(User.random({ email: 'not-an-email' }))
      registrationModal.registerButton().should('be.disabled')
    })

    it('is enabled once the form is filled with valid data', () => {
      registrationModal.fill(User.random())
      registrationModal.registerButton().should('be.enabled')
    })
  })
})

  describe('Successful registration', () => {
    const user = User.random()
    it('creates a new account and redirects to the garage page', () => {
      registrationModal.fill(user)
      registrationModal.submit()
      registrationModal.shouldBeClosed()
      garagePage.shouldBeOpen()
    })

    it('lets a freshly registered user log in via the login() command', () => {
      cy.login(user.email, user.password)
    })
  })
})