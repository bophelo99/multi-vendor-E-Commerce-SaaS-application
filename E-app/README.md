# Multi-vendor commerce shop
- A self studying Project  where I learn about Microservices and apply it to build and deploy an E-Commerce App people can register their shops and sells products online and buyers can buy products from. Kindly note the App is not functioning as a real legitimate shopping site application. it is a just a project example I have been working on soo avoid putting your banking or personal details when you explore it. However a legitimate email may be required for real Aunthetication code message  


## Technolgies selection to be used
- Microservices Architecture
- Express.Js for Backend Framework
- Next.Js for Frontend framework
- Machine learning Framework for data analysis using Tensorflow.js
- for application containerization using Docker
- AWS EC2 for deployment
- NX for making project folder structure (Monorepo tools)
- MangoDB for primary database. used to store all fixed data. chosen over PostgreeQL or MySQL because it's compact to write lot of extra data
- Secondary database using radius. it works as cache or inmemory database storing data that is not fixed
- Kafka for message broker
- API testing using Gist
- API Docs for documentation swagger
- Websocket (socket io) for real time communications
- making web push notification using firebase
- for cloud provider or image provide using Image Kit
- Implementing CI/CD using Github Actions
- Domain management using cloudfare
- Object Relational Model ORM is used to manage connecting MangoDB and working with  the backend

## Technolgies descriptions

### 1. Apache Kafka 
- is an open-source, distributed event streaming platform used to build real-time data pipelines and streaming applications. Written in Java and Scala, it handles high-throughput, low-latency data feeds and is known for its scalability, fault tolerance, and ability to serve as a message broker and storage unit. Companies use it for a wide range of applications, including data integration, real-time analytics, log aggregation, and building event-driven architectures. 

- #### Core functionalities:

    . Distributed event streaming: It functions as a distributed system that publishes and subscribes to streams of records, or "events".  
    
    . High throughput and low latency: Kafka is designed to handle massive amounts of data with very low latency, as low as 2ms.  
    
    . Scalability: It can scale to thousands of brokers and handle trillions of messages a day, making it suitable for large-scale applications.  
    
    . Fault tolerance: Data is replicated across multiple servers, ensuring that the system remains available even if some servers fail.

    . Data pipelines and storage: It combines messaging, storage, and stream processing to create reliable data pipelines that can store and analyze both historical and real-time data.
    
    #### Examples of use
        Ride-sharing: Uber and Lyft use it for real-time driver-customer matching and tracking.
        Social media: Twitter uses it for content recommendations at scale.
        E-commerce: Walmart uses it for global inventory management.
        Streaming services: Netflix uses it for media recommendations.  

### 2. Microservice Architecture 
- a style used by big companies like Google, Facebook, etc. to build large scale applications plartforms as a collection of small, independent services, each with its own business logic and data, that communicate with each other. For example Google use Basil to make their microservice architecture. 

    #### Bazel: 
    - an open-source build and test tool similar to Make, Maven, and Gradle. It uses a human-readable, high-level build language. Bazel supports projects in multiple languages and builds outputs for multiple platforms.

    #### NX: 
    - it is on tools for creating monorepos. there are two types of repository systems, monorepos and polyrepos. in microservice, we create multiple folders/services and monorepos comes into how we want to add/store that. A monorepo uses a single repository for multiple projects, while a polyrepo uses a separate repository for each project. Monorepos simplify dependency management and code sharing across projects, making them suitable for teams that need tight integration and consistency. Polyrepos offer greater independence and modularity for teams, allowing for more autonomy in development and tooling, but they can complicate cross-project coordination.

    #### Examples of use
        Suppose in microservice architexture project you have 10 services/folders, so if using monorepo we store all folders in single repository and if using polyrepo we store folders into multiple repository

### 3. Express.js 
- express is a fast, unopinionated, minimalist web framework for Node.js, providing a robust set of features for building web and mobile applications and APIs.

- #### Core functionalities:
    . A robust routing system

    . HTTP helpers (redirection, caching, etc.)

    . Support for middleware to respond to HTTP requests

    . A templating engine for dynamic HTML rendering

    . Error handling middleware

### 4. AWS EC2 
- Amazon Elastic Compute Cloud (EC2) is a web service that provides secure, resizable virtual servers, or "instances," in the cloud, allowing users to run applications without managing their own physical hardware. It offers flexible, on-demand computing capacity that can be scaled up or down to meet application needs, making it the backbone of AWS's cloud computing platform. Key features include a wide variety of instance types, integration with other AWS services, and a pay-as-you-go pricing model.

### 5. MangoDB
- MongoDB is an open source NoSQL database. NoSQL means the database does not use relational tables like a traditional SQL database. 

