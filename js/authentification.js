// ============================================
// GESTION DE L'AUTHENTIFICATION
// Validation du formulaire de connexion
// Auteur: Lassina Bakary Keïta
// Version: 1.0 - Version française
// ============================================

/**
 * Configuration des expressions régulières pour la validation
 */
const REGEX_VALIDATION = {
    nomComplet: /^[a-zA-ZÀ-ÿ\s'-]{3,50}$/, // Nom avec accents, espaces et apostrophes
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Format email standard
};

/**
 * Initialise le système d'authentification
 */
document.addEventListener('DOMContentLoaded', function() {
    const formulaireConnexion = document.getElementById('formulaire-connexion');
    const boutonBasculerMotDePasse = document.querySelector('.basculer-mot-de-passe');
    const champMotDePasse = document.getElementById('mot-de-passe');
    const modalAuthentification = document.getElementById('modal-authentification');
    
    // Basculer la visibilité du mot de passe
    if (boutonBasculerMotDePasse && champMotDePasse) {
        boutonBasculerMotDePasse.addEventListener('click', function() {
            basculerVisibiliteMotDePasse(champMotDePasse, this);
        });
    }
    
    // Validation du formulaire d'authentification
    if (formulaireConnexion) {
        formulaireConnexion.addEventListener('submit', function(evenement) {
            evenement.preventDefault();
            
            // Récupérer les valeurs des champs
            const nomComplet = document.getElementById('nom-complet').value;
            const email = document.getElementById('email').value;
            const motDePasse = document.getElementById('mot-de-passe').value;
            const messageAuthentification = document.getElementById('message-authentification');
            
            // Réinitialiser le message
            messageAuthentification.className = 'alert d-none';
            messageAuthentification.textContent = '';
            
            // Valider les champs
            if (!validerNomComplet(nomComplet)) {
                afficherMessageAuthentification('Veuillez entrer un nom complet valide (3-50 caractères)', 'erreur');
                return;
            }
            
            if (!validerEmail(email)) {
                afficherMessageAuthentification('Veuillez entrer une adresse email valide', 'erreur');
                return;
            }
            
            if (!validerMotDePasse(motDePasse)) {
                afficherMessageAuthentification('Le mot de passe doit contenir au moins 6 caractères', 'erreur');
                return;
            }
            
            // Si tout est valide
            afficherMessageAuthentification('Authentification réussie ! Redirection...', 'succes');
            
            // Simuler l'authentification et rediriger
            simulerAuthentification(nomComplet, email);
        });
    }
    
    // Vérifier si l'utilisateur est déjà authentifié
    verifierAuthentification();
});

/**
 * Bascule la visibilité du mot de passe
 * @param {HTMLInputElement} champMotDePasse - Champ de mot de passe
 * @param {HTMLElement} bouton - Bouton de bascule
 */
function basculerVisibiliteMotDePasse(champMotDePasse, bouton) {
    if (champMotDePasse.type === 'password') {
        champMotDePasse.type = 'text';
        bouton.classList.remove('fa-eye');
        bouton.classList.add('fa-eye-slash');
        bouton.title = 'Cacher le mot de passe';
    } else {
        champMotDePasse.type = 'password';
        bouton.classList.remove('fa-eye-slash');
        bouton.classList.add('fa-eye');
        bouton.title = 'Afficher le mot de passe';
    }
}

/**
 * Valide le nom complet
 * @param {string} nomComplet - Nom à valider
 * @returns {boolean} True si le nom est valide
 */
function validerNomComplet(nomComplet) {
    return REGEX_VALIDATION.nomComplet.test(nomComplet);
}

/**
 * Valide l'adresse email
 * @param {string} email - Email à valider
 * @returns {boolean} True si l'email est valide
 */
function validerEmail(email) {
    return REGEX_VALIDATION.email.test(email);
}

/**
 * Valide le mot de passe
 * @param {string} motDePasse - Mot de passe à valider
 * @returns {boolean} True si le mot de passe est valide
 */
function validerMotDePasse(motDePasse) {
    return motDePasse.length >= 6;
}

/**
 * Affiche un message d'authentification
 * @param {string} message - Le message à afficher
 * @param {string} type - Le type de message ('succes' ou 'erreur')
 */
function afficherMessageAuthentification(message, type) {
    const messageAuthentification = document.getElementById('message-authentification');
    messageAuthentification.textContent = message;
    messageAuthentification.classList.remove('d-none');
    messageAuthentification.classList.remove('alert-success', 'alert-danger');
    
    if (type === 'succes') {
        messageAuthentification.classList.add('alert-success');
    } else {
        messageAuthentification.classList.add('alert-danger');
    }
    
    // Faire défiler jusqu'au message si nécessaire
    messageAuthentification.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Simule le processus d'authentification
 * @param {string} nomComplet - Nom complet de l'utilisateur
 * @param {string} email - Email de l'utilisateur
 */
function simulerAuthentification(nomComplet, email) {
    // Stocker les informations utilisateur dans le localStorage
    localStorage.setItem('nomCompletUtilisateur', nomComplet);
    localStorage.setItem('emailUtilisateur', email);
    localStorage.setItem('estAuthentifie', 'true');

    
    // Redirection après un délai
    setTimeout(() => {
        const modal = document.getElementById('modal-authentification');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Redirection vers la page des paramètres
        window.location.href = 'othersPages/parameter.html';
    }, 1500);
}

/**
 * Vérifie si l'utilisateur est déjà authentifié
 */
function verifierAuthentification() {
    const estAuthentifie = localStorage.getItem('estAuthentifie');
    if (estAuthentifie === 'true') {
        // Pré-remplir le formulaire si l'utilisateur est déjà connecté
        const nomCompletSauvegarde = localStorage.getItem('nomCompletUtilisateur');
        const emailSauvegarde = localStorage.getItem('emailUtilisateur');
        
        if (nomCompletSauvegarde) {
            const champNomComplet = document.getElementById('nom-complet');
            if (champNomComplet) champNomComplet.value = nomCompletSauvegarde;
        }
        
        if (emailSauvegarde) {
            const champEmail = document.getElementById('email');
            if (champEmail) champEmail.value = emailSauvegarde;
        }
        
        // Cocher automatiquement "Se souvenir de moi"
        const caseSeSouvenir = document.getElementById('se-souvenir');
        if (caseSeSouvenir) caseSeSouvenir.checked = true;
    }
}

/**
 * Déconnecte l'utilisateur
 */
function deconnecterUtilisateur() {
    localStorage.removeItem('nomCompletUtilisateur');
    localStorage.removeItem('emailUtilisateur');
    localStorage.removeItem('estAuthentifie');
    localStorage.removeItem('dateAuthentification');
    
    // Rediriger vers la page d'accueil
    window.location.href = 'index.html';
}






