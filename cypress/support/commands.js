// Custom Command: Register
Cypress.Commands.add('register', (name, kelas, email, password, confirmPassword) => {
  cy.get('input[name="name"]').should('be.visible').clear().type(name)
  cy.get('select[name="class"]').should('be.visible').select(kelas)
  cy.get('input[name="email"]').should('be.visible').clear().type(email)
  cy.get('input[name="password"]').should('be.visible').clear().type(password)
  cy.get('input[name="password_confirmation"]').should('be.visible').clear().type(confirmPassword)
  cy.get('button[type="submit"]').should('be.visible').click()
})

Cypress.Commands.add('login', (email, password) => {
  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
})