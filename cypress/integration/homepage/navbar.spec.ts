describe('Navbar', () => {
    const testedViewports: Cypress.ViewportPreset[] = ['macbook-13', 'ipad-mini', 'iphone-5'];

    before(() => {
        cy.visit('/');
    });

    testedViewports.forEach((testedViewport) => {
        context(`when ${testedViewport}`, () => {
            beforeEach(() => {
                cy.viewport(testedViewport).get('[data-e2e=mainNavigation]').as('mainNav');
            });
            it('navbar should exist', () => {
                cy.get('@mainNav').should('exist');
            });
            it('navbar should be visible', () => {
                cy.viewport(testedViewport).get('@mainNav').should('be.visible').screenshot();
            });
            it('navbar should have correct seo attrs', () => {
                cy.get('@mainNav').should('have.prop', 'tagName').should('equal', 'NAV');
            });
            it('navbar has correct shortcuts', () => {
                if (testedViewport.match(/iphone*/)) {
                    cy.get('@mainNav').contains('Menu');
                    cy.get('@mainNav').contains('Login');
                    cy.get('@mainNav').contains('Cart');
                }
                if (testedViewport.match(/(ipad|macbook)*/)) {
                    cy.get('@mainNav').contains('theme');
                    cy.get('@mainNav').contains('Cart');
                    cy.get('@mainNav').contains('Login');
                    cy.get('@mainNav').contains('Cart');
                } else {
                }
            });
        });
    });
});

export {};
