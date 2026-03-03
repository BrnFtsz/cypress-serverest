Cypress.Commands.add('postRequest',(endpoint,body) =>{
    return cy.request({
        method: 'POST', 
        url: endpoint, 
        body: body, 
        headers: {'accept':'application/json', 'Content-type':'application/json'},
        failOnStatusCode:false
    })
})

Cypress.Commands.add('urlParametersRequest',(method,endpoint,parameter) => {
    return cy.request({
    method:method,
    url:endpoint + parameter,
    headers:{'accept':'application/json', 'Content-type':'application/json'},
    failOnStatusCode:false
})
})
