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
| import './routes/customer''
|
*/

import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

Route.get('/', async ({ view }) => {
  const users = await User.all()
  await User.preComputeUrls(users)

  return view.render('welcome', { users: users })
}).as('index')

Route.post('/save', async ({ request, response }) => {
  const user = new User()
  const avatar = request.file('avatar')!

  user.avatar = Attachment.fromFile(avatar)

  await user.save()

  return response.redirect().toRoute('index')
}).as('save')
