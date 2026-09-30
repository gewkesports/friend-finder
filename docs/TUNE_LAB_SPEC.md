# TUNE LAB 2.0 — Especificação Técnica

## 1. Objetivo

Reconstruir do zero o TUNE LAB como um engenheiro virtual de setups para Gran Turismo 7 (GT7), preservando o conhecimento estrutural do produto anterior e evoluindo arquitetura, UX, confiabilidade, validação e capacidade futura de SaaS.

O produto deve transformar contexto de carro + pista + condições + objetivo + estilo + dificuldade + histórico + feedback em um setup estruturado, validado e iterável.

## 2. Fonte de verdade

- GitHub é a fonte única do código.
- Lovable permanece conectado apenas para visualizar/executar e, se necessário, pequenos ajustes.
- Claude Code realiza a maior parte do desenvolvimento.
- Não criar implementação paralela dependente apenas do Lovable.
- Não reescrever histórico Git publicado nem fazer force-push/rebase/amend/squash em commits sincronizados com Lovable.

## 3. Regras de dados

Nunca inventar dados de GT7.

Separar explicitamente:
1. dados oficiais/estruturados do catálogo;
2. dados enviados pela comunidade;
3. inferências/recomendações da IA.

Quando um dado não estiver confirmado:
- armazenar como desconhecido/null quando apropriado;
- não transformar estimativa em fato;
- solicitar confirmação quando necessária;
- não inventar limites de ajuste.

### Inconsistência do catálogo inicial

O material-base afirma 79 carros, porém a enumeração fornecida contém 78 registros:
- Gr.1: 20
- Gr.3: 28
- Gr.4: 30
- total enumerado: 78

O sistema deve manter o catálogo enumerado sem inventar um 79º carro. Essa divergência deve permanecer registrada como pendência de reconciliação.

O catálogo de pistas possui 121 layouts enumerados. O layout `Kyoto Driving Park - Miyabi (invertida)` é explicitamente proibido e não deve ser criado.

## 4. Contexto de geração

A função de geração deve receber um objeto estruturado contendo, quando disponível:

### Carro
- fabricante
- modelo
- ano
- categoria
- drivetrain
- peso
- potência
- limites conhecidos
- confiança dos limites

### Pista
- nome
- venue
- país
- layout
- comprimento
- elevação
- número de curvas
- reta mais longa
- características oficiais
- características da comunidade
- quantidade de amostras

### Piloto
- pneus
- condição climática
- objetivo
- estilo
- áreas de dificuldade
- observações livres

### Iteração
- setup anterior
- feedback estruturado
- feedback livre
- histórico de versões

## 5. Pneus e condições

Pneus:
- Racing Hard
- Racing Medium
- Racing Soft
- Intermediate
- Heavy Wet

Condições:
- seco
- chuva
- híbrido/variável

Chuva:
- leve
- média
- forte
- pista secando
- pista molhada

Evolução:
- estável
- secando ao longo da corrida
- molhando ao longo da corrida

## 6. Objetivos

- Qualificação
- Corrida
- Consistência
- Velocidade máxima
- Curvas
- Frenagem
- Tração
- Estabilidade
- Rotação
- Baixo desgaste dos pneus
- Performance geral

## 7. Estilo

- Neutro
- Mais estável
- Mais agressivo
- Mais dianteiro
- Mais traseiro
- Mais fácil de controlar
- Mais rápido mesmo sendo arisco

## 8. Áreas de dificuldade

- Entrada de curva
- Meio da curva
- Saída
- Frenagem
- Alta velocidade
- Baixa velocidade
- Zebras
- Mudança de direção

## 9. Domínio de pista

O motor deve considerar:
- tamanho e quantidade de retas;
- importância da velocidade máxima;
- diferença de velocidade entre setores;
- curvas de baixa/média/alta velocidade;
- hairpins;
- chicanes;
- raio variável;
- subidas/descidas;
- mudanças bruscas de elevação;
- curvas em subida/descida;
- altura e utilização das zebras;
- perda de estabilidade nas zebras;
- zonas de frenagem forte;
- frenagens em descida;
- frenagem em curva;
- importância da estabilidade;
- saídas lentas;
- importância da tração;
- importância da velocidade máxima;
- necessidade de downforce.

