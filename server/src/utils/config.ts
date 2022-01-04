require("dotenv").config();

const PORT = process.env.NODE_DOCKER_PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;
const REDIS_URL = process.env.REDIS_URL;

export default { PORT, DATABASE_URL, REDIS_URL };
