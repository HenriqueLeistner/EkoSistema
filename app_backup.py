import streamlit as st
import pandas as pd
import datetime
from io import StringIO
import traceback
import numpy as np

# Page configuration
st.set_page_config(
    page_title="Ekobrazil - Dados de Clientes e Pedidos",
    page_icon="🌿",
    layout="wide",
    initial_sidebar_state="collapsed"
)

def validate_columns(df):
    """
    Validate that the dataframe has the required columns for customer data.
    Returns tuple (is_valid, error_message)
    """
    required_columns = ['nome', 'telefone', 'data_ultima_compra']
    df_columns_lower = [col.lower().strip() for col in df.columns]
    
    # Check for common variations of column names
    name_variations = ['nome', 'name', 'customer', 'cliente', 'customer_name']
    phone_variations = ['telefone', 'phone', 'telephone', 'celular', 'mobile']
    date_variations = ['data da última compra', 'data_ultima_compra', 'last_purchase', 'ultima_compra', 'data_compra', 'purchase_date']
    
    found_columns = {}
    
    # Find name column
    for variation in name_variations:
        if variation in df_columns_lower:
            found_columns['name'] = df.columns[df_columns_lower.index(variation)]
            break
    
    # Find phone column
    for variation in phone_variations:
        if variation in df_columns_lower:
            found_columns['phone'] = df.columns[df_columns_lower.index(variation)]
            break
    
    # Find date column
    for variation in date_variations:
        if variation in df_columns_lower:
            found_columns['date'] = df.columns[df_columns_lower.index(variation)]
            break
    
    missing_columns = []
    if 'name' not in found_columns:
        missing_columns.append('Nome/Name')
    if 'phone' not in found_columns:
        missing_columns.append('Telefone/Phone')
    if 'date' not in found_columns:
        missing_columns.append('Data da Última Compra/Last Purchase Date')
    
    if missing_columns:
        return False, f"Colunas necessárias não encontradas: {', '.join(missing_columns)}"
    
    return True, found_columns

def clean_phone_number(phone):
    """
    Clean and format phone numbers
    """
    if pd.isna(phone):
        return ""
    
    # Convert to string and remove common formatting
    phone_str = str(phone).strip()
    # Remove common separators and spaces
    cleaned = ''.join(filter(str.isdigit, phone_str))
    
    # Format Brazilian phone numbers
    if len(cleaned) == 11 and cleaned.startswith('55'):
        # Remove country code if present
        cleaned = cleaned[2:]
    elif len(cleaned) == 13 and cleaned.startswith('55'):
        # Remove country code if present
        cleaned = cleaned[2:]
    
    # Format as (XX) XXXXX-XXXX or (XX) XXXX-XXXX
    if len(cleaned) == 11:
        return f"({cleaned[:2]}) {cleaned[2:7]}-{cleaned[7:]}"
    elif len(cleaned) == 10:
        return f"({cleaned[:2]}) {cleaned[2:6]}-{cleaned[6:]}"
    else:
        return phone_str

def format_date(date_value):
    """
    Format date values to a consistent format
    """
    if pd.isna(date_value):
        return ""
    
    try:
        # If it's already a datetime object
        if isinstance(date_value, (pd.Timestamp, datetime.datetime)):
            return date_value.strftime("%d/%m/%Y")
        
        # Try to parse string dates
        if isinstance(date_value, str):
            # Try different date formats
            date_formats = ["%Y-%m-%d", "%d/%m/%Y", "%m/%d/%Y", "%d-%m-%Y"]
            for fmt in date_formats:
                try:
                    parsed_date = datetime.datetime.strptime(date_value, fmt)
                    return parsed_date.strftime("%d/%m/%Y")
                except ValueError:
                    continue
        
        # If it's a numeric value (Excel serial date)
        if isinstance(date_value, (int, float)):
            try:
                # Excel date serial number conversion
                excel_date = pd.to_datetime(date_value, origin='1899-12-30', unit='D')
                return excel_date.strftime("%d/%m/%Y")
            except:
                pass
        
        return str(date_value)
    except Exception:
        return str(date_value)

