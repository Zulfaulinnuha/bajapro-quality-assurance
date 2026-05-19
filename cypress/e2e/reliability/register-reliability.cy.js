describe('Register Reliability', () => {

  it('Register successfully 5x without error', () => {

    Cypress.on('uncaught:exception', () => false)

    for(let i = 1; i <= 5; i++) {

      cy.visit('http://labai.polinema.ac.id:90/register')

      const email = `cimit${Date.now()}${i}@test.com`

      cy.get('input[name="name"]').type('Cimit')
      cy.get('select[name="class"]').select('D4 Teknik Informatika')
      cy.get('input[name="email"]').type(email)
      cy.get('input[name="password"]').type('Cimit1234')
      cy.get('input[name="password_confirmation"]').type('Cimit1234')

      cy.get('button[type="submit"]').click()

      cy.url().should('not.include', '/register')

      // logout
      cy.get('nav').contains('@').click()
      cy.contains('Logout').click()

      cy.url().should('include', '/login')
    }

  })

})