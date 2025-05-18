
export interface Patient {
  id: string;
  anonymousDisplayId: string;
  gender: string;
  dateOfBirth: string;
  age: number;
  primaryDiagnosis: string;
  relevantHistory: string[];
  currentConventionalTreatments: {
    drugName: string;
    dosage: string;
    notes: string;
  }[];
  previousAttempts: string[];
  physicianNote: string;
}

export interface Condition {
  id: string;
  name: string;
  commonSymptoms: string[];
  conventionalTreatmentChallenges: string[];
}

export interface ComplementaryApproach {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  relevantForConditions: string[];
}

export interface Source {
  id: string;
  title: string;
  type: string;
  authorOrOrganization: string;
  year?: number;
  url: string;
  summary: string;
  relatedApproaches?: string[];
  relatedConditions?: string[];
  platform?: string;
  durationMinutes?: number;
  keywords?: string[];
}

export interface Practitioner {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  accreditations: string[];
  specializations: string[];
  locationCity: string;
  synapsceNote: string;
  contactInfo: {
    phone: string;
    email: string;
    website: string;
  };
  supportedApproaches: string[];
}

export interface SynapsceData {
  patients: Patient[];
  conditions: Condition[];
  complementaryApproaches: ComplementaryApproach[];
  sources: Source[];
  practitioners: Practitioner[];
}

