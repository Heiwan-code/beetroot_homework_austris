import React, {ChangeEvent, useEffect, useState} from 'react'
import AddRarity from '../components/Api/Rarities/AddRarity'
import ListRarities from '../components/Api/Rarities/ListRarities'
import IRarity from '../types/rarity.type'
import RaritiesService from '../services/rarities.service'
import Search from '../components/General/Search'

const PageRarities = () => {
    const [rarities, setRarities] = useState<IRarity[]>()
    const [responseStatus, setResponseStatus] = useState<number>(200)

    const fetchRarities = async() => {
        const { data, status } = await RaritiesService.getAll()
        setResponseStatus(status)
        responseStatus === 200 && setRarities(data)
    }
    const search = async(e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            const { data, status } = await RaritiesService.search(e.target.value)
            setResponseStatus(status)
            responseStatus === 200 &&setRarities(data)
        } else {
            fetchRarities()
        }
    }

    useEffect(() => {
        fetchRarities()
    }, [])

    return (
        <div className='page rarities-page'>
            <Search onChange={search}/>
            {responseStatus === 200 && rarities && Number(rarities.length) > 0 ?
            (
                <ListRarities
                    {...{
                        onDelete: fetchRarities,
                        rarities: rarities
                    }}/>
            ):(
                <h3 className='large-text'>
                    {responseStatus !== 200 ?
                        ('Something went wrong...') :
                        ('No Rarities Found! :(')
                    }
                </h3>
            )}
            <AddRarity onAdd={fetchRarities}/>
        </div>
    )
}

export default PageRarities
