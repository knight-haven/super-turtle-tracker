import * as dotenv from "dotenv";
import pool from "../db/pool";
import status = require("http-status");
import queries = require("../db/queries");
import express = require("express");
import createCsvWriter = require("csv-writer");
import fs = require("fs");
import sgMail = require("@sendgrid/mail");

const CsvWriter = createCsvWriter.createObjectCsvWriter;
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

const sendMail = async (request: express.Request, response: express.Response): Promise<void> => {
  const emailAddress = request.params.address;

  try {
    const results = await pool.query(queries.getAllData);
    // https://stackabuse.com/reading-and-writing-csv-files-with-node-js/
    const csvWriter = CsvWriter({
      path: "turtle_data.csv",
      header: [
        { id: "turtle_number", title: "Turtle Number" },
        { id: "mark", title: "Mark" },
        { id: "sex", title: "Sex" },
        { id: "time_seen", title: "Date" },
        { id: "turtle_location", title: "Location" },
        { id: "latitude", title: "Latitude" },
        { id: "longitude", title: "longitude" },
        { id: "carapace_length", title: "Carapace Length (mm)" },
        { id: "notes", title: "Notes" },
      ],
    });
    await csvWriter.writeRecords(results.rows);
    // https://www.twilio.com/blog/sending-email-attachments-with-sendgrid
    const pathToAttachment = `${__dirname}/../../turtle_data.csv`;
    const attachment = await fs.readFileSync(pathToAttachment).toString("base64");

    const msg = {
      to: emailAddress,
      from: "turtletrackerbackend@gmail.com",
      subject: "Calvin EcoPreserve Turtle Data",
      text:
        "Dear Turtle Tracker User,\n\nAttached is a csv file with the all the box turtle data at the Calvin EcoPreserve.\n\nSincerely,\nThe Turtle Tracker Team",
      attachments: [
        {
          content: attachment,
          filename: "turtle_data.csv",
          type: "application/csv",
          disposition: "attachment",
        },
      ],
    };
    await sgMail.send(msg);
    await fs.unlinkSync("./turtle_data.csv");
    response.status(status.OK).json(results.rows);
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

export default sendMail;
