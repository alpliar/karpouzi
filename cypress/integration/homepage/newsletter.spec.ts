describe('Newsletter register', () => {
    it('Fails on incorrect email', () => {
        cy.visit('/');
        cy.get('input#email').type('fail@example.com');
        cy.get('button[type="submit"]').click();
        cy.wait(3000).get('form').parent().contains('Oh no', { timeout: 3000 });
    });

    it('Succeeds on incorrect email', () => {
        cy.visit('/');
        cy.get('input#email').type('success@example.com');
        cy.get('button[type="submit"]').click();
        cy.wait(3000).get('form').parent().contains('Oh no', { timeout: 3000 }).should('not.exist');
    });
});

export {};
