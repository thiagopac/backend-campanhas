import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CampanhaService from 'App/Services/CampanhaService'

export default class CampanhaController {
  /**
   * @swagger
   * /api/campanha/create:
   *   post:
   *     tags:
   *       - CampanhaController
   *     summary: Cria uma nova campanha
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *                 example: "Campanha de Verão"
   *               dataInicio:
   *                 type: string
   *                 format: date-time
   *                 example: "2024-08-15 00:00:00"
   *               dataFim:
   *                 type: string
   *                 format: date-time
   *                 example: "2024-08-20 23:59:59"
   *               categoria:
   *                 type: string
   *                 example: "Marketing"
   *     responses:
   *       201:
   *         description: Campanha criada com sucesso
   *       422:
   *         description: Erro de validação
   */
  public async create({ request, response }: HttpContextContract) {
    try {
      const campanhaData = request.only(['nome', 'dataInicio', 'dataFim', 'categoria'])
      const campanha = await CampanhaService.create(campanhaData)
      return response.status(201).json(campanha)
    } catch (error) {
      return response.status(422).json({ error: error.message })
    }
  }

  /**
   * @swagger
   * /api/campanha/list:
   *   get:
   *     tags:
   *       - CampanhaController
   *     summary: Retorna todas as campanhas
   *     responses:
   *       200:
   *         description: Lista de campanhas
   *       500:
   *         description: Erro ao buscar campanhas
   */
  public async index({ response }: HttpContextContract) {
    try {
      const campanhas = await CampanhaService.readAll()
      return response.status(200).json(campanhas)
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar campanhas.' })
    }
  }

  /**
   * @swagger
   * /api/campanha/{id}:
   *   get:
   *     tags:
   *       - CampanhaController
   *     summary: Retorna uma campanha específica pelo ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: ID da campanha a ser buscada
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Campanha encontrada
   *       404:
   *         description: Campanha não encontrada
   */
  public async show({ params, response }: HttpContextContract) {
    try {
      const campanha = await CampanhaService.read(params.id)
      return response.status(200).json(campanha)
    } catch (error) {
      return response.status(404).json({ error: 'Campanha não encontrada.' })
    }
  }

  /**
   * @swagger
   * /api/campanha/update/{id}:
   *   patch:
   *     tags:
   *       - CampanhaController
   *     summary: Atualiza uma campanha existente
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: ID da campanha a ser atualizada
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *                 example: "Campanha de Outono"
   *               dataInicio:
   *                 type: string
   *                 format: date-time
   *                 example: "2024-08-15 00:00:00"
   *               dataFim:
   *                 type: string
   *                 format: date-time
   *                 example: "2024-08-20 23:59:59"
   *               categoria:
   *                 type: string
   *                 example: "Vendas"
   *               status:
   *                 type: string
   *                 example: "ativa"
   *     responses:
   *       200:
   *         description: Campanha atualizada com sucesso
   *       410:
   *         description: Não é possível atualizar uma campanha deletada
   *       422:
   *         description: Erro de validação
   */
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

  /**
   * @swagger
   * /api/campanha/delete/{id}:
   *   delete:
   *     tags:
   *       - CampanhaController
   *     summary: Exclui uma campanha (soft delete)
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: ID da campanha a ser excluída
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Campanha deletada com sucesso
   *       500:
   *         description: Erro ao deletar campanha
   */
  public async delete({ params, response }: HttpContextContract) {
    try {
      await CampanhaService.softDelete(params.id)
      return response.status(200).send({ message: 'Campanha deletada com sucesso.' })
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao deletar campanha.' })
    }
  }
}
