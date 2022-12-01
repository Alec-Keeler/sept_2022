-- Step 1
UPDATE friends
SET first_name = 'Ryder'
WHERE id = 1;
-- or firstnam/lastname

-- Step 2
UPDATE friends
SET last_name = 'Blue'
WHERE first_name = 'Sky'
  AND last_name = 'Tyler';
