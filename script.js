
import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 1. Seleciona o elemento <form> do HTML que possui o id "contactForm" e o guarda na constante 'form'
const form2 = document.getElementById("contactForm");

// 2. Adiciona um "ouvinte de eventos" que intercepta o momento em que o usuário envia (submit) o formulário
// A palavra 'async' indica que haverá operações demoradas (assíncronas) dentro desta função
form.addEventListener("submit", async (evento) => {

// 3. Evita o comportamento padrão do navegador, que seria recarregar a página ao enviar o formulário
evento.preventDefault();

// 4. Captura o texto digitado no campo de texto HTML que possui o id "nome"
const nome = document.getElementById("nome").value;

// 5. Captura o texto digitado no campo de texto HTML que possui o id "email"
const email = document.getElementById("email").value;

// 6. Inicia um bloco 'try' (tentar), usado para testar um código que pode gerar erros (como uma conexão de internet)
try {

// 7. Salva os dados no banco. 'await' faz o código esperar a resposta do Firebase antes de continuar.
// 'addDoc' cria um documento com ID aleatório dentro da coleção chamada "usuarios" no banco 'db'
const docRef = await addDoc(collection(db, "usuarios"), {
nome: nome, // Salva o nome capturado do formulário na propriedade 'nome' do banco
email: email, // Salva o e-mail capturado do formulário na propriedade 'email' do banco
criadoEm: new Date() // Salva a data e a hora exata deste momento no banco
});

// 8. Se o salvamento der certo, exibe no console do navegador o ID gerado automaticamente pelo Firebase
console.log("Documento criado com ID:", docRef.id);

// 9. Exibe uma janela de alerta flutuante na tela informando o usuário do sucesso
alert("Dados enviados com sucesso!");

// 10. Limpa todos os campos do formulário na tela, deixando-os em branco novamente
form.reset();

// 11. Inicia o bloco 'catch' (capturar), que só é executado se algo der errado dentro do bloco 'try'
} catch (erro) {

// 12. Exibe uma mensagem vermelha de erro detalhada no console do navegador para o desenvolvedor investigar
console.error("Erro ao enviar dados:", erro);

// 13. Exibe uma janela de alerta informando o usuário comum que houve uma falha
alert("Erro ao enviar os dados. Veja o console.");
}
});