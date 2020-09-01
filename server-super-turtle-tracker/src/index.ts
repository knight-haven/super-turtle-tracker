// Deploy with: git subtree push --prefix backend heroku master
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express from "express";
import * as db from "./queries";

dotenv.config();
const app: express.Application = express();

const SECRET = process.env.BACKEND_SECRET;

const getBearerToken = (request: express.Request, response: express.Response) => {
  let token = " ";
  if (request.headers.authorization !== undefined) {
    try {
      const [, tok] = request.headers.authorization.split(" ");
      token = tok;
    } catch (error) {
      response.send(401).json("No Bearer Token given");
    }
  }
  return token;
};

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get("/", (_request: express.Request, response: express.Response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

// For every response..
app.all("*", (req, res, next) => {
  const token = getBearerToken(req, res);
  if (token === SECRET) {
    app.get("/turtle", db.getTurtles);
    app.get("/turtle/:id", db.getTurtleById);
    app.post("/turtle", db.createTurtle);
    app.put("/turtle/:id", db.updateTurtle);
    app.delete("/turtle/:id", db.deleteTurtle);
    app.get("/sighting", db.getSightings);
    app.get("/sighting/:id", db.getSightingById);
    app.post("/sighting", db.createSighting);
    app.put("/sighting/:id", db.updateSighting);
    app.delete("/sighting/:id", db.deleteSighting);
    app.get("/sighting/turtle/:turtleId", db.getSightingByTurtleId);
    app.get("/recent/sighting", db.getRecentSightings);
    app.get("/photo", db.getPhotos);
    app.get("/photo/:id", db.getPhotoById);
    app.post("/photo", db.createPhoto);
    app.put("/photo/:id", db.updatePhoto);
    app.delete("/photo/:id", db.deletePhoto);
    app.get("/photo/turtle/:turtleId", db.getPhotoByTurtleId);
    app.get("/photo/sighting/:sightingId", db.getPhotoBySightingId);
    app.get("/email/:address", db.sendEmail);
    next(); // Go onto the queries.
  } else {
    res.status(401).json("Unauthorized Request");
  }
});

let port = process.env.PORT;
if (port == null || port === "") {
  port = "5000";
}
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
