import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ItemTypeFactory } from 'Database/factories'

export default class ItemTypeSeeder extends BaseSeeder {
  public async run () {
    await ItemTypeFactory.createMany(50)
  }
}
