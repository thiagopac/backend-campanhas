import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave, beforeCreate } from '@ioc:Adonis/Lucid/Orm'

export default class Campanha extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column.dateTime({
    autoCreate: true,
  })
  public dataCadastro: DateTime

  @column.dateTime()
  public dataInicio: DateTime

  @column.dateTime()
  public dataFim: DateTime

  @column()
  public status: string

  @column()
  public categoria: string

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime | null

  @beforeSave()
  public static formatDates(campanha: Campanha) {
    if (campanha.dataCadastro && typeof campanha.dataCadastro === 'string') {
      campanha.dataCadastro = DateTime.fromSQL(campanha.dataCadastro)
    }
    if (campanha.dataInicio && typeof campanha.dataInicio === 'string') {
      campanha.dataInicio = DateTime.fromSQL(campanha.dataInicio)
    }
    if (campanha.dataFim && typeof campanha.dataFim === 'string') {
      campanha.dataFim = DateTime.fromSQL(campanha.dataFim)
    }
  }
}
