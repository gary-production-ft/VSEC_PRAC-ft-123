const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
  { id: 1, name: 'Om Pawar', email: 'om.pawar@example.com' },
  { id: 2, name: 'Bhavya Patel', email: 'bhavya.patel@example.com' },
  { id: 3, name: 'Chinmay Ahire', email: 'chinmay.ahire@example.com' },
  { id: 4, name: 'Yash Shirsath', email: 'yash.shirsath@example.com' },
  { id: 5, name: 'Umesh Khkairnar', email: 'umesh.khkairnar@example.com' },
  { id: 6, name: 'Raviraj Thakare', email: 'raviraj.thakare@example.com' }
];

// GET - Health check
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// GET - Get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET - Get one user
app.get('/api/users/:id', (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

// POST - Create a user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: 'Name and email are required'
    });
  }

  const user = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    email
  };

  users.push(user);
  res.status(201).json(user);
});

// POST - Create multiple users from an array
app.post('/api/users/bulk', (req, res) => {
  if (!Array.isArray(req.body) || req.body.some((user) => !user.name || !user.email)) {
    return res.status(400).json({
      message: 'Send an array of users with name and email'
    });
  }

  const firstId = users.length ? users[users.length - 1].id + 1 : 1;
  const newUsers = req.body.map(({ name, email }, index) => ({
    id: firstId + index,
    name,
    email
  }));

  users.push(...newUsers);
  res.status(201).json(newUsers);
});

// PUT - Replace a user
app.put('/api/users/:id', (req, res) => {
  const index = users.findIndex((u) => u.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { name, email } = req.body;

  users[index] = {
    id: Number(req.params.id),
    name,
    email
  };

  res.json(users[index]);
});

// PATCH - Update a user
app.patch('/api/users/:id', (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  Object.assign(user, req.body);
  res.json(user);
});

// DELETE - Delete multiple users
app.delete('/api/users/bulk', (req, res) => {
  if (!Array.isArray(req.body) || req.body.length === 0) {
    return res.status(400).json({ message: 'Send an array of user IDs' });
  }

  const ids = req.body.map(Number);
  const deletedUsers = users.filter((user) => ids.includes(user.id));

  if (deletedUsers.length !== ids.length) {
    return res.status(404).json({ message: 'One or more users not found' });
  }

  users = users.filter((user) => !ids.includes(user.id));
  res.json({
    message: 'Users deleted successfully',
    users: deletedUsers
  });
});

// DELETE - Delete a user
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex((u) => u.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const deletedUser = users.splice(index, 1);
  res.json({
    message: 'User deleted successfully',
    user: deletedUser[0]
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${3000}`);
});