import React from 'react'
import {Card} from '@mui/material'
import IItem from '../../../types/item.type'
import FormButton from '../../General/Form/FormButton'
import ItemsService from '../../../services/items.service'

type Props = {
    onDelete: () => void,
    itemData: IItem
}

const ItemOne = ({onDelete, itemData}: Props) => {
    const {id,name,description,image_url,rarity,item_type} = itemData
    const deleteItem = ():void => {
        id && ItemsService.delete(id)
            .then((response) => {
                onDelete()
            })
    }
    console.log(rarity)

    const styleName = {
        color: rarity?.color_code
    }
    const styleCard = {
        borderColor: rarity?.color_code
    }
    return (
        <Card
            className='img-card item-one list-one'
            variant="outlined"
            style={styleCard}>
            <FormButton onClick={deleteItem} label='delete'/>
            {image_url && (
                <div className='img-card__img'>
                    <img src={image_url} alt=""/>
                </div>
            )}
            <div className='img-card__info'>
                <h3 className="text--large" style={styleName}>{name}</h3>
                {item_type && (
                    <p className='text--small'>{item_type.name}</p>
                )}
                <p className='text--small'>{description}</p>
            </div>

        </Card>
    )
}

export default ItemOne
