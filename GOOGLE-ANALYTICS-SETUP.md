# 📊 Google Analytics - Configuração

## 🎯 **Como Configurar o Google Analytics**

### **1. Criar Conta no Google Analytics**
1. Acesse: https://analytics.google.com/
2. Clique em **"Começar a usar"**
3. Crie uma **Conta** → Nome: "JD Bella Arte"
4. Crie uma **Propriedade** → Nome: "JD Bella Arte - Catálogo"
5. **URL do site**: https://devinigarcia.github.io/jd-bella-arte-catalogo/
6. **Categoria**: "Casa e jardim"
7. **Fuso horário**: Brasil/São Paulo

### **2. Obter ID de Acompanhamento**
Após criar, você receberá um **ID de Acompanhamento** como:
```
G-XXXXXXXXXX
```

### **3. Atualizar o Site**
No arquivo `index.html`, substitua `GA_MEASUREMENT_ID` pelo seu ID real:

```html
<!-- Localizar estas linhas: -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  gtag('config', 'GA_MEASUREMENT_ID');
</script>

<!-- Substituir por: -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-SEUCODIGO"></script>
<script>
  gtag('config', 'G-SEUCODIGO');
</script>
```

### **4. Fazer Commit e Push**
```bash
git add .
git commit -m "feat: Adicionar Google Analytics para monitoramento"
git push
```

## 🔍 **Google Search Console**

### **1. Verificar Propriedade**
1. Acesse: https://search.google.com/search-console/
2. Adicione a propriedade: https://devinigarcia.github.io/jd-bella-arte-catalogo/
3. **Método de verificação**: Meta tag HTML
4. Copie o código fornecido
5. Substitua `GOOGLE_SEARCH_CONSOLE_CODE` no `index.html`
6. Faça commit e push
7. Volte ao Search Console e clique em "Verificar"

### **2. Submeter Sitemap**
1. No Search Console, vá em **Sitemaps**
2. Adicione: `sitemap.xml`
3. Clique em **Enviar**

## 📈 **Métricas Importantes para Acompanhar**

### **Google Analytics:**
- **Usuários únicos** (visitantes diferentes)
- **Visualizações de página** (páginas vistas)
- **Taxa de rejeição** (% que sai rapidamente)
- **Tempo na página** (engajamento)
- **Dispositivos** (celular vs desktop)
- **Origem do tráfego** (Google, redes sociais, direto)

### **Google Search Console:**
- **Impressões** (quantas vezes apareceu no Google)
- **Cliques** (quantos clicaram no resultado)
- **CTR** (taxa de cliques)
- **Posição média** (ranking no Google)
- **Palavras-chave** (termos de busca)

## 🎯 **Metas de Performance**

### **Primeiros 30 dias:**
- 100+ usuários únicos
- 3+ minutos tempo médio
- <60% taxa de rejeição
- 10+ cliques do WhatsApp

### **Primeiros 90 dias:**
- 500+ usuários únicos
- Top 10 para "móveis sob medida Almirante Tamandaré"
- 50+ contatos via WhatsApp

## ⚡ **Comandos Rápidos**

```bash
# Atualizar Analytics
git add index.html
git commit -m "feat: Configurar Google Analytics ID"
git push

# Verificar status online
curl -I https://devinigarcia.github.io/jd-bella-arte-catalogo/
```

---

**📊 O Google Analytics está preparado - apenas configure os IDs!**
