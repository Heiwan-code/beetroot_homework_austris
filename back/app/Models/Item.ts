import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import ItemType from 'App/Models/ItemType'
import Rarity from 'App/Models/Rarity'

export default class Item extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column({ serialize: undefined })
  public item_type_id: number

  @belongsTo(() => ItemType, {
    foreignKey: 'item_type_id',
  })
  public item_type: BelongsTo<typeof ItemType>

  @column({ serialize: undefined })
  public rarity_id: number

  @belongsTo(() => Rarity, {
    foreignKey: 'rarity_id',
  })
  public rarity: BelongsTo<typeof Rarity>

  @column()
  public image_url: string

  @column({ serialize: undefined })
  public data?: object

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime
}
