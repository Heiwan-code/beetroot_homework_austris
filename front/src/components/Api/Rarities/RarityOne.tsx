import React from 'react'
import {Card} from '@mui/material'
import RaritiesService from '../../../services/rarities.service'
import FormButton from '../../General/Form/FormButton'
import IRarity from '../../../types/rarity.type'

type Props = {
    onDelete: () => void,
    rarityData: IRarity
}

const RarityOne = ({onDelete, rarityData}: Props) => {
    const {id, name,description, color_code} = rarityData
    const style = {
        backgroundColor: color_code
    }
    const deleteRarity = ():void => {
        id && RaritiesService.delete(id)
            .then((response) => {
                onDelete()
            })
    }
    return (
        <Card
            className='rarity-one list-one'
            variant="outlined">
            <FormButton onClick={deleteRarity} label='delete'/>
            <div className='rarity-one__info'>
                <h3 className="text--large rarity-one__name" style={style}>{name}</h3>
                <p className='text--small'>{description}</p>
            </div>
        </Card>
    )
}

export default RarityOne
