class LocalStoreRepository {
  save({ key, value }: { key: string; value: any }) {
    // console.log("Save in localStorage:", key, value);
    const valueStr = typeof value === "object" ? JSON.stringify(value) : value;
    localStorage.setItem(key, valueStr);
  }

  load({ key }: { key: string }) {
    const item = localStorage.getItem(key);
    // console.log("Load in localStorage:", key, item);

    if (!item) {
      return null;
    }

    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  }

  delete({ key }: { key: string }) {
    // console.log("Delete in localStorage:", key, this.load({ key }));
    localStorage.removeItem(key);
  }
}

export const LocalStoreRepositoryIst = new LocalStoreRepository();
