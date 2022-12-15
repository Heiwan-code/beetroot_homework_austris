import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ItemType from 'App/Models/ItemType'
import { importImage } from 'Helpers/importImage'
import path from 'path'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ItemTypesController {
  public async index() {
    const itemTypes = await ItemType.query()
    const itemTypesSerialized = itemTypes.map((itemType) => itemType.serialize())
    return itemTypesSerialized
  }

  public async search({ request }: HttpContextContract) {
    const searchSchema = schema.create({
      search_term: schema.string(),
    })
    const payload = await request.validate({ schema: searchSchema })
    const term = payload.search_term
    const itemTypes = await ItemType.query()
      .where('name', 'ilike', `%${term}%`)
      .orWhere('description', 'ilike', `%${term}%`)
    const itemTypesSerialized = itemTypes.map((itemType) => itemType.serialize())
    return itemTypesSerialized
  }

  public async store({ request }: HttpContextContract) {
    const newItemTypeSchema = schema.create({
      name: schema.string(),
      description: schema.string(),
      image: schema.file({ size: 3000000 }),
      consumable: schema.boolean(),
      max_stack: schema.number([rules.range(1, 255)]),
    })

    const payload = await request.validate({ schema: newItemTypeSchema })
    const pathJoined = path.join('placeholders', 'itemTypes')
    const imgPath = await importImage(pathJoined, payload.image)
    if (!imgPath) {
      return 'no image'
    }
    const itemType = new ItemType()
    itemType.name = payload.name
    itemType.description = payload.description
    itemType.consumable = payload.consumable
    itemType.max_stack = itemType.consumable ? payload.max_stack : 1
    itemType.image_url = imgPath
    if (await itemType.save()) {
      return itemType
    }
  }

  public async destroy({ params }: HttpContextContract) {
    await ItemType.query().where('id', params.id).delete()
    // wanted to use fs module to remove image, but unfortunately it's not currently in use...
  }
}
