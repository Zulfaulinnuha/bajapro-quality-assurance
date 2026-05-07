describe('Flow Memulai Pelajaran (Start Lesson)', () => {

  const EMAIL = Cypress.env('EMAIL');
  const PASSWORD = Cypress.env('PASSWORD');

  beforeEach(() => {
    cy.intercept('POST', '**/login').as('loginRequest');

    // Gunakan full URL biar aman dari masalah DNS/Port
    cy.visit('http://labai.polinema.ac.id:90/login', { timeout: 60000 });

    cy.get('input[name="email"]').should('be.visible').clear().type(EMAIL);
    cy.get('input[name="password"]').should('be.visible').clear().type(PASSWORD, { log: false });
    
    cy.get('button[type="submit"]').click();
    cy.wait('@loginRequest');

    // Pastikan tidak stuck di login
    cy.url().should('not.include', '/login');

    // Kita klik manual menu "My Course" untuk menjamin kita ada di halaman Gambar 1
    cy.contains('My Course', { timeout: 15000 })
      .should('be.visible')
      .click();
      
    // Validasi kita sudah di halaman list course
    cy.url().should('include', '/courses');
  });

  it('User dapat memilih Course Java lalu masuk ke Level Easy', () => {
    cy.contains('.card', 'Java') // Cari kotak kartu Java
      .contains('Start Lesson')  // Cari teks Start Lesson di dalam kotak itu
      .click();

    cy.url({ timeout: 20000 }).should('include', '/courses/level');
    cy.contains('h2', 'Start Your Lesson now').should('be.visible');

    // 3. Validasi ada 3 Pilihan Level (Easy, Medium, Hard)
    cy.contains('Easy').should('be.visible');
    cy.contains('Medium').should('be.visible');
    cy.contains('Hard').should('be.visible');

    cy.contains('.card', 'Easy') 
      .find('a.btn-primary') // Cari elemen <a> dengan class btn-primary (tombol biru)
      .should('contain', 'Start Lesson')
      .click();

    
    // Berdasarkan inspect element Gambar 2, href Easy mengarah ke .../detail/1
    cy.url({ timeout: 30000 }).should('include', '/detail/');
    
    // (Opsional) Pastikan tidak ada error 404/500
    cy.get('body').should('not.contain', '404 Not Found');
  });

});