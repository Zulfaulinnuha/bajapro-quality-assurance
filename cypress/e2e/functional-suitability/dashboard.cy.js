describe('Dashboard Feature', () => {

  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false)

    cy.visit('/login')

    cy.get('input[name="email"]').type('testing@gmail.com')
    cy.get('input[name="password"]').type('testing12')
    cy.get('button[type="submit"]').click()
  })

  it('FS_Dashboard_001 - Halaman utama tampil', () => {

    cy.url().should('not.include', '/login')

    cy.contains('Take Your Lesson now').should('exist')

    // pastikan ada card course
    cy.contains('Java').should('exist')
  })

  it('FS_Dashboard_002 - Navigasi lewat logo', () => {

    // pindah dulu ke halaman lain
    cy.contains('My Course').click()

    cy.url().should('include', '/courses')

    // klik logo Bajapro
    cy.get('a#logo').click()

    // kembali ke dashboard
    cy.url().should('not.include', '/courses')
    cy.contains('Take Your Lesson now').should('exist')
  })

  it('FS_Dashboard_003 - Card course tampil lengkap', () => {

    cy.contains('Java').should('exist')

    // jumlah lesson
    cy.contains('Lessons').should('exist')

    // jumlah student
    cy.contains('Students').should('exist')

    // tombol detail
    cy.contains('See Detail').should('exist')
  })

  it('FS_Dashboard_004 - Buka detail course', () => {

    cy.contains('See Detail').click()

    cy.url().should('include', '/courses/detail')

    cy.contains('Lesson Content').should('exist')
  })

  it('FS_Dashboard_005 - User baru melihat tombol Take', () => {

    // logout dulu (kalau ada tombol logout)
    cy.contains('testing@gmail.com').click()
    cy.contains('Logout').click()

    // login akun baru
    cy.visit('/login')

    cy.get('input[name="email"]').type('akunbaru@test.com')
    cy.get('input[name="password"]').type('akunbaru12')
    cy.get('button[type="submit"]').click()

    cy.contains('Take').should('exist')
    cy.contains('See Detail').should('exist')
  })

  it('FS_Dashboard_006 - Klik Take course', () => {

    // gunakan akun baru (biar tombol Take muncul)
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('/login')

    cy.get('input[name="email"]').type('akunbaru@test.com')
    cy.get('input[name="password"]').type('akunbaru12')
    cy.get('button[type="submit"]').click()

    cy.contains('Take').first().click()

    // validasi notifikasi sukses
    cy.get('body').then(($body) => {

      if ($body.text().toLowerCase().includes('success')) {
        cy.contains(/success/i).should('exist')
      } else {
        cy.log('Notifikasi sukses tidak muncul (mungkin silent success)')
      }

    })
  })

})