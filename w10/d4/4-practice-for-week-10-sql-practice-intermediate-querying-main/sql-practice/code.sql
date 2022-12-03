-- Q1
SELECT * FROM albums
WHERE num_sold > 99999;

-- Q2
SELECT * FROM albums
WHERE year >= 2018 AND year <=2020;
-- WHERE year BETWEEN 2018 AND 2020;

-- Q3
SELECT * FROM albums
WHERE band_id IN (1, 3, 4);

-- IQ1
SELECT * FROM albums WHERE title LIKE 'the%';

-- IQ2
SELECT * FROM albums
-- WHERE band_id = 1
ORDER BY num_sold DESC
LIMIT 2;

-- IQ3
SELECT * FROM albums
  ORDER BY num_sold DESC
  LIMIT 2 OFFSET 2;
    

-- Aggregates
SELECT AVG(num_sold) FROM albums;
SELECT COUNT(*) FROM albums;
SELECT SUM(num_sold) FROM albums;