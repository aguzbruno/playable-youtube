// RedirectService.js
import appFlow from '../json/flow.json'

export function getNextView(currentPage, isBack = false) {
  const page = appFlow[currentPage];

  if (!page) {
    return null; // Retornar null si la página no existe en el flujo
  }

  if (isBack && page.previousView) {
    return appFlow[page.previousView].name;
  } else if (page.nextView) {
    return appFlow[page.nextView].name;
  } else {
    return null; // Retornar null si no hay una siguiente vista
  }
}