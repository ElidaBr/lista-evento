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

// 📌 Testa a conexão com Firebase
console.log("Firestore inicializado:", db);

// 📌 Função para adicionar um item ao Firestore

async function carregarLista() {
    const tabela = document.getElementById("tabela-confirmados");
    tabela.innerHTML = ""; // Limpa a tabela antes de adicionar os novos dados

    try {
        const querySnapshot = await getDocs(collection(db, "escolhas"));
        querySnapshot.forEach((doc) => {
            const dados = doc.data();
            
            // Verifica se os dados são válidos
            if (dados.nome && dados.item) {
                const linha = `<tr><td>${dados.nome}</td><td>${dados.item}</td></tr>`;
                tabela.innerHTML += linha;
            }
        });
    } catch (error) {
        console.error("Erro ao carregar dados do Firestore: ", error);
    }
}


// 📌 Função para carregar os dados do Firestore e exibir na tabela
async function carregarLista() {
    const tabela = document.getElementById("tabela-confirmados");
    tabela.innerHTML = ""; // Limpa a tabela antes de adicionar os novos dados

    try {
        const querySnapshot = await getDocs(collection(db, "escolhas"));
        querySnapshot.forEach((doc) => {
            const dados = doc.data();
            
            // Verifica se os dados não são os que queremos excluir
            if (dados.nome !== "Ana" && dados.item !== '"Água mineral"') {
                const linha = `<tr><td>${dados.nome}</td><td>${dados.item}</td></tr>`;
                tabela.innerHTML += linha;
            }
        });
    } catch (error) {
        console.error("Erro ao carregar dados do Firestore: ", error);
    }
}

// 📌 Adiciona evento ao botão
document.getElementById("adicionar-btn").addEventListener("click", adicionarItem);

// 📌 Carrega a lista quando a página abrir
document.addEventListener("DOMContentLoaded", carregarLista);

// 📌 Torna a função acessível globalmente (corrige "adicionarItem is not defined")
window.adicionarItem = adicionarItem;

