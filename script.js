

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
        carregarLista();
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
        querySnapshot.forEach((doc) => {
            const dados = doc.data();
            
            // Exclui apenas se ambos os valores forem exatamente iguais
            if (!(dados.nome === "Ana" && dados.item === '"Água mineral"')) {
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
document.addEventListener("DOMContentLoaded", carregarLista
