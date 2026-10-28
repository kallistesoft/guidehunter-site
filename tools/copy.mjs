// The site's own words (navigation, home, hubs, guides, legal), in French and English, for all of Canada.
// Species pages and articles come from data/*.json. {app} is replaced by config.app.

export const LANGS = ['fr', 'en'];
export const LOCALE = { fr: 'fr-CA', en: 'en-CA' };

// Section paths per language; a page's path is section + slug.
export const PATHS = {
  home: { fr: '/', en: '/en/' },
  hunting: { fr: '/chasse/', en: '/en/hunting/' },
  fishing: { fr: '/peche/', en: '/en/fishing/' },
  guides: { fr: '/devenir-guide/', en: '/en/become-a-guide/' },
  tips: { fr: '/conseils/', en: '/en/tips/' },
  faq: { fr: '/faq/', en: '/en/faq/' },
  privacy: { fr: '/confidentialite/', en: '/en/privacy/' },
  deletion: { fr: '/supprimer-mon-compte/', en: '/en/delete-account/' },
  provinces: { fr: '/provinces/', en: '/en/provinces/' },
};

// Species: discipline, URL slug and name per language, in the app's order (core/model Species.kt).
export const SPECIES = [
  { id: 'black-bear', d: 'hunting', fr: ["ours-noir", "Ours noir"], en: ["black-bear", "Black bear"] },
  { id: 'moose', d: 'hunting', fr: ["orignal", "Orignal"], en: ["moose", "Moose"] },
  { id: 'white-tailed-deer', d: 'hunting', fr: ["cerf-de-virginie", "Cerf de Virginie"], en: ["white-tailed-deer", "White-tailed deer"] },
  { id: 'mule-deer', d: 'hunting', fr: ["cerf-mulet", "Cerf mulet"], en: ["mule-deer", "Mule deer"] },
  { id: 'elk', d: 'hunting', fr: ["wapiti", "Wapiti"], en: ["elk", "Elk"] },
  { id: 'caribou', d: 'hunting', fr: ["caribou", "Caribou"], en: ["caribou", "Caribou"] },
  { id: 'pronghorn', d: 'hunting', fr: ["antilope-d-amerique", "Antilope d'Am\u00e9rique"], en: ["pronghorn", "Pronghorn"] },
  { id: 'bighorn-sheep', d: 'hunting', fr: ["mouflon-d-amerique", "Mouflon d'Am\u00e9rique"], en: ["bighorn-sheep", "Bighorn sheep"] },
  { id: 'mountain-goat', d: 'hunting', fr: ["chevre-de-montagne", "Ch\u00e8vre de montagne"], en: ["mountain-goat", "Mountain goat"] },
  { id: 'wild-turkey', d: 'hunting', fr: ["dindon-sauvage", "Dindon sauvage"], en: ["wild-turkey", "Wild turkey"] },
  { id: 'waterfowl', d: 'hunting', fr: ["canards-et-oies", "Canards et oies"], en: ["ducks-and-geese", "Ducks and geese"] },
  { id: 'upland-birds', d: 'hunting', fr: ["gelinottes-et-petit-gibier", "G\u00e9linottes et petit gibier \u00e0 plumes"], en: ["grouse-and-upland-birds", "Grouse and upland birds"] },
  { id: 'sharp-tailed-grouse', d: 'hunting', fr: ["tetras-a-queue-fine", "T\u00e9tras \u00e0 queue fine"], en: ["sharp-tailed-grouse", "Sharp-tailed grouse"] },
  { id: 'pheasant', d: 'hunting', fr: ["faisan", "Faisan"], en: ["pheasant", "Pheasant"] },
  { id: 'predators', d: 'hunting', fr: ["loup-et-coyote", "Loup et coyote"], en: ["wolf-and-coyote", "Wolf and coyote"] },
  { id: 'walleye', d: 'fishing', fr: ["dore", "Dor\u00e9"], en: ["walleye", "Walleye"] },
  { id: 'yellow-perch', d: 'fishing', fr: ["perchaude", "Perchaude"], en: ["yellow-perch", "Yellow perch"] },
  { id: 'northern-pike', d: 'fishing', fr: ["grand-brochet", "Grand brochet"], en: ["northern-pike", "Northern pike"] },
  { id: 'brook-trout', d: 'fishing', fr: ["omble-de-fontaine", "Omble de fontaine"], en: ["brook-trout", "Brook trout"] },
  { id: 'rainbow-trout', d: 'fishing', fr: ["truite-arc-en-ciel", "Truite arc-en-ciel"], en: ["rainbow-trout", "Rainbow trout"] },
  { id: 'lake-trout', d: 'fishing', fr: ["touladi", "Touladi"], en: ["lake-trout", "Lake trout"] },
  { id: 'arctic-char', d: 'fishing', fr: ["omble-chevalier", "Omble chevalier"], en: ["arctic-char", "Arctic char"] },
  { id: 'atlantic-salmon', d: 'fishing', fr: ["saumon-atlantique", "Saumon atlantique"], en: ["atlantic-salmon", "Atlantic salmon"] },
  { id: 'pacific-salmon', d: 'fishing', fr: ["saumon-du-pacifique", "Saumon du Pacifique"], en: ["pacific-salmon", "Pacific salmon"] },
  { id: 'smallmouth-bass', d: 'fishing', fr: ["achigan", "Achigan \u00e0 petite bouche"], en: ["smallmouth-bass", "Smallmouth bass"] },
  { id: 'largemouth-bass', d: 'fishing', fr: ["achigan-a-grande-bouche", "Achigan \u00e0 grande bouche"], en: ["largemouth-bass", "Largemouth bass"] },
  { id: 'muskellunge', d: 'fishing', fr: ["maskinonge", "Maskinong\u00e9"], en: ["muskellunge", "Muskellunge"] },
  { id: 'sturgeon', d: 'fishing', fr: ["esturgeon", "Esturgeon"], en: ["sturgeon", "Sturgeon"] },
  { id: 'ice-fishing', d: 'fishing', fr: ["peche-blanche", "P\u00eache blanche"], en: ["ice-fishing", "Ice fishing"] },
];

