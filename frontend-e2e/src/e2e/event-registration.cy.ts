describe('Cadastro de Evento - E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/event/new');
  });

  it('deve realizar o cadastro de evento com sucesso', () => {
    cy.intercept('POST', '/api/event', {
      statusCode: 201,
      body: {
        nome: 'Tech Conference 2026',
        endereco: 'Av. Paulista, 1000',
        capacidade: 500,
        data: '2026-10-15',
      },
    }).as('saveEvent');

    cy.get('#nome').type('Tech Conference 2026');
    cy.get('#endereco').type('Av. Paulista, 1000');
    cy.get('#capacidade').type('500');
    cy.get('#data').type('2026-10-15');

    cy.get('button.submit-btn').click();

    cy.wait('@saveEvent');
    cy.get('.success-message')
      .should('be.visible')
      .and('contain', 'Evento salvo com sucesso!');
  });

  it('deve exibir mensagens de erro ao submeter o formulário vazio ou interagir com os campos', () => {
    cy.get('#nome').focus().blur();
    cy.get('#endereco').focus().blur();
    cy.get('#capacidade').focus().blur();
    cy.get('#data').focus().blur();

    cy.get('#nome-error')
      .should('be.visible')
      .and('contain', 'Nome é obrigatório.');

    cy.get('#endereco-error')
      .should('be.visible')
      .and('contain', 'Endereço é obrigatório.');

    cy.get('#capacidade-error')
      .should('be.visible')
      .and('contain', 'Capacidade é obrigatória e deve ser maior que zero.');

    cy.get('#data-error')
      .should('be.visible')
      .and('contain', 'Data é obrigatória.');
  });
});