def process_dataframe(df, column_mapping):
    """
    Process and clean the dataframe
    """
    processed_df = pd.DataFrame()
    
    # Map columns to standard names
    processed_df['Nome'] = df[column_mapping['name']].fillna("")
    processed_df['Telefone'] = df[column_mapping['phone']].apply(clean_phone_number)
    processed_df['Data da Última Compra'] = df[column_mapping['date']].apply(format_date)
    
    # Remove rows where name is empty
    processed_df = processed_df[processed_df['Nome'].str.strip() != ""]
    
    return processed_df

def load_customer_data():
    """
    Load the fixed customer data file
    """
    try:
        df = pd.read_excel('CLIENTES_COM_PEDIDO_1755175187340.xlsx')
        return df
    except Exception as e:
        st.error(f"Erro ao carregar os dados: {str(e)}")
        return None

def calculate_days_since_purchase(date_str):
    """
    Calculate days since last purchase
    """
    if pd.isna(date_str) or date_str == "":
        return None
    
    try:
        # Parse the date string
        if isinstance(date_str, str):
            # Handle different date formats
            date_formats = ["%d/%m/%Y %H:%M", "%d/%m/%Y", "%Y-%m-%d", "%m/%d/%Y"]
            parsed_date = None
            for fmt in date_formats:
                try:
                    parsed_date = datetime.datetime.strptime(date_str, fmt)
                    break
                except ValueError:
                    continue
            
            if parsed_date is None:
                return None
        elif isinstance(date_str, (pd.Timestamp, datetime.datetime)):
            parsed_date = date_str
        else:
            return None
        
        # Calculate days difference
        today = datetime.datetime.now()
        days_diff = (today - parsed_date).days
        return days_diff
    except Exception:
        return None

def filter_by_days_since_purchase(df, filter_option):
    """
    Filter dataframe by days since last purchase
    """
    if filter_option == "Todos":
        return df
    
    # Calculate days since purchase for each row
    df = df.copy()
    df['days_since_purchase'] = df['Data da Última Compra'].apply(calculate_days_since_purchase)
    
    if filter_option == "Últimos 30 dias":
        return df[df['days_since_purchase'] <= 30]
    elif filter_option == "31-60 dias":
        return df[(df['days_since_purchase'] > 30) & (df['days_since_purchase'] <= 60)]
    elif filter_option == "61-90 dias":
        return df[(df['days_since_purchase'] > 60) & (df['days_since_purchase'] <= 90)]
    elif filter_option == "Mais de 90 dias":
        return df[df['days_since_purchase'] > 90]
    
    return df

