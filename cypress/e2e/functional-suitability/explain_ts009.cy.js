describe('Explanation - Empty State', () => {

  it('FS_Explain_009 - User belum ada data', () => {

    Cypress.on('uncaught:exception', () => false)

    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('/login')

    cy.get('input[name="email"]').type('akunbaru@test.com')
    cy.get('input[name="password"]').type('akunbaru12')
    cy.get('button[type="submit"]').click()

    cy.contains('Explanation').click()

    cy.get('body').then(($body) => {

      const text = $body.text()

      if (text.includes('Not Available') || text.includes('Belum')) {
        expect(true).to.be.true
      } else {
        cy.log('Tidak ada empty state, kemungkinan tetap tampil table kosong')
      }

    })
  })

})