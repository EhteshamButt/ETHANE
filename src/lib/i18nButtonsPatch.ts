/**
 * i18nButtonsPatch.ts
 * Side-effect-only patch that adds common button labels and basic UI strings across languages.
 * - Keeps it simple (no generics on constants) to avoid parser issues.
 * - Uses addResourceBundle with deep merge and overwrite for idempotent behavior.
 */

import i18next from 'i18next'

/**
 * Bundles of basic keys used around the app to avoid missing translations.
 * Note: Keep this minimal to complement existing i18n resources (UxPatch, AddressPatch, etc.).
 */
const bundles = {
  en: {
    common: {
      save: 'Save',
      close: 'Close',
      send: 'Send',
      back: 'Back',
      continue: 'Continue',
      next: 'Next',
      download: 'Download',
      cancel: 'Cancel',
    },
    share: {
      whatsappTitle: 'Share via WhatsApp',
      shareAll: 'Share to all',
      shareTo: 'Share to {{phone}}',
      whatsappDefault: 'Check this out: {{url}}',
    },
    steps: {
      one: 'Fill info',
      two: '',
      three: 'Choose model',
    },
    preview: {
      title: '',
      present: 'Present',
      linkedin: 'LinkedIn',
      photoAlt: 'Profile photo',
    },
    hero: {
      title: 'Create a professional resume',
      subtitle: 'Fast, beautiful, and effective',
      ctaHow: 'How it works',
      ctaModels: 'Available models',
      imageAlt: 'Hero image',
    },
    how: {
      title: 'How it works',
      step1: 'Fill your information',
      step2: 'Preview your resume',
      step3: 'Select a model',
      step4: 'Pay and download',
      step5: 'Share with friends',
      note: 'You can update your resume anytime.',
    },
    pricing: {
      title: 'Choose your plan',
      payNow: 'Pay now',
      total: 'Total: ${{amount}}',
      oneTime: '/ one-time',
      simple: { name: 'Simple', price: '$1' },
      pro: { name: 'Pro', price: '$2' },
      advanced: { name: 'Advanced', price: '$3' },
    },
    payment: {
      backendMissing: 'Payment service is not configured.',
      emailSent: 'Email sent.',
      successTitle: 'Payment successful',
      ready: 'Ready to download',
    },
    dates: {
      exportBlocked: 'Fix invalid dates (end ≥ start, format YYYY-MM or "Present").',
      formatHint: 'Format: YYYY-MM (e.g., 2024-06). Use "Present" for ongoing roles.',
    },
    a11y: {
      mobileActions: 'Mobile actions',
    },
    brand: 'Mako',
    form: {
      achievements: 'Achievements',
      toggle: {
        toWithPhoto: 'With photo',
        toWithoutPhoto: 'Without photo',
      },
    },
  },

  fr: {
    common: {
      save: 'Enregistrer',
      close: 'Fermer',
      send: 'Envoyer',
      back: 'Retour',
      continue: 'Continuer',
      next: 'Suivant',
      download: 'Télécharger',
      cancel: 'Annuler',
    },
    share: {
      whatsappTitle: 'Partager via WhatsApp',
      shareAll: 'Partager à tous',
      shareTo: 'Partager à {{phone}}',
      whatsappDefault: 'Découvrez ceci : {{url}}',
    },
    steps: {
      one: 'Informations',
      two: '',
      three: 'Choisir le modèle',
    },
    preview: {
      title: '',
      present: 'Présent',
      linkedin: 'LinkedIn',
      photoAlt: 'Photo de profil',
    },
    hero: {
      title: 'Créez un CV professionnel',
      subtitle: 'Rapide, élégant et efficace',
      ctaHow: 'Comment ça marche',
      ctaModels: 'Modèles proposés',
      imageAlt: 'Image de présentation',
    },
    how: {
      title: 'Comment ça marche',
      step1: 'Renseignez vos informations',
      step2: 'Pré-visualisez votre CV',
      step3: 'Sélectionnez un modèle',
      step4: 'Payez et téléchargez',
      step5: 'Partagez avec des amis',
      note: 'Vous pouvez mettre à jour votre CV à tout moment.',
    },
    pricing: {
      title: 'Choisissez votre plan',
      payNow: 'Payer maintenant',
      total: 'Total : ${{amount}}',
      oneTime: '/ paiement unique',
      simple: { name: 'Simple', price: '$1' },
      pro: { name: 'Pro', price: '$2' },
      advanced: { name: 'Avancé', price: '$3' },
    },
    payment: {
      backendMissing: 'Service de paiement non configuré.',
      emailSent: 'E-mail envoyé.',
      successTitle: 'Paiement réussi',
      ready: 'Prêt à télécharger',
    },
    dates: {
      exportBlocked: 'Corrigez les dates invalides (fin ≥ début, format YYYY-MM ou « Present »).',
      formatHint: 'Format : YYYY-MM (ex : 2024-06). Utilisez « Present » pour un poste en cours.',
    },
    a11y: {
      mobileActions: 'Actions mobiles',
    },
    brand: 'Mako',
    form: {
      achievements: 'Réalisations',
      toggle: {
        toWithPhoto: 'Avec photo',
        toWithoutPhoto: 'Sans photo',
      },
    },
  },

  sw: {
    common: {
      save: 'Hifadhi',
      close: 'Funga',
      send: 'Tuma',
      back: 'Nyuma',
      continue: 'Endelea',
      next: 'Ifuatayo',
      download: 'Pakua',
      cancel: 'Ghairi',
    },
    share: {
      whatsappTitle: 'Shiriki kupitia WhatsApp',
      shareAll: 'Shiriki kwa wote',
      shareTo: 'Shiriki kwa {{phone}}',
      whatsappDefault: 'Tazama hii: {{url}}',
    },
    steps: { one: 'Jaza taarifa', two: '', three: 'Chagua modeli' },
    preview: { title: 'Hakikisho la CV', present: 'Sasa', linkedin: 'LinkedIn', photoAlt: 'Picha ya wasifu' },
    hero: {
      title: 'Tengeneza CV ya kitaalamu',
      subtitle: 'Haraka, maridadi, fanisi',
      ctaHow: 'Jinsi inavyofanya kazi',
      ctaModels: 'Miundo iliyopo',
      imageAlt: 'Picha ya mwanzo',
    },
    how: {
      title: 'Jinsi inavyofanya kazi',
      step1: 'Jaza taarifa zako',
      step2: 'Angalia hakikisho la CV',
      step3: 'Chagua modeli',
      step4: 'Lipa na pakua',
      step5: 'Shiriki na marafiki',
      note: 'Unaweza kusasisha CV yako wakati wowote.',
    },
    pricing: {
      title: 'Chagua mpango',
      payNow: 'Lipa sasa',
      total: 'Jumla: ${{amount}}',
      oneTime: '/ malipo ya mara moja',
      simple: { name: 'Rahisi', price: '$1' },
      pro: { name: 'Pro', price: '$2' },
      advanced: { name: 'Pepe', price: '$3' },
    },
    payment: {
      backendMissing: 'Huduma ya malipo haijasanidiwa.',
      emailSent: 'Barua pepe imetumwa.',
      successTitle: 'Malipo yamefanikiwa',
      ready: 'Tayari kupakua',
    },
    dates: {
      exportBlocked: 'Sahihisha tarehe (mwisho ≥ mwanzo, muundo YYYY-MM au "Present").',
      formatHint: 'Muundo: YYYY-MM (mf. 2024-06). Tumia "Present" kwa nafasi inayoendelea.',
    },
    a11y: { mobileActions: 'Vitendo vya simu' },
    brand: 'Mako',
    form: { achievements: 'Mafanikio', toggle: { toWithPhoto: 'Pamoja na picha', toWithoutPhoto: 'Bila picha' } },
  },

  pt: {
    common: {
      save: 'Salvar',
      close: 'Fechar',
      send: 'Enviar',
      back: 'Voltar',
      continue: 'Continuar',
      next: 'Próximo',
      download: 'Baixar',
      cancel: 'Cancelar',
    },
    share: {
      whatsappTitle: 'Compartilhar via WhatsApp',
      shareAll: 'Compartilhar para todos',
      shareTo: 'Compartilhar para {{phone}}',
      whatsappDefault: 'Confira isto: {{url}}',
    },
    steps: { one: 'Preencher', two: '', three: 'Escolher modelo' },
    preview: { title: 'Prévia do currículo', present: 'Presente', linkedin: 'LinkedIn', photoAlt: 'Foto do perfil' },
    hero: {
      title: 'Crie um currículo profissional',
      subtitle: 'Rápido, bonito e eficaz',
      ctaHow: 'Como funciona',
      ctaModels: 'Modelos disponíveis',
      imageAlt: 'Imagem de destaque',
    },
    how: {
      title: 'Como funciona',
      step1: 'Preencha suas informações',
      step2: 'Pré-visualize seu currículo',
      step3: 'Selecione um modelo',
      step4: 'Pague e baixe',
      step5: 'Compartilhe com amigos',
      note: 'Você pode atualizar seu currículo a qualquer momento.',
    },
    pricing: {
      title: 'Escolha seu plano',
      payNow: 'Pagar agora',
      total: 'Total: ${{amount}}',
      oneTime: '/ pagamento único',
      simple: { name: 'Simples', price: '$1' },
      pro: { name: 'Profissional', price: '$2' },
      advanced: { name: 'Avançado', price: '$3' },
    },
    payment: {
      backendMissing: 'Serviço de pagamento não configurado.',
      emailSent: 'E-mail enviado.',
      successTitle: 'Pagamento bem-sucedido',
      ready: 'Pronto para baixar',
    },
    dates: {
      exportBlocked: 'Corrija as datas inválidas (fim ≥ início, formato YYYY-MM ou "Present").',
      formatHint: 'Formato: YYYY-MM (ex.: 2024-06). Use "Present" para cargos em andamento.',
    },
    a11y: { mobileActions: 'Ações móveis' },
    brand: 'Mako',
    form: { achievements: 'Realizações', toggle: { toWithPhoto: 'Com foto', toWithoutPhoto: 'Sem foto' } },
  },

  mg: {
    common: {
      save: 'Tehirizo',
      close: 'Hidio',
      send: 'Alefa',
      back: 'Miverina',
      continue: 'Tohizo',
      next: 'Manaraka',
      download: 'Ampidino',
      cancel: 'Foano',
    },
    share: {
      whatsappTitle: 'Zarao amin’ny WhatsApp',
      shareAll: 'Zarao amin’ny rehetra',
      shareTo: 'Zarao amin’i {{phone}}',
      whatsappDefault: 'Jereo ity: {{url}}',
    },
    steps: { one: 'Fenoi ny mombamomba', two: '', three: 'Misafidiana modely' },
    preview: { title: 'Topi-mason’ny CV', present: 'Ankehitriny', linkedin: 'LinkedIn', photoAlt: 'Sary mombamomba' },
    hero: {
      title: 'Manamboara CV matihanina',
      subtitle: 'Haingana, tsara tarehy, mahomby',
      ctaHow: 'Ahoana ny fandehany',
      ctaModels: 'Modely misy',
      imageAlt: 'Sary lohateny',
    },
    how: {
      title: 'Ahoana ny fandehany',
      step1: 'Fenoy ny mombamomba anao',
      step2: 'Jereo mialoha ny CV',
      step3: 'Misafidiana modely',
      step4: 'Aloavy ary ampidino',
      step5: 'Zarao amin’ny namana',
      note: 'Afaka manavao ny CV ianao amin’ny fotoana rehetra.',
    },
    pricing: {
      title: 'Misafidiana drafitra',
      payNow: 'Aloavy izao',
      total: 'Fitambarany: ${{amount}}',
      oneTime: '/ fandoavam-bola indray mandeha',
      simple: { name: 'Tsotra', price: '$1' },
      pro: { name: 'Pro', price: '$2' },
      advanced: { name: 'Mandroso', price: '$3' },
    },
    payment: {
      backendMissing: 'Tsy voaendrika ny serivisy fandoavam-bola.',
      emailSent: 'Nalefa ny mailaka.',
      successTitle: 'Vita soa aman-tsara ny fandoavana',
      ready: 'Vonona hampidina',
    },
    dates: {
      exportBlocked: 'Atsaharo ny daty tsy mety (faran’ny fotoana ≥ fiandohana, endrika YYYY-MM na "Present").',
      formatHint: 'Endrika: YYYY-MM (oh: 2024-06). Ampiasao ny "Present" raha mbola mitohy.',
    },
    a11y: { mobileActions: 'Hetsika amin’ny finday' },
    brand: 'Mako',
    form: { achievements: 'Zava-bita', toggle: { toWithPhoto: 'Miaraka sary', toWithoutPhoto: 'Tsy misy sary' } },
  },

  ar: {
    common: {
      save: 'حفظ',
      close: 'إغلاق',
      send: 'إرسال',
      back: 'رجوع',
      continue: 'متابعة',
      next: 'التالي',
      download: 'تنزيل',
      cancel: 'إلغاء',
    },
    share: {
      whatsappTitle: 'المشاركة عبر واتساب',
      shareAll: 'المشاركة للجميع',
      shareTo: 'مشاركة إلى {{phone}}',
      whatsappDefault: 'اطلع على هذا: {{url}}',
    },
    steps: { one: 'املأ البيانات', two: '', three: 'اختر النموذج' },
    preview: { title: 'معاينة السيرة الذاتية', present: 'تشغيل', linkedin: 'لينكدإن', photoAlt: 'صورة الملف' },
    hero: {
      title: 'أنشئ سيرة ذاتية احترافية',
      subtitle: 'سريع، جميل، فعّال',
      ctaHow: 'كيف يعمل',
      ctaModels: 'النماذج المتاحة',
      imageAlt: 'صورة واجهة',
    },
    how: {
      title: 'كيف يعمل',
      step1: 'املأ معلوماتك',
      step2: 'عاين سيرتك الذاتية',
      step3: 'اختر نموذجاً',
      step4: 'ادفع وحمّل',
      step5: 'شارك مع الأصدقاء',
      note: 'يمكنك تحديث سيرتك الذاتية في أي وقت.',
    },
    pricing: {
      title: 'اختر خطتك',
      payNow: 'ادفع الآن',
      total: 'الإجمالي: ${{amount}}',
      oneTime: '/ دفعة واحدة',
      simple: { name: 'بسيط', price: '$1' },
      pro: { name: 'محترف', price: '$2' },
      advanced: { name: 'متقدم', price: '$3' },
    },
    payment: {
      backendMissing: 'لم يتم ضبط خدمة الدفع.',
      emailSent: 'تم إرسال البريد الإلكتروني.',
      successTitle: 'تم الدفع بنجاح',
      ready: 'جاهز للتنزيل',
    },
    dates: {
      exportBlocked: 'صحّح التواريخ (النهاية ≥ البداية، الصيغة YYYY-MM أو "Present").',
      formatHint: 'الصيغة: YYYY-MM (مثال: 2024-06). استخدم "Present" للعمل الحالي.',
    },
    a11y: { mobileActions: 'إجراءات الهاتف' },
    brand: 'Mako',
    form: { achievements: 'إنجازات', toggle: { toWithPhoto: 'مع صورة', toWithoutPhoto: 'بدون صورة' } },
  },
} as const

/**
 * Apply deep-merge patches for each language.
 */
try {
  Object.entries(bundles as Record<string, any>).forEach(([lang, bundle]) => {
    i18next.addResourceBundle(lang, 'translation', bundle, true, true)
  })
} catch {
  // No-op: if i18n is not yet initialized, this will still register
}
