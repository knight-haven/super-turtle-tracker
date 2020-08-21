require('dotenv').config();
const Pool = require('pg').Pool;
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PW,
  port: process.env.PG_PORT,
  max: process.env.PG_MAX,
  min: process.env.PG_MIN,
  idle: process.env.PG_IDLE,
});
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const getTurtles = (request, response) => {
  pool.query(
    `SELECT DISTINCT ON (turtle.id) turtle.id, turtle.mark, turtle.turtle_number AS number, turtle.sex, photo.name AS avatar
    FROM turtle, photo
    WHERE turtle.is_deleted = false AND photo.is_deleted = false AND turtle.id = photo.turtle_id
    ORDER BY id`,
    (error, results) => {
      if (error) {
        console.error(error);
      }
      response.status(200).json(results.rows);
    },
  );
};

const getTurtleById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    `SELECT *
    FROM turtle
    WHERE id = $1 AND is_deleted = false`,
    [id],
    (error, results) => {
      if (error) {
        console.error(error);
      }
      response.status(200).json(results.rows);
    },
  );
};

const createTurtle = (request, response) => {
  const { number, mark, sex } = request.body;

  pool.query(
    `INSERT INTO turtle (turtle_number, mark, sex)
    VALUES ($1, $2, $3)
    RETURNING id`,
    [number, mark, sex],
    (error, results) => {
      if (error) {
        console.error(error);
      }
      response.status(201).send(`${results.rows[0].id}`);
    },
  );
};

const updateTurtle = (request, response) => {
  const id = parseInt(request.params.id);
  const { number, mark, sex } = request.body;

  pool.query(
    `UPDATE turtle
    SET turtle_number = $1, mark = $2, sex = $3
    WHERE id = $4`,
    [number, mark, sex, id],
    (error, results) => {
      if (error) {
        console.error(error);
      }
      response.status(200).send(`Turtle modified with ID: ${id}`);
    },
  );
};

const deleteTurtle = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    `UPDATE turtle
    SET is_deleted = true
    WHERE id = $1`,
    [id],
    (error, results) => {
      if (error) {
        console.error(error);
      } else {
        pool.query(
          `UPDATE sighting
          SET is_deleted = true
          WHERE turtle_id = $1`,
          [id],
          (error, results) => {
            if (error) {
              console.error(error);
            } else {
              pool.query(
                `UPDATE photo
                SET is_deleted = true
                WHERE turtle_id = $1`,
                [id],
                (error, results) => {
                  if (error) {
                    console.error(error);
                  }
                  response.status(200).send(`Turtle deleted with ID: ${id}`);
                },
              );
            }
          },
        );
      }
    },
  );
};

const getSightings = (request, response) => {
  pool.query(
    `SELECT *
    FROM sighting
    WHERE is_deleted = false
    ORDER BY time_seen DESC`,
    (error, results) => {
      if (error) {
        console.error(error);
      }
      response.status(200).json(results.rows);
    },
  );
};

const getSightingById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    `SELECT *
    FROM sighting
    WHERE id = $1 AND is_deleted = false`,
    [id],
    (error, results) => {
      if (error) {
        console.error(error);
      }
      response.status(200).json(results.rows);
    },
  );
};

const createSighting = (request, response) => {
  const {
    turtleId,
    time,
    location,
    latitude,
    longitude,
    length,
    notes,
  } = request.body;

  pool.query(
    `INSERT INTO sighting (turtle_id, time_seen, turtle_location, latitude, longitude, carapace_length, notes)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id`,
    [turtleId, time, location, latitude, longitude, length, notes],
    (error, results) => {
      if (error) {
        console.error(error);
      }
      response.status(201).send(`${results.rows[0].id}`);
    },
  );
};

const updateSighting = (request, response) => {
  const id = parseInt(request.params.id);
  const {
    turtleId,
    time,
    location,
    latitude,
    longitude,
    length,
    notes,
  } = request.body;

  pool.query(
    `UPDATE sighting
    SET turtle_id = $1, time_seen = $2, turtle_location = $3, latitude = $4, longitude = $5, carapace_length = $6, notes = $7
    WHERE id = $8`,
    [turtleId, time, location, latitude, longitude, length, notes, id],
    (error, results) => {
      if (error) {
        console.error(error);
      }
      response.status(200).send(`Sighting modified with ID: ${id}`);
    },
  );
};

const deleteSighting = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    `UPDATE sighting
    SET is_deleted = true
    WHERE id = $1`,
    [id],
    (error, results) => {
      if (error) {
        console.error(error);
      } else {
        pool.query(
          `UPDATE photo
          SET is_deleted = true
          WHERE sighting_id = $1`,
          [id],
          (error, results) => {
            if (error) {
              console.error(error);
            }
            response.status(200).send(`Sighting deleted with ID: ${id}`);
          },
        );
      }
    },
  );
};

const getSightingByTurtleId = (request, response) => {
  const turtleId = parseInt(request.params.turtleId);

  pool.query(
    `SELECT *
    FROM turtle, sighting
    WHERE turtle.id = turtle_id AND turtle_id = $1 AND turtle.is_deleted = false AND sighting.is_deleted = false
    ORDER BY time_seen DESC`,
    [turtleId],
    (error, results) => {
      if (error) {
        console.error(error);
      }
      response.status(200).json(results.rows);
    },
  );
};

