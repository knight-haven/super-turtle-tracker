export const getTurtles = `
  SELECT DISTINCT ON (turtle.id) turtle.id, turtle.mark, turtle.turtle_number AS number, turtle.sex,
  CASE WHEN NOT photo.is_deleted THEN photo.url END AS url
  FROM turtle
    FULL JOIN photo
    ON turtle.id = photo.turtle_id, sighting
  WHERE turtle.is_deleted = false
    AND (turtle.id = sighting.turtle_id
    AND sighting.id = photo.sighting_id
    OR photo.is_deleted is null)
  ORDER BY turtle.id, sighting.time_seen DESC, photo.id
`;

export const getTurtleById = `
  SELECT *
  FROM turtle
  WHERE id = $1 AND is_deleted = false
`;

export const createTurtle = `
  INSERT INTO turtle (turtle_number, mark, sex)
  VALUES ($1, $2, $3)
  RETURNING id
`;

export const updateTurtle = `
  UPDATE turtle
  SET turtle_number = $1, mark = $2, sex = $3
  WHERE id = $4
`;

export const deleteTurtle = `
  UPDATE turtle
  SET is_deleted = true
  WHERE id = $1
`;

export const getAllData = `
  SELECT turtle_number, mark, sex, time_seen, turtle_location, latitude, longitude, carapace_length, notes
  FROM turtle, sighting
  WHERE turtle.id = sighting.turtle_id
    AND turtle.is_deleted = false
    AND sighting.is_deleted = false
  ORDER BY turtle_number
`;
