describe('Lesson Content Feature', () => {

  const EMAIL = Cypress.env('EMAIL');
  const PASSWORD = Cypress.env('PASSWORD');

  beforeEach(() => {

    cy.intercept('POST', '**/login').as('loginRequest');

    cy.visit('http://labai.polinema.ac.id:90/login');

    cy.get('input[name="email"]').type(EMAIL);
    cy.get('input[name="password"]').type(PASSWORD, { log: false });

    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');

    cy.contains('My Course').click();

    cy.contains('Start Lesson').first().click();

    cy.contains('Easy')
      .parent()
      .contains('Start Lesson')
      .click();

  });

  it('FS_Lesson_Content_001 - Menampilkan lesson content', () => {

    cy.contains('Lesson Content')
      .should('exist');

    cy.get('body')
      .should('contain.text', 'Sintaks');

  });

  it('FS_Lesson_Content_002 - Expand dropdown lesson', () => {

    cy.contains('Sintaks Pemilihan 1')
      .click();

    cy.get('body')
      .should('contain.text', 'Tipe Data');

  });

  it('FS_Lesson_Content_003 - Collapse lesson', () => {

    cy.contains('Sintaks Pemilihan 1')
      .click();

    cy.wait(1000);

    cy.contains('Sintaks Pemilihan 1')
      .click();

  });

  it('FS_Lesson_Content_004 - Interaksi lesson content', () => {

    cy.url().then((oldUrl) => {

      cy.contains('Tipe Data')
        .click({ force: true });

      cy.url()
        .should('eq', oldUrl);

    });

  });

});