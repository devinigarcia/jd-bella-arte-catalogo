# 🚀 Como Publicar no GitHub - JD Bella Arte

## 📋 Instruções Passo a Passo

### 1. **Criar Repositório no GitHub**
1. Acesse [github.com](https://github.com) e faça login
2. Clique no botão **"New"** (verde) ou **"+"** → **"New repository"**
3. Preencha os dados:
   - **Repository name**: `jd-bella-arte-catalogo`
   - **Description**: `Catálogo digital responsivo para JD Bella Arte - 35 anos em móveis artesanais`
   - **Public/Private**: Escolha conforme preferência
   - **NÃO** marque "Add a README file" (já temos um)
4. Clique em **"Create repository"**

### 2. **Conectar com o Repositório Local**
```bash
# Adicionar repositório remoto (substitua SEU-USUARIO pelo seu username)
git remote add origin https://github.com/SEU-USUARIO/jd-bella-arte-catalogo.git

# Enviar código para GitHub
git branch -M main
git push -u origin main
```

### 3. **Ativar GitHub Pages (Site Online)**
1. No repositório, vá em **Settings** (aba superior)
2. Role para baixo até **"Pages"** (menu lateral esquerdo)
3. Em **Source**, escolha **"Deploy from a branch"**
4. Branch: **main**
5. Folder: **/ (root)**
6. Clique em **"Save"**

### 4. **Acesso ao Site**
Após alguns minutos, o site estará disponível em:
```
https://SEU-USUARIO.github.io/jd-bella-arte-catalogo/
```

## ⚡ Comandos Rápidos (PowerShell)

```powershell
# Verificar status
git status

# Adicionar mudanças futuras
git add .
git commit -m "Atualização do catálogo"
git push

# Ver histórico
git log --oneline
```

## 🔧 Solução de Problemas

### Erro de Autenticação
Se aparecer erro de login, configure:
```bash
# Configurar credenciais
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Usar token em vez de senha
# GitHub → Settings → Developer settings → Personal access tokens
```

### Site não aparece
- Aguarde 5-10 minutos após ativar Pages
- Verifique se o arquivo se chama `index.html` (exato)
- Teste localmente primeiro

### Imagens não carregam
- Certifique-se que todas as imagens estão na pasta `assets/images/`
- Verifique os caminhos no código (devem ser relativos)

## 📱 Compartilhar com Cliente

Após publicar, envie para o cliente:

**📧 Email:**
```
Assunto: ✅ Site JD Bella Arte - Catálogo Digital Finalizado

Olá!

O catálogo digital da JD Bella Arte está pronto e online! 🎉

🌐 Acesse em: https://SEU-USUARIO.github.io/jd-bella-arte-catalogo/

✨ Funcionalidades:
- Catálogo completo com 87 produtos em 10 categorias
- Design responsivo (funciona perfeitamente no celular)
- Integração direta com WhatsApp
- Chalés Modulares 2025 em destaque
- SEO otimizado para Google

📱 Teste especialmente no celular, onde a maioria dos clientes acessará.

Qualquer ajuste ou dúvida, estou à disposição nos próximos 30 dias.

Att,
[Seu Nome]
```

## 🎯 Próximos Passos Recomendados

1. **Google Analytics**: Adicionar código de acompanhamento
2. **Google My Business**: Atualizar com link do site
3. **Redes Sociais**: Compartilhar link nos perfis
4. **Cartão de Visita**: Adicionar QR Code do site
5. **WhatsApp Status**: Divulgar o catálogo online

---

## ✅ Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Código enviado com `git push`
- [ ] GitHub Pages ativado
- [ ] Site acessível online
- [ ] Testado em celular e desktop
- [ ] Cliente notificado com o link
- [ ] Prazo de suporte (30 dias) definido

---

**🎉 Parabéns! O projeto está completo e online!**