const getRecentSightings = (request, response) => {
  pool.query(
    `SELECT DISTINCT ON (turtle_id) turtle_id, time_seen, latitude, longitude
    FROM sighting
    ORDER BY turtle_id, time_seen DESC`,
    (error, results) => {
      if (error) {
        console.error(error);
      }
      response.status(200).json(results.rows);
    },
  );
};

const getPhotos = (request, response) => {
  pool.query(
    `SELECT *
    FROM photo
    WHERE is_deleted = false`,
    (error, results) => {
      if (error) {
        console.error(error);
      }
      response.status(200).json(results.rows);
    },
  );
};

const getPhotoById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    `SELECT *
    FROM photo
    WHERE id = $1 AND is_deleted = false`,
    [id],
    (error, results) => {
      if (error) {
        console.error(error);
      }
      response.status(200).json(results.rows);
    },
  );
};

const createPhoto = (request, response) => {
  const { turtleId, sightingId, name } = request.body;

  pool.query(
    `INSERT INTO photo (turtle_id, sighting_id, name)
    VALUES ($1, $2, $3)
    RETURNING id`,
    [turtleId, sightingId, name],
    (error, results) => {
      if (error) {
        console.error(error);
      }
      response.status(201).send(`${results.rows[0].id}`);
    },
  );
};

const updatePhoto = (request, response) => {
  const id = parseInt(request.params.id);
  const { turtleId, sightingId, name } = request.body;

  pool.query(
    `UPDATE photo
    SET turtle_id = $1, sighting_id = $2, name = $3
    WHERE id = $4`,
    [turtleId, sightingId, name, id],
    (error, results) => {
      if (error) {
        console.error(error);
      }
      response.status(200).send(`Photo modified with ID: ${id}`);
    },
  );
};

const deletePhoto = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    `UPDATE photo
    SET is_deleted = true
    WHERE id = $1`,
    [id],
    (error, results) => {
      if (error) {
        console.error(error);
      }
      response.status(200).send(`Photo deleted with ID: ${id}`);
    },
  );
};

const getPhotoByTurtleId = (request, response) => {
  const turtleId = parseInt(request.params.turtleId);

  pool.query(
    `SELECT photo.name
    FROM turtle, photo
    WHERE turtle.id = turtle_id AND turtle_id = $1 AND turtle.is_deleted = false AND photo.is_deleted = false`,
    [turtleId],
    (error, results) => {
      if (error) {
        console.error(error);
      }
      response.status(200).json(results.rows);
    },
  );
};

const getPhotoBySightingId = (request, response) => {
  const sightingId = parseInt(request.params.sightingId);

  pool.query(
    `SELECT photo.id, photo.name
    FROM sighting, photo
    WHERE sighting.id = sighting_id AND sighting_id = $1 AND sighting.is_deleted = false AND photo.is_deleted = false`,
    [sightingId],
    (error, results) => {
      if (error) {
        console.error(error);
      }
      response.status(200).json(results.rows);
    },
  );
};

const sendEmail = (request, response) => {
  const emailAddress = request.params.address;

  pool.query(
    `SELECT turtle_number, mark, sex, time_seen, turtle_location, latitude, longitude, carapace_length, notes
    FROM turtle, sighting
    WHERE turtle.id = sighting.turtle_id AND turtle.is_deleted = false AND sighting.is_deleted = false
    ORDER BY turtle_number`,
    async (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }

      // https://stackabuse.com/reading-and-writing-csv-files-with-node-js/
      const csvWriter = createCsvWriter({
        path: 'turtle_data.csv',
        header: [
          { id: 'turtle_number', title: 'Turtle Number' },
          { id: 'mark', title: 'Mark' },
          { id: 'sex', title: 'Sex' },
          { id: 'time_seen', title: 'Date' },
          { id: 'turtle_location', title: 'Location' },
          { id: 'latitude', title: 'Latitude' },
          { id: 'longitude', title: 'longitude' },
          { id: 'carapace_length', title: 'Carapace Length (mm)' },
          { id: 'notes', title: 'Notes' },
        ],
      });
      await csvWriter
        .writeRecords(results.rows)
        .then(() => console.log('The CSV file was written successfully'));

      // https://www.twilio.com/blog/sending-email-attachments-with-sendgrid
      pathToAttachment = `${__dirname}/turtle_data.csv`;
      attachment = fs.readFileSync(pathToAttachment).toString('base64');

      const msg = {
        to: emailAddress,
        from: 'turtletrackerbackend@gmail.com',
        subject: 'Calvin EcoPreserve Turtle Data',
        text:
          'Dear Turtle Tracker User,\n\nAttached is a csv file with the all the box turtle data at the Calvin EcoPreserve.\n\nSincerely,\nThe Turtle Tracker Team',
        attachments: [
          {
            content: attachment,
            filename: 'turtle_data.csv',
            type: 'application/csv',
            disposition: 'attachment',
          },
        ],
      };
      sgMail.send(msg).catch((error) => {
        console.error(error);
      });
      try {
        fs.unlinkSync('./turtle_data.csv');
      } catch (error) {
        console.error(error);
      }
      response.status(200).json(results.rows);
    },
  );
};

module.exports = {
  getTurtles,
  getTurtleById,
  createTurtle,
  updateTurtle,
  deleteTurtle,
  getSightings,
  getSightingById,
  createSighting,
  updateSighting,
  deleteSighting,
  getSightingByTurtleId,
  getRecentSightings,
  getPhotos,
  getPhotoById,
  createPhoto,
  updatePhoto,
  deletePhoto,
  getPhotoByTurtleId,
  getPhotoBySightingId,
  sendEmail,
};
