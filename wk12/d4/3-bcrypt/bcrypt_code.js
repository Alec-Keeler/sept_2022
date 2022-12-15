// We'll play around with a bit of bcryptjs code here :)
const bcrypt = require('bcryptjs');

const hashPass = async(password) => {
    const hash = await bcrypt.hash(password, 12)
    console.log(hash)
}

// hashPass('password')

// $2a$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW
// \__/\/ \____________________/\_____________________________/
// Alg Cost      Salt (22)                       Hash

const testPass = async(password, hash) => {
    const isPass = await bcrypt.compare(password, hash)
    console.log(isPass)
}

testPass('password', '$2a$12$ZUZ7G05nvb6l9F0ev26M..C4WWb3zRlrmBje8TGRVvCzQkqCRGwc.')