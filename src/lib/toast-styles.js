import { toast } from 'sonner'

/**
 * Styles prédéfinis pour les toasts
 * Utilise les variables CSS du système de design
 */

export const toastStyles = {
  success: {
    className: 'rounded-4xl',
    style: {
      '--normal-bg': 'var(--toast-success-bg)',
      '--normal-text': 'var(--toast-success-text)',
      '--normal-border': 'var(--toast-success-border)',
    },
  },
  error: {
    className: 'rounded-4xl',
    style: {
      '--normal-bg': 'var(--toast-error-bg)',
      '--normal-text': 'var(--toast-error-text)',
      '--normal-border': 'var(--toast-error-border)',
    },
  },
  warning: {
    className: 'rounded-4xl',
    style: {
      '--normal-bg':
        'color-mix(in oklab, var(--color-yellow-600) 10%, var(--background))',
      '--normal-text': 'var(--color-yellow-600)',
      '--normal-border': 'var(--color-yellow-600)',
    },
  },
  info: {
    className: 'rounded-4xl',
    style: {
      '--normal-bg':
        'color-mix(in oklab, var(--color-blue-600) 10%, var(--background))',
      '--normal-text': 'var(--color-blue-600)',
      '--normal-border': 'var(--color-blue-600)',
    },
  },
}

/**
 * Fonctions utilitaires pour les toasts
 */
export const showToast = {
  success: (message) => toast.success(message, toastStyles.success),
  error: (message) => toast.error(message, toastStyles.error),
  warning: (message) => toast.warning(message, toastStyles.warning),
  info: (message) => toast.info(message, toastStyles.info),
}
