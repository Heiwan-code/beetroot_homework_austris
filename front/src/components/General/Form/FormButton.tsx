import React from 'react'

type Props = {
    className?: string,
    label: string
    onClick: () => void
}

const FormButton = ({className, label, onClick}: Props) => {
    return (
        <button onClick={onClick} className={`btn btn-success ${className}`}>
            {label}
        </button>
    )
}

export default FormButton
