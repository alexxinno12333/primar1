
import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 3001,
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
};

if (!config.apiKey) {
    throw new Error("API_KEY environment variable not set");
}

if (!config.jwtSecret) {
    throw new Error("JWT_SECRET environment variable not set");
}


export default config;
