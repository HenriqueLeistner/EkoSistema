import streamlit as st
import pandas as pd
import datetime
from io import StringIO
import traceback
import numpy as np
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
import io

# Page configuration
st.set_page_config(
    page_title="Ekobrazil - Dados de Clientes e Pedidos",
    page_icon="🌿",
    layout="wide",
    initial_sidebar_state="collapsed"
)

@st.cache_data
def load_all_data():
    """
    Load all customer and order data files
    """
    data = {}
    
    try:
        # Load customer quantity data (main dataset)
        data['customer_stats'] = pd.read_excel('CLIENTE_QUANTIDADE_PEDIDO_1755624819036.xlsx')
        
        # Load basic customer data
        data['customers'] = pd.read_excel('CLIENTES_COM_PEDIDO_1755624819038.xlsx')
        
        # Load detailed orders (updated file)
        data['orders'] = pd.read_excel('LISTAR_PEDIDO_1757014215300.xlsx')
        
        # Load original customer data (for compatibility)
        data['original_customers'] = pd.read_excel('CLIENTES_COM_PEDIDO_1755175187340.xlsx')
        
        return data
    except Exception as e:
        st.error(f"Erro ao carregar os dados: {str(e)}")
        return None

def clean_phone_number(phone):
    """Clean and format phone numbers"""
    if pd.isna(phone):
        return ""
    
    phone_str = str(phone).strip()
    cleaned = ''.join(filter(str.isdigit, phone_str))
    
    if len(cleaned) == 11 and cleaned.startswith('55'):
        cleaned = cleaned[2:]
    elif len(cleaned) == 13 and cleaned.startswith('55'):
        cleaned = cleaned[2:]
    
    if len(cleaned) == 11:
        return f"({cleaned[:2]}) {cleaned[2:7]}-{cleaned[7:]}"
    elif len(cleaned) == 10:
        return f"({cleaned[:2]}) {cleaned[2:6]}-{cleaned[6:]}"
    else:
        return phone_str

def format_currency(value):
    """Format currency values"""
    if pd.isna(value) or value == 0:
        return "R$ 0,00"
    return f"R$ {value:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")

def format_date(date_value):
    """Format date values"""
    if pd.isna(date_value):
        return ""
    
    try:
        if isinstance(date_value, (pd.Timestamp, datetime.datetime)):
            return date_value.strftime("%d/%m/%Y")
        
        if isinstance(date_value, str):
            date_formats = ["%Y-%m-%d", "%d/%m/%Y", "%m/%d/%Y", "%d-%m-%Y", "%d/%m/%Y %H:%M"]
            for fmt in date_formats:
                try:
                    parsed_date = datetime.datetime.strptime(date_value, fmt)
                    return parsed_date.strftime("%d/%m/%Y")
                except ValueError:
                    continue
        
        return str(date_value)
    except Exception:
        return str(date_value)

