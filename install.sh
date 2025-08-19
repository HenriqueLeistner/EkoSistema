#!/bin/bash
echo "========================================"
echo " Ekobrazil - Instalador do Sistema"
echo "========================================"
echo

echo "Instalando dependências do Python..."
pip3 install streamlit pandas openpyxl

echo
echo "Instalação concluída!"
echo
echo "Para executar o sistema:"
echo "  streamlit run app.py"
echo
echo "Ou execute o arquivo \"executar.sh\""
echo
