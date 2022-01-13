import {createContext, useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "../utils/use-form";
import {API} from "../utils/constants"


export const anonymousUserInfo = {
    id: null,
    name: 'Anonymous',
    password: '',
    isAdmin: false
}
export const UserInfo = createContext(anonymousUserInfo);

export function Login({onLogin, onLogout}) {
    let navigate = useNavigate();
    const currenUserInfo = useContext(UserInfo);
    const [formValues, formProps] = useForm({
        username: "",
        password: ""
    })

    const [loginError, setLoginError] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        setLoginError(null);
        fetch('http://localhost:3001/users')
            .then((r) => r.json())
            .then((userList) => {
                const foundUser = userList.find((user) => {
                    return user.username === formValues.username && user.password === formValues.password
                })
                if (!foundUser) {
                    setLoginError('Invalid username or password')
                    e.target.reset();
                } else {
                    if (typeof onLogin === "function") {
                        onLogin(foundUser);
                    }
                }
            })
    }

    if (currenUserInfo.id) {
        return (
            <div>

                {/*Dirty. Fix reset and use link to*/}
                <a href="/">
                    <button onClick={onLogout}> Hello: {currenUserInfo.name} Logout</button>
                </a>
            </div>
        )
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <input type="text" {...formProps.username} />
            <input type="password" {...formProps.password} />
            <button type={'submit'}>Login</button>
            {loginError && (
                <div>{loginError}</div>
            )}
        </form>
    )
}
