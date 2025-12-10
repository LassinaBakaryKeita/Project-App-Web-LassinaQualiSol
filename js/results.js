// ============================================
// AFFICHAGE DES RÉSULTATS D'ANALYSE
// Calcul des scores et génération des recommandations
// Auteur: Lassina Bakary Keïta
// Version: 1.0 - Version française
// ============================================

/**
 * Configuration des couleurs pour les scores
 */
const COULEURS_SCORES = {
    excellent: { couleur: '#28a745', texte: 'Excellent' },
    bon: { couleur: '#ffc107', texte: 'Bon' },
    moyen: { couleur: '#fd7e14', texte: 'Moyen' },
    faible: { couleur: '#dc3545', texte: 'Faible' }
};

/**
 * Initialise l'affichage des résultats
 */
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si des données d'analyse sont disponibles
    const donneesSolJSON = localStorage.getItem('donneesAnalyseSol');
    const scoresJSON = localStorage.getItem('scoresParametres');
    const scoreFinalJSON = localStorage.getItem('scoreFinalAnalyse');
    
    if (!donneesSolJSON || !scoresJSON || !scoreFinalJSON) {
        afficherErreur('Aucune donnée d\'analyse trouvée. Veuillez effectuer une analyse d\'abord.');
        return;
    }
    
    // Traiter et afficher les résultats
    const donneesSol = JSON.parse(donneesSolJSON);
    const scores = JSON.parse(scoresJSON);
    const scoreFinal = parseFloat(scoreFinalJSON);
    
    afficherResultats(donneesSol, scores, scoreFinal);
    
    // Gestion des boutons
    initialiserEcouteursEvenements();
});

/**
 * Affiche les résultats de l'analyse
 * @param {Object} donneesSol - Données du sol analysées
 * @param {Object} scores - Scores des paramètres
 * @param {number} scoreFinal - Score final global
 */
function afficherResultats(donneesSol, scores, scoreFinal) {
    // Afficher les résultats
    afficherScoreFinal(scoreFinal);
    afficherScoresParametres(scores);
    afficherRecommandations(donneesSol, scores);
    
    // Animer les barres de progression
    animerBarresProgression();
}

/**
 * Affiche le score final
 * @param {number} scoreFinal - Score final en pourcentage
 */
function afficherScoreFinal(scoreFinal) {
    const elementScoreFinal = document.getElementById('score-final');
    const elementInterpretation = document.getElementById('interpretation-score');
    
    if (elementScoreFinal) {
        elementScoreFinal.textContent = scoreFinal.toFixed(1) + '%';
        
        // Animation du score
        animerValeur(elementScoreFinal, 0, scoreFinal, 2000);
        
        // Appliquer la couleur selon le score
        const couleurScore = obtenirCouleurScore(scoreFinal);
        elementScoreFinal.style.color = couleurScore;
    }
    
    if (elementInterpretation) {
        const interpretation = interpreterScoreFinal(scoreFinal);
        elementInterpretation.textContent = interpretation.texte;
        elementInterpretation.style.color = interpretation.couleur;
    }
}

/**
 * Interprète le score final
 * @param {number} score - Score final
 * @returns {Object} Interpretation avec texte et couleur
 */
function interpreterScoreFinal(score) {
    if (score >= 80) {
        return {
            texte: 'Votre sol est en excellent état ! Les paramètres sont bien équilibrés et favorables à une croissance optimale.',
            couleur: COULEURS_SCORES.excellent.couleur
        };
    } else if (score >= 60) {
        return {
            texte: 'Votre sol est de bonne qualité, mais certains paramètres pourraient être améliorés pour une performance optimale.',
            couleur: COULEURS_SCORES.bon.couleur
        };
    } else if (score >= 40) {
        return {
            texte: 'Votre sol présente des déséquilibres modérés. Des améliorations sont nécessaires pour une culture réussie.',
            couleur: COULEURS_SCORES.moyen.couleur
        };
    } else {
        return {
            texte: 'Votre sol présente de graves déséquilibres. Une intervention urgente est nécessaire pour améliorer sa qualité.',
            couleur: COULEURS_SCORES.faible.couleur
        };
    }
}

