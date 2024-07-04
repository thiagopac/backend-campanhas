import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CampanhaService from 'App/services/CampanhaService'

export default class CampanhaController {
  public async create({ request, response }: HttpContextContract) {
    const campanhaData = request.only(['nome', 'dataInicio', 'dataFim', 'categoria'])
    const campanha = await CampanhaService.create(campanhaData)
    return response.json(campanha)
  }

  public async index({ response }: HttpContextContract) {
    const campanhas = await CampanhaService.readAll()
    return response.json(campanhas)
  }

  public async show({ params, response }: HttpContextContract) {
    const campanha = await CampanhaService.read(params.id)
    return response.json(campanha)
  }

  public async update(ctx: HttpContextContract) {
    const campanha = await CampanhaService.update(ctx)
    return ctx.response.json(campanha)
  }

  public async delete({ params, response }: HttpContextContract) {
    await CampanhaService.softDelete(params.id)
    return response.status(200).send({ message: 'Campanha deletada com sucesso.' })
  }
}
