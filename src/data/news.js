export const NEWS = [
  {
    slug: "inscriptions-hiver-2027",
    title: "Inscriptions hiver ouvertes — les places filent vite",
    category: "Annonce",
    date: "20 mai 2026",
    excerpt: "Nos cohortes de janvier 2027 ont officiellement ouvert les inscriptions. La préparation TOEFL et l'anglais des affaires sont déjà à 60% de capacité. Inscription anticipée jusqu'au 15 juin.",
    bgColor: "#fef3e2",
    variant: "a",
    content: [
      "Les inscriptions pour la session d'hiver 2027 sont officiellement ouvertes. Comme chaque année, nos cohortes les plus demandées — préparation TOEFL et anglais des affaires — se remplissent rapidement.",
      "À ce jour, plus de 60 % des places disponibles ont déjà été réservées. Nous encourageons les candidats motivés à finaliser leur dossier avant le 15 juin afin de bénéficier de l'inscription anticipée et de garantir leur place dans le créneau horaire souhaité.",
      "Pour vous inscrire, passez nous voir au centre, appelez-nous, ou remplissez le formulaire de contact en précisant le programme qui vous intéresse. Un test de placement gratuit sera organisé dans les jours qui suivent.",
    ],
  },
  {
    slug: "conference-anglais-afrique-est",
    title: "Conférence publique : « Pourquoi l'Afrique de l'Est lit en anglais »",
    category: "Événement",
    date: "12 mai 2026",
    excerpt: "Rejoignez-nous le 28 mai, 18h, pour une conférence publique du Pr. M. Niyonkuru sur la politique et l'économie de l'adoption de l'anglais dans l'EAC. Gratuit, sur inscription.",
    bgColor: "#1a1612",
    variant: "b",
    content: [
      "Le 28 mai à 18h, APLA·ELC accueille le Professeur M. Niyonkuru pour une conférence publique sur les enjeux politiques et économiques de l'adoption de l'anglais dans la Communauté Est-Africaine.",
      "Cette soirée s'adresse à tous : étudiants, professionnels, enseignants et curieux. Le professeur abordera l'histoire de la langue dans la région, ses implications pour l'emploi et l'éducation, et les choix que les Burundais font aujourd'hui face à un monde de plus en plus anglophone.",
      "Entrée gratuite, sur inscription. Places limitées à 120 personnes. Inscrivez-vous via notre formulaire de contact ou par téléphone.",
    ],
  },
  {
    slug: "atelier-traduction-juridique",
    title: "Atelier de traduction pour les professionnels du droit",
    category: "Atelier",
    date: "5 mai 2026",
    excerpt: "Un atelier intensif de deux jours sur la traduction de documents juridiques entre l'anglais et le français, animé par notre chef de service traduction. Limité à 16 participants.",
    bgColor: "#fef3e2",
    variant: "c",
    content: [
      "Notre division traduction organise un atelier intensif de deux jours dédié aux professionnels du droit : avocats, juristes, greffiers et traducteurs en activité.",
      "Animé par Jean-Paul K., chef de service traduction et traducteur assermenté, l'atelier couvrira la terminologie juridique anglais–français, les pièges courants, et les standards exigés par les tribunaux et ambassades.",
      "Seize places maximum pour garantir un travail pratique en petit groupe. Dates à confirmer — contactez-nous pour réserver votre place.",
    ],
  },
  {
    slug: "promotion-2026-diplomes",
    title: "Promotion 2026 : 187 nouveaux diplômés rejoignent le réseau",
    category: "Actualité",
    date: "28 avril 2026",
    excerpt: "Notre cérémonie de remise de diplômes de printemps a vu 187 étudiants recevoir leur certificat — dont 42 diplômés TOEFL, dont 31 avec un score supérieur à 100. Nous sommes immensément fiers.",
    bgColor: "#7c2d12",
    variant: "d",
    content: [
      "La cérémonie de remise de diplômes de printemps 2026 restera gravée dans nos mémoires. Cent quatre-vingt-sept étudiants ont reçu leur certificat devant familles, enseignants et partenaires institutionnels.",
      "Parmi eux, quarante-deux diplômés du programme TOEFL — dont trente-et-un ont obtenu un score supérieur à 100, seuil exigeant des meilleures universités nord-américaines.",
      "Félicitations à toute la promotion. Vous êmes désormais ambassadeurs d'APLA·ELC à travers le Burundi et au-delà.",
    ],
  },
  {
    slug: "partenariat-bourses-universites",
    title: "Nouveau partenariat : passerelle de bourses avec deux universités est-africaines",
    category: "Actualité",
    date: "14 avril 2026",
    excerpt: "Nous sommes ravis d'annoncer de nouveaux partenariats de bourses qui orienteront les meilleurs diplômés APLA·ELC vers deux grandes universités régionales.",
    bgColor: "#fef3e2",
    variant: "a",
    content: [
      "APLA·ELC signe deux nouveaux partenariats avec des universités de premier plan en Afrique de l'Est, ouvrant des passerelles de bourses pour nos meilleurs diplômés.",
      "Les étudiants ayant complété le niveau C1 ou obtenu un score TOEFL supérieur à 95 seront éligibles à un accompagnement personnalisé pour leurs candidatures.",
      "Ce partenariat confirme notre mission : ouvrir les portes que la langue avait fermées, et le faire concrètement, diplôme après diplôme.",
    ],
  },
  {
    slug: "journee-portes-ouvertes",
    title: "Journée portes ouvertes — venez rencontrer notre équipe",
    category: "Événement",
    date: "30 mars 2026",
    excerpt: "Chaque premier samedi du mois, nos portes sont ouvertes de 10h à 14h. Visitez les salles, échangez avec les enseignants, passez un test de placement gratuit. Sans inscription.",
    bgColor: "#1a1612",
    variant: "b",
    content: [
      "Chaque premier samedi du mois, APLA·ELC ouvre ses portes au public de 10h à 14h. Aucune inscription requise — venez comme vous êtes.",
      "Visitez nos salles de classe, rencontrez nos enseignants, posez toutes vos questions sur nos programmes, et passez un test de placement gratuit si vous le souhaitez.",
      "C'est l'occasion idéale de découvrir notre méthode, notre ambiance, et de sentir si APLA·ELC est le bon endroit pour votre parcours linguistique.",
    ],
  },
];

export function getArticleBySlug(slug) {
  return NEWS.find((article) => article.slug === slug) ?? null;
}
