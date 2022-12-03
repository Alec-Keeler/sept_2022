-- Find the first owner that has a last name containing the lowercase letter "r"
--!!START
SELECT *
FROM owners
WHERE
  owners.last_name LIKE '%r%'
LIMIT 1;
--!!END

-- Find the name and birth year of all the cats ordered by descending birth year
--!!START
SELECT name, birth_year
FROM cats
ORDER BY birth_year DESC;
--!!END

-- Find the name of the cats who have an owner whose first name begins with an "H"
--!!START
SELECT name
FROM cats
JOIN cat_owners
  ON (cat_owners.cat_id = cats.id)
JOIN owners
  ON (cat_owners.owner_id = owners.id)
WHERE
  owners.first_name LIKE 'H%';
--!!END

-- Find the first and last names of the owner whose cats are born after the year 2015
--!!START
SELECT owners.first_name, owners.last_name
FROM cats
JOIN cat_owners
  ON (cat_owners.cat_id = cats.id)
JOIN owners
  ON (cat_owners.owner_id = owners.id)
WHERE
  cats.birth_year > 2015;
--!!END

-- Find names of the cats whose owners are both George Beatty and Melynda Abshire
--!!START
SELECT DISTINCT cats.name
FROM cats
JOIN cat_owners ON (cats.id = cat_owners.cat_id)
JOIN owners ON (owners.id = cat_owners.owner_id)
WHERE
  (owners.first_name = 'George' AND owners.last_name = 'Beatty') OR (owners.first_name = 'Melynda' AND owners.last_name = 'Abshire');
--!!END
