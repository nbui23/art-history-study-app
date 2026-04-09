export function clampIndex(index: number, total: number) {
  if (total <= 0) {
    return 0;
  }

  if (index < 0) {
    return total - 1;
  }

  if (index >= total) {
    return 0;
  }

  return index;
}

export function getRandomIndex(total: number, currentIndex: number) {
  if (total <= 1) {
    return 0;
  }

  let nextIndex = currentIndex;
  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * total);
  }

  return nextIndex;
}

export function isTextInput(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName;
  return (
    target.isContentEditable ||
    tagName === 'INPUT' ||
    tagName === 'TEXTAREA' ||
    tagName === 'SELECT'
  );
}
