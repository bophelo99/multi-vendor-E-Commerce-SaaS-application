import Redis from "ioredis"

const redis = new Redis({
    host: process.env.Redis_HOST || "12.0.0.1",
    port: Number(process.env.Redis_PORT) || 6379,
    password: process.env.Redis_PASSWORD,
});

export default redis;