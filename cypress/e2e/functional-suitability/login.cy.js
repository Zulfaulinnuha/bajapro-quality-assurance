describe('Login Feature - Bajapro', () => {

  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false)
    cy.visit('http://103.182.234.231:90/login')
    cy.url().should('include', '/login')
  })

  it('FS_Login_001 - Login berhasil dengan data valid', () => {
    cy.login('zulfanuha016@gmail.com', 'Zulfanuha14')
    cy.url().should('not.include', '/login')
  })

  it('FS_Login_002 - Email salah', () => {
    cy.login('salah@test.com', 'Zulfanuha14')
    cy.contains('These credentials do not match our records').should('be.visible')
  })

  it('FS_Login_003 - Password salah', () => {
    cy.login('zulfanuha016@gmail.com', 'SalahPassword')
    cy.contains('These credentials do not match our records').should('be.visible')
  })

  it('FS_Login_004 - Semua field kosong', () => {
    cy.get('button[type="submit"]').click()
    cy.get('input[name="email"]:invalid').should('exist')
  })

  it('FS_Login_005 - Email kosong', () => {
    cy.get('input[name="password"]').type('Zulfanuha14')
    cy.get('button[type="submit"]').click()
    cy.get('input[name="email"]:invalid').should('exist')
  })

  it('FS_Login_006 - Password kosong', () => {
    cy.get('input[name="email"]').type('zulfanuha016@gmail.com')
    cy.get('button[type="submit"]').click()
    cy.get('input[name="password"]:invalid').should('exist')
  })

  it('FS_Login_007 - Pindah ke halaman register', () => {
    cy.contains(/don't have an account/i).should('be.visible').click()
    cy.url().should('include', '/register')
  })

})