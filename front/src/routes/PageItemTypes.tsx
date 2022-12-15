import React, {ChangeEvent, useEffect, useState} from 'react'
import ListItemTypes from '../components/Api/ItemTypes/ListItemTypes'
import AddItemType from '../components/Api/ItemTypes/AddItemType'
import IItemType from '../types/itemType.type'
import ItemTypesService from '../services/itemTypes.service'
import Search from '../components/General/Search'

const PageItemTypes = () => {
    const [itemTypes, setItemTypes] = useState<IItemType[]>()
    const [responseStatus, setResponseStatus] = useState<number>(200)

    const fetchItemTypes = async() => {
        const { data, status } = await ItemTypesService.getAll()
        setResponseStatus(status)
        responseStatus === 200 && setItemTypes(data)
    }
    const search = async(e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            const { data, status } = await ItemTypesService.search(e.target.value)
            setResponseStatus(status)
            responseStatus === 200 && setItemTypes(data)
        } else {
            fetchItemTypes()
        }
    }

    useEffect(() => {
        fetchItemTypes()
    }, [])

    return (
        <div className='page item-types-page'>
            <Search onChange={search}/>
            {responseStatus === 200 && itemTypes && Number(itemTypes.length) > 0 ?
            (
                <ListItemTypes {...{
                    onDelete: fetchItemTypes,
                    itemTypes: itemTypes
                }}/>

            ):(
                <h3 className='large-text'>
                    {responseStatus !== 200 ?
                        ('Something went wrong...') :
                        ('No Item Types Found! :(')
                    }
                </h3>
            )}
            <AddItemType onAdd={fetchItemTypes}/>
        </div>
    )
}

export default PageItemTypes
