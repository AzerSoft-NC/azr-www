import type { ConsentConfig } from '@/lib/consent.types';

const consentConfig: ConsentConfig = {
  /** Bump to force re-consent when categories change */
  version: 1,

  /** 'consent_mode_v2' = scripts load with denied defaults, cookieless pings
   *  'strict' = scripts fully blocked until consent granted */
  mode: 'consent_mode_v2',

  /** localStorage key for stored preferences */
  storageKey: 'cookie-consent',

  categories: {
    necessary: {
      label: 'Nécessaires',
      description:
        'Cookies indispensables au fonctionnement du site. Ils ne peuvent pas être désactivés.',
      required: true,
      defaultEnabled: true,
      gcmTypes: ['security_storage'],
    },
    analytics: {
      label: 'Statistiques',
      description:
        'Nous aident à comprendre comment les visiteurs utilisent le site grâce à des données d’usage anonymisées.',
      required: false,
      defaultEnabled: false,
      gcmTypes: ['analytics_storage'],
    },
    marketing: {
      label: 'Marketing',
      description:
        'Permettent la diffusion de publicités pertinentes et le suivi des campagnes sur différents sites.',
      required: false,
      defaultEnabled: false,
      gcmTypes: ['ad_storage', 'ad_user_data', 'ad_personalization'],
    },
    preferences: {
      label: 'Préférences',
      description: 'Permettent de mémoriser vos choix (langue, région, options d’affichage, etc.).',
      required: false,
      defaultEnabled: false,
      gcmTypes: ['functionality_storage', 'personalization_storage'],
    },
  },

  ui: {
    heading: 'Préférences de cookies',
    description:
      'Nous utilisons des cookies pour améliorer votre navigation, proposer des contenus adaptés et mesurer l’audience.',
    acceptAll: 'Tout accepter',
    declineAll: 'Tout refuser',
    customize: 'Personnaliser',
    savePreferences: 'Enregistrer mes choix',
    settingsHeading: 'Paramètres de confidentialité',
    alwaysOnLabel: 'Toujours actif',
    privacyPolicyLabel: 'Politique de confidentialité',
  },

  /** Milliseconds before banner slides in */
  showDelay: 500,
};

export default consentConfig;
