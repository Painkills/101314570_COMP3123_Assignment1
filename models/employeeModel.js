const mongoose = require('mongoose')
const options = ["male", "female", "other"]


// {
//     "first_name": "Dan",
//     "last_name": "Books",
//     "email": "dan@books",
//     "gender": "male",
//     "salary": 10
// }
const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        maxLength: 100,
        required: [true, "First name is required"]
    },
    last_name: {
        type: String,
        maxLength: 50,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        maxLength: 50,
        unique: true
    },
    gender: {
        type: String,
        maxLength: 25,
        lowercase: true,
        validate(value) {
            if (!options.includes(value)) throw new Error("Gender should be set to male, female, or other.")
        }
    },
    salary: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) throw new Error("Salary cannot be negative")
        }
    },
})

module.exports = mongoose.model("employee", employeeSchema)