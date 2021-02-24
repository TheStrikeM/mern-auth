const {Schema,  model, ObjectId} = require("mongoose")

const User = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, },
    status: {type: String, default: "Нет статуса"}
})

module.exports = model("User", User)