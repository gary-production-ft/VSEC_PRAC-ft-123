require('dotenv').config();

const express = require('express');
const { ObjectId } = require('mongodb');
const { getDatabase } = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

function users() {
  return getDatabase().then((database) => database.collection('users'));
}

function id(value) {
  return ObjectId.isValid(value) ? new ObjectId(value) : null;
}

function userResponse(user) {
  return { id: user._id.toString(), name: user.name, email: user.email };
}

function validUser(body) {
  return body &&
    typeof body.name === 'string' &&
    body.name.trim() &&
    typeof body.email === 'string' &&
    body.email.trim();
}

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.get('/api/users', async (req, res, next) => {
  try {
    const data = await users();
    const result = await data.find().toArray();
    res.json(result.map(userResponse));
  } catch (error) {
    next(error);
  }
});

app.get('/api/users/:id', async (req, res, next) => {
  try {
    const userId = id(req.params.id);
    if (!userId) return res.status(400).json({ message: 'Invalid user ID' });

    const user = await (await users()).findOne({ _id: userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(userResponse(user));
  } catch (error) {
    next(error);
  }
});

app.post('/api/users', async (req, res, next) => {
  try {
    if (!validUser(req.body)) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const data = await users();
    const newUser = {
      name: req.body.name.trim(),
      email: req.body.email.trim()
    };
    const result = await data.insertOne(newUser);

    res.status(201).json(userResponse({ _id: result.insertedId, ...newUser }));
  } catch (error) {
    next(error);
  }
});

app.put('/api/users/:id', async (req, res, next) => {
  try {
    const userId = id(req.params.id);
    if (!userId) return res.status(400).json({ message: 'Invalid user ID' });
    if (!validUser(req.body)) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const newUser = {
      name: req.body.name.trim(),
      email: req.body.email.trim()
    };
    const data = await users();
    const result = await data.replaceOne({ _id: userId }, newUser);

    if (!result.matchedCount) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(userResponse({ _id: userId, ...newUser }));
  } catch (error) {
    next(error);
  }
});

app.delete('/api/users', async (req, res, next) => {
  try {
    if (!Array.isArray(req.body) || req.body.length === 0) {
      return res.status(400).json({ message: 'Send an array of user IDs' });
    }

    const userIds = req.body.map(id);
    if (userIds.some((userId) => !userId)) {
      return res.status(400).json({ message: 'All user IDs must be valid' });
    }

    const data = await users();
    const deletedUsers = await data.find({ _id: { $in: userIds } }).toArray();

    if (deletedUsers.length !== userIds.length) {
      return res.status(404).json({ message: 'One or more users not found' });
    }

    await data.deleteMany({ _id: { $in: userIds } });
    res.json({
      message: 'Users deleted successfully',
      users: deletedUsers.map(userResponse)
    });
  } catch (error) {
    next(error);
  }
});

app.delete('/api/users/:id', async (req, res, next) => {
  try {
    const userId = id(req.params.id);
    if (!userId) return res.status(400).json({ message: 'Invalid user ID' });

    const data = await users();
    const user = await data.findOne({ _id: userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    await data.deleteOne({ _id: userId });
    res.json({ message: 'User deleted successfully', user: userResponse(user) });
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
});

getDatabase()
  .then(() => app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  }))
  .catch((error) => {
    console.error('Could not connect to MongoDB:', error.message);
    process.exit(1);
  });
