/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

// Route.resource('items', `ItemsController`)
Route.get('items', 'ItemsController.index')
Route.post('items', 'ItemsController.store')
Route.delete('items/:id', 'ItemsController.destroy')
Route.post('items/search', 'ItemsController.search')

// Route.resource('itemTypes', `ItemTypesController`)
Route.get('itemTypes', 'ItemTypesController.index')
Route.post('itemTypes', 'ItemTypesController.store')
Route.delete('itemTypes/:id', 'ItemTypesController.destroy')
Route.post('itemTypes/search', 'ItemTypesController.search')

// Route.resource('rarities', `RaritiesController`)
Route.get('rarities', 'RaritiesController.index')
Route.post('rarities', 'RaritiesController.store')
Route.delete('rarities/:id', 'RaritiesController.destroy')
Route.post('rarities/search', 'RaritiesController.search')