export const T = {
  fr: {
    skip: 'Aller au contenu',
    nav: { hunting: 'Chasse', fishing: 'Pêche', provinces: 'Provinces', guides: 'Devenir guide', tips: 'Conseils', faq: 'FAQ' },
    menu: 'Menu',
    otherLang: 'English',
    otherLangLabel: 'Read this page in English',
    theme: 'Changer de thème (clair ou sombre)',
    getApp: "Obtenir l'app",
    soon: 'Bientôt sur Google Play',
    playBadge: 'Disponible sur Google Play',
    notify: 'Être averti du lancement',
    notifySubject: 'Prévenez-moi du lancement de {app}',
    free: 'Gratuit · Sans compte · Android (iPhone plus tard)',
    breadcrumbHome: 'Accueil',
    faqTitle: 'Questions fréquentes',
    seeAlso: 'Autres espèces',
    readTips: 'Conseils pour bien choisir',
    readMore: 'Lire',
    allFaq: 'Toutes les questions',
    findGuideFor: (name, d) => d === 'hunting' ? `Trouver un guide · ${name}` : `Trouver un guide de pêche · ${name}`,
    appCardBody: (name) => `Dans {app}, choisissez « ${name} » : la carte ne montre que les guides qui l'offrent, avec leur région et leur prix.`,
    footer: {
      tagline: 'La carte des guides de chasse et de pêche.',
      app: "L'application", legal: 'Légal',
      by: 'Une application de',
      disclaimer: "{app} met en relation chasseurs, pêcheurs et guides; il ne vend pas de séjours et ne prend pas de réservations. Chaque guide est responsable de ses permis et de son offre : vérifiez-les avant de réserver, ainsi que les règlements de chasse et de pêche de la province.",
    },
    notFound: { title: 'Page introuvable', h1: 'Cette piste ne mène nulle part', p: "La page que vous cherchez n'existe pas ou a été déplacée.", back: "Retour à l'accueil" },
  },
  en: {
    skip: 'Skip to content',
    nav: { hunting: 'Hunting', fishing: 'Fishing', provinces: 'Provinces', guides: 'Become a guide', tips: 'Tips', faq: 'FAQ' },
    menu: 'Menu',
    otherLang: 'Français',
    otherLangLabel: 'Lire cette page en français',
    theme: 'Switch theme (light or dark)',
    getApp: 'Get the app',
    soon: 'Coming soon to Google Play',
    playBadge: 'Get it on Google Play',
    notify: 'Tell me when it launches',
    notifySubject: 'Tell me when {app} launches',
    free: 'Free · No account · Android (iPhone later)',
    breadcrumbHome: 'Home',
    faqTitle: 'Frequently asked questions',
    seeAlso: 'Other species',
    readTips: 'Tips to choose well',
    readMore: 'Read',
    allFaq: 'All questions',
    findGuideFor: (name, d) => d === 'hunting' ? `Find a guide · ${name}` : `Find a fishing guide · ${name}`,
    appCardBody: (name) => `In {app}, pick "${name}": the map shows only the guides who offer it, with their region and price.`,
    footer: {
      tagline: 'The map of hunting and fishing guides.',
      app: 'The app', legal: 'Legal',
      by: 'An app by',
      disclaimer: "{app} connects hunters, anglers and guides; it doesn't sell trips or take bookings. Each guide is responsible for their licences and their offer: check them before you book, along with the province's hunting and fishing regulations.",
    },
    notFound: { title: 'Page not found', h1: 'This trail leads nowhere', p: "The page you're looking for doesn't exist or has moved.", back: 'Back to the home page' },
  },
};

// ---------------------------------------------------------------------------------------------------------------
// Home

