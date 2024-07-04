import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Campanhas extends BaseSchema {
  protected tableName = 'campanhas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome').notNullable()
      table.dateTime('data_cadastro').notNullable()
      table.dateTime('data_inicio').notNullable()
      table.dateTime('data_fim').notNullable()
      table.enum('status', ['ativa', 'pausada', 'expirada']).defaultTo('ativa')
      table.string('categoria').notNullable()
      table.dateTime('deleted_at').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
