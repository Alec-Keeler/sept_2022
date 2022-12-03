SELECT bands.name, bands.id, albums.band_id, albums.title AS albumTitle FROM albums
JOIN bands ON (bands.id = band_id);


-- Q2
SELECT bands.name, bands.id, albums.band_id, albums.title, num_sold FROM albums
JOIN bands ON (bands.id = band_id)
WHERE num_sold < 20000; 