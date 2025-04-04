// Lista inicial de itens disponíveis
const itens = [
    "Salgadinhos (coxinha, risoles, quibe, etc)",
    "Mini pastéis (carne e queijo)",
    "Pão de queijo",
    "Esfirras (carne/frango)",
    "Sanduíches com patê",
    "Salgadinhos (coxinha, risoles, quibe, etc)",
    "Torta salgada",
    "Cachorro-quente",
    "Torta salgada",
    "Sanduíches com patê",
    "Mini pastéis (carne e queijo)",
    "Brigadeiros",
    "Beijinhos",
    "Docinhos variados",
    "Docinhos variados",
    "Torta doce",
    "2 garrafas 1,5l de Água mineral",
    "1 garrafa Suco natural (laranja ou uva)",
    "1 garrafa Suco natural (abacaxi ou maracujá)",
    "Refrigerante (coca-cola)",
    "Refrigerante (guaraná)",
    "Refrigerante (laranja/limão)",
    "Copos e guardanapos descartáveis (1 pacote de 100 unidades cada)",
    "Pratos e talheres descartáveis",
    
];

// Pegando a lista do HTML
const lista = document.getElementById("lista-itens");

// Adicionando os itens na tela
itens.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    li.addEventListener("click", () => {
        li.remove(); // Remove o item quando for clicado
        alert(`Você escolheu: ${item}`);
    });
    lista.appendChild(li);
});
