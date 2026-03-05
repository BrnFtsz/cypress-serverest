/// <reference types="cypress" />
import { faker} from '@faker-js/faker';

describe('ServeRest Webpage', () => {
    beforeEach(()=> {
        cy.visit(Cypress.env('webURL'))
    })

    it('T01- Create new user (intercept)', () => {
        cy.get('[data-testid="cadastrar"]').click()
        cy.intercept('POST','/usuarios').as('createUser')
        cy.get('[data-testid="nome"]').type(faker.person.fullName())
        cy.get('[data-testid="email"]').type(faker.internet.email())
        cy.get('[data-testid="password"]').type(faker.internet.password())
        cy.get('[data-testid="cadastrar"]').click()
        cy.get('body').contains('Cadastro realizado com sucesso').should('be.visible')
        cy.wait('@createUser').then((interception)=>{
            var id = interception.response.body._id
            cy.urlParametersRequest('DELETE','/usuarios/',id)
        })
    })
    it('T02- Add new product on shopping cart (fixture and api)', () => {
        cy.fixture('user').then((user)=>{
        user.email = faker.internet.email()
        cy.postRequest('/usuarios',user).then((Response) =>{
        let id = Response.body._id
        cy.get('[data-testid="email"]').type(user.email)
        cy.get('[data-testid="senha"]').type(user.password)
        cy.get('[data-testid="entrar"]').click()
        cy.get('[data-testid="adicionarNaLista"]').eq(0).click()
        cy.get('[data-testid="shopping-cart-product-name"]').should('be.visible').and('contain', 'Produto')
        cy.urlParametersRequest('DELETE','/usuarios/',id)
            })
        })
        
    })
})
