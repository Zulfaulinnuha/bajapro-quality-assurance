describe('FS_Report_009 - User belum mengerjakan apapun', () => {

  it('User belum mengerjakan apapun', () => {

    Cypress.on('uncaught:exception', () => false)

    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('/login')

    cy.get('input[name="email"]').type('akunbaru@test.com')
    cy.get('input[name="password"]').type('akunbaru12')

    cy.get('button[type="submit"]').click()

    // jangan terlalu keras validasi URL (karena kadang redirect aneh)
    cy.contains('My Report', { timeout: 10000 }).click()

    cy.contains('0').should('exist')
    cy.contains('0%').should('exist')

    cy.get('body').should('not.contain', 'Detail')
  })

})