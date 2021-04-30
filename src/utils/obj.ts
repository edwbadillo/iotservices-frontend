import { camelCaseStr, snakeCaseStr } from './str';

export function camelCaseKeys(obj: any): any {
  if (obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function') {
    for (const key in obj) {
      const camelCaseKey = camelCaseStr(key);
      if (key != camelCaseKey) {
        obj[camelCaseKey] = obj[key];
        delete obj[key];
      }
    }
  } else if (Array.isArray(obj)) {
    return obj.map((i) => {
      return camelCaseKeys(i);
    });
  }
  return obj;
}

export function snakeCaseKeys(obj: any): any {
  if (obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function') {
    for (const key in obj) {
      const snakeCaseKey = snakeCaseStr(key);
      if (key != snakeCaseKey) {
        obj[snakeCaseKey] = obj[key];
        delete obj[key];
      }
    }
  } else if (Array.isArray(obj)) {
    return obj.map((i) => {
      return snakeCaseKeys(i);
    });
  }
  return obj;
}
