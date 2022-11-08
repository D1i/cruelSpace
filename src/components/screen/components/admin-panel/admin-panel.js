import {useEffect, useState} from "react";
import {Button, TextField} from "@mui/material";
import axios from "axios";

export function AdminPanel(props) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [mendel, setMendel] = useState('');
    const [atomicMass, setAtomicMass] = useState('');
    const [mass3m, setMass3m] = useState('');

    const [elements, setElements] = useState([]);


    function addElement() {
        axios.post('http://localhost:9990/elements/add', {
            token: localStorage.getItem('token'),
            elem: {id, name, mendel, atomicMass, mass3m}
        }).then(p => {
            setElements(p.data.map(element =>
                <div>{`id: ${element.id}, name: ${element.name}, mendel: ${element.mendel}, atomicMass: ${element.atomicMass}, mass3m: ${element.mass3m}`}</div>))
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            axios.post('http://localhost:9990/elements/get', {token: localStorage.getItem('token'),}).then(p => {
                setElements(p.data.map(element =>
                    <div>{`id: ${element.id}, name: ${element.name}, mendel: ${element.mendel}, atomicMass: ${element.atomicMass}, mass3m: ${element.mass3m}`}</div>
                ));
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h3>Панель администратора</h3>
            <div>
                <div>
                    <b>Добавить предмет в глобальный список</b>
                    <div>
                        <div>id: <TextField onChange={(event) => {
                            setId(event.target.value)
                        }}/></div>
                        <div>Название: <TextField onChange={(event) => {
                            setName(event.target.value)
                        }}/></div>
                        <div>Сокращение в таблице менделеева: <TextField onChange={(event) => {
                            setMendel(event.target.value)
                        }}/></div>
                        <div>Атомная масса: <TextField onChange={(event) => {
                            setAtomicMass(event.target.value)
                        }}/></div>
                        <div>Масса одного куба вещества: <TextField onChange={(event) => {
                            setMass3m(event.target.value)
                        }}/></div>
                        <Button onClick={addElement}>Создать</Button>
                    </div>
                </div>
                <div>
                    <b>Список всех элеметов</b>
                    <div>{elements}</div>
                </div>
            </div>
        </div>
    )
}