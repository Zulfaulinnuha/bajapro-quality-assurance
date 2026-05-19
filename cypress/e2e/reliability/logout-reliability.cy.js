describe('Reliability Testing - Logout', () => {

  const ITERATION = 30

  beforeEach(() => {

    Cypress.on('uncaught:exception', () => false)

    cy.visit('http://labai.polinema.ac.id:90/login', {
      failOnStatusCode: false,
      timeout: 180000,
    })

    cy.wait(3000)

    cy.get('body', { timeout: 60000 })
      .should('be.visible')

    cy.get('input[name="email"]', { timeout: 60000 })
      .clear()
      .type(Cypress.env('EMAIL'))

    cy.get('input[name="password"]', { timeout: 60000 })
      .clear()
      .type(Cypress.env('PASSWORD'), { log: false })

    cy.get('button[type="submit"]')
      .click({ force: true })

    cy.url({ timeout: 60000 })
      .should('not.include', '/login')

    cy.wait(3000)

  })

  // =====================================================
  // FS_REL_007
  // =====================================================

  it('FS_REL_007 - Stress test logout (30x)', () => {

    let success = 0

    Cypress._.times(ITERATION, (i) => {

      // buka dropdown profile
      cy.get('nav')
        .contains('@')
        .click({ force: true })

      cy.wait(1000)

      // klik logout TANPA should visible
      cy.contains('Logout')
        .click({ force: true })

      // validasi logout
      cy.url({ timeout: 60000 })
        .should('include', '/login')

      success++

      cy.log(`Logout berhasil ke-${i + 1}`)

      cy.wait(3000)

      // login ulang
      cy.get('input[name="email"]', { timeout: 60000 })
        .clear()
        .type(Cypress.env('EMAIL'))

      cy.get('input[name="password"]', { timeout: 60000 })
        .clear()
        .type(Cypress.env('PASSWORD'), { log: false })

      cy.get('button[type="submit"]')
        .click({ force: true })

      cy.url({ timeout: 60000 })
        .should('not.include', '/login')

      cy.wait(3000)

    })

    cy.then(() => {

      const percentage = (success / ITERATION) * 100

      cy.log(`Success Rate: ${percentage}%`)

      expect(success).to.equal(ITERATION)

    })

  })

})