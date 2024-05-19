describe('Récits enseignant', () => {
    const teacher = {
        email: 'mon@courriel.com',
        password: 'monmotdepasse',
        name: 'Bruce Lee'
    }
    const student = {
        name: 'Chuck Norris',   
        email: 'champ@champ.com',
        password: 'champ',
    }

    beforeEach(() => {
        cy.exec('npm run backend:cypress:seed')
        cy.request('POST', 'http://127.0.0.1:3000/register',{
        email: teacher.email,
        password: teacher.password,
        
      })
    })
    

    it('je peux me connecter', () => {
        cy.visit('/login')
        cy.get('input[name=email-input]').type(teacher.email)
        cy.get('input[name=password-input]').type(teacher.password)
        cy.get('button[type=submit]').click()

        cy.contains(/déconnecter/i)
    })

    it('je peux ajouter un étudiant', () => {
        cy.login(teacher.email, teacher.password)
        cy.visit('/register')
        cy.get('input[name=name-input]').type(student.name)
        cy.get('input[name=email-input]').type(student.email)
        cy.get('input[name=password-input]').type(student.password)
        cy.get('input[name=password-confirmation-input]').type(student.password)
        cy.get('button[type=submit]').click()
    })

    it('je peux supprimer un étudiant', () => {
        cy.login(teacher.email, teacher.password)
        cy.visit('/classe')
        cy.get('button[name=delete]').click()
        
    })

    
  it('je peux me déconnecter', () => {
    cy.login(user.email, user.password)

    cy.contains(/déconnecter/i).click()

    cy.contains(/connexion/i)
  })

  it('je peux changer mon nom complet', () => {
    cy.login(user.email, user.password)

    cy.visit('/profile')
    cy.get('input[name=name-input]').type('Chuck Norris')
    cy.get('button[type=submit]').click()

    cy.contains(/chuck norris/i)
  })

  it('je peux changer mon mot de passe', () => {
    cy.login(user.email, user.password)

    cy.visit('/profile')
    cy.get('input[name=password-input]').type('chuck')
    cy.get('input[name=password-confirmation-input]').type('chuck')
    cy.get('button[type=submit]').click()

    cy.contains(/profil/i)
  }

})