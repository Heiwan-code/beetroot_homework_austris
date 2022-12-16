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
            className='list-item list-item--rarity list-item--row'
            variant="outlined">
            <FormButton className="btn--delete" onClick={deleteRarity} label='delete'/>
            <div className='info'>
                <h3 className="info__title text--large" style={style}>{name}</h3>
                <p className='info__description text--small'>{description}</p>
            </div>
        </Card>
    )
}

export default RarityOne
