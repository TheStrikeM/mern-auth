import React from 'react'
import './app.sass'
import 'antd/dist/antd.css'
import {useSelector} from "react-redux";
import Navbar from "./components/navbar";
import {Redirect, Route, Switch} from "react-router-dom";
import FormRegOrLog from "./components/form";

function App() {
    const {isAuth} = useSelector((state: any) => ({
        isAuth: state.user.isAuth
    }))


    return (
        <div className="App">
            <Navbar />
            {isAuth ?
                (
                    <Switch>
                        <Route path={"/profile"} exact>
                            Tvoy profile clown
                        </Route>

                        <Redirect to={"/profile"} />
                    </Switch>
                )
                :
                (
                    <Switch>
                        <Route path={"/login"} exact>
                            <FormRegOrLog type={"login"} />
                        </Route>

                        <Route path={"/register"} exact>
                            <FormRegOrLog type={"registration"} />
                        </Route>

                        <Redirect to={"/login"} />
                    </Switch>
                )
            }
        </div>
    );
}

export default App;
