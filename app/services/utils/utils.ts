export const flattenObject = (obj: any, prefix: string = ''): Array<[string, any]> => {
    let result: Array<[string, any]> = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'object' && value !== null) {
          result = result.concat(flattenObject(value, newKey));
        } else {
          result.push([newKey, value]);
        }
      }
    }

    return result;
  };