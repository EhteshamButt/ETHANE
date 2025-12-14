/**
 * i18nMorePatch.ts
 * Adds/overrides translation keys across supported languages without touching the core bundle.
 * - Keys covered:
 *   - pricing.oneTime
 *   - hero.ctaModels, hero.imageAlt
 *   - share.whatsappDefault
 *   - a11y.mobileActions
 *   - common.yes, common.no
 *   - form.country, form.selectCountry, form.skillsHint
 *   - form.toggle.toWithPhoto, form.toggle.toWithoutPhoto
 *   - form.placeholders.*
 *   - achievementsForm.*
 *   - highlightsForm.* (NEW)
 *   - preview.* (NEW) including otherAchievements to align both previews.
 *
 * Idempotent: addResourceBundle with deep merge and overwrite.
 */

import i18next from 'i18next'

/** Supported languages in this app */
type Lang = 'en' | 'fr' | 'sw' | 'pt' | 'mg' | 'ar'

/** Minimal patches used by UI components to avoid fallbacks */
const bundles: Record<Lang, object> = {
  en: {
    pricing: {
      oneTime: '/ one-time',
    },
    hero: {
      ctaModels: 'Available models',
      imageAlt: 'Resume preview',
    },
    share: {
      whatsappDefault: 'Hello! Create a pro resume with ETHAN: {{url}}',
    },
    a11y: {
      mobileActions: 'Mobile actions',
    },
    common: {
      yes: 'Yes',
      no: 'No',
    },
    form: {
      country: 'Country',
      selectCountry: 'Select a country',
      skillsHint: 'Separate skills by commas.',
      toggle: {
        toWithPhoto: '→ With photo',
        toWithoutPhoto: '→ Without photo',
      },
      placeholders: {
        fullName: 'e.g., Aïcha K.',
        headline: 'e.g., Frontend Developer',
        email: 'you@example.com',
        phone: '+243 99 999 9999',
        location: 'Kinshasa, DRC',
        photoUrl: 'https://...',
        summary: 'Introduce yourself in 2–3 sentences (profile, strengths, impact).',
        skills: 'e.g., React, TypeScript, UI Design',
      },
    },
    achievementsForm: {
      label: 'Achievements',
      title: 'Achievement title',
      description: 'Description',
      add: '+ Add achievement',
      remove: 'Remove',
    },
    /** New: Career Highlights */
    highlightsForm: {
      label: 'Career Highlights',
      itemLabel: 'Highlight',
      placeholder: 'Describe a key achievement or milestone in your career.',
      add: '+ Add highlight',
      remove: 'Remove',
    },
    /** New: Preview section titles (ensure parity across previews) */
    preview: {
      summary: 'Summary',
      skills: 'Skills',
      experience: 'Experience',
      education: 'Education',
      certifications: 'Certifications',
      otherAchievements: 'Other achievements',
      present: 'Present',
      idLabel: 'ID',
      photoAlt: 'Profile photo',
    },
  },
  fr: {
    pricing: {
      oneTime: '/ paiement unique',
    },
    hero: {
      ctaModels: 'Modèles proposés',
      imageAlt: 'Aperçu du CV',
    },
    share: {
      whatsappDefault: 'Bonjour ! Crée ton CV pro avec ETHAN : {{url}}',
    },
    a11y: {
      mobileActions: 'Actions mobiles',
    },
    common: {
      yes: 'Oui',
      no: 'Non',
    },
    form: {
      country: 'Pays',
      selectCountry: 'Sélectionner un pays',
      skillsHint: 'Séparez les compétences par des virgules.',
      toggle: {
        toWithPhoto: '→ Avec photo',
        toWithoutPhoto: '→ Sans photo',
      },
      placeholders: {
        fullName: 'Ex: Aïcha K.',
        headline: 'Ex: Développeur Frontend',
        email: 'vous@exemple.com',
        phone: '+243 99 999 9999',
        location: 'Kinshasa, RDC',
        photoUrl: 'https://...',
        summary: 'Présentez-vous en 2–3 phrases (parcours, points forts, impact).',
        skills: 'Ex: React, TypeScript, UI Design',
      },
    },
    achievementsForm: {
      label: 'Réalisations',
      title: 'Titre de la réalisation',
      description: 'Description',
      add: '+ Ajouter une réalisation',
      remove: 'Supprimer',
    },
    /** New: Career Highlights (avoid “Faits marquants de carrière”) */
    highlightsForm: {
      label: 'Réussites',
      itemLabel: 'Point fort',
      placeholder: 'Décrivez un résultat clé ou une réussite de votre carrière.',
      add: '+ Ajouter un point fort',
      remove: 'Supprimer',
    },
    /** New: Preview section titles */
    preview: {
      summary: 'Résumé',
      skills: 'Compétences',
      experience: 'Expérience',
      education: 'Éducation',
      certifications: 'Certifications',
      otherAchievements: 'Autres réussites',
      present: 'Présent',
      idLabel: 'ID',
      photoAlt: 'Photo de profil',
    },
  },
  sw: {
    pricing: {
      oneTime: '/ malipo mara moja',
    },
    hero: {
      ctaModels: 'Mandhari zinazopatikana',
      imageAlt: 'Hakikisho la wasifu',
    },
    share: {
      whatsappDefault: 'Habari! Tengeneza CV ya kitaalamu kwa ETHAN: {{url}}',
    },
    a11y: {
      mobileActions: 'Vitendo vya simu',
    },
    common: {
      yes: 'Ndiyo',
      no: 'Hapana',
    },
    form: {
      country: 'Nchi',
      selectCountry: 'Chagua nchi',
      skillsHint: 'Tenganisha ujuzi kwa koma.',
      toggle: {
        toWithPhoto: '→ Kwa picha',
        toWithoutPhoto: '→ Bila picha',
      },
      placeholders: {
        fullName: 'mf., Aïcha K.',
        headline: 'mf., Msanidi Frontend',
        email: 'wewe@mfano.com',
        phone: '+243 99 999 9999',
        location: 'Kinshasa, DRC',
        photoUrl: 'https://...',
        summary: 'Jieleze kwa sentensi 2–3 (wasifu, nguvu, athari).',
        skills: 'mf., React, TypeScript, Ubunifu wa UI',
      },
    },
    achievementsForm: {
      label: 'Mafanikio',
      title: 'Kichwa cha mafanikio',
      description: 'Maelezo',
      add: '+ Ongeza mafanikio',
      remove: 'Ondoa',
    },
    highlightsForm: {
      label: 'Mambo makuu ya kazi',
      itemLabel: 'Jambo muhimu',
      placeholder: 'Eleza mafanikio au hatua muhimu katika kazi yako.',
      add: '+ Ongeza kipengele',
      remove: 'Ondoa',
    },
    preview: {
      summary: 'Muhtasari',
      skills: 'Ujuzi',
      experience: 'Uzoefu',
      education: 'Elimu',
      certifications: 'Vyeti',
      otherAchievements: 'Mafanikio mengine',
      present: 'Sasa',
      idLabel: 'Kitambulisho',
      photoAlt: 'Picha ya wasifu',
    },
  },
  pt: {
    pricing: {
      oneTime: '/ pagamento único',
    },
    hero: {
      ctaModels: 'Modelos disponíveis',
      imageAlt: 'Pré-visualização do currículo',
    },
    share: {
      whatsappDefault: 'Olá! Crie um currículo profissional com o ETHAN: {{url}}',
    },
    a11y: {
      mobileActions: 'Ações móveis',
    },
    common: {
      yes: 'Sim',
      no: 'Não',
    },
    form: {
      country: 'País',
      selectCountry: 'Selecione um país',
      skillsHint: 'Separe as competências por vírgulas.',
      toggle: {
        toWithPhoto: '→ Com foto',
        toWithoutPhoto: '→ Sem foto',
      },
      placeholders: {
        fullName: 'ex.: Aïcha K.',
        headline: 'ex.: Desenvolvedor Frontend',
        email: 'voce@exemplo.com',
        phone: '+243 99 999 9999',
        location: 'Kinshasa, RDC',
        photoUrl: 'https://...',
        summary: 'Apresente-se em 2–3 frases (perfil, pontos fortes, impacto).',
        skills: 'ex.: React, TypeScript, UI Design',
      },
    },
    achievementsForm: {
      label: 'Realizações',
      title: 'Título da realização',
      description: 'Descrição',
      add: '+ Adicionar realização',
      remove: 'Remover',
    },
    highlightsForm: {
      label: 'Destaques da carreira',
      itemLabel: 'Destaque',
      placeholder: 'Descreva um resultado ou marco importante da sua carreira.',
      add: '+ Adicionar destaque',
      remove: 'Remover',
    },
    preview: {
      summary: 'Resumo',
      skills: 'Competências',
      experience: 'Experiência',
      education: 'Educação',
      certifications: 'Certificações',
      otherAchievements: 'Outras realizações',
      present: 'Presente',
      idLabel: 'ID',
      photoAlt: 'Foto de perfil',
    },
  },
  mg: {
    pricing: {
      oneTime: '/ fandoavam-bola indray mandeha',
    },
    hero: {
      ctaModels: 'Modely misy',
      imageAlt: 'Topi-maso CV',
    },
    share: {
      whatsappDefault: 'Salama! Mamoròna CV matihanina amin’i ETHAN: {{url}}',
    },
    a11y: {
      mobileActions: 'Asa amin’ny finday',
    },
    common: {
      yes: 'Eny',
      no: 'Tsia',
    },
    form: {
      country: 'Firenena',
      selectCountry: 'Safidio firenena',
      skillsHint: 'Saraho amin’ny koma ny fahaiza-manao.',
      toggle: {
        toWithPhoto: '→ Misy sary',
        toWithoutPhoto: '→ Tsy misy sary',
      },
      placeholders: {
        fullName: 'oh.: Aïcha K.',
        headline: 'oh.: Mpamorona Frontend',
        email: 'ianao@ohatra.com',
        phone: '+243 99 999 9999',
        location: 'Antananarivo, MG',
        photoUrl: 'https://...',
        summary: 'Lazao ny tenanao amin’ny fehezanteny 2–3 (mombamomba, tanjaka, fiantraikany).',
        skills: 'oh.: React, TypeScript, UI Design',
      },
    },
    highlightsForm: {
      label: 'Zava-dehibe amin’ny asa',
      itemLabel: 'Zava-dehibe',
      placeholder: 'Farito zava-bita na dingana manan-danja amin’ny asanao.',
      add: '+ Ampio zava-dehibe',
      remove: 'Esory',
    },
    preview: {
      summary: 'Famintinana',
      skills: 'Fahaiza-manao',
      experience: 'Traikefa',
      education: 'Fampianarana',
      certifications: 'Sertifikà',
      otherAchievements: 'Zava-bita hafa',
      present: 'Ankehitriny',
      idLabel: 'ID',
      photoAlt: 'Sary mombamomba',
    },
  },
  ar: {
    pricing: {
      oneTime: '/ دفعة واحدة',
    },
    hero: {
      ctaModels: 'النماذج المتاحة',
      imageAlt: 'معاينة السيرة الذاتية',
    },
    share: {
      whatsappDefault: 'مرحبًا! أنشئ سيرة ذاتية احترافية مع ETHAN: {{url}}',
    },
    a11y: {
      mobileActions: 'إجراءات الهاتف المحمول',
    },
    common: {
      yes: 'نعم',
      no: 'لا',
    },
    form: {
      country: 'البلد',
      selectCountry: 'اختر دولة',
      skillsHint: 'افصل المهارات بفواصل.',
      toggle: {
        toWithPhoto: '→ مع صورة',
        toWithoutPhoto: '→ بدون صورة',
      },
      placeholders: {
        fullName: 'مثال: عائشة ك.',
        headline: 'مثال: مطور واجهات أمامية',
        email: 'you@example.com',
        phone: '+243 99 999 9999',
        location: 'كينشاسا، جمهورية الكونغو الديمقراطية',
        photoUrl: 'https://...',
        summary: 'عرّف بنفسك في 2–3 جمل (الملف، نقاط القوة، الأثر).',
        skills: 'مثال: React, TypeScript, UI Design',
      },
    },
    achievementsForm: {
      label: 'الإنجازات',
      title: 'عنوان الإنجاز',
      description: 'الوصف',
      add: '+ أضف إنجازًا',
      remove: 'إزالة',
    },
    highlightsForm: {
      label: 'أبرز الإنجازات المهنية',
      itemLabel: 'إنجاز بارز',
      placeholder: 'صف إنجازاً أو محطة مهمة في مسيرتك المهنية.',
      add: '+ إضافة إنجاز بارز',
      remove: 'إزالة',
    },
    preview: {
      summary: 'الملخص',
      skills: 'المهارات',
      experience: 'الخبرة',
      education: 'التعليم',
      certifications: 'الشهادات',
      otherAchievements: 'إنجازات أخرى',
      present: 'الحالي',
      idLabel: 'المعرف',
      photoAlt: 'صورة الملف الشخصي',
    },
  },
}

try {
  Object.entries(bundles).forEach(([lang, bundle]) => {
    // Deep-merge and overwrite to keep idempotent
    i18next.addResourceBundle(lang as Lang, 'translation', bundle, true, true)
  })
} catch {
  // No-op: if i18n isn't initialized yet, i18next will still pick the bundles once ready.
}
