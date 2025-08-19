# Ekobrazil - Sistema de Dados de Clientes

Sistema web para visualização e análise de dados de clientes da Ekobrazil com filtros por período da última compra.

## Características

- ✅ Carregamento automático de dados de clientes
- 🔍 Filtros por período: 30, 60, 90 e +90 dias desde última compra
- 📱 Interface responsiva com identidade visual Ekobrazil
- 🌿 Design com cores da marca (#9BC53D, #7BA428)
- 📊 Métricas em tempo real
- 📥 Download de dados filtrados em CSV
- 🔎 Pesquisa por nome de cliente

## Instalação

### Requisitos
- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)

### Passos para instalação:

1. **Baixe todos os arquivos do projeto**
2. **Instale as dependências:**
```bash
pip install streamlit pandas openpyxl
```

3. **Execute a aplicação:**
```bash
streamlit run app.py
```

4. **Acesse no navegador:**
   - Local: http://localhost:8501
   - Rede: http://0.0.0.0:8501

## Estrutura dos Arquivos

```
projeto/
├── app.py                                    # Aplicação principal
├── logo.png                                  # Logo da Ekobrazil
├── CLIENTES_COM_PEDIDO_1755175187340.xlsx    # Base de dados (359 clientes)
├── README.md                                 # Este arquivo
└── .streamlit/
    └── config.toml                           # Configurações do Streamlit
```

## Configuração para Servidor Web

### Para hospedagem própria:

1. **Configure o arquivo .streamlit/config.toml:**
```toml
[server]
headless = true
address = "0.0.0.0"
port = 8501
```

2. **Para usar porta personalizada (ex: 80):**
```bash
streamlit run app.py --server.port 80
```

3. **Para executar em segundo plano:**
```bash
nohup streamlit run app.py &
```

## Personalização

### Para alterar os dados:
- Substitua o arquivo `CLIENTES_COM_PEDIDO_1755175187340.xlsx`
- Mantenha as colunas: `nome`, `telefone`, `Data da Última Compra`

### Para alterar cores:
- Edite as variáveis CSS no arquivo `app.py`
- Cores atuais: #9BC53D (verde claro), #7BA428 (verde escuro)

### Para trocar logo:
- Substitua o arquivo `logo.png`
- Recomendado: PNG transparente, largura máxima 400px

## Funcionalidades

### Filtros Disponíveis:
- **Todos**: Mostra todos os clientes
- **Últimos 30 dias**: Clientes que compraram nos últimos 30 dias
- **31-60 dias**: Clientes que compraram entre 31 e 60 dias atrás
- **61-90 dias**: Clientes que compraram entre 61 e 90 dias atrás
- **Mais de 90 dias**: Clientes que compraram há mais de 90 dias

### Dados Exibidos:
- Nome do cliente
- Telefone formatado (XX) XXXXX-XXXX
- Data da última compra (DD/MM/AAAA)

## Troubleshooting

### Problemas comuns:

1. **Erro de dependências:**
```bash
pip install --upgrade streamlit pandas openpyxl
```

2. **Porta ocupada:**
```bash
streamlit run app.py --server.port 8502
```

3. **Arquivo de dados não encontrado:**
   - Verifique se `CLIENTES_COM_PEDIDO_1755175187340.xlsx` está no mesmo diretório

## Suporte

Sistema desenvolvido para Ekobrazil - Inteligência Ecológica.

Para dúvidas técnicas, verifique:
- Se todas as dependências estão instaladas
- Se o arquivo de dados está no local correto
- Se a porta não está sendo usada por outro programa