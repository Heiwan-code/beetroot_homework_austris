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
            className='list-item list-item--item list-item--card'
            variant="outlined"
            style={styleCard}>
            <FormButton className="btn--delete" onClick={deleteItem} label='delete'/>
            <h3 className="entry-title text--large" style={styleName}>{name}</h3>
            {image_url && (
                <div className='img-wrapper'>
                    <img src={image_url} alt=""/>
                </div>
            )}
            <div className='info'>
                {item_type && (
                    <p className='info__property list-item--item__type text--small'>
                        Type: <span className='value'>{item_type.name}</span>
                    </p>
                )}
                <p className='info__description text--small'>{description}</p>
            </div>

        </Card>
    )
}

export default ItemOne
