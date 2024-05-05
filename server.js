const express = require('express')
const app = express()
const port = 8002
const cors = require('cors')

app.use(cors())
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

const kamarRoute = require('./routes/kamar.route')
app.use(`/kamar`, kamarRoute)

const pemesananRoute = require('./routes/pemesanan.route')
app.use(`/pemesanan`, pemesananRoute)

const tipe_kamarRoute = require('./routes/tipe_kamar.route')
app.use(`/tipe_kamar`, tipe_kamarRoute)

const userRoute = require('./routes/user.route')
app.use(`/user`, userRoute)
app.listen(port, () => {
    console.log(`Server of Hotel runs on port ${port}`)
    })