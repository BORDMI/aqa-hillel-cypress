const elements = {
  modal: () => cy.get('.modal-content'),
  title: () => cy.get('.modal-content .modal-title'),
  car: () => cy.get('#addExpenseCar'),
  date: () => cy.get('#addExpenseDate'),
  mileage: () => cy.get('#addExpenseMileage'),
  liters: () => cy.get('#addExpenseLiters'),
  totalCost: () => cy.get('#addExpenseTotalCost'),
  addButton: () => cy.get('.modal-content button.btn-primary'),
}

class FuelExpenseModal {
  shouldBeVisible() {
    elements.modal().should('be.visible')
    elements.title().should('contain', 'Add an expense')
    return this
  }

  shouldBeClosed() {
    elements.modal().should('not.exist')
    return this
  }

  typeMileage(mileage) {
    elements.mileage().clear().type(String(mileage))
    return this
  }

  typeLiters(liters) {
    elements.liters().clear().type(String(liters))
    return this
  }

  typeTotalCost(totalCost) {
    elements.totalCost().clear().type(String(totalCost))
    return this
  }

  submit() {
    elements.addButton().click()
    return this
  }

  fill({ mileage, liters, totalCost }) {
    this.typeMileage(mileage)
    this.typeLiters(liters)
    this.typeTotalCost(totalCost)
    return this
  }
}

export const fuelExpenseModal = new FuelExpenseModal()
