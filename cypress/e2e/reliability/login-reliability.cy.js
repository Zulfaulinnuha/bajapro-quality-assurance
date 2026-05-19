describe('Reliability Testing - Login', () => {

  const ITERATION = 30

  beforeEach(() => {

    Cypress.on('uncaught:exception', () => false)

  })

  it('FS_REL_001 - Stress test login (30x)', () => {

    let success = 0

    Cypress._.times(ITERATION, (i) => {

      cy.clearCookies()
      cy.clearLocalStorage()

      cy.visit('http://labai.polinema.ac.id:90/login')

      cy.get('input[name="email"]')
        .clear()
        .type(Cypress.env('EMAIL'))

      cy.get('input[name="password"]')
        .clear()
        .type(Cypress.env('PASSWORD'), { log: false })

      cy.get('button[type="submit"]').click()

      cy.url({ timeout: 60000 })
        .should('not.include', '/login')
        .then(() => {

          success++

          cy.log(`Login berhasil ke-${i + 1}`)

        })

    })

    cy.then(() => {

      cy.log(`Success Rate: ${success}/${ITERATION}`)

      expect(success).to.equal(ITERATION)

    })

  })

})