# HIGH-LEVEL EXPLANATION

This file sets up a complete authentication microservice in a microservice architecture.

In simple terms:

✔ It creates an Express server
✔ It enables CORS, JSON parsing, and cookie parsing
✔ It loads your authentication routes
✔ It automatically generates Swagger API documentation
✔ It uses a global error handler middleware
✔ It listens on port 6001 (your auth-service)

This service will be called by the API Gateway (port 8080).
The gateway forwards auth-related requests to this service.


![alt text](image.png)

#### Every request goes through these layers:
- CORS – validates allowed origins
- JSON body parser – converts JSON into req.body
- Cookie parser – extracts cookies
- Routes (auth.router) – matches the correct auth endpoint
- Error Middleware – handles all thrown errors centrally
- Swagger Docs – generates documentation UI
- Response sent to client
- This architecture is professional, scalable, production-ready.

# FULL DETAILED EXPLANATION — SYSTEM BEHAVIOR

### 1️⃣ Create Express app : ```const app = express();```
- This creates your backend server instance.

### 2️⃣ Enable CORS Security
- This controls which frontend domains can access your service: Only the React app on localhost:3000 is allowed.Allows cookies and Authorization headers.
- Required for login systems that use: sessions, JWT (JSON Web Token) in cookies, refresh tokens

### 3️⃣ JSON Parsing ```app.use(express.json());```
- This middleware automatically converts incoming JSON into a JS object: { "email": "user@test.com" }

→ becomes →
req.body.email === "user@test.com"

Without this, your auth routes cannot read login or signup data.

### 4️⃣ Cookie Parsing ```app.use(cookieParser());```
- This reads cookies from the request header: 
    - Cookie: refreshToken=abcd1234;

Which becomes:

req.cookies.refreshToken === "abcd1234"

- You need this for: Refresh token authentication, Session-based auth and Multi-factor auth with cookies

### 5️⃣ Health Check Route
- This allows: Monitoring services (Kubernetes, Docker, Gateway) and Load balancers …to check if the service is alive.

### 6️⃣ Swagger Documentation
- This exposes interactive API documentation: ```http://localhost:6001/api-docs```
- The documentation is generated from: swagger-output.json
- This lets developers see: All auth routes, Their parameters, Expected responses and Error messages
- Very useful for debugging and team collaboration.

### 7️⃣ Mount Authentication Routes ```app.use("/api", router);```
- This attaches your custom authentication routes.
- Every route inside auth.router.ts becomes available under:
    - /api/login
    - /api/register
    - /api/refresh
    - /api/logout
    - /api/me

#### This is where our real authentication logic lives:
- Creating users
- Logging in
- Refreshing tokens
- Verifying tokens
- Getting user profile
- Revoking tokens

#### The service itself doesn’t know these details — the router handles it.

### 8️⃣ Global Error Handler ```app.use(errorMiddleware);```
- This is critical in professional apps. Any error inside: routes, async controllers, service logic and database operations is caught here. This avoids the app crashing and lets you return clean JSON errors:
```
  "status": 400,
  "message": "Invalid password"
```
- This keeps the code clean, centralized, and easy to maintain.

### 9️⃣ Start the Server
- The service begins accepting requests on: ``http://localhost:6001``
- This is our authentication microservice in a microservice architecture.

### 1️⃣0️⃣ Server Error Listener
- This prevents the server from dying silently.
E.g., if port 6001 is already used → logs the error instead of crashing.