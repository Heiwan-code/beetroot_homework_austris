import React, {ChangeEvent} from 'react'
import {Checkbox} from "@mui/material";

type Props = {
    label: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const CheckboxInputField = ({label, onChange}: Props) => {
    return (
        <div className="form-group">
            <label htmlFor={label}>
                {label}
            </label>
            <Checkbox {...{
                id: label,
                name: label,
                onChange: onChange
            }}/>
        </div>
    )
}

export default CheckboxInputField
