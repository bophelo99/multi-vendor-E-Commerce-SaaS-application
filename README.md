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

### 6. radis
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