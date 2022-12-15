import React from 'react'

type Props = {
    label: string
    onClick: () => void
}

const SubmitButton = ({label, onClick}: Props) => {
    return (
        <button onClick={onClick} className="btn btn-success">
            {label}
        </button>
    )
}

export default SubmitButton