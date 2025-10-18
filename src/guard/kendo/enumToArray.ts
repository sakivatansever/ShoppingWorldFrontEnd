export const enumToOptions = (enumObj: any): { text: string; value: number }[] => {
    return Object.keys(enumObj)
      .filter((key) => !isNaN(Number(enumObj[key])))
      .map((key) => ({
        text: key,
        value: enumObj[key],
      }));
  };
  