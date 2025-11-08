import { Popup } from "../../../components/Popup"

interface Props {
    onClose: () => void
}

export const WinPop = ({onClose}:Props) => {
    return (
        <Popup onClose={onClose}>
            <h3>Felicidades 😎</h3>
            <p>
                Eres un genio, porfavor no cambies,
                me siento orgulloso de que lo hayas logrado 👊
            </p>
        </Popup>
    )
}