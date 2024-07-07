import { test } from '@japa/runner'
import { DateTime } from 'luxon'
import CampanhaService from 'App/Services/CampanhaService'
import Campanha from 'App/Models/Campanha'
import sinon from 'sinon'

test.group('CampanhaService', (group) => {
  let sandbox: sinon.SinonSandbox

  group.setup(() => {
    sandbox = sinon.createSandbox()
  })

  group.teardown(() => {
    sandbox.restore()
  })

  test('deve criar uma nova campanha', async ({ assert }) => {
    const data = {
      nome: 'Campanha de Teste',
      dataInicio: '2024-08-15 00:00:00',
      dataFim: '2024-08-20 23:59:59',
      categoria: 'Marketing',
    }

    const expectedCampaign = {
      id: 1,
      ...data,
      dataCadastro: DateTime.now(),
      status: 'ativa',
    }

    sandbox.stub(Campanha, 'create').resolves(expectedCampaign as any)

    const result = await CampanhaService.create(data)
    assert.deepEqual(result, expectedCampaign)
  })
})
