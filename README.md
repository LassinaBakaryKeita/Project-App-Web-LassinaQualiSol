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
