import type { HttpContext } from '@adonisjs/core/http'
import { loginUserValidator } from '#validators/auth'
import User from '#models/user'

/**
 * Controller pour l'authentification
 */

export default class AuthController {
  /**
   * Gérer la connexion d'un utilisateur
   */

  async handleLogin({ request, auth, session, response }: HttpContext) {
    const { username, password } = await request.validateUsing(loginUserValidator)

    const user = await User.verifyCredentials(username, password)

    // Utilise le guard 'web' pour connecter l'utilisateur -> Voir le fichier config / auth.ts
    await auth.use('web').login(user)

    session.flash('success', "L'utilisateur s'est connecté avec succès")

    return response.redirect().toRoute('home')
  }
}
