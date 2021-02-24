import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import './navbar.sass'
import {logoutUser} from "../../reducers/userReducer";
import { Link } from 'react-router-dom';

const Navbar = () => {

    const {isAuth} = useSelector((state: any) => ({
        isAuth: state.user.isAuth
    }))
    const dispatch = useDispatch()

    return (
        <div className="navbar">
            <div className="navbar__logo">
                <div className="navbar__logo__text">
                    <h1>StrikeAuth</h1>
                    <p>Super mega auth</p>
                </div>
            </div>

            <div className="navbar__buttons">
                {!isAuth && <Link to={"/login"} className="login">Log in</Link>}
                {!isAuth && <Link to={"/register"} className="register">Register</Link>}
                {isAuth && <div onClick={() => dispatch(logoutUser())} className="register">Logout</div>}
            </div>
        </div>
    );
};

export default Navbar;