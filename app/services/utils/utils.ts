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

export const formatDate = (date: string) => {
  const d = new Date(date);
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

export const formatMasterNumber = (masterNumber: string | null) => {
  if (!masterNumber) return "";
  return masterNumber.replace(/<br>/g, "\n");
};