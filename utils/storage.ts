const storagePrefix = 'speakai_';

const storage = {
  getToken: () => {
    const data = window.localStorage.getItem(`${storagePrefix}token`);
    return data;
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, token);
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  }
};
export default storage;
