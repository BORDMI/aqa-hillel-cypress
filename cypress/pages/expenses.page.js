const EXPENSES_URL = '/panel/expenses'

const elements = {
  table: () => cy.get('.expenses_table'),
  rows: () => cy.get('.expenses_table tbody tr'),
}

class ExpensesPage {
  open() {
    cy.visit(EXPENSES_URL)
    return this
  }

  shouldBeOpen() {
    cy.url().should('include', EXPENSES_URL)
    return this
  }

  shouldHaveExpense({ mileage, liters, totalCost }) {
    elements.rows().should(($rows) => {
      const match = [...$rows].some((row) => {
        const cells = row.querySelectorAll('td')
        return (
          cells[1]?.textContent.trim() === String(mileage) &&
          cells[2]?.textContent.trim() === `${liters}L` &&
          cells[3]?.textContent.trim() === `${totalCost}.00 USD`
        )
      })
      expect(match, 'a row matching the added fuel expense').to.equal(true)
    })
    return this
  }
}

export const expensesPage = new ExpensesPage()
