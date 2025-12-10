// ============================================
// GESTION DES PARAMÈTRES DU SOL
// Validation et traitement des données du formulaire
// Auteur: Lassina Bakary Keïta
// Version: 1.0 - Version française
// ============================================

/**
 * Configuration des paramètres du sol avec leurs plages optimales
 */
const CONFIGURATION_PARAMETRES = {
    ph: {
        optimalMin: 6.2,
        optimalMax: 7.2,
        minimumPossible: 3,
        maximumPossible: 10,
        unite: '',
        description: 'Mesure l\'acidité ou l\'alcalinité du sol',
        importance: 'élevée'
    },
    humidite: {
        optimalMin: 30,
        optimalMax: 60,
        minimumPossible: 0,
        maximumPossible: 100,
        unite: '%',
        description: 'Teneur en eau du sol',
        importance: 'élevée'
    },
    temperature: {
        optimalMin: 15,
        optimalMax: 30,
        minimumPossible: -10,
        maximumPossible: 60,
        unite: '°C',
        description: 'Température du sol',
        importance: 'moyenne'
    },
    azote: {
        optimalMin: 20,
        optimalMax: 50,
        minimumPossible: 0,
        maximumPossible: 200,
        unite: 'mg/kg',
        description: 'Élément essentiel pour la croissance des plantes',
        importance: 'élevée'
    },
    phosphore: {
        optimalMin: 30,
        optimalMax: 50,
        minimumPossible: 0,
        maximumPossible: 150,
        unite: 'mg/kg',
        description: 'Important pour le développement racinaire',
        importance: 'élevée'
    },
    potassium: {
        optimalMin: 120,
        optimalMax: 200,
        minimumPossible: 0,
        maximumPossible: 600,
        unite: 'mg/kg',
        description: 'Améliore la résistance aux maladies',
        importance: 'moyenne'
    }
};

/**
 * Initialise le formulaire de paramètres
 */
document.addEventListener('DOMContentLoaded', function() {
    const formulaireParametres = document.getElementById('formulaire-parametres-sol');
    
    // Initialiser la validation en temps réel
    initialiserValidationTempsReel();
    
    // Gérer la soumission du formulaire
    if (formulaireParametres) {
        formulaireParametres.addEventListener('submit', function(evenement) {
            evenement.preventDefault();
            
            if (validerTousParametres()) {
                traiterParametresSol();
            } else {
                afficherNotification('Veuillez corriger les erreurs dans le formulaire', 'erreur');
            }
        });
    }
    
    // Gérer la réinitialisation du formulaire
    const boutonReinitialiser = formulaireParametres.querySelector('button[type="reset"]');
    if (boutonReinitialiser) {
        boutonReinitialiser.addEventListener('click', function() {
            setTimeout(() => {
                effacerToutesValidations();
            }, 100);
        });
    }
});

/**
 * Initialise la validation en temps réel pour tous les champs
 */
function initialiserValidationTempsReel() {
    const champs = document.querySelectorAll('#formulaire-parametres-sol input[type="number"]');
    
    champs.forEach(champ => {
        champ.addEventListener('blur', function() {  // Cet ecouteur d'even s'execute lors qu'on perd le focus 
            validerParametre(this.id, this.value);
        });
        
        champ.addEventListener('input', function() {  // Cet ecouteur d'even s'execute lors à chaque fois qu'on apporte une modif dans le champ 
            effacerValidation(this.id);
        });
    });
}

/**
 * Valide un paramètre spécifique
 * @param {string} idParametre - ID du paramètre
 * @param {string} valeur - Valeur à valider
 * @returns {boolean} True si la valeur est valide
 */
function validerParametre(idParametre, valeur) {
    const configuration = CONFIGURATION_PARAMETRES[idParametre];
    if (!configuration) return false;
    
    const valeurNumerique = parseFloat(valeur);
    const elementChamp = document.getElementById(idParametre);
    const groupeFormulaire = elementChamp.closest('.form-floating');
    
    // Réinitialiser les styles
    effacerValidation(idParametre);
    
    // Validation de base
    if (isNaN(valeurNumerique)) {
        afficherErreurChamp(idParametre, 'Veuillez entrer un nombre valide');
        return false;
    }
    
    if (valeurNumerique < configuration.minimumPossible || valeurNumerique > configuration.maximumPossible) {
        afficherErreurChamp(idParametre, `La valeur doit être entre ${configuration.minimumPossible} et ${configuration.maximumPossible}`);
        return false;
    }
    
    // Validation des plages optimales
    if (valeurNumerique < configuration.optimalMin || valeurNumerique > configuration.optimalMax) {
        afficherAvertissementChamp(idParametre, `Valeur hors plage optimale (${configuration.optimalMin}-${configuration.optimalMax})`);
    } else {
        afficherSuccesChamp(idParametre, 'Valeur optimale');
    }
    
    return true;
}

