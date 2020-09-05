export const getPhotos = `
  SELECT id, name, url
  FROM photo
  WHERE is_deleted = false
`;

export const getPhotoById = `
  SELECT id, name, url
  FROM photo
  WHERE id = $1 AND is_deleted = false
`;

export const createPhoto = `
  INSERT INTO photo (turtle_id, sighting_id, name, url)
  VALUES ($1, $2, $3, $4)
  RETURNING id
`;

export const updatePhoto = `
  UPDATE photo
  SET turtle_id = $1, sighting_id = $2, name = $3
  WHERE id = $4
`;

export const deletePhoto = `
  UPDATE photo
  SET is_deleted = true
  WHERE id = $1
`;

export const deletePhotoByTurtleId = `
  UPDATE photo
  SET is_deleted = true
  WHERE turtle_id = $1
`;

export const deletePhotoBySightingId = `
  UPDATE photo
  SET is_deleted = true
  WHERE sighting_id = $1
`;

export const getPhotoByTurtleId = `
  SELECT id, name, url
  FROM photo
  WHERE turtle_id = $1 AND is_deleted = false
  ORDER BY id
`;

export const getPhotoBySightingId = `
  SELECT id, name, url
  FROM photo
  WHERE sighting_id = $1 AND is_deleted = false
  ORDER BY id
`;
