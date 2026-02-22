// Manual Routing Implementation using Node's http module
// This implements custom routing without using Express's built-in router

const http = require('http');
const url = require('url');
const querystring = require('querystring');

// Route handler functions
const routes = {
  'GET': {},
  'POST': {},
  'PUT': {},
  'DELETE': {}
};

// Function to register routes manually
function get(path, handler) {
  routes['GET'][path] = handler;
}

function post(path, handler) {
  routes['POST'][path] = handler;
}

function put(path, handler) {
  routes['PUT'][path] = handler;
}

function del(path, handler) {
  routes['DELETE'][path] = handler;
}

// Manual route registration - example routes
get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Manual Routing Demo</title>
    </head>
    <body>
      <h1>Manual Routing Demo</h1>
      <nav>
        <a href="/">Home</a> | 
        <a href="/about">About</a> | 
        <a href="/contact">Contact</a>
      </nav>
      <p>Welcome to the manual routing demo!</p>
    </body>
    </html>
  `);
});

get('/about', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head><title>About</title></head>
    <body>
      <h1>About Page</h1>
      <p>This is a manual routing implementation using Node.js http module.</p>
      <a href="/">Back to Home</a>
    </body>
    </html>
  `);
});

get('/contact', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head><title>Contact</title></head>
    <body>
      <h1>Contact Page</h1>
      <form action="/contact" method="POST">
        <input type="text" name="name" placeholder="Your Name" required><br><br>
        <input type="email" name="email" placeholder="Your Email" required><br><br>
        <textarea name="message" placeholder="Your Message" required></textarea><br><br>
        <button type="submit">Send</button>
      </form>
      <br>
      <a href="/">Back to Home</a>
    </body>
    </html>
  `);
});

post('/contact', (req, res) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const params = querystring.parse(body);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head><title>Contact Received</title></head>
      <body>
        <h1>Message Received!</h1>
        <p><strong>Name:</strong> ${params.name}</p>
        <p><strong>Email:</strong> ${params.email}</p>
        <p><strong>Message:</strong> ${params.message}</p>
        <a href="/">Back to Home</a>
      </body>
      </html>
    `);
  });
});

get('/api/users', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    users: [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Bob Johnson' }
    ]
  }));
});

post('/api/users', (req, res) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const data = JSON.parse(body);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      message: 'User created successfully', 
      user: data 
    }));
  });
});

// 404 handler
function handleNotFound(req, res) {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head><title>404 - Not Found</title></head>
    <body>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/">Back to Home</a>
    </body>
    </html>
  `);
}

// Main request handler - Manual routing logic
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;
  
  // Remove trailing slash for consistent routing
  const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  
  console.log(`${method} ${cleanPath}`);
  
  // Check if route exists
  if (routes[method] && routes[method][cleanPath]) {
    routes[method][cleanPath](req, res);
  } else {
    handleNotFound(req, res);
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Manual routing server running at http://localhost:${PORT}/`);
  console.log('Available routes:');
  console.log('  GET  /');
  console.log('  GET  /about');
  console.log('  GET  /contact');
  console.log('  POST /contact');
  console.log('  GET  /api/users');
  console.log('  POST /api/users');
});
