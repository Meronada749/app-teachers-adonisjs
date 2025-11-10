import Section from '#models/section'
import Teacher from '#models/teacher'
import { teacherValidator } from '#validators/teacher'
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
   * Afficher le formulaire pour créer un nouvel enseignant
   */
  async create({ view }: HttpContext) {
    const sections = await Section.query().orderBy('name', 'asc') // Récupération des sections triées par le nom
    return view.render('pages/teachers/create', { title: "Ajout d'un enseignant", sections }) // Appel de la vue
  }

  /**
   * Handle form submission for the create action
   * Gérer la soumission du formulaire pour la création d'un enseignant
   */
  async store({ request, session, response }: HttpContext) {
    const { gender, firstname, lastname, nickname, origine, sectionId } =
      await request.validateUsing(teacherValidator)
    await Teacher.create({ gender, firstname, lastname, nickname, origine, sectionId }) // Création du nouvel enseignant
    session.flash('success', 'Le nouvel enseignant a été ajouté avec succès !') // Afficher un message à l'utilisateur
    return response.redirect().toRoute('home')
  }

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
  async destroy({ params, session, response }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)
    await teacher.delete()
    session.flash('success', "L'enseignant a été supprimé avec succès !")
    return response.redirect().toRoute('home')
  }
}