// Parsed JSON data
export const synapsceData: SynapsceData = {
  "patients": [
    {
      "id": "patient_001",
      "anonymousDisplayId": "Patiente #CHUV-78B45",
      "gender": "Femme",
      "dateOfBirth": "1968-03-15",
      "age": 56,
      "primaryDiagnosis": "Fibromyalgie sévère",
      "relevantHistory": [
        "Troubles du sommeil chroniques",
        "Anxiété généralisée",
        "Douleurs diffuses résistantes aux antalgiques classiques"
      ],
      "currentConventionalTreatments": [
        {
          "drugName": "Prégabaline",
          "dosage": "150mg 2x/jour",
          "notes": "Efficacité partielle, effets secondaires : somnolence"
        },
        {
          "drugName": "Duloxétine",
          "dosage": "60mg 1x/jour",
          "notes": "Peu d'amélioration sur les douleurs, aide modérément l'humeur"
        }
      ],
      "previousAttempts": [
        "AINS (inefficaces)",
        "Tramadol (mal toléré)"
      ],
      "physicianNote": "Patiente présentant une fibromyalgie invalidante avec un retentissement majeur sur la qualité de vie. Les options thérapeutiques conventionnelles ont montré leurs limites. Patiente ouverte à explorer des approches complémentaires pour la gestion de la douleur, du sommeil et de l'anxiété."
    },
    {
      "id": "patient_002",
      "anonymousDisplayId": "Patient #CHUV-A9C27",
      "gender": "Homme",
      "dateOfBirth": "1975-07-22",
      "age": 48,
      "primaryDiagnosis": "Lombalgie chronique non spécifique",
      "relevantHistory": [
        "Travail de bureau sédentaire",
        "Plusieurs épisodes de lombalgie aiguë par le passé",
        "Raideur matinale"
      ],
      "currentConventionalTreatments": [
        {
          "drugName": "Ibuprofène",
          "dosage": "400mg PRN (au besoin)",
          "notes": "Soulagement temporaire, utilisation fréquente"
        },
        {
          "drugName": "Physiothérapie",
          "dosage": "Séances hebdomadaires",
          "notes": "Amélioration modérée de la mobilité, mais douleur persistante"
        }
      ],
      "previousAttempts": [
        "Paracétamol (peu efficace)"
      ],
      "physicianNote": "Patient souffrant de lombalgie chronique impactant ses activités quotidiennes. La physiothérapie a apporté un certain soulagement mais les douleurs persistent. Patient intéressé par des approches pour renforcer son dos et gérer la douleur autrement."
    },
    {
      "id": "patient_003",
      "anonymousDisplayId": "Patiente #CHUV-F33E1",
      "gender": "Femme",
      "dateOfBirth": "1982-11-05",
      "age": 41,
      "primaryDiagnosis": "Syndrome de l'intestin irritable (SII) à prédominance diarrhéique",
      "relevantHistory": [
        "Stress professionnel élevé",
        "Sensibilité à certains aliments",
        "Ballonnements fréquents"
      ],
      "currentConventionalTreatments": [
        {
          "drugName": "Lopéramide",
          "dosage": "Au besoin",
          "notes": "Contrôle les épisodes diarrhéiques mais ne résout pas le fond"
        },
        {
          "drugName": "Antispasmodiques",
          "dosage": "Au besoin",
          "notes": "Soulagement partiel des douleurs abdominales"
        }
      ],
      "previousAttempts": [
        "Régime FODMAP (difficile à maintenir, résultats mitigés)"
      ],
      "physicianNote": "Patiente avec un SII affectant significativement sa qualité de vie et sa vie sociale. Les traitements symptomatiques sont utiles ponctuellement. Patiente motivée pour trouver des solutions de fond, notamment pour la gestion du stress et l'équilibre digestif."
    }
  ],
  "conditions": [
    {
      "id": "cond_001",
      "name": "Fibromyalgie",
      "commonSymptoms": ["Douleurs chroniques diffuses", "Fatigue", "Troubles du sommeil", "Troubles cognitifs (fibro-fog)", "Anxiété/Dépression"],
      "conventionalTreatmentChallenges": ["Efficacité limitée des antalgiques", "Effets secondaires des médicaments", "Approche souvent symptomatique"]
    },
    {
      "id": "cond_002",
      "name": "Lombalgie chronique",
      "commonSymptoms": ["Douleur persistante bas du dos", "Raideur", "Mobilité réduite", "Irradiation possible (sciatique)"],
      "conventionalTreatmentChallenges": ["Chronicisation fréquente", "Gestion de la douleur à long terme", "Prévention des récidives"]
    },
    {
      "id": "cond_003",
      "name": "Syndrome de l'intestin irritable (SII)",
      "commonSymptoms": ["Douleurs abdominales", "Ballonnements", "Troubles du transit (diarrhée, constipation, alternance)", "Inconfort digestif"],
      "conventionalTreatmentChallenges": ["Pathologie fonctionnelle complexe", "Impact du stress et de l'alimentation", "Variabilité des symptômes"]
    },
    {
      "id": "cond_004",
      "name": "Migraine chronique",
      "commonSymptoms": ["Céphalées pulsatiles intenses", "Nausées/Vomissements", "Photophobie/Phonophobie", "Auras possibles"],
      "conventionalTreatmentChallenges": ["Gestion des crises", "Prévention des récidives", "Impact sur la qualité de vie"]
    },
    {
      "id": "cond_005",
      "name": "Insomnie chronique",
      "commonSymptoms": ["Difficulté d'endormissement", "Réveils nocturnes", "Réveil précoce", "Sommeil non réparateur"],
      "conventionalTreatmentChallenges": ["Dépendance aux somnifères", "Gestion des causes sous-jacentes (stress, anxiété)", "Hygiène du sommeil"]
    }
  ],
  "complementaryApproaches": [
    {
      "id": "ca_001",
      "name": "Acupuncture",
      "description": "Stimulation de points spécifiques du corps, souvent avec de fines aiguilles, pour rétablir l'équilibre énergétique et soulager divers maux.",
      "keywords": ["douleur", "énergie", "stress", "sommeil"],
      "relevantForConditions": ["cond_001", "cond_002", "cond_004", "cond_005"]
    },
    {
      "id": "ca_002",
      "name": "Méditation de Pleine Conscience (MBSR)",
      "description": "Technique de gestion du stress et des émotions par l'attention focalisée sur le moment présent, sans jugement.",
      "keywords": ["stress", "anxiété", "douleur chronique", "sommeil", "concentration"],
      "relevantForConditions": ["cond_001", "cond_003", "cond_004", "cond_005"]
    },
    {
      "id": "ca_003",
      "name": "Phytothérapie",
      "description": "Utilisation des plantes médicinales (extraits, tisanes, huiles essentielles) pour prévenir ou traiter des troubles de santé.",
      "keywords": ["plantes", "naturel", "sommeil", "digestion", "stress", "inflammation"],
      "relevantForConditions": ["cond_001", "cond_003", "cond_005"]
    },
    {
      "id": "ca_004",
      "name": "Ostéopathie",
      "description": "Thérapie manuelle visant à restaurer la mobilité des différentes structures du corps (articulations, muscles, fascias, viscères).",
      "keywords": ["manuel", "douleur", "mobilité", "posture", "dos"],
      "relevantForConditions": ["cond_002", "cond_004"]
    },
    {
      "id": "ca_005",
      "name": "Yoga thérapeutique",
      "description": "Application des postures, techniques de respiration et de méditation du yoga dans un but de prévention ou de soin spécifique.",
      "keywords": ["posture", "respiration", "flexibilité", "stress", "douleur"],
      "relevantForConditions": ["cond_001", "cond_002", "cond_005"]
    },
    {
      "id": "ca_006",
      "name": "Hypnose Ericksonienne",
      "description": "Technique visant à induire un état de conscience modifié pour accéder aux ressources de l'inconscient et faciliter le changement.",
      "keywords": ["inconscient", "changement", "douleur", "addiction", "stress", "phobie"],
      "relevantForConditions": ["cond_001", "cond_003", "cond_004", "cond_005"]
    },
    {
      "id": "ca_007",
      "name": "Sophrologie Caycédienne",
      "description": "Méthode psychocorporelle utilisant des techniques de relaxation dynamique, de respiration et de visualisation positive.",
      "keywords": ["relaxation", "conscience", "corps-esprit", "stress", "sommeil", "gestion émotions"],
      "relevantForConditions": ["cond_001", "cond_003", "cond_005"]
    },
    {
      "id": "ca_008",
      "name": "Micronutrition / Diététique",
      "description": "Approche basée sur l'optimisation de l'apport en micronutriments (vitamines, minéraux, oligo-éléments, acides aminés, etc.) et l'équilibre alimentaire pour maintenir ou restaurer la santé.",
      "keywords": ["alimentation", "vitamines", "minéraux", "digestion", "énergie", "inflammation"],
      "relevantForConditions": ["cond_001", "cond_003"]
    }
  ],
  "sources": [
    {
      "id": "src_001",
      "title": "Approches complémentaires dans la fibromyalgie : une revue systématique",
      "type": "Revue Systématique (Simulée)",
      "authorOrOrganization": "Revue Médicale Suisse (Simulée)",
      "year": 2022,
      "url": "https://fake-rms.ch/article/fibro-complementaire",
      "summary": "Analyse de l'efficacité de diverses approches complémentaires (acupuncture, MBSR, yoga) pour la gestion des symptômes de la fibromyalgie.",
      "relatedApproaches": ["ca_001", "ca_002", "ca_005"],
      "relatedConditions": ["cond_001"]
    },
    {
      "id": "src_002",
      "title": "Ligue Suisse contre le Rhumatisme - Section Fibromyalgie",
      "type": "Site Web Institutionnel",
      "authorOrOrganization": "Ligue Suisse contre le Rhumatisme",
      "url": "https://www.ligues-rhumatisme.ch/fibromyalgie",
      "summary": "Informations générales, conseils pour les patients, ressources et soutien pour les personnes atteintes de fibromyalgie.",
      "relatedConditions": ["cond_001"]
    },
    {
      "id": "src_003",
      "title": "Vidéo éducative SYNAPSCE : Fibromyalgie : Mieux comprendre pour mieux gérer",
      "type": "Vidéo Éducative",
      "authorOrOrganization": "Dr. A. Bernard, Rhumatologue CHUV",
      "platform": "SYNAPSCE Platform",
      "durationMinutes": 12,
      "url": "https://synapsce.ch/video/fibro-comprendre-gerer",
      "summary": "Explication claire de la fibromyalgie, des mécanismes de la douleur et des stratégies de gestion, incluant l'intérêt des approches intégratives.",
      "relatedConditions": ["cond_001"]
    },
    {
      "id": "src_004",
      "title": "Valériane et Passiflore : alliées du sommeil et de la sérénité",
      "type": "Fiche Plante",
      "authorOrOrganization": "SYNAPSCE HerbalDataBase",
      "url": "https://synapsce.ch/herbal/valeriane-passiflore",
      "summary": "Propriétés, usages traditionnels, précautions d'emploi de la valériane et de la passiflore pour les troubles du sommeil et l'anxiété légère.",
      "relatedApproaches": ["ca_003"],
      "relatedConditions": ["cond_001", "cond_005"]
    },
    {
      "id": "src_005",
      "title": "L'acupuncture dans le traitement de la lombalgie chronique : une méta-analyse",
      "type": "Méta-analyse (Simulée)",
      "authorOrOrganization": "Journal of Pain Management",
      "year": 2021,
      "url": "https://fake-jpm.com/article/acupuncture-lowbackpain",
      "summary": "Compilation des résultats de plusieurs études démontrant l'efficacité de l'acupuncture pour réduire la douleur et améliorer la fonction chez les patients avec lombalgie chronique.",
      "relatedApproaches": ["ca_001"],
      "relatedConditions": ["cond_002"]
    },
    {
      "id": "src_006",
      "title": "Bienfaits de la méditation de pleine conscience sur le syndrome de l'intestin irritable",
      "type": "Article de Recherche (Simulé)",
      "authorOrOrganization": "Gastroenterology & Mind Journal",
      "year": 2023,
      "url": "https://fake-gmj.com/article/mbsr-ibs",
      "summary": "Étude montrant une réduction significative des symptômes du SII et une amélioration de la qualité de vie chez les patients ayant suivi un programme MBSR.",
      "relatedApproaches": ["ca_002"],
      "relatedConditions": ["cond_003"]
    },
    {
      "id": "src_007",
      "title": "Vaccin : comment ça marche ?",
      "type": "Vidéo Éducative Grand Public",
      "authorOrOrganization": "SYNAPSCE Explique",
      "platform": "SYNAPSCE Platform",
      "durationMinutes": 5,
      "url": "https://synapsce.ch/video/vaccin-explication",
      "summary": "Vidéo pédagogique expliquant le mécanisme d'action des vaccins de manière simple et accessible.",
      "keywords": ["vaccination", "immunité", "prévention"]
    },
    {
      "id": "src_008",
      "title": "Addictions : que fait le cerveau ?",
      "type": "Vidéo Éducative Grand Public",
      "authorOrOrganization": "SYNAPSCE Neurosciences",
      "platform": "SYNAPSCE Platform",
      "durationMinutes": 7,
      "url": "https://synapsce.ch/video/addictions-cerveau",
      "summary": "Exploration des mécanismes cérébraux impliqués dans les addictions et les pistes pour s'en libérer.",
      "keywords": ["addiction", "cerveau", "neuroscience", "comportement"]
    },
    {
      "id": "src_009",
      "title": "Le rôle de la micronutrition dans les maladies inflammatoires chroniques",
      "type": "Article de Synthèse",
      "authorOrOrganization": "Institut Européen de Diététique et Micronutrition",
      "url": "https://fake-iedm.org/micronutrition-inflammation",
      "summary": "Revue des évidences sur l'impact des carences et des supplémentations en micronutriments sur l'inflammation chronique.",
      "relatedApproaches": ["ca_008"],
      "relatedConditions": ["cond_001", "cond_003"]
    }
  ],
  "practitioners": [
    {
      "id": "pra_001",
      "firstName": "Hélène",
      "lastName": "Durand",
      "title": "Naturopathe MTE",
      "accreditations": ["ASCA", "RME"],
      "specializations": ["Accompagnement fibromyalgie", "Gestion du stress", "Micronutrition", "Phytothérapie"],
      "locationCity": "Lausanne Centre",
      "synapsceNote": "Expérience confirmée avec des patients fibromyalgiques. Approche intégrative et à l'écoute.",
      "contactInfo": {
        "phone": "+41 21 345 67 89 (simulé)",
        "email": "helene.durand.naturo@example.com",
        "website": "https://helenedurand-naturopathie.ch (simulé)"
      },
      "supportedApproaches": ["ca_003", "ca_008"]
    },
    {
      "id": "pra_002",
      "firstName": "David",
      "lastName": "Mercier",
      "title": "Acupuncteur diplômé",
      "accreditations": ["Membre APS-MTC (Simulé)", "ASCA"],
      "specializations": ["Douleurs chroniques", "Troubles du sommeil", "Gestion de l'anxiété"],
      "locationCity": "Pully",
      "synapsceNote": "Bons retours patients pour la gestion des douleurs diffuses et l'amélioration du sommeil.",
      "contactInfo": {
        "phone": "+41 21 789 01 23 (simulé)",
        "email": "david.mercier.acu@example.com",
        "website": "https://acupuncture-mercier-pully.ch (simulé)"
      },
      "supportedApproaches": ["ca_001"]
    },
    {
      "id": "pra_003",
      "firstName": "Sophie",
      "lastName": "Richard",
      "title": "Ostéopathe D.O.",
      "accreditations": ["FSO-SVO", "RME"],
      "specializations": ["Lombalgies", "Céphalées de tension", "Troubles musculo-squelettiques", "Périnatalité"],
      "locationCity": "Genève",
      "synapsceNote": "Approche douce et globale, appréciée pour les douleurs vertébrales.",
      "contactInfo": {
        "phone": "+41 22 123 45 67 (simulé)",
        "email": "sophie.richard.osteo@example.com",
        "website": "https://osteopathie-richard-geneve.ch (simulé)"
      },
      "supportedApproaches": ["ca_004"]
    },
    {
      "id": "pra_004",
      "firstName": "Marc",
      "lastName": "Baumann",
      "title": "Instructeur MBSR Certifié",
      "accreditations": ["Association MBSR Suisse (Simulé)"],
      "specializations": ["Gestion du stress et de l'anxiété", "Douleur chronique", "Pleine conscience en entreprise"],
      "locationCity": "Lausanne",
      "synapsceNote": "Anime des cycles MBSR de 8 semaines et des ateliers découvertes. Pédagogie claire et engageante.",
      "contactInfo": {
        "phone": "+41 79 555 88 99 (simulé)",
        "email": "marc.baumann.mbsr@example.com",
        "website": "https://mbsr-lausanne-baumann.ch (simulé)"
      },
      "supportedApproaches": ["ca_002"]
    },
    {
      "id": "pra_005",
      "firstName": "Amina",
      "lastName": "El Hachimi",
      "title": "Sophrologue Caycédienne",
      "accreditations": ["Sophrologie Suisse (Simulé)", "ASCA"],
      "specializations": ["Gestion du stress et des émotions", "Préparation aux examens/événements", "Troubles du sommeil", "Confiance en soi"],
      "locationCity": "Morges",
      "synapsceNote": "Accompagnement personnalisé pour retrouver un équilibre corps-esprit.",
      "contactInfo": {
        "phone": "+41 21 801 02 03 (simulé)",
        "email": "amina.elhachimi.sophro@example.com",
        "website": "https://sophrologie-amina-morges.ch (simulé)"
      },
      "supportedApproaches": ["ca_007"]
    }
  ]
};