## 10. Parâmetros de setup

### Suspensão dianteira
- altura
- taxa de compressão
- taxa de expansão
- frequência natural
- barra estabilizadora
- cambagem
- ângulo de convergência

### Suspensão traseira
- altura
- taxa de compressão
- taxa de expansão
- frequência natural
- barra estabilizadora
- cambagem
- ângulo de convergência

### Diferencial
- torque inicial
- sensibilidade de aceleração
- sensibilidade de frenagem

### Aerodinâmica
- downforce dianteiro
- downforce traseiro

## 11. Limites

Limites fixos conhecidos no material-base:
- barra estabilizadora: 1–10
- cambagem: 0–6
- convergência: -1.00 a +1.00
- diferencial — torque inicial: 0–30
- diferencial — aceleração: 0–100
- diferencial — frenagem: 0–100

Outros limites devem ser armazenados por carro quando confirmados.

### Pipeline obrigatório

1. obter limite conhecido;
2. analisar contexto;
3. calcular recomendação;
4. gerar setup;
5. validar setup;
6. aplicar clamp;
7. validar novamente;
8. mostrar ao usuário.

Se o limite for desconhecido, não inventar. Usar `null` quando necessário e mostrar aviso.

A IA não pode gerar parâmetros inexistentes no veículo.

## 12. Contrato da IA

A camada de IA deve ser desacoplada do provedor.

Interface conceitual:

```text
AI Provider
    ↓
generateSetup(context)
```

O restante da aplicação não deve depender de um fornecedor/modelo específico.

A saída deve ser JSON validável:

```json
{
  "setup": {
    "front": {},
    "rear": {},
    "diff": {},
    "aero": {}
  },
  "reasoning": {
    "suspensao": "",
    "diferencial": "",
    "aerodinamica": "",
    "resumo": ""
  },
  "changes": [],
  "confidence": 0,
  "warnings": []
}
```

A aplicação deve validar a resposta antes de aceitar qualquer valor.

## 13. Iteração

O diferencial central é o ciclo:

```text
Setup V1
  ↓
Teste no GT7
  ↓
Feedback
  ↓
Análise
  ↓
Setup V2
  ↓
...
```

Com setup anterior + feedback, a IA deve modificar o setup anterior, e não gerar um setup aleatório.

Cada mudança deve registrar:
- parâmetro;
- valor anterior;
- novo valor;
- motivo;
- problema que pretende corrigir.

## 14. Feedback

Feedback estruturado:
- entrada de curva;
- meio da curva;
- saída;
- frenagem;
- alta velocidade;
- baixa velocidade;
- tração;
- estabilidade.

Escala:
- Muito ruim
- Ruim
- Neutro
- Bom
- Muito bom

Também haverá observação livre.

## 15. Persistência

Entidades planejadas:

- users
- user_preferences
- cars
- tracks
- track_feedback
- car_setup_limits
- setups
- setup_versions
- setup_feedback
- setup_likes
- saved_setups

A separação de proveniência deve ser preservada no modelo de dados.

## 16. Segurança

- autenticação;
- RLS no Supabase;
- dados privados isolados por usuário;
- setups publicados podem ser públicos conforme regras de publicação;
- dados comunitários não viram automaticamente verdade absoluta.

## 17. Confiança

A confiança deve considerar:
- número de amostras;
- concordância;
- volume de dados;
- consistência.

Poucos usuários → confiança menor.
Vários usuários concordando → confiança maior.
Grande divergência → confiança menor.

Inferências nunca devem ser apresentadas como certeza.

## 18. Comunidade

Funcionalidades:
- publicar setup;
- visualizar;
- pesquisar;
- filtrar;
- curtir;
- salvar;
- avaliar de 1 a 5 estrelas;
- média;
- quantidade de avaliações;
- setups próprios;
- setups salvos.

A comunidade também será uma fonte de aprendizado, com peso proporcional à qualidade/confiabilidade dos dados.