/**
 * Obtient la couleur correspondant au score
 * @param {number} score - Score en pourcentage
 * @returns {string} Couleur CSS
 */
function obtenirCouleurScore(score) {
    if (score >= 80) return COULEURS_SCORES.excellent.couleur;
    if (score >= 60) return COULEURS_SCORES.bon.couleur;
    if (score >= 40) return COULEURS_SCORES.moyen.couleur;
    return COULEURS_SCORES.faible.couleur;
}

/**
 * Affiche les scores des paramètres individuels
 * @param {Object} scores - Scores des paramètres
 */
function afficherScoresParametres(scores) {
    for (const parametre in scores) {
        const barreProgression = document.getElementById(`progression-${parametre}`);
        if (!barreProgression) continue;
        
        const pourcentage = scores[parametre] * 100;
        const elementBarre = barreProgression.querySelector('.barre-progression');
        
        if (elementBarre) {
            // Définir la couleur en fonction du score
            let couleurClasse = 'bg-success';
            if (pourcentage < 50) {
                couleurClasse = 'bg-danger';
            } else if (pourcentage < 75) {
                couleurClasse = 'bg-warning';
            }
            
            elementBarre.className = `barre-progression ${couleurClasse}`;
            elementBarre.style.width = '0%';
            elementBarre.textContent = `${pourcentage.toFixed(1)}%`;
            
            // Stocker la largeur finale pour l'animation
            elementBarre.dataset.largeurFinale = pourcentage + '%';
        }
    }
}

/**
 * Anime les barres de progression
 */
function animerBarresProgression() {
    const barresProgression = document.querySelectorAll('.barre-progression');
    let delai = 500; // Délai initial
    
    barresProgression.forEach((barre, index) => {
        const largeurFinale = barre.dataset.largeurFinale;
        if (largeurFinale) {
            setTimeout(() => {
                barre.style.width = largeurFinale;
            }, delai + (index * 200)); // Délai progressif pour chaque barre
        }
    });
}

/**
 * Anime une valeur numérique
 * @param {HTMLElement} element - Élément à animer
 * @param {number} debut - Valeur de départ
 * @param {number} fin - Valeur finale
 * @param {number} duree - Durée de l'animation
 */
function animerValeur(element, debut, fin, duree) {
    const plage = fin - debut;
    const heureDebut = performance.now();
    const valeurInitiale = parseFloat(element.textContent.replace('%', '')) || debut;
    
    function mettreAJourValeur(heureActuelle) {
        const tempsEcoule = heureActuelle - heureDebut;
        const progression = Math.min(tempsEcoule / duree, 1);
        
        // Fonction d'assouplissement pour une animation plus naturelle
        const assouplissement = 1 - Math.pow(1 - progression, 4);
        const valeurActuelle = debut + (plage * assouplissement);
        
        element.textContent = valeurActuelle.toFixed(1) + '%';
        
        if (progression < 1) {
            requestAnimationFrame(mettreAJourValeur);
        }
    }
    
    requestAnimationFrame(mettreAJourValeur);
}

/**
 * Affiche les recommandations
 * @param {Object} donneesSol - Données du sol
 * @param {Object} scores - Scores des paramètres
 */
function afficherRecommandations(donneesSol, scores) {
    const listeRecommandations = document.getElementById('liste-recommandations');
    if (!listeRecommandations) return;
    
    listeRecommandations.innerHTML = '';
    
    const recommandations = genererRecommandations(donneesSol, scores);
    
    if (recommandations.length === 0) {
        const elementSansProbleme = document.createElement('div');
        elementSansProbleme.className = 'conseil-item';
        elementSansProbleme.innerHTML = `
            <i class="fas fa-check-circle me-2 text-success"></i>
            Félicitations ! Votre sol est bien équilibré. Continuez vos bonnes pratiques de gestion.
        `;
        listeRecommandations.appendChild(elementSansProbleme);
        return;
    }
    
    recommandations.forEach((recommandation, index) => {
        const elementRecommandation = document.createElement('div');
        elementRecommandation.className = 'conseil-item';
        elementRecommandation.style.animationDelay = `${index * 100}ms`;
        elementRecommandation.innerHTML = `
            <i class="fas fa-leaf me-2 text-success"></i>
            ${recommandation}
        `;
        listeRecommandations.appendChild(elementRecommandation);
    });
}

