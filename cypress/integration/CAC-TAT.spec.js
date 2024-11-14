/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title(describe).should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName').type('Nathan')
        cy.get('#lastName').type('mesquita')
        cy.get('#email').type('Nathanmesquita@gmail.com')
        cy.get('#open-text-area').type('Acredita em anjo Pois é, sou o seuSoube que anda tristeQue sente falta de alguémQue não quer amar ninguémisso estou aquiVim cuidar de vocêTe proteger, te fazer sorrirTe entender, te ouvirE quando tiver cansadaCantar pra você dormir', {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Nathan')
        cy.get('#lastName').type('mesquita')
        cy.get('#email').type('Nathanmesquita&gmail.com..br')
        cy.get('#open-text-area').type('quero Caféee')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')


    })
    it('Numero de telefone falso', function() {
        cy.get('#firstName').type('Nathan')
        cy.get('#lastName').type('mesquita')
        cy.get('#email').type('Nathanmesquita@gmail.com.br')
        cy.get('#phone').type('shimbalaie')
            .should('have.value', '')
        cy.get('#open-text-area').type('quero Caféee')
        cy.contains('button', 'Enviar').click()

    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Nathan')
        cy.get('#lastName').type('mesquita')
        cy.get('#email').type('Nathanmesquita@gmail.com.br')
    
        cy.get('#phone-checkbox').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Nathan').should('have.value', 'Nathan')
        .clear().should('have.value', '')

        cy.get('#lastName').type('Mesquita').should('have.value', 'Mesquita')
        .clear().should('have.value', '')

        cy.get('#email').type('Nathanmesquita@gmail.com').should('have.value', 'Nathanmesquita@gmail.com')
        .clear().should('have.value', '')

        cy.get('#phone').type('11941056098').should('have.value', '11941056098')
        .clear().should('have.value', '')

})
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {

    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')

})
    it('envia o formuário com sucesso usando um comando customizado', function() {    
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')

    })

    it('Função usando o Contains', function() {    
        cy.fillMandatoryFieldsAndSubmit()
        cy.contains('button','Enviar').click()

})
    it('seleciona um produto (YouTube) por seu texto', function(){
    cy.get('#product').select('YouTube')
        .should('have.value', 'youtube')

    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria')
        .should('have.value', 'mentoria')
            
            
})
    it('seleciona um produto (Blog) por seu índice', function(){
    cy.get('#product').select(1)
        .should('have.value', 'blog')
        })

    it('marca o tipo de atendimento "Feedback"', function(){
    cy.get('input[type="radio"]').check('feedback')
        .should('have.value', 'feedback')
   
})

    it('marca cada tipo de atendimento', function(){
    cy.get('input[type="radio"]')
        .should('have.length', 3)
    
        .each(($radio) => {
            cy.wrap($radio).check()
                .should('be.checked')
})
       
})

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"').check().last()
            .uncheck()
                .should('not.be.checked')

}) 
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Nathan')
        cy.get('#lastName').type('mesquita')
        cy.get('#email').type('Nathanmesquita@gmail.com.br')

        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    
})

    it('Seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[id="file-upload"]')
            .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
            .should(function(input){
                expect(input[0].files[0].name).to.equal('example.json')
            })
        
 
    })  
    
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[id="file-upload"]')
            .should('not.have.value')
        .selectFile('cypress/fixtures/example.json' , {action: 'drag-drop'} )
            .then(input =>  {
                expect(input[0].files[0].name).to.equal('example.json')
            })
            
    })   
    
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[id="file-upload"]')
          .selectFile('@sampleFile')
          .should(function(input){
            expect(input[0].files[0].name).to.equal('example.json')
            
    
    })
        
     })  

     it('verifica que a politica de privacidade abre em outrar aba sem a necessidade de um clique', function(){
     cy.get('a[href="privacy.html"]')
        .should('have.attr', 'target', '_blank')

    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('a[href="privacy.html"]')
           .invoke('removeAttr', 'target').click()

           cy.contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT. Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real. No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino.')             
            .should('be.visible')

        })
    it('testa a página da política de privacidade de forma independente', function(){
        cy.visit('./src/privacy.html')

        cy.contains('Talking About Testing')             
            .should('be.visible')

})

})