describe('Performance Efficiency - Feature', () => {

    const MAX_RESPONSE_TIME = 10000

    beforeEach(() => {

        Cypress.on('uncaught:exception', () => false)

        cy.visit('http://103.182.234.231:90/login')

        cy.get('input[name="email"]')
            .should('be.visible')
            .type(Cypress.env('EMAIL'))

        cy.get('input[name="password"]')
            .should('be.visible')
            .type(Cypress.env('PASSWORD'), { log: false })

        cy.get('button[type="submit"]').click()

        cy.url({ timeout: 60000 })
            .should('not.include', '/login')

    })

    it('FS_PERF_003 - Waktu respon halaman My Course', () => {

        const startTime = Date.now()

        cy.contains('My Course').click()

        cy.url({ timeout: 60000 })
            .should('include', '/courses/my_course')
            .then(() => {

                const duration = Date.now() - startTime

                cy.log(`Waktu respon My Course: ${duration} ms`)

                expect(duration).to.be.lessThan(MAX_RESPONSE_TIME)

            })

    })

    it('FS_PERF_004 - Waktu respon detail course', () => {

        cy.contains('See Detail')
            .first()
            .should('be.visible')

        const startTime = Date.now()

        cy.contains('See Detail')
            .first()
            .click()

        cy.url({ timeout: 60000 })
            .should('include', '/courses')
            .then(() => {

                const duration = Date.now() - startTime

                cy.log(`Waktu respon detail course: ${duration} ms`)

                expect(duration).to.be.lessThan(MAX_RESPONSE_TIME)

            })

    })

    it('FS_PERF_005 - Waktu respon halaman level', () => {

        cy.contains('My Course').click()

        const startTime = Date.now()

        cy.contains('Start Lesson')
            .first()
            .click()

        cy.url({ timeout: 60000 })
            .should('include', '/courses/level')
            .then(() => {

                const duration = Date.now() - startTime

                cy.log(`Waktu respon halaman level: ${duration} ms`)

                expect(duration).to.be.lessThan(MAX_RESPONSE_TIME)

            })

    })

    it('FS_PERF_006 - Waktu respon membuka materi', () => {

        cy.contains('My Course').click()

        cy.contains('Start Lesson')
            .first()
            .click()

        cy.contains('Easy')
            .parent()
            .contains('Start Lesson')
            .click()

        const startTime = Date.now()

        cy.contains('Tipe Data, Variabel dan Operator')
            .first()
            .click({ force: true })

        cy.get('iframe', { timeout: 60000 })
            .should('exist')
            .then(() => {

                const duration = Date.now() - startTime

                cy.log(`Waktu respon membuka materi: ${duration} ms`)

                expect(duration).to.be.lessThan(MAX_RESPONSE_TIME)

            })

    })

    it('FS_PERF_007 - Waktu respon halaman coding', () => {

        cy.contains('My Course').click()

        cy.contains('Start Lesson')
            .first()
            .click()

        cy.contains('Easy')
            .parent()
            .contains('Start Lesson')
            .click()

        cy.contains('Tipe Data, Variabel dan Operator')
            .first()
            .click({ force: true })

        const startTime = Date.now()

        cy.contains("Let's Test").click()

        cy.url({ timeout: 60000 })
            .should('include', '/code')
            .then(() => {

                const duration = Date.now() - startTime

                cy.log(`Waktu respon halaman coding: ${duration} ms`)

                expect(duration).to.be.lessThan(MAX_RESPONSE_TIME)

            })

    })

})