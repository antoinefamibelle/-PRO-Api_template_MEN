const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middlewares/auth.js');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config')

/**
 * @api {GET} /api/users/all_users Get all users
 * @apiName Get all users
 * @apiGroup User
 * 
 * @apiSuccess {Array} Array of all users
 */

router.get('/all', async (req, res) => {
  try {
    const user = await User.find();
    res.send(user)
  } catch (err) {
    res.status(500).send('Error server');
  }
});

/**
 * @api {GET} /api/users/me Get the profil of the current user
 * @apiName Get the profil of the current User
 * @apiGroup User
 * 
 * @apiSuccess {User} Profil of current user
 */

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.send(user)
  } catch (err) {
    res.status(500).send('Error server');
  }
});

/**
 * @api {POST} /api/user/login Login for user
 * @apiName Login user
 * @apiGroup User

 * @apiParam {String} User's email
 * @apiParam {String} User's password
 * 
 * @apiSuccess {String} Return The json web token
 */

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email }); // Seach user by Email

    if (!user) { // If the user exist
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] }); // Send an error as a Json array
    }

    const isMatch = await bcrypt.compare(password, user.password); //Compare the users password encrypted in Database with the password given
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials password' }] });
    }

    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign( //Sign the token
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 }, // Set the expiration of the token
      (err, token) => {
        if (err) throw err; //Is there an error
        user.save();
        res.json({ token }); // Sending the token to the client
      }
    );
  } catch (err) {
    res.status(500).send("Error")
  }
});

/**
 * @api {POST} /api/user/register Register for the user
 * @apiName Register User
 * @apiGroup User
 *
 * @apiParam {String} User's name
 * @apiParam {String} User's email
 * @apiParam {String} User's password
 * @apiParam {String} User's phone number
 * 
 * @apiSuccess {String} return json webtoken
 */

router.post('/register', async (req, res) => {
  const { name, password, email } = req.body;
  console.log('req.body : ', req.body);
  try {
    let user = await User.findOne({ email }); // Seach user by Email
    if (user) { // If the user exist
      return res.status(400).json({ errors: [{ msg: 'User already exist' }] }); // Send an error as a Json array
    }

    user = new User({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10) // Generate a salt with 10 round ! The more there is round the more it is secured
    user.password = await bcrypt.hash(password, salt); // Hashing the password
    await user.save();

    const payload = { user: { id: user.id } };

    jwt.sign( //Sign the token
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 }, // Set the expiration of the token
      (err, token) => {
        if (err) return err; //Is there an error
        res.send({ token }); // Sending the token to the client
      }
    );
  } catch (err) {
    console.log(err)
    res.status(500).send('Error server');
  }
});

module.exports = router;