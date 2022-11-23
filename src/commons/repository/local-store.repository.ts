class LocalStoreRepository {
  save({ key, value }: { key: string; value: any }) {
    console.log("Save in localStorage:", key, value);
    const valueStr = typeof value === "object" ? JSON.stringify(value) : value;
    localStorage.setItem(key, valueStr);
  }

  load({ key }: { key: string }) {
    return localStorage.getItem(key);
  }

  delete({ key }: { key: string }) {
    localStorage.removeItem(key);
  }
}

export const LocalStoreRepositoryIst = new LocalStoreRepository();
