/opsx:new create-event-tests
Objetivo: Criar testes E2E tradicionais com Cypress para a tela de Cadastro de Eventos (/event/new).
Localização: Crie o arquivo de teste no projeot E2E gerado (ex: `apps/frontend-e2e/src/e2e/event-registration.cy.ts`).
Diretrizes obrigatórias:
1. Cenário de Sucesso: Navegar até a rota `/event/new`, preencher os campos (Nome, Endereço, Capacidade, Data) usando seletores CSS convencionais (`class`, `id` ou `name`), clicar no botão de submeter e verificar se a submissão ocorreu com sucesso.
2. Cenário de Erro: Navegar até `/event/new`, submeter o formulário vazio e usar asserções para verificar se as mensagens de erro nativas de validação aparecem na tela.
3. Regra de Ouro: Use EXCLUSIVAMENTE a sintaxe tradicional do Cypress (`cy.get()`, `cy.contains()`, `should()`). Não adicione bibliotecas externas de IA neste momento.