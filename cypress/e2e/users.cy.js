/// <reference types="cypress" />
import { faker} from '@faker-js/faker';
let id = null;
const user = {
  'nome': faker.person.fullName(),
  'email': faker.internet.email(),
  'password': faker.internet.password(),
  'administrador': 'true'
}
describe('Users', () => {
  it('T01 - Create new user admin', () => {
    cy.postRequest('/usuarios',user).then((Response) =>{
      id = Response.body._id
      expect(Response.status).to.eq(201)
      expect(Response.body).to.have.property('_id')
      expect(Response.body.message).to.eq('Cadastro realizado com sucesso')
    })
  })
  it('T02 - Create new user', () => {
    user.administrador = 'false'
    cy.postRequest('/usuarios',user).then((Response) =>{
      id = Response.body._id
      expect(Response.status).to.eq(201)
      expect(Response.body).to.have.property('_id')
      expect(Response.body.message).to.eq('Cadastro realizado com sucesso')
    })
  })
  it('T03 - Search for admin user by ID', () => {
    user.administrador = 'true'
    cy.postRequest('/usuarios',user).then((Response) =>{
      id = Response.body._id
      cy.urlParametersRequest('GET','/usuarios/',id).then((Response)=>{
        expect(Response.status).to.eq(200)
        expect(Response.body).to.have.property('_id')
        expect(Response.body._id).to.eq(id)
        expect(Response.body.nome).to.eq(user.nome)
        expect(Response.body.email).to.eq(user.email)
        expect(Response.body.password).to.eq(user.password)
        expect(Response.body.administrador).to.eq('true')
      })
    })
  })
  it('T04 - Search for a user by ID', () => {
  user.administrador = 'false'
  cy.postRequest('/usuarios',user).then((Response) =>{
    id = Response.body._id
    cy.urlParametersRequest('GET','/usuarios/',id).then((Response)=>{
      expect(Response.status).to.eq(200)
      expect(Response.body).to.have.property('_id')
      expect(Response.body._id).to.eq(id)
      expect(Response.body.nome).to.eq(user.nome)
      expect(Response.body.email).to.eq(user.email)
      expect(Response.body.password).to.eq(user.password)
      expect(Response.body.administrador).to.eq('false')
      }) 
  })
  })
  afterEach(() =>{
    cy.urlParametersRequest('DELETE','/usuarios/',id)
  })
})
