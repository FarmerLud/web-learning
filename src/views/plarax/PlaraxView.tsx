import { useEffect, useState } from "react"

const palabraCorrecta = 'FIERRO'

export const PlaraxView = () => {
    const [state, setState] = useState({
        celdas: ['', '', '', '', '', '', '', '', '', '', '', '']
    })
    const { celdas } = state

    // programar evento para escuchar el teclado
    // esto se ejecuta solo la primera vez
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            console.log(event.key)
        }

        window.addEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <div className="dpF fdC aiC jcC g1em">
            <h1>Juego de Plarax</h1>
            <div className="dpG gtc6fr g0_25em">
                {celdas.map((letra, index) => <Celda key={index} letra={letra} />)}
            </div>
        </div>
    )
}

interface Props {
    letra: string
}

const Celda = ({ letra }: Props) => {
    return (
        <div className="h2em w2em dpF aiC jcC bTexto">{letra}</div>
    )
}