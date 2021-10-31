import { en, fr, es, gr } from '../../../content/locale/';

describe('Locale', () => {
    const locales = [
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'Français' },
        { code: 'es', name: 'Español' },
        { code: 'gr', name: 'Ελληνικά' }
    ];
    const translations = { en, fr, es, gr };
    const defaultLocale = 'en';

    beforeEach(() => {
        cy.visit('/');
    });

    locales.forEach((locale) => {
        it(`Set locale to ${locale.name} (${locale.code})`, () => {
            cy.get('button[e2e=localeToggle]').should('be.visible').screenshot().click();
            cy.get('[e2e=localeMenu]')
                .screenshot()
                .should('be.visible')
                .contains(locale.name)
                .should('exist')
                .screenshot()
                .click({ force: true });
            cy.location('pathname').should(
                'eq',
                `/${locale.code !== defaultLocale ? locale.code : ''}`
            );
            cy.get('h2')
                .first()
                .contains(translations[locale.code]['/'].welcomeMessage)
                .screenshot();
        });
    });
    // it('Set locale to EN', () => {
    //     cy.get('button[e2e=localeToggle]').click();
    //     cy.get('[e2e=localeMenu]').should('be.visible').contains('English').click();
    //     cy.get('h2').first().contains('Welcome').screenshot();
    // });
    it('Set locale to FR', () => {
        cy.get('button[e2e=localeToggle]').should('be.visible').screenshot().click();
        cy.get('[e2e=localeMenu]')
            .screenshot()
            .should('be.visible')
            .contains('Français')
            .should('exist')
            .screenshot()
            .click({ force: true });
        cy.location('pathname').should('eq', '/fr');
        cy.get('h2').first().contains('Bienvenue').screenshot();
    });
    // it('Set locale to ES', () => {
    //     cy.get('button[e2e=localeToggle]').click();
    //     cy.get('[e2e=localeMenu]').should('be.visible').contains('Español').click();
    //     // cy.location().should((loc) => expect(loc.pathname).to.eq('/es'));
    //     cy.get('h2').first().contains('Bienvenido').screenshot();
    // });
    // it('Set locale to GR', () => {
    //     cy.get('button[e2e=localeToggle]').click();
    //     cy.get('[e2e=localeMenu]').should('be.visible').contains('Ελληνικά').click();
    //     // cy.location().should((loc) => expect(loc.pathname).to.eq('/gr'));
    //     cy.get('h2').first().contains('καλώς').screenshot();
    // });
});

export {};
