// Lista de itens disponíveis
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

// Importando o Firebase corretamente
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDFJJRgzZhaQhUBDPpLK4ZVNRo218mrfpk",
  authDomain: "evento-andy.firebaseapp.com",
  projectId: "evento-andy",
  storageBucket: "evento-andy.appspot.com",
  messagingSenderId: "776037423010",
  appId: "1:776037423010:web:eb6c51b82fa9f0d6c444fb"
};

// Inicializa o Firebase e Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Pegando elementos do HTML
const lista = document.getElementById("lista-itens");
const tabela = document.getElementById("tabela-confirmados");
const inputNome = document.getElementById("nome");

// Função para carregar os dados do Firebase
async function carregarDados() {
    const querySnapshot = await getDocs(collection(db, "escolhas"));
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
        await addDoc(collection(db, "escolhas"), { nome, item });

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

        // Atualiza a página para refletir os dados salvos
        carregarDados();
    } catch (error) {
        console.error("Erro ao salvar no Firestore:", error);
        alert("Houve um erro ao registrar sua escolha. Tente novamente!");
    }
}

// Carregar os dados ao abrir a página
carregarDados();