## 19. UX

Fluxo principal:

1. Escolha seu carro
2. Escolha a pista
3. Escolha pneus
4. Informe condição
5. Escolha objetivo
6. Informe como gosta de pilotar
7. Informe o problema
8. Gere o setup

A interface deve revelar apenas o necessário em cada etapa.

Priorizar:
- cards;
- chips;
- seleção visual;
- busca;
- filtros;
- autocomplete;
- presets;
- explicações curtas;
- valores pré-preenchidos;
- memória de preferências.

## 20. Seleção de pista

Agrupar por venue/circuito e permitir:
- pesquisa;
- país;
- comprimento;
- curvas;
- maior reta;
- elevação;
- variantes.

Mostrar dados da pista antes da confirmação.

## 21. Seleção de carro

Filtros:
- Gr.1
- Gr.3
- Gr.4

Busca por fabricante/modelo.

Ordenação:
- alfabética;
- potência;
- peso;
- mais novo;
- mais velho.

Ao selecionar:
- categoria;
- tração;
- peso;
- potência;
- limites conhecidos;
- confiança dos limites.

## 22. Resultado

Separar visualmente:
- suspensão dianteira;
- suspensão traseira;
- diferencial;
- aerodinâmica.

Depois mostrar:
- por que este setup;
- confiança;
- avisos;
- pontos fortes;
- possíveis compromissos.

O resultado deve ser legível enquanto o usuário está no GT7:
- números grandes;
- agrupamento claro;
- unidades;
- copiar;
- responsividade;
- experiência mobile.

## 23. Histórico

Cada setup possui versões V1, V2, V3 etc.

Cada versão registra:
- data;
- setup;
- feedback;
- alterações;
- confiança;
- observações.

Deve ser possível comparar versões.

## 24. Onboarding

O primeiro uso deve explicar:
- TUNE LAB é o engenheiro virtual de GT7;
- escolha o carro;
- escolha a pista;
- diga como quer o comportamento;
- teste;
- volte com feedback;
- evolua o setup junto com o sistema.

## 25. Arquitetura

Base:
- TypeScript;
- React;
- TanStack Start/Router;
- componentes reutilizáveis;
- funções puras;
- Zod;
- Supabase;
- autenticação;
- RLS.

Separação por domínio:

```text
src/
  domain/
  data/
  ai/
  database/
  components/
  routes/
  services/
```

Lógica crítica não deve ficar em componentes gigantes.

Dados críticos não devem ficar espalhados pela UI.

## 26. Estratégia SaaS

O MVP deve ser construído já com separação suficiente para evoluir para:
- contas;
- planos;
- limites de uso;
- histórico;
- comunidade;
- setups privados/públicos;
- analytics;
- provedores de IA intercambiáveis;
- recursos premium;
- administração do catálogo.

Não implementar billing antes de o domínio principal estar estável.

## 27. Estratégia de desenvolvimento

Ordem obrigatória:

1. auditoria do projeto atual;
2. documentação;
3. schema;
4. migrations;
5. seed;
6. domínio GT7;
7. motor de limites/validação;
8. camada de IA;
9. autenticação;
10. fluxo de novo setup;
11. resultado;
12. histórico;
13. comunidade;
14. refinamento visual.

Após cada etapa:
- commit;
- validar build/lint/testes;
- registrar resultado;
- não avançar se houver erro estrutural.

## 28. Critérios de aceite

Antes de considerar a base concluída:
- TypeScript sem erros;
- build funcionando;
- autenticação funcionando;
- banco funcionando;
- RLS funcionando;
- catálogo enumerado preservado;
- 121 layouts presentes;
- divergência dos 79/78 carros resolvida por confirmação, sem invenção;
- limites funcionando;
- JSON da IA validado;
- clamp funcionando;
- histórico funcionando;
- feedback funcionando;
- comunidade funcionando;
- responsividade funcionando.

Testes mínimos:
- limites;
- clamp;
- estrutura do setup;
- geração;
- validação;
- filtros;
- dados de carros;
- dados de pistas.
