const express = require('express')
const path = require('path')
const graceful = require('node-graceful')

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/ping', (_, res) => {
  res.send('Ok')
})

app.get('*', (_, res) => {
  res.sendFile(path.join(`${__dirname}/dist/index.html`))
})

const server = app.listen(PORT, (err) => {
  if (err) {
    console.error(`There's something errors: ${err}`)
    return
  }
  console.log(`Running on port ${PORT}`)
})

graceful.on('exit', (done) => {
  server.close(() => {
    done()
  })
})
