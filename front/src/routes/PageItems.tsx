import React, {ChangeEvent, useEffect, useState} from 'react'
import ListItems from '../components/Api/Items/ListItems'
import AddItem from '../components/Api/Items/AddItem'
import Search from '../components/General/Search'
import IItem from '../types/item.type'
import ItemsService from '../services/items.service'

const PageItems = () => {
    const [items, setItems] = useState<IItem[]>()
    const [responseStatus, setResponseStatus] = useState<number>(200)

    const fetchItems = async() => {
        const { data, status } = await ItemsService.getAll()
        setResponseStatus(status)
        responseStatus === 200 && setItems(data)
    }
    const search = async(e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            const { data, status } = await ItemsService.search(e.target.value)
            setResponseStatus(status)
            responseStatus === 200 && setItems(data)
        } else {
            fetchItems()
        }
    }

    useEffect(() => {
        fetchItems()
    }, [])

    return (
        <div className='page items-page'>
            <Search onChange={search}/>
            {responseStatus === 200 && items && Number(items.length) > 0 ?
            (
                <ListItems {...{
                    onDelete: fetchItems,
                    items: items
                }}/>
            ):(
                <h3 className='large-text'>
                    {responseStatus !== 200 ?
                        ('Something went wrong...') :
                        ('No Items Found! :(')
                    }
                </h3>
            )}
            <AddItem onAdd={fetchItems}/>
        </div>
    )
}

export default PageItems
