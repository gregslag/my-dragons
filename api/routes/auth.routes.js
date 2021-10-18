const jwt = require('jsonwebtoken')
const express = require("express");
const UserDAO = require("../db/user.dao");
const UserModel = require("../models/user.model");

const router = express.Router();

const userDAO = new UserDAO();

// Create a token from a payload 
function createToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '2h' })
}

router.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error('Email and password must be provided')
  }

  try {
    if (userDAO.getByEmail(email)?.email) {
      return res.status(401).json({ message: 'Email and Password already exist' });
    }

    const userModel = new UserModel(req.body);

    const newUser = userDAO.insert(userModel);
    console.log('newUser :>> ', newUser);

    // Create token for new user
    const accessToken = createToken({ email, password })
    console.log("Access Token:" + accessToken);
    return res.status(200).json({ accessToken })
  } catch (error) {
    console.log("error on create user >> ", error);

    return res
      .status(400)
      .send({ error: 'Oops! An error has occurred' });
  }
})

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = userDAO.getByEmail(email)
  if (!user?.email || user.password !== password) {
    return res.status(401).json({ message: 'Incorrect email or password' })
  }
  // Create token for logged user
  const access_token = createToken({ email, password })
  console.log("Access Token:" + access_token);
  return res.status(200).json({ access_token })
})

module.exports = router;
