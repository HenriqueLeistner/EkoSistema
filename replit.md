# Customer Data Viewer

## Overview

This is a comprehensive Streamlit-based web application designed for viewing and analyzing customer data and order information. The application integrates multiple data sources including customer statistics, basic customer information, detailed order data, and historical customer records. It provides advanced filtering capabilities, sales analysis, and comprehensive business intelligence features.

## User Preferences

Preferred communication style: Simple, everyday language.
Login credentials: daniela / eko@eko (added as primary user access)

## System Architecture

### Frontend Architecture
- **Framework**: Streamlit for web interface
- **Layout**: Wide layout configuration for better data visualization
- **Data Processing**: Pandas for CSV file handling and data manipulation
- **User Interface**: Simple file upload and data display components

### Data Processing Layer
- **Multi-Source Data Loading**: Automatically loads data from multiple Excel files:
  - CLIENTE_QUANTIDADE_PEDIDO_1755624819036.xlsx (512 customers with order statistics)
  - CLIENTES_COM_PEDIDO_1755624819038.xlsx (491 basic customer records)
  - LISTAR_PEDIDO_1755624819039.xlsx (739 detailed order records)
  - CLIENTES_COM_PEDIDO_1755175187340.xlsx (359 historical customer records)
- **Data Integration**: Intelligent merging and correlation of data across multiple sources
- **Advanced Filtering**: Multi-dimensional filtering by customer attributes, order status, time periods, and financial metrics
- **Data Transformation**: Automatic formatting for currency, dates, phone numbers, and addresses
- **Caching System**: Streamlit @cache_data decorator for optimized performance
- **Error Handling**: Comprehensive validation with user-friendly error messaging

### Data Model
The application integrates multiple related data structures:

**Customer Statistics (CLIENTE_QUANTIDADE_PEDIDO)**:
- Customer ID, Name, CPF/CNPJ, Email, Phone
- Order counts (total, approved, rejected)
- Financial metrics (total value, approved value, rejected value)
- Complete address information (street, city, state, ZIP)
- Registration date

**Basic Customer Information (CLIENTES_COM_PEDIDO)**:
- Customer ID, Name, CPF/CNPJ, Email, Phone
- Account creation date

**Order Details (LISTAR_PEDIDO)**:
- Customer email, order number, status
- Payment and shipping information
- Order values (subtotal, shipping, discount, total)
- Complete delivery address information
- Order creation date and items

**Historical Customer Data (CLIENTES_COM_PEDIDO_original)**:
- Name, CPF/CNPJ, Phone, Last purchase date
- Legacy format for backward compatibility

### Configuration Management
- **Page Settings**: Centralized configuration for page title, icon, and layout
- **Column Mapping**: Flexible mapping system for different CSV column naming conventions
- **Validation Rules**: Standardized validation logic for required data fields

## External Dependencies

### Core Libraries
- **Streamlit**: Web application framework for creating the user interface
- **Pandas**: Data manipulation and analysis library for CSV processing
- **Python Standard Library**: 
  - `datetime` for date handling
  - `io.StringIO` for string-based file operations
  - `traceback` for error debugging

### Data Sources
- **Customer Statistics File**: CLIENTE_QUANTIDADE_PEDIDO_1755624819036.xlsx (512 customers with comprehensive order statistics)
- **Customer Database**: CLIENTES_COM_PEDIDO_1755624819038.xlsx (491 customer records with contact information)
- **Order Database**: LISTAR_PEDIDO_1755624819039.xlsx (739 detailed order records with full transaction data)
- **Historical Data**: CLIENTES_COM_PEDIDO_1755175187340.xlsx (359 legacy customer records)
- **Local File System**: Direct Excel file loading from the application directory

### Key Features Added (Latest Update - August 2025)
- **Integrated Multi-Source Dashboard**: Combines customer statistics, order data, and historical records
- **Tabbed Interface**: Four specialized views (Customer Summary, Order Data, Customer List, Period Analysis)
- **Period Analysis Dashboard**: Orders filtered by time periods with daily charts and metrics
- **Advanced Date Filtering**: Pre-defined periods (7/30/90 days, monthly, yearly) and custom date ranges
- **Enhanced Filtering System**: Multi-dimensional filters by name, email, order count, status, geographic location, and value
- **Financial Metrics**: Real-time calculation of totals, averages, and business KPIs
- **Data Export Capabilities**: CSV download functionality for all filtered datasets
- **Performance Optimization**: Streamlit caching for faster data loading and processing
- **Professional Business Intelligence**: Period analysis with daily order charts and trend visualization
- **Responsive Design**: Ekobrazil-branded interface with green theme (#9BC53D, #7BA428)
- **Currency Formatting**: Brazilian Real (R$) formatting for all financial values
- **Date Standardization**: Consistent DD/MM/YYYY date formatting across all data sources
- **Phone Number Formatting**: Automatic Brazilian phone number formatting with area codes

The application is designed to be lightweight and self-contained, with minimal external dependencies and no database requirements for basic functionality.