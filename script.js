
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// 🔥 Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDFJJRgzZhaQhUBDPpLK4ZVNRo218mrfpk",
    authDomain: "evento-andy.firebaseapp.com",
    projectId: "evento-andy",
    storageBucket: "evento-andy.appspot.com",
    messagingSenderId: "776037423010",
    appId: "1:776037423010:web:eb6c51b82fa9f0d6c444fb"
};

// 🔥 Inicializa Firebase e Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 📌 Lista inicial de itens disponíveis
const listaItens = [
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

// 📌 Função para remover item do `<select>`
function removerItemSelect(item) {
    const select = document.getElementById("item");
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === item) {
            select.remove(i);
            break;
        }
    }
}

// 📌 Função para adicionar um item ao Firestore
async function adicionarItem() {
    const nome = document.getElementById("nome").value;
    const item = document.getElementById("item").value;

    if (nome === "" || item === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        await addDoc(collection(db, "escolhas"), { nome: nome, item: item });
        alert("Item adicionado com sucesso!");

        // Remove o item do select
        removerItemSelect(item);

        // Limpa os campos
        document.getElementById("nome").value = "";
        document.getElementById("item").value = "";
        
        carregarLista(); // Atualiza a lista na tela
    } catch (error) {
        console.error("Erro ao adicionar documento: ", error);
    }
}

// 📌 Função para carregar os dados do Firestore e exibir na tabela
async function carregarLista() {
    const tabela = document.getElementById("tabela-confirmados");
    tabela.innerHTML = ""; // Limpa a tabela antes de adicionar os novos dados

    try {
        const querySnapshot = await getDocs(collection(db, "escolhas"));
        const itensEscolhidos = [];

        querySnapshot.forEach((doc) => {
            const dados = doc.data();
            const linha = `<tr><td>${dados.nome}</td><td>${dados.item}</td></tr>`;
            tabela.innerHTML += linha;
            itensEscolhidos.push(dados.item);
        });

        // Atualiza o select removendo os itens já escolhidos
        atualizarSelect(itensEscolhidos);
    } catch (error) {
        console.error("Erro ao carregar dados do Firestore: ", error);
    }
}

// 📌 Atualiza a lista de opções disponíveis no `<select>`
function atualizarSelect(itensEscolhidos) {
    const select = document.getElementById("item");
    select.innerHTML = '<option value="">Selecione um item</option>';

    listaItens.forEach((item) => {
        if (!itensEscolhidos.includes(item)) {
            let option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            select.appendChild(option);
        }
    });
}

// 📌 Adiciona evento ao botão
document.getElementById("adicionar-btn").addEventListener("click", adicionarItem);

// 📌 Carrega a lista quando a página abrir
document.addEventListener("DOMContentLoaded", carregarLista);
