const getEnvVar = require('../helpers/getEnvVar');

const addCorsHeader = (req, res, next) => {
  const corsOrigin = getEnvVar('CORS_ORIGIN');
  res.header('Access-Control-Allow-Origin', corsOrigin);
  next();
};

module.exports = addCorsHeader;
