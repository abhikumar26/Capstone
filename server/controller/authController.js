const { createUser, findUserByEmail } = require('../model/userModel');

function signup(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill in all the fields.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password should be at least 6 characters long.' });
  }

  if (findUserByEmail(email)) {
    return res.status(409).json({ message: 'This email is already registered.' });
  }

  const newUser = createUser({ name, email, password });

  return res.status(201).json({
    success: true,
    message: `Welcome ${newUser.name}! Your account is ready.`,
    redirectTo: '/',
  });
}

function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter your email and password.' });
  }

  const user = findUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Email or password is incorrect.' });
  }

  return res.status(200).json({
    success: true,
    message: `Welcome back, ${user.name}!`,
    redirectTo: '/',
  });
}

module.exports = {
  signup,
  login,
};
