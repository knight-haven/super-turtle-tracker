import * as dotenv from "dotenv";
import Pool = require("pg");

dotenv.config();

export default new Pool.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PW,
  port: parseInt(process.env.PG_PORT || ""),
  max: parseInt(process.env.PG_MAX || ""),
  min: parseInt(process.env.PG_MIN || ""),
});
