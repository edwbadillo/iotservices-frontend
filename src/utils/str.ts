export function camelCaseStr(str: string) {
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1
      .toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
}

export function snakeCaseStr(str: string) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
