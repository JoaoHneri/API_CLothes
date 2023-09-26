const express = require('express');
const cors = require('cors');const app = express();
require('dotenv').config()

app.use(express.json());
app.use(cors());
const conn = require("./db/conn");
const router= require("./routes/router")

conn();
app.use(router);

app.listen(3334, () => console.log('Server running on port 3334'))