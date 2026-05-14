// ─────────────────────────────────────────────────────────────
//  SCRIPT.JS — Madame Antika
//  1. Navigation (opaque au scroll)
//  2. Scroll vers la réservation
//  3. Onglets du menu
//  4. Formulaire → envoi automatique sur WhatsApp
// ─────────────────────────────────────────────────────────────

// Numéro WhatsApp du restaurant (format international, sans le +)
var WHATSAPP_NUMERO = "2250788220543";


// ══════════════════════════════════════════════════════
//  1. NAVIGATION — devient opaque quand on scrolle
// ══════════════════════════════════════════════════════

// On écoute l'événement "scroll" sur toute la page
window.addEventListener('scroll', function () {
  var navbar = document.getElementById('navbar');

  if (window.scrollY > 60) {
    // L'utilisateur a scrollé de plus de 60px → on ajoute la classe "scrolled"
    // Cette classe est définie dans style.css (fond plus opaque, padding réduit)
    navbar.classList.add('scrolled');
  } else {
    // On est revenu en haut → on retire la classe
    navbar.classList.remove('scrolled');
  }
});


// ══════════════════════════════════════════════════════
//  2. SCROLL VERS LA RÉSERVATION
//     Appelé par les boutons "Réserver" du site
// ══════════════════════════════════════════════════════

function scrollToReservation() {
  // Cible la section avec id="contact" et y fait défiler la page doucement
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}


// ══════════════════════════════════════════════════════
//  3. ONGLETS DU MENU
//     Appelé par onclick="changerOnglet('plats', this)"
//     dans les boutons du HTML
// ══════════════════════════════════════════════════════

function changerOnglet(categorie, boutonClique) {

  // ── Étape 1 : cacher toutes les grilles de plats
  var toutesLesGrilles = document.querySelectorAll('.menu-grid');
  toutesLesGrilles.forEach(function (grille) {
    grille.style.display = 'none';
  });

  // ── Étape 2 : retirer la classe "active" de tous les onglets
  var tousLesOnglets = document.querySelectorAll('.menu-tab');
  tousLesOnglets.forEach(function (onglet) {
    onglet.classList.remove('active');
  });

  // ── Étape 3 : afficher uniquement la grille de la catégorie choisie
  document.getElementById(categorie).style.display = 'grid';

  // ── Étape 4 : marquer l'onglet cliqué comme actif
  boutonClique.classList.add('active');
}


// ══════════════════════════════════════════════════════
//  4. FORMULAIRE → WHATSAPP
//     Quand le client confirme, un message WhatsApp
//     pré-rempli s'ouvre automatiquement vers le restaurant
// ══════════════════════════════════════════════════════

function soumettreFormulaire() {

  // Récupère les valeurs saisies dans le formulaire
  var nom      = document.getElementById('nom').value.trim();
  var tel      = document.getElementById('telephone').value.trim();
  var date     = document.getElementById('date').value;
  var heure    = document.getElementById('heure').value;
  var couverts = document.getElementById('couverts').value;
  var notes    = document.getElementById('notes').value.trim();

  // Vérifie que les champs obligatoires sont remplis
  if (!nom || !tel || !date || !heure || !couverts) {
    alert('Veuillez remplir tous les champs obligatoires avant de confirmer.');
    return;
  }

  // Formate la date en français (ex: 2026-06-15 → 15/06/2026)
  var dateParts    = date.split('-');
  var dateFormatee = dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0];

  // Construit le message WhatsApp avec toutes les infos de réservation
  var message =
    '🌺 *Nouvelle réservation — Madame Antika*\n\n' +
    '👤 *Nom :* '       + nom           + '\n' +
    '📞 *Téléphone :* '  + tel           + '\n' +
    '📅 *Date :* '       + dateFormatee  + '\n' +
    '🕐 *Heure :* '      + heure         + '\n' +
    '👥 *Couverts :* '   + couverts      + '\n' +
    (notes
      ? '📝 *Demandes spéciales :* ' + notes
      : '📝 *Demandes spéciales :* Aucune');

  // Encode le message pour l'URL (remplace espaces et caractères spéciaux)
  var messageEncode = encodeURIComponent(message);

  // Ouvre WhatsApp avec le message pré-rempli dans un nouvel onglet
  var lienWhatsApp = 'https://wa.me/' + WHATSAPP_NUMERO + '?text=' + messageEncode;
  window.open(lienWhatsApp, '_blank');

  // Affiche l'écran de confirmation sur le site
  document.getElementById('success-text').innerHTML =
    'Merci <strong>' + nom + '</strong>, votre demande a été envoyée.<br>' +
    'Le restaurant vous confirmera sur WhatsApp au plus vite.';

  document.getElementById('success-overlay').style.display = 'flex';
}


// Réinitialise le formulaire pour une nouvelle réservation
function resetForm() {
  document.getElementById('success-overlay').style.display  = 'none';
  document.getElementById('nom').value       = '';
  document.getElementById('telephone').value = '';
  document.getElementById('date').value      = '';
  document.getElementById('heure').value     = '';
  document.getElementById('couverts').value  = '';
  document.getElementById('notes').value     = '';
}