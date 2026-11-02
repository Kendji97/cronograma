// Cole aqui a configuração do app web do seu projeto Firebase.
// Onde encontrar: Console do Firebase > ícone de engrenagem > Configurações do projeto >
// Geral > Seus apps > (app web) > "Configuração do SDK" > opção "Config".
//
// Esses valores não são senhas: quem protege seus dados são as regras do
// Firestore (arquivo firestore.rules). Pode deixar o repositório público.
//
// Enquanto o apiKey começar com "COLE", o app funciona em modo local
// (salva só no navegador, sem login e sem sincronizar).
export const firebaseConfig = {
  apiKey: "COLE_AQUI_SEU_API_KEY",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000000000"
};
