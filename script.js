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
    "Pratos e talheres descartáveis"
];

// Pegando elementos do HTML
const lista = document.getElementById("lista-itens");
const tabela = document.getElementById("tabela-confirmados");
const inputNome = document.getElementById("nome");

// Adicionando os itens na lista
itens.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    
    li.addEventListener("click", () => {
        const nome = inputNome.value.trim(); // Pega o nome digitado

        if (nome === "") {
            alert("Por favor, digite seu nome antes de escolher um item!");
            return;
        }

        // Remove o item da lista
        li.remove();
        
        // Adiciona o nome e o item escolhido na tabela
        const linha = document.createElement("tr");
        linha.innerHTML = `<td>${nome}</td><td>${item}</td>`;
        tabela.appendChild(linha);

        // Mostra mensagem de confirmação
        alert(`Muito obrigada, ${nome}, por escolher levar "${item}". Espero você lá!`);
        
        // Limpa o campo de nome
        inputNome.value = "";
    });

    lista.appendChild(li);
});