export const HOME = {
  fr: {
    title: '{app} · Trouvez un guide de chasse ou de pêche près de vous',
    description: "{app} est la carte des guides de chasse et de pêche et des pourvoiries partout au Canada. Choisissez une espèce, comparez les offres, contactez le guide.",
    eyebrow: 'Chasse et pêche · Partout au Canada',
    h1: 'Trouvez votre guide de chasse ou de pêche',
    lead: "{app} met sur une carte les guides et les pourvoiries, près de chez vous ou là où vous rêvez d'aller. Choisissez une espèce, comparez les offres et contactez le guide directement.",
    secondary: 'Je suis guide',
    whoTitle: 'Pour ceux qui n’ont personne pour leur montrer le chemin',
    who: [
      ['La personne de la ville', "Vous voulez essayer la chasse ou la pêche, mais vous ne connaissez ni les territoires ni les gens. Un guide s'occupe du terrain, de l'équipement et de la sécurité."],
      ['Le nouveau chasseur de la famille', "Vous avez votre permis, pas encore d'expérience. Une première chasse avec un guide, c'est apprendre au bon endroit, avec quelqu'un qui connaît le gibier."],
      ["Le visiteur de l'étranger", "De France, d'Europe ou des États-Unis, vous rêvez d'un ours noir au Québec, d'un wapiti en Alberta ou d'un saumon en Colombie-Britannique. Trouvez qui offre ce séjour, où, et à quel prix, avant d'acheter votre billet."],
    ],
    howTitle: 'Comment ça marche',
    how: [
      ['Choisissez une espèce et vos dates', "Orignal, ours noir, doré, omble de fontaine… et quand vous êtes libre. La carte ne garde que les guides qui l'offrent, avec un séjour qui entre dans vos dates."],
      ['Repérez les guides sur la carte', 'Un repère par offre : orange pour la chasse, sarcelle pour la pêche. Partagez votre position et chaque guide affiche sa distance.'],
      ["Lisez l'offre et choisissez une date", "Ce qui est inclus, la durée, le prochain départ et les autres dates, la région et le prix par personne quand le guide l'indique."],
      ['Contactez le guide', "Son nom, son téléphone, son courriel et son site s'affichent après une courte publicité. La date choisie est dans votre courriel. Pas d'intermédiaire, pas de frais."],
    ],
    speciesTitle: 'Un guide pour chaque espèce',
    speciesLead: 'Chaque page explique comment se passe un séjour guidé, ce qui est habituellement inclus et quoi demander avant de réserver.',
    provincesTitle: 'Partout au Canada',
    provincesLead: 'Des pourvoiries du Québec aux guides-pourvoyeurs des Rocheuses : comment se passent la chasse et la pêche guidées dans chaque province.',
    guidesTitle: 'Vous êtes guide ou pourvoyeur?',
    guidesBody: "Mettez vos séjours sur la carte, gratuitement. Des chasseurs et des pêcheurs d'ici et d'ailleurs vous trouvent par espèce et par région, et vous contactent directement.",
    guidesCta: 'Devenir guide',
    guidesPoints: ['Inscription gratuite, autant d’offres que vous voulez', 'Chaque offre vérifiée avant d’aller sur la carte', 'Vos coordonnées montrées seulement après une publicité'],
    tipsTitle: 'Conseils avant de partir',
    faqTitle: 'Questions fréquentes',
    endTitle: 'Votre prochain séjour commence sur une carte',
    endBody: "{app} arrive bientôt sur Google Play. Laissez-nous votre courriel et nous vous écrirons une seule fois, le jour du lancement.",
    phone: {
      all: 'Tout', hunt: 'Chasse', fish: 'Pêche', count: '6 guides',
      card1: ['Wapiti à l’appel en automne', 'Alberta · Chasse', 'À partir de 2 900 $'],
      card2: ['Doré et brochet en chaloupe', 'Nord de l’Ontario · Pêche', 'À partir de 320 $'],
      contact: 'Voir une pub pour les coordonnées',
      sample: 'Exemples, pas de vrais guides',
    },
  },
  en: {
    title: '{app} · Find a hunting or fishing guide near you',
    description: '{app} is the map of hunting and fishing guides and outfitters across Canada. Pick a species, compare the offers, and contact the guide directly.',
    eyebrow: 'Hunting and fishing · Across Canada',
    h1: 'Find your hunting or fishing guide',
    lead: "{app} puts guides and outfitters on a map, close to home or wherever you dream of going. Pick a species, compare the offers and contact the guide directly.",
    secondary: "I'm a guide",
    whoTitle: 'For people with nobody to show them the way',
    who: [
      ['Someone from the city', "You want to try hunting or fishing but don't know the land or the people. A guide takes care of the ground, the gear and the safety."],
      ['The new hunter in the family', 'You have your licence, not the experience yet. A first hunt with a guide means learning in the right place, with someone who knows the game.'],
      ['The visitor from abroad', 'From France, Europe or the US, you dream of a black bear in Québec, an elk in Alberta or a salmon in British Columbia. Find who offers that trip, where, and at what price, before you buy your ticket.'],
    ],
    howTitle: 'How it works',
    how: [
      ['Pick a species and your dates', 'Moose, black bear, walleye, brook trout… and when you are free. The map keeps only the guides who offer it, with a trip that fits your dates.'],
      ['Spot the guides on the map', 'One pin per offer: orange for hunting, teal for fishing. Share your location and each guide shows how far away it is.'],
      ['Read the offer and pick a date', "What's included, how long it lasts, the next departure and the other dates, the region and the price per person when the guide gives it."],
      ['Contact the guide', 'Their name, phone, email and website show after a short ad. The date you picked is in your email. No middleman, no fees.'],
    ],
    speciesTitle: 'A guide for every species',
    speciesLead: "Each page explains how a guided trip goes, what's usually included and what to ask before you book.",
    provincesTitle: 'Across Canada',
    provincesLead: 'From Québec pourvoiries to Rocky Mountain guide-outfitters: how guided hunting and fishing work in each province.',
    guidesTitle: 'Are you a guide or an outfitter?',
    guidesBody: 'Put your trips on the map, for free. Hunters and anglers from here and abroad find you by species and region, and contact you directly.',
    guidesCta: 'Become a guide',
    guidesPoints: ['Free to list, as many offers as you like', 'Every offer reviewed before it goes on the map', 'Your contact shown only after an ad'],
    tipsTitle: 'Tips before you go',
    faqTitle: 'Frequently asked questions',
    endTitle: 'Your next trip starts on a map',
    endBody: "{app} is coming soon to Google Play. Leave us your email and we'll write once, on launch day.",
    phone: {
      all: 'All', hunt: 'Hunting', fish: 'Fishing', count: '6 guides',
      card1: ['Fall elk calling', 'Alberta · Hunting', 'From $2,900'],
      card2: ['Walleye and pike by boat', 'Northern Ontario · Fishing', 'From $320'],
      contact: 'Watch an ad to see the contact',
      sample: 'Examples, not real guides',
    },
  },
};

// ---------------------------------------------------------------------------------------------------------------
// Hubs: hunting and fishing

