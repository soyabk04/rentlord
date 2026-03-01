<h1 align="center">🏠 Rentlord API</h1>

<p align="center">
A secure, production-aware backend API for managing rental properties, tenants, and lease agreements.
</p>

<hr/>

<h2>📌 Overview</h2>
<p>
Rentlord is a RESTful backend system built using <b>Node.js</b> and <b>Express</b>.  
It implements authentication, role-based access control, input validation, and centralized error handling following structured MVC architecture.
</p>

<p>
The project focuses on backend system design, middleware layering, and security best practices.
</p>

<hr/>

<h2>🚀 Tech Stack</h2>
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>MongoDB (Mongoose ODM)</li>
  <li>JWT Authentication</li>
  <li>HTTP-only Cookies</li>
  <li>Zod (Schema Validation)</li>
  <li>bcrypt (Password Hashing)</li>
  <li>Rate Limiting Middleware</li>
</ul>

<hr/>

<h2>🧱 Architecture</h2>

<pre>
server/
│
├── Config/          
├── Controllers/     
├── Middlewares/     
├── Models/          
├── Routes/          
├── utils/           
│
└── app.js           
</pre>

<ul>
  <li>Controllers handle request/response lifecycle</li>
  <li>Validation occurs before controller execution</li>
  <li>Authentication handled via middleware</li>
  <li>Errors standardized using custom AppError class</li>
  <li>JWT stored in HTTP-only cookies</li>
</ul>

<hr/>

<h2>🔐 Authentication & Authorization</h2>
<ul>
  <li>JWT-based authentication</li>
  <li>Token stored in HTTP-only cookies</li>
  <li>Role-based access control (Owner / Tenant)</li>
  <li>Password hashing with bcrypt + salt</li>
  <li>Protected routes via middleware</li>
</ul>

<hr/>

<h2>👥 User Roles</h2>

<h3>Owner</h3>
<ul>
  <li>Create and manage properties</li>
  <li>Assign tenants</li>
  <li>Manage lease records</li>
</ul>

<h3>Tenant</h3>
<ul>
  <li>View assigned properties</li>
  <li>Access lease details</li>
</ul>

<hr/>

<h2>🛡 Security Features</h2>
<ul>
  <li>Zod schema validation</li>
  <li>Centralized error handling</li>
  <li>Rate limiting protection</li>
  <li>Password hashing with salt</li>
  <li>Environment-based secret management</li>
  <li>Secure cookie handling</li>
</ul>

<hr/>

<h2>⚙️ Environment Setup</h2>

<pre>
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES=1d
</pre>

<hr/>

<h2>▶️ Installation</h2>

<pre>
npm install
npm run dev
</pre>

<hr/>

<h2>📡 API Base Routes</h2>

<pre>
/api/users
/api/properties
/api/leases
</pre>

<hr/>

<h2>🧠 What This Project Demonstrates</h2>
<ul>
  <li>Backend architecture design</li>
  <li>Secure authentication flow</li>
  <li>Middleware-driven request lifecycle</li>
  <li>Structured error propagation</li>
  <li>Production-aware development practices</li>
</ul>

<hr/>

<h2>📈 Future Enhancements</h2>
<ul>
  <li>Refresh token implementation</li>
  <li>Service layer refactor</li>
  <li>Unit & integration testing</li>
  <li>Dockerization</li>
  <li>CI/CD integration</li>
</ul>

<hr/>

<p align="center">
Built with focus on clean architecture and backend fundamentals.
</p>
