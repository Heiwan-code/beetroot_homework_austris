import React, {ChangeEvent} from 'react'
import {TextField} from "@mui/material";


type Props = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
const Search = ({ onChange }: Props) => {
    return (
        <div className='search-bar'>
            <TextField
                id="filled-basic"
                label="Search"
                variant="filled"
                onChange={onChange} />
        </div>
    )
}

export default Search