export const HUBS = {
  hunting: {
    fr: {
      title: 'Chasse guidée : trouvez un guide de chasse ou une pourvoirie',
      description: "Orignal, wapiti, ours noir, cerf mulet, mouflon, sauvagine : trouvez un guide de chasse ou une pourvoirie partout au Canada avec {app}.",
      h1: 'Chasse guidée : un guide pour chaque gibier',
      lead: "Un bon guide connaît le territoire, les habitudes du gibier et les règlements. Il vous place au bon endroit au bon moment, et il s'occupe de ce que vous ne savez pas encore faire.",
      body: [
        "Sur la carte de {app}, choisissez « Chasse », puis l'espèce qui vous intéresse : seuls les guides qui l'offrent restent affichés. Chaque offre dit ce qui est inclus (hébergement, repas, transport, préparation de la venaison), la région et le prix par personne quand le guide l'indique.",
        "Les permis, les saisons et les certificats exigés varient selon la province, l'espèce et votre lieu de résidence. Vérifiez toujours les règlements officiels avant de réserver; votre guide peut vous dire ce qu'il vous faut.",
      ],
      listTitle: 'Choisissez votre gibier',
    },
    en: {
      title: 'Guided hunts: find a hunting guide or outfitter',
      description: 'Moose, elk, black bear, mule deer, bighorn sheep, waterfowl: find a hunting guide or outfitter anywhere in Canada with {app}.',
      h1: 'Guided hunts: a guide for every game species',
      lead: "A good guide knows the land, the game's habits and the rules. They put you in the right place at the right time, and handle what you don't know how to do yet.",
      body: [
        "On {app}'s map, pick \"Hunting\", then the species you're after: only the guides who offer it stay on the map. Each offer says what's included (lodging, meals, transport, meat processing), the region and the price per person when the guide gives it.",
        'Licences, seasons and required certificates vary by province, species and where you live. Always check the official regulations before you book; your guide can tell you what you need.',
      ],
      listTitle: 'Choose your game',
    },
  },
  fishing: {
    fr: {
      title: 'Pêche guidée : trouvez un guide de pêche ou une pourvoirie',
      description: 'Doré, brochet, truite, saumon du Pacifique ou atlantique, omble chevalier, pêche blanche : trouvez un guide de pêche partout au Canada avec {app}.',
      h1: 'Pêche guidée : un guide pour chaque poisson',
      lead: "Le guide sait où le poisson se tient selon la saison, l'heure et la météo. Il fournit souvent l'embarcation et l'équipement, et vous fait gagner des jours de recherche.",
      body: [
        "Sur la carte de {app}, choisissez « Pêche », puis l'espèce : la carte ne garde que les guides qui l'offrent. Chaque offre précise ce qui est inclus (bateau, équipement, hébergement, repas), la région et le prix par personne quand le guide l'indique.",
        "Le permis de pêche, les saisons et les limites de prise dépendent de la province et du plan d'eau. Vérifiez les règlements officiels, et demandez à votre guide ce qui s'applique là où il vous emmène.",
      ],
      listTitle: 'Choisissez votre poisson',
    },
    en: {
      title: 'Guided fishing: find a fishing guide or outfitter',
      description: 'Walleye, pike, trout, Pacific and Atlantic salmon, Arctic char, ice fishing: find a fishing guide or outfitter anywhere in Canada with {app}.',
      h1: 'Guided fishing: a guide for every fish',
      lead: 'A guide knows where the fish hold for the season, the hour and the weather. They often supply the boat and the gear, and save you days of searching.',
      body: [
        "On {app}'s map, pick \"Fishing\", then the species: the map keeps only the guides who offer it. Each offer says what's included (boat, gear, lodging, meals), the region and the price per person when the guide gives it.",
        'Fishing licences, seasons and catch limits depend on the province and the water body. Check the official regulations, and ask your guide what applies where they take you.',
      ],
      listTitle: 'Choose your fish',
    },
  },
};

// ---------------------------------------------------------------------------------------------------------------
// Become a guide

