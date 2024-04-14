const request = require('supertest');
const { closeMongoDBConnection, connect } = require('../app/models/dbUtils');
const webapp = require('../server');
const { authJwt } = require("../app/middlewares");
const controller = require("../app/controllers/user.controller");


// import test utilities function
const {
  isInArray, testUser, insertTestDataToDB, deleteTestDataFromDB,
} = require('./testUtils');

// TEST POST ENDPOINT
describe('GET users(s) endpoint integration test', () => {
  /**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -'jest': true-
*/
  let mongo; // local mongo connection
  let db;
  let testUserID;

  /**
     * Make sure that the data is in the DB before running
     * any test
     * connect to the DB
     */
  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();

    // add test user to mongodb
    testUserID = await insertTestDataToDB(db, testUser);
  });

  /**
 * Delete all test data from the DB
 * Close all open connections
 */
  afterAll(async () => {
    try {
      await deleteTestDataFromDB(db, testUser.username);
      await mongo.close();
      await closeMongoDBConnection(); // mongo client that started server.
    } catch (err) {
      return err;
    }
  });


  test('Get: status code and data', async () => {
    const resp = await request(webapp).post(`/api/auth/user`).send(`id=${testUserID}`);
    expect(resp.status).toEqual(201);
    expect(resp.type).toBe('application/json');
    // testStudent is in the response
  });

  test('user not in db status code 404', async () => {
    const resp = await request(webapp).get('/user/1');
    expect(resp.status).toEqual(404);
    expect(resp.type).toBe('text/html');
  });
});

describe('POST /login  enpoint tests', () => {
  let mongo; // local mongo connection
  let response; // the response from our express server
  /**
       * We need to make the request to the endpoint
       * before running any test.
       * We need to connecto the DB for all the DB checks
       * If beforeAll is undefined
       * inside .eslintrc.js, add 'jest' to the 'env' key
       */
  beforeAll(async () => {
    // connect to the db
    mongo = await connect();

    // send the request to the API and collect the response
    response = await request(webapp).post('/api/auth/signin').send(`username=${testUser.username}&password=${testUser.password}&email=${testUser.email}&roles=['user']`);
    console.log('response', response.text);
  });

  /**
   * After running the tests, we need to remove any test data from the DB
   * We need to close the mongodb connection
   */
  afterAll(async () => {
    // we need to clear the DB
    try {
      // await deleteTestDataFromDB(db, 'testuser');
      await mongo.close(); // the db connection in beforeAll
      await closeMongoDBConnection(); // the db connection in missing uname
      await closeMongoDBConnection(); // the db connection in missing password
    } catch (err) {
      return err;
    }
  });

  /**
   * Status code and response type
   */
  
  test('simple route', async () => {
    const res = await request(webapp).get('/')
    expect(res.status).toEqual(200);
  });

  test('test signup', async () => {
    const res = await request(webapp).post('/api/auth/signup')
      .send(`username=abcd&email=testuser@test.com&password=beans&roles=['user']`);
    expect(res.status).toEqual(200);
  });

  test('test signup no roles', async () => {
    const res = await request(webapp).post('/api/auth/signup')
      .send(`username=cdef&email=testuser@test.com&password=beans`);
    expect(res.status).toEqual(200);
  });


  test('the JWT is in the response', () => {
    // expect the JWT of the new session should not be undefined
    console.log('returned data id', response.text);
    expect(JSON.parse(response.text).accessToken).not.toBe(undefined);
  });

  test('test signup empty', async () => {
    const res = await request(webapp).post('/api/auth/signin')
      .send(`username=${testUser.username}`);
    expect(res.status).toEqual(401);
  });
  
});