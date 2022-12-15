import React from 'react'

type Props = {
    label: string
    onClick: () => void
}

const FormButton = ({label, onClick}: Props) => {
    return (
        <button onClick={onClick} className="btn btn-success">
            {label}
        </button>
    )
}

export default FormButton