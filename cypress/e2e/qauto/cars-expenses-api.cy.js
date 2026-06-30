import { garagePage } from '../../pages/garage.page'
import { expensesPage } from '../../pages/expenses.page'
import { garageApi } from '../../api/garageApi'
import { Car } from '../../data/car'
import { FuelExpense } from '../../data/expense'

describe('Qauto — intercepting created car id & creating expenses via API', () => {
  const car = Car.random()
  const expense = FuelExpense.random()
  let carId

  beforeEach(() => {
    cy.env(['USER_EMAIL', 'USER_PASSWORD']).then(({ USER_EMAIL, USER_PASSWORD }) => {
      cy.loginByApi(USER_EMAIL, USER_PASSWORD)
    })
  })

  after(() => {
    cy.resetCars()
  })

  it('Create a car via UI and capture its id from the intercepted response', () => {
    cy.intercept('POST', '/api/cars').as('createCar')

    garagePage.open()
    garagePage.addCar(car)

    cy.wait('@createCar').then(({ response }) => {
      expect(response.statusCode).to.eq(201)
      expect(response.body.status).to.eq('ok')
      expect(response.body.data.brand).to.eq(car.brand)
      expect(response.body.data.model).to.eq(car.model)

      carId = response.body.data.id
      expect(carId).to.be.a('number')
    })

    garagePage.checkFirstCarNameIsEqual(car.name)
  })

  it('Check created carId is present in getCars API response', () => {
    garageApi.getCars().then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.status).to.eq('ok')

      const createdCar = body.data.find((item) => item.id === carId)

      expect(createdCar, `car with id ${carId} is present in the list`).to.exist
      expect(createdCar.brand).to.eq(car.brand)
      expect(createdCar.model).to.eq(car.model)
      expect(createdCar.mileage).to.eq(car.mileage)
    })
  })

  it('Create an expense for the created car via API', () => {
    cy.createExpense(expense.payload(carId)).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.status).to.eq('ok')

      const data = body.data
      expect(data.id).to.be.a('number')
      expect(data.carId).to.eq(carId)
      expect(data.reportedAt).to.eq(expense.reportedAt)
      expect(data.mileage).to.eq(expense.mileage)
      expect(data.liters).to.eq(expense.liters)
      expect(data.totalCost).to.eq(expense.totalCost)
    })
  })

  it('Check created expense on UI', () => {
    garagePage.open()
    garagePage.checkFirstCarNameIsEqual(car.name)

    expensesPage.open()
    expensesPage.shouldBeOpen()
    expensesPage.shouldHaveExpense(expense)
  })
})
