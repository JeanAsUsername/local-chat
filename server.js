'use strict'

const express = require('express'),
      publicDir = express.static(`${__dirname}`),
      app = express(),
      port = process.env.PORT || 8080

app.use(publicDir)

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})