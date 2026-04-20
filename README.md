# 🌌 Universo

<p align="center">
  <img src="https://i.pinimg.com/736x/a1/da/a1/a1daa19fb3d7b1fa28993d8926c7c385.jpg" width="200"/>
</p>

<p align="center">
  Bot Discord sviluppato in TypeScript con architettura modulare, pensato per minigiochi, gestione utenti e espandibilità futura.
</p>

---

## ⚙️ Tecnologie

- Node.js
- TypeScript
- discord.js
- JSON storage (lightweight database)

---

---

## 🚀 Avvio del progetto

### 1. Clona la repo
```
git clone https://github.com/ChillatoOfficial/Universo.git
cd Universo
```

### 2. Installa le dipendenze
```
npm install
```

### 3. Configura il bot

Modifica il file:

```
src/config.ts
```

Inserisci:
- Token del bot
- ID guild (opzionale per slash command locali)

---

### 4. Avvia in sviluppo
```
npm run dev
```

### 5. Build
```
npm run build
npm start
```

---

## 🧠 Sistema utenti

Il bot utilizza un database JSON semplice:

```
src/db/users.json
```

Gestito tramite:

```
src/utils/storageuser.ts
```

Funzionalità:
- Creazione automatica utenti
- Persistenza dati
- Lettura/scrittura veloce

---

## 🎮 Funzionalità attuali

- Comando `ping`
- Sistema base utenti
- Event handler (`ready`)

---

---


## 👤 Autore

**Chillato**

---

## 📜 Licenza

MIT
