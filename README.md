# Cronograma R1 2027

Cronograma de estudos para SUS-SP, USP-SP e ENARE (128 temas em dois ciclos por incidência), com revisões, questões, caderno de erros e simulados. Os dados ficam no **Firebase** (Firestore) e o site é publicado no **GitHub Pages**. No celular, ele vira um app instalável que também abre sem internet.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | A página (visual e telas) |
| `app.js` | Toda a lógica do cronograma |
| `firebase.js` | Login e conexão com o Firestore |
| `firebase-config.js` | **Você edita:** a configuração do seu projeto Firebase |
| `firestore.rules` | Regras de segurança para colar no Firebase |
| `manifest.webmanifest`, `sw.js`, `icons/` | App instalável e uso offline |

---

## 1. Firebase (uns 10 minutos)

### 1.1 Registrar o app web e copiar a configuração
1. Abra o [Console do Firebase](https://console.firebase.google.com) e entre no seu projeto.
2. Clique na engrenagem ⚙️ > **Configurações do projeto** > aba **Geral**.
3. Em **Seus apps**, se ainda não houver um app web, clique no ícone **`</>`**, dê um nome (ex.: *cronograma*) e registre. **Não** precisa marcar o Firebase Hosting.
4. Em **Configuração do SDK**, escolha **Config** e copie o objeto `firebaseConfig`.
5. Cole os valores no arquivo **`firebase-config.js`**, no lugar dos que começam com `COLE_AQUI` / `seu-projeto`.

### 1.2 Ativar o login
1. Menu **Build > Authentication** > **Começar** (se for a primeira vez).
2. Aba **Sign-in method**: ative **Google** (escolha seu e-mail de suporte) e, se quiser, **E-mail/senha**.
   - Recomendo ativar os dois. Em alguns celulares, sobretudo iPhone com o app instalado na tela inicial, o login com e-mail e senha é o mais confiável.
3. Aba **Settings > Authorized domains** > **Add domain** e adicione **`SEU-USUARIO.github.io`** (troque pelo seu usuário do GitHub, sem `https://` e sem o nome do repositório).

### 1.3 Criar o banco e colar as regras
1. Menu **Build > Firestore Database** > **Criar banco de dados**.
2. Escolha **modo de produção** e a região **`southamerica-east1` (São Paulo)**.
3. Na aba **Regras**, apague o que estiver lá, cole o conteúdo do arquivo **`firestore.rules`** e clique em **Publicar**.

Com essas regras, cada conta só lê e grava os próprios dados (`users/{seu-id}/...`). Ninguém mais tem acesso, mesmo que o repositório seja público.

---

## 2. GitHub Pages (uns 5 minutos)

1. No seu repositório, clique em **Add file > Upload files** e envie **todos os arquivos desta pasta**, incluindo a pasta `icons`, na **raiz** do repositório. Lembre-se de enviar o `firebase-config.js` já editado.
2. Vá em **Settings > Pages**.
3. Em **Build and deployment > Source**, escolha **Deploy from a branch**. Em **Branch**, escolha **main** e a pasta **/(root)** e clique em **Save**.
4. Espere 1 a 2 minutos. O endereço aparece no topo da página: `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

> Repositório privado: o GitHub Pages só funciona em repositório privado nos planos pagos do GitHub. Em repositório público está tudo bem, porque a configuração do Firebase não é segredo e quem protege os dados são as regras do passo 1.3.

---

## 3. Primeiro acesso e migração dos dados

1. Abra o endereço do GitHub Pages e entre com Google, ou crie uma conta com e-mail e senha.
2. Para trazer o que você já registrou na versão do Claude:
   - Na versão do Claude: aba **Cronograma** > **Baixar backup (.json)**.
   - Na versão nova: aba **Cronograma** > **Restaurar de um arquivo** > escolha o arquivo > **Substituir**.
3. No topo da tela, a indicação deve mostrar **"sincronizado"**.

## 4. Instalar no celular

- **Android (Chrome):** abra o endereço > menu **⋮** > **Instalar app** (ou **Adicionar à tela inicial**).
- **iPhone (Safari):** abra o endereço > botão **Compartilhar** > **Adicionar à Tela de Início**.

O app abre em tela cheia. Sem internet, você continua registrando normalmente: tudo fica salvo no aparelho e sincroniza quando a conexão voltar.

## 5. Atualizações

Quando houver uma versão nova, substitua os arquivos no repositório. Mantenha o seu `firebase-config.js`, que não muda. Cada versão nova já vem com o número de `CACHE` atualizado no `sw.js`, para os aparelhos baixarem a atualização. Se o app no celular demorar a mudar, feche e abra de novo.

## Problemas comuns

| Mensagem | O que fazer |
|---|---|
| "Este endereço não está autorizado no Firebase" | Adicione `SEU-USUARIO.github.io` em Authentication > Settings > Authorized domains (passo 1.2). |
| "Esse método de login está desativado" | Ative Google e/ou E-mail/senha em Authentication > Sign-in method. |
| "Sem permissão para salvar" ou "erro ao ler o Firebase" | Cole e publique as regras do `firestore.rules` (passo 1.3). |
| O topo mostra "modo local: salvo só neste aparelho" | O `firebase-config.js` ainda está com os valores de exemplo. |
| O login com Google não abre no iPhone (app da tela inicial) | Use e-mail e senha, ou entre uma vez pelo Safari antes de instalar. |
