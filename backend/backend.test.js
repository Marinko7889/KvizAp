const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { signup,login,getUser } = require('./controllers/user-controller');
const User = require('./model/User');

// Mock the request and response objects
const req = {
  body: {
    name: 'marin',
    email: 'marin@gmail.com',
    password: '12345678',
  },
};
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe('signup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 201 and a user object if successful', async () => {
    // Mock the User.findOne and User.save methods
    const findOneSpy = jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);
    const saveSpy = jest.spyOn(User.prototype, 'save').mockResolvedValueOnce();

    await signup(req, res);

    expect(findOneSpy).toHaveBeenCalledTimes(1);
    expect(findOneSpy).toHaveBeenCalledWith({ email: req.body.email });
    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).toHaveBeenCalledWith();

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ message: expect.any(Object) });
    expect(res.json.mock.calls[0][0].message.name).toBe(req.body.name);
    expect(res.json.mock.calls[0][0].message.email).toBe(req.body.email);
    expect(res.json.mock.calls[0][0].message.password).not.toBe(req.body.password);
  });

  it('should return 404 and an error message if user already exists', async () => {
    // Mock the User.findOne method to return a user object
    const findOneSpy = jest.spyOn(User, 'findOne').mockResolvedValueOnce({});

    await signup(req, res);

    expect(findOneSpy).toHaveBeenCalledTimes(1);
    expect(findOneSpy).toHaveBeenCalledWith({ email: req.body.email });

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ message: 'user already exist login instead' });
  });

 
});


describe('login', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    
  
    it('should return 400 and an error message if user is not found', async () => {
      // Mock the User.findOne method to return null
      const findOneSpy = jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);
  
      await login(req, res);
  
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({ email: req.body.email });
  
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({ message: 'user not found. Signup' });
    });
    
  
    it('should return 404 and an error message if password is incorrect', async () => {
      // Mock the User.findOne method to return a user object
      const findOneSpy = jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        email: req.body.email,
        password: bcrypt.hashSync('wrongPassword', 10),
      });
  
      await login(req, res);
  
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({ email: req.body.email });
  
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
    });

    
  });

  describe('getUser', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return 200 and a user object if user exists', async () => {
      // Mock the User.findById method to return a user object
      const findByIdSpy = jest.spyOn(User, 'findById').mockResolvedValueOnce({
        name: 'Marijo',
        email: 'mradic232@pmfst.hr',
        _id: '61234567890abcdef123456',
      });
  
      // Mock the req object with a valid user ID
      const req = {
        id: '61234567890abcdef123456',
      };
  
      await getUser(req, res);
  
      expect(findByIdSpy).toHaveBeenCalledTimes(1);
      expect(findByIdSpy).toHaveBeenCalledWith(req.id, '-password');
  
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({ user: expect.any(Object) });
      expect(res.json.mock.calls[0][0].user.name).toBe('Marijo');
      expect(res.json.mock.calls[0][0].user.email).toBe('mradic232@pmfst.hr');
      expect(res.json.mock.calls[0][0].user._id).toBe('61234567890abcdef123456');
    });
  
    it('should return 404 and an error message if user does not exist', async () => {
      // Mock the User.findById method to return null
      const findByIdSpy = jest.spyOn(User, 'findById').mockResolvedValueOnce(null);
  
      // Mock the req object with a non-existent user ID
      const req = {
        id: 'nonexistentuserid',
      };
  
      await getUser(req, res);
  
      expect(findByIdSpy).toHaveBeenCalledTimes(1);
      expect(findByIdSpy).toHaveBeenCalledWith(req.id, '-password');
  
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });
  