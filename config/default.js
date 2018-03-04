require('dotenv').config();

module.exports = {
  server: {
    host: "127.0.0.1",
    port: 8080,
    protocol: "http"
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: 60 * 2 // 2 minutes
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
