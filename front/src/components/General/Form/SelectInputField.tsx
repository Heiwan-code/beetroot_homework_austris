import React, {ChangeEvent} from 'react'
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

type Props = {
    label: string
    value: number
    onChange: (e: SelectChangeEvent<number>) => void
    options: {
        name: string
    }[]
}

const SelectInputField = ({label, value, onChange, options}: Props) => {

    return (
        <FormControl fullWidth>
            <InputLabel id={`${label}-label`}>{label}</InputLabel>
            <Select
                labelId={`${label}-label`}
                id={label}
                value={value}
                label={`${label}-l`}
                onChange={onChange}>
                {
                    options.map((option : any, index) => {
                        return (
                        <MenuItem value={option.id} >
                            {option.name}
                        </MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    )
}

export default SelectInputField

