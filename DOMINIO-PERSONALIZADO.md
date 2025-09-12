# 🌐 Configuração de Domínio Personalizado

## 🎯 **Como Configurar um Domínio Próprio**

### **Opção 1: Registro.br (Recomendado para .com.br)**

#### **1. Registrar Domínio**
- Acesse: https://registro.br/
- Procure: `jdbellaarte.com.br` ou `jdbellaarte.art.br`
- Custo: ~R$ 40/ano (.com.br) ou ~R$ 20/ano (.art.br)

#### **2. Configurar DNS**
No painel do Registro.br, adicione estes registros:

```
Tipo: CNAME
Nome: www
Destino: devinigarcia.github.io

Tipo: A
Nome: @
IP: 185.199.108.153
IP: 185.199.109.153
IP: 185.199.110.153
IP: 185.199.111.153
```

#### **3. Configurar no GitHub**
1. No repositório GitHub → Settings → Pages
2. Em **Custom domain**, adicione: `www.jdbellaarte.com.br`
3. Marque **Enforce HTTPS**
4. GitHub vai verificar automaticamente

#### **4. Criar arquivo CNAME**
```bash
echo "www.jdbellaarte.com.br" > CNAME
git add CNAME
git commit -m "feat: Adicionar domínio personalizado"
git push
```

### **Opção 2: Cloudflare (Gratuito + Rápido)**

#### **1. Criar conta no Cloudflare**
- Acesse: https://cloudflare.com/
- Adicione o domínio comprado
- Altere os nameservers no registrador

#### **2. Configurar DNS no Cloudflare**
```
CNAME | www | devinigarcia.github.io | Proxied
A     | @   | 185.199.108.153        | Proxied
```

#### **3. Benefícios Extras**
- CDN gratuito (site mais rápido)
- SSL automático
- Proteção contra ataques
- Analytics básico

### **Opção 3: Subdomínio Gratuito**

#### **Usando serviços gratuitos:**
- **Freenom**: `.tk, .ml, .ga` (gratuitos)
- **No-IP**: Subdomínios dinâmicos
- **000webhost**: Subdomínio grátis

⚠️ **Não recomendado para negócios profissionais**

## 💰 **Custos Anuais Comparação**

| Domínio | Custo/Ano | Profissionalismo | Recomendação |
|---------|-----------|------------------|--------------|
| `.com.br` | R$ 40 | ⭐⭐⭐⭐⭐ | Melhor para negócios |
| `.art.br` | R$ 20 | ⭐⭐⭐⭐ | Boa para artesanato |
| `.com` | R$ 60 | ⭐⭐⭐⭐⭐ | Internacional |
| Gratuito | R$ 0 | ⭐⭐ | Apenas teste |

## 🚀 **Configuração Rápida (Recomendada)**

### **Para jdbellaarte.com.br:**

```bash
# 1. Criar arquivo CNAME
echo "www.jdbellaarte.com.br" > CNAME

# 2. Atualizar configurações do site
git add CNAME
git commit -m "feat: Configurar domínio jdbellaarte.com.br"
git push

# 3. No GitHub Pages:
# Settings → Pages → Custom domain → www.jdbellaarte.com.br
```

### **Arquivos que precisam ser atualizados:**

#### **index.html** - URLs canônicas:
```html
<link rel="canonical" href="https://www.jdbellaarte.com.br/">
<meta property="og:url" content="https://www.jdbellaarte.com.br/">
```

#### **sitemap.xml** - URLs do sitemap:
```xml
<loc>https://www.jdbellaarte.com.br/</loc>
```

#### **robots.txt** - Sitemap URL:
```
Sitemap: https://www.jdbellaarte.com.br/sitemap.xml
```

## 📧 **Email Profissional**

### **Com domínio próprio, você pode ter:**
- contato@jdbellaarte.com.br
- vendas@jdbellaarte.com.br
- orcamento@jdbellaarte.com.br

### **Opções de Email:**
1. **Google Workspace** (R$ 30/mês/usuário)
2. **Zoho Mail** (Grátis até 5 usuários)
3. **ProtonMail** (R$ 25/mês)

## ⚡ **Script de Automação**

```bash
#!/bin/bash
# Script para configurar domínio rapidamente

DOMAIN="www.jdbellaarte.com.br"

echo "🌐 Configurando domínio: $DOMAIN"

# Criar CNAME
echo $DOMAIN > CNAME

# Atualizar URLs no site
sed -i "s|devinigarcia.github.io/jd-bella-arte-catalogo|$DOMAIN|g" index.html
sed -i "s|devinigarcia.github.io/jd-bella-arte-catalogo|$DOMAIN|g" sitemap.xml
sed -i "s|devinigarcia.github.io/jd-bella-arte-catalogo|$DOMAIN|g" robots.txt

# Commit e push
git add .
git commit -m "feat: Configurar domínio personalizado $DOMAIN"
git push

echo "✅ Domínio configurado! Aguarde propagação DNS (até 24h)"
```

## 🔍 **Verificação de DNS**

### **Comandos para testar:**
```bash
# Verificar propagação DNS
nslookup www.jdbellaarte.com.br

# Testar redirecionamento
curl -I https://www.jdbellaarte.com.br

# Verificar SSL
openssl s_client -connect www.jdbellaarte.com.br:443
```

### **Sites de verificação:**
- https://www.whatsmydns.net/
- https://dnschecker.org/
- https://www.digwebinterface.com/

## 🎯 **Benefícios do Domínio Próprio**

### **SEO:**
- Melhor ranking no Google
- URLs mais profissionais
- Maior confiança dos usuários

### **Branding:**
- Nome da marca na URL
- Email personalizado
- Maior credibilidade

### **Marketing:**
- Fácil de lembrar
- Fácil de falar
- QR Code mais limpo

---

**🌐 Domínio próprio = Profissionalismo máximo!**
