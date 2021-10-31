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
            cy.get('button[data-e2e=localeToggle]').should('be.visible').screenshot().click();
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
