const request = require('supertest');
const webapp = require('../../server');


// import test utilities function
const {testUser
} = require('./testUtils');


describe('POST /login  enpoint tests', () => {
  /**
       * We need to make the request to the endpoint
       * before running any test.
       * We need to connecto the DB for all the DB checks
       * If beforeAll is undefined
       * inside .eslintrc.js, add 'jest' to the 'env' key
       */
  beforeAll(async () => {
    // connect to the db
    // send the request to the API and collect the response
    await request(webapp).post('/api/auth/signup')
      .send(`username=testuser&email=testuser@test.com&password=beans&roles=['user']`);
      await request(webapp).post('/api/auth/signup')
      .send(`username=cdef&email=testuser@test.com&password=beans`);
  });

  /**
   * After running the tests, we need to remove any test data from the DB
   * We need to close the mongodb connection
   */
  afterAll(async () => {
    // we need to clear the DB
    try {
      await request(webapp).post('/api/profile/delete')
      .send(`username=testuser`);
      await request(webapp).post('/api/profile/delete')
      .send(`username=cdef`);
    } catch (err) {
      return err;
    }
  });

  /**
   * Status code and response type
   */

  test('the JWT is in the response', async () => {
    // expect the JWT of the new session should not be undefined
    const response = await request(webapp).post('/api/auth/signin')
      .send(`username=${testUser.username}&password=beans`);
    expect(JSON.parse(response.text).accessToken).not.toBe(undefined);
  });

  test('the JWT undefined when logout response', async () => {
    // expect the JWT of the new session should not be undefined
    await request(webapp).post('/api/auth/signin')
      .send(`username=${testUser.username}&password=beans`);
    const response = await request(webapp).post('/api/profile/logout')
      .send(`username=${testUser.username}&password=beans`);
    expect(JSON.parse(response.text).accessToken).toBe(undefined);
  });

  test('test signup empty', async () => {
    const res = await request(webapp).post('/api/auth/signin')
      .send(`username=${testUser.username}`);
    expect(res.status).toEqual(401);
  });

  test('test duplicate signup', async () => {
    const res = await request(webapp).post('/api/auth/signup')
    .send(`username=${testUser.username}&password=${testUser.password}&email=${testUser.email}&roles=['user']`);
    expect(res.status).toEqual(400);
  });
  
});

describe('GET /fetch endpoint tests', () => {

  /**
     * Make sure that the data is in the DB before running
     * any test
     * connect to the DB
     */
  beforeAll(async () => {
    // add test user to mongodb
    await request(webapp).post('/api/auth/signup')
      .send(`username=testuser&email=testuser@test.com&password=beans&roles=['user']`);
  });

  /**
 * Delete all test data from the DB
 * Close all open connections
 */
  afterAll(async () => {
    try {
      await request(webapp).post('/api/profile/delete')
      .send(`username=testuser`);
    } catch (err) {
      return err;
    }
  });

  test('test success fetch', async () => {
    const res = await request(webapp).get(`/api/profile/fetch/testuser`)

    expect(res.status).toEqual(200);
  });

  test('test user not exist', async () => {
    const res = await request(webapp).get(`/api/profile/fetch/nonexist`);
    

    expect(res.status).toEqual(404);  
  });
})

describe('POST /update endpoint tests', () => {

  /**
     * Make sure that the data is in the DB before running
     * any test
     * connect to the DB
     */
  beforeAll(async () => {
    // add test user to mongodb
    await request(webapp).post('/api/auth/signup')
      .send(`username=testuser&email=testuser@test.com&password=beans&roles=['user']`);
  });

  /**
 * Delete all test data from the DB
 * Close all open connections
 */
  afterAll(async () => {
    try {
      await request(webapp).post('/api/profile/delete')
      .send(`username=testuser`);
    } catch (err) {
      return err;
    }
  });

  test('test update empty', async () => {
    const res = await request(webapp).post(`/api/profile/update`)
      .send('username=testuser');
    expect(res.status).toEqual(200);
  });

  test('test update phone number', async () => {
    const res = await request(webapp).post(`/api/profile/update`)
      .send('username=testuser&phoneNumber=9732349853');
    expect(res.status).toEqual(200);
  });
})
