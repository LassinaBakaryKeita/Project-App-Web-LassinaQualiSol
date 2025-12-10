// ==================== CONFIGURATION GLOBALE ====================
// Paramètres et constantes globales de l'application
// Auteur: Lassina Bakary Keïta
// Version: 1.0

// Configuration des paramètres du sol (identique à celle dans parameters.js)
const PARAMETERS_CONFIG = {
    ph: {
        optMin: 6.2,
        optMax: 7.2,
        minPossible: 3,
        maxPossible: 10,
        unit: '',
        description: 'Mesure l\'acidité ou l\'alcalinité du sol',
        icon: 'fa-vial'
    },
    humidite: {
        optMin: 30,
        optMax: 60,
        minPossible: 0,
        maxPossible: 100,
        unit: '%',
        description: 'Teneur en eau du sol',
        icon: 'fa-tint'
    },
    temperature: {
        optMin: 15,
        optMax: 30,
        minPossible: -10,
        maxPossible: 60,
        unit: '°C',
        description: 'Température du sol',
        icon: 'fa-thermometer-half'
    },
    azote: {
        optMin: 20,
        optMax: 50,
        minPossible: 0,
        maxPossible: 200,
        unit: 'mg/kg',
        description: 'Élément essentiel pour la croissance des plantes',
        icon: 'fa-atom'
    },
    phosphore: {
        optMin: 30,
        optMax: 50,
        minPossible: 0,
        maxPossible: 150,
        unit: 'mg/kg',
        description: 'Important pour le développement racinaire',
        icon: 'fa-fire'
    },
    potassium: {
        optMin: 120,
        optMax: 200,
        minPossible: 0,
        maxPossible: 600,
        unit: 'mg/kg',
        description: 'Améliore la résistance aux maladies',
        icon: 'fa-bolt'
    }
};

// Configuration de l'application
const APP_CONFIG = {
    name: 'LassinaQualiSol',
    version: '1.0',
    author: 'Lassina Bakary Keïta',
    contact: {
        email: 'lassbakkeita6@gmail.com',
        phone: '+212 615531182',
        address: 'Montfleurie 2'
    },
    features: {
        authentication: true,
        dataPersistence: true,
        printResults: true,
        responsive: true
    }
};

// Messages constants
const MESSAGES = {
    errors: {
        invalidEmail: 'Veuillez entrer une adresse email valide',
        invalidName: 'Veuillez entrer un nom complet valide (3-50 caractères)',
        shortPassword: 'Le mot de passe doit contenir au moins 6 caractères',
        noSoilData: 'Aucune donnée d\'analyse trouvée',
        invalidParameter: 'Valeur de paramètre invalide'
    },
    success: {
        authSuccess: 'Authentification réussie !',
        analysisComplete: 'Analyse terminée avec succès',
        dataSaved: 'Données sauvegardées'
    },
    warnings: {
        suboptimalValue: 'Valeur hors plage optimale',
        poorSoilQuality: 'La qualité du sol nécessite des améliorations'
    }
};

// Couleurs de l'application
const COLORS = {
    primary: '#2e6e3a',
    secondary: '#74422d',
    accent: '#F1916D',
    light: '#f4ead8',
    dark: '#333',
    success: '#28a745',
    warning: '#ffc107',
    danger: '#dc3545'
};

// Exposer la configuration globalement
window.PARAMETERS_CONFIG = PARAMETERS_CONFIG;
window.APP_CONFIG = APP_CONFIG;
window.MESSAGES = MESSAGES;
window.COLORS = COLORS;

console.log(`${APP_CONFIG.name} v${APP_CONFIG.version} - Configuration chargée`);