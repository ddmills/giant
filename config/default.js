require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV || 'production',
  server: {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 8080,
    protocol: process.env.PROTOCOL || 'http'
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: (60 * 60 * 60) * 5 // seconds
  },
  session: {
    secret: process.env.APP_SESSION_SECRET,
    resave: false,
    unset: 'destroy',
    saveUninitialized: true
  },
  steam: {
    key: process.env.STEAM_API_KEY
  }
};
