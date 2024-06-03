const request = require('supertest');
const app = require('../server');
const { sequelize } = require('../models');

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

describe('User Endpoints', () => {
    let authToken; // Store authentication token for authenticated requests

    // beforeAll(async () => {
    //     // Log in as a test user and get the authentication token
    //     const loginRes = await request(app)
    //         .post('/api/users/login')
    //         .send({
    //             username: 'root',
    //             password: 'PINKI@123456'
    //         });
    //     authToken = loginRes.body.token;
    // });

    // it('should register a new user', async () => {
    //     const res = await request(app)
    //         .post('/api/users/register')
    //         .send({
    //             username: 'root',
    //             password: 'PINKI@123456',
    //             email: '@example.com'
    //         });
    //     expect(res.statusCode).toEqual(201);
    //     expect(res.body).toHaveProperty('id');
    // });

    // it('should get the profile of the logged-in user', async () => {
    //     const res = await request(app)
    //         .get('/api/users/profile')
    //         .set('Authorization', `Bearer ${authToken}`);
    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body).toHaveProperty('username', 'testuser');
    // });

    // it('should update the profile of the logged-in user', async () => {
    //     const updatedData = {
    //         username: 'updatedusername',
    //         email: 'updatedemail@example.com'
    //     };

    //     const res = await request(app)
    //         .put('/api/users/profile')
    //         .set('Authorization', `Bearer ${authToken}`)
    //         .send(updatedData);

    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body).toHaveProperty('username', updatedData.username);
    //     expect(res.body).toHaveProperty('email', updatedData.email);
    // });

    // Add more tests for user-related endpoints (update password, delete account, etc.)
});

describe('Item Endpoints', () => {
    // it('should create a new item', async () => {
    //     const newItem = {
    //         name: 'Test Item',
    //         description: 'This is a test item',
    //         starting_price: 10.0,
    //         end_time: new Date(Date.now() + 86400000) // 24 hours from now
    //     };

    //     const res = await request(app)
    //         .post('/api/items')
    //         .set('Authorization', `Bearer ${authToken}`)
    //         .send(newItem);

    //     expect(res.statusCode).toEqual(201);
    //     expect(res.body).toHaveProperty('id');
    //     expect(res.body).toMatchObject(newItem);
    // });

    // it('should retrieve all items', async () => {
    //     const res = await request(app)
    //         .get('/api/items')
    //         .set('Authorization', `Bearer ${authToken}`);

    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body).toBeInstanceOf(Array);
    // });

    // Add more tests for updating and deleting items
});

describe('Bid Endpoints', () => {
    it('should retrieve all bids for a specific item', async () => {
        // Make a request to retrieve all bids for a specific item and verify the response
    });

    it('should place a new bid on a specific item', async () => {
        // Place a new bid on a specific item and verify the response
    });

    // Add more tests for bid-related endpoints
});

describe('Notification Endpoints', () => {
    it('should retrieve notifications for the logged-in user', async () => {
        // Retrieve notifications for the logged-in user and verify the response
    });

    it('should mark notifications as read', async () => {
        // Mark notifications as read for the logged-in user and verify the response
    });

    // Add more tests for notification-related endpoints
});


// user.test.js (your test file)
// afterAll((done) => {
//     server.close(done);
// });
