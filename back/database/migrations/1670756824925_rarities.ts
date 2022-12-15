import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rarities'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.string('description', 255).notNullable()
      table.string('color_code', 90).notNullable()
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
