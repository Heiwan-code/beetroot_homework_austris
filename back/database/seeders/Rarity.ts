import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { RarityFactory } from 'Database/factories'

export default class RaritySeeder extends BaseSeeder {
  public async run () {
    await RarityFactory.createMany(50)
  }
}
