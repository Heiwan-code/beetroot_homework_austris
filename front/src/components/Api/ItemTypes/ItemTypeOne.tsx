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
            className='img-card item-type-one list-one'
            variant="outlined">
            <FormButton onClick={deleteItemType} label='delete'/>
            {image_url && (
                <div className='img-card__img'>
                    <img src={image_url} alt=""/>
                </div>
            )}
            <div className='img-card__info'>
                <h3 className="text--large">{name}</h3>
                <p className='text--small'>{description}</p>
                {consumable && (
                    <p className='text--number'>Max Stack: {max_stack}</p>
                )}
            </div>
        </Card>
    )
}

export default ItemTypeOne
