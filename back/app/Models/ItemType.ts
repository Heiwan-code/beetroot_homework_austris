import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Item from 'App/Models/Item'

export default class ItemType extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column({ serialize: Boolean })
  public consumable: boolean

  @column()
  public max_stack: number

  @column()
  public image_url: string

  @hasMany(() => Item, {
    foreignKey: 'item_type_id',
  })
  public items: HasMany<typeof Item>

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime
}
