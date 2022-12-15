import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Item from 'App/Models/Item'
import { importImage } from 'Helpers/importImage'
import ItemType from 'App/Models/ItemType'
import Rarity from 'App/Models/Rarity'
import path from 'path'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ItemsController {
  public async index() {
    const items = await Item.query().preload('rarity').preload('item_type')
    const itemsSerialized = items.map((item) => item.serialize())
    return itemsSerialized
  }

  public async search({ request }: HttpContextContract) {
    const searchSchema = schema.create({
      search_term: schema.string(),
    })
    const payload = await request.validate({ schema: searchSchema })
    const term = payload.search_term
    const items = await Item.query()
      .where('name', 'ilike', `%${term}%`)
      .orWhere('description', 'ilike', `%${term}%`)
    const itemsSerialized = items.map((item) => item.serialize())
    return itemsSerialized
  }

  public async store({ request }: HttpContextContract) {
    const newItemSchema = schema.create({
      name: schema.string(),
      description: schema.string(),
      image: schema.file({ size: 3000000 }),
      item_type_id: schema.number(),
      rarity_id: schema.number(),
    })

    const payload = await request.validate({ schema: newItemSchema })

    const itemType = await ItemType.findOrFail(payload.item_type_id)
    const pathJoined = path.join('items', itemType.name)
    const imgPath = await importImage(pathJoined, payload.image)
    if (!imgPath) {
      return 'no image'
    }
    const item = new Item()
    item.name = payload.name
    item.description = payload.description
    const rarity = await Rarity.findOrFail(payload.rarity_id)
    item.image_url = imgPath
    if (await item.save()) {
      itemType && (await itemType.related('items').save(item))
      rarity && (await rarity.related('items').save(item))
      return item
    }
  }

  public async destroy({ params }: HttpContextContract) {
    await Item.query().where('id', params.id).delete()
    // wanted to use fs module to remove image, but unfortunately it's not currently in use...
  }
}
