if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }

const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const routes = require('./routes/index.js')
const cors = require('cors');
const errorHandler = require("./middlewares/errorHandler.js");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



module.exports = app


