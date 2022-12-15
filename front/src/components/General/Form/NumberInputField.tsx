import React, {ChangeEvent} from 'react'
import {TextField} from "@mui/material";

type Props = {
    label: string
    value: number,
    error?: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const NumberInputField = ({label, value, error, onChange}: Props) => {

    return (
        <div className="form__field">
            <TextField
                error={error}
                id="filled-basic"
                required label={label}
                value={value}
                type='number'
                name={label}
                onChange={onChange}
                variant="filled"/>
        </div>
    )
}

export default NumberInputField
