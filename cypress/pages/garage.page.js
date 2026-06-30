import { addCarModal } from './components/addCar.modal'

const GARAGE_URL = '/panel/garage'

const elements = {
  addCarButton: () => cy.contains('button', 'Add car'),
  carNames: () => cy.get('.car_name'),
  addFuelExpenseButtons: () => cy.get('.car_add-expense'),
}

class GaragePage {
  open() {
    cy.visit(GARAGE_URL)
    return this
  }

  shouldBeOpen() {
    cy.url().should('include', GARAGE_URL)
    return this
  }

  clickAddCar() {
    elements.addCarButton().click()
    return this
  }

  addCar({ brand, model, mileage }) {
    this.clickAddCar()
    addCarModal.shouldBeVisible()
    addCarModal.fill({ brand, model, mileage })
    addCarModal.submit()
    addCarModal.shouldBeClosed()
    return this
  }

  carNames() {
    return elements.carNames()
  }

  firstCarName() {
    return elements.carNames().first()
  }

  checkFirstCarNameIsEqual(carName) {
    return this.firstCarName().should('have.text', carName)
  }

  clickAddFuelExpenseForFirstCar() {
    elements.addFuelExpenseButtons().first().click()
    return this
  }
}

export const garagePage = new GaragePage()
