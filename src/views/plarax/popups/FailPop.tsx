import { Popup } from "../../../components/Popup"

interface Props {
    palabraCorrecta: string
    onClose: () => void
}

export const FailPop = ({ onClose, palabraCorrecta }: Props) => {
    return (
        <Popup onClose={onClose}>
            <h3>Vaya! no le atinaste 🫠</h3>
            <p>
                Bueno, puedes intentarlo denuevo,
                echale ganitas, tú puedes. 💪
            </p>
            <p>{palabraCorrecta}</p>
        </Popup>
    )
}