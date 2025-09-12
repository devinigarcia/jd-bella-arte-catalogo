# 📖 Manual de Uso - Catálogo Digital JD Bella Arte

## 🎯 **Bem-vindo ao seu Catálogo Digital!**

Este manual te ensina como usar e aproveitar ao máximo seu novo catálogo online.

---

## 🌐 **Acesso ao Site**

### **URL Principal:**
**https://devinigarcia.github.io/jd-bella-arte-catalogo/**

### **Como Compartilhar:**
1. **Copie e cole** o link acima
2. **Use o QR Code** (arquivo `qr-code-generator.html`)
3. **Compartilhe nas redes sociais**

---

## 📱 **Navegação do Site**

### **Página Inicial (Hero)**
- **Slideshow automático** com 5 imagens de fundo
- **Botão "Explorar Catálogo"** - leva às categorias
- **Botão "Solicitar Orçamento"** - abre WhatsApp

### **Menu Principal**
- **Início** - volta ao topo
- **Catálogo** - categorias de produtos
- **Chalés Modulares** - novidade 2025
- **Móveis Sob Medida** - seção especial
- **Contato** - informações e localização

### **Seção de Categorias**
- **10 categorias organizadas** por prioridade
- **87 produtos** com imagens reais
- **Botão em cada categoria** para solicitar informações

---

## 📞 **Sistema de Contato WhatsApp**

### **Mensagens Padronizadas:**

#### **Informações Gerais:**
```
"Olá, vim pelo site. Gostaria de informações sobre os móveis da JD Bella Arte"
```

#### **Orçamentos:**
```
"Olá, vim pelo site. Gostaria de solicitar um orçamento para móveis da JD Bella Arte"
```

### **Todos os Botões WhatsApp:**
- ✅ Header → "Fale Conosco"
- ✅ Hero → "Solicitar Orçamento"  
- ✅ CTA Central → "Solicitar Orçamento Gratuito"
- ✅ Footer → "WhatsApp"

---

## 🔧 **Funcionalidades Técnicas**

### **Design Responsivo**
- ✅ **Desktop**: Layout completo com grid
- ✅ **Tablet**: Adaptação automática
- ✅ **Celular**: Menu hambúrguer e layout vertical

### **Performance**
- ✅ **Carregamento rápido**: < 3 segundos
- ✅ **Imagens otimizadas**: WebP quando possível
- ✅ **CDN**: Entrega global rápida

### **SEO (Google)**
- ✅ **Meta tags completas**
- ✅ **Structured Data** (dados estruturados)
- ✅ **Sitemap.xml** para indexação
- ✅ **robots.txt** para crawlers

---

## 📊 **Como Acompanhar Resultados**

### **Google Analytics (Configurar)**
1. Crie conta em: https://analytics.google.com/
2. Substitua `GA_MEASUREMENT_ID` no código
3. Acompanhe métricas importantes

### **Métricas Importantes:**
- **Visitantes únicos** por mês
- **Páginas mais visitadas**
- **Tempo médio no site**
- **Dispositivos mais usados** (mobile/desktop)
- **Origem dos visitantes** (Google, redes sociais, direto)

### **Google Search Console**
1. Verifique a propriedade em: https://search.google.com/search-console/
2. Acompanhe posição no Google
3. Monitore cliques e impressões

---

## 📱 **Marketing e Divulgação**

### **QR Code**
- **Arquivo**: `qr-code-generator.html`
- **Como usar**: Abra, baixe, imprima
- **Onde usar**: Cartões, flyers, loja física

### **Redes Sociais**
- **Arquivo**: `SOCIAL-MEDIA-KIT.md`
- **Posts prontos** para Instagram/Facebook
- **Hashtags estratégicas**
- **Cronograma de publicações**

### **Compartilhamento Ideal:**
1. **Instagram Stories** com link do site
2. **Facebook Posts** com imagens dos móveis
3. **WhatsApp Status** com QR Code
4. **Google My Business** com link atualizado

---

## 🔄 **Atualizações do Site**

### **Como Adicionar Novos Produtos:**

#### **1. Preparar Imagens**
- Formato: `.jpg` ou `.webp`
- Tamanho: 800x600px (recomendado)
- Qualidade: Alta, mas otimizada
- Nome: descritivo (ex: `mesa-jantar-rustica.jpg`)

