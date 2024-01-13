import React, { useContext, useEffect, useState } from 'react'
import logo from "../assets/logo.jpg"
import questions from '../mock/questions.json'
import { Button, Snackbar, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@mui/material'
import { userContext } from '../context/User.context'
import Algorithm from '../utils/Algorithm'

export default function Test() {
  const [error, setError] = useState({ activate: false, message: true })

  const { setArrayData, qArray, user } = useContext(userContext)
  const [results, setResults] = useState([])
  const [evaluation, setEv] = useState({})
  const [doingTest, setTestState] = useState(true)
  let sistemas = ["Digestivo", "Intestinal", "Circulatorio", "Nervioso", "Inmunológico", "Respiratorio", "Urinario", "Glandular", "Estructural"]
  let lf = ["Excelente","Excelente","Bueno","Bueno", "Regular","Regular","Bajo"]

  const handleChange = (e, question) => {
    const value = e.target.value
    if (value != "true") return
    setArrayData([...qArray, question.codes])
  }

  const EndTest = () => {
    let data = []
    qArray.map(arr => {
      arr.map(d => {
        data.push(d)
      })
    })
    setTestState(false)
    setResults(data)
    
  }

  useEffect(() => {
    setEv(Algorithm(results))
  }, [results])

  return (
    <>
      <Snackbar
        open={error.activate}
        autoHideDuration={6000}
        onClose={() => setError({ activate: false, message: "" })}
        message={error.message}
      />
      {doingTest && <div className='flex flex-col justify-center items-center'>
        <img src={logo} width={120} />
        <h2 className='text-xl font-bold'>Análisis de estilo de vida</h2>
        <FormControl>
          {questions.map(q => (
            <>
              <FormLabel style={{ marginTop: '2em' }}>{q.question}</FormLabel>
              <RadioGroup onChange={(e) => handleChange(e, q)}>
                <FormControlLabel value={"true"} control={<Radio />} label="Si ✅" />
                <FormControlLabel value={"false"} control={<Radio />} label="No ❌" />
              </RadioGroup>
            </>
          ))}
          <Button variant='contained' onClick={() => EndTest()}>Finalizar Test</Button>
        </FormControl>
      </div>}
      {!doingTest && <div className='flex flex-col justify-center items-center'>
      <img src={logo} width={120} />
        <h2 className='text-xl font-bold'>Resultados del Análisis</h2>
        <p className='text-center'>{user.slice(0, user.indexOf(" "))} recuerde que este test no determina ni diagnostica nada en su persona, solo es un analisis de su estilo de vida</p>

        <h2 className='mt-10 text-xl font-bold'>Resultados</h2>
        <p>La rúbrica es la siguiente:
          <ul>
            <li><b>Excelente: 0-1</b></li>
            <li><b>Bueno: 2-3</b></li>
            <li><b>Regular: 4-5</b></li>
            <li><b>Bajo: 6+</b></li>
          </ul>

          Y se evaluan en los distintos 9 sistemas del cuerpo
        </p>

        <div className='w-[90%] h-[120px] mt-5 bg-white flex flex-col items-center' style={{boxShadow: '3px 10px 43px 0px rgba(0,0,0,0.75)'}}>
          <h2 className='text-xl font-bold'>Resultados de {user}</h2>
          <h3>Promedio: {evaluation.promedio}</h3>
          <h3>Sistema mas afectado: {sistemas[evaluation.moda-1]}</h3>
          <h3>Estilo de vida: {evaluation.promedio > 6 ? "Bajo": lf[evaluation.promedio]} </h3>
        </div>
        <div className='mt-5'></div>
      </div>}
    </>
  )
}
