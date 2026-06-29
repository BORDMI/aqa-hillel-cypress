const elements = {
  modal: () => cy.get('.modal-content'),
  title: () => cy.get('.modal-content .modal-title'),
  brand: () => cy.get('#addCarBrand'),
  model: () => cy.get('#addCarModel'),
  modelOption: (model) => cy.get('#addCarModel').contains('option', model),
  mileage: () => cy.get('#addCarMileage'),
  addButton: () => cy.get('.modal-content button.btn-primary'),
}

class AddCarModal {
  shouldBeVisible() {
    elements.modal().should('be.visible')
    elements.title().should('contain', 'Add a car')
    return this
  }

  shouldBeClosed() {
    elements.modal().should('not.exist')
    return this
  }

  selectBrand(brand) {
    elements.brand().select(brand)
    elements.brand().find('option:selected').should('have.text', brand)
    return this
  }

  selectModel(model) {
    elements.modelOption(model).should('exist')
    elements.model().select(model)
    elements.model().find('option:selected').should('have.text', model)
    return this
  }

  typeMileage(mileage) {
    elements.mileage().clear().type(String(mileage))
    return this
  }

  submit() {
    elements.addButton().click()
    return this
  }

  fill({ brand, model, mileage }) {
    this.selectBrand(brand)
    this.selectModel(model)
    this.typeMileage(mileage)
    return this
  }
}

export const addCarModal = new AddCarModal()
