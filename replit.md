# Customer Data Viewer

## Overview

This is a Streamlit-based web application designed for viewing and analyzing customer data. The application loads a fixed customer dataset (CLIENTES_COM_PEDIDO_1755175187340.xlsx) and provides filtering capabilities based on the time since last purchase. It features intelligent time-based filtering options (30, 60, 90, and 90+ days) along with search and sorting functionality.

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
- **Fixed Data Loading**: Automatically loads customer data from CLIENTES_COM_PEDIDO_1755175187340.xlsx file
- **Column Validation**: Intelligent column mapping system that recognizes common variations of customer data field names
- **Time-based Filtering**: Advanced filtering system that calculates days since last purchase and provides predefined time ranges
- **Data Transformation**: Automatic column name normalization, phone number formatting, and date handling
- **Error Handling**: Comprehensive validation with user-friendly error messaging

### Data Model
The application expects customer data with three core fields:
- **Customer Name**: Accepts variations like 'nome', 'name', 'customer', 'cliente', 'customer_name'
- **Phone Number**: Accepts variations like 'telefone', 'phone', 'telephone', 'celular', 'mobile'
- **Last Purchase Date**: Accepts variations like 'data_ultima_compra', 'last_purchase', 'ultima_compra', 'data_compra', 'purchase_date'

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
- **Fixed Excel File**: CLIENTES_COM_PEDIDO_1755175187340.xlsx containing 359 customer records with names, phone numbers, and last purchase dates
- **Local File System**: Direct file loading from the application directory

### Key Features Added (Latest Update)
- **HTML/CSS/JavaScript Version**: Complete frontend system without backend dependencies
- **Time-based Filtering**: Filter customers by days since last purchase (30, 60, 90, 90+ days)
- **Automatic Data Loading**: No file upload required - data loads automatically on app start
- **Advanced Date Processing**: Handles various date formats and calculates time differences
- **Enhanced User Interface**: Improved layout with filter options and better metrics display
- **Custom Branding**: Ekobrazil theme with green color scheme (#9BC53D, #7BA428)
- **Logo Integration**: Company logo display with branded header
- **Professional Styling**: Custom CSS with gradients, shadows, and green-themed components
- **Standalone Web System**: Ready for hosting on any web server or static hosting service
- **Mobile Responsive**: Optimized for desktop, tablet, and mobile devices

The application is designed to be lightweight and self-contained, with minimal external dependencies and no database requirements for basic functionality.