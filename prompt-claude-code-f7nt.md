# Prompt para Claude Code — f7nt.co E-commerce (Next.js + CartPanda)

---

## 🧠 PASSO 0 — OBRIGATÓRIO: Brainstorming com Superpowers

Antes de escrever qualquer código, execute o comando `/brainstorm` da biblioteca Superpowers. Use-o para fazer um brainstorming completo do projeto, mapeando:
- Arquitetura técnica
- Fluxo de dados (CartPanda API → Next.js → usuário)
- Lógica de negócio customizada (sistema de entries)
- Potenciais riscos e decisões de design
- Ordem de implementação por prioridade

Só avance para a implementação após o brainstorming estar aprovado.

---

## 📋 Contexto do Projeto

### O que é o f7nt.co
Loja de e-commerce com modelo de **sweepstakes** (sorteio): clientes compram produtos físicos e digitais e acumulam **entries** (entradas) automáticas para concorrer a prêmios (atualmente: BMW M4 Cummins 2026 + $10.000 em cash).

**Regra principal:** cada $1 gasto = X entries automáticas (o multiplicador varia conforme promoções ativas). As entries são calculadas com base no valor total do carrinho e submetidas automaticamente quando o pedido é confirmado.

### O que estamos fazendo
Migrar a loja atual (Shopify) para uma arquitetura **headless** com:
- **Frontend:** Next.js 14 (App Router) + Tailwind CSS → hospedado na Vercel
- **Backend/Commerce:** CartPanda API v3 (produtos, pedidos, checkout)
- **Repositório:** `f7nt-ecom` no GitHub (novo repositório, separado do tema Shopify antigo)

### Referência visual e de código
O tema Shopify existente (`https://github.com/phzus/f7nt-shopify-theme.git`) deve ser clonado como **referência APENAS** — para entender o layout, lógica de entries, componentes e identidade visual. **NÃO migrar o código Liquid diretamente.** Reescrever tudo em React/Next.js inspirado nas funcionalidades existentes.

---

## 🎨 Design System

### Identidade Visual (extraída da loja atual)
- **Cores primárias:** Preto (`#000000`), Verde neon (`#00FF41` ou similar), Vermelho (`#FF0000`)
- **Background padrão:** Preto total `#000000` ou `#0a0a0a`
- **Texto:** Branco `#ffffff` sobre fundo escuro
- **Fonte headings:** Bold, impactante (tipo impacto ou similar — verificar no repo Shopify)
- **Estilo geral:** Alta energia, motorsport, premium dark mode

### Componentes globais obrigatórios
- **Announcement bar** no topo (texto rotativo de promoções)
- **Header/Nav:** Logo F7NT.CO + links (Home, Catalog, Contact) + ícones de busca, conta, carrinho com badge
- **Footer** com links essenciais
- **Carrinho:** Slide-out drawer lateral com cálculo de entries visível em tempo real

---

## 🗂️ Estrutura de Páginas e Rotas

```
app/
├── page.tsx                    → Home (landing page principal)
├── catalog/
│   └── page.tsx                → Listagem de todos os produtos
├── products/
│   └── [slug]/
│       └── page.tsx            → Página de produto individual (PDP)
├── cart/
│   └── page.tsx                → Página de carrinho (opcional — priorizar drawer)
├── contact/
│   └── page.tsx                → Página de contato
└── layout.tsx                  → Layout global (header, footer, providers)
```

---

## 🏠 Home Page — Seções obrigatórias

1. **Hero Section**
   - Imagem/vídeo do prêmio principal (BMW M4)
   - Título grande: "WIN THIS [ANO] [PRÊMIO]"
   - CTA button → anchor para produtos ou link para /catalog

2. **Entries Multiplier Banner**
   - Destaque visual do multiplicador atual ("200X ENTRIES", "Every $1 spent = 200 ENTRIES")
   - Caixa explicativa "HOW TO ENTER" (3 passos: SHOP → CHECK OUT → ENTERED)

3. **Countdown Timer**
   - Componente de contagem regressiva (dias/horas/minutos/segundos)
   - Data configurável via variável de ambiente ou prop
   - Label: "OFFER EXPIRING IN:"

4. **Fast Pass Tiers** (produtos em destaque)
   - Grid de 4 cards: BLACK (100k entries), PLATINUM (80k), GOLD (30k), BRONZE (15k)
   - Cada card: imagem, badge colorido com quantidade de entries, título, botão "ADD TO CART"
   - Cores dos badges: BLACK (vermelho escuro), PLATINUM (azul), GOLD (dourado), BRONZE (bronze)

