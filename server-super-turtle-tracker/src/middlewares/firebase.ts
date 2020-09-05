import { v4 as uuid } from "uuid";
import admin = require("firebase-admin");
import serviceAccount = require("../../firebase_creds.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
});
const bucket = admin.storage().bucket();

const metadata = {
  metadata: {
    firebaseStorageDownloadTokens: uuid(),
  },
  contentType: "image/jpeg",
};

const saveImage = async (image: string, fileName: string): Promise<string> => {
  const imageBuffer = Buffer.from(image, "base64");
  const file = bucket.file(`images/${fileName}`);
  await file.save(imageBuffer, metadata);
  const url = (
    await file.getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    })
  )[0];
  return url;
};

export default saveImage;
