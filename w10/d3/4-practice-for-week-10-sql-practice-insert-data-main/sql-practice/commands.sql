-- Step 2

INSERT INTO friends(first_name, last_name)
VALUES
('Amy', 'Pond');

-- Step 3

INSERT INTO friends (first_name, last_name)
VALUES
  ('Rose', 'Tyler'),
  ('Martha', 'Jones'),
  ('Donna', 'Noble'),
  ('River', 'Song');


-- Step 4
INSERT INTO friends (first_name, last_name)
VALUES ('Jenny', 'Who');

-- OR --

INSERT INTO friends (id, first_name, last_name)
VALUES (6, 'Jenny', 'Who');
--make sure nothing exists with the id you are trying to give Jenny
-- may need to change 6 to 7 etc..