export const GUIDES = {
  fr: {
    title: 'Guides et pourvoiries : inscrivez vos séjours gratuitement',
    description: "Guide de chasse ou de pêche, pourvoyeur : mettez vos séjours sur la carte de {app}, gratuitement. Des clients d'ici et d'ailleurs vous trouvent par espèce et par région.",
    h1: 'Guides et pourvoyeurs : mettez vos séjours sur la carte',
    lead: "{app} est gratuit pour les guides. Vos offres apparaissent sur la carte à ceux qui cherchent exactement ce que vous offrez : une espèce, une région, un prix.",
    sections: [
      { h: 'Pourquoi être sur {app}', list: [
        "Des clients qui cherchent déjà : ils filtrent par chasse ou pêche, par espèce et par les dates où ils sont libres, puis regardent la carte.",
        "Un public bilingue : l'application est en français et en anglais, pour les gens d'ici comme pour les visiteurs d'Europe et des États-Unis.",
        "Aucun frais, aucune commission : les clients vous contactent directement, et vous réservez avec eux comme d'habitude.",
        "Vos coordonnées protégées : votre nom, votre téléphone, votre courriel et votre site ne s'affichent qu'après une publicité, pas à n'importe quel robot qui parcourt la carte.",
      ] },
      { h: 'Comment vous inscrire', steps: [
        ["Ouvrez {app} et touchez « Devenir guide »", 'Connectez-vous avec votre compte Google. Il sert seulement à savoir quelles offres sont les vôtres.'],
        ['Remplissez votre profil', "Le nom de votre entreprise, votre courriel, et si vous voulez votre téléphone et votre site Web. Il est commun à toutes vos offres."],
        ['Ajoutez vos offres, en cinq étapes', 'Autant que vous voulez : une par séjour. Le formulaire vous guide une étape à la fois (détails ci-dessous).'],
        ['Nous vérifions, puis votre offre va sur la carte', "Chaque nouvelle offre et chaque modification est relue avant d'être publiée. Nous vous répondons par courriel."],
      ] },
      { h: 'Créer une offre, étape par étape', p: ["Une étape à la fois, chacune vérifiée avant la suivante. « Retour » revient à l'étape d'avant, rien ne se perd."], steps: [
        ['Le séjour', "Un titre (« Ours noir au printemps en Abitibi »), chasse ou pêche, et une description : ce qui est inclus, l'hébergement, les langues parlées. Un type par offre : si vous offrez les deux, créez une offre de chasse et une offre de pêche."],
        ['Les espèces', "Celles que vous offrez, la chasse et la pêche dans des listes séparées. Les clients vous trouvent par ces espèces."],
        ['Où', "Votre ville ou région, et un repère sur la carte là où les clients vous rejoignent : touchez la carte, utilisez votre position ou entrez les coordonnées."],
        ['Quand', "La durée d'un séjour et vos dates de départ (détails plus bas). Facultatif : sans dates, votre offre indique « Dates sur demande »."],
        ['Prix et envoi', "Un prix par personne « à partir de » si vous le voulez, puis un résumé de tout, avec « Modifier » sur chaque étape. Vous envoyez pour vérification."],
      ], shots: [
        ['fr/step1.webp', '1 · Le séjour'], ['fr/step2.webp', '2 · Les espèces'], ['fr/step3.webp', '3 · Où'],
        ['fr/step4.webp', '4 · Quand : 1 semaine, chaque samedi, chaque année'], ['fr/step5.webp', '5 · Prix et envoi : le résumé'],
      ] },
      { h: 'Vos dates : quand partent vos séjours', p: [
        "Les clients cherchent souvent par dates : ils indiquent quand ils sont libres et voient les séjours qui entrent au complet dans ces dates. Donner vos dates, c'est apparaître dans ces recherches.",
      ], list: [
        "**La durée** : demi-journée, 1 jour, 2 jours, 3 jours, 1 semaine, ou le nombre de jours que vous voulez.",
        "**Les départs** : ajoutez chaque date, ou une saison entière d'un coup avec « Ajouter chaque semaine » (par exemple chaque samedi du 1er mai au 26 juin).",
        "**Les demi-journées** : chaque date part le matin, l'après-midi ou les deux, pour une sortie de pêche au saumon comme pour une chasse au dindon à l'aube.",
        "**Ces dates seulement ou chaque année** : une saison qui revient aux mêmes dates reste sur la carte d'une année à l'autre. Des dates ponctuelles quittent la carte après la dernière, et vous voyez « Dates passées » dans vos offres.",
        "**Le client choisit sa date** : dans votre offre, il voit le prochain départ, et les autres sous « Autres dates ». Celle qu'il choisit se retrouve dans le courriel qu'il vous écrit.",
      ], shots: [['fr/sheet.webp', 'Votre offre vue par un client : le prochain départ, les autres dates, et la date choisie', 692]] },
      { h: 'Une offre qui donne envie', p: [
        "Décrivez le séjour comme vous l'expliqueriez au téléphone : ce qui est fourni, le type d'hébergement, ce que le client doit apporter et les langues que vous parlez. Les clients de l'étranger veulent savoir s'il faut prévoir le transport depuis l'aéroport.",
        "Créez une offre par séjour plutôt qu'une seule pour tout : « Ours noir au printemps » et « Orignal à l'appel en automne » ressortent chacun sous la bonne espèce.",
      ] },
      { h: 'Vous restez maître de vos offres', p: [
        "Modifiez une offre quand vous voulez : la version déjà vérifiée reste sur la carte jusqu'à ce que la modification soit approuvée. Supprimez une offre et elle quitte la carte. Vous pouvez aussi supprimer votre compte en entier, depuis l'application.",
      ] },
    ],
    faq: [
      ['Combien ça coûte?', "Rien. L'inscription et les offres sont gratuites. {app} est financé par la publicité que regardent les clients pour voir vos coordonnées."],
      ['Est-ce que {app} prend des réservations?', "Non. Le client vous contacte directement par téléphone, par courriel ou sur votre site, et vous réservez avec lui comme vous le faites déjà. La date qu'il a choisie dans votre offre est dans son courriel."],
      ['Dois-je donner mes dates?', "Non, c'est facultatif : votre offre indique alors « Dates sur demande » et reste visible. Avec vos dates, vous apparaissez aussi quand un client cherche un séjour qui entre dans ses dates libres."],
      ['Ma saison revient chaque année. Dois-je tout refaire?', "Non. Choisissez « Chaque année » à l'étape Quand : les mêmes dates reviennent d'une année à l'autre et votre offre reste sur la carte."],
      ['Faut-il un permis de guide ou de pourvoyeur?', "Vous devez détenir les permis exigés là où vous exercez. Nous relisons chaque offre, mais il vous revient d'être en règle, et les clients sont invités à le vérifier."],
      ["L'application n'est pas encore sur Google Play. Comment m'inscrire?", 'Écrivez-nous à {contact} avec le nom de votre entreprise et vos séjours : nous vous préviendrons dès le lancement, pour que vos offres soient sur la carte dès le premier jour.'],
    ],
    early: 'Avant le lancement, écrivez-nous',
    earlySubject: 'Inscrire mes séjours sur {app}',
  },
  en: {
    title: 'Guides and outfitters: list your trips for free',
    description: 'Hunting or fishing guide, outfitter: put your trips on the {app} map for free. Clients from here and abroad find you by species and region.',
    h1: 'Guides and outfitters: put your trips on the map',
    lead: '{app} is free for guides. Your offers show on the map to people looking for exactly what you offer: a species, a region, a price.',
    sections: [
      { h: 'Why be on {app}', list: [
        'Clients who are already looking: they filter by hunting or fishing, by species and by the dates they are free, then look at the map.',
        'A bilingual audience: the app is in French and English, for people from here and visitors from Europe and the US.',
        'No fees, no commission: clients contact you directly, and you book them as you always do.',
        'Your contact protected: your name, phone, email and website show only after an ad, not to any robot crawling the map.',
      ] },
      { h: 'How to sign up', steps: [
        ['Open {app} and tap "Become a guide"', 'Sign in with your Google account. It only tells us which offers are yours.'],
        ['Fill in your profile', "Your business name, your email, and if you like your phone and website. It's shared by all your offers."],
        ['Add your offers, in five steps', 'As many as you like: one per trip. The form takes you through one step at a time (details below).'],
        ['We review it, then it goes on the map', 'Every new offer and every edit is read before it is published. We answer by email.'],
      ] },
      { h: 'Creating an offer, step by step', p: ['One step at a time, each checked before the next. "Back" returns to the previous step, nothing is lost.'], steps: [
        ['The trip', 'A title ("Spring black bear in Abitibi"), hunting or fishing, and a description: what\'s included, lodging, the languages you speak. One type per offer: if you offer both, create a hunting offer and a fishing offer.'],
        ['Species', 'The ones you offer, hunting and fishing in separate lists. Clients find you by these species.'],
        ['Where', 'Your town or region, and a pin on the map where clients meet you: tap the map, use your location or type the coordinates.'],
        ['When', 'How long a trip lasts and your departure dates (details below). Optional: without dates, your offer says "Dates on request".'],
        ['Price and send', 'A "from" price per person if you like, then a summary of everything, with "Change" on each step. You send it for review.'],
      ], shots: [
        ['step1.webp', '1 · The trip'], ['step2.webp', '2 · Species'], ['step3.webp', '3 · Where'],
        ['step4.webp', '4 · When: 1 week, every Saturday, every year'], ['step5.webp', '5 · Price and send: the summary'],
      ] },
      { h: 'Your dates: when your trips leave', p: [
        'Clients often search by dates: they enter when they are free and see the trips that fit entirely within those dates. Giving your dates puts you in those searches.',
      ], list: [
        '**Duration**: half day, 1 day, 2 days, 3 days, 1 week, or any number of days.',
        '**Departures**: add each date, or a whole season at once with "Add weekly dates" (for example every Saturday from May 1 to June 26).',
        '**Half days**: each date leaves in the morning, the afternoon or both, for a salmon outing as for a dawn turkey hunt.',
        '**These dates only or every year**: a season that comes back on the same dates stays on the map year after year. One-time dates leave the map after the last one, and your offers show "Dates passed".',
        '**The client picks a date**: in your offer, they see the next departure, and the others under "Other dates". The one they pick is in the email they send you.',
      ], shots: [['sheet.webp', 'Your offer as a client sees it: the next departure, the other dates, and the date they picked', 692]] },
      { h: 'An offer people want', p: [
        'Describe the trip the way you would on the phone: what you supply, the lodging, what the client should bring and the languages you speak. Visitors from abroad want to know whether to plan transport from the airport.',
        'Create one offer per trip rather than one for everything: "Spring black bear" and "Fall moose calling" each show up under the right species.',
      ] },
      { h: 'Your offers stay yours', p: [
        'Edit an offer whenever you like: the reviewed version stays on the map until the edit is approved. Delete an offer and it leaves the map. You can also delete your whole account from the app.',
      ] },
    ],
    faq: [
      ['How much does it cost?', 'Nothing. Signing up and listing offers are free. {app} is paid for by the ads clients watch to see your contact.'],
      ['Does {app} take bookings?', 'No. The client contacts you directly by phone, email or on your website, and you book them as you already do. The date they picked in your offer is in their email.'],
      ['Do I have to give my dates?', 'No, it is optional: your offer then says "Dates on request" and stays on the map. With your dates, you also show up when a client searches for a trip that fits their free dates.'],
      ['My season comes back every year. Do I redo everything?', 'No. Choose "Every year" in the When step: the same dates come back year after year and your offer stays on the map.'],
      ['Do I need a guide or outfitter licence?', "You must hold the licences required where you operate. We review every offer, but staying compliant is up to you, and clients are told to check."],
      ["The app isn't on Google Play yet. How do I sign up?", 'Write to us at {contact} with your business name and your trips: we\'ll let you know at launch, so your offers are on the map from day one.'],
    ],
    early: 'Before launch, write to us',
    earlySubject: 'List my trips on {app}',
  },
};