/**
 * Génère les recommandations basées sur les données du sol
 * @param {Object} donneesSol - Données du sol
 * @param {Object} scores - Scores des paramètres
 * @returns {Array} Liste des recommandations
 */
function genererRecommandations(donneesSol, scores) {
    const recommandations = [];
    const configuration = window.CONFIGURATION_PARAMETRES || {};
    
    // pH - Correction plus spécifique
    if (donneesSol.ph < 5.5) {
        recommandations.push("Votre pH est trop acide (pH " + donneesSol.ph.toFixed(1) + "). Ajoutez de la chaux agricole (20-50 kg/100m²) pour le rééquilibrer. Attendez 3-4 semaines avant de planter.");
    } else if (donneesSol.ph > 7.8) {
        recommandations.push("Votre pH est trop alcalin (pH " + donneesSol.ph.toFixed(1) + "). Utilisez du soufre élémentaire (1-2 kg/100m²) ou de la tourbe blonde pour le corriger.");
    } else if (donneesSol.ph < 6.2 || donneesSol.ph > 7.2) {
        recommandations.push("Votre pH (" + donneesSol.ph.toFixed(1) + ") est légèrement déséquilibré. Un apport modéré de matière organique (compost) peut aider à le stabiliser.");
    }
    
    // Humidité - Recommandations précises
    if (donneesSol.humidite < 20) {
        recommandations.push("Votre sol est trop sec (" + donneesSol.humidite + "% d'humidité). Augmentez la fréquence d'arrosage (tous les 2-3 jours) et utilisez un paillage organique (paille, copeaux) pour conserver l'humidité.");
    } else if (donneesSol.humidite > 80) {
        recommandations.push("Votre sol est trop humide (" + donneesSol.humidite + "% d'humidité). Améliorez le drainage avec du sable grossier et réduisez l'arrosage. Évitez de compacter le sol.");
    } else if (donneesSol.humidite < 30 || donneesSol.humidite > 60) {
        recommandations.push("L'humidité de votre sol (" + donneesSol.humidite + "%) n'est pas optimale. Ajustez votre programme d'arrosage selon les conditions météorologiques.");
    }
    
    // Température
    if (donneesSol.temperature < 10) {
        recommandations.push("La température de votre sol est trop basse (" + donneesSol.temperature + "°C). Utilisez un paillage plastique noir pour capter la chaleur et protégez les cultures avec des voiles d'hivernage.");
    } else if (donneesSol.temperature > 35) {
        recommandations.push("La température de votre sol est trop élevée (" + donneesSol.temperature + "°C). Un paillage clair (paille) peut aider à réduire la température. Arrosez tôt le matin.");
    }
    
    // Azote - Recommandations avec dosages
    if (donneesSol.azote < 10) {
        recommandations.push("Le taux d'azote est très faible (" + donneesSol.azote + " mg/kg). Ajoutez un engrais riche en azote (sang séché, fumier composté) ou du compost à raison de 50-100 kg/100m².");
    } else if (donneesSol.azote > 50) {
        recommandations.push("Le taux d'azote est trop élevé (" + donneesSol.azote + " mg/kg). Évitez les engrais azotés pendant 2-3 mois. Privilégiez des cultures gourmandes en azote (choux, maïs).");
    } else if (donneesSol.azote < 20) {
        recommandations.push("Le taux d'azote est légèrement faible (" + donneesSol.azote + " mg/kg). Un petit apport d'engrais azoté (purin d'ortie dilué) serait bénéfique.");
    }
    
    // Phosphore
    if (donneesSol.phosphore < 15) {
        recommandations.push("Le taux de phosphore est très faible (" + donneesSol.phosphore + " mg/kg). Ajoutez un engrais riche en phosphore (farine d'arêtes, poudre d'os) ou un engrais NPK équilibré.");
    } else if (donneesSol.phosphore > 50) {
        recommandations.push("Le taux de phosphore est trop élevé (" + donneesSol.phosphore + " mg/kg). Évitez les engrais phosphatés pendant un moment. Le phosphore en excès peut bloquer l'absorption d'autres nutriments.");
    } else if (donneesSol.phosphore < 30) {
        recommandations.push("Le taux de phosphore est légèrement faible (" + donneesSol.phosphore + " mg/kg). Un apport modéré de phosphate naturel serait bénéfique.");
    }
    
    // Potassium
    if (donneesSol.potassium < 80) {
        recommandations.push("Le taux de potassium est insuffisant (" + donneesSol.potassium + " mg/kg). Ajoutez un engrais riche en potassium (cendre de bois, vinasse de betterave) ou un engrais NPK équilibré.");
    } else if (donneesSol.potassium > 200) {
        recommandations.push("Le taux de potassium est trop élevé (" + donneesSol.potassium + " mg/kg). Évitez les engrais potassiques pendant 3-4 mois. Arrosez abondamment pour lessiver l'excès.");
    } else if (donneesSol.potassium < 120) {
        recommandations.push("Le taux de potassium est légèrement faible (" + donneesSol.potassium + " mg/kg). Un petit apport de sulfate de potasse serait bénéfique.");
    }
    
    // Recommandation générale si le score est bas
    const scoreFinal = window.calculerScoreFinal ? window.calculerScoreFinal(scores) : 50;
    if (scoreFinal < 40) {
        recommandations.push("Considérant le score global faible, nous recommandons une analyse professionnelle complète et une consultation avec un agronome pour un plan de correction détaillé.");
    }
    
    return recommandations;
}

