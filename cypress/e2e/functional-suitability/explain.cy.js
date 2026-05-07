describe('Explanation Feature', () => {

  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false)

    cy.visit('/login')

    cy.get('input[name="email"]').type('testing@gmail.com')
    cy.get('input[name="password"]').type('testing12')
    cy.get('button[type="submit"]').click()
  })

  it('FS_Explain_001 - Buka halaman Explanation', () => {
    cy.contains('Explanation').click()

    cy.url().should('include', '/explain')
    cy.contains('Code Explanation').should('exist')
  })

  it('FS_Explain_002 - Tabel tampil', () => {
    cy.contains('Explanation').click()

    cy.get('table').should('exist')
    cy.get('tbody tr').should('have.length.greaterThan', 0)
  })

  it('FS_Explain_003 - Header tabel lengkap', () => {
    cy.contains('Explanation').click()

    cy.contains('Name').should('exist')
    cy.contains('Content').should('exist')
    cy.contains('Question').should('exist')
    cy.contains('Your Answer').should('exist')
    cy.contains('Answer Key').should('exist')
  })

  it('FS_Explain_004 - Jawaban essay tampil', () => {
    cy.contains('Explanation').click()

    cy.get('tbody tr').first().within(() => {
      cy.get('td').eq(3).should('not.be.empty') // kolom Your Answer
    })
  })

  it('FS_Explain_005 - Answer Key Not Available', () => {
    cy.contains('Explanation').click()

    cy.contains('Not Available').should('exist')
  })

  it('FS_Explain_006 - Pagination next', () => {
    cy.contains('Explanation').click()

    cy.get('body').then(($body) => {
      if ($body.find('a').text().includes('2')) {

        cy.contains('2').click()

        cy.get('tbody tr').should('exist')
      }
    })
  })

  it('FS_Explain_007 - Pagination back', () => {
    cy.contains('Explanation').click()

    cy.get('body').then(($body) => {
      if ($body.find('a').text().includes('2')) {

        cy.contains('2').click()
        cy.contains('1').click()

        cy.get('tbody tr').should('exist')
      }
    })
  })

  it('FS_Explain_008 - Scroll data', () => {
    cy.contains('Explanation').click()

    cy.scrollTo('bottom')

    cy.get('tbody tr').last().should('be.visible')
  })

})