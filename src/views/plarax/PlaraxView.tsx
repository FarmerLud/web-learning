import { useEffect, useState } from "react"
import { WinPop } from "./popups/WinPop"
import { FailPop } from "./popups/FailPop"
import { Button } from "../../components/Button"
import { traerPalabraAleatoria } from "./services/traerPalabraAleatoria"

const arrInicial = ['']
const nFilas = 6

export const PlaraxView = () => {
    const [state, setState] = useState({
        palabraCorrecta: '',
        arrayInicial: arrInicial,
        celdas: arrInicial,
        aciertos: arrInicial,
        popup: '' // '' | 'winpop' | 'failpop'
    })
    const { celdas, aciertos, popup, palabraCorrecta, arrayInicial } = state

    // contar cuantas letras no son ''
    const ancho = palabraCorrecta.length 
    const nLetrasNoVacias = celdas.filter((char) => char !== '').length
    const palabraCompletada = nLetrasNoVacias % ancho === 0
    const nCeldasVacias = celdas.filter((char) => char === '').length
    const nAciertosVacios = aciertos.filter((char) => char === '').length
    const estaRevisado = nCeldasVacias === nAciertosVacios
    const aciertosNoVacios = aciertos.filter(char => char !== '')
    const ultimos6NoVacios = aciertosNoVacios.slice(-ancho)
    const ganaste = ultimos6NoVacios.every(char => char === '💘') && aciertosNoVacios.length > 0
    const perdiste = aciertos.slice(-ancho).every(char => char !== '') && !ganaste

    // solo se llama la primera vez que renderiza
    useEffect(() => {
        traerPalabraAleatoria().then((palabra) => {
            const arrayInicial = Array(nFilas * palabra.length).fill('')
            setState((prev) => ({
                ...prev,
                palabraCorrecta: palabra,
                arrayInicial,
                celdas: arrayInicial,
                aciertos: arrayInicial
            }))
        })
    }, [])

    // escuchar el teclado
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            console.log(event.key)
            const letra = event.key.toUpperCase()
            const esLetra = /^[a-zA-ZñÑ]$/.test(letra);
            // si se preisonó una letra
            if (esLetra && (nLetrasNoVacias === 0 || estaRevisado || !palabraCompletada) && !ganaste) {
                // buscar index cuyo char === ''
                const index = celdas.findIndex((char) => char === '')
                // actualizar celdas
                const nuevasCeldas = [...celdas]
                nuevasCeldas[index] = letra
                // actualizar el estado
                setState((prev) => ({
                    ...prev,
                    celdas: nuevasCeldas
                }))
            }
            // si se presionó borrar
            if (event.key === 'Backspace' && nAciertosVacios > nCeldasVacias) {
                let index = celdas.findIndex((char) => char === '')
                console.log({ index })
                if (index === 0) return
                if (index === -1) index = celdas.length
                const nuevasCeldas = [...celdas]
                nuevasCeldas[index - 1] = ''
                setState((prev) => ({
                    ...prev,
                    celdas: nuevasCeldas
                }))
            }
            // revisar cuando la palabra está completa
            if (event.key === 'Enter' && nLetrasNoVacias > 0 && palabraCompletada) {
                console.log('REVISARR')
                revisarPalabra()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }

    }, [celdas.join(''), estaRevisado, palabraCorrecta])

    useEffect(() => {
        let popup = ''
        if (ganaste) popup = 'winpop'
        if (perdiste) popup = 'failpop'
        setState((prev) => ({
            ...prev,
            popup
        }))
    }, [ganaste, perdiste])

    const revisarPalabra = () => {
        const nuevosAciertos = [...aciertos]

        const pcArray = palabraCorrecta.split('')
        const letras = celdas.filter(c => c !== '')
        const nLetrasPrevias = letras.length - ancho
        const ultimas6 = letras.slice(-ancho)

        // revisar solo coincidencias exactas
        ultimas6.forEach((char, index) => {
            if (char === '') return
            const letraCorrecta = pcArray[index % ancho]
            if (char === letraCorrecta) {
                pcArray[index] = '' // quitar la letra
                nuevosAciertos[index + nLetrasPrevias] = '💘'
            }
        })

        // revisar existencias
        ultimas6.forEach((char, index) => {
            // no revisar caracteres vacíos
            if (char === '') return
            // evitar revisar si tiene coincidencia exacta
            if (nuevosAciertos[index + nLetrasPrevias] === '💘') return
            // si existe
            if (pcArray.includes(char)) {
                // buscar el indice del char en pcArray
                const i = pcArray.findIndex((letra) => char === letra)
                pcArray[i] = ''
                nuevosAciertos[index + nLetrasPrevias] = '💔'
            }
            // si no existe
            else {
                nuevosAciertos[index + nLetrasPrevias] = '💜'
            }
        })

        setState({
            ...state,
            aciertos: nuevosAciertos
        })
    }

    const closePopup = () => {
        setState((prev) => ({
            ...prev,
            popup: ''
        }))
    }

    const otraVez = () => {
        setState((prev) => ({
            ...prev,
            celdas: arrayInicial,
            aciertos: arrayInicial,
        }))
    }

    return (
        <div key={palabraCorrecta} className="dpF fdC aiC jcC g1em">
            <h1>Juego de Plarax</h1>
            <div className="dpG g0_25em" 
                style={{gridTemplateColumns:`repeat(${ancho},1fr)`}}
            >
                {celdas.map((letra, index) => <Celda key={index} letra={letra} acierto={aciertos[index]} />)}
            </div>
            {(ganaste || perdiste) && <Button text="JUGAR OTRA VEZ" onClick={otraVez} />}
            {popup === 'winpop' && <WinPop onClose={closePopup} />}
            {popup === 'failpop' && <FailPop onClose={closePopup} palabraCorrecta={palabraCorrecta} />}
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