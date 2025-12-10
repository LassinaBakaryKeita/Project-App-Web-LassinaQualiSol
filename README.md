# Site web d'analyse de sol agricole - LassinaQualiSol

Bienvenue sur **LassinaQualiSol**, une plateforme web innovante pour l'analyse de la qualité des sols agricoles. Développée avec **HTML5**, **CSS3**, **JavaScript**, **Bootstrap 5** et **Font Awesome**, cette application permet aux agriculteurs et agronomes d'évaluer rapidement la santé de leurs sols et d'obtenir des recommandations personnalisées.

## 📊 Description du projet

LassinaQualiSol est une application web complète qui analyse six paramètres essentiels du sol pour fournir un diagnostic précis et des conseils d'amélioration. Le projet suit une architecture traditionnelle multi-pages avec une navigation fluide entre les différentes sections.

### 📄 Structure des pages

#### **Page d'accueil (index.html)**
- Présentation du service avec une interface moderne et conviviale
- Explication des six paramètres analysés (pH, humidité, température, azote, phosphore, potassium)
- Bouton d'appel à l'action pour démarrer l'analyse
- Design visuel avec dégradés et animations subtiles
- Modal d'authentification intégré

#### **Page d'analyse des paramètres (parameter.html)**
- Formulaire intuitif pour saisir les valeurs des six paramètres du sol
- Validation en temps réel avec feedback visuel (succès/avertissement/erreur)
- Indications des plages optimales pour chaque paramètre
- Interface organisée avec des cartes Bootstrap
- Boutons de soumission et réinitialisation

#### **Page des résultats (resultat.html)**
- Affichage du score global de qualité du sol (0-100%)
- Visualisation détaillée des scores par paramètre avec barres de progression animées
- Génération automatique de recommandations personnalisées
- Option d'impression des résultats pour archivage
- Possibilité de lancer une nouvelle analyse

### 🔐 Système d'authentification
- Modal de connexion avec validation des champs
- Simulation d'authentification avec sauvegarde dans le localStorage
- Option "Se souvenir de moi" pour une expérience utilisateur améliorée
- Validation robuste avec expressions régulières

## ⚙️ Fonctionnalités clés

### **1. Analyse scientifique avancée**
- Calcul précis des scores basé sur les plages optimales de chaque paramètre
- Algorithmes de calcul adaptés aux spécificités agricoles
- Génération de recommandations contextuelles et actionnables
- Système de métadonnées pour le suivi des analyses

### **2. Interface utilisateur professionnelle**
- **Navigation sticky** : Barre de navigation fixe avec slogans dynamiques
- **Design responsive** : Adaptation parfaite sur mobile, tablette et desktop avec Bootstrap
- **Animations fluides** : Barres de progression animées, scores en mouvement
- **Feedback visuel** : Notifications toast, validation en temps réel, couleurs codées
- **Composants Bootstrap** : Cartes, formulaires, boutons, modals

### **3. Expérience utilisateur optimisée**
- **Validation en temps réel** : Feedback immédiat lors de la saisie des données
- **Sauvegarde automatique** : Conservation des données dans le localStorage
- **Personnalisation** : Adaptation des messages selon le score obtenu
- **Accessibilité** : Interface claire avec contrastes optimisés
- **Navigation intuitive** : Menu de navigation cohérent sur toutes les pages

### **4. Fonctionnalités techniques avancées**
- **Système de notification** : Messages temporaires pour informer l'utilisateur
- **Gestion des métadonnées** : Date, ID unique et nom d'utilisateur associés à chaque analyse
- **Export des résultats** : Fonction d'impression optimisée avec CSS dédié
- **Validation robuste** : Contrôle des valeurs saisies et gestion des erreurs
- **Persistance des données** : Maintien des sessions utilisateur

## 🛠 Architecture technique

### **Technologies utilisées**
- **HTML5** → Structure sémantique et accessibilité
- **CSS3** → Styles modernes avec variables CSS, Flexbox, animations
- **JavaScript (ES6+)** → Logique métier, animations, gestion des données
- **Bootstrap 5** → Framework CSS pour les composants responsives et le layout
- **Font Awesome 6.4** → Icônes vectorielles pour une interface riche et intuitive
- **Google Fonts** → Polices Montserrat et Oswald pour une typographie élégante

### **Structure du projet**
<img width="710" height="630" alt="image" src="https://github.com/user-attachments/assets/462f843a-14dd-4716-aede-902e39f5e144" />

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

| Paramètre | Plage possible | Plage optimale | Unité  | Icône |
|-----------|----------------|----------------|------- |-------|
| **pH du sol** | 3 - 10 | 6.2 - 7.2 | - | fa-vial |
| **Humidité** | 0 - 100% | 30 - 60% | % | fa-tint |
| **Température** | -10 - 60°C | 15 - 30°C | °C | fa-thermometer-half |
| **Azote (N)** | 0 - 200 mg/kg | 20 - 50 mg/kg | mg/kg | fa-atom |
| **Phosphore (P)** | 0 - 150 mg/kg | 30 - 50 mg/kg | mg/kg | fa-fire |
| **Potassium (K)** | 0 - 600 mg/kg | 120 - 200 mg/kg | mg/kg | fa-bolt |

