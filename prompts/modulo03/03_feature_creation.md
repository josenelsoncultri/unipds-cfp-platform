/opsx:new change-id: app-cfp-feature
Objetivo: Implementar o módulo de submissão de palestras (Call for Papers).
Regras Estritas de Arquitetura: 
Frontend: Angular 21 em apps/frontend. Uso obrigatório de Standalone Components, Signals para gestão de estado e WAI-ARIA para acessibilidade.
Backend: NestJS em apps/api. Uso de @Body() com validação estrita via class-validator.
Shared: Ambos devem consumir o contrato SpeakerDTO exportado da lib shared-types.
Qualidade (Testes Unitários Obrigatórios): O plano DEVE prever a criação de testes com Jest. O NestJS precisa de testes garantindo que payloads inválidos sejam rejeitados (400 Bad Request). O Angular precisa de testes validando o estado inicial do Signal e o bloqueio do botão de envio.
Gere os arquivos proposal.md, design.md e o tasks.md. Não escreva nenhum código da aplicação ou teste ainda.