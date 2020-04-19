export const ObjectMask = (obj: object, mask: { [key: string]: unknown }) => {
  if (!obj) return obj;
  const newObj = ({...obj});
  for (const [key, value] of Object.entries(newObj)) {
    const maskValue = mask[key];
    if (maskValue !== undefined) {
      newObj[key] = mask[key];
    }
    else if (typeof value === 'object') {
      newObj[key] = ObjectMask(value, mask);
    }
  }
  return newObj;
};