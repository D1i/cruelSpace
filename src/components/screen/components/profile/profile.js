import {useEffect, useState} from "react";
import {TextField} from "@mui/material";

import s from "./style.module.scss";
import axios from "axios";
import {AdminPanel} from "../admin-panel";

export function Profile(props) {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [online, setOnline] = useState('Загрузка');
    const [openInvetoryName, setOpenInvetoryName] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            axios.post('http://localhost:9990/online').then(p => {
                setOnline(p.data.online);
            });
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        try {
            axios.post('http://localhost:9990/isAdmin', {
                token: localStorage.getItem('token')
            }).then(p => {
                setIsAdmin(p.data.isAdmin);
                console.log(isAdmin)
            })
            axios.post('http://localhost:9990/user/get', {
                token: localStorage.getItem('token')
            }).then(p => {
                setUser(p.data);
                console.log(user)
            })
        } catch (event) {

        }
    }, [])

    if (!user) {
        return (
            <div>
                Загрузка
            </div>
        )
    }

    return (
        <div>
            <div className={s.playerContainer}>
                <div>
                    <div>
                        <h1>ИМЯ: {user.name}</h1>
                        <h2>ФРАКЦИЯ: {user.fraction}</h2>
                        <div>ИНВЕНТАРИ: {user.inventory && Object.keys(user.inventory)}</div>
                        <div>Открыть инвентарь:
                            <TextField
                                value={openInvetoryName}
                                onChange={(event) => setOpenInvetoryName(event.target.value)}
                            />
                            <br/>
                            <i>{user.inventory && user.inventory[openInvetoryName] && Object.keys(user.inventory[openInvetoryName])}</i>
                        </div>
                        <AdminPanel />
                    </div>
                    <div>
                    </div>
                </div>
                <div className={s.screen}>
                    <div>Online: {online}</div>
                    <div>Version: 1.0.0</div>
                    {isAdmin && <div>АДМИН</div>}
                </div>
            </div>
        </div>
    )
}