import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    // Lista todas as campanhas
    Route.get('list', 'CampanhaController.index')

    // Busca campanha pelo ID
    Route.get(':id', 'CampanhaController.show')

    // Cria nova campanha
    Route.post('create', 'CampanhaController.create')

    // Atualiza campanha existente por ID
    Route.patch('update/:id', 'CampanhaController.update')

    // Exclui uma campanha por ID (soft delete)
    Route.delete('delete/:id', 'CampanhaController.delete')
  }).prefix('campanha')
}).prefix('/api')
