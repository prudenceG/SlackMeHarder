const request = require('supertest');
const app = require('../server');
const dataLayer = require('../api/data-layer');
const cookie = require('cookie');

describe('AuthRouter', () => {
	describe('POST /api/auth/signup', () => {
		const user = {
			id: 1,
			username: 'Valentin',
			password: '1234',
			created_at: '2020-01-19 21:34:48.013542',
			updated_at: '2020-01-19 21:34:48.013542'
		};

		const userCreated = {
			id: 2,
			username: 'Prudence',
			password: '1234',
			created_at: '2020-01-19 21:34:48.013542',
			updated_at: '2020-01-19 21:34:48.013542'
		}

		dataLayer.createSession = jest.fn();
		dataLayer.findUserByUsername = jest.fn();
		dataLayer.findSessionById = jest.fn(() => Promise.resolve(undefined));

		describe('when new user has been successfully created', () => {
			let fullCookie;
			let response;
			beforeEach(async (done) => {
				dataLayer.findUserByUsername.mockImplementationOnce(() => {
					return Promise.resolve(undefined);
				})
				dataLayer.createUser = jest.fn(() => Promise.resolve(userCreated));
				dataLayer.updateSession = jest.fn(() => Promise.resolve());
				await request(app).get('/api/auth/whoami').send()
				response = await request(app)
					.post('/api/auth/signup')
					.send({
						username: 'Prudence',
						password: '1234'
					})
					;
				fullCookie = cookie.parse(response.request.cookies);
				done()
			})

			it('should responds with success', () => {
				expect(response.statusCode).toEqual(201);
				expect(response.text).toEqual('Prudence');
			})
			it('should calls findUserByUsername with username parameter', () => {
				expect(dataLayer.findUserByUsername).toHaveBeenCalledWith('Prudence')
			})
			it('should calls createUser with username and password parmameters', () => {
				expect(dataLayer.createUser).toHaveBeenCalledWith('Prudence', '1234')
			})
			it('should calls updateSession with sessionId and userId', () => {
				expect(dataLayer.updateSession).toHaveBeenCalledWith(fullCookie.sessionId, 2);
			})

		})
		describe('when new user could not be created', () => {
			describe('because username already exits in the database', () => {
				let response;
				beforeEach(async done => {
					dataLayer.findUserByUsername.mockImplementationOnce(() => {
						return Promise.resolve(user);
					})

					done()
				})

				it('should throw an error Username already taken', async () => {
					response = await request(app)
						.post('/api/auth/signup')
						.send({
							username: 'Valentin',
							password: '1234'
						})
						;

					expect(response.statusCode).toEqual(400);
					expect(response.error.text).toEqual('Username already taken');
				})
			})

			describe('because an other error occurred', () => {
				let response;
				beforeEach(async done => {
					dataLayer.findUserByUsername.mockImplementationOnce(() => {
						return Promise.resolve(undefined);
					})
					dataLayer.createUser = jest.fn(() =>
						Promise.reject(new Error('User can not be created')));

					response = await request(app)
						.post('/api/auth/signup')
						.send({
							username: 'Valentin',
							password: '1234'
						})
						;

					done()
				})

				it('should responds with error', () => {
					expect(response.statusCode).toEqual(400);
					expect(response.text).toEqual('User can not be created');
				})
			})
		})
	})
})