const express = require('express')
const app = express()
app.use(express.json())
const kamarController = require('../controllers/kamar.controller')
app.get('/', kamarController.getAllKamar)
app.post('/', kamarController.addKamar)
app.post('/find', kamarController.findKamar)
app.put("/:id", kamarController.updateKamar)
app.delete("/:id", kamarController.deleteKamar)
module.exports = app