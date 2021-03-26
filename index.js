const express = require('express')
const app = express()
const PORT = 3001

app.listen(PORT)

console.log(`Server running on port ${PORT}`)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/videos', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})