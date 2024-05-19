
describe('Récits utilisateur', () => {
  // On définit un utilisateur pour les tests. Cet utilisateur sera créé dans la base de données avant chaque test.
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
    userId: 1,
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

  function createQuestion() {
    cy.login(student.email, student.password)
    cy.contains(/Question/i).click()
    
    cy.get('input[name=question-input]').type('Est-ce que je suis un bon élève?')
    cy.get('select[name=priority-select]').select('1')
    cy.get('select[name=category-select]').select('Test')
    cy.get('button[name=submit-question]').click()
  }

  // Les tests sont écrits sous forme de récits utilisateur. Voir les notes de cours à ce sujet.
  it('je peux me connecter', () => {
    cy.visit('/login')
    cy.get('input[name=email-input]').type(student.email)
    cy.get('input[name=password-input]').type(student.password)
    cy.get('button[type=submit]').click()

    cy.contains(/déconnecter/i)
  })

  it('je peux me déconnecter', () => {
    cy.login(student.email, student.password)

    cy.contains(/déconnecter/i).click()
    cy.contains(/se connecter/i)
  })

  it('je peux changer mon mot de passe', () => {
    cy.login(student.email, student.password)

    cy.contains(/profil/i)
    cy.get('button[name=passwordChange]').click()
    cy.get('input[name=old-password]').type(student.password)
    cy.get('input[name=new-password]').type('nouveau')
    cy.get('input[name=confirm-password]').type('nouveau')
    cy.get('button[type=submit]').click()

    cy.contains(/déconnecter/i).click()
    cy.login(student.email, 'nouveau')
  })

  it('je peux écrire une question, choisir la priorité et la catégorie', () => {
    cy.login(student.email, student.password)
    cy.contains(/Question/i).click()
    
    cy.get('input[name=question-input]').type('Est-ce que je suis un bon élève?')
    cy.get('select[name=priority-select]').select('1')
    cy.get('select[name=category-select]').select('Test')
    cy.get('button[name=submit-question]').click()

    cy.contains(/Question: Est-ce que je suis un bon élève?/)
    cy.contains(/Catégorie: Test/)
    cy.contains(/Nom: Chuck Norris/)
  })
  it('je peux lever la main', () => {
    createQuestion()

    cy.get('img[name=hand]').should($img => {
      const opacity = $img.css('opacity')
      expect(opacity).to.equal('1')
    })
    cy.get('img[name=hand]').click()
    cy.get('img[name=hand]').should($img => {
      const opacity = $img.css('opacity')
      expect(opacity).to.equal('0.5')
    })
  })
  it('je peux baisser la main', () => {
    createQuestion()

    cy.get('img[name=hand]').click()

    cy.get('img[name=hand]').should($img => {
      const opacity = $img.css('opacity')
      expect(opacity).to.equal('0.5')
    })
    cy.get('img[name=hand]').click()
    cy.get('img[name=hand]').should($img => {
      const opacity = $img.css('opacity')
      expect(opacity).to.equal('1')
    })
  })

  it('je peux retirer de la vie au professeur', () =>{
    cy.login(student.email, student.password)
    cy.visit('/classe')

    cy.get('button[name=removeHealth]').click()
    cy.contains(teacher.health - 10)
  })

  it('je peux ajouter de la vie au professeur', () =>{
    cy.login(student.email, student.password)
    cy.visit('/classe')

    cy.get('button[name=addHealth]').click()
    cy.contains(teacher.health + 10)
  })

})
