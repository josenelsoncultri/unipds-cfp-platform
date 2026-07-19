/opsx:new add-cfp-dashboard
Objetivo: Criar um dashboard para listar as palestras submetidas.
Backend (NestJS): Adicionar uma rota GET no CfpController que retorne um array de SpeakerDTO.
Frontend (Angular 21): Criar CfpDashboardComponent. Injetar o HttpClient para consumir a rota GET. Gerenciar o estado com Signals (WritableSignal<SpeakerDTOP[]>).
UX/UI (Importante): Aplicar HTML semântico (table ou lista de cards) e manter rigorosamente a identidade visual, o design e as cores (Design Tokens) já estabelecidos no formulário original (CfpFormComponent) para garantir consistência na interface.
Roteamento: Adicionar a rota path: 'dashboard' apontando para o componente. Adicionar um botão de navegação no formulário mantendo o mesmo estilo visual.

/opsx:apply add-cfp-dashboard

/opsx:archive add-cfp-dashboard