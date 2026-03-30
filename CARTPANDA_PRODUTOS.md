# Guia de Cadastro de Produtos — f7nt.co no CartPanda

> Acesse: https://accounts.cartpanda.com → sua loja (slug: `funtfit`)

---

## ⚠️ IMPORTANTE: Regra de filtro automático

O site filtra produtos por título para decidir onde exibi-los:

| Regra | Critério | Onde aparece |
|---|---|---|
| **Fast Pass** | Título contém `"fast pass"` ou `"fastpass"` (case-insensitive) | Seção Fast Pass na Home |
| **Upsell** (ocultar) | Título contém `[UP1]`, `[UP2]`, `[UP3]`, `[F]`, `[F1]`, etc. | **Ocultado automaticamente** do catálogo |
| **Todos os outros** | Qualquer outro produto ativo | Catálogo geral + Featured Products na Home |

---

## 🎟️ Fast Pass Tiers (4 produtos — OBRIGATÓRIOS)

### 1. BLACK Fast Pass
| Campo | Valor |
|---|---|
| **Título** | `BLACK Fast Pass` |
| **Preço** | `$500.00` |
| **SKU** | `100000` ← número puro = entries fixas (100.000 entries) |
| **Tag** | `fastpass` |
| **Status** | Ativo |
| **Imagem** | Foto do Fast Pass BLACK (aguardando Drive) |

### 2. PLATINUM Fast Pass
| Campo | Valor |
|---|---|
| **Título** | `PLATINUM Fast Pass` |
| **Preço** | `$400.00` |
| **SKU** | `80000` |
| **Tag** | `fastpass` |
| **Status** | Ativo |
| **Imagem** | Foto do Fast Pass PLATINUM |

### 3. GOLD Fast Pass
| Campo | Valor |
|---|---|
| **Título** | `GOLD Fast Pass` |
| **Preço** | `$150.00` |
| **SKU** | `30000` |
| **Tag** | `fastpass` |
| **Status** | Ativo |
| **Imagem** | Foto do Fast Pass GOLD |

### 4. BRONZE Fast Pass
| Campo | Valor |
|---|---|
| **Título** | `BRONZE Fast Pass` |
| **Preço** | `$75.00` |
| **SKU** | `15000` |
| **Tag** | `fastpass` |
| **Status** | Ativo |
| **Imagem** | Foto do Fast Pass BRONZE |

---

## 📦 Mystery Cash Boxes

### Mystery Cash Box
| Campo | Valor |
|---|---|
| **Título** | `Mystery Cash Box` |
| **Preço** | (valor definido pelo cliente, ex: `$49.99`) |
| **SKU** | Deixar em branco (entries = preço × 200) |
| **Status** | Ativo |
| **Imagem** | Foto do Mystery Box |

---

## 👕 Apparel (roupas/acessórios)

Para cada peça de roupa/acessório cadastrar como produto separado com variantes de tamanho (S, M, L, XL, XXL):

| Campo | Valor |
|---|---|
| **Título** | Ex: `F7NT Hoodie`, `F7NT T-Shirt`, `F7NT Cap` |
| **Preço** | Valor real do produto |
| **SKU** | Deixar em branco (entries = preço × 200 automaticamente) |
| **Variantes** | S / M / L / XL / XXL (para roupas) |
| **Status** | Ativo |
| **Imagem** | Fotos do produto (do Google Drive) |

---

## 💡 Como funciona o sistema de Entries via SKU

O site calcula entries de duas formas:

```
Forma 1 (SKU override): Se o SKU for um número inteiro puro (ex: "100000")
  → entries = valor do SKU (fixo, independente do preço)

Forma 2 (automático): Se SKU vazio ou não-numérico
  → entries = Math.floor(preço) × 200
```

**Exemplos:**
- Produto com preço $500, SKU = `100000` → exibe **100,000 ENTRIES** ✅
- Produto com preço $49.99, SKU vazio → exibe **9,800 ENTRIES** (49 × 200)
- Produto com preço $883.63, SKU vazio → exibe **176,600 ENTRIES** (883 × 200)

---

## 🔗 URL de checkout

O checkout é redirecionado para:
```
https://funtfit.mycartpanda.com/checkout/{variantId}:{qty}
```

Certifique-se que o domínio `funtfit.mycartpanda.com` está ativo na CartPanda.

---

## 📸 Sobre as imagens (Google Drive)

Drive com imagens: https://drive.google.com/drive/folders/1XJvX-WL94SrTPLwTDNcQxIjfQYkAL1kM

- Faça upload das imagens direto no cadastro de cada produto na CartPanda
- Para os Fast Pass: ainda não há fotos disponíveis (pendente)
- Recomendação: imagens quadradas (1:1), mínimo 800×800px

---

## ✅ Checklist de cadastro

- [ ] BLACK Fast Pass cadastrado com SKU `100000`
- [ ] PLATINUM Fast Pass cadastrado com SKU `80000`
- [ ] GOLD Fast Pass cadastrado com SKU `30000`
- [ ] BRONZE Fast Pass cadastrado com SKU `15000`
- [ ] Mystery Cash Box cadastrado
- [ ] Apparel cadastrado (hoodie, tee, cap — com variantes de tamanho)
- [ ] Todas as imagens adicionadas
- [ ] Todos os produtos com status "Ativo"
- [ ] Testar add-to-cart e checkout no localhost:3000
