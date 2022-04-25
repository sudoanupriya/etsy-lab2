import React from 'react';
import { useDispatch } from 'react-redux';
import api from '../../config/config';
import { PrimaryButton, TextField, Stack } from '@fluentui/react';
import "./styles.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/actions';
const CONSTANTS = require("../../config/constants.json");

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [password, setPwd] = useState();
    const [emailID, setEmail] = useState();

    const LOGIN = () => {
        console.log(password, emailID);
        const data = { emailID, password };
        api.post(CONSTANTS.API.LOGIN, data).then(res => {
            if (res && res.data && res.status == 201) {
                const user = res.data.user;
                const token = res.data.token;
                dispatch(loginUser(user));
                localStorage.setItem("token", token);
                delete res.data.token;
                localStorage.setItem("user", JSON.stringify(user));

                console.log(CONSTANTS.PAGE.HOME);
                navigate(CONSTANTS.PAGE.HOME, { replace: true });
            }
        }, err => {
            console.log(err);
        });
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validatePassword = (pw) => {
        return /[a-z]/.test(pw) &&
            /[^A-Za-z0-9]/.test(pw) &&
            pw.length > 8;
    }

    const validPasswordInstructions = <ul>
        <li>Password must have atleast one lowercase letter</li>
        <li>Password must have at least one number letter</li>
        <li>Password should be more then 8 characters long</li></ul>

    return (
        <div>
            <Stack vertical tokens={{ childrenGap: 15 }} styles={{ root: { margin: "auto", width: "50%" } }}>

                <TextField
                    label="Email"
                    onGetErrorMessage={(val) => { return (val.length > 0) ? validateEmail(val) ? "" : "Enter Valid Email" : '' }}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    canRevealPassword
                    revealPasswordAriaLabel="Show password"
                    onGetErrorMessage={(val) => { return (val.length > 0) ? validatePassword(val) ? "" : validPasswordInstructions : '' }}
                    onChange={(e) => setPwd(e.target.value)}
                    required
                />
                <PrimaryButton text="Login" onClick={LOGIN} />
            </Stack>
        </div>
    );
}

export default Login;