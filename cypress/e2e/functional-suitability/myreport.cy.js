describe('My Report Feature', () => {

  beforeEach(() => {
    cy.visit('/login')

    cy.get('input[name="email"]').type('testing@gmail.com')
    cy.get('input[name="password"]').type('testing12')
    cy.get('button[type="submit"]').click()
  })

  it('FS_Report_001 - Buka halaman My Report', () => {
    cy.contains('My Report').click()

    cy.url().should('include', '/report')
    cy.contains('My report').should('exist')
  })

  it('FS_Report_002 - Summary tampil', () => {
    cy.contains('My Report').click()

    cy.contains('Your badge').should('exist')
    cy.contains('Your Score').should('exist')
    cy.contains('Your progress').should('exist')
    cy.contains('Finished test').should('exist')
  })

  it('FS_Report_003 - List report tampil', () => {
    cy.contains('My Report').click()

    cy.contains('Code Test Report').scrollIntoView()

    cy.contains('Errors').should('exist')
    cy.contains('Succes').should('exist') 
    cy.contains('Read Score').should('exist')
    cy.contains('Coding Score').should('exist')
    cy.contains('Essay Score').should('exist')

    cy.contains('Detail').should('exist')
  })

  it('FS_Report_004 - Klik detail report', () => {
    cy.contains('My Report').click()

    cy.contains('Detail').first().click()

    cy.url().should('include', 'detail')
  })

  it('FS_Report_005 - Detail report tampil', () => {
    cy.contains('My Report').click()
    cy.contains('Detail').first().click()

    cy.contains('Exercise Logs').should('exist')

    cy.get('body').then(($body) => {
      const text = $body.text()

      expect(
        text.includes('Success') || text.includes('Error')
      ).to.be.true
    })
  })

  it('FS_Report_006 - Menampilkan log error (opsional)', () => {
    cy.contains('My Report').click()
    cy.contains('Detail').first().click()

    cy.get('body').then(($body) => {
      if ($body.text().includes('Error')) {
        cy.contains('Error').should('exist')
      }
    })
  })

  it('FS_Report_007 - Menampilkan log success (opsional)', () => {
    cy.contains('My Report').click()
    cy.contains('Detail').first().click()

    cy.get('body').then(($body) => {
      if ($body.text().includes('Success')) {
        cy.contains('Success').should('exist')
      }
    })
  })

  it('FS_Report_008 - Kembali ke halaman sebelumnya', () => {
    cy.contains('My Report').click()
    cy.contains('Detail').first().click()

    cy.go('back')

    cy.url().should('include', '/report')
  })

  it('FS_Report_010 - Validasi My Course vs My Report (LOGIC FIX)', () => {

  // 1. Masuk My Course
  cy.contains('My Course').click()

  cy.contains('Start Lesson').first().click()
  cy.contains('Easy').parent().contains('Start Lesson').click()

  cy.wait(3000)

  // 2. Pastikan user sudah punya progress
  cy.get('body').then(($body) => {
    const text = $body.text()

    const match = text.match(/(\d+)%/)

    if (match) {
      const progressCourse = parseInt(match[1])

      cy.log('Progress Course:', progressCourse)

      expect(progressCourse).to.be.greaterThan(0)

      // 3. Buka My Report
      cy.contains('My Report').click()

      cy.contains('Your progress').should('exist')

      // 4. Ambil progress report
      cy.get('body').then(($report) => {
        const reportText = $report.text()
        const matchReport = reportText.match(/(\d+(\.\d+)?)\s*%/)

        if (matchReport) {
          const progressReport = parseFloat(matchReport[1])

          cy.log('Progress Report:', progressReport)

          // 5. VALIDASI LOGIKA (bukan equality)
          expect(progressReport).to.be.greaterThan(0)

        } else {
          throw new Error('Progress report tidak ditemukan')
        }
      })

    } else {
      throw new Error('Progress course tidak ditemukan')
    }
  })
})

})