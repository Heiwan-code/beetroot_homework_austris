import React from 'react'
import { Link } from 'react-router-dom'


type Props = {}
const Nav = ({}: Props) => {
    const menuItems = [
        'items',
        'item-types',
        'rarities'
    ]

    return (
            <div className='main-nav'>
                {
                    menuItems.map((menuItem, index) => {
                        return (
                            <Link
                                key={index}
                                to={`/${menuItem}`}>
                                {menuItem}
                            </Link>
                        )
                    })
                }
            </div>
        )
}

export default Nav