/**
 * Valide tous les paramètres du formulaire
 * @returns {boolean} True si tous les paramètres sont valides
 */
function validerTousParametres() {
    let tousValides = true;
    const champs = document.querySelectorAll('#formulaire-parametres-sol input[type="number"]');
    
    champs.forEach(champ => {
        if (!validerParametre(champ.id, champ.value)) {
            tousValides = false;
        }
    });
    
    return tousValides;
}

/**
 * Affiche une erreur pour un champ spécifique
 * @param {string} idParametre - ID du paramètre
 * @param {string} message - Message d'erreur
 */
function afficherErreurChamp(idParametre, message) {
    const elementChamp = document.getElementById(idParametre);
    const groupeFormulaire = elementChamp.closest('.form-floating'); 
    //La méthode closest permet de récuperer le conteneur le plus proche de elementchamp qui contient l'attribut "form-floating"
    
    elementChamp.classList.add('is-invalid');  // Une classe de boostrap pour pouvoir mettre le texte de message d'erreur en rouge
    
    // Ajouter le message d'erreur
    let elementErreur = groupeFormulaire.querySelector('.invalid-feedback');
    if (!elementErreur) { // si l'element n'existe pas , alors on va le créer 
        elementErreur = document.createElement('div');
        elementErreur.className = 'invalid-feedback'; // une classe boostrap dédiée pour l'affichage des messages d'erreurs dans un formulaire 
        groupeFormulaire.appendChild(elementErreur);
    }
    elementErreur.textContent = message;
}

/**
 * Affiche un avertissement pour un champ spécifique
 * @param {string} idParametre - ID du paramètre
 * @param {string} message - Message d'avertissement
 */
function afficherAvertissementChamp(idParametre, message) {
    const elementChamp = document.getElementById(idParametre);
    const groupeFormulaire = elementChamp.closest('.form-floating');
    
    elementChamp.classList.add('is-warning');
    
    // Ajouter le message d'avertissement
    let elementAvertissement = groupeFormulaire.querySelector('.warning-feedback');
    if (!elementAvertissement) {
        elementAvertissement = document.createElement('div');
        elementAvertissement.className = 'warning-feedback text-warning small mt-1';
        groupeFormulaire.appendChild(elementAvertissement);
    }
    elementAvertissement.textContent = message;
}

/**
 * Affiche un succès pour un champ spécifique
 * @param {string} idParametre - ID du paramètre
 * @param {string} message - Message de succès
 */
function afficherSuccesChamp(idParametre, message) {
    const elementChamp = document.getElementById(idParametre);
    const groupeFormulaire = elementChamp.closest('.form-floating');
    
    elementChamp.classList.add('is-valid');
    
    // Ajouter le message de succès
    let elementSucces = groupeFormulaire.querySelector('.valid-feedback');
    if (!elementSucces) {
        elementSucces = document.createElement('div');
        elementSucces.className = 'valid-feedback';
        groupeFormulaire.appendChild(elementSucces);
    }
    elementSucces.textContent = message;
}

/**
 * Efface la validation d'un champ spécifique
 * @param {string} idParametre - ID du paramètre
 */
function effacerValidation(idParametre) {
    const elementChamp = document.getElementById(idParametre);
    const groupeFormulaire = elementChamp.closest('.form-floating');
    
    elementChamp.classList.remove('is-invalid', 'is-valid', 'is-warning');
    
    // Supprimer les messages de feedback
    const elementsFeedback = groupeFormulaire.querySelectorAll('.invalid-feedback, .valid-feedback, .warning-feedback');
    elementsFeedback.forEach(element => element.remove());
}

/**
 * Efface toutes les validations du formulaire
 */
