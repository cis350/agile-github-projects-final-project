describe('component_check', () => {
  it('login_check', () => {
    cy.visit('http://localhost:3000/login')
    cy.contains('Log In').should('be.visible');
    cy.contains('Email').should('be.visible');
    cy.contains('Password').should('be.visible');
    cy.contains('Forgot password?').should('be.visible');
    cy.contains('About').should('be.visible');
    cy.contains('Book a Ride').should('be.visible');
    cy.contains('Don\'t have an account? Register').should('be.visible');
    cy.get('button').contains('Login')
  })

  it('register_check', () => {
    cy.visit('http://localhost:3000/register')
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
    cy.visit('http://localhost:3000/register')
    cy.get('input[id="email"]').type('test@gmail.com');
    cy.get('input[id="password"]').type('testpassword');
    
  })
})