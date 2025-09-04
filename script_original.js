// Sistema de Clientes Ekobrazil - JavaScript Principal

class EkobrazilSystem {
    constructor() {
        this.originalData = [];
        this.filteredData = [];
        this.currentFilters = {
            search: '',
            time: 'todos',
            sort: 'nome'
        };
        
        // Registrar instância global para debug
        window.EkobrazilSystemInstance = this;
        
        this.init();
    }

    init() {
        console.log('Inicializando EkobrazilSystem...');
        
        // Verificar autenticação apenas uma vez na inicialização
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
        if (typeof window.clientsData === 'undefined') {
            console.log('Aguardando dados...');
            setTimeout(() => this.init(), 100);
            return;
        }

        console.log('Dados carregados:', window.clientsData.length, 'clientes');
        
        this.originalData = window.clientsData;
        this.filteredData = [...this.originalData];
        
        this.setupUserInfo();
        this.setupEventListeners();
        this.renderTable();
        this.updateMetrics();
        this.hideLoading();
        
        console.log('Sistema inicializado com sucesso!');
    }

    setupUserInfo() {
        const welcomeElement = document.getElementById('welcomeUser');
        
        // Obter usuário diretamente da sessão
        const session = sessionStorage.getItem('ekobrazil_session');
        if (session) {
            try {
                const loginData = JSON.parse(session);
                welcomeElement.textContent = `Bem-vindo, ${loginData.username}`;
            } catch (e) {
                welcomeElement.textContent = 'Bem-vindo, Usuário';
            }
        }
    }

    setupEventListeners() {
        console.log('Configurando event listeners...');
        
        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                if (confirm('Tem certeza que deseja sair?')) {
                    this.logout();
                }
            });
        }

        // Pesquisa por nome
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilters.search = e.target.value.toLowerCase();
                this.applyFilters();
            });
        }

        // Filtro por tempo
        const timeFilter = document.getElementById('timeFilter');
        if (timeFilter) {
            timeFilter.addEventListener('change', (e) => {
                this.currentFilters.time = e.target.value;
                this.applyFilters();
            });
        }

        // Ordenação
        const sortOption = document.getElementById('sortOption');
        if (sortOption) {
            sortOption.addEventListener('change', (e) => {
                this.currentFilters.sort = e.target.value;
                this.applyFilters();
            });
        }

        // Download
        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.downloadCSV();
            });
        }
        
        console.log('Event listeners configurados');
    }

    applyFilters() {
        let filtered = [...this.originalData];

        // Filtro por pesquisa
        if (this.currentFilters.search) {
            filtered = filtered.filter(client => 
                client.nome.toLowerCase().includes(this.currentFilters.search)
            );
        }

        // Filtro por tempo
        if (this.currentFilters.time !== 'todos') {
            filtered = filtered.filter(client => {
                const days = window.daysSincePurchase(client.data);
                if (days === null) return false;

                switch (this.currentFilters.time) {
                    case '30':
                        return days <= 30;
                    case '60':
                        return days > 30 && days <= 60;
                    case '90':
                        return days > 60 && days <= 90;
                    case '90+':
                        return days > 90;
                    default:
                        return true;
                }
            });
        }

        // Ordenação
        if (this.currentFilters.sort === 'nome') {
            filtered.sort((a, b) => a.nome.localeCompare(b.nome));
        } else if (this.currentFilters.sort === 'data') {
            filtered.sort((a, b) => {
                const dateA = this.parseDate(a.data);
                const dateB = this.parseDate(b.data);
                return dateB - dateA; // Mais recente primeiro
            });
        }

        this.filteredData = filtered;
        this.renderTable();
        this.updateMetrics();
        this.updateFilterInfo();
    }

    parseDate(dateStr) {
        if (!dateStr) return new Date(0);
        try {
            const [day, month, year] = dateStr.split('/');
            return new Date(year, month - 1, day);
        } catch (e) {
            return new Date(0);
        }
    }

    renderTable() {
        const tableBody = document.getElementById('tableBody');
        const noResults = document.getElementById('noResults');
        const table = document.getElementById('clientsTable');

        if (this.filteredData.length === 0) {
            table.style.display = 'none';
            noResults.style.display = 'block';
            return;
        }

        table.style.display = 'table';
        noResults.style.display = 'none';

        tableBody.innerHTML = this.filteredData.map(client => `
            <tr>
                <td>${this.escapeHtml(client.nome)}</td>
                <td>${this.escapeHtml(client.telefone)}</td>
                <td>${this.escapeHtml(client.data)}</td>
            </tr>
        `).join('');
    }

    updateMetrics() {
        const totalClients = this.originalData.length;
        const filteredClients = this.filteredData.length;
        const clientsWithPhone = this.filteredData.filter(c => c.telefone && c.telefone !== '').length;
        const clientsWithDate = this.filteredData.filter(c => c.data && c.data !== '').length;

        document.getElementById('totalMetric').textContent = totalClients;
        document.getElementById('filteredMetric').textContent = filteredClients;
        document.getElementById('phoneMetric').textContent = clientsWithPhone;
        document.getElementById('dateMetric').textContent = clientsWithDate;
    }

    updateFilterInfo() {
        const filterInfo = document.getElementById('filterInfo');
        const filterInfoText = document.getElementById('filterInfoText');

        const hasFilters = this.currentFilters.search || this.currentFilters.time !== 'todos';
        
        if (hasFilters) {
            filterInfo.style.display = 'block';
            filterInfoText.textContent = `📋 Mostrando ${this.filteredData.length} de ${this.originalData.length} clientes`;
        } else {
            filterInfo.style.display = 'none';
        }
    }

    downloadCSV() {
        if (this.filteredData.length === 0) {
            alert('Nenhum dado para baixar!');
            return;
        }

        const headers = ['Nome', 'Telefone', 'Data da Última Compra'];
        const csvContent = [
            headers.join(','),
            ...this.filteredData.map(client => [
                `"${client.nome}"`,
                `"${client.telefone}"`,
                `"${client.data}"`
            ].join(','))
        ].join('\\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            
            const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
            link.setAttribute('download', `ekobrazil_clientes_${timestamp}.csv`);
            
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    hideLoading() {
        document.getElementById('loading').style.display = 'none';
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, (m) => map[m]);
    }

    logout() {
        sessionStorage.removeItem('ekobrazil_session');
        localStorage.removeItem('ekobrazil_remember');
        window.location.href = 'login.html';
    }
}

// Função para inicializar o sistema
function initEkobrazilSystem() {
    // Prevenir múltiplas inicializações
    if (window.EkobrazilSystemInstance) {
        console.log('Sistema já inicializado, ignorando...');
        return;
    }
    
    console.log('Tentando inicializar EkobrazilSystem...');
    try {
        new EkobrazilSystem();
    } catch (error) {
        console.error('Erro ao inicializar sistema:', error);
    }
}

// Inicializar sistema quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEkobrazilSystem);
} else {
    initEkobrazilSystem();
}