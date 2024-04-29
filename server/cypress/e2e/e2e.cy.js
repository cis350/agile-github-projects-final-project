describe('component_check', () => {
  it('login_check', () => {
    cy.visit('https://cisfinalproject-6odfvk3ki-pebble-inc.vercel.app/login')
    cy.contains('Log In').should('be.visible');
    cy.contains('Email').should('be.visible');
    cy.contains('Password').should('be.visible');
    cy.contains('About').should('be.visible');
    cy.contains('Book a Ride').should('be.visible');
    cy.contains('Don\'t have an account? Register').should('be.visible');
    cy.get('button').contains('Login')
  })

  it('register_check', () => {
    cy.visit('https://cisfinalproject-6odfvk3ki-pebble-inc.vercel.app/register')
    cy.contains('Register').should('be.visible');
    cy.contains('Email').should('be.visible');
    cy.contains('Password').should('be.visible');
    cy.contains('Confirm Password').should('be.visible');
    cy.contains('About').should('be.visible');
    cy.contains('Book a Ride').should('be.visible');
    cy.contains('Already have an account? Login').should('be.visible');
    cy.get('button').contains('Register')
  })
})

describe('flow_check', () => {
  it('login_flow_check', () => {
    cy.visit('https://cisfinalproject-6odfvk3ki-pebble-inc.vercel.app/register')
    cy.get('input[id="email"]').type('rah1@gmail.com');
    cy.get('input[id="password"]').type('testPassword!');
    cy.get('input[id="confirmPassword"]').type('testPassword!');
    cy.get('.text-sm.px-5').click()
    cy.wait(1000);
    cy.get('input[id="email"]').type('rah1@gmail.com');
    cy.get('input[id="password"]').type('testPassword!');
    cy.get('.text-sm.px-5').click()
    cy.wait(1000);
    cy.contains('Share a Ride').should('be.visible');
  })
})