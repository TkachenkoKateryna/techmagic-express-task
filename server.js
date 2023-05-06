process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err);
  process.exit(1);
});

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
