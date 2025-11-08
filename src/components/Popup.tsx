import close from '../assets/icons/close.svg'

interface Props {
    children: React.ReactNode
    onClose: () => void
}

export const Popup = ({children, onClose}:Props) => {
    return (
        <div className="posF T0 w100vw h100vh dpF aiC jcC"
            style={{ backgroundColor: '#00000055' }}
        >
            <div className="posR bgOpaco br0_5em pd1em coTexto2 dpF fdC aiC g1em"
            style={{width: '25em', maxWidth: '90vw'}}
            >
                <div className="posA h2em w2em bgGreen br0_5em cuP"
                style={{top:'0.5em',right:'0.5em'}}
                onClick={onClose}
                >
                    <img className='w100pc' src={close} alt="" />
                </div>
                {children}
            </div>
        </div>
    )
}