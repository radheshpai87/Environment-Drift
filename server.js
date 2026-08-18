require('dotenv').config();

const express = require('express');
const healthRouter = require('./routes/health');
const config = require('./config');

const requiredEnvVars = [
  'PORT',
  'DATABASE_URL',
  'JWT_SECRET'
];

const missingEnvVars = requiredEnvVars.filter(
  (key) => !process.env[key]
);

if (missingEnvVars.length > 0) {
  console.error(
    `Missing required environment variables: ${missingEnvVars.join(', ')}`
  );
  process.exit(1);
}

const app = express();

const port = config.port;

app.use(express.json());

app.use('/health', healthRouter);

app.get('/auth-check', (req, res) => {
  const secret = config.jwt_secret;

  if (secret && secret.length > 0) {
    return res.json({ secret_configured: true });
  }

  return res.json({ secret_configured: false });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${config.node_env}`);
});