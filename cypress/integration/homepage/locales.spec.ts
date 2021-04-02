describe('Locale', () => {
    it('Set locale to EN', () => {
        cy.visit('/en');
        cy.get('h2').contains('Welcome').screenshot();
    });
    it('Set locale to FR', () => {
        cy.visit('/fr');
        cy.get('h2').contains('Bienvenue').screenshot();
    });
    it('Set locale to ES', () => {
        cy.visit('/es');
        cy.get('h2').contains('Bienvenido').screenshot();
    });
    it('Set locale to GR', () => {
        cy.visit('/gr');
        cy.get('h2').contains('καλώς').screenshot();
    });
});

export {}