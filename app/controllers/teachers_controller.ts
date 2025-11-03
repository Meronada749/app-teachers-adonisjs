import Teacher from '#models/teacher'
import type { HttpContext } from '@adonisjs/core/http'
// import { dd } from '@adonisjs/core/services/dumper'

export default class TeachersController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const teachers = await Teacher.query().orderBy('lastname', 'asc').orderBy('firstname', 'asc')

    //dd(teachers)

    return view.render('pages/home', { teachers })
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    // Sélectionner l'enseignant dont on veut afficher les détails
    // On veut également pouvoir afficher la section de l'enseignant
    const teacher = await Teacher.query().where('id', params.id).preload('section').firstOrFail()
    // Afficher la vue
    return view.render('pages/teachers/show.edge', { title: "Détail d'un enseignant", teacher })
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
