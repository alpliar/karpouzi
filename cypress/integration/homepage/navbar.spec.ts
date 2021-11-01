describe('Navbar', () => {
    const testedViewports: Cypress.ViewportPreset[] = ['iphone-5', 'ipad-mini', 'macbook-13'];

    before(() => {
        cy.visit('/');
    });

    testedViewports.forEach((testedViewport) => {
        context(`when ${testedViewport}`, () => {
            beforeEach(() => {
                cy.viewport(testedViewport).get('[data-e2e=mainNavigation]').as('mainNav');
                if (testedViewport.match(/^(iphone|ipad)*/)) {
                    cy.get('[data-e2e=menuCTA]').as('menuCTA');
                }
                cy.get('[data-e2e=loginCTA]').as('loginCTA');
                cy.get('[data-e2e=cartCTA]').as('cartCTA');
                if (testedViewport.match(/^(ipad|mac)*/)) {
                    cy.get('[data-e2e=localeCTA]').as('localeCTA');
                    cy.get('[data-e2e=themeCTA]').as('themeCTA');
                }
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
                if (testedViewport.match(/^iphone*/)) {
                    cy.get('@mainNav').get('@menuCTA').should('be.visible');
                    cy.get('@mainNav').get('@loginCTA').should('be.visible');
                    cy.get('@mainNav').get('@cartCTA').should('be.visible');
                }
                if (testedViewport.match(/^ipad*/)) {
                    cy.get('@mainNav').get('@menuCTA').should('not.be.visible');
                    cy.get('@mainNav').get('@loginCTA').should('be.visible');
                    cy.get('@mainNav').get('@cartCTA').should('be.visible');
                    cy.get('@mainNav').get('@localeCTA').should('be.visible');
                    cy.get('@mainNav').get('@themeCTA').should('be.visible');
                }
                if (testedViewport.match(/^mac*/)) {
                    cy.get('@mainNav').get('@menuCTA').should('not.be.visible');
                    cy.get('@mainNav').get('@loginCTA').should('be.visible');
                    cy.get('@mainNav').get('@cartCTA').should('be.visible');
                    cy.get('@mainNav').get('@localeCTA').should('be.visible');
                    cy.get('@mainNav').get('@themeCTA').should('be.visible');
                }
            });
        });
    });
});

export {};
