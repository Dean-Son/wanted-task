export const setValueInJestProvide = (cls: any) => {
  const keys = Object.getOwnPropertyNames(cls.prototype).filter((method) => method !== 'constructor');
  const response = keys.reduce((acc: any, curr: string) => {
    acc[curr] = jest.fn();
    return acc;
  }, {});
  return response;
};
