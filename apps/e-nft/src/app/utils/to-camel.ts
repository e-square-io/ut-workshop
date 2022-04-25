/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

function capitalize(value: string): string {
  return value.length > 1 ? `${value.slice(0, 1).toUpperCase()}${value.slice(1)}` : value.toUpperCase();
}

function isObject(obj: unknown): boolean {
  return obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function';
}

function keyToCamel(value: string): string {
  if (!value || !value.trim()) {
    return '';
  }

  value = value.trim().toLowerCase();
  value = value.replace(/\s+/, '');
  value = value.startsWith('_') ? value.substr(1) : value;

  const splitted = value.split('_');
  let result = splitted[0];

  if (splitted.length === 1) {
    return result;
  }

  for (let i = 1; i < splitted.length; i++) {
    const item = splitted[i];

    result += capitalize(item);
  }

  return result;
}

export function toCamel<T>(obj: any): T | T[] {
  if (isObject(obj)) {
    const result: any = {};
    const keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++) {
      result[keyToCamel(keys[i])] = toCamel<any>(obj[keys[i]]);
    }

    return result as T;
  } else if (Array.isArray(obj)) {
    return (obj as Array<unknown>).map(item => toCamel(item)) as T[];
  }

  return obj as T;
}

export function toCamelCase<T>() {
  return function (source: Observable<any>): Observable<T> {
    return source.pipe(switchMap(obj => of(toCamel<T>({ ...obj }) as T)));
  };
}
