# Ekobrazil - Sistema de Clientes (HTML/CSS/JavaScript)

Sistema web completo para visualização e análise de dados de clientes da Ekobrazil com filtros por período da última compra.

## 🌿 Características

- ✅ **100% Frontend**: HTML, CSS e JavaScript puro (sem backend necessário)
- 🔍 **Filtros Avançados**: 30, 60, 90 e +90 dias desde última compra
- 📱 **Design Responsivo**: Funciona em desktop, tablet e mobile
- 🌿 **Identidade Visual**: Cores e tema oficial da Ekobrazil
- 📊 **Métricas em Tempo Real**: Contadores dinâmicos de clientes
- 📥 **Download CSV**: Exportação dos dados filtrados
- 🔎 **Pesquisa Instantânea**: Busca por nome de cliente

## 📁 Arquivos do Sistema

```
ekobrazil-web/
├── index.html          # Página principal
├── styles.css          # Estilos e tema Ekobrazil
├── script.js           # Funcionalidades JavaScript
├── data.js             # Base de dados (359 clientes)
├── logo.png            # Logo oficial da Ekobrazil
└── README_HTML.md      # Este arquivo
```

## 🚀 Como Usar

### Opção 1: Servidor Web Local
```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (se tiver instalado)
npx serve .

# Com PHP
php -S localhost:8000
```

### Opção 2: Abrir Diretamente
- Duplo clique no arquivo `index.html`
- Funciona na maioria dos navegadores modernos

### Opção 3: Hospedagem Online
- Faça upload de todos os arquivos para seu servidor web
- Acesse através do seu domínio

## 🌐 Compatibilidade

### Navegadores Suportados:
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Opera 47+

### Dispositivos:
- 💻 Desktop (Windows, Mac, Linux)
- 📱 Mobile (iOS, Android)
- 📱 Tablets

## ⚙️ Funcionalidades Técnicas

### Filtros Disponíveis:
- **Todos**: Exibe todos os 359 clientes
- **Últimos 30 dias**: Clientes que compraram recentemente
- **31-60 dias**: Clientes com compra entre 1-2 meses
- **61-90 dias**: Clientes com compra entre 2-3 meses
- **Mais de 90 dias**: Clientes inativos há mais de 3 meses

### Ordenação:
- **Por Nome**: Ordem alfabética
- **Por Data**: Compras mais recentes primeiro

### Pesquisa:
- Busca instantânea por nome
- Não diferencia maiúsculas/minúsculas
- Busca parcial (encontra "Silva" digitando "sil")

## 🎨 Personalização

### Alterar Cores da Marca:
Edite o arquivo `styles.css` e procure por:
```css
/* Cores principais da Ekobrazil */
#9BC53D  /* Verde claro */
#7BA428  /* Verde escuro */
```

### Trocar Logo:
- Substitua o arquivo `logo.png`
- Recomendado: PNG transparente, máximo 400px de largura

### Modificar Dados:
Edite o arquivo `data.js` e altere o array `clientsData`:
```javascript
const clientsData = [
  {
    "nome": "Nome do Cliente",
    "telefone": "(11) 99999-9999", 
    "data": "01/01/2024"
  }
  // ... mais clientes
];
```

## 📊 Estrutura dos Dados

Cada cliente possui:
- **Nome**: String (obrigatório)
- **Telefone**: String formatada como (XX) XXXXX-XXXX
- **Data**: String no formato DD/MM/AAAA

## 🔧 Hospedagem

### Serviços Recomendados (Gratuitos):
- **Netlify**: Arraste a pasta e solte
- **GitHub Pages**: Via repositório GitHub
- **Vercel**: Deploy automático
- **Firebase Hosting**: Google Cloud

### Serviços Pagos:
- **cPanel/Shared Hosting**: Upload via FTP
- **AWS S3**: Hospedagem estática
- **DigitalOcean**: VPS com servidor web

## 🛠️ Solução de Problemas

### "Página não carrega dados"
- Verifique se todos os arquivos estão no mesmo diretório
- Confirme que `data.js` existe e tem dados válidos
- Use um servidor web local (não abra direto do explorador)

### "Filtros não funcionam"
- Verifique se o JavaScript está habilitado no navegador
- Abra o Console do navegador (F12) e procure por erros

### "Design quebrado"
- Confirme que `styles.css` está no mesmo diretório
- Verifique se não há erros no CSS

### "Download não funciona"
- Alguns navegadores bloqueiam downloads de arquivos locais
- Use um servidor web local para teste

## 📱 Responsividade

O sistema se adapta automaticamente a diferentes tamanhos de tela:

- **Desktop (1200px+)**: Layout completo com 4 colunas de métricas
- **Tablet (768px-1199px)**: Layout de 2 colunas
- **Mobile (até 767px)**: Layout de 1 coluna, elementos empilhados

## 🔒 Segurança

- ✅ **Sem Backend**: Não há riscos de servidor
- ✅ **Dados Locais**: Informações ficam no navegador do usuário
- ✅ **Sem Cookies**: Não coleta dados pessoais
- ✅ **HTTPS Ready**: Funciona com certificados SSL

## 📈 Performance

- ⚡ **Carregamento Rápido**: Arquivos otimizados
- ⚡ **Filtros Instantâneos**: Processamento local no JavaScript
- ⚡ **Sem Dependências**: Não precisa de bibliotecas externas
- ⚡ **Cache Friendly**: Arquivos estáticos podem ser cacheados

## 💡 Dicas de Uso

1. **Para melhor performance**: Use um servidor web ao invés de abrir direto
2. **Para desenvolvimento**: Use o console do navegador (F12) para debug
3. **Para personalização**: Todos os estilos estão no `styles.css`
4. **Para novos dados**: Substitua apenas o `data.js`

## 📞 Suporte

Sistema desenvolvido para **Ekobrazil - Inteligência Ecológica**.

Para questões técnicas:
- Verifique este README primeiro
- Use o console do navegador para identificar erros
- Confirme que todos os arquivos estão presentes

---

**Versão HTML/CSS/JavaScript** - Sistema autônomo sem dependências de servidor.