import { useEffect, useState } from "react"

const palabraCorrecta = 'FIERRO'

export const PlaraxView = () => {
    const [state, setState] = useState({
        celdas: [
            '', '', '', '', '', '',
            '', '', '', '', '', '',
            '', '', '', '', '', '',
            '', '', '', '', '', '',
            '', '', '', '', '', '',
            '', '', '', '', '', '',
        ],
        aciertos: [
            '', '', '', '', '', '',
            '', '', '', '', '', '',
            '', '', '', '', '', '',
            '', '', '', '', '', '',
            '', '', '', '', '', '',
            '', '', '', '', '', '',
        ]
    })
    const { celdas, aciertos } = state

    // contar cuantas letras no son ''
    const nLetras = celdas.filter((char) => char !== '').length
    const palabraCompletada = nLetras % 6 === 0
    console.log(aciertos)

    // programar evento para escuchar el teclado
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            console.log(event.key)
            const letra = event.key.toUpperCase()
            const esLetra = /^[a-zA-ZñÑ]$/.test(letra);
            // si se preisonó una letra
            if (esLetra) {
                // buscar index cuyo char === ''
                const index = celdas.findIndex((char) => char === '')
                // actualizar celdas
                const nuevasCeldas = [...celdas]
                nuevasCeldas[index] = letra
                // actualizar el estado
                setState((prev)=>({
                    ...prev,
                    celdas: nuevasCeldas
                }))
            }
            // si se presionó borrar
            if (event.key === 'Backspace') {
                const index = celdas.findIndex((char) => char === '')
                if (index === 0) return
                const nuevasCeldas = [...celdas]
                nuevasCeldas[index - 1] = ''
                setState((prev)=>({
                    ...prev,
                    celdas: nuevasCeldas
                }))
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }

    }, [celdas.join('')])

    // para revisar una palabra completa
    useEffect(() => {
        if (palabraCompletada) {
            const nuevosAciertos = [...aciertos]

            const pcArray = palabraCorrecta.split('')
            const letras = celdas.filter(c => c!=='')
            const nLetras = letras.length - 6
            const ultimas6 = letras.slice(-6)
 
            // revisar solo coincidencias exactas
            ultimas6.forEach((char, index) => {
                if (char === '') return
                const letraCorrecta = pcArray[index % 6]
                if (char === letraCorrecta) {
                    pcArray[index] = '' // quitar la letra
                    nuevosAciertos[index + nLetras] = '💘'
                }
            })

            // revisar existencias
            ultimas6.forEach((char, index) => {
                // no revisar caracteres vacíos
                if (char === '') return
                // evitar revisar si tiene coincidencia exacta
                if (nuevosAciertos[index + nLetras]==='💘') return
                // si existe
                if (pcArray.includes(char)) {
                    // buscar el indice del char en pcArray
                    const i = pcArray.findIndex((letra)=>char ===letra)
                    pcArray[i] = '' 
                    nuevosAciertos[index + nLetras] = '💔'
                }
                // si no existe
                else {
                    nuevosAciertos[index + nLetras] = '💜'
                }
            })

            setState({
                ...state,
                aciertos: nuevosAciertos
            })
        }
    }, [palabraCompletada])

    return (
        <div className="dpF fdC aiC jcC g1em">
            <h1>Juego de Plarax</h1>
            <div className="dpG gtc6fr g0_25em">
                {celdas.map((letra, index) => <Celda key={index} letra={letra} acierto={aciertos[index]} />)}
            </div>
        </div>
    )
}

interface Props {
    letra: string
    acierto: string // 💘 💔 ''
}

const Celda = ({ letra, acierto }: Props) => {
    const bg = {
        '💘': 'bgGreen',
        '💔': 'bgYellow',
        '💜': 'bgGray',
    }[acierto] ?? ''

    return (
        <div className={`h2em w2em dpF aiC jcC bTexto coWhite fwB ${bg}`}>{letra}</div>
    )
}