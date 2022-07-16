Cypress.Commands.add('createUser', ({ name, username, password }) => {
    cy.request({
        url: 'http://localhost:3003/api/users',
        method: 'POST',
        body: { name, username, password }
    })

    cy.visit('http://localhost:3000')
})

Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('loggedBloglistappUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: { title, author, url },
        headers: {
            'Authorization': `bearer ${JSON.parse(window.localStorage.getItem('loggedBloglistappUser')).token}`
        }
    })

    cy.visit('http://localhost:3000')
})