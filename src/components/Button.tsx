interface Props {
    text: string
    onClick: () => void
}

export const Button = ({ text, onClick }: Props) => {
    return (
        <button
            className="cuP coWhite pd0_5em br0_5em bgOpaco2 ho-bgLila"
            onClick={onClick}
            style={{
                boxShadow:'2px 2px 4px 2px #0000001c',
            }}
        >
            {text}
        </button>
    )
}