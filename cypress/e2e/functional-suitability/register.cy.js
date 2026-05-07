describe('Register Feature - Bajapro', () => {

  beforeEach(() => {
    // ignore error Quill
    Cypress.on('uncaught:exception', () => false)

    // buka login
    cy.visit('http://103.182.234.231:90/login')

    // tunggu sampai element siap (hindari token expired)
    cy.contains("Don't have an account")
      .should('be.visible')
      .click()

    // pastikan sudah di halaman register
    cy.url().should('include', '/register')
  })

  // POSITIVE TEST

  it('FS_Register_001 - Register berhasil dengan data valid', () => {

    const email = `cimit${Date.now()}@test.com`

    cy.register(
      'Cimit',
      'D4 Teknik Informatika',
      email,
      'Cimit1234',
      'Cimit1234'
    )
    cy.url().should('not.include', '/register')
  })

  // NEGATIVE TEST - REQUIRED FIELD

  it('FS_Register_002 - Semua field kosong', () => {
    cy.get('button[type="submit"]').click()
    cy.get('input[name="name"]:invalid').should('exist')
  })

  it('FS_Register_003 - Full Name kosong', () => {
    cy.get('select[name="class"]').select('D4 Teknik Informatika')
    cy.get('input[name="email"]').type('cimit@test.com')
    cy.get('input[name="password"]').type('Cimit1234')
    cy.get('input[name="password_confirmation"]').type('Cimit1234')

    cy.get('button[type="submit"]').click()
    cy.get('input[name="name"]:invalid').should('exist')
  })

  it('FS_Register_004 - Class tidak dipilih (tidak ada validasi UI)', () => {

  cy.get('input[name="name"]').type('Cimit')
  cy.get('input[name="email"]').type(`cimit${Date.now()}@test.com`)
  cy.get('input[name="password"]').type('Cimit1234')
  cy.get('input[name="password_confirmation"]').type('Cimit1234')

  cy.get('button[type="submit"]').click()

  cy.url().should('include', '/register')

  cy.get('form').should('exist')

  // VALIDASI UTAMA

  // 1. password reset
  cy.get('input[name="password"]').should('have.value', '')
  cy.get('input[name="password_confirmation"]').should('have.value', '')

  // 2. class belum dipilih user (cek selectedIndex)
  cy.get('select[name="class"]').then(($el) => {
    expect($el[0].selectedIndex).to.equal(0)
  })
})

  it('FS_Register_005 - Email kosong', () => {
    cy.get('input[name="name"]').type('Cimit')
    cy.get('select[name="class"]').select('D4 Teknik Informatika')
    cy.get('input[name="password"]').type('Cimit1234')
    cy.get('input[name="password_confirmation"]').type('Cimit1234')

    cy.get('button[type="submit"]').click()
    cy.get('input[name="email"]:invalid').should('exist')
  })

  it('FS_Register_006 - Password kosong', () => {
    cy.get('input[name="name"]').type('Cimit')
    cy.get('select[name="class"]').select('D4 Teknik Informatika')
    cy.get('input[name="email"]').type('cimit@test.com')
    cy.get('input[name="password_confirmation"]').type('Cimit1234')

    cy.get('button[type="submit"]').click()
    cy.get('input[name="password"]:invalid').should('exist')
  })

  it('FS_Register_007 - Confirm Password kosong', () => {

  cy.get('input[name="name"]').type('Cimit')
  cy.get('select[name="class"]').select('D4 Teknik Informatika')
  cy.get('input[name="email"]').type('cimit@test.com')
  cy.get('input[name="password"]').type('Cimit1234')

  // confirm password dikosongkan
  cy.get('button[type="submit"]').click()

  // 1. tetap di halaman register
  cy.url().should('include', '/register')

  // 2. muncul error backend
  cy.contains('The password confirmation does not match').should('exist')
})

  // NEGATIVE TEST - VALIDATION LOGIC

  it('FS_Register_008 - Email tidak valid', () => {
    cy.register(
      'Cimit',
      'D4 Teknik Informatika',
      'Cimit12',
      'Cimit1234',
      'Cimit1234'
    )

    cy.get('input[name="email"]:invalid').should('exist')
  })

 it('FS_Register_009 - Password tidak sama', () => {

  cy.get('input[name="name"]').type('Cimit')
  cy.get('select[name="class"]').select('D4 Teknik Informatika')
  cy.get('input[name="email"]').type(`cimit${Date.now()}@test.com`)
  cy.get('input[name="password"]').type('Cimit123')
  cy.get('input[name="password_confirmation"]').type('Cimit1234')

  cy.get('button[type="submit"]').click()

  // 1. tetap di halaman register
  cy.url().should('include', '/register')

  // 2. error muncul
  cy.get('.invalid-feedback')
    .contains('password')
    .should('be.visible')

  // 3. password ke-reset
  cy.get('input[name="password"]').should('have.value', '')
  cy.get('input[name="password_confirmation"]').should('have.value', '')

  // 4. class kembali ke default (FIX DI SINI)
  cy.get('select[name="class"]').should('have.value', 'Choose class')
})

  it('FS_Register_010 - Email sudah terdaftar', () => {
    cy.register(
      'Cimit',
      'D4 Teknik Informatika',
      'zulfanuha016@gmail.com',
      'Cimit1234',
      'Cimit1234'
    )

    cy.contains('The email has already been taken').should('exist')
  })

  // NAVIGATION TEST

  it('FS_Register_011 - Pindah ke halaman login', () => {

  cy.contains('SignIn')
    .should('be.visible')
    .click()

  cy.url().should('include', '/login')
})
})