// ---------------------------------------------------------------------------------------------------------------
// Tips index and FAQ page (their items come from data/articles.json)

export const TIPS = {
  fr: { title: 'Conseils pour la chasse et la pêche guidées', description: "Choisir un guide, préparer une première chasse ou un premier séjour de pêche, pourvoirie ou guide, venir de l'étranger : nos conseils.", h1: 'Conseils avant de partir', lead: "Ce qu'il faut savoir pour choisir un guide et arriver prêt, que ce soit votre première fois ou que vous veniez de loin." },
  en: { title: 'Tips for guided hunting and fishing', description: 'Choosing a guide, your first guided hunt or fishing trip, outfitter or guide, coming from abroad: our tips.', h1: 'Tips before you go', lead: "What to know to choose a guide and arrive ready, whether it's your first time or you come from far away." },
};

export const FAQ_PAGE = {
  fr: { title: 'Questions fréquentes sur {app}', description: "{app} est-il gratuit? Pourquoi une publicité? Comment les guides sont-ils vérifiés? Les réponses à vos questions.", h1: 'Questions fréquentes', lead: "Tout ce qu'il faut savoir sur {app}, pour les chasseurs, les pêcheurs et les guides." },
  en: { title: 'Frequently asked questions about {app}', description: 'Is {app} free? Why an ad? How are guides checked? Answers to your questions.', h1: 'Frequently asked questions', lead: 'Everything to know about {app}, for hunters, anglers and guides.' },
};

// ---------------------------------------------------------------------------------------------------------------
// Legal: privacy policy and account deletion (Google Play asks for both as web pages)

