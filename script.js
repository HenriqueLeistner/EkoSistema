// Sistema Integrado de Clientes e Pedidos Ekobrazil

class EkobrazilIntegratedSystem {
    constructor() {
        this.data = null;
        this.currentTab = 'customer-summary';
        this.filteredData = {
            customerStats: [],
            orders: [],
            customers: [],
            originalCustomers: []
        };
        
        // Registrar instância global para debug
        window.EkobrazilSystemInstance = this;
        
        this.init();
    }

    init() {
        console.log('Inicializando EkobrazilSystem...');
        
        // Verificar autenticação
        const session = sessionStorage.getItem('ekobrazil_session');
        if (!session) {
            console.log('Usuário não autenticado, redirecionando...');
            window.location.href = 'login.html';
            return;
        }

        // Verificar se a sessão ainda é válida
        try {
            const loginData = JSON.parse(session);
            const now = Date.now();
            const sessionTimeout = 8 * 60 * 60 * 1000; // 8 horas
            
            if (now - loginData.loginTime > sessionTimeout) {
                console.log('Sessão expirada, redirecionando...');
                sessionStorage.removeItem('ekobrazil_session');
                window.location.href = 'login.html';
                return;
            }
        } catch (e) {
            console.log('Sessão inválida, redirecionando...');
            sessionStorage.removeItem('ekobrazil_session');
            window.location.href = 'login.html';
            return;
        }

        // Aguardar carregamento dos dados
        if (typeof window.ekobrazilData === 'undefined') {
            console.log('Aguardando dados... Tentativa:', Date.now());
            setTimeout(() => this.init(), 500);
            return;
        }

        console.log('Dados carregados:', Object.keys(window.ekobrazilData));
        
        this.data = window.ekobrazilData;
        this.filteredData = {...this.data};
        
        // Load any saved data from localStorage
        this.loadDataFromLocalStorage();
        
        this.setupUserInfo();
        this.setupTabs();
        this.setupEventListeners();
        this.populateFilters();
        this.updateCurrentTab();
        
        console.log('Sistema inicializado com sucesso!');
    }

    setupUserInfo() {
        const welcomeElement = document.getElementById('welcomeUser');
        const session = sessionStorage.getItem('ekobrazil_session');
        if (session) {
            try {
                const loginData = JSON.parse(session);
                if (welcomeElement) {
                    welcomeElement.textContent = `Bem-vindo, ${loginData.username}`;
                }
            } catch (e) {
                if (welcomeElement) {
                    welcomeElement.textContent = 'Bem-vindo, Usuário';
                }
            }
        }
    }

    setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const tabId = e.target.getAttribute('data-tab');
                this.switchTab(tabId);
            });
        });
    }

    setupEventListeners() {
        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                sessionStorage.removeItem('ekobrazil_session');
                window.location.href = 'login.html';
            });
        }

        // Download button
        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.downloadCurrentData();
            });
        }

        // Filter event listeners for each tab
        this.setupCustomerSummaryFilters();
        this.setupOrdersFilters();
        this.setupCustomerListFilters();
        this.setupPeriodFilters();
    }

    setupCustomerSummaryFilters() {
        const searchInput = document.getElementById('customerSearchInput');
        const minOrdersFilter = document.getElementById('minOrdersFilter');
        const stateFilter = document.getElementById('stateFilter');

        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterCustomerStats());
        }
        if (minOrdersFilter) {
            minOrdersFilter.addEventListener('input', () => this.filterCustomerStats());
        }
        if (stateFilter) {
            stateFilter.addEventListener('change', () => this.filterCustomerStats());
        }
    }

    setupOrdersFilters() {
        const emailSearch = document.getElementById('emailSearchInput');
        const statusFilter = document.getElementById('statusFilter');
        const minValueFilter = document.getElementById('minValueFilter');
        const orderStateFilter = document.getElementById('orderStateFilter');

        if (emailSearch) {
            emailSearch.addEventListener('input', () => this.filterOrders());
        }
        if (statusFilter) {
            statusFilter.addEventListener('change', () => this.filterOrders());
        }
        if (minValueFilter) {
            minValueFilter.addEventListener('input', () => this.filterOrders());
        }
        if (orderStateFilter) {
            orderStateFilter.addEventListener('change', () => this.filterOrders());
        }
    }

    setupCustomerListFilters() {
        const searchInput = document.getElementById('customerListSearchInput');
        const stateFilter = document.getElementById('customerStateFilter');
        
        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterCustomerList());
        }
        if (stateFilter) {
            stateFilter.addEventListener('change', () => this.filterCustomerList());
        }
    }

    setupPeriodFilters() {
        const startDate = document.getElementById('startDateFilter');
        const endDate = document.getElementById('endDateFilter');
        const periodPreset = document.getElementById('periodPreset');

        if (startDate) {
            startDate.addEventListener('change', () => this.filterByPeriod());
        }
        if (endDate) {
            endDate.addEventListener('change', () => this.filterByPeriod());
        }
        if (periodPreset) {
            periodPreset.addEventListener('change', () => {
                this.applyPresetPeriod();
                this.filterByPeriod();
            });
        }

        // Set default dates
        this.setDefaultDates();
    }

    populateFilters() {
        // Populate state filter
        const stateFilter = document.getElementById('stateFilter');
        if (stateFilter && this.data.customerStats) {
            const states = [...new Set(this.data.customerStats
                .map(c => c.ENDERECO_ESTADO)
                .filter(s => s))].sort();
            
            states.forEach(state => {
                const option = document.createElement('option');
                option.value = state;
                option.textContent = state;
                stateFilter.appendChild(option);
            });
        }

        // Populate status filter
        const statusFilter = document.getElementById('statusFilter');
        if (statusFilter && this.data.orders) {
            const statuses = [...new Set(this.data.orders
                .map(o => o.PEDIDO_SITUACAO)
                .filter(s => s))].sort();
            
            statuses.forEach(status => {
                const option = document.createElement('option');
                option.value = status;
                option.textContent = status;
                statusFilter.appendChild(option);
            });
        }

        // Populate order state filter
        const orderStateFilter = document.getElementById('orderStateFilter');
        if (orderStateFilter && this.data.orders) {
            const states = [...new Set(this.data.orders
                .map(o => o.ENDERECO_ENTREGA_ESTADO)
                .filter(s => s))].sort();
            
            states.forEach(state => {
                const option = document.createElement('option');
                option.value = state;
                option.textContent = state;
                orderStateFilter.appendChild(option);
            });
        }

        // Populate customer state filter
        const customerStateFilter = document.getElementById('customerStateFilter');
        if (customerStateFilter && this.data.customers) {
            const states = [...new Set(this.data.customers
                .map(c => c.ENDERECO_ESTADO)
                .filter(s => s))].sort();
            
            states.forEach(state => {
                const option = document.createElement('option');
                option.value = state;
                option.textContent = state;
                customerStateFilter.appendChild(option);
            });
        }
    }

    switchTab(tabId) {
        // Update active tab button
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

        // Update active tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');

        this.currentTab = tabId;
        this.updateCurrentTab();
    }

    updateCurrentTab() {
        switch (this.currentTab) {
            case 'customer-summary':
                this.renderCustomerSummary();
                break;
            case 'orders-data':
                this.renderOrdersData();
                break;
            case 'customer-list':
                this.renderCustomerList();
                break;
            case 'sales-analysis':
                this.renderPeriodAnalysis();
                break;
            case 'add-data':
                this.setupAddDataTab();
                break;
        }
    }

    renderCustomerSummary() {
        const data = this.filteredData.customerStats || this.data.customerStats;
        
        // Update metrics
        const totalOrders = data.reduce((sum, c) => sum + (parseInt(c.PEDIDOS) || 0), 0);
        const totalValue = data.reduce((sum, c) => sum + this.parseValue(c.VALOR_PEDIDOS_TOTAL), 0);
        const approvedOrders = data.reduce((sum, c) => sum + (parseInt(c.QTD_APROVADOS) || 0), 0);

        this.updateElement('totalCustomersMetric', data.length);
        this.updateElement('totalOrdersMetric', totalOrders);
        this.updateElement('totalValueMetric', this.formatCurrency(totalValue));
        this.updateElement('approvedOrdersMetric', approvedOrders);

        // Render table
        this.renderTable('customerStatsTable', data, [
            { key: 'CLIENTE_NOME', title: 'Nome' },
            { key: 'CLIENTE_EMAIL', title: 'Email' },
            { key: 'CLIENTE_TELEFONE_CELULAR', title: 'Telefone', formatter: this.formatPhone },
            { key: 'PEDIDOS', title: 'Pedidos' },
            { key: 'QTD_APROVADOS', title: 'Aprovados' },
            { key: 'VALOR_PEDIDOS_TOTAL', title: 'Valor Total', formatter: this.formatCurrency },
            { key: 'ENDERECO_CIDADE', title: 'Cidade' },
            { key: 'ENDERECO_ESTADO', title: 'Estado' }
        ]);
    }

    renderOrdersData() {
        const data = this.filteredData.orders || this.data.orders;
        
        // Update metrics
        const totalValue = data.reduce((sum, o) => sum + this.parseValue(o.PEDIDO_VALOR_TOTAL), 0);
        const avgValue = data.length > 0 ? totalValue / data.length : 0;
        const uniqueCustomers = new Set(data.map(o => o.CLIENTE_EMAIL)).size;

        this.updateElement('totalOrdersCountMetric', data.length);
        this.updateElement('ordersValueMetric', this.formatCurrency(totalValue));
        this.updateElement('avgTicketMetric', this.formatCurrency(avgValue));
        this.updateElement('uniqueCustomersMetric', uniqueCustomers);

        // Render table
        this.renderTable('ordersTable', data, [
            { key: 'CLIENTE_EMAIL', title: 'Email' },
            { key: 'PEDIDO_NUMERO', title: 'Número' },
            { key: 'PEDIDO_SITUACAO', title: 'Status' },
            { key: 'PEDIDO_VALOR_TOTAL', title: 'Valor', formatter: this.formatCurrency },
            { key: 'PEDIDO_DATA_CRIACAO', title: 'Data', formatter: this.formatDate },
            { key: 'PAGAMENTO_NOME', title: 'Pagamento' },
            { key: 'ENDERECO_ENTREGA_CIDADE', title: 'Cidade' },
            { key: 'ENDERECO_ENTREGA_ESTADO', title: 'Estado' }
        ]);
    }

    renderCustomerList() {
        const data = this.filteredData.customers || this.data.customers;
        
        // Update metrics
        const withPhone = data.filter(c => c.CLIENTE_TELEFONE_CELULAR).length;

        this.updateElement('totalCustomersListMetric', data.length);
        this.updateElement('withPhoneMetric', withPhone);

        // Render table
        this.renderTable('customerListTable', data, [
            { key: 'CLIENTE_NOME', title: 'Nome' },
            { key: 'CLIENTE_EMAIL', title: 'Email' },
            { key: 'CPF_CNPJ', title: 'CPF/CNPJ', formatter: this.formatCPF },
            { key: 'CLIENTE_TELEFONE_CELULAR', title: 'Telefone', formatter: this.formatPhone },
            { key: 'CLIENTE_DATA_CRIACAO', title: 'Data Cadastro', formatter: this.formatDate }
        ]);
    }

    renderPeriodAnalysis() {
        const filteredOrders = this.getOrdersInPeriod();
        
        // Update period metrics
        const totalValue = filteredOrders.reduce((sum, o) => sum + this.parseValue(o.PEDIDO_VALOR_TOTAL), 0);
        const approvedOrders = filteredOrders.filter(o => o.PEDIDO_SITUACAO && o.PEDIDO_SITUACAO.toLowerCase().includes('aprovado')).length;
        const avgValue = filteredOrders.length > 0 ? totalValue / filteredOrders.length : 0;

        this.updateElement('periodOrdersMetric', filteredOrders.length);
        this.updateElement('periodValueMetric', this.formatCurrency(totalValue));
        this.updateElement('periodApprovedMetric', approvedOrders);
        this.updateElement('periodAvgMetric', this.formatCurrency(avgValue));

        // Daily orders chart
        this.renderDailyChart(filteredOrders);

        // Orders table
        this.renderTable('periodOrdersTable', filteredOrders, [
            { key: 'PEDIDO_DATA_CRIACAO', title: 'Data', formatter: this.formatDate },
            { key: 'CLIENTE_EMAIL', title: 'Email' },
            { key: 'PEDIDO_NUMERO', title: 'Número' },
            { key: 'PEDIDO_SITUACAO', title: 'Status' },
            { key: 'PEDIDO_VALOR_TOTAL', title: 'Valor', formatter: this.formatCurrency },
            { key: 'ENDERECO_ENTREGA_CIDADE', title: 'Cidade' }
        ]);
    }

    setDefaultDates() {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30); // Last 30 days

        const startInput = document.getElementById('startDateFilter');
        const endInput = document.getElementById('endDateFilter');

        if (startInput) {
            startInput.value = startDate.toISOString().split('T')[0];
        }
        if (endInput) {
            endInput.value = endDate.toISOString().split('T')[0];
        }
    }

    applyPresetPeriod() {
        const preset = document.getElementById('periodPreset')?.value;
        const today = new Date();
        let startDate = new Date();
        let endDate = new Date();

        switch (preset) {
            case 'last7':
                startDate.setDate(today.getDate() - 7);
                break;
            case 'last30':
                startDate.setDate(today.getDate() - 30);
                break;
            case 'last90':
                startDate.setDate(today.getDate() - 90);
                break;
            case 'thisMonth':
                startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                break;
            case 'lastMonth':
                startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                endDate = new Date(today.getFullYear(), today.getMonth(), 0);
                break;
            case 'thisYear':
                startDate = new Date(today.getFullYear(), 0, 1);
                break;
            default:
                return; // Custom - don't change dates
        }

        const startInput = document.getElementById('startDateFilter');
        const endInput = document.getElementById('endDateFilter');

        if (startInput) {
            startInput.value = startDate.toISOString().split('T')[0];
        }
        if (endInput) {
            endInput.value = endDate.toISOString().split('T')[0];
        }
    }

    getOrdersInPeriod() {
        const startDateStr = document.getElementById('startDateFilter')?.value;
        const endDateStr = document.getElementById('endDateFilter')?.value;

        if (!startDateStr || !endDateStr) {
            return this.data.orders;
        }

        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
        endDate.setHours(23, 59, 59, 999); // Include entire end date

        return this.data.orders.filter(order => {
            if (!order.PEDIDO_DATA_CRIACAO) return false;
            
            const orderDate = this.parseDate(order.PEDIDO_DATA_CRIACAO);
            if (!orderDate || isNaN(orderDate.getTime())) return false;
            
            return orderDate >= startDate && orderDate <= endDate;
        });
    }

    parseDate(dateStr) {
        if (!dateStr) return null;
        
        try {
            // Se é formato DD/MM/YYYY HH:MM
            if (typeof dateStr === 'string' && dateStr.includes('/')) {
                const datePart = dateStr.split(' ')[0];
                const parts = datePart.split('/');
                if (parts.length === 3) {
                    // Converte DD/MM/YYYY para Date
                    const day = parseInt(parts[0]);
                    const month = parseInt(parts[1]) - 1; // Month is 0-indexed
                    const year = parseInt(parts[2]);
                    return new Date(year, month, day);
                }
            }
            
            // Formato padrão
            return new Date(dateStr);
        } catch (error) {
            console.log('Erro ao fazer parse da data:', dateStr, error);
            return null;
        }
    }

    filterByPeriod() {
        if (this.currentTab === 'sales-analysis') {
            this.renderPeriodAnalysis();
        }
    }

    renderDailyChart(orders) {
        const dailyCounts = {};
        
        orders.forEach(order => {
            if (order.PEDIDO_DATA_CRIACAO) {
                const orderDate = this.parseDate(order.PEDIDO_DATA_CRIACAO);
                if (orderDate && !isNaN(orderDate.getTime())) {
                    const dateKey = orderDate.toISOString().split('T')[0];
                    dailyCounts[dateKey] = (dailyCounts[dateKey] || 0) + 1;
                }
            }
        });

        const sortedDates = Object.keys(dailyCounts).sort();
        const chartContainer = document.getElementById('dailyOrdersChart');
        
        if (chartContainer) {
            if (sortedDates.length === 0) {
                chartContainer.innerHTML = '<p style="text-align: center; padding: 1rem; font-size: 0.9rem; color: #666;">Nenhum pedido encontrado no período selecionado.</p>';
                return;
            }

            const maxCount = Math.max(...Object.values(dailyCounts));
            
            chartContainer.innerHTML = `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 0.5rem;">
                    ${sortedDates.map(date => {
                        const count = dailyCounts[date];
                        const formattedDate = new Date(date).toLocaleDateString('pt-BR', { 
                            day: '2-digit', 
                            month: '2-digit' 
                        });
                        
                        return `
                            <div style="background: linear-gradient(135deg, #f8fcf4 0%, #e8f5d3 100%); border: 1px solid #9BC53D; border-radius: 6px; padding: 0.5rem; text-align: center; min-height: 60px; display: flex; flex-direction: column; justify-content: center;">
                                <div style="font-size: 0.75rem; color: #666; margin-bottom: 0.2rem;">${formattedDate}</div>
                                <div style="font-size: 1.2rem; font-weight: 700; color: #7BA428;">${count}</div>
                                <div style="font-size: 0.65rem; color: #999;">pedidos</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }
    }

    renderTable(containerId, data, columns) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const table = document.createElement('table');
        table.className = 'data-table';

        // Header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        columns.forEach(col => {
            const th = document.createElement('th');
            th.textContent = col.title;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Body
        const tbody = document.createElement('tbody');
        data.forEach(row => {
            const tr = document.createElement('tr');
            columns.forEach(col => {
                const td = document.createElement('td');
                let value = row[col.key];
                if (col.formatter) {
                    value = col.formatter.call(this, value, row);
                }
                td.textContent = value || '';
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        container.innerHTML = '';
        container.appendChild(table);
    }

    filterCustomerStats() {
        const searchTerm = document.getElementById('customerSearchInput')?.value.toLowerCase() || '';
        const minOrders = parseInt(document.getElementById('minOrdersFilter')?.value) || 0;
        const selectedState = document.getElementById('stateFilter')?.value || 'todos';

        this.filteredData.customerStats = this.data.customerStats.filter(customer => {
            const matchesSearch = !searchTerm || 
                customer.CLIENTE_NOME?.toLowerCase().includes(searchTerm);
            const matchesOrders = (parseInt(customer.PEDIDOS) || 0) >= minOrders;
            const matchesState = selectedState === 'todos' || 
                customer.ENDERECO_ESTADO === selectedState;

            return matchesSearch && matchesOrders && matchesState;
        });

        this.renderCustomerSummary();
    }

    filterOrders() {
        const emailSearch = document.getElementById('emailSearchInput')?.value.toLowerCase() || '';
        const selectedStatus = document.getElementById('statusFilter')?.value || 'todos';
        const minValue = parseFloat(document.getElementById('minValueFilter')?.value) || 0;
        const selectedState = document.getElementById('orderStateFilter')?.value || 'todos';

        this.filteredData.orders = this.data.orders.filter(order => {
            const matchesEmail = !emailSearch || 
                order.CLIENTE_EMAIL?.toLowerCase().includes(emailSearch);
            const matchesStatus = selectedStatus === 'todos' || 
                order.PEDIDO_SITUACAO === selectedStatus;
            const matchesValue = this.parseValue(order.PEDIDO_VALOR_TOTAL) >= minValue;
            const matchesState = selectedState === 'todos' || 
                order.ENDERECO_ENTREGA_ESTADO === selectedState;

            return matchesEmail && matchesStatus && matchesValue && matchesState;
        });

        this.renderOrdersData();
    }

    filterCustomerList() {
        const searchTerm = document.getElementById('customerListSearchInput')?.value.toLowerCase() || '';
        const selectedState = document.getElementById('customerStateFilter')?.value || 'todos';

        this.filteredData.customers = this.data.customers.filter(customer => {
            const matchesSearch = !searchTerm || 
                customer.CLIENTE_NOME?.toLowerCase().includes(searchTerm) ||
                customer.CLIENTE_EMAIL?.toLowerCase().includes(searchTerm);
            const matchesState = selectedState === 'todos' || 
                customer.ENDERECO_ESTADO === selectedState;

            return matchesSearch && matchesState;
        });

        this.renderCustomerList();
    }

    downloadCurrentData() {
        let data = [];
        let filename = 'ekobrazil_dados';

        switch (this.currentTab) {
            case 'customer-summary':
                data = this.filteredData.customerStats || this.data.customerStats;
                filename = 'ekobrazil_clientes_resumo';
                break;
            case 'orders-data':
                data = this.filteredData.orders || this.data.orders;
                filename = 'ekobrazil_pedidos';
                break;
            case 'customer-list':
                data = this.filteredData.customers || this.data.customers;
                filename = 'ekobrazil_clientes_lista';
                break;
            default:
                data = this.data.customerStats;
        }

        this.exportToCSV(data, filename);
    }

    exportToCSV(data, filename) {
        if (!data || data.length === 0) {
            alert('Nenhum dado para exportar');
            return;
        }

        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => 
                headers.map(header => {
                    let value = row[header] || '';
                    if (typeof value === 'string' && value.includes(',')) {
                        value = `"${value}"`;
                    }
                    return value;
                }).join(',')
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    parseValue(value) {
        if (typeof value === 'number') return value;
        if (typeof value === 'string') {
            // Remove currency symbols and convert decimal separators
            const cleaned = value.replace(/[^\d,.-]/g, '').replace(',', '.');
            return parseFloat(cleaned) || 0;
        }
        return 0;
    }

    formatCurrency(value) {
        const num = this.parseValue(value);
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(num);
    }

    formatPhone(phone) {
        if (!phone) return '';
        const cleaned = phone.toString().replace(/\D/g, '');
        if (cleaned.length === 11) {
            return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
        } else if (cleaned.length === 10) {
            return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
        }
        return phone;
    }

    formatCPF(cpf) {
        if (!cpf) return '';
        const cleaned = cpf.toString().replace(/\D/g, '');
        
        if (cleaned.length === 11) {
            // CPF: 000.000.000-00
            return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
        } else if (cleaned.length === 14) {
            // CNPJ: 00.000.000/0000-00
            return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12)}`;
        }
        return cpf.toString();
    }

    formatDate(date) {
        if (!date) return '';
        
        // Se já é uma string formatada em português, retorna como está
        if (typeof date === 'string' && date.includes('/')) {
            // Verifica se é uma data válida no formato DD/MM/YYYY
            const parts = date.split(' ')[0].split('/');
            if (parts.length === 3) {
                const day = parseInt(parts[0]);
                const month = parseInt(parts[1]);
                const year = parseInt(parts[2]);
                
                if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1900) {
                    return parts.join('/');
                }
            }
        }
        
        try {
            // Tenta converter para Date
            let dateObj;
            
            if (typeof date === 'string') {
                // Se tem formato DD/MM/YYYY HH:MM, extrai só a data
                if (date.includes('/') && date.includes(' ')) {
                    const datePart = date.split(' ')[0];
                    const parts = datePart.split('/');
                    if (parts.length === 3) {
                        // Converte DD/MM/YYYY para YYYY-MM-DD para o Date constructor
                        dateObj = new Date(`${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`);
                    }
                } else {
                    dateObj = new Date(date);
                }
            } else {
                dateObj = new Date(date);
            }
            
            if (isNaN(dateObj.getTime())) {
                return date.toString();
            }
            
            return dateObj.toLocaleDateString('pt-BR');
        } catch (error) {
            console.log('Erro ao formatar data:', date, error);
            return date.toString();
        }
    }

    setupAddDataTab() {
        // Setup form tabs
        const formTabButtons = document.querySelectorAll('.form-tab-button');
        formTabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const formId = e.target.getAttribute('data-form');
                this.switchFormTab(formId);
            });
        });

        // Setup forms
        this.setupCustomerForm();
        this.setupOrderForm();
        
        // Set today's date as default for order form
        const orderDateInput = document.getElementById('orderDate');
        if (orderDateInput) {
            orderDateInput.value = new Date().toISOString().split('T')[0];
        }
    }

    switchFormTab(formId) {
        // Update active form tab button
        document.querySelectorAll('.form-tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-form="${formId}"]`).classList.add('active');

        // Update active form content
        document.querySelectorAll('.form-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(formId).classList.add('active');
    }

    setupCustomerForm() {
        const form = document.getElementById('newCustomerForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCustomerSubmit(form);
        });

        // Phone formatting
        const phoneInput = document.getElementById('customerPhone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                e.target.value = this.formatPhoneInput(e.target.value);
            });
        }

        // CPF formatting
        const cpfInput = document.getElementById('customerCPF');
        if (cpfInput) {
            cpfInput.addEventListener('input', (e) => {
                e.target.value = this.formatCPFInput(e.target.value);
            });
        }
    }

    setupOrderForm() {
        const form = document.getElementById('newOrderForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleOrderSubmit(form);
        });

        // Value formatting
        const valueInput = document.getElementById('orderValue');
        if (valueInput) {
            valueInput.addEventListener('blur', (e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value)) {
                    e.target.value = value.toFixed(2);
                }
            });
        }
    }

    handleCustomerSubmit(form) {
        const formData = new FormData(form);
        const customerData = {
            CLIENTE_ID: Date.now(), // Generate unique ID
            CLIENTE_NOME: formData.get('customerName'),
            CLIENTE_EMAIL: formData.get('customerEmail'),
            CLIENTE_TELEFONE_CELULAR: formData.get('customerPhone'),
            CPF_CNPJ: formData.get('customerCPF'),
            ENDERECO_RUA: formData.get('customerAddress'),
            ENDERECO_NUMERO: formData.get('customerNumber'),
            ENDERECO_CIDADE: formData.get('customerCity'),
            ENDERECO_ESTADO: formData.get('customerState'),
            CLIENTE_DATA_CRIACAO: new Date().toLocaleDateString('pt-BR'),
            PEDIDOS: 0,
            QTD_APROVADOS: 0,
            QTD_REPROVADOS: 0,
            VALOR_PEDIDOS_TOTAL: '0',
            VALOR_PEDIDOS_APROVADOS: '0',
            VALOR_PEDIDOS_REPROVADOS: '0'
        };

        // Check if customer already exists
        if (this.customerExists(customerData.CLIENTE_EMAIL)) {
            this.showFormMessage('Já existe um cliente com este email!', 'error');
            return;
        }

        // Add to data arrays
        this.data.customers.push(customerData);
        this.data.customerStats.push(customerData);
        this.filteredData.customers.push(customerData);
        this.filteredData.customerStats.push(customerData);

        // Save to localStorage
        this.saveDataToLocalStorage();

        // Show success message and reset form
        this.showFormMessage('Cliente cadastrado com sucesso!', 'success');
        form.reset();

        // Update displays if on relevant tabs
        if (this.currentTab === 'customer-summary') {
            this.renderCustomerSummary();
        } else if (this.currentTab === 'customer-list') {
            this.renderCustomerList();
        }
    }

    handleOrderSubmit(form) {
        const formData = new FormData(form);
        const orderData = {
            CLIENTE_EMAIL: formData.get('orderCustomerEmail'),
            PEDIDO_NUMERO: formData.get('orderNumber'),
            PEDIDO_VALOR_TOTAL: parseFloat(formData.get('orderValue')),
            PEDIDO_SITUACAO: formData.get('orderStatus'),
            PAGAMENTO_NOME: formData.get('orderPayment'),
            PEDIDO_DATA_CRIACAO: formData.get('orderDate') ? new Date(formData.get('orderDate')).toLocaleDateString('pt-BR') : new Date().toLocaleDateString('pt-BR'),
            ENDERECO_ENTREGA_CIDADE: formData.get('orderDeliveryCity'),
            ENDERECO_ENTREGA_ESTADO: formData.get('orderDeliveryState')
        };

        // Check if order number already exists
        if (this.orderExists(orderData.PEDIDO_NUMERO)) {
            this.showFormMessage('Já existe um pedido com este número!', 'error');
            return;
        }

        // Check if customer exists
        if (!this.customerExists(orderData.CLIENTE_EMAIL)) {
            this.showFormMessage('Cliente não encontrado! Cadastre o cliente primeiro.', 'error');
            return;
        }

        // Add to orders data
        this.data.orders.push(orderData);
        this.filteredData.orders.push(orderData);

        // Update customer stats
        this.updateCustomerStats(orderData);

        // Save to localStorage
        this.saveDataToLocalStorage();

        // Show success message and reset form
        this.showFormMessage('Pedido cadastrado com sucesso!', 'success');
        form.reset();

        // Reset date to today
        const orderDateInput = document.getElementById('orderDate');
        if (orderDateInput) {
            orderDateInput.value = new Date().toISOString().split('T')[0];
        }

        // Update displays if on relevant tabs
        if (this.currentTab === 'orders-data') {
            this.renderOrdersData();
        } else if (this.currentTab === 'customer-summary') {
            this.renderCustomerSummary();
        }
    }

    customerExists(email) {
        return this.data.customers.some(customer => customer.CLIENTE_EMAIL === email);
    }

    orderExists(orderNumber) {
        return this.data.orders.some(order => order.PEDIDO_NUMERO === orderNumber);
    }

    updateCustomerStats(orderData) {
        // Find customer in both arrays and update stats
        const updateCustomer = (customer) => {
            if (customer.CLIENTE_EMAIL === orderData.CLIENTE_EMAIL) {
                customer.PEDIDOS = (parseInt(customer.PEDIDOS) || 0) + 1;
                
                const currentTotal = this.parseValue(customer.VALOR_PEDIDOS_TOTAL);
                const newTotal = currentTotal + orderData.PEDIDO_VALOR_TOTAL;
                customer.VALOR_PEDIDOS_TOTAL = newTotal.toFixed(2);

                if (orderData.PEDIDO_SITUACAO === 'Aprovado' || orderData.PEDIDO_SITUACAO === 'Pago' || orderData.PEDIDO_SITUACAO === 'Entregue') {
                    customer.QTD_APROVADOS = (parseInt(customer.QTD_APROVADOS) || 0) + 1;
                    const currentApproved = this.parseValue(customer.VALOR_PEDIDOS_APROVADOS);
                    customer.VALOR_PEDIDOS_APROVADOS = (currentApproved + orderData.PEDIDO_VALOR_TOTAL).toFixed(2);
                } else {
                    customer.QTD_REPROVADOS = (parseInt(customer.QTD_REPROVADOS) || 0) + 1;
                    const currentRejected = this.parseValue(customer.VALOR_PEDIDOS_REPROVADOS);
                    customer.VALOR_PEDIDOS_REPROVADOS = (currentRejected + orderData.PEDIDO_VALOR_TOTAL).toFixed(2);
                }
            }
        };

        this.data.customerStats.forEach(updateCustomer);
        this.filteredData.customerStats.forEach(updateCustomer);
    }

    formatPhoneInput(value) {
        // Remove all non-digits
        const cleaned = value.replace(/\D/g, '');
        
        // Apply phone formatting
        if (cleaned.length <= 2) {
            return cleaned;
        } else if (cleaned.length <= 7) {
            return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
        } else if (cleaned.length <= 11) {
            return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
        } else {
            return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
        }
    }

    formatCPFInput(value) {
        // Remove all non-digits
        const cleaned = value.replace(/\D/g, '');
        
        // Apply CPF or CNPJ formatting
        if (cleaned.length <= 11) {
            // CPF formatting
            if (cleaned.length <= 3) {
                return cleaned;
            } else if (cleaned.length <= 6) {
                return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
            } else if (cleaned.length <= 9) {
                return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
            } else {
                return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
            }
        } else {
            // CNPJ formatting
            if (cleaned.length <= 2) {
                return cleaned;
            } else if (cleaned.length <= 5) {
                return `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
            } else if (cleaned.length <= 8) {
                return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5)}`;
            } else if (cleaned.length <= 12) {
                return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8)}`;
            } else {
                return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12, 14)}`;
            }
        }
    }

    showFormMessage(message, type) {
        const messagesContainer = document.getElementById('formMessages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
        messageDiv.innerHTML = `
            <strong>${type === 'success' ? '✅ Sucesso!' : '❌ Erro!'}</strong><br>
            ${message}
        `;

        messagesContainer.innerHTML = '';
        messagesContainer.appendChild(messageDiv);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, 5000);
    }

    saveDataToLocalStorage() {
        try {
            localStorage.setItem('ekobrazil_customers', JSON.stringify(this.data.customers));
            localStorage.setItem('ekobrazil_customer_stats', JSON.stringify(this.data.customerStats));
            localStorage.setItem('ekobrazil_orders', JSON.stringify(this.data.orders));
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
        }
    }

    loadDataFromLocalStorage() {
        try {
            const savedCustomers = localStorage.getItem('ekobrazil_customers');
            const savedCustomerStats = localStorage.getItem('ekobrazil_customer_stats');
            const savedOrders = localStorage.getItem('ekobrazil_orders');

            if (savedCustomers) {
                const parsedCustomers = JSON.parse(savedCustomers);
                // Merge with existing data, avoiding duplicates
                parsedCustomers.forEach(savedCustomer => {
                    if (!this.data.customers.some(c => c.CLIENTE_EMAIL === savedCustomer.CLIENTE_EMAIL)) {
                        this.data.customers.push(savedCustomer);
                    }
                });
            }

            if (savedCustomerStats) {
                const parsedStats = JSON.parse(savedCustomerStats);
                parsedStats.forEach(savedStat => {
                    if (!this.data.customerStats.some(c => c.CLIENTE_EMAIL === savedStat.CLIENTE_EMAIL)) {
                        this.data.customerStats.push(savedStat);
                    }
                });
            }

            if (savedOrders) {
                const parsedOrders = JSON.parse(savedOrders);
                parsedOrders.forEach(savedOrder => {
                    if (!this.data.orders.some(o => o.PEDIDO_NUMERO === savedOrder.PEDIDO_NUMERO)) {
                        this.data.orders.push(savedOrder);
                    }
                });
            }

            // Update filtered data
            this.filteredData = {...this.data};

        } catch (error) {
            console.error('Erro ao carregar dados salvos:', error);
        }
    }
}

// Aguardar carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando EkobrazilSystem...');
    window.ekobrazilSystem = new EkobrazilIntegratedSystem();
});