import {useEffect, useState} from "react";
import axios from "axios";

import s from './style.module.css';

import {Profile, Register} from "./components";
import {Button, TextField} from "@mui/material";

export function Screen(props) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState(null);

    function loginSend() {
        try {
            axios.post('http://localhost:9990/auth', {
                login,
                password
            }).then(p => {
                localStorage.setItem('token', p.data.token)
                setLogin('');
                setPassword('');
            })
        } catch (error) {
        }
    }

    if (localStorage.getItem('token')) {
        return (
            <Profile/>
        )
    } else {
        if (!mode) {
            return (
                <div>
                    <Button onClick={() => setMode('login')}>Вход</Button>
                    <Button onClick={() => setMode('register')}>Регистрация</Button>
                </div>
            )
        }
        if (mode === 'register') {
            return (
                <div>
                    <Register/>
                </div>
            )
        } else {
            return (
                <div>
                    <TextField onChange={(event) => setLogin(event.target.value)} placeholder='Логин'/>
                    <TextField onChange={(event) => setPassword(event.target.value)} placeholder='Пароль'/>
                    <Button onClick={loginSend}>Войти</Button>
                </div>
            )
        }
    }
}