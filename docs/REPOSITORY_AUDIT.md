# Repository Audit — TUNE LAB 2.0

Repositório: `gewkesports/friend-finder` | Branch: `main`

## Estado encontrado

O repositório atual é um scaffold do Lovable com React 19, TypeScript 5, TanStack Start/Router, Vite 8, Tailwind CSS 4, Radix UI, Zod e React Query.

## Encontrado

- `.lovable/project.json`
- `src/components/ui/`
- `src/hooks/`
- `src/lib/`
- `src/routes/`
- `src/router.tsx`
- `src/server.ts`
- `src/start.ts`
- `src/styles.css`
- configurações TypeScript/Vite/ESLint/Prettier

## Não encontrado

- Supabase
- migrations
- seed
- autenticação
- RLS
- entidades GT7
- catálogo de carros
- catálogo de pistas
- motor de setup
- validação/clamp de limites
- camada de IA
- histórico
- feedback
- comunidade
- favoritos
- avaliações

A busca no código também não encontrou implementação para GT7, setup ou Supabase.

## Interface atual

A rota `/` ainda contém o placeholder padrão de página vazia do Lovable. Não existe uma UI anterior do produto que precise ser preservada.

## Decisões

1. Manter o stack atual.
2. GitHub permanece como fonte de verdade.
3. Claude Code realiza a maior parte do desenvolvimento.
4. Lovable fica como visualizador/validador e para pequenos ajustes.
5. Introduzir domínio GT7 separado da UI.
6. Introduzir Supabase após definir o modelo de dados.
7. Manter IA atrás de uma interface de provider.
8. Criar seed determinístico.
9. Criar validação independente da IA.
10. Implementar UX depois de domínio, dados e regras críticas.

## Próxima etapa

Modelar schema, migrations, seed dos 79 carros e 121 layouts, limites, enums e contratos Zod. Depois disso iniciar a interface principal.
