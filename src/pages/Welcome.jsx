import React, { useContext, useState } from 'react'
import logo from "../assets/logo.jpg"
import { Button, TextField, Snackbar } from '@mui/material'
import theme from "../theme/theme"
import { userContext } from "../context/User.context"
import { Link } from 'react-router-dom'
import questions from "../mock/questions.json"
export default function Welcome() {
    const { setUser, user } = useContext(userContext)
    const [view, setView] = useState(0)
    const [name, setName] = useState("")
    const [error, setError] = useState({ activate: false, message: true })

    const saveNameAndContinue = () => {
        if (name.length == 0) setError({ message: "El nombre está vacío", activate: true })
        else {
            setUser(name)
            setName("")
            setView(1)
        }
    }

    return <>
        <Snackbar
            open={error.activate}
            autoHideDuration={6000}
            onClose={() => setError({ activate: false, message: "" })}
            message={error.message}
        />
        <div className='flex flex-col justify-center items-center'>
            <img src={logo} width={120} />
            <h2 className='text-xl font-bold'>Análisis de estilo de vida</h2>
            <p className='text-center'>Bienvenido al test de analisis de estilo de vida de Yerba Santa</p>
        </div>
        {view == 0 && <div className='flex flex-col justify-center items-center' style={{ width: '100vw' }}>
            <div className='mt-[20%] flex flex-col items-center' style={{ width: '100%' }}>
                <h3 className='text-lg font-bold'>Ingrese su nombre</h3>
                <TextField onChange={e => setName(e.target.value)} style={{ width: '75%' }} label="Nombre completo" />
                <Button onClick={() => saveNameAndContinue()} variant='contained' style={{ marginTop: '15px', backgroundColor: theme.colors.primary }}>Continuar</Button>
            </div>
        </div>}
        {view == 1 && <div className='flex flex-col justify-center items-center mt-20' style={{ width: '100vw' }}>
            <p className='text-center'>Hola <b>{user.slice(0, user.indexOf(" ")+1)}</b>, en este test se le realizarán {questions.length} preguntas, lea todos los puntos con cuidado y marque si tiene o no el padecimiento </p>
            <Button variant='contained' style={{ marginTop: '15px', backgroundColor: theme.colors.primary }}><Link to={'/test'}>Continuar</Link></Button>
        </div>}
    </>
}
