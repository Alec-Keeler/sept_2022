// configure environment - DO NOT MODIFY
require('dotenv').config();

// Import package

// Your code here

// Define variables - DO NOT MODIFY
let token;
let payload;

// 1. Sign (create) a JWT containing your email address

// Your code here

// See the JWT in the console
console.log('JWT:', token);

// 2. Decode a JWT Payload

// Your code here

// See the decoded payload in the console
console.log('Payload:', payload);

// 3. Verify a JWT

// Your code here

// See the verified payload in the console
console.log('Verified Payload:', payload);

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