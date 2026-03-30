# PENDÊNCIAS — f7nt.co (Next.js) para entrega final

> Gerado em: 2026-03-29 após diagnóstico completo comparando localhost:3000 com https://f7nt-co-2.myshopify.com/
> Tarefas ordenadas por prioridade. Cole este arquivo para o Claude Code implementar.

---

## 🔴 CRÍTICO — 404s em páginas que devem existir

### 1. `/cart` → redirecionar para home (carrinho é drawer)
**Problema:** `/cart` retorna 404. Se alguém acessar esse URL (links externos, botões, anúncios) vai cair em página de erro.
**Solução:** Adicionar redirect em `next.config.ts`:
```js
async redirects() {
  return [
    { source: '/cart', destination: '/', permanent: false },
    { source: '/collections/:path*', destination: '/catalog', permanent: true },
    { source: '/pages/giveaway', destination: '/#giveaway', permanent: false },
    { source: '/pages/faq', destination: '/#faq', permanent: false },
  ]
}
```
**Arquivo:** `next.config.ts`

---

### 2. `/collections/all` e `/collections/fast-pass` → 404
**Problema:** URLs padrão do Shopify que podem estar em links externos/anúncios/Google.
**Solução:** Incluir no bloco de redirects acima: `/collections/:path*` → `/catalog`

---

### 3. `/pages/giveaway` → 404
**Problema:** O botão "ALL THE DETAILS" na Shopify aponta para uma página de giveaway.
**Solução A (simples):** Redirect para `/catalog` ou `/#giveaway`
**Solução B (completa):** Criar `app/pages/giveaway/page.tsx` com detalhes completos do sorteio (regras, prêmio, como participar, AMOE)

---

## 🟠 ALTO — Diferenças de layout Home vs Shopify

### 4. Ordem das seções na Home está diferente
**Shopify (correto):**
1. Hero
2. Entry Banner (200X ENTRIES)
3. Countdown
4. Fast Pass Grid
5. Mystery Banner
6. **NEW RELEASES** (grid de produtos — hoodie, cap, mystery box)
7. **Giveaway/BMW Section**
8. **APPAREL** (segundo grid de produtos — camisetas)
9. Testimonials
10. FAQ

**Next.js (atual):**
1. Hero ✅
2. Entry Banner ✅
3. Countdown ✅
4. Fast Pass ✅
5. Mystery Banner ✅
6. **Giveaway/BMW** ← ERRADO (aparece antes dos produtos)
7. **NEW ARRIVALS** (um único grid) ← deveria ser dois grids separados
8. Testimonials ✅
9. FAQ ✅

**Solução em `app/page.tsx`:** Reordenar seções e separar em dois grids de produtos:
```tsx
// Ordem correta:
<HeroSection />
<EntryBoosterBanner />
<CountdownTimer />
<FastPassGrid ... />
<MysteryBanner />
<FeaturedProducts title="NEW RELEASES" products={newReleases} /> {/* primeiros 4 */}
<GiveawaySection />
<FeaturedProducts title="APPAREL" eyebrow="APPAREL" products={apparel} /> {/* próximos 4 */}
<TestimonialsSection />
<FaqSection />
```

---

### 5. Mystery Banner: imagem errada + texto errado
**Problema:** Está usando `car-1.png` (foto do BMW). Deveria ter imagem do Mystery Box (caixa azul com dinheiro voando).
**Texto atual:** "Open a mystery box for a chance to win instant cash prizes..."
**Texto correto (Shopify):** "LIMITED EDITION / MYSTERY CASH BOXES / LOADED WITH MYSTERY APPAREL & ACCESSORIES! / 🏆 LUCKIEST PRODUCT / MORE THAN 30 WINNERS BOUGHT ONE!"

