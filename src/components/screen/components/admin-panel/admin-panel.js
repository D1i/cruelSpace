import {useState} from "react";
import {Button, TextField} from "@mui/material";

export function AdminPanel(props) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [mendel, setMendel] = useState('');
    const [atomicMass, setAtomicMass] = useState('');
    const [mass3m, setMass3m] = useState('');


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
                        <Button>Создать</Button>
                    </div>
                </div>
                <div>
                    <b>Список всех элеметов</b>
                    <div></div>
                </div>
            </div>
        </div>
    )
}