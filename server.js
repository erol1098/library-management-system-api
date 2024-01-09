const dotenv = require('dotenv');
const cors = require('cors');

const app = require('./app');

dotenv.config({ path: './.env' });
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

// MIDDLEWARES;
app.use(cors(corsOptions));

// START SERVER
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
