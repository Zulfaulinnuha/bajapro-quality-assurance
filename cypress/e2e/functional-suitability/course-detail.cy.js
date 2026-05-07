describe('Course Detail Feature', () => {

  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false)

    cy.visit('/login')

    cy.get('input[name="email"]').type('testing@gmail.com')
    cy.get('input[name="password"]').type('testing12')
    cy.get('button[type="submit"]').click()

    // masuk ke detail course dulu
    cy.contains('See Detail').first().click()
    cy.url().should('include', '/courses')
  })

  it('FS_Course_Detail_001 - Informasi course tampil', () => {

    // Nama course (contoh: Java)
    cy.get('body').should('contain.text', 'Java')

    // Deskripsi course
    cy.get('body').then(($body) => {
      const text = $body.text()

      expect(text.length).to.be.greaterThan(0)
    })

    // Lesson & student
    cy.contains('Lesson').should('exist')
    cy.contains('Student').should('exist')
  })

  it('FS_Course_Detail_002 - Achievement Badge tampil', () => {

    // scroll ke bawah (biar section muncul)
    cy.scrollTo('bottom')

    // cek tabel badge
    cy.contains('Achievement').should('exist')

    cy.contains('Badge Name').should('exist')
    cy.contains('Badge Point Min').should('exist')
    cy.contains('Badge Point Max').should('exist')
  })

  it('FS_Course_Detail_003 - Leaderboard dalam course tampil', () => {

    cy.scrollTo('bottom')

    // cek section leaderboard
    cy.contains('Leaderboard').should('exist')

    // validasi header
    cy.contains('Rank').should('exist')
    cy.contains('Name').should('exist')
    cy.contains('Point').should('exist')
    cy.contains('Progress').should('exist')

    // validasi ada data
    cy.get('table tbody tr')
      .should('have.length.greaterThan', 0)
  })

})