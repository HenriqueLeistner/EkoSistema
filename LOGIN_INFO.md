# 🔐 Sistema de Login Ekobrazil

## Usuários e Senhas de Acesso

### Credenciais Disponíveis:

| Usuário    | Senha            | Nível de Acesso |
|------------|------------------|-----------------|
| `login`    | `password`       | Administrador   |


## 🌟 Funcionalidades de Segurança

### Autenticação:
- ✅ **Login obrigatório** para acessar os dados
- ✅ **Sessão de 8 horas** com logout automático
- ✅ **"Lembrar de mim"** para conveniência
- ✅ **Proteção contra força bruta** (5 tentativas por 5 minutos)

### Experiência do Usuário:
- 🎨 **Design moderno** com tema Ekobrazil
- 📱 **Responsivo** para mobile e desktop
- ⚡ **Feedback visual** durante o login
- 🔄 **Animações suaves** e profissionais

### Segurança:
- 🛡️ **Validação client-side** básica
- 📊 **Log de acessos** (armazenado localmente)
- ⏰ **Timeout de sessão** configurável
- 🚫 **Redirect automático** se não autenticado

## 🚀 Como Usar

### 1. Primeira vez:
1. Abra `login.html` no navegador
2. Use qualquer credencial da tabela acima
3. Marque "Lembrar de mim" se desejar
4. Clique em "Entrar"

### 2. Acesso normal:
- Sistema redireciona automaticamente para login se não autenticado
- Usuário lembrado será preenchido automaticamente
- Sessão mantida por 8 horas de atividade

### 3. Logout:
- Clique no botão "Sair" no canto superior direito
- Ou aguarde expiração automática da sessão

## ⚙️ Configurações Técnicas

### Modificar Usuários:
Edite o arquivo `auth.js` na seção:
```javascript
this.users = {
    'admin': 'ekobrazil123',
    'gerente': 'verde2024',
    'vendas': 'cliente123',
    'ekobrazil': 'inteligencia2024'
};
```

### Alterar Timeout da Sessão:
```javascript
this.sessionTimeout = 8 * 60 * 60 * 1000; // 8 horas em ms
```

### Modificar Proteção contra Força Bruta:
```javascript
// Em checkBruteForce()
if (recentAttempts.length >= 5) { // 5 tentativas
const fiveMinutesAgo = now - (5 * 60 * 1000); // 5 minutos
```

## 📁 Arquivos do Sistema de Login

```
login-system/
├── login.html      # Página de login
├── login.css       # Estilos da página de login  
├── auth.js         # Sistema de autenticação
├── index.html      # Página principal (protegida)
├── styles.css      # Estilos principais (com botão logout)
└── script.js       # Funcionalidades (com verificação auth)
```

## 🔧 Fluxo de Autenticação

1. **Acesso inicial**: `index.html` → verifica auth → redireciona para `login.html`
2. **Login**: `login.html` → valida credenciais → salva sessão → vai para `index.html`
3. **Navegação**: `index.html` → verifica sessão a cada minuto
4. **Logout**: Limpa sessão → redireciona para `login.html`

## 📱 Compatibilidade

### Navegadores:
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

### Dispositivos:
- 💻 Desktop (Windows, Mac, Linux)
- 📱 Mobile (iOS, Android)
- 📱 Tablets

## 🛠️ Personalização

### Cores do Login:
Edite `login.css` e procure por:
```css
background: linear-gradient(135deg, #9BC53D 0%, #7BA428 100%);
```

### Logo na Tela de Login:
- Substitua `logo.png`
- Recomendado: PNG transparente, 200px de largura

### Textos da Interface:
Edite `login.html` nas seções:
- `.login-header` - Título e subtítulo
- `.login-footer` - Texto do rodapé

## 🔍 Troubleshooting

### "Não consegue fazer login":
- Verifique se está usando as credenciais corretas
- Limpe o cache do navegador
- Verifique se JavaScript está habilitado

### "Sessão expira muito rápido":
- Aumente o `sessionTimeout` em `auth.js`
- Verifique se há erros no console do navegador

### "Página não carrega":
- Certifique-se que todos os arquivos estão no mesmo diretório
- Use um servidor web local (não abra direto do explorador)

## 🚨 Importante - Segurança

### Para Produção:
⚠️ **Este sistema é básico e adequado para demonstração ou uso interno.**

Para uso em produção, considere:
- Autenticação via servidor (PHP, Node.js, etc.)
- Hash das senhas (bcrypt, etc.)
- HTTPS obrigatório
- Rate limiting no servidor
- Logs de segurança centralizados
- Autenticação de dois fatores

### Dados Locais:
- Credenciais ficam no código JavaScript (visíveis)
- Sessões ficam no navegador (não no servidor)
- Logs ficam no localStorage (local)

## 💡 Dicas de Uso

1. **Para teste**: Use `admin` / `ekobrazil123`
2. **Para demo**: Use `ekobrazil` / `inteligencia2024`
3. **Desenvolvimento**: Console do navegador (F12) mostra logs
4. **Mobile**: Interface se adapta automaticamente

---

**Sistema de Login Ekobrazil** - Inteligência Ecológica
Versão: 1.0 - Sistema Web com Autenticação
