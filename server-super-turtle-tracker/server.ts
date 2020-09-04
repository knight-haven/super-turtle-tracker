// Deploy with: git subtree push --prefix backend heroku master
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express from "express";
import mailRoutes from "./src/routes/mailRoutes";
import photoRoutes from "./src/routes/photoRoutes";
import sightingRoutes from "./src/routes/sightingRoutes";
import turtleRoutes from "./src/routes/turtleRoutes";

dotenv.config();
const app: express.Application = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use("/turtle", turtleRoutes);
app.use("/sighting", sightingRoutes);
app.use("/photo", photoRoutes);
app.use("/email", mailRoutes);

app.get("/", (_request: express.Request, response: express.Response) => {
  response.json({ info: "Calvin EcoPreserve Turtle Tracker API" });
});

let port = process.env.PORT;
if (port == null || port === "") {
  port = "5000";
}
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
