// Lista de itens disponíveis
const itens = [
    "Salgadinhos (coxinha, risoles, quibe)",
    "Mini pastéis (carne e queijo)",
    "Pão de queijo",
    "Esfirras (carne/frango)",
    "Sanduíches naturais",
    "Tábua de frios",
    "Torta salgada",
    "Cachorro-quente",
    "Empadinhas",
    "Pães de metro",
    "Quiche",
    "Brigadeiros",
    "Beijinhos",
    "Docinhos variados",
    "Pavê ou mousse",
    "Gelatina colorida",
    "Água mineral",
    "Suco natural (laranja ou uva)",
    "Suco natural (abacaxi ou maracujá)",
    "Refrigerante (coca-cola)",
    "Refrigerante (guaraná)",
    "Refrigerante (laranja)",
    "Copos descartáveis",
    "Pratos e talheres descartáveis",
    "Guardanapos e toalhas"
];

// Configuração do Firebase (substitua pelos seus dados)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFJJRgzZhaQhUBDPpLK4ZVNRo218mrfpk",
  authDomain: "evento-andy.firebaseapp.com",
  projectId: "evento-andy",
  storageBucket: "evento-andy.firebasestorage.app",
  messagingSenderId: "776037423010",
  appId: "1:776037423010:web:eb6c51b82fa9f0d6c444fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Pegando elementos do HTML
const lista = document.getElementById("lista-itens");
const tabela = document.getElementById("tabela-confirmados");
const inputNome = document.getElementById("nome");

// Função para carregar os dados do Firebase
function carregarDados() {
    db.collection("escolhas").get().then((snapshot) => {
        const escolhidos = snapshot.docs.map(doc => doc.data());

        // Remove os itens já escolhidos
        const itensDisponiveis = itens.filter(item => !escolhidos.some(e => e.item === item));

        // Atualiza a lista de itens disponíveis
        lista.innerHTML = "";
        itensDisponiveis.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            li.addEventListener("click", () => escolherItem(item, li));
            lista.appendChild(li);
        });

        // Atualiza a tabela de confirmados
        tabela.innerHTML = "";
        escolhidos.forEach(({ nome, item }) => {
            const linha = document.createElement("tr");
            linha.innerHTML = `<td>${nome}</td><td>${item}</td>`;
            tabela.appendChild(linha);
        });
    });
}

// Função para salvar um novo nome e item escolhido
function escolherItem(item, li) {
    const nome = inputNome.value.trim();

    if (nome === "") {
        alert("Por favor, digite seu nome antes de escolher um item!");
        return;
    }

    // Salva a escolha no Firebase
    db.collection("escolhas").add({ nome, item }).then(() => {
        // Remove o item da lista
        li.remove();

        // Adiciona o nome e o item na tabela
        const linha = document.createElement("tr");
        linha.innerHTML = `<td>${nome}</td><td>${item}</td>`;
        tabela.appendChild(linha);

        // Mensagem de confirmação
        alert(`Muito obrigada, ${nome}, por escolher levar "${item}". Espero você lá!`);

        // Limpa o campo de nome
        inputNome.value = "";
    });

    
// Carregar os dados ao abrir a página
carregarDados();

