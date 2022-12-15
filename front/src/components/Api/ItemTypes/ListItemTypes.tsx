import React from 'react'
import ItemTypeOne from './ItemTypeOne'
import IItemType from '../../../types/itemType.type'

type Props = {
    itemTypes: IItemType[]
    onDelete: () => void
}
const ListItemTypes = ({itemTypes, onDelete}: Props) => {
    return (
        <div className='list item-types-list'>
            {
                itemTypes.map((itemType: IItemType, index) => {
                    itemType.id && (index = itemType.id)
                    return (<ItemTypeOne
                            key={index}
                            {...{
                                onDelete: onDelete,
                                itemTypeData:itemType
                            }}/>)
                })
            }
        </div>
    )
}

export default ListItemTypes
