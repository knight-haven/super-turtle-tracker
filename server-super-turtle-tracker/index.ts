/* eslint-disable no-console */
// Deploy with: git subtree push --prefix backend heroku master
// eslint-disable-next-line import/order
import { Queries as db } from './queries';
import * as dotenv from 'dotenv';
import express = require('express');
import bodyParser = require('body-parser');

dotenv.config()
const app: express.Application = express()

const SECRET = process.env.BACKEND_SECRET

const getBearerToken = (request: express.Request) => {
  let token = ' '
  if (request.headers.authorization !== undefined) {
    try {
      // eslint-disable-next-line prefer-destructuring
      token = request.headers.authorization.split(' ')[1]
    } catch (error) {
      console.log('No bearer token given')
    }
  }
  return token
}

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.get('/', (response: express.Response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// For every response..
app.all('*', (req, res, next) => {
  const token = getBearerToken(req)
  if (token === SECRET) {
    app.get('/turtle', db.getTurtles)
    app.get('/turtle/:id', db.getTurtleById)
    app.post('/turtle', db.createTurtle)
    app.put('/turtle/:id', db.updateTurtle)
    app.delete('/turtle/:id', db.deleteTurtle)
    app.get('/sighting', db.getSightings)
    app.get('/sighting/:id', db.getSightingById)
    app.post('/sighting', db.createSighting)
    app.put('/sighting/:id', db.updateSighting)
    app.delete('/sighting/:id', db.deleteSighting)
    app.get('/sighting/turtle/:turtleId', db.getSightingByTurtleId)
    app.get('/recentSighting', db.getRecentSightings)
    app.get('/photo', db.getPhotos)
    app.get('/photo/:id', db.getPhotoById)
    app.post('/photo', db.createPhoto)
    app.put('/photo/:id', db.updatePhoto)
    app.delete('/photo/:id', db.deletePhoto)
    app.get('/photo/turtle/:turtleId', db.getPhotoByTurtleId)
    app.get('/photo/sighting/:sightingId', db.getPhotoBySightingId)
    app.get('/email/:address', db.sendEmail)
    next() // Go onto the queries.
  } else {
    res.status(401).json('Unauthorized Request')
  }
})

let port = process.env.PORT
if (port == null || port === '') {
  port = '5000'
}
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