export const PRIVACY = {
  fr: {
    title: 'Politique de confidentialité de {app}',
    description: "Ce que l'application {app} recueille, pourquoi, avec qui c'est partagé, et comment supprimer votre compte et vos données.",
    h1: 'Politique de confidentialité',
    updated: 'Mise à jour le 28 octobre 2026',
    sections: [
      { h: 'Qui sommes-nous', p: ["{app} est une application de Kallistesoft, au Québec (Canada). Pour toute question sur vos données : {contact}."] },
      { h: 'Votre compte', p: [
        "**Facultatif.** Vous pouvez parcourir la carte et les offres sans compte : nous ne vous demandons alors ni nom ni courriel.",
        "**Compte Google.** Tout le monde peut se connecter avec Google, pas seulement les guides. Un même compte sert à chercher un guide, à être guide, ou les deux. Nous conservons votre nom, l'adresse courriel de votre compte Google et un identifiant d'utilisateur Firebase.",
      ] },
      { h: 'Demandes aux guides', p: [
        "Après une publicité vidéo que vous choisissez de regarder sur une offre, vous pouvez toucher « Je suis intéressé » si vous êtes connecté. Une demande est alors envoyée au guide de cette offre, avec votre nom, l'adresse courriel de votre compte Google, votre numéro de téléphone si vous l'avez entré dans « Mes coordonnées », l'offre et les dates de séjour choisies.",
        "Le guide voit ces renseignements pour vous contacter, et accepte ou refuse la demande. Vous voyez où en est votre demande et pouvez l'annuler. Si le guide accepte, vous voyez le nom de son entreprise et ses coordonnées (téléphone, courriel, site Web).",
        "Vos coordonnées et vos demandes sont conservées dans Google Cloud Firestore. Elles ne sont partagées qu'avec le guide de l'offre visée, et les coordonnées d'un guide ne sont montrées qu'aux personnes dont il a accepté la demande. Elles ne sont ni vendues ni utilisées pour la publicité.",
      ] },
      { h: 'Sur votre téléphone seulement', p: [
        "**Position approximative.** Si vous l'autorisez, l'application lit votre position approximative pour afficher la distance de chaque guide. Elle est utilisée sur votre téléphone seulement et ne nous est jamais envoyée.",
        "**Réglages de l'application.** Le fait d'avoir terminé l'accueil, le mode choisi (chercher un guide ou être guide) et les espèces affichées sur la carte sont gardés sur votre téléphone et ne nous sont pas envoyés.",
      ] },
      { h: 'Publicité', p: [
        "L'application affiche deux sortes de publicités : une publicité vidéo que vous choisissez de regarder sur une offre, avant d'envoyer une demande au guide, et des publicités natives dans les listes. Elles sont servies par Google AdMob, qui peut recueillir l'identifiant publicitaire de l'appareil, une position approximative et des données d'interaction avec les annonces, à des fins de publicité, de mesure et de prévention de la fraude. Là où la loi l'exige, l'application vous demande votre consentement d'abord, et « Options de confidentialité » permet de le changer.",
        "Voir comment Google utilise ces données : policies.google.com/technologies/partner-sites.",
      ] },
      { h: 'Guides : profil et offres', p: [
        "**Profil et offres.** Ce que le guide écrit (nom d'entreprise, courriel, téléphone, site Web, description, région, coordonnées du repère, prix) est conservé dans Google Cloud Firestore. Chaque nouvelle offre nous est envoyée par courriel pour vérification. Une fois publiée, l'offre est publique sur la carte; le nom de l'entreprise et les coordonnées du guide ne sont montrés qu'aux personnes dont il accepte la demande.",
        "**Demandes reçues.** Le guide voit les demandes envoyées pour ses offres, avec le nom, le courriel et, s'il a été donné, le téléphone de la personne, pour la contacter.",
      ] },
      { h: 'Nos fournisseurs', list: ['Google Firebase (authentification, base de données Firestore, envoi des courriels)', 'Google AdMob et sa plateforme de consentement (publicité)', 'Google Maps (la carte)'], p: ['Nous ne vendons aucune donnée.'] },
      { h: 'Conservation et suppression', p: [
        "Vos coordonnées et vos demandes, et pour un guide son profil et ses offres, sont conservés tant que le compte existe. Vous pouvez annuler une demande, et un guide peut supprimer une offre.",
        "Supprimer votre compte depuis l'application (Paramètres → Supprimer mon compte) supprime vos coordonnées et les demandes que vous avez envoyées, et pour un guide son profil et ses offres. Les demandes reçues pour une offre supprimée sont fermées et indiquent « Offre retirée ». Voir [Supprimer mon compte]({deletion}).",
      ] },
      { h: 'Enfants', p: ["{app} ne s'adresse pas aux enfants de moins de 13 ans."] },
      { h: 'Changements', p: ['Si cette politique change, la nouvelle version est publiée sur cette page avec sa date.'] },
    ],
  },
  en: {
    title: '{app} privacy policy',
    description: 'What the {app} app collects, why, who it is shared with, and how to delete your account and data.',
    h1: 'Privacy policy',
    updated: 'Updated October 28, 2026',
    sections: [
      { h: 'Who we are', p: ['{app} is an app by Kallistesoft, in Québec (Canada). For any question about your data: {contact}.'] },
      { h: 'Your account', p: [
        "**Optional.** You can browse the map and the offers without an account: we then don't ask for your name or email.",
        "**Google account.** Anyone can sign in with Google, not only guides. One account can be used to look for a guide, to be a guide, or both. We keep your name, your Google account's email address and a Firebase user ID.",
      ] },
      { h: 'Requests to guides', p: [
        "After a video ad you choose to watch on an offer, you can tap \"I'm interested\" if you are signed in. This sends a request to that offer's guide, with your name, your Google account's email address, your phone number if you entered it in \"My contact info\", the offer and the trip dates you chose.",
        "The guide sees these details to contact you, and accepts or declines the request. You see your request's status and can cancel it. If the guide accepts, you see their business name and contact (phone, email, website).",
        "Your contact info and your requests are stored in Google Cloud Firestore. They are shared only with the guide of that offer, and a guide's contact is shown only to people whose request they accepted. They are not sold and not used for advertising.",
      ] },
      { h: 'On your phone only', p: [
        "**Approximate location.** If you allow it, the app reads your approximate location to show how far each guide is. It is used on your phone only and is never sent to us.",
        "**App settings.** Whether you finished the welcome screens, the mode you chose (looking for a guide or being a guide) and the species shown on the map are kept on your phone and not sent to us.",
      ] },
      { h: 'Ads', p: [
        "The app shows two kinds of ads: a video ad you choose to watch on an offer, before you send the guide a request, and native ads in lists. They are served by Google AdMob, which may collect the device's advertising ID, an approximate location and ad interaction data, for advertising, measurement and fraud prevention. Where the law requires it, the app asks for your consent first, and \"Privacy options\" lets you change it.",
        'See how Google uses this data: policies.google.com/technologies/partner-sites.',
      ] },
      { h: 'Guides: profile and offers', p: [
        "**Profile and offers.** What the guide writes (business name, email, phone, website, description, region, the pin's coordinates, price) is stored in Google Cloud Firestore. Each new offer is emailed to us for review. Once published, the offer is public on the map; the guide's business name and contact are shown only to people whose request they accept.",
        "**Requests received.** The guide sees the requests sent for their offers, with the person's name, email and, if given, phone number, to contact them.",
      ] },
      { h: 'Our providers', list: ['Google Firebase (authentication, Firestore database, sending emails)', 'Google AdMob and its consent platform (ads)', 'Google Maps (the map)'], p: ["We don't sell any data."] },
      { h: 'Retention and deletion', p: [
        "Your contact info and your requests, and for a guide their profile and offers, are kept as long as the account exists. You can cancel a request, and a guide can delete an offer.",
        "Deleting your account in the app (Settings → Delete my account) deletes your contact info and the requests you sent, and for a guide their profile and offers. Requests for a deleted offer are closed and show \"Offer removed\". See [Delete my account]({deletion}).",
      ] },
      { h: 'Children', p: ['{app} is not directed at children under 13.'] },
      { h: 'Changes', p: ['If this policy changes, the new version is posted on this page with its date.'] },
    ],
  },
};

