module.exports = {
  database_url: process.env.DATABASE_URL,
  jwt_secret: process.env.JWT_SECRET,
  port: process.env.PORT,
  node_env: process.env.NODE_ENV || 'development',
};
