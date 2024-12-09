const jwt = require('jsonwebtoken');
const { createUser, findUserByUsername } = require('./user.model');

const signup = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    await createUser(username, password, role);
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Username already exists' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username);
  if (!user || !(await bcryptjs.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

module.exports = { signup, login };
