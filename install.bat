@echo off
echo ========================================
echo  Ekobrazil - Instalador do Sistema
echo ========================================
echo.

echo Instalando dependencias do Python...
pip install streamlit pandas openpyxl

echo.
echo Instalacao concluida!
echo.
echo Para executar o sistema:
echo   python -m streamlit run app.py
echo.
echo Ou execute o arquivo "executar.bat"
echo.
pause