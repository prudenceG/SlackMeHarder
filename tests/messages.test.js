// const request = require('supertest');
// const getApp = require('./../app');
// const mockedDbPool = 'DB_POOL';
// const values = getApp(mockedDbPool);
// const app = values[1]
// const server = values[0]
// const socketIoClient = require('socket.io-client');

// describe('Get Endpoints', () => {
//     it('should return a sentence Hello World and a status 200', async () => {
//         const socket = await socketIoClient('http://localhost:3001');
//         socket.on('connection', async data => {
//             console.log('DATA', data);
//             const res = await request(app).get('/hello');
//             console.log('RESPONSE', res.error)
//             expect(res.status).toBe(400);
//             expect(res.body.message).toEqual('Hello World');
//         })
      
//     })
// })
describe('Sample Test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true)
    })
})