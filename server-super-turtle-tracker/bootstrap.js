const fs = require('fs');

console.log(process.env.FIREBASE_CREDS)
fs.writeFileSync('firebase_creds.json', process.env.FIREBASE_CREDS);
