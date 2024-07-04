import Campanha from 'App/Models/Campanha'
import { DateTime } from 'luxon'

export default class CampanhaService {
  public static async create(data: any) {
    const now = DateTime.now()

    if (DateTime.fromSQL(data.dataInicio) < now) {
      throw new Error('A data de início deve ser igual ou posterior à data atual.')
    }

    if (DateTime.fromSQL(data.dataFim) <= DateTime.fromSQL(data.dataInicio)) {
      throw new Error('A data fim deve ser maior que a data de início.')
    }

    const status = DateTime.fromSQL(data.dataFim) < now ? 'expirada' : 'ativa'

    const campanha = await Campanha.create({ ...data, status, dataCadastro: now })
    return campanha
  }

  public static async readAll() {
    return await Campanha.query().whereNull('deleted_at')
  }

  public static async read(id: number) {
    return await Campanha.query().where('id', id).andWhereNull('deleted_at').firstOrFail()
  }

  public static async update(params, request) {
    const updateData = request.only(['nome', 'dataInicio', 'dataFim', 'categoria', 'status'])
    const campanha = await Campanha.findOrFail(params.id)

    if (campanha.deletedAt) {
      throw new Error('Não é possível atualizar uma campanha deletada.')
    }

    const now = DateTime.now()

    if (updateData.dataInicio) {
      const dataInicio = DateTime.fromSQL(updateData.dataInicio)
      if (dataInicio < now) {
        throw new Error('A data de início deve ser igual ou posterior à data atual.')
      }
      campanha.dataInicio = dataInicio
    }

    if (updateData.dataFim) {
      const dataFim = DateTime.fromSQL(updateData.dataFim)
      if (campanha.dataInicio && dataFim <= campanha.dataInicio) {
        throw new Error('A data fim deve ser maior que a data de início.')
      }
      campanha.dataFim = dataFim
    }

    const status =
      updateData.dataFim && campanha.dataFim && campanha.dataFim < now
        ? 'expirada'
        : updateData.status || campanha.status

    campanha.merge({ ...updateData, status })

    delete campanha.$attributes.dataCadastro

    await campanha.save()
    return campanha
  }

  public static async softDelete(id: number) {
    const campanha = await Campanha.findOrFail(id)
    campanha.deletedAt = DateTime.now()
    await campanha.save()
  }
}
