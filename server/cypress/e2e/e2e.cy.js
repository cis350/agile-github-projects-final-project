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
    cy.visit('https://cisfinalproject-pebble-inc.vercel.app/profile')
    cy.contains('Email').should('be.visible');
    cy.contains('Stars').should('be.visible');
    cy.contains('Rideshare Apps').should('be.visible');
    cy.contains('Payment Method').should('be.visible');
    cy.get('button').contains('edit').should('exist');
  })

  it('edit_profile_check', () => {
    cy.visit('https://cisfinalproject-pebble-inc.vercel.app/profile')
    cy.contains('edit').click();
    cy.contains('Change Email').should('be.visible');
    cy.contains('Change Password').should('be.visible');
    cy.contains('Change Preferred Rideshare Apps').should('be.visible');
    cy.contains('Change Preferred Payment').should('be.visible');
    cy.get('button').contains('Save Changes').should('exist');
    cy.get('button').contains('Discard Changes').should('exist');
  })


  it('book_check', () => {
    cy.visit('https://cisfinalproject-pebble-inc.vercel.app/bookride')
    cy.contains('Book a Ride').should('be.visible');
    cy.get('#pickupLocation').should('exist');
    cy.get('#dropoffLocation').should('exist');
    cy.get('button').contains('Request a Ride');
  })
})


describe('flow_check', () => {
  it('register_flow_check', () => {
    cy.visit('https://cisfinalproject-pebble-inc.vercel.app/register')
    cy.get('input[id="email"]').type('rah16@gmail.com');
    cy.get('input[id="password"]').type('testPassword!');
    cy.get('input[id="confirmPassword"]').type('testPassword!');
    cy.get('.text-sm.px-5').click()
    cy.wait(2000);
    cy.get('input[id="email"]').type('rah16@gmail.com');
    cy.get('input[id="password"]').type('testPassword!');
    cy.get('.text-sm.px-5').click()
    cy.wait(2000);
    cy.contains('a.rounded-full', 'Book a Ride').click();
    cy.wait(2000);
    cy.get('input[id="pickupLocation"]').type('house drive');
    cy.get('input[id="dropoffLocation"]').type('other house drive');
    cy.get('#pickupTime').select('Now');
    cy.get('#passengers').select('1');
    cy.get('#suitcases').select('1');
    cy.contains('button', 'Request a Ride').click();
    cy.wait(1000);
  })

  it('login_flow_check', () => {
    cy.visit('https://cisfinalproject-pebble-inc.vercel.app/login')
    cy.get('input[id="email"]').type('rah13@gmail.com');
    cy.get('input[id="password"]').type('testPassword!');
    cy.get('.text-sm.px-5').click();
    cy.wait(2000);
    cy.get('.bg-white.rounded-full.h-8').click();
    cy.get('button').contains('edit').should('exist');
    cy.contains('edit').click();
    cy.wait(500);
    cy.get('input[name="email"]').type('rah14@gmail.com');
    cy.get('input[name="password"]').type('testPassword2!');
    cy.get('select[name="paymentMethod"]').select('Venmo');
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.contains('rah14@gmail.com').should('be.visible');
    cy.contains('Venmo').should('be.visible');
  })
})