import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// 🔥 Configuração do Firebase

// Configuração do Firebase (CDN)
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

// Pegando elementos do HTML
const lista = document.getElementById("lista-itens");
const tabela = document.getElementById("tabela-confirmados");
const inputNome = document.getElementById("nome");


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
        document.getElementById("nome").value = "";
        document.getElementById("item").value = "";
        carregarLista(); // Atualiza a tabela automaticamente
    } catch (error) {
        console.error("Erro ao adicionar documento: ", error);
    }
}

// 📌 Função para carregar os dados do Firestore e exibir na tabela
async function carregarLista() {
    const tabela = document.getElementById("tabela-confirmados");
    tabela.innerHTML = ""; // Limpa a tabela antes de adicionar os novos dados

    const querySnapshot = await getDocs(collection(db, "escolhas"));

    querySnapshot.forEach((doc) => {
        const dados = doc.data();
        const linha = `<tr><td>${dados.nome}</td><td>${dados.item}</td></tr>`;
        tabela.innerHTML += linha;
    });
}

// Carrega a lista quando a página abrir
document.addEventListener("DOMContentLoaded", carregarLista);

// Função para carregar os dados do Firebase
async function carregarDados() {
    try {
        const querySnapshot = await db.collection("escolhas").get();
        const escolhidos = querySnapshot.docs.map(doc => doc.data());

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

    } catch (error) {
        console.error("Erro ao carregar dados do Firestore:", error);
        alert("Erro ao carregar os dados. Verifique sua conexão!");
    }
}

// Função para salvar um novo nome e item escolhido
async function escolherItem(item, li) {
    const nome = inputNome.value.trim();

    if (nome === "") {
        alert("Por favor, digite seu nome antes de escolher um item!");
        return;
    }

    try {
        // Salva a escolha no Firebase
        await db.collection("escolhas").add({ nome, item });

        // Atualiza os dados na tela
        carregarDados();

        // Mensagem de confirmação
        alert(`Muito obrigada, ${nome}, por escolher levar "${item}". Espero você lá!`);

        // Limpa o campo de nome
        inputNome.value = "";

    } catch (error) {
        console.error("Erro ao salvar no Firestore:", error);
        alert("Houve um erro ao registrar sua escolha. Tente novamente!");
    }
}

// Carregar os dados ao abrir a página
carregarDados();
