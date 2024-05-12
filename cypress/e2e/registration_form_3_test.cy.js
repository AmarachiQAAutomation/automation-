beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    * checkboxes, their content and links
    * email format
 */
it('Check the visiblity of a  newsletter radio button and its content', () => {
      // Array of found elements with given selector has 4 elements in total
      cy.screenshot('Full page screenshot')
      cy.get('input[type="radio"]').should('have.length', 4)

      // Verify labels of the radio buttons
      cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
      cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
      cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
      cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')

        //Verify default state of radio buttons
       cy.get('input[type="radio"]').eq(0).should('not.be.checked')
       cy.get('input[type="radio"]').eq(1).should('not.be.checked')
       cy.get('input[type="radio"]').eq(2).should('not.be.checked')
       cy.get('input[type="radio"]').eq(3).should('not.be.checked')

       // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')

})

    it('check dropdown and dependencies between 2 dropdowns', () => {
         
      // Verify the appearance of dropdowns
         cy.get('#country').select(1).screenshot('#country drop-down')
         cy.get('#country').find('option').should('have.length', 4)
               
      cy.get('#country').should('have.text','SpainEstoniaAustria')
           cy.get('#city').should('have.text', 'MalagaMadridValenciaCorralejo',)
           cy.get('#city').scrollIntoView()   
           // Select country and verify that the city dropdown updates based on country selection
           cy.get('#country').should('have.text','SpainEstoniaAustria')
           cy.get('#city').should('have.text', 'MalagaMadridValenciaCorralejo',)
           cy.get('#country').select('Estonia')
           cy.get('#city').should('have.text', 'TallinnHaapsaluTartu')
           cy.get('#country').select('Austria')
           cy.get('#city').should('have.text', 'ViennaSalzburgInnsbruck')
           cy.get('#city').scrollIntoView()   


})       

      it(' checkboxes, their content and links', () => {
        cy.get('input[type="checkbox"]').should('have.length',2)
        
        // Assert the text content of the labels associated with the checkboxes
        cy.get('input[type="checkbox"]').next().eq(0).type('contain','Accept our privacy policy')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','Accept our cookie policy',)
         
       
           // Default status of the check box 
          cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
          cy.get('input[type="checkbox"]').eq(1).should('be.checked')
        
       
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')


      })
      
      it('Checks the appearance of email format input', () => {
        cy.screenshot('Full page screenshot')
        cy.get('input[type="email"]').should('be.visible')




   
      })     


  



/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
*/

describe('functional tests', () => {
 it('User can submit form with all fields added', ()=>{
  function  AllFields() {
        // check that the submit button is enabled
        cy.get('.submit_button').should('be.enabled')      
        cy.get('.submit_button').should('be.visible')
        cy.get('.submit_button').click()

        // check that a success message is visible
        cy.get('#success_message').should('be.visible')
        .should('contain', 'User successfully submitted registration')
  
    }

  })

  it('User can submit form with all manadatory fields added', ()=>{
    // function to fill madatory fields
      function ManadatoryField() {
      //check that submit button is enable
       cy.get('.submit_button').should('be.enabled')       
        cy.get('.submit_button').should('be.visible')
        cy.get('.submit_button').click()

        // check that success message is visible
        cy.get('#success_message').should('be.visible')
        .should('contain', 'User successfully submitted registration')

      }
  

})

  it('User can not submit form manadatory fields are absent', ()=>{
    //calling on Function to leave manadatory field empty 
   function MandatoryField() {

     // Check that submit button is disabled
     cy.get('.submit_button').should('be.disabled')  
      //check that submit button is not visible
     cy.get('.submit_button').should('not,be.visible')
     //Check that submit button is not active
     cy.get('.submit_button').click()
     // check that error message is visible
     cy.get('#error_message').should('be.visible')
     .should('contain', 'manadatory field can not be left empty')

}

  })
  
  it('user can Uploads a file', () => {
    // Visit the page where the file upload functionality exists
    cy.screenshot('Full page screenshot')
    cy.get('input[type="file"]').should('be.visible')  
    cy.contains('Submit file').click()
   
     
 })

  


// Define the AllFields function
function  AllFields(AllFiealds) {
      cy.get('input[data-testid="user"]').type('username')
      cy.get('#email').type('validemail@yeap.com')
      cy.get('[data-cy="name"]').type('John')
      cy.get('#lastName').type('Doe')
      cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
      cy.get('#htmlFavLanguage').check()
     cy.get('#vehicle1').check()
     cy.get('select#cars').select('Volvo')
     cy.get('select#animal').select('Dog')
     cy.get('select#newsletter').select('Daily')
     cy.get('select#country').select('Spain')
     cy.get('select#city').select('Malaga')
     cy.get('#Accept our privacy policy').check()
     cy.get('#Accept our cookie policy').check()
     cy.get('#password').type('MyPass')
     cy.get('#confirm').type('MyPass')
     cy.get('h2').contains('Password').click()
     cy.get('.submit_button').should('be.enabled')       
     cy.get('.submit_button').should('be.visible')
     cy.get('.submit_button').click()
     cy.get('#success_message').should('be.visible').should('contain', 'User successfully submitted registration');
  

}
       
     function MandatoryFields() {
     cy.get('input[data-testid="user"]').type('username')
     cy.get('#email').type('validemail@yeap.com')
     cy.get('[data-cy="name"]').type('John')
     cy.get('#lastName').type('Doe')
     cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
     cy.get('#password').type('MyPass')
     cy.get('#confirm').type('MyPass')
     cy.get('h2').contains('Password').click()
}

  
  

})