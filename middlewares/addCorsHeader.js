const getEnvVar = require('../helpers/getEnvVar');

const addCorsHeader = (req, res, next) => {
  const corsOrigin = getEnvVar('CORS_ORIGIN');
  res.header('Access-Control-Allow-Origin', corsOrigin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
};

module.exports = addCorsHeader;
