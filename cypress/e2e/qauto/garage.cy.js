import { garagePage } from '../../pages/garage.page'
import { expensesPage } from '../../pages/expenses.page'
import { fuelExpenseModal } from '../../pages/components/fuelExpense.modal'
import { Car } from '../../data/car'
import { FuelExpense } from '../../data/expense'

describe('Qauto — garage', () => {
  beforeEach(() => {
    cy.env(['USER_EMAIL', 'USER_PASSWORD']).then(({ USER_EMAIL, USER_PASSWORD }) => {
      cy.login(USER_EMAIL, USER_PASSWORD)
    })
  })

  after(() => {
    cy.resetCars()
  })

  it('adds a new car to the garage', () => {
    const car = Car.random({ brand: 'Ford', model: 'Fusion' })

    garagePage.open()
    garagePage.addCar(car)

    garagePage.firstCarName().should('have.text', car.name)
  })

  it('adds a fuel expense to a newly created car', () => {
    const car = Car.random()
    const expense = FuelExpense.random()

    garagePage.open()
    garagePage.addCar(car)
    garagePage.clickAddFuelExpenseForFirstCar()

    fuelExpenseModal.shouldBeVisible()
    fuelExpenseModal.fill(expense)
    fuelExpenseModal.submit()
    fuelExpenseModal.shouldBeClosed()

    expensesPage.open()
    expensesPage.shouldBeOpen()
    expensesPage.shouldHaveExpense(expense)
  })
})
