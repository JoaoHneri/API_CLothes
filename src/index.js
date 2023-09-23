const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
app.use(express.json());
app.use(cors());
const conn = require("./db/conn");

conn();
 
app.listen(3334, () => console.log('Server running on port 3334'))