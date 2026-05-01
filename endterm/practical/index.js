const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'my_secret_key_12345';

app.use(express.json());
app.use(cookieParser());

// Middleware: Logging with method and URL
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// In-memory user data (for demo purposes)
const users = [
  { id: 1, username: 'Akash', email: 'Akah@example.com', password: '' },
  { id: 2, username: 'smith', email: 'smith@example.com', password: '' },
  { id: 3, username: 'virat', email: 'virat@example.com', password: '' },
  { id: 4, username: 'rahit', email: 'rohit@example.com', password: '' },
];

// Pre-hash passwords for demo (normally you'd hash during registration)
(async () => {
  users[0].password = await bcrypt.hash('password123', 10);
  users[1].password = await bcrypt.hash('password123', 10);
  users[2].password = await bcrypt.hash('password123', 10);
  users[3].password = await bcrypt.hash('password123', 10);
})();

// Helper: Generate token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
};

// Middleware: Authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ==================== ROUTES ====================

// POST /login - Basic login system
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ 
        message: 'Username and password are required' 
      });
    }
    
    // Find user
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = generateToken(user);
    
    // Set cookie
    res.cookie('token', token, { 
      httpOnly: true, 
      maxAge: 3600000 // 1 hour
    });
    
    // Return response
    res.json({
      message: 'Login successful',
      time: new Date().toISOString(),
      token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// POST /logout - Logout route
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ 
    message: 'Logout successful',
    time: new Date().toISOString()
  });
});

// GET /users - Get all users (protected route)
app.get('/users', authenticateToken, (req, res) => {
  try {
    const userList = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email
    }));
    
    res.json({
      message: 'Users retrieved successfully',
      time: new Date().toISOString(),
      data: userList
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve users', error: error.message });
  }
});

// BONUS CHALLENGE: GET /users/:id - Get specific user
app.get('/users/:id', authenticateToken, (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        time: new Date().toISOString()
      });
    }
    
    res.json({
      message: 'User retrieved successfully',
      time: new Date().toISOString(),
      data: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve user', error: error.message });
  }
});

// GET / - Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Express API',
    time: new Date().toISOString(),
    routes: {
      'POST /login': 'Login with username and password',
      'POST /logout': 'Logout and clear token',
      'GET /users': 'Get all users (requires auth)',
      'GET /users/:id': 'Get specific user by ID (requires auth)'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('  POST /login');
  console.log('  POST /logout');
  console.log('  GET /users');
  console.log('  GET /users/:id');
});

module.exports = app;
