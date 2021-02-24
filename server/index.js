const express = require("express")
const config = require("config")
const mongoose = require("mongoose")
const corsMiddleware = require("./middlewares/cors.middleware")
const authRouter = require("./routes/auth.routes")


const app = express()
const PORT = config.get("serverPort") || 5000

app.use(express.json())
app.use(corsMiddleware)
app.use("/", authRouter)


const start = async () => {
    try {
        await mongoose.connect(config.get("dbConnect"))

        app.listen(PORT, () => {
            console.log(`
* - Server success started in port ${PORT}\n
* - Database connected with ${config.get("dbConnect")}
        `)
        })
    } catch (e) {
        console.log('Error in index.js server:', e)
    }
}


start()