export const DELETION = {
  fr: {
    title: 'Supprimer votre compte {app}',
    description: "Comment supprimer votre compte {app} et vos données (coordonnées, demandes, et pour un guide son profil et ses offres), depuis l'application ou par courriel.",
    h1: 'Supprimer votre compte',
    updated: 'Mise à jour le 28 octobre 2026',
    sections: [
      { h: 'Sans compte, rien à supprimer', p: ["Le compte est facultatif. Si vous parcourez la carte sans vous connecter, nous ne gardons ni compte ni coordonnées à votre sujet. Pour retirer votre consentement publicitaire, touchez « Options de confidentialité » dans l'application."] },
      { h: "Depuis l'application", steps: [
        ['Ouvrez {app} et touchez « Paramètres »', 'Vous devez être connecté avec votre compte Google.'],
        ['Touchez « Supprimer mon compte »', 'Google vous demande de confirmer votre compte.'],
        ["C'est fait", "Vos coordonnées et les demandes que vous avez envoyées sont supprimées. Si vous êtes guide, vos offres quittent la carte, puis vos offres et votre profil sont supprimés. Votre compte est supprimé lui aussi. C’est définitif."],
      ] },
      { h: "Sans l'application", p: ["Écrivez à {contact} depuis l'adresse de votre compte Google, avec pour objet « Supprimer mon compte ». Nous supprimons votre compte et vos données (coordonnées, demandes, et pour un guide son profil et ses offres) dans les 30 jours et vous le confirmons par courriel."] },
      { h: 'Ce qui est supprimé', list: [
        'Vos coordonnées (« Mes coordonnées ») : nom, courriel, téléphone',
        'Les demandes que vous avez envoyées aux guides',
        'Guides : vos offres (elles quittent la carte) et votre profil : nom, courriel, téléphone, site Web',
        'Guides : les demandes reçues pour vos offres sont fermées et indiquent « Offre retirée » à la personne qui les a envoyées',
        'Votre compte : adresse courriel et identifiant Firebase',
      ] },
    ],
  },
  en: {
    title: 'Delete your {app} account',
    description: 'How to delete your {app} account and data (contact info, requests, and for a guide their profile and offers), in the app or by email.',
    h1: 'Delete your account',
    updated: 'Updated October 28, 2026',
    sections: [
      { h: 'No account, nothing to delete', p: ["An account is optional. If you browse the map without signing in, we keep no account and no contact details about you. To withdraw your ad consent, tap \"Privacy options\" in the app."] },
      { h: 'In the app', steps: [
        ['Open {app} and tap "Settings"', 'You need to be signed in with your Google account.'],
        ['Tap "Delete my account"', 'Google asks you to confirm your account.'],
        ["That's it", "Your contact info and the requests you sent are deleted. If you are a guide, your offers come off the map, then your offers and profile are deleted. Your account is deleted too. This can't be undone."],
      ] },
      { h: 'Without the app', p: ['Email {contact} from your Google account\'s address, with the subject "Delete my account". We delete your account and data (contact info, requests, and for a guide their profile and offers) within 30 days and confirm by email.'] },
      { h: 'What is deleted', list: [
        'Your contact info ("My contact info"): name, email, phone',
        'The requests you sent to guides',
        'Guides: your offers (they leave the map) and your profile: name, email, phone, website',
        'Guides: requests received for your offers are closed and show "Offer removed" to the person who sent them',
        'Your account: email address and Firebase ID',
      ] },
    ],
  },
};

// ---------------------------------------------------------------------------------------------------------------
// Provinces index (the pages come from data/provinces.json)

export const PROVINCES_PAGE = {
  fr: { title: 'Chasse et pêche guidées par province', description: "Québec, Ontario, Colombie-Britannique, Alberta, Prairies, Maritimes : trouvez un guide de chasse ou de pêche dans chaque province avec {app}.", h1: 'Guides de chasse et de pêche par province', lead: "Chaque province a ses espèces, ses territoires et ses règles. Choisissez la vôtre pour voir comment s'y passent les séjours guidés.", speciesTitle: 'Reconnue pour' },
  en: { title: 'Guided hunting and fishing by province', description: 'Québec, Ontario, British Columbia, Alberta, the Prairies, the Maritimes: find a hunting or fishing guide in every province with {app}.', h1: 'Hunting and fishing guides by province', lead: 'Each province has its own species, land and rules. Pick yours to see how guided trips work there.', speciesTitle: 'Known for' },
};
