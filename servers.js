const express = require('express');
const bodyParser = require('body-parser');
const mongooseConnect = require('./config/connect');
const routes = require('./routes/index');
const cors = require('cors')

const servers = express();
const port = 7000;
servers.use(cors())

mongooseConnect();

servers.use(express.urlencoded({ extended: false }));
servers.use(bodyParser.urlencoded({ extended: true }));
servers.use(express.json());

servers.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

servers.use(routes);

servers.listen(port, () => {
  console.log(`App runs on https://servertiara.herokuapp.com/`);
});

