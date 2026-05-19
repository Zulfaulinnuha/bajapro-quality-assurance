describe('Logout Feature - Bajapro', () => {

  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false)
    cy.visit('http://labai.polinema.ac.id:90/login')
    cy.login('zulfanuha016@gmail.com', 'Zulfanuha14')
    cy.url().should('not.include', '/login')
  })

  it('FS_Dashboard_001 - Menampilkan dropdown logout', () => {
    cy.get('nav').contains('@').click()
    cy.contains('Logout').should('be.visible')
  })

  it('FS_Dashboard_002 - User berhasil logout', () => {
    cy.get('nav').contains('@').click()
    cy.contains('Logout').click()
    cy.url().should('include', '/login')
  })

  // Secara teori user tidak boleh kembali ke dashboard setelah logout. Jika test gagal, berarti terdapat issue pada session management / cache.
  it('FS_Dashboard_003_BACK - Tidak bisa akses dashboard via tombol back', () => {
    cy.get('nav').contains('@').click()
    cy.contains('Logout').click()
    cy.url().should('include', '/login')
    cy.go('back')
    cy.url().should('include', '/login')
  })

})