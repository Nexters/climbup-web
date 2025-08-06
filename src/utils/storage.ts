export const setStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
};

export const getStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const removeStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
