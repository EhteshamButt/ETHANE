/**
 * i18nPaymentPatch.ts
 * Runtime i18n resources for payment modal and preview actions.
 * - Adds keys for EN, FR, SW, PT, AR.
 * - Loaded centrally by App.tsx to avoid per-component imports.
 */

import i18n from './i18n'

/** Minimal resource bundle used by the payment flow. */
const resources = {
  en: {
    translation: {
      'payment.modal.title': 'Payment',
      'payment.info.plan': 'Plan',
      'payment.info.total': 'Total',
      'payment.tabs.card': 'Card',
      'payment.tabs.mobile': 'Mobile money',
      'payment.card.name': 'Card holder name',
      'payment.card.number': 'Card number',
      'payment.card.expiry': 'Expiry (MM / YY)',
      'payment.card.cvc': 'CVC',
      'payment.mobile.provider': 'Provider',
      'payment.mobile.phone': 'Phone number',
      'payment.note.redirect': 'You will be redirected to complete the payment if needed.',
      'payment.primary.pay': 'Pay now',
      'payment.primary.download': 'Download PDF',
      'payment.validation.name': 'Enter a valid name (min. 3 letters).',
      'payment.validation.cardNumber': 'Enter a valid card number.',
      'payment.validation.expiry': 'Enter a valid future expiry date.',
      'payment.validation.cvc': 'Enter a valid CVC (3–4 digits).',
      'payment.validation.phone': 'Enter a valid phone number.',
      'payment.confirmAndPay': 'Confirm and pay'
    }
  },
  fr: {
    translation: {
      'payment.modal.title': 'Paiement',
      'payment.info.plan': 'Forfait',
      'payment.info.total': 'Total',
      'payment.tabs.card': 'Carte',
      'payment.tabs.mobile': 'Mobile money',
      'payment.card.name': 'Nom du titulaire',
      'payment.card.number': 'Numéro de carte',
      'payment.card.expiry': 'Expiration (MM / AA)',
      'payment.card.cvc': 'CVC',
      'payment.mobile.provider': 'Opérateur',
      'payment.mobile.phone': 'Numéro de téléphone',
      'payment.note.redirect': 'Vous serez redirigé pour finaliser le paiement si nécessaire.',
      'payment.primary.pay': 'Payer maintenant',
      'payment.primary.download': 'Télécharger le PDF',
      'payment.validation.name': 'Saisissez un nom valide (min. 3 lettres).',
      'payment.validation.cardNumber': 'Saisissez un numéro de carte valide.',
      'payment.validation.expiry': 'Saisissez une date d’expiration valide et future.',
      'payment.validation.cvc': 'Saisissez un CVC valide (3–4 chiffres).',
      'payment.validation.phone': 'Saisissez un numéro de téléphone valide.',
      'payment.confirmAndPay': 'Confirmer et payer'
    }
  },
  sw: {
    translation: {
      'payment.modal.title': 'Malipo',
      'payment.info.plan': 'Mpango',
      'payment.info.total': 'Jumla',
      'payment.tabs.card': 'Kadi',
      'payment.tabs.mobile': 'Mobile money',
      'payment.card.name': 'Jina la mwenye kadi',
      'payment.card.number': 'Nambari ya kadi',
      'payment.card.expiry': 'Mwisho wa matumizi (MM / YY)',
      'payment.card.cvc': 'CVC',
      'payment.mobile.provider': 'Mtoa huduma',
      'payment.mobile.phone': 'Nambari ya simu',
      'payment.note.redirect': 'Utaelekezwa kukamilisha malipo ikihitajika.',
      'payment.primary.pay': 'Lipa sasa',
      'payment.primary.download': 'Pakua PDF',
      'payment.validation.name': 'Weka jina sahihi (angalau herufi 3).',
      'payment.validation.cardNumber': 'Weka nambari sahihi ya kadi.',
      'payment.validation.expiry': 'Weka tarehe ya mwisho sahihi ya baadaye.',
      'payment.validation.cvc': 'Weka CVC sahihi (tarakimu 3–4).',
      'payment.validation.phone': 'Weka nambari sahihi ya simu.',
      'payment.confirmAndPay': 'Thibitisha na ulipe'
    }
  },
  pt: {
    translation: {
      'payment.modal.title': 'Pagamento',
      'payment.info.plan': 'Plano',
      'payment.info.total': 'Total',
      'payment.tabs.card': 'Cartão',
      'payment.tabs.mobile': 'Dinheiro móvel',
      'payment.card.name': 'Nome no cartão',
      'payment.card.number': 'Número do cartão',
      'payment.card.expiry': 'Validade (MM / AA)',
      'payment.card.cvc': 'CVC',
      'payment.mobile.provider': 'Operadora',
      'payment.mobile.phone': 'Número de telefone',
      'payment.note.redirect': 'Você será redirecionado para concluir o pagamento, se necessário.',
      'payment.primary.pay': 'Pagar agora',
      'payment.primary.download': 'Baixar PDF',
      'payment.validation.name': 'Insira um nome válido (mín. 3 letras).',
      'payment.validation.cardNumber': 'Insira um número de cartão válido.',
      'payment.validation.expiry': 'Insira uma validade futura válida.',
      'payment.validation.cvc': 'Insira um CVC válido (3–4 dígitos).',
      'payment.validation.phone': 'Insira um número de telefone válido.',
      'payment.confirmAndPay': 'Confirmar e pagar'
    }
  },
  ar: {
    translation: {
      'payment.modal.title': 'الدفع',
      'payment.info.plan': 'الخطة',
      'payment.info.total': 'الإجمالي',
      'payment.tabs.card': 'بطاقة',
      'payment.tabs.mobile': 'الموبايل موني',
      'payment.card.name': 'اسم صاحب البطاقة',
      'payment.card.number': 'رقم البطاقة',
      'payment.card.expiry': 'تاريخ الانتهاء (MM / YY)',
      'payment.card.cvc': 'رمز CVC',
      'payment.mobile.provider': 'المزوّد',
      'payment.mobile.phone': 'رقم الهاتف',
      'payment.note.redirect': 'سيتم توجيهك لإكمال الدفع إذا لزم الأمر.',
      'payment.primary.pay': 'ادفع الآن',
      'payment.primary.download': 'تحميل PDF',
      'payment.validation.name': 'أدخل اسمًا صالحًا (3 أحرف على الأقل).',
      'payment.validation.cardNumber': 'أدخل رقم بطاقة صالحًا.',
      'payment.validation.expiry': 'أدخل تاريخ انتهاء صالحًا في المستقبل.',
      'payment.validation.cvc': 'أدخل CVC صالحًا (3–4 أرقام).',
      'payment.validation.phone': 'أدخل رقم هاتف صالحًا.',
      'payment.confirmAndPay': 'تأكيد والدفع'
    }
  }
}

/** Register resources if not already present. */
Object.entries(resources).forEach(([lng, bundle]) => {
  i18n.addResourceBundle(lng, 'translation', (bundle as any).translation, true, true)
})
