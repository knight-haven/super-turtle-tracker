export const getSightings = `
  SELECT *
  FROM sighting
  WHERE is_deleted = false
  ORDER BY time_seen DESC
`;

export const getSightingById = `
  SELECT *
  FROM sighting
  WHERE id = $1 AND is_deleted = false
`;

export const createSighting = `
  INSERT INTO sighting (turtle_id, time_seen, turtle_location, latitude, longitude, carapace_length, notes)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING id
`;

export const updateSighting = `
  UPDATE sighting
  SET turtle_id = $1, time_seen = $2, turtle_location = $3, latitude = $4, longitude = $5, carapace_length = $6, notes = $7
  WHERE id = $8
`;

export const deleteSighting = `
  UPDATE sighting
  SET is_deleted = true
  WHERE id = $1
`;

export const deleteSightingByTurtleId = `
  UPDATE sighting
  SET is_deleted = true
  WHERE turtle_id = $1
`;

export const getSightingByTurtleId = `
  SELECT *
  FROM turtle, sighting
  WHERE turtle.id = turtle_id
    AND turtle_id = $1
    AND turtle.is_deleted = false
    AND sighting.is_deleted = false
  ORDER BY time_seen DESC
`;

export const getRecentSightings = `
  SELECT DISTINCT ON (turtle_id) turtle_id, time_seen, latitude, longitude
  FROM sighting
  ORDER BY turtle_id, time_seen DESC
`;