### 6. radis / upstash version
- is a datastore that's used as both a database and cache for applications that require low data latency

### 6. ORM
- Object-Relational Mapping (ORM) is a programming technique that acts as a bridge between object-oriented programming languages and relational databases. It enables developers to interact with a database using objects and classes within their chosen programming language, rather than writing raw SQL queries.

### 7. Nextjs
- Used by some of the world's largest companies, Next.js enables you to create high-quality web applications with the power of React components.

### 8. Swagger
- Swagger enables design, governance, and testing across the full AI-enabled API lifecycle, ensuring quality at every step. Build APIs ready for humans, LLMs, agents, and continuous innovation. helps keep track of API without understanding the code for large scale application

### 9. TensorFlow.js 
- is a library for machine learning in JavaScript. Develop ML models in JavaScript, and use ML directly in the browser or in Node.js.

### 10. Websocket and Socket.io
- a communication protocol that provides a persistent, two-way channel over a single TCP connection, allowing for real-time data exchange between a client and a server. Unlike the traditional request-response model of HTTP, WebSocket enables the server to push data to the client without an explicit client request, making it ideal for applications like live chat, online gaming, and real-time dashboards. 

- #### Core functionalities:
    . Online gaming: For real-time interaction and synchronization between players.

    . Chat applications: To instantly deliver messages between users.

    . Live dashboards: To display streaming data and live updates.

    . Location-based services: To provide real-time location tracking.

    . Audio/video streaming: Can be integrated with other technologies like WebRTC for real-time communication. 

### 11. Firebase
- Firebase Cloud Messaging (FCM) is a cross-platform messaging solution that lets you reliably send messages.

### 12. Imagekit
- One platform to optimize, transform, store, manage and deliver visuals, so developers ship faster, marketers iterate freely, and your users enjoy flawless. it comes with intergrated storage but can also work with your own cloud storage like S3 bucket or Google cloud provider
- An image kit is used to automatically convert and compress images or videos to a suitable format for multiple devices. they also offer SDKs for popular frameworks and languages. we use Nodejs SDK forever free plan. is this project the imagekit is used to upload and implement AI enhancement 

### 13. Docker
- used for making application contanirazation. it is a tool that is used to automate the deployment of applications in lightweight containers so that applications can work efficiently in different environments in isolation.

## Types of Services
- order services
- Aunthetication service
- recommendation system service
- User UI service
- real time analytic system 
- Messaging system
- order and cart systerm
- seller domain connection mechanism
- Admnin dashboard 
- buyer domain connection

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

### Common error server port already in use to fix
- use the command ``` npx kill-port 8080 ```
- using curl to test root request: ```curl http://localhost:8080```

### Erro handling in middleware

- as we staret the backend serv9ce first, we have to wait until we see something on website. first we need to set up error handler

### API routes and controllers setup
- we have three folders: utils in which we are goint to store all our utilities functions, , routes in which we store our routing systems or functions and and controllers  in which we write our business logics or main logic for our back end

### Prisma library - ``` npm i prisma @prisma/client ```
- we will use prisma for making our database connectins as our ORM (object relational model)
- ``` npm i -d prisma``` -> 
- ``` npx prisma init ``` -> to inital
    #### Next steps:
    - 1. set DATABASE_URL in the .env to point to existing database
    - 2. set provider of the database block in schema.prisma to match your database: postgresql, mysql, mangodb, sqlite, sqlserver, cockroachdb
    - 3. run prisma db pull to turn your database schema into prisma schema
    - 4. run prisma generate to generate the prisma client. you can then start querying database
    - 5. Tip: expand how you can extend ORM with scalable pooling, global caching, and real-time  database events.

### set up database model
- password is optional since users can sign up using social authentican method with no password
- use ``` npx prisma db push ``` -> to add updates into our local prisma db, in the node modules prisma client so that we can use it

### set up controller all authentication related functions
- we create common functions in utilis so we can reuse them over and over agains to avoid reqriting same functionalities
- we create Prisma Client instance in packages - that’s the database client generated by Prisma ORM for interacting with your database in a Node.js/Next.js project.
- application restrictions for users: if user is doing email spamming with the email and makes application slow
- use ``` npm i ioredis nodemailer dotenv ejs ``` to install redis
- use  ``` npm i swagger-autogen``` to install swagger library
- use ``` npm i bcryptjs jsonwebtoken ``` to install 

### Error with DEAMON
- ``$env:NX_DEAMON = "false" ``, ``NX_DEAMON=false``, ``$env:NX_PLUGIN_NO_TIMEOUTS = "true"``

## FRONT END

- npm i lucide-react
- npm i next/font
