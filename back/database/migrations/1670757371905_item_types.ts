import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ItemTypes extends BaseSchema {
  protected tableName = 'item_types'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.string('description', 255).notNullable()
      table.string('image_url').nullable()
      table.boolean('consumable').defaultTo(false)
      table.integer('max_stack', 5).defaultTo(1)
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
