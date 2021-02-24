const Router = require("express")
const {check, validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")

const User = require("../models/User")
const authMiddleware = require("../middlewares/auth.middleware")

const router = new Router()


// Registration post
router.post(
    '/reg',
    [
        check("username", "Логин должен быть не меньше, чем 3 символа и не больше 10").isLength({min: 3, max: 20}),
        check("email", "Неверная электронная почта").isEmail(),
        check("password", "Пароль должен быть не меньше 3 символов и не больше 20").isLength({min: 3, max: 20})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка в запросе", errors})
            }

            const {username, email, password} = req.body

            const isRequiredUsername = await User.findOne({username})
            if (isRequiredUsername) {
                return res.status(400).json({message: "Логин уже занят"})
            }

            const isRequiredEmail = await User.findOne({email})
            if (isRequiredEmail) {
                return res.status(400).json({message: "Электронная почта уже занята"})
            }

            const hashPassword = await bcrypt.hash(password, 4)

            const newUser = await new User({username, email, password: hashPassword})
            await newUser.save()

            return res.json({
                message: "Пользователь успешно создан!",
                user: {
                    username,
                    email,
                    password: hashPassword
                }
            })
        } catch (e) {
            throw new Error(`Error in reg router - ${e}`)
        }
    }
)

router.post(
    '/login',
    async (req, res) => {
        try {
            const {username, password} = req.body

            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: "Неверный логин"})
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password)
            if (!isPasswordValid) {
                return res.status(400).json({message: "Неверный пароль"})
            }

            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
            return res.json({
                message: "Токен получен",
                token,
                user: {
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    status: user.status
                }
            })

        } catch (e) {
            throw new Error(`Error in login router - ${e}`)
        }
    }
)

router.post(
    '/auth',
    authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: '1h'})
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            throw new Error(`Error in auth router - ${e}`)
        }
    }
)


module.exports = router