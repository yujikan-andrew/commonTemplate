import defaultSettings from '@/settings'

const title = defaultSettings.title || ''

export function setPageTitle(pageTitle) {
  if (pageTitle) {
    document.title = `${pageTitle} - ${title}`
  }
  document.title = `${title}`
}