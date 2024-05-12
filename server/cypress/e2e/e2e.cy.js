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
    cy.get('button').contains('Register');
  })


  it('profile_check', () => {
    cy.visit('https://cisfinalproject-6odfvk3ki-pebble-inc.vercel.app/profile')
    cy.contains('Email').should('be.visible');
    cy.contains('Stars').should('be.visible');
    cy.contains('Rideshare Apps').should('be.visible');
    cy.contains('Payment Method').should('be.visible');
    cy.get('button').contains('Logout').should('exist');
    cy.get('button').contains('Delete Account').should('exist');
  })

  it('edit_profile_check', () => {
    cy.visit('https://cisfinalproject-6odfvk3ki-pebble-inc.vercel.app/edit')
    cy.contains('Change Email').should('be.visible');
    cy.contains('Change Password').should('be.visible');
    cy.contains('Change Preferred Rideshare Apps').should('be.visible');
    cy.contains('Change Preferred Payment').should('be.visible');
    cy.get('button').contains('Save Changes').should('exist');
    cy.get('button').contains('Discard Changes').should('exist');
  })


  it('book_check', () => {
    cy.visit('https://cisfinalproject-6odfvk3ki-pebble-inc.vercel.app/book')
    cy.contains('Book a Ride').should('be.visible');
    cy.contains('Pickup Location').should('be.visible');
    cy.contains('Dropoff Location').should('be.visible');
    cy.get('button').contains('Request a Rider');
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