function effacerToutesValidations() {
    const champs = document.querySelectorAll('#formulaire-parametres-sol input[type="number"]');
    champs.forEach(champ => effacerValidation(champ.id));
}

/**
 * Traite les paramètres du sol et redirige vers les résultats
 */
function traiterParametresSol() {
    // Récupérer les valeurs de chaque paramètre 
    const donneesSol = {};
    
    Object.keys(CONFIGURATION_PARAMETRES).forEach(IDparametre => {
        const valeur = document.getElementById(IDparametre).value;
        donneesSol[IDparametre] = parseFloat(valeur);
    });
    
    // Ajouter des métadonnées
    donneesSol.dateAnalyse = new Date().toISOString(); 
    donneesSol.idAnalyse = genererIdAnalyse();
    donneesSol.nomUtilisateur = localStorage.getItem('nomCompletUtilisateur') || 'Utilisateur';
    
    // Calculer les scores immédiatement pour vérification
    const scores = calculerScoresParametres(donneesSol);
    const scoreFinal = calculerScoreFinal(scores);
    
    // Stocker les données
    localStorage.setItem('donneesAnalyseSol', JSON.stringify(donneesSol));
    localStorage.setItem('scoresParametres', JSON.stringify(scores));
    localStorage.setItem('scoreFinalAnalyse', scoreFinal.toString());
    
    // Afficher une notification de succès
    afficherNotification('Analyse en cours... Score calculé : ' + scoreFinal.toFixed(1) + '%', 'succes');
    
    // Redirection vers la page des résultats
    setTimeout(() => {
        window.location.href = 'resultat.html';
    }, 1000);
}

/**
 * Calcule les scores pour chaque paramètre
 * @param {Object} donneesSol - Données du sol
 * @returns {Object} Scores pour chaque paramètre
 */
function calculerScoresParametres(donneesSol) {
    const scores = {};
    
    for (const parametre in donneesSol) {
        if (parametre === 'dateAnalyse' || parametre === 'idAnalyse' || parametre === 'nomUtilisateur') continue;
        
        scores[parametre] = calculerScoreParametre(donneesSol[parametre], parametre);
    }
    
    return scores;
}

/**
 * Calcule le score d'un paramètre spécifique
 * @param {number} valeur - Valeur du paramètre
 * @param {string} parametre - Nom du paramètre
 * @returns {number} Score entre 0 et 1
 */
function calculerScoreParametre(valeur, parametre) {
    const configuration = CONFIGURATION_PARAMETRES[parametre];
    if (!configuration) return 0;
    
    const { optimalMin, optimalMax, minimumPossible, maximumPossible } = configuration;
    
    // Si dans la plage optimale, score parfait
    if (valeur >= optimalMin && valeur <= optimalMax) return 1;
    
    // Si en dessous de l'optimal
    if (valeur < optimalMin) {
        const distance = optimalMin - valeur;
        const distanceMax = optimalMin - minimumPossible;
        return Math.max(0, 1 - (distance / distanceMax));
    }
    
    // Si au-dessus de l'optimal
    if (valeur > optimalMax) {
        const distance = valeur - optimalMax;
        const distanceMax = maximumPossible - optimalMax;
        return Math.max(0, 1 - (distance / distanceMax));
    }
    
    return 0;
}

/**
 * Calcule le score final global
 * @param {Object} scores - Scores individuels des paramètres
 * @returns {number} Score final en pourcentage
 */
function calculerScoreFinal(scores) {
    const nombreParametres = Object.keys(scores).length;
    let scoreTotal = 0;
    
    for (const parametre in scores) {
        scoreTotal += scores[parametre];
    }
    
    return (scoreTotal / nombreParametres) * 100;
}

/**
 * Génère un ID unique pour l'analyse
 * @returns {string} ID unique
 */
function genererIdAnalyse() {
    return 'analyse_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Affiche une notification
 * @param {string} message - Message à afficher
 * @param {string} type - Type de notification ('succes', 'erreur', 'avertissement')
 */
function afficherNotification(message, type) {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'erreur' ? 'danger' : type} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1060;
        min-width: 300px;
    `;
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Supprimer automatiquement après 5 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Exposer les fonctions globalement pour le débogage
window.validerParametre = validerParametre;
window.CONFIGURATION_PARAMETRES = CONFIGURATION_PARAMETRES;
window.calculerScoreParametre = calculerScoreParametre;