def main():
    # Custom CSS for styling
    st.markdown("""
    <style>
    .main-header {
        background: linear-gradient(90deg, #9BC53D 0%, #7BA428 100%);
        padding: 1rem 2rem;
        border-radius: 10px;
        margin-bottom: 2rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .logo-container {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    .title-text {
        color: white;
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    .subtitle-text {
        color: rgba(255,255,255,0.9);
        font-size: 1.1rem;
        margin: 0;
        font-weight: 400;
    }
    .metric-card {
        background: linear-gradient(135deg, #f8fcf4 0%, #e8f5d3 100%);
        border: 2px solid #9BC53D;
        border-radius: 10px;
        padding: 1rem;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .filter-section {
        background: linear-gradient(135deg, #f8fcf4 0%, #e8f5d3 100%);
        border: 1px solid #9BC53D;
        border-radius: 10px;
        padding: 1.5rem;
        margin: 1rem 0;
    }
    .success-message {
        background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
        border: 1px solid #9BC53D;
        border-radius: 8px;
        padding: 1rem;
        color: #155724;
        margin: 1rem 0;
    }
    .stSelectbox > div > div {
        background-color: white;
        border: 2px solid #9BC53D;
        border-radius: 8px;
    }
    .stTextInput > div > div > input {
        border: 2px solid #9BC53D;
        border-radius: 8px;
    }
    .stDataFrame {
        border: 2px solid #9BC53D;
        border-radius: 10px;
        overflow: hidden;
    }
    </style>
    """, unsafe_allow_html=True)
    
    # Header with logo
    st.markdown("""
    <div class="main-header">
        <div class="logo-container">
            <h1 class="title-text">🌿 Ekobrazil - Dados de Clientes</h1>
        </div>
        <p class="subtitle-text">Inteligência Ecológica - Sistema de Gestão de Clientes</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Display logo
    col1, col2, col3 = st.columns([1, 2, 1])
    with col2:
        try:
            st.image("logo.png", width=400)
        except:
            st.info("Logo Ekobrazil")
    
    # Load the fixed data file
    df = load_customer_data()
    
    if df is not None:
        try:
            # Show loading spinner
            with st.spinner('Processando dados...'):
                # Validate columns
                is_valid, result = validate_columns(df)
                
                if not is_valid:
                    st.error(f"❌ {result}")
                    st.info("💡 **Problema:** O arquivo não tem as colunas necessárias.")
                    # Show available columns
                    st.subheader("Colunas encontradas no arquivo:")
                    st.write(list(df.columns))
                    return
                
                # Process the dataframe
                column_mapping = result
                processed_df = process_dataframe(df, column_mapping)
                
                if len(processed_df) == 0:
                    st.warning("⚠️ Nenhum dado válido encontrado no arquivo.")
                    return
                
                # Display success message and data summary
                st.markdown(f"""
                <div class="success-message">
                    <h4>✅ Dados carregados com sucesso!</h4>
                    <p>{len(processed_df)} clientes encontrados na base de dados Ekobrazil</p>
                </div>
                """, unsafe_allow_html=True)
                
                # Filter and search functionality
                st.markdown("""
                <div class="filter-section">
                    <h3 style="color: #7BA428; margin-top: 0;">🔍 Filtros e Pesquisa</h3>
                </div>
                """, unsafe_allow_html=True)
                
                col1, col2, col3 = st.columns([2, 2, 1])
                with col1:
                    search_term = st.text_input(
                        "Pesquisar por nome",
                        placeholder="Digite o nome do cliente..."
                    )
                with col2:
                    time_filter = st.selectbox(
                        "Filtrar por última compra",
                        ["Todos", "Últimos 30 dias", "31-60 dias", "61-90 dias", "Mais de 90 dias"],
                        help="Filtrar clientes pelo tempo desde a última compra"
                    )
                with col3:
                    sort_option = st.selectbox(
                        "Ordenar por",
                        ["Nome", "Data da Última Compra"],
                        help="Escolha como ordenar a tabela"
                    )
                
                # Apply time filter first
                filtered_df = filter_by_days_since_purchase(processed_df, time_filter)
                
                # Filter data based on search
                if search_term:
                    mask = filtered_df['Nome'].str.contains(search_term, case=False, na=False)
                    filtered_df = filtered_df[mask].copy()
                
                # Sort data
                if sort_option == "Nome":
                    filtered_df = filtered_df.sort_values('Nome').copy()
                else:
                    # Sort by date, handling empty dates
                    filtered_df_with_dates = filtered_df[filtered_df['Data da Última Compra'] != ""].copy()
                    filtered_df_without_dates = filtered_df[filtered_df['Data da Última Compra'] == ""].copy()
                    
                    if len(filtered_df_with_dates) > 0:
                        # Convert to datetime for proper sorting
                        filtered_df_with_dates['date_sort'] = pd.to_datetime(
                            filtered_df_with_dates['Data da Última Compra'], 
                            format="%d/%m/%Y",
                            errors='coerce'
                        )
                        filtered_df_with_dates = filtered_df_with_dates.sort_values('date_sort', ascending=False).copy()
                        filtered_df_with_dates = filtered_df_with_dates.drop('date_sort', axis=1)
                        
                        filtered_df = pd.concat([filtered_df_with_dates, filtered_df_without_dates], ignore_index=True).copy()
                
                # Display data summaries with custom styling
                st.markdown("### 📊 Resumo dos Dados")
                col1, col2, col3, col4 = st.columns(4)
                with col1:
                    st.markdown(f"""
                    <div class="metric-card">
                        <h2 style="color: #7BA428; margin: 0;">{len(processed_df)}</h2>
                        <p style="margin: 0; color: #555;">Total de Clientes</p>
                    </div>
                    """, unsafe_allow_html=True)
                with col2:
                    st.markdown(f"""
                    <div class="metric-card">
                        <h2 style="color: #7BA428; margin: 0;">{len(filtered_df)}</h2>
                        <p style="margin: 0; color: #555;">Filtrados</p>
                    </div>
                    """, unsafe_allow_html=True)
                with col3:
                    valid_phones = len(filtered_df[filtered_df['Telefone'] != ""])
                    st.markdown(f"""
                    <div class="metric-card">
                        <h2 style="color: #7BA428; margin: 0;">{valid_phones}</h2>
                        <p style="margin: 0; color: #555;">Com Telefone</p>
                    </div>
                    """, unsafe_allow_html=True)
                with col4:
                    valid_dates = len(filtered_df[filtered_df['Data da Última Compra'] != ""])
                    st.markdown(f"""
                    <div class="metric-card">
                        <h2 style="color: #7BA428; margin: 0;">{valid_dates}</h2>
                        <p style="margin: 0; color: #555;">Com Data de Compra</p>
                    </div>
                    """, unsafe_allow_html=True)
                
                # Display filtered results count
                if search_term or time_filter != "Todos":
                    st.info(f"📋 Mostrando {len(filtered_df)} de {len(processed_df)} clientes")
                
                # Display the data table
                if len(filtered_df) > 0:
                    st.markdown("### 📋 Dados dos Clientes Ekobrazil")
                    st.markdown("---")
                    
                    # Remove the temporary 'days_since_purchase' column if it exists
                    display_df = filtered_df.copy()
                    if hasattr(display_df, 'columns') and 'days_since_purchase' in display_df.columns:
                        display_df = display_df.drop('days_since_purchase', axis=1)
                    
                    # Use Streamlit's dataframe with better formatting
                    st.dataframe(
                        display_df,
                        use_container_width=True,
                        hide_index=True,
                        column_config={
                            "Nome": st.column_config.TextColumn(
                                "Nome",
                                help="Nome do cliente",
                                max_chars=50,
                            ),
                            "Telefone": st.column_config.TextColumn(
                                "Telefone",
                                help="Número de telefone do cliente",
                            ),
                            "Data da Última Compra": st.column_config.TextColumn(
                                "Data da Última Compra",
                                help="Data da última compra realizada",
                            ),
                        }
                    )
                    
                    # Download filtered data
                    if len(display_df) > 0 and hasattr(display_df, 'to_csv'):
                        csv = display_df.to_csv(index=False, encoding='utf-8-sig')
                        st.download_button(
                            label="🌿 Baixar dados Ekobrazil (CSV)",
                            data=csv,
                            file_name=f"ekobrazil_clientes_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.csv",
                            mime="text/csv"
                        )
                else:
                    st.warning("🔍 Nenhum cliente encontrado com os critérios selecionados.")
                
        except Exception as e:
            st.error("❌ Erro ao processar os dados:")
            st.error(f"**Detalhes do erro:** {str(e)}")
            
            # Show detailed error for debugging
            with st.expander("Detalhes técnicos do erro"):
                st.code(traceback.format_exc())
    
    else:
        st.error("❌ Não foi possível carregar os dados dos clientes.")
        st.info("Certifique-se de que o arquivo 'CLIENTES_COM_PEDIDO_1755175187340.xlsx' está no diretório correto.")

if __name__ == "__main__":
    main()