**Solução em `components/home/MysteryBanner.tsx`:**
- Substituir `car-1.png` pela imagem real do mystery box (adicionar em `/public/images/mystery-box.png`)
- Atualizar o texto para corresponder à Shopify:
  - Label: "LIMITED EDITION"
  - H2: "MYSTERY CASH BOXES"
  - Subtítulo: "LOADED WITH MYSTERY APPAREL & ACCESSORIES!"
  - Badge: "🏆 LUCKIEST PRODUCT"
  - Body: "MORE THAN 30 WINNERS BOUGHT ONE!"

---

### 6. Giveaway Section: texto e headline diferentes da Shopify
**Texto Shopify:** "THIS MURDERED OUT BMW M4 COULD BE YOURS" + body copy longo sobre o carro
**Texto Next.js atual:** "WIN THIS 2026 BMW M4 CUMMINS" (muito curto)

**Solução em `components/home/GiveawaySection.tsx`:**
```tsx
// Headline:
"THIS MURDERED OUT BMW M4 COULD BE YOURS"

// Body:
"This fully blacked-out BMW M4 packs an aggressively tuned engine, high-end M Competition components, and the unmistakable road presence of a true luxury sports machine... and it could be YOURS. But hurry — time is running out!"

// Botão: "ALL THE DETAILS" → href="/catalog" (ou /pages/giveaway quando criado)
```

---

### 7. FAQ: perguntas diferentes da Shopify
**Perguntas Shopify (corretas):**
1. Is this legit? Like I could actually win??
2. How is the winner selected & notified?
3. I placed an order, how do I know if I'm entered?
4. How do I know if my order has shipped?
5. I have a different question, please help!

**Perguntas Next.js (atuais):**
1. How do the sweepstakes entries work?
2. What are the prizes?
3. What are Fast Pass products?
4. How are winners selected?
5. Do I need to purchase to enter?
6. When does this giveaway end?

**Solução em `components/home/FaqSection.tsx`:** Atualizar o array `FAQ_ITEMS` com as perguntas/respostas da Shopify. Manter as respostas adaptadas para a CartPanda.

**Título Shopify:** "THE ANSWERS YOU'RE LOOKING FOR"
**Título Next.js atual:** "FREQUENTLY ASKED" — **atualizar para coincidir**

---

### 8. Fast Pass: imagens dos produtos ausentes
**Problema:** Seção Fast Pass mostra 🏎️ emoji porque nenhum produto com "fast pass" no título existe no CartPanda ainda.
**Solução:** Cadastrar os 4 produtos no CartPanda com título contendo "fast pass" (ver `CARTPANDA_PRODUTOS.md`). As imagens vêm do Google Drive do cliente.

---

## 🟡 MÉDIO — Qualidade visual e UX

