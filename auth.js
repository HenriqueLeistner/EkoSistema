// Sistema de Autenticação Ekobrazil

class EkobrazilAuth {
    constructor() {
        // Prevenir múltiplas instâncias
        if (window.authInstance) {
            return window.authInstance;
        }

        this.users = {
            'admin': 'ekobrazil123',
            'gerente': 'verde2024',
            'vendas': 'cliente123',
            'ekobrazil': 'inteligencia2024',
            'daniela': 'eko@eko'
        };

        this.sessionTimeout = 8 * 60 * 60 * 1000; // 8 horas
        this.maxLoginAttempts = 5;
        this.lockoutTime = 5 * 60 * 1000; // 5 minutos

        this.init();
    }

    init() {
        // Verificar se já está logado
        if (this.isAuthenticated()) {
            this.redirectToMain();
            return;
        }

        this.setupEventListeners();
        this.loadRememberedUser();
    }

    setupEventListeners() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            // Remover listeners existentes
            loginForm.removeEventListener('submit', this.handleLogin);
            
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Enter key nos campos
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleLogin();
                }
            });
        });

        // Remover erro ao digitar
        const username = document.getElementById('username');
        const password = document.getElementById('password');

        if (username && password) {
            [username, password].forEach(input => {
                input.addEventListener('input', () => {
                    this.clearError();
                });
            });
        }
    }

    async handleLogin() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        if (!username || !password) {
            this.showError('Por favor, preencha todos os campos');
            return;
        }

        // Verificar bloqueio por tentativas excessivas
        if (!this.checkBruteForce()) {
            return;
        }

        this.showLoading(true);

        // Simular delay de autenticação
        await this.delay(1000);

        if (this.validateCredentials(username, password)) {
            this.login(username, rememberMe);
        } else {
            this.showError('Usuário ou senha incorretos');
            this.shakeCard();
            // Registrar tentativa falha
            this.registerFailedAttempt();
        }

        this.showLoading(false);
    }

    validateCredentials(username, password) {
        return this.users[username.toLowerCase()] === password;
    }

    login(username, rememberMe) {
        const loginData = {
            username: username,
            loginTime: Date.now(),
            sessionId: this.generateSessionId()
        };

        // Salvar sessão
        sessionStorage.setItem('ekobrazil_session', JSON.stringify(loginData));

        // Lembrar usuário se solicitado
        if (rememberMe) {
            localStorage.setItem('ekobrazil_remember', username);
        } else {
            localStorage.removeItem('ekobrazil_remember');
        }

        // Limpar histórico de tentativas falhas após login bem-sucedido
        localStorage.removeItem('ekobrazil_login_attempts');

        // Log de acesso
        this.logAccess(username);

        // Redirect para página principal
        this.redirectToMain();
    }

    logout() {
        sessionStorage.removeItem('ekobrazil_session');
        localStorage.removeItem('ekobrazil_remember');
        window.location.href = 'login.html';
    }

    isAuthenticated() {
        const session = sessionStorage.getItem('ekobrazil_session');
        if (!session) return false;

        try {
            const loginData = JSON.parse(session);
            const now = Date.now();

            // Verificar se a sessão expirou
            if (now - loginData.loginTime > this.sessionTimeout) {
                sessionStorage.removeItem('ekobrazil_session');
                return false;
            }

            return true;
        } catch (e) {
            sessionStorage.removeItem('ekobrazil_session');
            return false;
        }
    }

    getCurrentUser() {
        const session = sessionStorage.getItem('ekobrazil_session');
        if (!session) return null;

        try {
            const loginData = JSON.parse(session);
            return loginData.username;
        } catch (e) {
            return null;
        }
    }

    loadRememberedUser() {
        const rememberedUser = localStorage.getItem('ekobrazil_remember');
        const usernameField = document.getElementById('username');
        const passwordField = document.getElementById('password');
        const rememberField = document.getElementById('rememberMe');

        if (rememberedUser && usernameField && passwordField && rememberField) {
            usernameField.value = rememberedUser;
            rememberField.checked = true;
            passwordField.focus();
        } else if (usernameField) {
            usernameField.focus();
        }
    }

    redirectToMain() {
        window.location.href = 'index.html';
    }

    showError(message) {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.textContent = `❌ ${message}`;
        errorDiv.style.display = 'block';
    }

    clearError() {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.style.display = 'none';
    }

    showLoading(loading) {
        const btn = document.querySelector('.login-btn');
        const btnText = document.getElementById('loginBtnText');
        const spinner = document.getElementById('loginSpinner');

        if (loading) {
            btn.disabled = true;
            btnText.style.display = 'none';
            spinner.style.display = 'block';
        } else {
            btn.disabled = false;
            btnText.style.display = 'block';
            spinner.style.display = 'none';
        }
    }

    shakeCard() {
        const card = document.querySelector('.login-card');
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = 'shake 0.5s ease-in-out';
        }, 10);
    }

    generateSessionId() {
        return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    logAccess(username) {
        const accessLog = {
            username: username,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            ip: 'local'
        };

        // Em um sistema real, isso seria enviado para o servidor
        console.log('Access Log:', accessLog);

        // Salvar log local para debug
        const logs = JSON.parse(localStorage.getItem('ekobrazil_access_logs') || '[]');
        logs.push(accessLog);

        // Manter apenas os últimos 50 logs
        if (logs.length > 50) {
            logs.splice(0, logs.length - 50);
        }

        localStorage.setItem('ekobrazil_access_logs', JSON.stringify(logs));
    }

    // Método para verificar tentativas de acesso (segurança básica)
    checkBruteForce() {
        const attempts = JSON.parse(localStorage.getItem('ekobrazil_login_attempts') || '[]');
        const now = Date.now();
        const lockoutTimestamp = parseInt(localStorage.getItem('ekobrazil_lockout_end') || '0');

        // Se estiver no período de bloqueio, impede o login
        if (now < lockoutTimestamp) {
            const remainingTime = Math.ceil((lockoutTimestamp - now) / 1000 / 60);
            this.showError(`Conta bloqueada. Tente novamente em ${remainingTime} minutos.`);
            return false;
        }

        // Limpa tentativas antigas que já passaram do tempo de bloqueio
        const recentAttempts = attempts.filter(attempt => attempt > (now - this.lockoutTime));
        localStorage.setItem('ekobrazil_login_attempts', JSON.stringify(recentAttempts));

        if (recentAttempts.length >= this.maxLoginAttempts) {
            // Bloqueia a conta
            localStorage.setItem('ekobrazil_lockout_end', (now + this.lockoutTime).toString());
            this.showError(`Muitas tentativas de login. Sua conta foi bloqueada por ${this.lockoutTime / 1000 / 60} minutos.`);
            return false;
        }

        return true;
    }

    registerFailedAttempt() {
        const attempts = JSON.parse(localStorage.getItem('ekobrazil_login_attempts') || '[]');
        attempts.push(Date.now());
        // Manter apenas um número razoável de tentativas para não sobrecarregar o storage
        if (attempts.length > this.maxLoginAttempts + 5) {
            attempts.shift();
        }
        localStorage.setItem('ekobrazil_login_attempts', JSON.stringify(attempts));
    }
}

// Funções globais para uso em outras páginas
window.EkobrazilAuth = {
    logout: () => new EkobrazilAuth().logout(),
    isAuthenticated: () => new EkobrazilAuth().isAuthenticated(),
    getCurrentUser: () => new EkobrazilAuth().getCurrentUser(),
    requireAuth: () => {
        if (!new EkobrazilAuth().isAuthenticated()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
};

// Inicializar sistema de autenticação apenas na página de login
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
} else {
    initAuth();
}

function initAuth() {
    // Só inicializar se estivermos na página de login E não houver instância já criada
    if ((window.location.pathname.includes('login.html') || document.getElementById('loginForm')) && !window.authInstance) {
        console.log('DOM carregado, inicializando EkobrazilAuth...');
        try {
            window.authInstance = new EkobrazilAuth();
            console.log('EkobrazilAuth inicializado com sucesso');
        } catch (error) {
            console.error('Erro ao inicializar EkobrazilAuth:', error);
        }
    }
}