describe('Performance Efficiency - Login', () => {

    const MAX_RESPONSE_TIME = 10000
    const MAX_CONSISTENCY_TIME = 15000

    beforeEach(() => {
        Cypress.on('uncaught:exception', () => false)
    })

    it('FS_PERF_001 - Waktu respon halaman login', () => {

        const startTime = Date.now()

        cy.visit('http://labai.polinema.ac.id:90/login')

        cy.get('input[name="email"]')
            .should('be.visible')
            .then(() => {

                const duration = Date.now() - startTime

                cy.log(`Waktu respon halaman login: ${duration} ms`)

                expect(duration).to.be.lessThan(MAX_RESPONSE_TIME)

            })

    })

    it('FS_PERF_002 - Waktu respon setelah login', () => {

        cy.visit('http://labai.polinema.ac.id:90/login')

        cy.get('input[name="email"]')
            .type(Cypress.env('EMAIL'))

        cy.get('input[name="password"]')
            .type(Cypress.env('PASSWORD'), { log: false })

        const startTime = Date.now()

        cy.get('button[type="submit"]').click()

        cy.url({ timeout: 60000 })
            .should('not.include', '/login')
            .then(() => {

                const duration = Date.now() - startTime

                cy.log(`Waktu respon login: ${duration} ms`)

                expect(duration).to.be.lessThan(MAX_RESPONSE_TIME)

            })

    })

    it('FS_PERF_010 - Konsistensi waktu respon login', () => {

        function runLoginTest(iteration) {

            cy.visit('http://labai.polinema.ac.id:90/login')

            cy.get('input[name="email"]')
                .clear()
                .type(Cypress.env('EMAIL'))

            cy.get('input[name="password"]')
                .clear()
                .type(Cypress.env('PASSWORD'), { log: false })

            const startTime = Date.now()

            cy.get('button[type="submit"]').click()

            cy.url({ timeout: 60000 })
                .should('not.include', '/login')
                .then(() => {

                    const duration = Date.now() - startTime

                    cy.log(`Percobaan ${iteration}: ${duration} ms`)

                    expect(duration).to.be.lessThan(MAX_CONSISTENCY_TIME)

                })

        }

        runLoginTest(1)

        cy.clearCookies()
        cy.clearLocalStorage()

        runLoginTest(2)

        cy.clearCookies()
        cy.clearLocalStorage()

        runLoginTest(3)

    })

})