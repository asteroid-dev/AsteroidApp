const path = require('path'), main = require("./src/Main").getInstance();
require('dotenv').config({path: path.resolve(__dirname, 'config.env')});
main.loadFlash();
main.init().catch(main => console.error(main));