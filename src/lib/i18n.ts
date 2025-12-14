/** 
 * i18next initialization for the "Mako" app.
 * - Provides full translations (EN/FR/SW/PT/MG + AR).
 * - Ensures all visible labels/aria/alt are translatable.
 * - Applies document direction (dir) and lang attribute on language change (RTL for Arabic).
 */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      brand: 'ETHAN',
      hero: {
        title: 'Create an ATS-friendly professional CV',
        subtitle:
          'Clean, effective templates optimized for recruiters and ATS. With or without photo, as you prefer.',
        ctaStart: 'Get started',
        ctaHow: 'How it works',
        ctaModels: 'Available models',
        imageAlt: 'Resume illustration',
      },
      steps: { one: 'Form', two: '', three: 'Mini CV' },
      how: {
        title: 'How it works',
        step1: 'Choose your language and template (with/without photo).',
        step2: 'Fill the clear, ATS-friendly form.',
        step3: 'Select a plan: Student $1, Professional $2, Advanced $3.',
        step4: 'Pay online. Your resume is generated as PDF.',
        step5: 'Download to your phone and receive it by email.',
        note: 'Payment integrations (Stripe, Mobile Money) and server email are planned.',
      },
      dates: {
        formatHint:
          'Format: YYYY-MM (e.g., 2024-06). Use "Present" for a current position.',
        exportBlocked:
          'Fix invalid dates (end ≥ start, format YYYY-MM or "Present").',
      },
      form: {
        language: 'Language',
        templatePhoto: 'Template with photo',
        templateNoPhoto: 'Template without photo',
        templateStyle: 'Template style',
        templateOptions: {
          classic: 'Classic',
          modern: 'Modern',
        },
        domain: 'Domain',
        domains: {
          general: 'General',
          it: 'IT',
          marketing: 'Marketing',
          finance: 'Finance',
          healthcare: 'Healthcare',
          engineering: 'Engineering',
          sales: 'Sales',
          research: 'Research',
        },
        suggest: 'Auto-suggest (domain)',
        aiEnhance: 'Enhance (AI)',
        fullName: 'Full name',
        headline: 'Headline',
        email: 'Email',
        phone: 'Phone',
        location: 'Location',
        linkedin: 'LinkedIn',
        summary: 'Professional summary',
        skills: 'Skills (comma separated)',
        photoUrl: 'Photo URL (optional)',
        experience: 'Experience',
        education: 'Education',
        certifications: 'Certifications',
        continue: 'Continue',
        cvType: 'CV type',
        cvTypes: {
          simple: 'Simple CV',
          structured: 'Structured CV',
          advanced: 'Advanced CV',
        },
        achievements: 'Achievements',
      },
      experienceForm: {
        role: 'Role',
        company: 'Company',
        start: 'Start',
        end: 'End',
        description: 'Description',
        add: '+ Add experience',
        remove: 'Remove',
        generate: 'Generate (AI)',
        dateOrderHint:
          'End date must be ≥ start date (format YYYY-MM).',
      },
      educationForm: {
        degree: 'Degree',
        school: 'Institution',
        start: 'Start',
        end: 'End',
        description: 'Description',
        add: '+ Add education',
        remove: 'Remove',
        dateOrderHint:
          'End date must be ≥ start date (format YYYY-MM).',
      },
      certificationForm: {
        name: 'Name',
        issuer: 'Issuer',
        date: 'Date',
        credentialId: 'Credential ID (optional)',
        credentialUrl: 'Credential URL (optional)',
        add: '+ Add certification',
        remove: 'Remove',
      },
      highlightsForm: {
        label: 'Career Highlights',
        itemLabel: 'Highlight',
        placeholder:
          'Describe a key achievement or milestone in your career.',
        add: '+ Add highlight',
        remove: 'Remove',
      },
      pricing: {
        title: 'Choose a plan',
        student: { name: 'Student', desc: 'Simple CV to start', price: '$1' },
        pro: { name: 'Professional', desc: 'Structured and neat CV', price: '$2' },
        advanced: { name: 'Advanced', desc: 'Fine layout and advanced sections', price: '$3' },
        simple: { name: 'Simple', desc: 'Simple CV to start', price: '$1' },
        payNow: 'Pay now',
        oneTime: '/ one-time',
        total: 'Total: {{amount}}',
      },
      payment: {
        successTitle: 'Payment successful',
        ready: 'Your CV is ready.',
        downloadPdf: 'Download PDF',
        emailLabel: 'Send to my email',
        sendEmail: 'Send',
        emailSent: 'Email sent.',
        redirecting: 'Redirecting to payment…',
        configureLinks:
          'Payment link not configured. Add your links in src/config/payments.ts.',
        providerLabel: 'Payment method',
        providers: {
          stripe: 'Stripe',
          flutterwave: 'Flutterwave',
          payway: 'Payway',
          mpesa: 'M-Pesa',
        },
        backendMissing:
          'Payment backend is not configured. Please wire /api/payments/{provider}/checkout.',
      },
      preview: {
        title: 'Preview',
        present: 'Present',
        idLabel: 'ID',
        photoAlt: 'Profile photo',
        summary: 'Summary',
        skills: 'Skills',
        experience: 'Experience',
        education: 'Education',
        certifications: 'Certifications',
        linkedin: 'LinkedIn',
      },
      common: {
        back: 'Back',
        yes: 'Yes',
        no: 'No',
      },
      a11y: {
        mobileActions: 'Mobile actions bar',
      },
      plans: {
        legendTitle: 'What each plan offers',
        feature: 'Feature',
        sectionsLabel: 'Visible sections',
        sectionsInfo:
          'Determines which sections are shown in the preview and PDF depending on the plan.',
        sectionsStudent: '1 Exp + 1 Edu',
        sectionsPro: 'Core sections',
        sectionsAdvanced: 'All + Achievements',
        achievementsLabel: 'Achievements',
        achievementsInfo:
          'Notable accomplishments with measurable impact (e.g., +20% conversions).',
        certificationsLabel: 'Certifications',
        certificationsInfo: 'Add your certifications with ID and verification URL.',
        styleLabel: 'Advanced style',
        styleInfo:
          'Subtle visual accents (sidebar/typographic finesse) for better emphasis.',
        pdfLabel: 'PDF export',
        pdfInfo: 'Available after a successful payment and if dates are valid.',
      },
    },
  },
  fr: {
    translation: {
      brand: 'ETHAN',
      hero: {
        title: 'Créez un CV professionnel compatible ATS',
        subtitle:
          'Des modèles clairs et efficaces, optimisés pour les recruteurs et les ATS. Avec ou sans photo, selon votre préférence.',
        ctaStart: 'Pays',
        ctaHow: 'Comment ça marche',
        ctaModels: 'Modèles proposés',
        imageAlt: 'Illustration du CV',
      },
      steps: { one: 'Formulaire', two: '', three: 'Choix du modèle' },
      how: {
        title: 'Comment ça marche',
        step1: 'Choisissez votre langue et un modèle (avec/sans photo).',
        step2: 'Remplissez le formulaire clair et compatible ATS.',
        step3: 'Sélectionnez un Modèle : Étudiant 1 $, Professionnel 2 $, Avancé 3 $.',
        step4: 'Payez en ligne. Votre CV est généré en PDF.',
        step5: 'Téléchargez-le sur votre téléphone et recevez-le par e-mail.',
        note: 'Les intégrations de paiement (Stripe, Mobile Money) et l’envoi d’e-mails serveur sont prévus.',
      },
      dates: {
        formatHint:
          'Format : AAAA-MM (ex. 2024-06). Utilisez "Present" pour un poste en cours.',
        exportBlocked:
          'Corrigez les dates invalides (fin ≥ début, format AAAA-MM ou "Present").',
      },
      form: {
        language: 'Langue',
        templatePhoto: 'Modèle avec photo',
        templateNoPhoto: 'Modèle sans photo',
        templateStyle: 'Style du modèle',
        templateOptions: {
          classic: 'Classique',
          modern: 'Moderne',
        },
        domain: 'Domaine',
        domains: {
          general: 'Général',
          it: 'Informatique',
          marketing: 'Marketing',
          finance: 'Finance',
          healthcare: 'Santé',
          engineering: 'Ingénierie',
          sales: 'Ventes',
          research: 'Recherche',
        },
        suggest: 'Suggestion automatique (domaine)',
        aiEnhance: 'Améliorer (IA)',
        fullName: 'Nom complet',
        headline: 'Intitulé',
        email: 'E-mail',
        phone: 'Téléphone',
        location: 'Localisation',
        linkedin: 'LinkedIn',
        summary: 'Résumé professionnel',
        skills: 'Compétences (séparées par des virgules)',
        photoUrl: 'URL de la photo (optionnel)',
        experience: 'Expérience',
        education: 'Éducation',
        certifications: 'Certifications',
        continue: 'Continuer',
        cvType: 'Type de CV',
        cvTypes: {
          simple: 'CV simple',
          structured: 'CV structuré',
          advanced: 'CV avancé',
        },
        achievements: 'Réalisations',
      },
      experienceForm: {
        role: 'Rôle',
        company: 'Entreprise',
        start: 'Début',
        end: 'Fin',
        description: 'Description',
        add: '+ Ajouter une expérience',
        remove: 'Supprimer',
        generate: 'Générer (IA)',
        dateOrderHint:
          'La date de fin doit être ≥ à la date de début (format AAAA-MM).',
      },
      educationForm: {
        degree: 'Diplôme',
        school: 'Établissement',
        start: 'Début',
        end: 'Fin',
        description: 'Description',
        add: '+ Ajouter une formation',
        remove: 'Supprimer',
        dateOrderHint:
          'La date de fin doit être ≥ à la date de début (format AAAA-MM).',
      },
      certificationForm: {
        name: 'Nom',
        issuer: 'Émetteur',
        date: 'Date',
        credentialId: 'ID de certificat (optionnel)',
        credentialUrl: 'URL du certificat (optionnel)',
        add: '+ Ajouter une certification',
        remove: 'Supprimer',
      },
      highlightsForm: {
        label: 'Faits marquants de carrière',
        itemLabel: 'Fait marquant',
        placeholder:
          'Décrivez une réalisation ou un jalon clé de votre parcours.',
        add: '+ Ajouter un fait marquant',
        remove: 'Supprimer',
      },
      pricing: {
        title: 'Choisissez un Modèle',
        student: { name: 'Étudiant', desc: 'CV simple pour démarrer', price: '$1' },
        pro: { name: 'Professionnel', desc: 'CV structuré et soigné', price: '$2' },
        advanced: { name: 'Avancé', desc: 'Mise en page précise et sections avancées', price: '$3' },
        simple: { name: 'Simple', desc: 'CV simple pour démarrer', price: '$1' },
        payNow: 'Payer maintenant',
        oneTime: '/ paiement unique',
        total: 'Total : {{amount}}',
      },
      payment: {
        successTitle: 'Paiement réussi',
        ready: 'Votre CV est prêt.',
        downloadPdf: 'Télécharger le PDF',
        emailLabel: 'Envoyer sur mon e-mail',
        sendEmail: 'Envoyer',
        emailSent: 'E-mail envoyé.',
        redirecting: 'Redirection vers le paiement…',
        configureLinks:
          'Lien de paiement non configuré. Ajoutez vos liens dans src/config/payments.ts.',
        providerLabel: 'Moyen de paiement',
        providers: {
          stripe: 'Stripe',
          flutterwave: 'Flutterwave',
          payway: 'Payway',
          mpesa: 'M-Pesa',
        },
        backendMissing:
          'Le backend de paiement n’est pas configuré. Veuillez connecter /api/payments/{provider}/checkout.',
      },
      preview: {
        title: 'Aperçu',
        present: 'Présent',
        idLabel: 'ID',
        photoAlt: 'Photo de profil',
        summary: 'Résumé',
        skills: 'Compétences',
        experience: 'Expérience',
        education: 'Éducation',
        certifications: 'Certifications',
        linkedin: 'LinkedIn',
      },
      common: {
        back: 'Retour',
        yes: 'Oui',
        no: 'Non',
      },
      a11y: {
        mobileActions: 'Barre d’actions mobile',
      },
      plans: {
        legendTitle: 'Ce que propose chaque Modèle',
        feature: 'Fonctionnalité',
        sectionsLabel: 'Sections affichées',
        sectionsInfo:
          "Détermine quelles rubriques sont visibles dans l'aperçu et le PDF selon le plan.",
        sectionsStudent: '1 Exp + 1 Édu',
        sectionsPro: 'Sections principales',
        sectionsAdvanced: 'Toutes + Réalisations',
        achievementsLabel: 'Réalisations',
        achievementsInfo:
          'Accomplissements notables avec impact chiffré (ex: +20% de conversions).',
        certificationsLabel: 'Certifications',
        certificationsInfo:
          'Ajoutez vos certifications avec ID et URL de vérification.',
        styleLabel: 'Style avancé',
        styleInfo:
          'Accent visuel discret (barre latérale/finesse typographique) pour une mise en valeur.',
        pdfLabel: 'Export PDF',
        pdfInfo: 'Disponible après paiement réussi et si les dates sont valides.',
      },
    },
  },
  sw: {
    translation: {
      brand: 'ETHAN',
      hero: {
        title: 'Unda CV ya kitaalamu inayokubalika na ATS',
        subtitle:
          'Mandhari rahisi na bora, yameboreshwa kwa waajiri na ATS. Ukiwa na picha au bila.',
        ctaStart: 'Anza',
        ctaHow: 'Inafanyaje kazi?',
        ctaModels: 'Mandhari zinazopatikana',
        imageAlt: 'Mchoro wa CV',
      },
      steps: { one: 'Fomu', two: '', three: 'CV ndogo' },
      how: {
        title: 'Inafanyaje kazi',
        step1: 'Chagua lugha na mandhari (ikiwa na/bila picha).',
        step2: 'Jaza fomu iliyo wazi na inayokubalika na ATS.',
        step3: 'Chagua mpango: Mwanafunzi $1, Mtaalamu $2, Pepe $3.',
        step4: 'Lipa mtandaoni. CV yako inazalishwa kama PDF.',
        step5: 'Pakua kwenye simu yako na ipokee kwa barua pepe.',
        note: 'Ujumuishaji wa malipo (Stripe, Mobile Money) na seva ya barua pepe umepangwa.',
      },
      dates: {
        formatHint:
          'Muundo: YYYY-MM (mf. 2024-06). Tumia "Present" kwa kazi inayoendelea.',
        exportBlocked:
          'Sahihisha tarehe batili (mwisho ≥ mwanzo, muundo YYYY-MM au "Present").',
      },
      form: {
        language: 'Lugha',
        templatePhoto: 'Mandhari yenye picha',
        templateNoPhoto: 'Mandhari bila picha',
        templateStyle: 'Mtindo wa templeti',
        templateOptions: { classic: 'Classic', modern: 'Modern' },
        domain: 'Sekta',
        domains: {
          general: 'Jumla',
          it: 'Teknolojia',
          marketing: 'Masoko',
          finance: 'Fedha',
          healthcare: 'Afya',
          engineering: 'Uhandisi',
          sales: 'Mauzo',
          research: 'Utafiti',
        },
        suggest: 'Pendekeza kiotomatiki (sekta)',
        aiEnhance: 'Boresha (AI)',
        fullName: 'Jina kamili',
        headline: 'Cheo',
        email: 'Barua pepe',
        phone: 'Simu',
        location: 'Mahali',
        linkedin: 'LinkedIn',
        summary: 'Muhtasari wa kitaalamu',
        skills: 'Ujuzi (tenganisha kwa koma)',
        photoUrl: 'URL ya picha (hiari)',
        experience: 'Uzoefu',
        education: 'Elimu',
        certifications: 'Vyeti',
        continue: 'Endelea',
        cvType: 'Aina ya CV',
        cvTypes: {
          simple: 'CV Rahisi',
          structured: 'CV Iliyopangwa',
          advanced: 'CV Pepe',
        },
        achievements: 'Mafanikio',
      },
      experienceForm: {
        role: 'Nafasi',
        company: 'Kampuni',
        start: 'Anza',
        end: 'Mwisho',
        description: 'Maelezo',
        add: '+ Ongeza uzoefu',
        remove: 'Ondoa',
        generate: 'Tengeneza (AI)',
        dateOrderHint:
          'Tarehe ya mwisho lazima iwe ≥ tarehe ya kuanza (muundo YYYY-MM).',
      },
      educationForm: {
        degree: 'Shahada/Diploma',
        school: 'Taasisi',
        start: 'Anza',
        end: 'Mwisho',
        description: 'Maelezo',
        add: '+ Ongeza elimu',
        remove: 'Ondoa',
        dateOrderHint:
          'Tarehe ya mwisho lazima iwe ≥ tarehe ya kuanza (muundo YYYY-MM).',
      },
      certificationForm: {
        name: 'Jina',
        issuer: 'Mtoaji',
        date: 'Tarehe',
        credentialId: 'Nambari ya cheti (hiari)',
        credentialUrl: 'Kiungo cha cheti (hiari)',
        add: '+ Ongeza cheti',
        remove: 'Ondoa',
      },
      highlightsForm: {
        label: 'Mafanikio ya Kazi',
        itemLabel: 'Mafanikio',
        placeholder:
          'Elezea mafanikio muhimu au hatua uliyofikia katika kazi yako.',
        add: '+ Ongeza mafanikio',
        remove: 'Ondoa',
      },
      pricing: {
        title: 'Chagua mpango',
        student: { name: 'Mwanafunzi', desc: 'CV rahisi kuanza', price: '$1' },
        pro: { name: 'Mtaalamu', desc: 'CV iliyo pangwa vizuri', price: '$2' },
        advanced: { name: 'Pepe', desc: 'Mpangilio ulioboreshwa na sehemu za juu', price: '$3' },
        simple: { name: 'Rahisi', desc: 'CV rahisi kuanza', price: '$1' },
        payNow: 'Lipa sasa',
        oneTime: '/ mara moja',
        total: 'Jumla: {{amount}}',
      },
      payment: {
        successTitle: 'Malipo yamefanikiwa',
        ready: 'CV yako iko tayari.',
        downloadPdf: 'Pakua PDF',
        emailLabel: 'Tuma kwa barua pepe yangu',
        sendEmail: 'Tuma',
        emailSent: 'Barua pepe imetumwa.',
        redirecting: 'Inaelekezwa kwa malipo…',
        configureLinks:
          'Kiungo cha malipo hakijawekwa. Ongeza viungo katika src/config/payments.ts.',
        providerLabel: 'Njia ya malipo',
        providers: {
          stripe: 'Stripe',
          flutterwave: 'Flutterwave',
          payway: 'Payway',
          mpesa: 'M-Pesa',
        },
        backendMissing:
          'Seva ya malipo haijasanidiwa. Tafadhali ongeza /api/payments/{provider}/checkout.',
      },
      preview: {
        title: 'Onyesho',
        present: 'Sasa',
        idLabel: 'ID',
        photoAlt: 'Picha ya wasifu',
        summary: 'Muhtasari',
        skills: 'Ujuzi',
        experience: 'Uzoefu',
        education: 'Elimu',
        certifications: 'Vyeti',
        linkedin: 'LinkedIn',
      },
      common: {
        back: 'Nyuma',
        yes: 'Ndiyo',
        no: 'Hapana',
      },
      a11y: {
        mobileActions: 'Upau wa vitendo wa simu',
      },
      plans: {
        legendTitle: 'Kila mpango unachotoa',
        feature: 'Kipengele',
        sectionsLabel: 'Sehemu zinazoonekana',
        sectionsInfo:
          'Inaamua ni sehemu zipi zinaonekana kwenye onyesho la awali na PDF kulingana na mpango.',
        sectionsStudent: '1 Uzoefu + 1 Elimu',
        sectionsPro: 'Sehemu kuu',
        sectionsAdvanced: 'Zote + Mafanikio',
        achievementsLabel: 'Mafanikio',
        achievementsInfo:
          'Mafanikio yenye athari inayopimika (mf. +20% mabadiliko).',
        certificationsLabel: 'Vyeti',
        certificationsInfo:
          'Ongeza vyeti vyako pamoja na ID na URL ya uthibitisho.',
        styleLabel: 'Mtindo wa hali ya juu',
        styleInfo:
          'Miguso midogo ya urembo (upau wa pembeni/ubora wa herufi) kwa uwasilishaji bora.',
        pdfLabel: 'PDF',
        pdfInfo: 'Inapatikana baada ya malipo kufanikiwa na tarehe kuwa sahihi.',
      },
    },
  },
  pt: {
    translation: {
      brand: 'ETHAN',
      hero: {
        title: 'Crie um CV profissional compatível com ATS',
        subtitle:
          'Modelos limpos e eficazes, otimizados para recrutadores e ATS. Com ou sem foto.',
        ctaStart: 'Começar',
        ctaHow: 'Como funciona?',
        ctaModels: 'Modelos disponíveis',
        imageAlt: 'Ilustração do currículo',
      },
      steps: { one: 'Formulário', two: '', three: 'Mini CV' },
      how: {
        title: 'Como funciona',
        step1: 'Escolha o idioma e o modelo (com/sem foto).',
        step2: 'Preencha o formulário claro e compatível com ATS.',
        step3: 'Selecione um plano: Estudante $1, Profissional $2, Avançado $3.',
        step4: 'Pague online. Seu CV é gerado em PDF.',
        step5: 'Baixe no seu telefone e receba por email.',
        note:
          'Integrações de pagamento (Stripe, Mobile Money) e envio de email no servidor estão previstas.',
      },
      dates: {
        formatHint:
          'Formato: YYYY-MM (ex.: 2024-06). Use "Present" para posição atual.',
        exportBlocked:
          'Corrija datas inválidas (fim ≥ início, formato YYYY-MM ou "Present").',
      },
      form: {
        language: 'Idioma',
        templatePhoto: 'Modelo com foto',
        templateNoPhoto: 'Modelo sem foto',
        templateStyle: 'Estilo do modelo',
        templateOptions: { classic: 'Classic', modern: 'Modern' },
        domain: 'Área',
        domains: {
          general: 'Geral',
          it: 'TI',
          marketing: 'Marketing',
          finance: 'Finanças',
          healthcare: 'Saúde',
          engineering: 'Engenharia',
          sales: 'Vendas',
          research: 'Pesquisa',
        },
        suggest: 'Sugestão automática (área)',
        aiEnhance: 'Melhorar (IA)',
        fullName: 'Nome completo',
        headline: 'Cargo',
        email: 'Email',
        phone: 'Telefone',
        location: 'Localização',
        linkedin: 'LinkedIn',
        summary: 'Resumo profissional',
        skills: 'Competências (separadas por vírgulas)',
        photoUrl: 'URL da foto (opcional)',
        experience: 'Experiência',
        education: 'Educação',
        certifications: 'Certificações',
        continue: 'Continuar',
        cvType: 'Tipo de CV',
        cvTypes: {
          simple: 'CV Simples',
          structured: 'CV Estruturado',
          advanced: 'CV Avançado',
        },
        achievements: 'Realizações',
      },
      experienceForm: {
        role: 'Função',
        company: 'Empresa',
        start: 'Início',
        end: 'Fim',
        description: 'Descrição',
        add: '+ Adicionar experiência',
        remove: 'Remover',
        generate: 'Gerar (IA)',
        dateOrderHint:
          'Data de término deve ser ≥ à data de início (formato YYYY-MM).',
      },
      educationForm: {
        degree: 'Diploma/Curso',
        school: 'Instituição',
        start: 'Início',
        end: 'Fim',
        description: 'Descrição',
        add: '+ Adicionar formação',
        remove: 'Remover',
        dateOrderHint:
          'Data de término deve ser ≥ à data de início (formato YYYY-MM).',
      },
      certificationForm: {
        name: 'Nome',
        issuer: 'Organização',
        date: 'Data',
        credentialId: 'ID do certificado (opcional)',
        credentialUrl: 'URL do certificado (opcional)',
        add: '+ Adicionar certificação',
        remove: 'Remover',
      },
      highlightsForm: {
        label: 'Destaques da Carreira',
        itemLabel: 'Destaque',
        placeholder:
          'Descreva uma conquista ou marco importante na sua carreira.',
        add: '+ Adicionar destaque',
        remove: 'Remover',
      },
      pricing: {
        title: 'Escolha um plano',
        student: { name: 'Estudante', desc: 'CV simples para começar', price: '$1' },
        pro: { name: 'Profissional', desc: 'CV estruturado e limpo', price: '$2' },
        advanced: { name: 'Avançado', desc: 'Layout preciso e seções avançadas', price: '$3' },
        simple: { name: 'Simples', desc: 'CV simples para começar', price: '$1' },
        payNow: 'Pagar agora',
        oneTime: '/ pagamento único',
        total: 'Total: {{amount}}',
      },
      payment: {
        successTitle: 'Pagamento bem-sucedido',
        ready: 'Seu CV está pronto.',
        downloadPdf: 'Baixar PDF',
        emailLabel: 'Enviar para meu email',
        sendEmail: 'Enviar',
        emailSent: 'Email enviado.',
        redirecting: 'Redirecionando para o pagamento…',
        configureLinks:
          'Link de pagamento não configurado. Adicione seus links em src/config/payments.ts.',
        providerLabel: 'Método de pagamento',
        providers: {
          stripe: 'Stripe',
          flutterwave: 'Flutterwave',
          payway: 'Payway',
          mpesa: 'M-Pesa',
        },
        backendMissing:
          'Backend de pagamento não configurado. Conecte /api/payments/{provider}/checkout.',
      },
      preview: {
        title: 'Pré-visualização',
        present: 'Atual',
        idLabel: 'ID',
        photoAlt: 'Foto de perfil',
        summary: 'Resumo',
        skills: 'Competências',
        experience: 'Experiência',
        education: 'Educação',
        certifications: 'Certificações',
        linkedin: 'LinkedIn',
      },
      common: {
        back: 'Voltar',
        yes: 'Sim',
        no: 'Não',
      },
      a11y: {
        mobileActions: 'Barra de ações móvel',
      },
      plans: {
        legendTitle: 'O que cada plano oferece',
        feature: 'Funcionalidade',
        sectionsLabel: 'Seções visíveis',
        sectionsInfo:
          'Define quais seções aparecem na pré-visualização e no PDF conforme o plano.',
        sectionsStudent: '1 Exp + 1 Edu',
        sectionsPro: 'Seções principais',
        sectionsAdvanced: 'Todas + Realizações',
        achievementsLabel: 'Realizações',
        achievementsInfo:
          'Conquistas notáveis com impacto mensurável (ex.: +20% em conversões).',
        certificationsLabel: 'Certificações',
        certificationsInfo:
          'Adicione suas certificações com ID e URL de verificação.',
        styleLabel: 'Estilo avançado',
        styleInfo:
          'Realce visual discreto (barra lateral/refino tipográfico) para melhor destaque.',
        pdfLabel: 'Exportar PDF',
        pdfInfo:
          'Disponível após pagamento bem-sucedido e com datas válidas.',
      },
    },
  },
  mg: {
    translation: {
      brand: 'ETHAN',
      hero: {
        title: 'Mamolavola CV matihanina mifanaraka amin’ny ATS',
        subtitle:
          'Endrika tsotra sy mahomby, nohatsaraina ho an’ny mpampiasa sy ATS. Miaraka na tsy misy sary.',
        ctaStart: 'Manomboka',
        ctaHow: 'Ahoana no fiasany?',
        ctaModels: 'Modely misy',
        imageAlt: 'Sary famantarana CV',
      },
      steps: { one: 'Fôrma', two: '', three: 'CV kely' },
      how: {
        title: 'Ahoana no fiasany',
        step1: 'Safidio ny fiteny sy ny modely (misy/tsisy sary).',
        step2: 'Fenoy ny Fôrma mazava mifanaraka amin’ny ATS.',
        step3: 'Misafidiana drafitra: Mpianatra $1, Matihanina $2, Mandroso $3.',
        step4: 'Aloavy an-tserasera. Vokarina ho PDF ny CV-nao.',
        step5: 'Ampidino amin’ny findainao ary raiso amin’ny mailaka.',
        note:
          'Kasaina ny fampifandraisana fandoavam-bola (Stripe, Mobile Money) sy ny fanaterana mailaka amin’ny seva.',
      },
      dates: {
        formatHint:
          'Endrika: YYYY-MM (oh: 2024-06). Ampiasao "Present" ho an\'ny asa mbola mitohy.',
        exportBlocked:
          'Ahitsio ny daty tsy mety (farany ≥ fanombohana, endrika YYYY-MM na "Present").',
      },
      form: {
        language: 'Fiteny',
        templatePhoto: 'Modely misy sary',
        templateNoPhoto: 'Modely tsy misy sary',
        templateStyle: 'Endriky ny modely',
        templateOptions: { classic: 'Classic', modern: 'Modern' },
        domain: 'Sehatra',
        domains: {
          general: 'Ankapobeny',
          it: 'IT',
          marketing: 'Varotra',
          finance: 'Vola',
          healthcare: 'Fahasalamana',
          engineering: 'Injeniera',
          sales: 'Varotra',
          research: 'Fikarohana',
        },
        suggest: 'Soso-kevitra ho azy (sehatra)',
        aiEnhance: 'Hatsara (IA)',
        fullName: 'Anarana feno',
        headline: 'Lohateny',
        email: 'Mailaka',
        phone: 'Finday',
        location: 'Toerana',
        linkedin: 'LinkedIn',
        summary: 'Famintinana matihanina',
        skills: 'Fahaiza-manao (zaraina amin’ny comma)',
        photoUrl: 'URL sary (tsy voatery)',
        experience: 'Traikefa',
        education: 'Fianarana',
        certifications: 'Taratasy fanamarinana',
        continue: 'Tohizo',
        cvType: 'Karazana CV',
        cvTypes: {
          simple: 'CV Tsotra',
          structured: 'CV Voalamina',
          advanced: 'CV Mandroso',
        },
        achievements: 'Zava-bita',
      },
      experienceForm: {
        role: 'Anjara asa',
        company: 'Orinasa',
        start: 'Fanombohana',
        end: "Faran'ny fotoana",
        description: 'Famaritana',
        add: '+ Ampio traikefa',
        remove: 'Esory',
        generate: 'Mamokatra (IA)',
        dateOrderHint:
          "Ny daty farany dia tsy maintsy ≥ ny daty fanombohana (endrika YYYY-MM).",
      },
      educationForm: {
        degree: 'Diplaoma/Fiofanana',
        school: 'Sekoly/Oniversite',
        start: 'Fanombohana',
        end: "Faran'ny fotoana",
        description: 'Famaritana',
        add: '+ Ampio fianarana',
        remove: 'Esory',
        dateOrderHint:
          "Ny daty farany dia tsy maintsy ≥ ny daty fanombohana (endrika YYYY-MM).",
      },
      certificationForm: {
        name: 'Anarana',
        issuer: 'Mpamoaka',
        date: 'Daty',
        credentialId: 'ID taratasy (tsy voatery)',
        credentialUrl: 'URL taratasy (tsy voatery)',
        add: '+ Ampio taratasy',
        remove: 'Esory',
      },
      highlightsForm: {
        label: 'Zava-bita lehibe amin’ny asa',
        itemLabel: 'Zava-bita',
        placeholder:
          'Farito zava-bita na dingana manan-danja teo amin’ny asanao.',
        add: '+ Ampio zava-bita',
        remove: 'Esory',
      },
      pricing: {
        title: 'Misafidiana drafitra',
        student: { name: 'Mpianatra', desc: 'CV tsotra hanombohana', price: '$1' },
        pro: { name: 'Matihanina', desc: 'CV voalamina sy madio', price: '$2' },
        advanced: { name: 'Mandroso', desc: 'Fandaminana tsara sy fizarana mandroso', price: '$3' },
        simple: { name: 'Tsotra', desc: 'CV tsotra hanombohana', price: '$1' },
        payNow: 'Aloavy ankehitriny',
        oneTime: '/ indray mandeha',
        total: 'Total: {{amount}}',
      },
      payment: {
        successTitle: 'Vita soa aman-tsara ny fandoavam-bola',
        ready: 'Vonona ny CV-nao.',
        downloadPdf: 'Ampidino PDF',
        emailLabel: 'Alefaso amin’ny mailako',
        sendEmail: 'Alefa',
        emailSent: 'Nalefa ny mailaka.',
        redirecting: 'Afindra any amin’ny fandoavam-bola…',
        configureLinks:
          'Tsy voaefy ny rohy fandoavam-bola. Ampio ao amin’ny src/config/payments.ts.',
        providerLabel: 'Fomba fandoavam-bola',
        providers: { stripe: 'Stripe', flutterwave: 'Flutterwave', payway: 'Payway', mpesa: 'M-Pesa' },
        backendMissing:
          'Tsy voaefy ny backend fandoavam-bola. Ampifandraiso /api/payments/{provider}/checkout.',
      },
      preview: {
        title: 'Topi-maso',
        present: 'Ankehitriny',
        idLabel: 'ID',
        photoAlt: 'Sary mombamomba',
        summary: 'Famintinana',
        skills: 'Fahaiza-manao',
        experience: 'Traikefa',
        education: 'Fianarana',
        certifications: 'Taratasy fanamarinana',
        linkedin: 'LinkedIn',
      },
      common: {
        back: 'Miverina',
        yes: 'Eny',
        no: 'Tsia',
      },
      a11y: {
        mobileActions: 'Lisitry ny asa amin’ny finday',
      },
      plans: {
        legendTitle: 'Izay atolotry ny drafitra tsirairay',
        feature: 'Fampiasa',
        sectionsLabel: 'Fizarana aseho',
        sectionsInfo:
          'Mamaritra ireo fizarana aseho ao amin’ny topi-maso sy PDF arakaraka ny drafitra.',
        sectionsStudent: '1 Traikefa + 1 Fianarana',
        sectionsPro: 'Fizarana fototra',
        sectionsAdvanced: 'Rehetra + Zava-bita',
        achievementsLabel: 'Zava-bita',
        achievementsInfo:
          'Zava-bita misy fiantraikany azo refesina (oh: +20% fiovam-po).',
        certificationsLabel: 'Taratasy fanamarinana',
        certificationsInfo:
          'Ampio ny taratasy fanamarinanao miaraka amin’ny ID sy rohy fanamarinana.',
        styleLabel: 'Endrika mandroso',
        styleInfo:
          'Tsipika kanto malefaka (sisin-kilahatra/fomban-tsoratra voadio) hanasongadinana.',
        pdfLabel: 'Fanondranana PDF',
        pdfInfo:
          'Misy aorian’ny fandoavam-bola mahomby sy raha ara-dalàna ny daty.',
      },
    },
  },
  ar: {
    translation: {
      brand: 'ETHAN',
      hero: {
        title: 'أنشئ سيرة ذاتية احترافية متوافقة مع أنظمة التتبع',
        subtitle:
          'قوالب نظيفة وفعّالة مُحسّنة للمُوظِّفين وأنظمة التتبع. مع صورة أو بدون، كما تفضّل.',
        ctaStart: 'ابدأ الآن',
        ctaHow: 'كيف يعمل؟',
        ctaModels: 'النماذج المتاحة',
        imageAlt: 'رسم توضيحي للسيرة الذاتية',
      },
      steps: { one: 'النموذج', two: '', three: 'سيرة مصغّرة' },
      how: {
        title: 'كيف يعمل',
        step1: 'اختر اللغة والقالب (مع/بدون صورة).',
        step2: 'املأ النموذج الواضح والمتوافق مع أنظمة التتبع.',
        step3: 'اختر الخطة: طالب 1$، محترف 2$، متقدم 3$.',
        step4: 'ادفع عبر الإنترنت. يتم إنشاء سيرتك الذاتية بصيغة PDF.',
        step5: 'قم بتنزيلها على هاتفك وتلقَّها عبر البريد الإلكتروني.',
        note: 'تكاملات الدفع (Stripe, Mobile Money) وإرسال البريد عبر الخادم قيد التخطيط.',
      },
      dates: {
        formatHint:
          'التنسيق: YYYY-MM (مثال: 2024-06). استخدم "Present" للوظيفة الحالية.',
        exportBlocked:
          'يرجى تصحيح التواريخ غير الصحيحة (يجب أن تكون النهاية ≥ البداية، بصيغة YYYY-MM أو "Present").',
      },
      form: {
        language: 'اللغة',
        templatePhoto: 'قالب مع صورة',
        templateNoPhoto: 'قالب بدون صورة',
        templateStyle: 'نمط القالب',
        templateOptions: { classic: 'كلاسيكي', modern: 'حديث' },
        domain: 'المجال',
        domains: {
          general: 'عام',
          it: 'تقنية المعلومات',
          marketing: 'التسويق',
          finance: 'المالية',
          healthcare: 'الصحة',
          engineering: 'الهندسة',
          sales: 'المبيعات',
          research: 'البحث',
        },
        suggest: 'اقتراح تلقائي (حسب المجال)',
        aiEnhance: 'تحسين (ذكاء اصطناعي)',
        fullName: 'الاسم الكامل',
        headline: 'المسمى الوظيفي',
        email: 'البريد الإلكتروني',
        phone: 'الهاتف',
        location: 'الموقع',
        linkedin: 'لينكدإن',
        summary: 'الملخص المهني',
        skills: 'المهارات (مفصولة بفواصل)',
        photoUrl: 'رابط الصورة (اختياري)',
        experience: 'الخبرات',
        education: 'التعليم',
        certifications: 'الشهادات',
        continue: 'متابعة',
        cvType: 'نوع السيرة الذاتية',
        cvTypes: {
          simple: 'سيرة بسيطة',
          structured: 'سيرة منظمة',
          advanced: 'سيرة متقدمة',
        },
        achievements: 'الإنجازات',
      },
      experienceForm: {
        role: 'المنصب',
        company: 'الشركة',
        start: 'البداية',
        end: 'النهاية',
        description: 'الوصف',
        add: '+ أضف خبرة',
        remove: 'حذف',
        generate: 'توليد (ذكاء اصطناعي)',
        dateOrderHint:
          'يجب أن يكون تاريخ النهاية ≥ تاريخ البداية (بصيغة YYYY-MM).',
      },
      educationForm: {
        degree: 'الدرجة/المؤهل',
        school: 'المؤسسة',
        start: 'البداية',
        end: 'النهاية',
        description: 'الوصف',
        add: '+ أضف تعليمًا',
        remove: 'حذف',
        dateOrderHint:
          'يجب أن يكون تاريخ النهاية ≥ تاريخ البداية (بصيغة YYYY-MM).',
      },
      certificationForm: {
        name: 'الاسم',
        issuer: 'الجهة المانحة',
        date: 'التاريخ',
        credentialId: 'معرّف الشهادة (اختياري)',
        credentialUrl: 'رابط الشهادة (اختياري)',
        add: '+ أضف شهادة',
        remove: 'حذف',
      },
      highlightsForm: {
        label: 'أبرز محطات المسيرة',
        itemLabel: 'إنجاز',
        placeholder:
          'صف إنجازًا أو محطة مهمة في مسيرتك المهنية.',
        add: '+ أضف إنجازًا',
        remove: 'حذف',
      },
      pricing: {
        title: 'اختر خطة',
        student: { name: 'طالب', desc: 'سيرة بسيطة للبدء', price: '$1' },
        pro: { name: 'محترف', desc: 'سيرة منظمة وأنيقة', price: '$2' },
        advanced: { name: 'متقدم', desc: 'تنسيق دقيق وأقسام متقدمة', price: '$3' },
        simple: { name: 'بسيط', desc: 'سيرة بسيطة للبدء', price: '$1' },
        payNow: 'ادفع الآن',
        oneTime: '/ لمرة واحدة',
        total: 'الإجمالي: {{amount}}',
      },
      payment: {
        successTitle: 'تم الدفع بنجاح',
        ready: 'سيرتك الذاتية جاهزة.',
        downloadPdf: 'تحميل PDF',
        emailLabel: 'أرسل إلى بريدي الإلكتروني',
        sendEmail: 'إرسال',
        emailSent: 'تم إرسال البريد.',
        redirecting: 'جارٍ التحويل إلى الدفع…',
        configureLinks:
          'رابط الدفع غير مهيأ. أضف الروابط في src/config/payments.ts.',
        providerLabel: 'طريقة الدفع',
        providers: {
          stripe: 'Stripe',
          flutterwave: 'Flutterwave',
          payway: 'Payway',
          mpesa: 'M-Pesa',
        },
        backendMissing:
          'واجهة الدفع الخلفية غير مهيأة. يرجى ربط /api/payments/{provider}/checkout.',
      },
      preview: {
        title: 'المعاينة',
        present: 'حالي',
        idLabel: 'المعرّف',
        photoAlt: 'صورة الحساب',
        summary: 'الملخص',
        skills: 'المهارات',
        experience: 'الخبرات',
        education: 'التعليم',
        certifications: 'الشهادات',
        linkedin: 'لينكدإن',
      },
      common: {
        back: 'رجوع',
        yes: 'نعم',
        no: 'لا',
      },
      a11y: {
        mobileActions: 'شريط الإجراءات على الجوال',
      },
      plans: {
        legendTitle: 'ما الذي تقدمه كل خطة',
        feature: 'الميزة',
        sectionsLabel: 'الأقسام المعروضة',
        sectionsInfo:
          'يحدد الأقسام التي تظهر في المعاينة وملف PDF بحسب الخطة.',
        sectionsStudent: '1 خبرة + 1 تعليم',
        sectionsPro: 'الأقسام الأساسية',
        sectionsAdvanced: 'الكل + الإنجازات',
        achievementsLabel: 'الإنجازات',
        achievementsInfo:
          'إنجازات ملحوظة ذات أثر قابل للقياس (مثل: ‎+20%‎ في التحويلات).',
        certificationsLabel: 'الشهادات',
        certificationsInfo:
          'أضف شهاداتك مع المعرّف ورابط التحقق.',
        styleLabel: 'نمط متقدم',
        styleInfo:
          'لمسات بصرية خفيفة (شريط جانبي/تحسينات طباعية) لإبراز أفضل.',
        pdfLabel: 'تصدير PDF',
        pdfInfo:
          'متاح بعد إتمام الدفع بنجاح وإذا كانت التواريخ صحيحة.',
      },
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

/**
 * Applies direction (LTR/RTL) and language attribute on the <html> element
 * whenever the active language changes.
 */
const RTL_LANGS = new Set(['ar'])

function applyDirection(lang: string) {
  const isRtl = RTL_LANGS.has(lang)
  const dir = isRtl ? 'rtl' : 'ltr'
  if (typeof document !== 'undefined') {
    const el = document.documentElement
    if (el) {
      el.setAttribute('dir', dir)
      el.setAttribute('lang', lang)
    }
  }
}

// Apply on initial load and on subsequent changes
applyDirection(i18n.language)
i18n.on('languageChanged', (lng) => applyDirection(lng))

export default i18n
