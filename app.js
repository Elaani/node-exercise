const peopleRouter = require('./routes/people')
const planetRouter = require('./routes/planets')
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
const express = require('express')

const app = express()

const port = process.env.PORT || 5000

// middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('<h1>Welcome to my Node Challenge for Solo! By Sarah Friedrichs.</h1> <h2>Try using "/api/people/?sort=name".</h2>')
})
app.use('/api/people', peopleRouter)
app.use('/api/planets', planetRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

// listener
const start = async () => {
  try {
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()