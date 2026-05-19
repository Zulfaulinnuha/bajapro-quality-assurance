describe('Reliability Testing - Feature Navigation', () => {

    const ITERATION = 30

    // =====================================================
    // LOGIN SETUP
    // =====================================================

    beforeEach(() => {

        Cypress.on('uncaught:exception', () => false)

        cy.visit('http://labai.polinema.ac.id:90/login', {
            failOnStatusCode: false,
            timeout: 180000,
        })

        cy.wait(3000)

        cy.get('body', { timeout: 60000 })
            .should('be.visible')

        cy.get('input[name="email"]', { timeout: 60000 })
            .should('be.visible')
            .clear()
            .type(Cypress.env('EMAIL'))

        cy.get('input[name="password"]', { timeout: 60000 })
            .should('be.visible')
            .clear()
            .type(Cypress.env('PASSWORD'), { log: false })

        cy.get('button[type="submit"]', { timeout: 60000 })
            .should('be.visible')
            .click({ force: true })

        cy.url({ timeout: 60000 })
            .should('not.include', '/login')

        cy.wait(3000)

    })

    // =====================================================
    // FS_REL_002
    // =====================================================

    it('FS_REL_002 - Stress test My Course (30x)', () => {

        let success = 0

        Cypress._.times(ITERATION, (i) => {

            cy.visit('http://labai.polinema.ac.id:90/', {
                timeout: 180000,
                failOnStatusCode: false,
            })

            cy.wait(2000)

            cy.contains('My Course', { timeout: 60000 })
                .should('be.visible')
                .click({ force: true })

            cy.url({ timeout: 60000 })
                .should('include', '/courses/my_course')

            success++

            cy.log(`My Course berhasil ke-${i + 1}`)

        })

        cy.then(() => {

            const percentage = (success / ITERATION) * 100

            cy.log(`Success Rate: ${percentage}%`)

            expect(success).to.eq(ITERATION)

        })

    })

    // =====================================================
    // FS_REL_003
    // =====================================================

    it('FS_REL_003 - Stress test Detail Course (30x)', () => {

        let success = 0

        Cypress._.times(ITERATION, (i) => {

            cy.contains('See Detail', { timeout: 60000 })
                .first()
                .should('be.visible')
                .click({ force: true })

            cy.url({ timeout: 60000 })
                .should('include', '/courses')

            success++

            cy.log(`Detail Course berhasil ke-${i + 1}`)

            cy.wait(2000)

            cy.go('back')

            cy.wait(3000)

        })

        cy.then(() => {

            const percentage = (success / ITERATION) * 100

            cy.log(`Success Rate: ${percentage}%`)

            expect(success).to.equal(ITERATION)

        })

    })

    // =====================================================
    // FS_REL_004
    // =====================================================

    it('FS_REL_004 - Stress test Start Lesson (30x)', () => {

        let success = 0

        Cypress._.times(ITERATION, (i) => {

            cy.visit('http://labai.polinema.ac.id:90/courses/my_course', {
                timeout: 180000,
                failOnStatusCode: false,
            })

            cy.wait(3000)

            cy.contains('Start Lesson', { timeout: 60000 })
                .first()
                .should('be.visible')
                .click({ force: true })

            cy.url({ timeout: 60000 })
                .should('include', '/courses/level')

            success++

            cy.log(`Start Lesson berhasil ke-${i + 1}`)

        })

        cy.then(() => {

            const percentage = (success / ITERATION) * 100

            cy.log(`Success Rate: ${percentage}%`)

            expect(success).to.eq(ITERATION)

        })

    })

})