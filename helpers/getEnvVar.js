const dotenv = require('dotenv');

dotenv.config({ path: '../.env.local' });

const getEnvVar = (envVar) => process.env[envVar];

module.exports = getEnvVar;
