//constantes
const MSG_CHAMPS = "Aucun champs ne doit être vide !";
const MSG_VIRGULES = "Aucun champ ne peut contenir une virgule !";
const MSG_NOM = "Le nom de l'animal doit avoir entre 3 et 20 caractères !";
const MSG_AGE = "L'âge doit être une valeur numérique entre 0 et 30 !";
const MSG_AGE_ENTIER = "L'age de l'animal doit etre un entier !";
const MSG_EMAIL = "L'adresse courriel doit avoir un format valide !";
const MSG_CODEPOSTAL = "Le code postal doit avoir un format canadien !";

function estVide(valeur) {
  return valeur == null || valeur.trim().length < 1;
}

function champVirgule(valeur) {
  return valeur.includes(",");
}

function ageAnimalNonValide(age) {
  return parseInt(age) <= 0 || parseInt(age) >= 30;
}

function nomAnimalTailleNonValide(nomAnimal) {
  return nomAnimal.trim().length < 3 || nomAnimal.trim().length > 20;
}

function validationNomAnimal(nomAnimal) {
  let erreurAnimal = document.getElementById("erreurAnimal");

  if (estVide(nomAnimal.value)) {
    erreurAnimal.innerHTML = MSG_CHAMPS;
    return false;
  }
  if (champVirgule(nomAnimal.value)) {
    erreurAnimal.innerHTML = MSG_VIRGULES;
    return false;
  }
  if (nomAnimalTailleNonValide(nomAnimal.value)) {
    erreurAnimal.innerHTML = MSG_NOM;
    return false;
  }

  erreurAnimal.innerHTML = "";
  return true;
}

function validationEspeceAnimal(especeAnimal) {
  let erreurEspece = document.getElementById("erreurEspece");

  if (estVide(especeAnimal.value)) {
    erreurEspece.innerHTML = MSG_CHAMPS;
    return false;
  }
  if (champVirgule(especeAnimal.value)) {
    erreurEspece.innerHTML = MSG_VIRGULES;
    return false;
  }

  erreurEspece.innerHTML = "";
  return true;
}

function validationRaceAnimal(raceAnimal) {
  let erreurRace = document.getElementById("erreurRace");

  if (estVide(raceAnimal.value)) {
    erreurRace.innerHTML = MSG_CHAMPS;
    return false;
  }
  if (champVirgule(raceAnimal.value)) {
    erreurRace.innerHTML = MSG_VIRGULES;
    return false;
  }

  erreurRace.innerHTML = "";
  return true;
}

function validationAge(ageAnimal) {
  let erreurAge = document.getElementById("erreurAge");

  if (isNaN(ageAnimal.value)) {
    erreurAge.innerHTML = MSG_AGE_ENTIER;
    return false;
  }
  if (estVide(ageAnimal.value)) {
    erreurAge.innerHTML = MSG_CHAMPS;
    return false;
  }
  if (champVirgule(ageAnimal.value)) {
    erreurAge.innerHTML = MSG_VIRGULES;
    return false;
  }
  if (ageAnimalNonValide(ageAnimal.value)) {
    erreurAge.innerHTML = MSG_AGE;

    return false;
  }

  erreurAge.innerHTML = "";
  return true;
}

function validationDescription(desAnimal) {
  let erreurDes = document.getElementById("erreurDes");

  if (estVide(desAnimal.value)) {
    erreurDes.innerHTML = MSG_CHAMPS;
    return false;
  }
  if (champVirgule(desAnimal.value)) {
    erreurDes.innerHTML = MSG_VIRGULES;
    return false;
  }

  erreurDes.innerHTML = "";
  return true;
}

function validationMail(courrielProprio) {
  let erreurMail = document.getElementById("erreurMail");
  if (estVide(courrielProprio.value)) {
    erreurMail.innerHTML = MSG_CHAMPS;
    return false;
  }
  if (champVirgule(courrielProprio.value)) {
    erreurMail.innerHTML = MSG_VIRGULES;
    return false;
  }

  erreurMail.innerHTML = "";
  return true;
}

function validationAdresse(adresseAnimal) {
  let erreurAdresse = document.getElementById("erreurAdresse");

  if (estVide(adresseAnimal.value)) {
    erreurAdresse.innerHTML = MSG_CHAMPS;
    return false;
  }
  if (champVirgule(adresseAnimal.value)) {
    erreurAdresse.innerHTML = MSG_VIRGULES;
    return false;
  }

  erreurAdresse.innerHTML = "";
  return true;
}

function validationVille(ville) {
  let erreurVille = document.getElementById("erreurVille");

  if (estVide(ville.value)) {
    erreurVille.innerHTML = MSG_CHAMPS;
    return false;
  }
  if (champVirgule(ville.value)) {
    erreurVille.innerHTML = MSG_VIRGULES;
    return false;
  }
  erreurVille.innerHTML = "";
  return true;
}

function validationCodeP(cp) {
  let erreurCode = document.getElementById("erreurCode");
  let codePostal = cp.value.toString().replace(/\s/g, "");

  if (estVide(cp.value)) {
    erreurCode.innerHTML = MSG_CHAMPS;
    return false;
  } else if (champVirgule(cp.value)) {
    erreurCode.innerHTML = MSG_VIRGULES;
    return false;
  } else if (codePostal.length != 6) {
    erreurCode.innerHTML = MSG_CODEPOSTAL;
    return false;
  } else if (
    !codePostal.charAt(0).match(/[a-zA-Z]/) ||
    !codePostal.charAt(2).match(/[a-zA-Z]/) ||
    !codePostal.charAt(4).match(/[a-zA-Z]/)
  ) {
    erreurCode.innerHTML = MSG_CODEPOSTAL;
    return false;
  } else if (
    !codePostal.charAt(1).match(/\d/) ||
    !codePostal.charAt(3).match(/\d/) ||
    !codePostal.charAt(5).match(/\d/)
  ) {
    erreurCode.innerHTML = MSG_CODEPOSTAL;
    return false;
  }

  erreurCode.innerHTML = "";
  return true;
}

function validationAdoption() {
  let nomAnimal = validationNomAnimal(document.forms["monForm"]["nom"]);

  let especeAnimal = validationEspeceAnimal(
    document.forms["monForm"]["espece"]
  );

  let raceAnimal = validationRaceAnimal(document.forms["monForm"]["rac"]);

  let ageAnimal = validationAge(document.forms["monForm"]["age"]);

  let desAnimal = validationDescription(
    document.forms["monForm"]["description"]
  );

  let courrielProprio = validationMail(
    document.forms["monForm"]["email_utilisateur"]
  );

  let adresseAnimal = validationAdresse(document.forms["monForm"]["adresse"]);

  let ville = validationVille(document.forms["monForm"]["ville"]);

  let cp = validationCodeP(document.forms["monForm"]["cp"]);

  return (
    nomAnimal &&
    especeAnimal &&
    raceAnimal &&
    ageAnimal &&
    desAnimal &&
    courrielProprio &&
    adresseAnimal &&
    ville &&
    cp
  );
}
