const bcrypt = require('bcryptjs');
const { User } = require('../models');
const login = require('../controllers/auth/login');

describe('test login controller', () => {
  test('return status - 200, token and object with two properties with type of String ', async () => {
    const mReq = {
      body: {
        email: 'test@test.com',
        password: 'test',
      },
    };

    const hashPassword = bcrypt.hashSync(mReq.body.password, bcrypt.genSaltSync(10));
    const user = {
      _id: '1',
      email: mReq.body.email,
      password: hashPassword,
      subscription: 'starter',
      token: null,
    };
    const mRes = {
      response: null,
      statusCode: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.response = data;
      },
    };

    jest.spyOn(User, 'findOne').mockImplementationOnce(({ email }) => email === user.email && user);
    jest.spyOn(User, 'findByIdAndUpdate').mockImplementationOnce((id, { token }) => {
      if (id) {
        user.token = token;
      }
    });

    await login(mReq, mRes);
    expect(mRes.statusCode).toBe(200);
    expect(mRes.response.token).toBe(user.token);
    expect(mRes.response.user).toMatchObject({
      email: expect.any(String),
      subscription: expect.any(String),
    });
  });
});
