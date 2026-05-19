describe('Register Performance - Bajapro', () => {

  beforeEach(() => {

    Cypress.on('uncaught:exception', () => false)

    cy.visit('http://labai.polinema.ac.id:90/login')

    cy.contains(/don't have an account/i)
      .should('be.visible')
      .click()

    cy.url().should('include', '/register')

  })

  it('Register page load performance', () => {

    const start = Date.now()

    cy.get('form')
      .should('be.visible')
      .then(() => {

        const loadTime = Date.now() - start

        cy.log(`Register Load Time: ${loadTime} ms`)

        expect(loadTime).to.be.lessThan(5000)

      })
  })

  it('Register process performance', () => {

    const email = `cimit${Date.now()}@test.com`

    const start = Date.now()

    cy.get('input[name="name"]')
      .should('be.visible')
      .type('Cimit')

    cy.get('select[name="class"]')
      .select('D4 Teknik Informatika')

    cy.get('input[name="email"]')
      .type(email)

    cy.get('input[name="password"]')
      .type('Cimit1234')

    cy.get('input[name="password_confirmation"]')
      .type('Cimit1234')

    cy.get('button[type="submit"]')
      .click()

    cy.url({ timeout: 60000 })
      .should('not.include', '/register')
      .then(() => {

        const responseTime = Date.now() - start

        cy.log(`Register Response Time: ${responseTime} ms`)

        expect(responseTime).to.be.lessThan(5000)

      })

  })

})