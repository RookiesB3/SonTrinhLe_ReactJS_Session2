import React, { useEffect, useState } from 'react';
import axios from 'axios';

const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Login = ({ account, wrapper }) => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState({
        email: "",
        password: ""
    });
    const [isTouched, setIsTouched] = useState({
        email: false,
        password: false
    });
    const [isLoginIn, setIsLoginIn] = useState(false);
    const [token, setToken] = useState({
        token: "",
        userId: ""
    })

    useEffect(() => {
        if(isLoginIn){
            wrapper(token);
            setIsLoginIn(false)
        }
    }, [wrapper, token])

    const handleChange = (e) => {
        setIsTouched({
            ...isTouched,
            [e.target.name]: true
        });
        checkValid(e)
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const getToken = () => {
        axios.get("https://60dff0ba6b689e001788c858.mockapi.io/tokens").then(result => {
            setToken({
                token: result.data.token,
                userId: result.data.userId
              });
            axios.defaults.headers.common['Authorization'] = result.data.token;
        }).catch(err => {
            console.log(err);
        });
    }

    const checkValid = (e) => {
        if (e.target.name === "email") {
            if (!re.test(e.target.value)) {
                setError({
                    ...error,
                    email: "Invalid Email"
                })
            }
            if (re.test(e.target.value)) {
                setError({
                    ...error,
                    email: ""
                })
            }
            if (e.target.value === "") {
                setError({
                    ...error,
                    email: "Required"
                })
            }
        }
        else if (e.target.name === "password") {
            if (e.target.value.length < 8) {
                setError({
                    ...error,
                    password: "Password need to be atleast 8 charaters long"
                })
            }
            if (e.target.value.length >= 8) {
                setError({
                    ...error,
                    password: ""
                })
            }
            if (e.target.value === "") {
                setError({
                    ...error,
                    password: "Required"
                })
            }
        }
    }

    const handleClick = () => {
        getToken();
        setIsLoginIn(true);
    }

    const checkDisabled = () => {
        if (isTouched === false) {
            return true;
        }
        if (error.email === ""
            && error.password === ""
            && isTouched.email
            && isTouched.password) {
            return false;
        }
        return true;
    }


    return (
        <div>
            <div className="d-flex justify-content-center" style={{margin: "5em"}}>

                <form action="#" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email"
                            name="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter email"
                            onChange={handleChange} />
                        {error.email !== "" &&
                            <small style={{ color: "#ff706b" }}>{error.email}</small>
                        }
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password"
                            name="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            onChange={handleChange} />
                        {error.password !== "" &&
                            <small style={{ color: "#ff706b" }}>{error.password}</small>
                        }
                    </div>

                    <button type="submit"
                        className="btn btn-primary"
                        style={{ marginTop: "10px" }}
                        onClick={handleClick}
                        disabled={checkDisabled()}>Submit</button>
                </form>
            </div>
            <div>
                <div className="d-flex justify-content-center" 
                    style={{marginTop: "10px", color: "#ff5c5c"}}>
                    {account.token !== "" && <h4>Is Login</h4>}
                </div>
            </div>
        </div>
    )
}

export default Login;