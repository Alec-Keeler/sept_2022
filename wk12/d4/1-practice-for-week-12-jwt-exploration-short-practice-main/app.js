// configure environment - DO NOT MODIFY
require('dotenv').config();

// Import package
const jwt = require('jsonwebtoken');
// Your code here

// Define variables - DO NOT MODIFY
let token;
let payload;

// 1. Sign (create) a JWT containing your email address
token = jwt.sign({
    email: 'alec@google.io',
    username: 'alec'
}, 
process.env.SECRET_KEY,)
// Your code here

// See the JWT in the console
console.log('JWT:', token);

// 2. Decode a JWT Payload

// Your code here
payload = jwt.decode(token)
// See the decoded payload in the console
console.log('Payload:', payload);

// 3. Verify a JWT

// Your code here
let isSecure = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZWNAZ29vZ2xlLmlvIiwidXNlcm5hbWUiOiJhbGVjIiwiaWF0IjoxNjcxMTI3MjgxfQ.xh7ucIaioRNAnVqONkOixjThF-aFe4jFlVBpU8352Rk', process.env.SECRET_KEY)
// See the verified payload in the console
console.log('Verified Payload:', isSecure);

// (Optional) Bonus: Catch Error With Invalid Signature
// Generate an alternate secret key and use it
//    To "try" to get the payload using jwt.verify
//    Then "catch" the error and log it to the console.

// Your code here

// (Optional) Bonus: Catch Error With Expired Token
// First, set the token's expiration (above) to 1 second
// Second, add a setTimeout longer than 1 second
//    To "try" to get the payload using jwt.verify (with proper secret)
//    Then "catch" the error and log it to the console

// Your code here