5. **Mystery Cash Boxes Banner**
   - Seção destacada para os mystery boxes
   - Design dark com imagem e descrição

6. **Apparel / Catálogo geral**
   - Grid de produtos de apparel (hoodies, camisetas, bonés)
   - Cards com imagem, nome, preço, botão "ADD TO CART"

---

## 📦 Página de Produto (PDP)

- Galeria de imagens do produto (carousel/zoom)
- Nome, preço, descrição
- Seletor de variantes (tamanho, cor) se aplicável
- Seletor de quantidade
- Botão "Add to Cart" → adiciona ao carrinho local
- Botão "Buy it Now" → vai direto para checkout CartPanda
- Exibição das **entries** que o produto gera (ex: "This product gives you 80,000 ENTRIES")
- Relacionados / outros produtos

---

## 🛒 Sistema de Carrinho

### Lógica de estado
- Usar **React Context + useReducer** ou **Zustand** para estado global do carrinho
- Persistir no `localStorage` para manter entre sessões
- Carrinho é **client-side** — não usar CartPanda Cart API para estado (simplifica a arquitetura)

### Cálculo de entries em tempo real
```
totalEntries = Math.floor(cartTotal) * currentMultiplier
```
- `currentMultiplier` vem de uma variável de ambiente configurável (ex: `NEXT_PUBLIC_ENTRIES_MULTIPLIER=200`)
- Mostrar entries calculadas no drawer do carrinho e no checkout

### Checkout redirect
Ao clicar em "Checkout", montar a URL do checkout CartPanda com os produtos do carrinho e redirecionar. Verificar na documentação da CartPanda API v3 como gerar o checkout URL:
- Base: API v3 em `https://api.cartpanda.com/v3/`
- Autenticação: Bearer Token (definir em `CARTPANDA_API_TOKEN` no .env)
- Endpoint de criação de checkout/pedido: verificar `POST /checkouts` ou `POST /orders`

---

## 🔌 Integração CartPanda API

### Configuração
```env
CARTPANDA_API_TOKEN=seu_token_aqui
CARTPANDA_STORE_DOMAIN=f7nt.cartpanda.com  # confirmar domínio
NEXT_PUBLIC_ENTRIES_MULTIPLIER=200
NEXT_PUBLIC_SITE_URL=https://f7nt.co
```

### Para encontrar o API Token na CartPanda
Acessar o painel CartPanda → Admin (canto inferior esquerdo) → Configurações → procurar seção "API", "Tokens" ou "Integrações". Alternativamente em `accounts.cartpanda.com/settings/api`.

### Endpoints a usar

| Funcionalidade | Endpoint |
|---|---|
| Listar produtos | `GET /products` |
| Produto individual | `GET /products/{id}` ou `GET /products?handle={slug}` |
| Criar checkout | `POST /checkouts` ou endpoint equivalente |
| Listar coleções | `GET /collections` |

### Estratégia de fetch
- **Produtos (listagem):** `generateStaticParams` + ISR com `revalidate: 3600` (1h)
- **Produto individual:** ISR com `revalidate: 1800` (30min)
- **Cart/Checkout:** Client-side apenas

---

## ⚙️ Configuração do Projeto

### Setup inicial
```bash
npx create-next-app@latest f7nt-ecom --typescript --tailwind --eslint --app --src-dir=false
cd f7nt-ecom
git init
git remote add origin https://github.com/phzus/f7nt-ecom.git  # novo repo
```

### Dependências essenciais
```bash
npm install zustand                    # estado do carrinho
npm install @radix-ui/react-dialog     # modal/drawer do carrinho
npm install lucide-react               # ícones
npm install clsx tailwind-merge        # utility classes
npm install sharp                      # otimização de imagens Next.js
```

### Estrutura de pastas
```
f7nt-ecom/
├── app/                    → rotas (App Router)
├── components/
│   ├── ui/                 → componentes base (Button, Badge, etc.)
│   ├── layout/             → Header, Footer, AnnouncementBar
│   ├── cart/               → CartDrawer, CartItem, CartSummary
│   ├── product/            → ProductCard, ProductGallery, VariantSelector
│   └── home/               → Hero, CountdownTimer, FastPassTiers, etc.
├── lib/
│   ├── cartpanda.ts        → funções de chamada à API CartPanda
│   ├── cart-store.ts       → Zustand store do carrinho
│   └── utils.ts            → helpers (formatPrice, calcEntries, etc.)
├── types/
│   └── cartpanda.ts        → TypeScript types para produtos, variantes, etc.
├── hooks/
│   └── useCart.ts          → hook de acesso ao carrinho
└── .env.local              → variáveis de ambiente (não comitar)
```

