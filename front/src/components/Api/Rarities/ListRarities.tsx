import React from 'react'
import IRarity from '../../../types/rarity.type'
import RarityOne from './RarityOne'

type Props = {
    rarities: IRarity[]
    onDelete: () => void
}

const ListRarities = ({rarities, onDelete}: Props) => {
    return (
        <div className='list rarities-list'>
            {
                rarities.map((rarity: IRarity, index) => {
                    rarity.id && (index = rarity.id)
                    return (<RarityOne key={index}
                            {...{
                                onDelete: onDelete,
                                rarityData: rarity
                            }}/>)
                })
            }
        </div>
    )
}

export default ListRarities
