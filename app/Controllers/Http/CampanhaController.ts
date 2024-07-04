import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CampanhaService from 'App/Services/CampanhaService'

export default class CampanhaController {
  public async create({ request, response }: HttpContextContract) {
    try {
      const campanhaData = request.only(['nome', 'dataInicio', 'dataFim', 'categoria'])
      const campanha = await CampanhaService.create(campanhaData)
      return response.status(201).json(campanha)
    } catch (error) {
      return response.status(422).json({ error: error.message })
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      const campanhas = await CampanhaService.readAll()
      return response.status(200).json(campanhas)
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar campanhas.' })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const campanha = await CampanhaService.read(params.id)
      return response.status(200).json(campanha)
    } catch (error) {
      return response.status(404).json({ error: 'Campanha não encontrada.' })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const campanha = await CampanhaService.update(params, request)
      return response.status(200).json(campanha)
    } catch (error) {
      if (error.message === 'Não é possível atualizar uma campanha deletada.') {
        return response.status(410).json({ error: error.message })
      }
      return response.status(422).json({ error: error.message })
    }
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      await CampanhaService.softDelete(params.id)
      return response.status(200).send({ message: 'Campanha deletada com sucesso.' })
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao deletar campanha.' })
    }
  }
}
