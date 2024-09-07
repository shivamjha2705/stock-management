// utils/localStorage.ts

export function setLocalStorageItem(key: string, value: any): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getLocalStorageItem<T>(key: string): T | null {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }
  return null;
}


// utils/sessionStorage.ts

export function setSessionStorageItem(key: string, value: any): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}

export function getSessionStorageItem<T>(key: string): T | null {
  if (typeof window !== "undefined") {
    const item = sessionStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }
  return null;
}

export function removeSessionStorageItem(key: string): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
}