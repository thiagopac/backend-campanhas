import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import Campanha from 'App/Models/Campanha'
import { DateTime } from 'luxon'

test.group('CampanhaController', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
  })

  group.each.teardown(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('cria uma nova campanha', async ({ client, assert }) => {
    const response = await client.post('/api/campanha/create').json({
      nome: 'Campanha de Verão',
      dataInicio: '2024-08-15 00:00:00',
      dataFim: '2024-08-20 23:59:59',
      categoria: 'Marketing',
    })

    response.assertStatus(201)
    const campanha = response.body()

    assert.exists(campanha.data_inicio, 'data_inicio não está presente')
    assert.exists(campanha.data_fim, 'data_fim não está presente')
    assert.equal(campanha.nome, 'Campanha de Verão')
    assert.equal(campanha.categoria, 'Marketing')

    const expectedDataInicio = '2024-08-15T00:00:00.000-03:00'
    const expectedDataFim = '2024-08-20T23:59:59.000-03:00'

    assert.equal(campanha.data_inicio, expectedDataInicio)
    assert.equal(campanha.data_fim, expectedDataFim)
  })
})

test('lista todas as campanhas', async ({ client, assert }) => {
  await Database.rawQuery('TRUNCATE TABLE campanhas')

  await Campanha.create({
    nome: 'Campanha de Inverno',
    dataInicio: DateTime.fromSQL('2024-07-01 00:00:00'),
    dataFim: DateTime.fromSQL('2024-07-10 23:59:59'),
    categoria: 'Vendas',
    status: 'ativa',
    dataCadastro: DateTime.now(),
  })

  const response = await client.get('/api/campanha/list')

  response.assertStatus(200)
  const campanhas = response.body()
  assert.exists(campanhas[0], 'A lista de campanhas não está vazia')
  assert.equal(campanhas[0].nome, 'Campanha de Inverno')
})

test('mostra uma campanha específica', async ({ client, assert }) => {
  const campanha = await Campanha.create({
    nome: 'Campanha de Outono',
    dataInicio: DateTime.fromSQL('2024-09-01 00:00:00'),
    dataFim: DateTime.fromSQL('2024-09-10 23:59:59'),
    categoria: 'Produtos',
    status: 'ativa',
    dataCadastro: DateTime.now(),
  })

  const response = await client.get(`/api/campanha/${campanha.id}`)

  response.assertStatus(200)
  const campanhaRetornada = response.body()
  assert.equal(campanhaRetornada.nome, 'Campanha de Outono')
})

test('atualiza uma campanha existente', async ({ client, assert }) => {
  const campanha = await Campanha.create({
    nome: 'Campanha de Primavera',
    dataInicio: DateTime.fromSQL('2024-10-01 00:00:00'),
    dataFim: DateTime.fromSQL('2024-10-10 23:59:59'),
    categoria: 'Descontos',
    status: 'ativa',
    dataCadastro: DateTime.now(),
  })

  const response = await client.patch(`/api/campanha/update/${campanha.id}`).json({
    nome: 'Campanha de Primavera Atualizada',
    dataInicio: '2024-10-01 00:00:00',
    dataFim: '2024-10-15 23:59:59',
    categoria: 'Descontos',
  })

  response.assertStatus(200)
  const campanhaAtualizada = response.body()
  assert.equal(campanhaAtualizada.nome, 'Campanha de Primavera Atualizada')
})

test('deleta uma campanha', async ({ client, assert }) => {
  const campanha = await Campanha.create({
    nome: 'Campanha de Férias',
    dataInicio: DateTime.fromSQL('2024-11-01 00:00:00'),
    dataFim: DateTime.fromSQL('2024-11-10 23:59:59'),
    categoria: 'Turismo',
    status: 'ativa',
    dataCadastro: DateTime.now(),
  })

  const response = await client.delete(`/api/campanha/delete/${campanha.id}`)

  response.assertStatus(200)
  assert.equal(response.body().message, 'Campanha deletada com sucesso.')

  const deletedCampanha = await Campanha.find(campanha.id)
  assert.isNotNull(deletedCampanha!.deletedAt)
})