#### **2. Upload das Imagens**
- Coloque na pasta: `assets/images/catalogo/[categoria]/`
- Categorias existentes: aparadores, banquetas, camas, chales-modulares, conjuntos, estantes, moveis-festas, moveis-sob-medida, prateleiras

#### **3. Atualizar HTML**
No arquivo `index.html`, localize a categoria e adicione:
```html
<div class="catalog__item">
  <img src="assets/images/catalogo/[categoria]/nova-imagem.jpg" 
       alt="Descrição do produto" 
       loading="lazy">
</div>
```

#### **4. Fazer Upload**
```bash
git add .
git commit -m "feat: Adicionar novos produtos [categoria]"
git push
```

### **Como Alterar Informações de Contato:**
1. Abra `index.html`
2. Procure por `5541996390108` (número atual)
3. Substitua pelo novo número
4. Procure por informações de endereço e atualize
5. Salve e faça upload

---

## 🆘 **Solução de Problemas**

### **Site Não Carrega**
1. Verifique conexão com internet
2. Teste em navegador diferente
3. Limpe cache: Ctrl + F5

### **Imagens Não Aparecem**
1. Verifique se estão na pasta correta
2. Confira nomes dos arquivos (sem espaços ou acentos)
3. Teste localmente primeiro

### **WhatsApp Não Abre**
1. Verifique se WhatsApp está instalado
2. Teste o número manualmente
3. Confira se mensagem não tem caracteres especiais

### **Site Lento**
1. Otimize imagens antes do upload
2. Use formato WebP quando possível
3. Verifique conexão de internet

---

## 🎯 **Dicas de Sucesso**

### **Manutenção Regular:**
- ✅ Atualize produtos mensalmente
- ✅ Monitore Google Analytics semanalmente
- ✅ Responda WhatsApp rapidamente (< 1 hora)
- ✅ Mantenha redes sociais ativas

### **Marketing Efetivo:**
- ✅ Use QR Code em cartões de visita
- ✅ Compartilhe nas redes sociais 2-3x por semana
- ✅ Inclua link na assinatura de email
- ✅ Coloque placa na loja física

### **Atendimento:**
- ✅ Resposta padrão: "Olá! Obrigado pelo interesse. Em que posso ajudar?"
- ✅ Sempre pergunte medidas e ambiente do móvel
- ✅ Envie fotos de trabalhos similares
- ✅ Defina prazo realista para orçamento

---

## 📞 **Suporte Técnico**

### **Problemas Comuns - Soluções Rápidas:**

#### **Atualizar Número de WhatsApp:**
```bash
# Substituir em todos os arquivos
sed -i 's/5541996390108/NOVONUMERO/g' index.html
git commit -am "feat: Atualizar número WhatsApp"
git push
```

#### **Adicionar Nova Categoria:**
1. Crie pasta: `assets/images/catalogo/nova-categoria/`
2. Adicione seção no HTML seguindo padrão existente
3. Atualize menu se necessário

#### **Backup do Site:**
```bash
# Baixar cópia local completa
git clone https://github.com/devinigarcia/jd-bella-arte-catalogo.git backup
```

---

## ✅ **Checklist de Sucesso**

### **Configuração Inicial:**
- [ ] Site acessível online
- [ ] Todos os botões WhatsApp funcionando
- [ ] Imagens carregando corretamente
- [ ] Layout responsivo testado (celular/desktop)

### **Marketing:**
- [ ] QR Code gerado e testado
- [ ] Posts nas redes sociais publicados
- [ ] Link adicionado no Google My Business
- [ ] Cartões de visita atualizados

### **Monitoramento:**
- [ ] Google Analytics configurado
- [ ] Google Search Console verificado
- [ ] Backup do site criado
- [ ] Manual de uso lido e compreendido

---

## 🎉 **Parabéns!**

Seu catálogo digital está **100% funcional** e pronto para gerar vendas!

**Lembre-se:**
- O sucesso depende da divulgação constante
- Mantenha o site sempre atualizado
- Responda rapidamente aos contatos
- Use as ferramentas de análise para melhorar

**Em caso de dúvidas, consulte a documentação completa em:**
- `README.md` - Visão geral do projeto
- `GITHUB-SETUP.md` - Configurações avançadas
- `SOCIAL-MEDIA-KIT.md` - Material de marketing

---

**💼 Manual criado com carinho para o sucesso da JD Bella Arte!**
