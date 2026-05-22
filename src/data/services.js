import {
  BookOpen, Languages, Mic, GraduationCap, Building2, Monitor,
} from "lucide-react";

export const SERVICES = [
  {
    icon: BookOpen, title: "Formation linguistique", kicker: "01",
    short: "Cours d'anglais sur mesure du débutant à l'avancé. Petits groupes, méthode immersive.",
    detail: "Notre programme phare. Six niveaux d'enseignement structuré — du débutant absolu aux apprenants avancés préparant des études internationales. Les cohortes sont volontairement petites (12 étudiants maximum) pour que chaque apprenant parle, écrive et soit corrigé chaque jour.",
    bullets: ["Six niveaux : A1 à C2 (cadre CECRL)", "Cohortes plafonnées à 12 étudiants", "Évaluations mensuelles", "Certificat à chaque niveau"],
    format: { Durée: "12 semaines par niveau", Horaires: "Matin, soir ou samedi", Groupe: "12 étudiants max.", Certificat: "Oui, par niveau" },
  },
  {
    icon: Languages, title: "Traduction de documents", kicker: "02",
    short: "Traduction certifiée de diplômes, documents juridiques, rapports et relevés.",
    detail: "Traduction assermentée entre l'anglais, le français, le swahili et le kirundi. Diplômes, relevés de notes, contrats, documents judiciaires, dossiers médicaux, rapports d'entreprise — avec la précision et la confidentialité que ces documents exigent.",
    bullets: ["Traductions assermentées", "EN · FR · SW · KR", "Acceptées par ambassades et universités", "Traitement confidentiel garanti"],
    format: { Délai: "3 à 7 jours ouvrables", Tarif: "Au document (devis sur demande)", Langues: "EN · FR · SW · KR", Livraison: "Papier + numérique" },
  },
  {
    icon: Mic, title: "Interprétariat", kicker: "03",
    short: "Interprètes simultanés et consécutifs pour conférences, négociations et événements.",
    detail: "Interprétation en direct pour conférences, conseils d'administration, événements diplomatiques et missions de terrain. Nos interprètes sont des vétérans du circuit de la Communauté Est-Africaine — sollicités par les ONG, ambassades et entreprises qui opèrent dans la région des Grands Lacs.",
    bullets: ["Interprétation simultanée (en cabine)", "Interprétation consécutive", "Chuchotage sur demande", "Événements multi-jours"],
    format: { Tarif: "Journée / demi-journée", Langues: "EN ↔ FR ↔ SW ↔ KR", Délai: "Idéal avec 1+ semaine de préavis", Matériel: "Cabines et casques disponibles" },
  },
  {
    icon: GraduationCap, title: "Préparation TOEFL & IELTS", kicker: "04",
    short: "Préparation aux examens avec module d'accent américain inclus.",
    detail: "Préparation intensive et méthodique au TOEFL iBT et à l'IELTS Academic. Nos diplômés franchissent régulièrement les seuils exigés par les universités nord-américaines, britanniques et australiennes. Examens blancs hebdomadaires, retours écrits et bilans de scores personnalisés.",
    bullets: ["TOEFL iBT — objectif 100+", "IELTS Academic — objectif 7.0+", "Examens blancs hebdomadaires", "Module accent américain inclus"],
    format: { Durée: "8 ou 12 semaines", Horaires: "Intensifs en soirée", Groupe: "10 étudiants max.", Inclus: "Manuels officiels complets" },
  },
  {
    icon: Building2, title: "Programmes entreprise", kicker: "05",
    short: "Programmes linguistiques sur mesure conçus pour votre secteur et votre équipe.",
    detail: "Enseignement de l'anglais sur mesure pour les organisations — banques, ONG, ministères et entreprises privées. Nous concevons un programme autour du vocabulaire de votre secteur, du niveau de votre équipe et de votre emploi du temps. Sur place ou à distance. Nous avons formé cadres, fonctionnaires et équipes de terrain.",
    bullets: ["Sur place ou dans notre centre", "Vocabulaire sectoriel intégré", "Évaluations avant/après", "Rapports de progression pour RH"],
    format: { Durée: "Sur projet (8 à 24 semaines)", Horaires: "Adaptés à votre équipe", Groupe: "Sur mesure (5 à 30)", Tarification: "Devis par mission" },
  },
  {
    icon: Monitor, title: "Apprentissage en ligne", kicker: "06",
    short: "Classes virtuelles en direct et cours asynchrones. Apprenez de partout.",
    detail: "Tous nos programmes de base sont disponibles entièrement en ligne. Classes virtuelles interactives en direct avec les mêmes enseignants qu'en présentiel — plus une bibliothèque de cours asynchrones, conférences enregistrées et exercices accessibles 24h/24.",
    bullets: ["Classes virtuelles en direct", "Cours et exercices enregistrés", "Mêmes certificats qu'en présentiel", "Accompagnement technique inclus"],
    format: { Plateforme: "Zoom + LMS dédié", Groupe: "12 étudiants max.", Horaires: "Plusieurs fuseaux servis", Équipement: "Webcam + bonne connexion" },
  },
];


