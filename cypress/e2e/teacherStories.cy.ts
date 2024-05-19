describe('Récits enseignant', () => {

  const teacher = {
    email: 'mon@courriel.com',
    password: 'monmotdepasse',
    name: 'Bruce Lee',
    role: 'teacher',
    health: 100
  }
  const student = {
    name: 'Chuck Norris',
    email: 'champ@champ.com',
    password: 'test',
    role: 'student',
    health: 50
  }

  const question = {
    userId: 2,
    question: "J'ai inventé la machine à voyager dans le temps.",
    priority: 1, 
    category: "chuck"
  }

  beforeEach(() => {
    cy.exec('npm run backend:cypress:seed')

    cy.request('POST', 'http://127.0.0.1:3000/register', {
      email: teacher.email,
      password: teacher.password,
      name: teacher.name,
      role: teacher.role,
      health: teacher.health
    })
    cy.request('POST', 'http://127.0.0.1:3000/register', {
      email: student.email,
      password: student.password,
      name: student.name,
      role: student.role,
      health: student.health
    })

    cy.request('POST', 'http://127.0.0.1:3000/questions',{
      userId: question.userId,
      question: question.question,
      priority: question.priority,
      category: question.category
    })
  })


  it('je peux me connecter', () => {
    cy.visit('/login')
    cy.get('input[name=email-input]').type(teacher.email)
    cy.get('input[name=password-input]').type(teacher.password)
    cy.get('button[type=submit]').click()

    cy.contains(/déconnecter/i)
  })

  it('je peux me déconnecter', () => {
    cy.login(student.email, student.password)

    cy.contains(/déconnecter/i).click()
    cy.contains(/se connecter/i)
  })

  it('je peux ajouter un étudiant', () => {
    cy.login(teacher.email, teacher.password)
    
    cy.visit('/register')
    cy.get('input[name=name-input]').click()
    cy.get('input[name=name-input]').type("new student")
    cy.get('input[name=email-input]').type("newEmail@email.com")
    cy.get('input[name=password-input]').type(student.password)
    cy.get('input[name=password-confirm-input]').type(student.password)
    cy.get('button[type=submit]').click()
  })

  it('je peux supprimer un étudiant', () => {
    cy.login(teacher.email, teacher.password)
    cy.visit('/classe')
    cy.get('button[name=kill]').click()

  })


  it('je peux me déconnecter', () => {
    cy.login(teacher.email, teacher.password)

    cy.contains(/déconnecter/i).click()

    cy.contains(/connexion/i)
  })

  it('je peux changer mon nom complet', () => {
    cy.login(teacher.email, teacher.password)

    cy.visit('/profile')
    cy.get('button[name=editName]').click()
    cy.get('input[name=name-input]').type('Chuck Norris')
    cy.get('button[name=saveName]').click()

    cy.contains(/chuck norris/i)
  })

  it('je peux changer mon mot de passe', () => {
    cy.login(teacher.email, teacher.password)

    cy.visit('/profile')
    cy.get('button[name=passwordChange]').click()
    cy.get('input[name=old-password]').type(teacher.password)
    cy.get('input[name=new-password]').type('chuck')
    cy.get('input[name=confirm-password]').type('chuck')
    cy.get('button[type=submit]').click()

    cy.contains(/profile/i)
  })

  it('je peux ajouter de la vie au compte d\'un étudiant', () => {
    cy.login(teacher.email, teacher.password)

    cy.visit('/classe')
    cy.get('button[name=addHealth]').click()
    cy.contains(student.health + 10)
  })

  it('je peux retirer de la vie au compte d\'un étudiant', () => {
    cy.login(teacher.email, teacher.password)

    cy.visit('/classe')
    cy.get('button[name=removeHealth]').click()
    cy.contains(student.health - 10)
  })

  it('je peux supprimer une question', () => {
    cy.login(teacher.email, teacher.password)

    cy.visit('/question')
    cy.get('button[name=deleteQuestion]').click()
    cy.contains(/question/i)
  })
  it('je peux ajouter une catégorie', () => {
    cy.login(teacher.email, teacher.password)

    cy.visit('/question')
    cy.get('input[name=categoryName]').type('chuck')
    cy.get('button[name=categoryBtn]').click()
    cy.contains(/chuck/i)
  })

  it('je peux voir les questions', () => {
    cy.login(teacher.email, teacher.password)

    cy.visit('/question')
    cy.contains(/question/i)
  })

  it('je peux repondre à une question', () => {
    cy.login(teacher.email, teacher.password)

    cy.visit('/question')
    cy.get('button[name=repondre]').click()
    cy.contains(/question/i)
  })
})