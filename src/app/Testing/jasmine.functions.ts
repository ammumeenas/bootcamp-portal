import { Type } from '@angular/core';

export function createSpyObject<T>(
  type: Type<T>,
  properties?: string[]
): jasmine.SpyObj<T> {
  properties = properties
    ? properties
    : Object.getOwnPropertyNames(type.prototype).filter(
        (x) => x !== 'constructor'
      );
  return jasmine.createSpyObj(String(type), properties);
}