def create_pdf_report(df, title="Relatório Ekobrazil"):
    """Create optimized PDF report from DataFrame"""
    from reportlab.lib.pagesizes import landscape, A4
    
    buffer = io.BytesIO()
    
    # Use landscape for tables with many columns
    pagesize = landscape(A4) if len(df.columns) > 4 else A4
    
    # Create PDF document
    doc = SimpleDocTemplate(buffer, pagesize=pagesize, 
                           rightMargin=50, leftMargin=50,
                           topMargin=50, bottomMargin=30)
    
    # Get style sheet and create custom styles
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=16,
        textColor=colors.HexColor('#7BA428'),
        spaceAfter=15,
        alignment=1  # Center alignment
    )
    
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.grey,
        spaceAfter=20,
        alignment=1  # Center alignment
    )
    
    # Build content
    elements = []
    
    # Title and subtitle
    elements.append(Paragraph(title, title_style))
    elements.append(Paragraph("🌿 Ekobrazil - Inteligência Ecológica", subtitle_style))
    elements.append(Paragraph(f"Gerado em: {datetime.datetime.now().strftime('%d/%m/%Y às %H:%M')}", subtitle_style))
    elements.append(Paragraph(f"Total de registros: {len(df)}", subtitle_style))
    elements.append(Spacer(1, 20))
    
    # Convert DataFrame to table data
    if not df.empty:
        # Optimize data for PDF display
        display_df = df.copy()
        
        # Limit columns if too many
        max_cols = 8 if pagesize == landscape(A4) else 6
        if len(display_df.columns) > max_cols:
            display_df = display_df.iloc[:, :max_cols]
            st.info(f"PDF limitado às primeiras {max_cols} colunas para melhor visualização.")
        
        # Prepare data for table
        data_list = [display_df.columns.tolist()]  # Headers
        
        for _, row in display_df.iterrows():
            row_data = []
            for i, value in enumerate(row):
                if pd.isna(value):
                    row_data.append("")
                else:
                    # Format based on column content
                    str_value = str(value)
                    
                    # Limit cell content based on column type
                    if 'email' in display_df.columns[i].lower():
                        max_len = 25
                    elif 'nome' in display_df.columns[i].lower():
                        max_len = 20
                    elif 'telefone' in display_df.columns[i].lower():
                        max_len = 15
                    elif any(x in display_df.columns[i].lower() for x in ['valor', 'total', 'preco']):
                        max_len = 12
                    else:
                        max_len = 15
                    
                    if len(str_value) > max_len:
                        str_value = str_value[:max_len-3] + "..."
                    
                    row_data.append(str_value)
            data_list.append(row_data)
        
        # Calculate column widths dynamically
        page_width = pagesize[0] - 100  # Account for margins
        num_cols = len(display_df.columns)
        
        # Base column widths
        if num_cols <= 4:
            col_widths = [page_width * 0.3, page_width * 0.25, page_width * 0.25, page_width * 0.2][:num_cols]
        elif num_cols <= 6:
            col_widths = [page_width / num_cols] * num_cols
        else:
            col_widths = [page_width / num_cols * 0.8] * num_cols
        
        # Create table with dynamic widths
        table = Table(data_list, colWidths=col_widths, repeatRows=1)
        
        # Table styling
        table.setStyle(TableStyle([
            # Header styling
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#9BC53D')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 8),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
            ('TOPPADDING', (0, 0), (-1, 0), 8),
            
            # Data rows styling
            ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 1), (-1, -1), 7),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('TOPPADDING', (0, 1), (-1, -1), 4),
            ('BOTTOMPADDING', (0, 1), (-1, -1), 4),
            
            # Alternate row colors
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f8fcf4')]),
            
            # Left align text columns, right align numbers
            ('ALIGN', (0, 1), (0, -1), 'LEFT'),  # First column left
            ('ALIGN', (-2, 1), (-1, -1), 'RIGHT'),  # Last two columns right
        ]))
        
        elements.append(table)
        
        # Add summary if data exists
        if len(df) > 50:
            elements.append(Spacer(1, 20))
            summary_text = f"Relatório contém {len(df)} registros. Mostrando dados principais para visualização otimizada."
            elements.append(Paragraph(summary_text, styles['Normal']))
            
    else:
        elements.append(Paragraph("Nenhum dado disponível para exibir.", styles['Normal']))
    
    # Add page footer template
    def add_page_number(canvas, doc):
        canvas.saveState()
        canvas.setFont('Helvetica', 8)
        page_num = canvas.getPageNumber()
        text = f"Página {page_num} - Sistema Ekobrazil"
        canvas.drawRightString(pagesize[0] - 50, 20, text)
        canvas.restoreState()
    
    # Build PDF with page numbers
    doc.build(elements, onFirstPage=add_page_number, onLaterPages=add_page_number)
    
    buffer.seek(0)
    return buffer.getvalue()

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
    .tab-content {
        padding: 1rem 0;
    }
    </style>
    """, unsafe_allow_html=True)
    
    # Header
    st.markdown("""
    <div class="main-header">
        <h1 class="title-text">🌿 Ekobrazil - Sistema Integrado de Clientes e Pedidos</h1>
        <p class="subtitle-text">Inteligência Ecológica - Gestão Completa de Clientes e Vendas</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Display logo
    col1, col2, col3 = st.columns([1, 2, 1])
    with col2:
        try:
            st.image("logo.png", width=400)
        except:
            st.info("Logo Ekobrazil")
    
    # Load data
    data = load_all_data()
    
    if data is None:
        st.error("❌ Não foi possível carregar os dados.")
        return
    
    # Create tabs for different data views
    tab1, tab2, tab3, tab4 = st.tabs([
        "📊 Resumo de Clientes", 
        "🛒 Dados de Pedidos", 
        "📋 Lista Completa de Clientes",
        "📈 Análise de Vendas"
    ])
    
    with tab1:
        st.markdown('<div class="tab-content">', unsafe_allow_html=True)
        show_customer_summary(data['customer_stats'])
        st.markdown('</div>', unsafe_allow_html=True)
    
    with tab2:
        st.markdown('<div class="tab-content">', unsafe_allow_html=True)
        show_orders_data(data['orders'])
        st.markdown('</div>', unsafe_allow_html=True)
    
    with tab3:
        st.markdown('<div class="tab-content">', unsafe_allow_html=True)
        show_customer_list(data['customers'])
        st.markdown('</div>', unsafe_allow_html=True)
    
    with tab4:
        st.markdown('<div class="tab-content">', unsafe_allow_html=True)
        show_sales_analysis(data['customer_stats'], data['orders'])
        st.markdown('</div>', unsafe_allow_html=True)

