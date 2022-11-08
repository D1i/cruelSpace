import {useState} from "react";
import axios from "axios";
import {Button, Input, TextField} from "@mui/material";
import Particles from "react-tsparticles";

import s from './style.module.css';

const infoAboutFraction = {
    mileli: (
        <div>
            <h3>Mileli</h3>
            <div>
                <b>Mileli'Deos</b> Предоставляет вам исключительное право
                на возможность симуляции измерения от лица ЦТО mileli'Sokiri.
                Вам будут предоставленны уникальные портальные и кибернитические
                технологии
            </div>
        </div>
    ),
}

function SelectFraction(props) {
    const [fraction, setFraction] = useState('');
    props.onSelect(fraction);

    return (
        <div className={s.selectFraction}>
            <div>
                <div onClick={() => setFraction('mileli')}>
                    <img width="100" height="100" src={require('./img/mileliLogo.jpg')}/>
                </div>
            </div>
            <div>
                {infoAboutFraction[fraction]}
            </div>
        </div>
    )
}

export function Register(props) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [fraction, setFraction] = useState('');

    const [prePassword, setPrePassword] = useState('');
    const [prePasswordAccept, setPrePasswordAccept] = useState('');

    const [nextPage, setNextPage] = useState(false);

    function switchNextPage() {
        const isSame = prePassword === prePasswordAccept;
        setNextPage(isSame);
        if (isSame) {
            setPassword(prePassword);
        } else {
            alert('Пароли не совпадают');
        }
    }

    function registerSend() {
        try {
            axios.post('http://localhost:9990/register', {
                login,
                password,
                name,
                fraction
            }).then(p => {
                localStorage.setItem('token', p.data.token);
            })
        } catch (error) {
        }
    }

    if (nextPage) {
        return (
            <div className={s.container}>
                <div className={s.header}>Добро пожаловать в неотвратимый и безжалостный космос</div>
                <div className={s.labelContainer}>
                    <TextField value={name} onChange={(event) => setName(event.target.value)} variant="filled"
                               placeholder='Имя'/>
                    <SelectFraction onSelect={setFraction}/>
                    <Button onClick={registerSend} variant="contained">Зарегестрироваться</Button>
                </div>
            </div>
        )
    } else {
        return (
            <div className={s.container}>
                <div className={s.header}>Добро пожаловать в неотвратимый и безжалостный космос</div>
                <div className={s.labelContainer}>
                    <TextField onChange={(event) => setLogin(event.target.value)} variant="filled" placeholder='Логин'/>
                    <TextField onChange={(event) => setPrePassword(event.target.value)} variant="filled"
                               placeholder='Пароль' type='password'/>
                    <TextField onChange={(event) => setPrePasswordAccept(event.target.value)} variant="filled"
                               placeholder='Подтвердите пароль' type='password'/>
                    <Button onClick={switchNextPage} variant="contained">Дальше ></Button>
                </div>
            </div>
        )
    }
}