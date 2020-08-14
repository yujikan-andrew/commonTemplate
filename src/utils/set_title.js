import { title } from '@/settings'

export function setPageTitle(pageTitle) {
  console.log(pageTitle, title);
  if (pageTitle) {
    document.title = `${pageTitle} - ${title}`
    
  } else {
    document.title = `${title}`
  }
}