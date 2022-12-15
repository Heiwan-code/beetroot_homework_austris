import Factory from '@ioc:Adonis/Lucid/Factory'
import Item from 'App/Models/Item'
import ItemType from 'App/Models/ItemType'
import Rarity from 'App/Models/Rarity'
import Database from '@ioc:Adonis/Lucid/Database'

export const ItemFactory = Factory.define(Item, async ({ faker }) => {
  // getCount() implemented as custom extension to
  // DatabaseQueryBuilder in providers/AppProvider.ts based on
  // https://docs.adonisjs.com/guides/database/query-builder#extending-query-builders
  // @ts-ignore
  const itemTypeCount = await Database.from('item_types').getCount()
  // @ts-ignore
  const rarityCount = await Database.from('rarities').getCount()
  return {
    name: faker.lorem.word(8),
    description: faker.lorem.sentence(12),
    image_url:
      'https://store.playstation.com/store/api/chihiro/00_09_000/container/PT/pt/99/EP2402-CUSA05624_00-ETH0000000002875/0/image?_version=00_09_000&platform=chihiro&bg_color=000000&opacity=100&w=720&h=720',
    item_type_id: faker.datatype.number({ min: 1, max: itemTypeCount }),
    rarity_id: faker.datatype.number({ min: 1, max: rarityCount }),
  }
}).build()

export const ItemTypeFactory = Factory.define(ItemType, ({ faker }) => {
  return {
    name: faker.lorem.word(8),
    description: faker.lorem.sentence(12),
    image_url: faker.image.nature(200, 200),
    consumable: faker.datatype.boolean(),
    max_stack: faker.datatype.number(5000),
  }
}).build()

export const RarityFactory = Factory.define(Rarity, ({ faker }) => {
  return {
    name: faker.lorem.word(8),
    description: faker.lorem.sentence(12),
    color_code: faker.internet.color(),
  }
}).build()
