# Notes and functionalities 

## 1. Set up working environment using Nx-monorepos
#### npx create-nx-workspace "App-Name/Folder-Name"
- he npx create-nx-workspace command is used to initialize a new Nx workspace. This command will guide you through the process of setting up your monorepo.

#### nx add @nx/express
- The nx add @nx/express command is used in an Nx workspace to install the @nx/express plugin. This plugin provides tools and generators for building and managing Express.js applications and libraries within your Nx monorepo. When you run nx add @nx/express, the @nx/express package, and its necessary dependencies, are installed in your workspace's node_modules directory. Nx ensures that the version of @nx/express installed is compatible with the version of Nx in your repository.

#### nx g @nx/express:app apps/api-gateway or nx g @nx/express:app api-gateway --directory=apps/api-gateway --e2eTestRunner=none   
- The command nx g @nx/express:app apps/api-gateway generates a new Express application named api-gateway inside the apps/ directory of your Nx workspace. This is a standard way to scaffold new applications using the Nx CLI. 

- How the command works: 
nx g is a shortcut for nx generate.
@nx/express:app is the generator's name, which comes from the @nx/express plugin. It is specifically designed to create new Express.js applications.
apps/api-gateway specifies the path and name for the new project.
apps/ indicates that this is a top-level application, as opposed to a shared library which would be generated into a libs/ directory.
api-gateway is the name of the new project. 

- What the command does: 
When you run this command, Nx performs several actions to set up the new project:
Creates a project folder: A new directory will be created at apps/api-gateway/.
Generates application files: A basic, runnable Express application will be scaffolded inside the new project folder, including an entry file (main.ts or main.js), test files, and configuration files.
Adds configuration to nx.json: The new api-gateway project is registered in the workspace's configuration file, so Nx can track and manage it.
Installs dependencies: If any new npm packages are required for the Express application, Nx will install them automatically.
Creates a development server: A development server is automatically configured for the new application. You can typically run it with a command like nx serve api-gateway. 

## 2. API Gateway and why need it
- in microservices , because we have multiple services , like seller, order, product, etc. so we need t break application in multiple srvices and in our client side we not going to send request into different servers. For example suppose product service running on 6002, seller running in 6001, etc. and so from front end we cannot send request to every different route. every different port is not possible and not good practice because we are making the microservice port and URL public which is not secure beacuse the API gateway should work like on middleware. So if you want to go into AUTH service you have to pass the API gateway security and then enter the AUTH service. in this API gateway we connect all our services using on proxy server. Proxy server -> in proxy server meaning in the 8080 we connect all API port. if send request in 8080, it will redirect inside the Auth server. in API gateway for connecting proxy server we use the express-http-proxy liv=brary

- library: ```npm i express-http-proxy```
    - express-http-proxy is a Node.js Express middleware designed to forward incoming HTTP requests to a different host and return the response to the original caller. It acts as a reverse proxy within an Express application, allowing you to route requests to various backend services or servers. 

- libararies: ```npm i cors morgan express-rate-limit swagger-ui-express axios coockie parser ```
    - cors (cross origin resource sharing) -> is a web security mechanism that allows a web server to permit a frontend webpage from a different domain to access its resources
    - Morgan a logger used for logging our application -> Morgan npm simplifies HTTP request logging in Node. js, making it easier to monitor and debug your applications with customizable formats.
    - express-rate-limit -> we need this to protect our API from DOS attacks. DOS is common or hackers sending bot to our website. like sending 1000 or 1 million requests to our website and if server is not good enough to handle that it crashes.
    - swagger-ui-express is for API documentation ->  is an NPM package designed to integrate Swagger UI, an interactive API documentation tool, into an Express.js application. It allows developers to serve dynamically generated API documentation directly from their Express server, making it easy to visualize and test RESTful API endpoints.
    - Axios is needed for fetching requests -> being a Promise-based HTTP client, functions seamlessly in both browser and Node. js environments. Its intuitive interface simplifies various HTTP operations such as GET , POST , PUT , and DELETE.
    - Cookie Parser -> parses the incoming cookies from request to JSON value.
- use command ```npm i --save-dev @types/cors``` to save types