### 9. Product Cards: design diferente da Shopify
**Shopify:** Cards com fundo BRANCO, título em preto, entries badge abaixo do nome, botão "ADD TO CART" bordado preto full-width.
**Next.js atual:** Cards com fundo PRETO (#1a1a1a), título em branco, entries badge sobre a imagem.

**Observação:** O design dark atual é aceitável (não precisa ser idêntico), mas verificar se não quebra em algum produto.
**Prioridade:** Baixa — manter dark theme é válido para a identidade da loja.

---

### 10. Announcement Bar: atualizar mensagens
**Atual:** "Welcome to our store" + "Final Days To Enter — Win This 2026 Limited BMW M4 Cummins + $10,000!"
**Shopify:** "Welcome to our store" (apenas)
**Sugestão:** Adicionar mensagens mais agressivas de venda. Editar em `components/layout/AnnouncementBar.tsx`, array `MESSAGES`.

---

### 11. Footer: social links não aparecem
**Problema:** `socialLinks` está definido em `config/navigation.ts` mas o Footer não os exibe.
**Solução:** Adicionar ícones de redes sociais (Instagram, TikTok, YouTube) no footer.

---

### 12. Header: ícone de busca sem funcionalidade
**Problema:** O ícone de lupa no header não faz nada ao clicar.
**Solução:** Implementar busca simples que filtra o catálogo, ou redirecionar para `/catalog?q=termo`.

---

## 🟢 BAIXO — Melhorias opcionais

### 13. `/pages/giveaway` — criar página de detalhes do sorteio
Página com regras completas, prêmios, AMOE (método alternativo de entrada), contagem de entradas, FAQ do sorteio.
**Arquivo a criar:** `app/pages/giveaway/page.tsx`

### 14. Formulário de contato: configurar Resend
**Problema:** `RESEND_API_KEY=re_XXXXXXXX` no `.env.local` é placeholder. Emails não são enviados.
**Solução:** Criar conta em resend.com, pegar API key real, atualizar `.env.local`.

### 15. Imagens de produto no Catálogo não carregam
**Causa provável:** Next.js dev server precisa ser reiniciado após alteração no `next.config.ts` para reconhecer o novo domínio `assets.mycartpanda.com`.
**Solução:** Reiniciar com `Ctrl+C` + `npm run dev`.

### 16. Hero Desktop: imagem faltando
**Problema:** `HERO-DESKTOP.png` não existe em `/public/images/`. Usando HERO-MOBILE como fallback.
**Solução:** Adicionar imagem de desktop do hero (formato widescreen 16:9, ~1440x550px) em `/public/images/HERO-DESKTOP.png`.

### 17. Checkout: confirmar URL do CartPanda f7nt
**Após criar nova loja f7nt no CartPanda**, atualizar `.env.local`:
```env
CARTPANDA_STORE_SLUG=f7nt          # novo slug da loja
NEXT_PUBLIC_CARTPANDA_STORE_URL=https://f7nt.mycartpanda.com   # ou o domínio correto
CARTPANDA_BASE_URL=https://accounts.cartpanda.com/api/v3
```

### 18. Análise/Tracking: não configurado
Nenhum pixel/GTM instalado. Adicionar quando estiver próximo do lançamento:
- Meta Pixel
- Google Analytics 4
- TikTok Pixel

---

## 📋 Checklist final antes de ir para produção

- [ ] **Redirects** implementados para /cart, /collections/*, /pages/giveaway
- [ ] **Ordem das seções** na Home corrigida (2 grids de produtos)
- [ ] **Mystery Banner** com imagem e texto corretos
- [ ] **Giveaway Section** com headline e body copy corretos
- [ ] **FAQ** com perguntas/respostas corretas da Shopify
- [ ] **Produtos cadastrados** no CartPanda f7nt (Fast Pass, Mystery Box, Apparel)
- [ ] **Env vars** atualizadas para nova loja CartPanda f7nt
- [ ] **Dev server reiniciado** após trocar env vars e next.config.ts
- [ ] **Testar add-to-cart** → drawer abre → checkout redireciona corretamente
- [ ] **Testar em mobile** (iPhone viewport)
- [ ] **Deploy na Vercel** com env vars configuradas
- [ ] **Domínio f7nt.co** apontado para Vercel

---

## 📁 Arquivos a modificar (resumo rápido para Claude Code)

| Arquivo | O que mudar |
|---|---|
| `next.config.ts` | Adicionar bloco `redirects()` para /cart, /collections/*, /pages/giveaway |
| `app/page.tsx` | Reordenar seções, separar em 2 grids de produtos |
| `components/home/MysteryBanner.tsx` | Trocar imagem + atualizar texto para Shopify |
| `components/home/GiveawaySection.tsx` | Atualizar headline + adicionar body copy |
| `components/home/FaqSection.tsx` | Atualizar FAQ_ITEMS com perguntas da Shopify + título |
| `components/layout/Footer.tsx` | Adicionar social links (Instagram, TikTok, YouTube) |
| `.env.local` | Atualizar CARTPANDA_STORE_SLUG e URLs para nova loja f7nt |
| `public/images/` | Adicionar: mystery-box.png, HERO-DESKTOP.png |
