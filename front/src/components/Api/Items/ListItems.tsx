import React from 'react'
import IItem from '../../../types/item.type'
import ItemOne from './ItemOne'

type Props = {
    items: IItem[]
    onDelete: () => void
}
const ListItems = ({items, onDelete}: Props) => {
    console.log(items)
    return (
        <div className='list list--items list--cards'>
            {
                items.map((item: IItem, index) => {
                    item.id && (index = item.id)
                    return (<ItemOne key={index}
                            {...{
                                onDelete: onDelete,
                                itemData: item
                            }}/>)
                })
            }
        </div>
    )
}

export default ListItems
