describe('Reliability Testing - Material Access', () => {

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
    // FS_REL_005
    // =====================================================

    it('FS_REL_005 - Stress test akses materi (30x)', () => {

    let success = 0

    Cypress._.times(ITERATION, (i) => {

        cy.visit('http://labai.polinema.ac.id:90/courses/my_course/1/1/detail/1', {
            timeout: 180000,
            failOnStatusCode: false,
        })

        cy.wait(3000)

        cy.contains('Tipe Data, Variabel dan Operator', {
            timeout: 60000
        })
            .first()
            .should('be.visible')
            .click({ force: true })

        cy.wait(3000)

        cy.get('iframe', { timeout: 60000 })
            .should('exist')

        cy.then(() => {
            success++
        })

        cy.log(`Materi berhasil dibuka ke-${i + 1}`)

    })

    cy.then(() => {

        const percentage = (success / ITERATION) * 100

        cy.log(`Success Rate: ${percentage}%`)

        expect(success).to.equal(ITERATION)

    })

})

    // =====================================================
    // FS_REL_006
    // =====================================================

    it('FS_REL_006 - Stress test halaman coding (30x)', () => {

        cy.contains('My Course', { timeout: 60000 })
            .should('be.visible')
            .click({ force: true })

        cy.wait(3000)

        cy.contains('Start Lesson', { timeout: 60000 })
            .first()
            .should('be.visible')
            .click({ force: true })

        cy.wait(3000)

        cy.contains('Easy', { timeout: 60000 })
            .parent()
            .contains('Start Lesson')
            .should('be.visible')
            .click({ force: true })

        cy.wait(3000)

        cy.contains('Tipe Data, Variabel dan Operator', {
            timeout: 60000
        })
            .first()
            .should('be.visible')
            .click({ force: true })

        cy.wait(3000)

        let success = 0

        Cypress._.times(ITERATION, (i) => {

            cy.contains("Let's Test", {
                timeout: 60000
            })
                .should('be.visible')
                .click({ force: true })

            cy.url({ timeout: 60000 })
                .should('include', '/code')

            cy.then(() => {
                success++
            })

            cy.log(`Halaman coding berhasil ke-${i + 1}`)

            cy.go('back')

            cy.wait(3000)

        })

        cy.then(() => {

            const percentage = (success / ITERATION) * 100

            cy.log(`Success Rate: ${percentage}%`)

            expect(success).to.equal(ITERATION)

        })

    })

})