
### **Fonctionnalités JavaScript par fichier**

#### **main.js** - Page d'accueil
- Gestion de la modal d'authentification
- Animation du titre principal
- Système de notifications temporaires
- Navigation entre les pages

#### **authentification.js** - Système de connexion
- Validation des champs avec expressions régulières
- Basculage de visibilité du mot de passe
- Simulation d'authentification
- Persistance de session avec localStorage

#### **parameters.js** - Analyse des paramètres
- Configuration des plages optimales pour chaque paramètre
- Validation en temps réel des valeurs saisies
- Calcul des scores individuels et globaux
- Génération d'ID unique pour chaque analyse

#### **results.js** - Affichage des résultats
- Récupération et traitement des données sauvegardées
- Animation des barres de progression et scores
- Génération de recommandations personnalisées
- Fonction d'impression optimisée

#### **config.js** - Configuration globale
- Constantes et paramètres de l'application
- Messages et couleurs standardisées
- Configuration centralisée pour la maintenance

## 🎨 Design System

### **Palette de couleurs (Variables CSS)**
- **Vert foncé (#2e6e3a)** : Représente la santé des plantes et la nature
- **Brun terre (#74422d)** : Évoque la terre agricole et la stabilité
- **Orange saumon (#F1916D)** : Accent pour les actions et les interactions
- **Beige clair (#f4ead8)** : Fond doux pour réduire la fatigue visuelle
- **Couleurs Bootstrap** : Succès (vert), avertissement (jaune), danger (rouge)

### **Composants Bootstrap utilisés**
- **Navbar** : Navigation sticky avec menu responsive
- **Cards** : Présentation des paramètres et résultats
- **Forms** : Formulaire d'authentification et de saisie des paramètres
- **Modals** : Fenêtre d'authentification
- **Alerts** : Notifications et messages d'erreur
- **Progress bars** : Visualisation des scores
- **Buttons** : Actions principales et secondaires

### **Icônes Font Awesome**
- **Navigation** : fa-home, fa-flask, fa-chart-bar, fa-envelope
- **Paramètres** : fa-vial, fa-tint, fa-thermometer-half, fa-atom, fa-fire, fa-bolt
- **Actions** : fa-eye, fa-eye-slash, fa-redo, fa-print, fa-check-circle, fa-leaf

## 🌱 Paramètres analysés

L'application évalue six paramètres essentiels avec des plages optimales précises :

| Paramètre | Plage possible | Plage optimale | Unité | Icône |
|-----------|----------------|----------------|-------|-------|
| **pH du sol** | 3 - 10 | 6.2 - 7.2 | - | fa-vial |
| **Humidité** | 0 - 100% | 30 - 60% | % | fa-tint |
| **Température** | -10 - 60°C | 15 - 30°C | °C | fa-thermometer-half |
| **Azote (N)** | 0 - 200 mg/kg | 20 - 50 mg/kg | mg/kg | fa-atom |
| **Phosphore (P)** | 0 - 150 mg/kg | 30 - 50 mg/kg | mg/kg | fa-fire |
| **Potassium (K)** | 0 - 600 mg/kg | 120 - 200 mg/kg | mg/kg | fa-bolt |

## 🔧 Fonctionnalités techniques détaillées

### **Validation des données**
```javascript
// Validation en temps réel avec feedback
function validerParametre(idParametre, valeur) {
    // Vérification des plages et retour visuel
    // Classes Bootstrap: is-valid, is-warning, is-invalid
}
