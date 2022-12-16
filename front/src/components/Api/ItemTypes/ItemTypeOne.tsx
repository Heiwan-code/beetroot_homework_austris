import React from 'react'
import {Card} from '@mui/material'
import IItemType from '../../../types/itemType.type'
import ItemTypesService from '../../../services/itemTypes.service'
import FormButton from '../../General/Form/FormButton'

type Props = {
    onDelete: () => void,
    itemTypeData: IItemType
}

const ItemTypeOne = ({onDelete, itemTypeData}: Props) => {
    const {id, name,description,consumable,image_url,max_stack} = itemTypeData
    const deleteItemType = ():void => {
        id && ItemTypesService.delete(id)
            .then((response) => {
                onDelete()
            })
    }

    return (
        <Card
            className='list-item list-item--item-type list-item--card'
            variant="outlined">
            <FormButton className="btn--delete" onClick={deleteItemType} label='delete'/>
            <h3 className="entry-title text--large">{name}</h3>
            {image_url && (
                <div className='img-wrapper'>
                    <img src={image_url} alt=""/>
                </div>
            )}
            <div className='info'>
                {consumable && (
                    <p className='info__property list-item--item-type__stack text--number'>
                        Max Stack: <span className='value'>{max_stack}</span>
                    </p>
                )}
                <p className='info__description text--small'>{description}</p>
            </div>
        </Card>
    )
}

export default ItemTypeOne
