
## Installation et Configuration

### 1. **Vérifier l'instalation de Nodejs**

```bash
node -v

```

### 2. **Installer les dépendances**
```bash
npm install

```

### 3. **Installation de Cypress (tests E2E)**
```bash
# Installer Cypress et ses dépendances
npm install --save-dev cypress

# Vérifier l'installation
npx cypress verify
```

---

## Lancement de l'application

### **Mode développement**
```bash
npm run dev

# L'application sera accessible sur:
# http://localhost:3000
```

### **Mode production**
```bash
# Build de production
npm run build

# Lancer en mode production
npm run start
```

---

## 🧪 Tests Automatisés

### **Tests E2E avec Cypress**

#### **Lancer Cypress en mode interactif**
```bash

# Terminal 1 pour démarer l'application:
npm run dev

# Terminal 2 pour démarer Cypress:
npx cypress open
```


