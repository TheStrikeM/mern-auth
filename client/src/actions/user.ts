import axios from "axios";
import {setLoading} from "../reducers/loadReducer";
import {setUser} from "../reducers/userReducer";

interface IDefaultProps {
    username: string,
    password: string
}

interface IRegisterProps extends IDefaultProps {
    email: string
}

export const registerUser = async (
    {username, email, password}: IRegisterProps
): Promise<void> => {
    try {
        const response = axios.post("http://127.0.0.1:5000/reg", {
            username,
            email,
            password
        }).then(({data}) => {
            console.log("Вы успешно зарегистрировались!")
            alert(data.message)
        }).catch((reason => {
            console.log(`Ошибка во время запроса регистрации - ${reason}`)
        }))
    } catch (e) {
        console.log('Error:', e)
    }
}

export const loginUser = async (
    {username, password}: IDefaultProps,
    dispatch: any
): Promise<void> => {
    try {
        const response = axios.post("http://127.0.0.1:5000/login", {
            username,
            password
        }).then(({data}) => {
            dispatch(setUser(data.user))
            console.log("Вы успешно зашли\nДанные по вам")
            console.log(data)
            localStorage.setItem('token', data.token)
        }).catch((reason => {
            console.log(`Ошибка во время запроса логин - ${reason}`)
        }))
    } catch (e) {
        console.log('Error:', e)
    }
}