def show_customer_summary(df):
    """Show customer summary with statistics"""
    st.markdown("### 📊 Resumo Estatístico de Clientes")
    
    # Display summary metrics
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.markdown(f"""
        <div class="metric-card">
            <h2 style="color: #7BA428; margin: 0;">{len(df)}</h2>
            <p style="margin: 0; color: #555;">Total de Clientes</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        total_orders = df['PEDIDOS'].sum()
        st.markdown(f"""
        <div class="metric-card">
            <h2 style="color: #7BA428; margin: 0;">{total_orders}</h2>
            <p style="margin: 0; color: #555;">Total de Pedidos</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        total_value = df['VALOR_PEDIDOS_TOTAL'].sum()
        st.markdown(f"""
        <div class="metric-card">
            <h2 style="color: #7BA428; margin: 0;">{format_currency(total_value)}</h2>
            <p style="margin: 0; color: #555;">Valor Total</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col4:
        approved_orders = df['QTD_APROVADOS'].sum()
        st.markdown(f"""
        <div class="metric-card">
            <h2 style="color: #7BA428; margin: 0;">{approved_orders}</h2>
            <p style="margin: 0; color: #555;">Pedidos Aprovados</p>
        </div>
        """, unsafe_allow_html=True)
    
    # Filters
    st.markdown("""
    <div class="filter-section">
        <h3 style="color: #7BA428; margin-top: 0;">🔍 Filtros</h3>
    </div>
    """, unsafe_allow_html=True)
    
    col1, col2, col3 = st.columns(3)
    with col1:
        search_name = st.text_input("Pesquisar por nome", key="customer_search")
    with col2:
        min_orders = st.number_input("Mínimo de pedidos", min_value=0, value=0, key="min_orders")
    with col3:
        state_filter = st.selectbox("Filtrar por estado", 
                                  ["Todos"] + sorted(df['ENDERECO_ESTADO'].dropna().unique().tolist()),
                                  key="state_filter")
    
    # Apply filters
    filtered_df = df.copy()
    
    if search_name:
        filtered_df = filtered_df[filtered_df['CLIENTE_NOME'].str.contains(search_name, case=False, na=False)]
    
    if min_orders > 0:
        filtered_df = filtered_df[filtered_df['PEDIDOS'] >= min_orders]
    
    if state_filter != "Todos":
        filtered_df = filtered_df[filtered_df['ENDERECO_ESTADO'] == state_filter]
    
    # Show filtered results
    st.info(f"📋 Mostrando {len(filtered_df)} de {len(df)} clientes")
    
    if len(filtered_df) > 0:
        # Prepare display dataframe
        display_df = filtered_df[['CLIENTE_NOME', 'CLIENTE_EMAIL', 'CLIENTE_TELEFONE_CELULAR', 
                                'PEDIDOS', 'QTD_APROVADOS', 'VALOR_PEDIDOS_TOTAL', 
                                'ENDERECO_CIDADE', 'ENDERECO_ESTADO']].copy()
        
        display_df['CLIENTE_TELEFONE_CELULAR'] = display_df['CLIENTE_TELEFONE_CELULAR'].apply(clean_phone_number)
        display_df['VALOR_PEDIDOS_TOTAL'] = display_df['VALOR_PEDIDOS_TOTAL'].apply(format_currency)
        
        display_df.columns = ['Nome', 'Email', 'Telefone', 'Pedidos', 'Aprovados', 'Valor Total', 'Cidade', 'Estado']
        
        st.dataframe(display_df, use_container_width=True, hide_index=True)
        
        # Download buttons
        col1, col2 = st.columns(2)
        with col1:
            csv = display_df.to_csv(index=False, encoding='utf-8-sig')
            st.download_button(
                label="🌿 Baixar CSV",
                data=csv,
                file_name=f"ekobrazil_clientes_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.csv",
                mime="text/csv",
                use_container_width=True
            )
        with col2:
            pdf_data = create_pdf_report(display_df, "Resumo de Clientes - Ekobrazil")
            st.download_button(
                label="📄 Baixar PDF",
                data=pdf_data,
                file_name=f"ekobrazil_clientes_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf",
                mime="application/pdf",
                use_container_width=True
            )

def show_orders_data(df):
    """Show orders data with filters"""
    st.markdown("### 🛒 Dados de Pedidos")
    
    # Summary metrics
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.markdown(f"""
        <div class="metric-card">
            <h2 style="color: #7BA428; margin: 0;">{len(df)}</h2>
            <p style="margin: 0; color: #555;">Total de Pedidos</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        total_value = df['PEDIDO_VALOR_TOTAL'].sum()
        st.markdown(f"""
        <div class="metric-card">
            <h2 style="color: #7BA428; margin: 0;">{format_currency(total_value)}</h2>
            <p style="margin: 0; color: #555;">Valor Total</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        avg_value = df['PEDIDO_VALOR_TOTAL'].mean()
        st.markdown(f"""
        <div class="metric-card">
            <h2 style="color: #7BA428; margin: 0;">{format_currency(avg_value)}</h2>
            <p style="margin: 0; color: #555;">Ticket Médio</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col4:
        unique_customers = df['CLIENTE_EMAIL'].nunique()
        st.markdown(f"""
        <div class="metric-card">
            <h2 style="color: #7BA428; margin: 0;">{unique_customers}</h2>
            <p style="margin: 0; color: #555;">Clientes Únicos</p>
        </div>
        """, unsafe_allow_html=True)
    
    # Filters
    st.markdown("""
    <div class="filter-section">
        <h3 style="color: #7BA428; margin-top: 0;">🔍 Filtros de Pedidos</h3>
    </div>
    """, unsafe_allow_html=True)
    
    col1, col2, col3 = st.columns(3)
    with col1:
        email_search = st.text_input("Pesquisar por email", key="email_search")
    with col2:
        status_filter = st.selectbox("Status do pedido", 
                                   ["Todos"] + sorted(df['PEDIDO_SITUACAO'].dropna().unique().tolist()),
                                   key="status_filter")
    with col3:
        min_value = st.number_input("Valor mínimo do pedido", min_value=0.0, value=0.0, key="min_value")
    
    # Apply filters
    filtered_df = df.copy()
    
    if email_search:
        filtered_df = filtered_df[filtered_df['CLIENTE_EMAIL'].str.contains(email_search, case=False, na=False)]
    
    if status_filter != "Todos":
        filtered_df = filtered_df[filtered_df['PEDIDO_SITUACAO'] == status_filter]
    
    if min_value > 0:
        filtered_df = filtered_df[filtered_df['PEDIDO_VALOR_TOTAL'] >= min_value]
    
    st.info(f"📋 Mostrando {len(filtered_df)} de {len(df)} pedidos")
    
    if len(filtered_df) > 0:
        # Prepare display dataframe
        display_df = filtered_df[['CLIENTE_EMAIL', 'PEDIDO_NUMERO', 'PEDIDO_SITUACAO', 
                                'PEDIDO_VALOR_TOTAL', 'PEDIDO_DATA_CRIACAO', 'PAGAMENTO_NOME',
                                'ENDERECO_ENTREGA_CIDADE', 'ENDERECO_ENTREGA_ESTADO']].copy()
        
        display_df['PEDIDO_VALOR_TOTAL'] = display_df['PEDIDO_VALOR_TOTAL'].apply(format_currency)
        display_df['PEDIDO_DATA_CRIACAO'] = display_df['PEDIDO_DATA_CRIACAO'].apply(format_date)
        
        display_df.columns = ['Email', 'Número', 'Status', 'Valor', 'Data', 'Pagamento', 'Cidade', 'Estado']
        
        st.dataframe(display_df, use_container_width=True, hide_index=True)
        
        # Download buttons
        col1, col2 = st.columns(2)
        with col1:
            csv = display_df.to_csv(index=False, encoding='utf-8-sig')
            st.download_button(
                label="🌿 Baixar CSV",
                data=csv,
                file_name=f"ekobrazil_pedidos_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.csv",
                mime="text/csv",
                use_container_width=True
            )
        with col2:
            pdf_data = create_pdf_report(display_df, "Dados de Pedidos - Ekobrazil")
            st.download_button(
                label="📄 Baixar PDF",
                data=pdf_data,
                file_name=f"ekobrazil_pedidos_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf",
                mime="application/pdf",
                use_container_width=True
            )

def show_customer_list(df):
    """Show simple customer list"""
    st.markdown("### 📋 Lista Completa de Clientes")
    
    # Display metrics
    col1, col2 = st.columns(2)
    with col1:
        st.markdown(f"""
        <div class="metric-card">
            <h2 style="color: #7BA428; margin: 0;">{len(df)}</h2>
            <p style="margin: 0; color: #555;">Total de Clientes</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        with_phone = len(df[df['CLIENTE_TELEFONE_CELULAR'].notna()])
        st.markdown(f"""
        <div class="metric-card">
            <h2 style="color: #7BA428; margin: 0;">{with_phone}</h2>
            <p style="margin: 0; color: #555;">Com Telefone</p>
        </div>
        """, unsafe_allow_html=True)
    
    # Search filter
    search_term = st.text_input("Pesquisar cliente", key="customer_list_search")
    
    filtered_df = df.copy()
    if search_term:
        filtered_df = filtered_df[
            filtered_df['CLIENTE_NOME'].str.contains(search_term, case=False, na=False) |
            filtered_df['CLIENTE_EMAIL'].str.contains(search_term, case=False, na=False)
        ]
    
    st.info(f"📋 Mostrando {len(filtered_df)} de {len(df)} clientes")
    
    if len(filtered_df) > 0:
        display_df = filtered_df[['CLIENTE_NOME', 'CLIENTE_EMAIL', 'CLIENTE_TELEFONE_CELULAR', 'CLIENTE_DATA_CRIACAO']].copy()
        display_df['CLIENTE_TELEFONE_CELULAR'] = display_df['CLIENTE_TELEFONE_CELULAR'].apply(clean_phone_number)
        display_df['CLIENTE_DATA_CRIACAO'] = display_df['CLIENTE_DATA_CRIACAO'].apply(format_date)
        
        display_df.columns = ['Nome', 'Email', 'Telefone', 'Data Cadastro']
        
        st.dataframe(display_df, use_container_width=True, hide_index=True)

def show_sales_analysis(customer_stats_df, orders_df):
    """Show sales analysis dashboard"""
    st.markdown("### 📈 Análise de Vendas")
    
    # Top customers by value
    st.markdown("#### 🏆 Top 10 Clientes por Valor")
    top_customers = customer_stats_df.nlargest(10, 'VALOR_PEDIDOS_TOTAL')[['CLIENTE_NOME', 'VALOR_PEDIDOS_TOTAL', 'PEDIDOS']]
    top_customers['VALOR_PEDIDOS_TOTAL'] = top_customers['VALOR_PEDIDOS_TOTAL'].apply(format_currency)
    top_customers.columns = ['Cliente', 'Valor Total', 'Pedidos']
    st.dataframe(top_customers, use_container_width=True, hide_index=True)
    
    # Orders by status
    st.markdown("#### 📊 Pedidos por Status")
    status_summary = orders_df['PEDIDO_SITUACAO'].value_counts()
    col1, col2 = st.columns(2)
    with col1:
        st.bar_chart(status_summary)
    with col2:
        for status, count in status_summary.items():
            percentage = (count / len(orders_df)) * 100
            st.metric(f"{status}", f"{count} ({percentage:.1f}%)")
    
    # Recent orders
    st.markdown("#### 🕒 Pedidos Recentes")
    orders_df['PEDIDO_DATA_CRIACAO'] = pd.to_datetime(orders_df['PEDIDO_DATA_CRIACAO'], errors='coerce')
    recent_orders = orders_df.nlargest(10, 'PEDIDO_DATA_CRIACAO')[['CLIENTE_EMAIL', 'PEDIDO_NUMERO', 'PEDIDO_VALOR_TOTAL', 'PEDIDO_DATA_CRIACAO']]
    recent_orders['PEDIDO_VALOR_TOTAL'] = recent_orders['PEDIDO_VALOR_TOTAL'].apply(format_currency)
    recent_orders['PEDIDO_DATA_CRIACAO'] = recent_orders['PEDIDO_DATA_CRIACAO'].dt.strftime('%d/%m/%Y')
    recent_orders.columns = ['Email', 'Número', 'Valor', 'Data']
    st.dataframe(recent_orders, use_container_width=True, hide_index=True)

if __name__ == "__main__":
    main()