// Dados dos clientes Ekobrazil
const clientsData = [
  {
    "nome": "Fulano da Silva Teste",
    "telefone": "(51) 99999-9999",
    "data": "10/11/2023"
  },
  
];

// Função para calcular dias desde a última compra
function daysSincePurchase(dateStr) {
    if (!dateStr || dateStr === '') return null;
    
    try {
        const [day, month, year] = dateStr.split('/');
        const purchaseDate = new Date(year, month - 1, day);
        const today = new Date();
        const diffTime = today - purchaseDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    } catch (e) {
        return null;
    }
}

// Exportar dados
window.clientsData = clientsData;
window.daysSincePurchase = daysSincePurchase;
