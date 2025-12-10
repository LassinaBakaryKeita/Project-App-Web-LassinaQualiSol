// ============================================
// FICHIER PRINCIPAL - PAGE ACCUEIL
// Gestion de la page d'accueil et de la navigation
// Auteur: Lassina Bakary Keïta
// Version: 1.0 - Version française
// ============================================

/**
 * Initialise l'application lorsque le DOM est chargé
 */
document.addEventListener('DOMContentLoaded', function() {
    // Éléments de la page d'accueil
    const boutonDemarrerAnalyse = document.getElementById('demarrer-analyse');
    const modalAuthentification = document.getElementById('modal-authentification');
    const boutonFermerAuthentification = document.getElementById('fermer-authentification');
    const titreAnime = document.querySelector('.titre-anime');
    
    // Ouvrir la modal d'authentification
    if (boutonDemarrerAnalyse) {
        boutonDemarrerAnalyse.addEventListener('click', function() {
            ouvrirModalAuthentification();
        });
    }
    
    // Fermer la modal d'authentification 
    if (boutonFermerAuthentification) {
        boutonFermerAuthentification.addEventListener('click', function() {
            fermerModalAuthentification();
        });
    }
    
    // Fermer la modal en cliquant à l'extérieur
    if (modalAuthentification) {
        modalAuthentification.addEventListener('click', function(evenement) {
            if (evenement.target === modalAuthentification) {
                fermerModalAuthentification();
            }
        });
    }
    
    // Gestion des liens de navigation
    initialiserNavigation();
    
    // Animation du titre
    if (titreAnime) {
        animerTitre();
    }
    
    console.log('LassinaQualiSol - Page d\'accueil chargée avec succès');
});

/**
 * Ouvre la modal d'authentification
 */
function ouvrirModalAuthentification() {
    const modal = document.getElementById('modal-authentification');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Empêche le défilement
    }
}

/**
 * Ferme la modal d'authentification
 */
function fermerModalAuthentification() {
    const modal = document.getElementById('modal-authentification');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Rétablit le défilement
    }
}

/**
 * Initialise la navigation entre les pages
 */
function initialiserNavigation() {
    const liensNavigation = document.querySelectorAll('.lien-nav');
    
    liensNavigation.forEach(lien => {
        lien.addEventListener('click', function(evenement) {
            // Si le lien n'a pas d'URL spécifique, empêche le comportement par défaut
            if (this.getAttribute('href') === '#') {
                evenement.preventDefault();
            }
            
            // Met à jour la classe active
            liensNavigation.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/**
 * Anime le titre principal
 */
function animerTitre() {
    const titre = document.querySelector('.titre-anime');
    let estAgrandi = false;
    
    setInterval(() => {
        if (estAgrandi) {
            titre.style.transform = 'scale(1)';
        } else {
            titre.style.transform = 'scale(1.03)';
        }
        estAgrandi = !estAgrandi;
    }, 2000);
}

/**
 * Affiche une notification temporaire
 * @param {string} message - Message à afficher
 * @param {string} type - Type de notification ('succes', 'erreur', 'avertissement')
 */
function afficherNotification(message, type) {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'erreur' ? 'danger' : 'success'} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1060;
        min-width: 300px;
        max-width: 400px;
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


