# SportSee

Projet n°12 du [parcours Développeur d'Application - JavaScript React](https://openclassrooms.com/fr/paths/516-developpeur-dapplication-javascript-react) d'OpenClassrooms : _Développez un tableau de bord d'analytics avec React_.

> Pour ce projet, SportSee nous demande de créer une nouvelle version du dashboard utilisateur. Cette page intègrera des graphiques sur l'activité sportive de l'utilisateur. Le backend est fourni.

## 📚 Technologie utilisées

- React
- Vite
- React Router
- Sass
- D3

## 📦 Installation

### Prérequis

Pour lancer le projet, vous devez avoir les programmes suivants installés sur votre machine :

- nvm
- NodeJS (version 12.18)
- Yarn

### Installation et démarrage de l'API

Il est important d'utiliser la version 12.18 de NodeJS.
nvm permet de changer la version utilisée.
Pour l'installer, exécutez l'une des commandes suivantes dans le terminal :

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

Installez ensuite la version 12.18 de NodeJS en exécutant la commande :

```
nvm install 12.18
```

Puis basculez sur la version 12.18 de NodeJS :

```
nvm use 12.18
```

À l'aide du terminal, placez-vous dans le dossier **back** :

```
cd back
```

Exécutez la commande suivante pour installer les packages requis pour le fonctionnement du backend :

```
yarn
```

Enfin, exécutez la commande suivante pour démarrer l'API :

```
yarn dev
```

Si tout se passe bien, le message suivant devrait s'afficher dans le terminal :

```
Magic happens on port 3000.
```

### 🖥️ Installation de l'application Frontend

À l'aide du terminal, placez-vous dans le dossier **back** :

```
cd front
```

Pour installer les packages requis pour le fonctionnement de l'application, exécutez la commande :

```
npm install
```

Enfin, exécutez la commande suivante pour démarrer l'application :

```
npm run dev
```

Par défaut, l'application est accessible à l'adresse `http://127.0.0.1:5173`
