const fs = require('fs');

fs.writeFileSync('firebase_creds.json', process.env.PG_HOST);
