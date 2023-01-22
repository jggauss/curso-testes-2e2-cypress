describe('Login e registro de usuários alura pic',()=>{

    beforeEach(()=>{
        cy.visit('https://alura-fotos.herokuapp.com')
    })
   

    it('verifica mensagens validação',()=>{
        cy.contains('a','Register now').click();
        cy.contains('button','Register').click();
        cy.contains('ap-vmessage','Email is required!').should('be.visible')
        cy.contains('button','Register').click();
        cy.contains('ap-vmessage','Full name is required!').should('be.visible')
        cy.contains('ap-vmessage','User name is required!').should('be.visible')
        cy.contains('ap-vmessage','Password is required!').should('be.visible')
    })
    it('verifica mensagens de email inválido',()=>{
        cy.contains('a','Register now').click();
        cy.contains('button','Register').click();
        cy.get('input[formcontrolname="email"]').type('jaqueline');
        cy.contains('ap-vmessage','Invalid e-mail').should('be.visible')
    })
    it('verifica mensagens de senha com menos de 8 caracteres',()=>{
        cy.contains('a','Register now').click();
        cy.contains('button','Register').click();
        cy.get('input[formcontrolname="password"]').type('123');
        cy.contains('button','Register').click();
        cy.contains('ap-vmessage','Mininum length is 8').should('be.visible')
        
    })
    it('verifica mensagens de nome com menos de duas letras',()=>{
        cy.contains('a','Register now').click();
        cy.contains('button','Register').click();
        cy.get('input[formcontrolname="fullName"]').type('A');
        cy.contains('button','Register').click();
        cy.contains('ap-vmessage','Mininum length is 2').should('be.visible')
        
    })
    it('verifica mensagens de Username deve ser letra minúscula',()=>{
        cy.contains('a','Register now').click();
        cy.contains('button','Register').click();
        cy.get('input[formcontrolname="userName"]').type('AAAA');
        cy.contains('button','Register').click();
        cy.contains('ap-vmessage','Must be lower case').should('be.visible');
        
    })
    it.only('Fazer login de usuário válido',()=>{
        cy.login(Cypress.env('userName'),Cypress.env('password'))
        cy.contains('a','(Logout)').should('be.visible');
    })
    it.only('Fazer login de usuário inválido',()=>{
        cy.login('Jaqueline','1234')
        cy.contains('ap-vmessage',"Password is required!").should('be.visible')
        
    })

    const usuarios = require('../../downloads/usuarios.json');
    usuarios.forEach(usuario => {

        it(`registra novo usuario ${usuario.userName} `, () => {
            cy.contains('a', 'Register now').click();
            cy.contains('button', 'Register').click();
            cy.get('input[formcontrolname="email"]').type(usuario.email);
            cy.get('input[formcontrolname="fullName"]').type(usuario.fullName);
            cy.get('input[formcontrolname="userName"]').type(usuario.userName);
            cy.get('input[formcontrolname="password"]').type(usuario.password);
            cy.contains('button', 'Register').click();
        })
    });

})