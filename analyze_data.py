import pandas as pd
import os

# Check which files exist
files = [
    'CLIENTE_QUANTIDADE_PEDIDO_1755624819036.xlsx',
    'CLIENTES_COM_PEDIDO_1755624819038.xlsx', 
    'LISTAR_PEDIDO_1755624819039.xlsx',
    'CLIENTES_COM_PEDIDO_1755175187340.xlsx'
]

for file in files:
    if os.path.exists(file):
        print(f"\n=== {file} ===")
        try:
            df = pd.read_excel(file)
            print(f"Shape: {df.shape}")
            print(f"Columns: {list(df.columns)}")
            print("First few rows:")
            print(df.head(3))
        except Exception as e:
            print(f"Error reading {file}: {e}")
    else:
        print(f"{file} not found")