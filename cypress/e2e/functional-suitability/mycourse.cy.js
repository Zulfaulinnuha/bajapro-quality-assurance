describe('My Course Feature - Bajapro', () => {

  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false)
    cy.visit('http://103.182.234.231:90/login')
    cy.login('testing@gmail.com', 'testing12')
    cy.url().should('not.include', '/login')
  })

  it('FS_Course_001 - Buka halaman My Course', () => {
    cy.contains('My Course').click()
    cy.url().should('include', '/courses/my_course')
    cy.contains('Take Your Lesson now').should('be.visible')
  })

  it('FS_Course_003 - Masuk ke halaman level', () => {
    cy.contains('My Course').click()
    cy.contains('Start Lesson').click()
    cy.url().should('include', '/courses/level')
    cy.contains('Start Your Lesson now').should('be.visible')
  })

  it('FS_Course_004 - Pilih Level Easy', () => {
    cy.contains('My Course').click()
    cy.contains('Start Lesson').first().click()
    cy.contains('Easy').parent().contains('Start Lesson').click()
    cy.url().should('include', '/detail')
  })

  it('FS_Course_005 - Level Medium terkunci', () => {
    cy.contains('My Course').click()
    cy.contains('Start Lesson').click()
    cy.contains('Medium')
      .parent()
      .find('a')
      .should('have.attr', 'aria-disabled', 'true')
  })

   it('FS_Course_006 - Akses materi terbuka', () => {
    cy.contains('My Course').click()
    cy.contains('Start Lesson').first().click()

    cy.contains('Easy')
      .parent()
      .contains('Start Lesson')
      .click()

    cy.contains('Tipe Data, Variabel dan Operator')
      .first()
      .click()

    cy.get('iframe').should('exist')
    cy.contains('Variabel').should('be.visible')
  })

  it('FS_Course_007 - Materi dalam accordion terkunci tidak bisa diakses', () => {

  cy.contains('My Course').click()
  cy.contains('Start Lesson').first().click()

  cy.contains('Easy')
    .parent()
    .contains('Start Lesson')
    .click()

  // 1. buka accordion "Sintaks Pemilihan 1"
  cy.contains('Sintaks Pemilihan 1').click()

  // 2. pastikan dropdown muncul
  cy.get('#accordionExample .accordion-collapse.show')
    .should('exist')

  // 3. ambil item yang terkunci di dalamnya
  cy.get('#accordionExample .accordion-collapse.show a[href*="void"]')
    .first()
    .as('lockedItem')

  // 4. simpan URL
  cy.url().then((beforeUrl) => {

    // 5. coba klik item terkunci
    cy.get('@lockedItem').click({ force: true })

    // 6. pastikan tidak pindah halaman
    cy.url().should('eq', beforeUrl)

  })

})

  it('FS_Course_008 - Tampilan materi lengkap', () => {
    cy.contains('My Course').click()
    cy.contains('Start Lesson').first().click()

    cy.contains('Easy')
      .parent()
      .contains('Start Lesson')
      .click()

    cy.contains('Tipe Data, Variabel dan Operator')
      .first()
      .click()

    cy.get('iframe').should('be.visible')
    cy.contains('Variabel').should('be.visible')
    cy.contains("Let's Test").should('be.visible')
  })

  it('FS_Course_009 - Akses Let’s Test', () => {
    cy.contains('My Course').click()
    cy.contains('Start Lesson').first().click()

    cy.contains('Easy')
      .parent()
      .contains('Start Lesson')
      .click()

    cy.contains('Tipe Data, Variabel dan Operator')
      .first()
      .click()

    cy.contains("Let's Test").click()

    cy.url().should('include', '/code')
  })

})

it('FS_Course_033 - User baru mengambil course', () => {

  Cypress.on('uncaught:exception', () => false)

  cy.visit('/login')

  cy.get('input[name="email"]').type('akunbaru2@test.com')
  cy.get('input[name="password"]').type('akunbaru12')

  cy.get('button[type="submit"]').click()

  cy.url().should('not.include', '/login')

  cy.contains('Take')
    .first()
    .click()

  cy.wait(3000)

  // validasi tombol Take hilang
  cy.contains('Take').should('not.exist')

  // masuk ke My Course
  cy.contains('My Course').click()

  cy.url().should('include', '/courses/my_course')

  // validasi course berhasil diambil
  cy.contains('Start Lesson')
    .should('be.visible')

})