---

## 🧩 Componentes Críticos a Implementar

### 1. `<CountdownTimer />`
- Props: `targetDate: Date`
- Atualiza a cada segundo com `setInterval`
- Exibe: DAYS / HOURS / MINUTES / SECONDS
- Quando chega em zero, mostra mensagem de encerramento

### 2. `<EntriesCalculator />`
- Recebe `cartTotal: number` e `multiplier: number`
- Retorna formatado: "Your order earns **40,000 ENTRIES**"
- Usar em: CartDrawer, CartSummary, ProductCard

### 3. `<CartDrawer />`
- Slide-in pelo lado direito
- Lista de itens com imagem, nome, quantidade, preço
- Entries calculadas em tempo real
- Botão "Checkout" → redireciona para CartPanda

### 4. `<ProductCard />`
- Imagem (next/image otimizado)
- Badge de entries (quando aplicável)
- Nome, preço
- Botão "Add to Cart" com feedback visual (loading, added)

### 5. `<FastPassCard />`
- Versão especial do ProductCard para os tiers
- Badge colorido por tier (BLACK/PLATINUM/GOLD/BRONZE)
- Destaque das entries e benefícios inclusos
- CTA mais proeminente

---

## 🚀 Deploy na Vercel

### Configuração
1. Push do repositório para GitHub (`f7nt-ecom`)
2. Conectar repositório na Vercel (`vercel.com/new`)
3. Configurar variáveis de ambiente no painel Vercel
4. Domínio customizado: `f7nt.co` apontado para a Vercel

### Variáveis de ambiente na Vercel
Configurar todas as variáveis do `.env.local` no painel da Vercel (Settings > Environment Variables).

---

## ✅ Ordem de Implementação Sugerida

1. **Setup do projeto** (Next.js, Tailwind, estrutura de pastas, git)
2. **Types e lib CartPanda** (TypeScript types + funções de API)
3. **Componentes de layout** (Header, Footer, AnnouncementBar)
4. **Cart Store** (Zustand + localStorage + lógica de entries)
5. **CartDrawer** (componente crítico para todo o fluxo)
6. **Página de Catalog** (grid de produtos com dados da API)
7. **Página de Produto (PDP)** (com variantes e add-to-cart)
8. **Home page** (Hero, Countdown, FastPass tiers, sections)
9. **Checkout redirect** (integração com CartPanda checkout URL)
10. **Página de Contact** (formulário simples)
11. **Testes e ajustes visuais** (comparar com loja Shopify existente)
12. **Deploy Vercel + domínio**

---

## 📐 Regras de Qualidade

- **TypeScript strict** em todo o projeto — sem `any`
- **Sem dados hardcoded** — tudo vem da API CartPanda ou variáveis de ambiente
- **Performance:** usar `next/image` para todas as imagens, lazy loading, ISR para produtos
- **Mobile-first:** todos os componentes responsivos (mobile, tablet, desktop)
- **Acessibilidade:** aria-labels em botões, navegação por teclado no carrinho
- **Error boundaries:** tratar erros de API com fallbacks elegantes
- **Loading states:** skeletons durante fetch de produtos

---

## ⚠️ Pontos de Atenção / Riscos

1. **Checkout CartPanda:** verificar na API v3 (`dev.cartpanda.com/docs/api-v3`) como gerar uma URL de checkout com produtos pré-carregados. Se não existir endpoint, usar o link direto de produto do CartPanda como fallback.

2. **Produtos fisicos vs digitais:** Fast Pass são produtos digitais — verificar se CartPanda tem tratamento diferente para fulfillment de digitais.

3. **Entries display no checkout:** o checkout é da CartPanda (não controlamos o layout) — o cálculo de entries deve ser exibido claramente antes do redirect.

4. **Imagens dos produtos:** usar os handles/slugs da API CartPanda para construir as rotas, não os da Shopify.

---

## 🔗 Referências

- **Loja Shopify atual (referência visual):** https://f7nt-co-2.myshopify.com/
- **Código Shopify (referência de lógica):** https://github.com/phzus/f7nt-shopify-theme.git
- **CartPanda API v3 docs:** https://dev.cartpanda.com/docs/api-v3
- **CartPanda painel:** https://accounts.cartpanda.com
- **Superpowers:** https://github.com/obra/superpowers
