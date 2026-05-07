describe('Leaderboard Feature (FULL TEST)', () => {

  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false)

    cy.visit('/login')

    cy.get('input[name="email"]').type('testing@gmail.com')
    cy.get('input[name="password"]').type('testing12')
    cy.get('button[type="submit"]').click()
  })

  it('FS_Leaderboard_001 - Buka halaman leaderboard', () => {
    cy.contains('Leaderboard').click()

    cy.url().should('include', '/leaderboard')
    cy.contains('Leaderboard').should('exist')
  })

  it('FS_Leaderboard_002 - Tabel leaderboard tampil', () => {
    cy.contains('Leaderboard').click()

    cy.get('#leaderboard-table').should('exist')
    cy.get('#leaderboard-table tbody tr')
      .should('have.length.greaterThan', 0)
  })

  it('FS_Leaderboard_003 - Header tabel lengkap', () => {
    cy.contains('Leaderboard').click()

    cy.contains('No').should('exist')
    cy.contains('Badge Name').should('exist')
    cy.contains('Badge').should('exist')
    cy.contains('Name').should('exist')
    cy.contains('Class').should('exist')
    cy.contains('Score').should('exist')
  })
==
  it('FS_Leaderboard_004 - Ranking sesuai score (DESC)', () => {
    cy.contains('Leaderboard').click()

    const scores = []

    cy.get('#leaderboard-table tbody tr').each(($row) => {
      cy.wrap($row)
        .find('td')
        .eq(5) // kolom score
        .invoke('text')
        .then((text) => {
          const score = parseInt(text.trim())
          scores.push(score)
        })
    })
    .then(() => {
      const sorted = [...scores].sort((a, b) => b - a)
      expect(scores).to.deep.equal(sorted)
    })
  })

  it('FS_Leaderboard_005 - Badge tampil', () => {
    cy.contains('Leaderboard').click()

    cy.get('#leaderboard-table tbody tr').each(($row) => {
      cy.wrap($row)
        .find('td')
        .eq(2) // kolom badge
        .find('img')
        .should('exist')
    })
  })

  it('FS_Leaderboard_006 - Name wajib, Class opsional', () => {
  cy.contains('Leaderboard').click()

  cy.get('#leaderboard-table tbody tr').each(($row) => {
    cy.wrap($row).within(() => {

      // Name wajib
      cy.get('td').eq(3).should('not.be.empty')

      // Class opsional → cukup cek element ada
      cy.get('td').eq(4).should('exist')

    })
  })
})

  it('FS_Leaderboard_007 - Scroll leaderboard', () => {
    cy.contains('Leaderboard').click()

    cy.scrollTo('bottom')

    cy.get('#leaderboard-table tbody tr')
      .last()
      .should('be.visible')
  })

  it('FS_Leaderboard_008 - Validasi score dengan My Report', () => {

    // ambil score dari My Report
    cy.contains('My Report').click()

    cy.contains('Your Score').should('exist')

    cy.get('body').then(($body) => {
      const text = $body.text()

      const match = text.match(/\d+/)

      if (match) {

        const myScore = match[0]
        cy.log('My Score:', myScore)

        // buka leaderboard
        cy.contains('Leaderboard').click()

        // cek score muncul di leaderboard
        cy.contains(myScore).should('exist')

      } else {
        cy.log('Score tidak ditemukan di My Report')
      }
    })
  })

})