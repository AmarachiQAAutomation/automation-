/*
Assignement 5: create more visual tests
*/
describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size');
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo');
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100);
    });

    it('My test for second picture', () => {
        // Create similar test for checking the second picture
        cy.log('Will check logo source and size');
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo');
        cy.get('img').invoke('height').should('be.lessThan', 170)
            .and('be.greaterThan', 100);
    });

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2);

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2');

        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click();

        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html');

        // Go back to previous page
        cy.go('back');
        cy.log('Back again in registration form 2');
    });

    // Create similar test for checking the second link 
    it('Check second link in navigation', () => {
        // Verify the structure of the navigation
        cy.get('nav').children().should('have.length', 2);

        // Check if the sibling of the navigation contains the expected header text
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2');

        // Click on the second link in the navigation
        cy.get('nav').children().eq(1).as('secondLink')
            .should('be.visible').and('have.attr', 'href', 'registration_form_2.html').click();

        // Verify that the URL is correct after clicking the link
        cy.url().should('contain', '/registration_form_2.html');

        // Navigate back to the previous page
        cy.go('back');
        // Log that we're back on registration form 2
        cy.log('Back again on registration form 2');
    });



    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4);

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML');
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS');
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript');
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP');

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked');
        cy.get('input[type="radio"]').eq(1).should('not.be.checked');
        cy.get('input[type="radio"]').eq(2).should('not.be.checked');
        cy.get('input[type="radio"]').eq(3).should('not.be.checked');

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked');
        cy.get('input[type="radio"]').eq(1).check().should('be.checked');
        cy.get('input[type="radio"]').eq(0).should('not.be.checked');
    });

    // Create test similar to previous one verifying check boxes
    it('Check that checkbox list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3);

        // Verify labels of the checkboxes
        cy.get('input[type="checkbox"]').eq(0).should('have.attr', 'value', 'I have a bike');
        cy.get('input[type="checkbox"]').eq(1).should('have.attr', 'value', 'I have a car');
        cy.get('input[type="checkbox"]').eq(2).should('have.attr', 'value', 'I have a boat ');

        // Verify default state of checkboxes
        cy.get('input[type="checkbox"]').should('not.be.checked');

        // Check the checkboxes
        cy.get('input[type="checkbox"]').check();

        // Verify that all checkboxes are checked
        cy.get('input[type="checkbox"]').should('be.checked');

        // Uncheck a checkbox
        cy.get('input[type="checkbox"]').eq(0).uncheck().should('not.be.checked');
    });



    it('Car dropdown is correct', () => {
        // Here is just an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area or full page
        cy.get('#cars').select(1).screenshot('Cars drop-down');
        cy.screenshot('Full page screenshot');

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4);
        cy.get('#cars').find('option').should('have.length', 4);

        // Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo');

        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value);
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi']);
        });

    });
    // Create test similar to previous one
    it('Animals dropdown is correct', () => {
        // Select second element and create screenshot for this area or full page
        cy.get('#Animals').select(1).screenshot('Animals drop-down');
        cy.screenshot('Full page screenshot');

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#Animals').find('option').should('have.length', 6);

        // Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo');

        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value);
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi']);

        });

        function inputValidData(username) {
            cy.log('Username will be filled');
            cy.get('input[data-testid="user"]').type(username);
            cy.get('#email').type('validemail@yeap.com');
            cy.get('[data-cy="name"]').type('John');
            cy.get('#lastName').type('Doe');
            cy.get('[data-testid="phoneNumberTestId"]').type('10203040');
            cy.get('#password').type('MyPass');
            cy.get('#confirm').type('MyPass');
            cy.get('h2').contains('Password').click();

        }
    })
})
