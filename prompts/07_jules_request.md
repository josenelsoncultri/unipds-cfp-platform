@jules, atue como Desenvolvedora Full-Stack Sênior.
Implemente a feature de "Cadastro de Local do Evento" no nosso monorepo Nx.

Diretrizes Obrigatórias:
1. Design System: Mantenha rigorosamente o padrão visual, cores e Design Tokens já aplicados no formulário de CFP. O novo formulário deve parecer parte do mesmo sistema.
2. Navegação: Atualize o menu de navegação para conter exatamente estras três opções: "Cadastro de Evento" (/event/new), "Cadastro de Palestra" (/talks/new) e "Dashboard" (/dashboard).
3. Arquitetura: Crie um novo DTO chamado EventDTO em `@cfp-platform/shared-types` contendo: nome, endereço, capacidade e data.
4. Backend (NestJS): Implemente o service/controller para receber o POST e salvar esses dados no array em memória.
5. Frontend (Angular 21): Crie o componente usando Reactive Forms e Signals.

Crie a branch, implemente o código respeitando as regras acima e abra um Pull Request para minha revisão.