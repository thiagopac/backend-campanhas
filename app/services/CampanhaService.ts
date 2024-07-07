import Campanha from 'App/Models/Campanha'
import { DateTime } from 'luxon'

export default class CampanhaService {
  /**
   * @description Cria uma nova campanha
   * @param data - Dados da campanha que está sendo criada
   * @returns A campanha criada
   * @throws Erro se a data de início for anterior à data atual ou se a data de fim for anterior à data de início
   */
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

  /**
   * @description Recupera todas as campanhas não deletadas
   * @returns Uma lista de campanhas
   */
  public static async readAll() {
    return await Campanha.query().whereNull('deleted_at')
  }

  /**
   * @description Recupera uma campanha específica pelo ID
   * @param id - O ID da campanha a ser recuperada
   * @returns A campanha encontrada
   * @throws Erro se a campanha não for encontrada ou se estiver deletada
   */
  public static async read(id: number) {
    return await Campanha.query().where('id', id).andWhereNull('deleted_at').firstOrFail()
  }

  /**
   * @description Atualiza uma campanha existente
   * @param params - Parâmetros da requisição, incluindo o ID da campanha
   * @param request - A requisição HTTP contendo os dados de atualização
   * @returns A campanha atualizada
   * @throws Erro se a campanha estiver deletada, se a data de início for anterior à data atual, ou se a data de fim for anterior à data de início
   */
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

  /**
   * @description Realiza a exclusão lógica de uma campanha
   * @param id - O ID da campanha a ser deletada
   * @returns Void
   * @throws Erro se a campanha não for encontrada
   */
  public static async softDelete(id: number) {
    const campanha = await Campanha.findOrFail(id)
    campanha.deletedAt = DateTime.now()
    await campanha.save()
  }
}