/**
 * Initialise les écouteurs d'événements
 */
function initialiserEcouteursEvenements() {
    // Nouvelle analyse
    const boutonNouvelleAnalyse = document.getElementById('nouvelle-analyse');
    if (boutonNouvelleAnalyse) {
        boutonNouvelleAnalyse.addEventListener('click', function() {
            window.location.href = 'parameter.html';
        });
    }
    
    // Impression des résultats
    const boutonImprimer = document.getElementById('imprimer-resultats');
    if (boutonImprimer) {
        boutonImprimer.addEventListener('click', function() {
            imprimerResultats();
        });
    }
}

/**
 * Imprime les résultats
 */
function imprimerResultats() {
    // Ajouter une classe pour  l'impression
    document.body.classList.add('impression');
    
    // Ouvrir la boîte de dialogue d'impression
    window.print();
    
    // Retirer la classe après l'impression
    setTimeout(() => {
        document.body.classList.remove('impression');
    }, 1000);
}

/**
 * Affiche un message d'erreur
 * @param {string} message - Message d'erreur
 */
function afficherErreur(message) {
    const conteneurResultats = document.querySelector('main .container');
    if (conteneurResultats) {
        conteneurResultats.innerHTML = `
            <div class="alert alert-danger text-center">
                <h4>Erreur</h4>
                <p>${message}</p>
                <a href="parameter.html" class="btn btn-principal">Effectuer une analyse</a>
            </div>
        `;
    }
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
    
    // Suppression automatiquement après 5 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Exposer les fonctions globalement pour le débogage
window.genererRecommandations = genererRecommandations;
window.afficherResultats = afficherResultats;

// Ajout des styles pour l'impression
const stylesImpression = `
    @media print {
        header, footer, button {
            display: none !important;
        }
        
        body {
            background: white !important;
            color: black !important;
        }
        
        .carte {
            box-shadow: none !important;
            border: 1px solid #ddd !important;
            break-inside: avoid;
        }
        
        .score-resultat {
            font-size: 2.5rem !important;
        }
        
        .conseil-item {
            border-left: 3px solid #F1916D !important;
            margin-bottom: 10px !important;
        }
        
        .barre-progression {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }
    }
`;

// Ajout  les styles d'impression au document
const styleSheet = document.createElement('style');
styleSheet.textContent = stylesImpression;
document.head.appendChild(styleSheet);