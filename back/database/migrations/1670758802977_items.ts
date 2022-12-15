import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('description').nullable()
      table.string('image_url').nullable()
      table.json('data').nullable()
      table
        .integer('item_type_id')
        .unsigned()
        .references('id')
        .inTable('item_types')
        .onDelete('CASCADE')
      table.integer('rarity_id').unsigned().references('id').inTable('rarities').onDelete('CASCADE')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps({ useCamelCase: false })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
