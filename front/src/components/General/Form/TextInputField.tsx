import React, {ChangeEvent} from 'react'
import {TextField} from "@mui/material";

type Props = {
    label: string
    value: string
    error?: boolean

    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

const TextInputField = ({label, value, error, onChange}: Props) => {

    return (
        <div className="form__field">
            <TextField
                error={error}
                id="filled-basic"
                required label={label}
                value={value}
                name={label}
                onChange={onChange}
                variant="filled"/>
        </div>
    )
}

export default TextInputField
