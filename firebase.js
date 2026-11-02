// Conexão com o Firebase: login (Google ou e-mail) e banco Firestore.
// Os dados de cada usuário ficam em users/{uid}/... e as regras do Firestore
// (firestore.rules) impedem que outra conta leia ou grave neles.
import { firebaseConfig } from './firebase-config.js';

const V = '10.12.2';
const $ = id => document.getElementById(id);
const configurado = firebaseConfig && firebaseConfig.apiKey && !/^COLE/i.test(firebaseConfig.apiKey);

const MSG = {
  'auth/invalid-credential': 'E-mail ou senha incorretos.',
  'auth/wrong-password': 'E-mail ou senha incorretos.',
  'auth/user-not-found': 'Não existe conta com esse e-mail. Use “Criar conta”.',
  'auth/email-already-in-use': 'Já existe uma conta com esse e-mail. Use “Entrar”.',
  'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
  'auth/invalid-email': 'Esse e-mail não parece válido.',
  'auth/missing-password': 'Digite a senha.',
  'auth/unauthorized-domain': 'Este endereço não está autorizado no Firebase. Adicione-o em Authentication > Settings > Authorized domains.',
  'auth/operation-not-allowed': 'Esse método de login está desativado. Ative-o em Authentication > Sign-in method.',
  'auth/network-request-failed': 'Sem conexão com a internet. Tente de novo quando estiver online.',
  'auth/too-many-requests': 'Muitas tentativas. Espere alguns minutos e tente de novo.'
};
const erroTxt = e => (e && MSG[e.code]) || ('Não foi possível entrar' + (e && e.code ? ' (' + e.code + ')' : '') + '.');

function mostraLogin(msg) {
  $('login').hidden = false;
  if (msg) $('lErro').textContent = msg;
}

async function iniciar() {
  if (!configurado) {
    // Sem configuração: o app funciona em modo local (só neste aparelho).
    window.__fbResolve(null);
    return;
  }
  let mods;
  try {
    mods = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`),
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`)
    ]);
  } catch (e) {
    mostraLogin('Não foi possível carregar o Firebase. Confira a conexão e recarregue a página.');
    $('lGoogle').disabled = true; $('lEntrar').disabled = true; $('lCriar').disabled = true;
    return;
  }
  const [{ initializeApp }, A, F] = mods;
  const app = initializeApp(firebaseConfig);
  const auth = A.getAuth(app);
  let fsdb;
  try {
    fsdb = F.initializeFirestore(app, {
      ignoreUndefinedProperties: true,
      localCache: F.persistentLocalCache({ tabManager: F.persistentMultipleTabManager() })
    });
  } catch (e) {
    fsdb = F.getFirestore(app);
  }

  // Adaptador com a mesma interface que o app já usa (doc/collection/onSnapshot/set/add/delete).
  // As gravações não esperam o servidor: o Firestore aplica na hora no aparelho
  // e sincroniza quando houver internet. Erros aparecem por window.__fsErr.
  function makeDb(uid) {
    const P = p => ['users', uid].concat(p.split('/'));
    const snap = s => ({ id: s.id, exists: s.exists(), data: () => s.data(), metadata: s.metadata });
    const fire = pr => { pr.catch(e => window.__fsErr && window.__fsErr(e)); return Promise.resolve(); };
    const wrapDoc = r => ({
      id: r.id, path: r.path,
      get: () => F.getDoc(r).then(snap),
      set: d => fire(F.setDoc(r, d)),
      update: d => fire(F.updateDoc(r, d)),
      delete: () => fire(F.deleteDoc(r)),
      onSnapshot: (next, err) => F.onSnapshot(r, s => next(snap(s)), err)
    });
    return {
      doc: p => wrapDoc(F.doc(fsdb, ...P(p))),
      collection: p => {
        const c = F.collection(fsdb, ...P(p));
        return {
          path: c.path,
          doc: id => wrapDoc(id ? F.doc(c, id) : F.doc(c)),
          add: async d => { const r = F.doc(c); await fire(F.setDoc(r, d)); return wrapDoc(r); },
          onSnapshot: (next, err) => F.onSnapshot(c, q => next({ docs: q.docs.map(snap), size: q.size, empty: q.empty }), err)
        };
      }
    };
  }

  let iniciadoCom = null;
  A.onAuthStateChanged(auth, user => {
    if (user) {
      if (iniciadoCom && iniciadoCom !== user.uid) { location.reload(); return; }
      $('login').hidden = true;
      $('conta').hidden = false;
      $('contaNome').textContent = user.email || user.displayName || 'Conectado';
      if (!iniciadoCom) { iniciadoCom = user.uid; window.__fbResolve(makeDb(user.uid)); }
    } else {
      if (iniciadoCom) { location.reload(); return; }
      mostraLogin();
    }
  });
  A.getRedirectResult(auth).catch(e => mostraLogin(erroTxt(e)));

  const ocupado = on => { ['lGoogle', 'lEntrar', 'lCriar'].forEach(id => { $(id).disabled = on; }); };
  $('lGoogle').onclick = async () => {
    $('lErro').textContent = ''; ocupado(true);
    const prov = new A.GoogleAuthProvider();
    prov.setCustomParameters({ prompt: 'select_account' });
    try {
      await A.signInWithPopup(auth, prov);
    } catch (e) {
      if (e && (e.code === 'auth/popup-blocked' || e.code === 'auth/operation-not-supported-in-this-environment')) {
        try { await A.signInWithRedirect(auth, prov); return; } catch (e2) { $('lErro').textContent = erroTxt(e2); }
      } else if (!(e && (e.code === 'auth/popup-closed-by-user' || e.code === 'auth/cancelled-popup-request'))) {
        $('lErro').textContent = erroTxt(e);
      }
    }
    ocupado(false);
  };
  const comEmail = async criar => {
    const email = $('lEmail').value.trim(), senha = $('lSenha').value;
    if (!email || !senha) { $('lErro').textContent = 'Preencha e-mail e senha.'; return; }
    $('lErro').textContent = ''; ocupado(true);
    try {
      if (criar) await A.createUserWithEmailAndPassword(auth, email, senha);
      else await A.signInWithEmailAndPassword(auth, email, senha);
    } catch (e) { $('lErro').textContent = erroTxt(e); }
    ocupado(false);
  };
  $('lForm').addEventListener('submit', e => { e.preventDefault(); comEmail(false); });
  $('lCriar').onclick = () => comEmail(true);
  $('sair').onclick = () => A.signOut(auth).then(() => location.reload());
}

iniciar();
