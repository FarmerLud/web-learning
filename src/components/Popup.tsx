interface Props {
    children: React.ReactNode
}

export const Popup = ({children}:Props) => {
    return (
        <div className="posF T0 w100vw h100vh dpF aiC jcC"
            style={{ backgroundColor: '#00000055' }}
        >
            <div className="bgOpaco br0_5em pd1em coTexto2 dpF fdC aiC g1em"
            style={{width: '25em', maxWidth: '90vw'}}
            >
                {children}
            </div>
        </div>
    )
}