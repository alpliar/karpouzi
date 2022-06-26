import { en, fr, es, el } from '../../../content/locale/';

describe('Locale', () => {
    const locales = [
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'Français' },
        { code: 'es', name: 'Español' },
        { code: 'el', name: 'Ελληνικά' }
    ];
    const translations = { en, fr, es, el };
    const defaultLocale = 'en';

    beforeEach(() => {
        cy.visit('/');
    });

    locales.forEach((locale) => {
        it(`Set locale to ${locale.name} (${locale.code})`, () => {
            cy.get('button[data-e2e="localeCTA"]').should('be.visible').screenshot().click();
            cy.get('[data-e2e=localeMenu]')
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
});

export {};
