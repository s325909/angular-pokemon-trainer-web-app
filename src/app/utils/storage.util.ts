export class StorageUtil {

    public static storageSave<T>(key: string, value: T): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    
    public static storageRead<T>(key: string): T | undefined {
        const storedValue = sessionStorage.getItem(key);
        try {
            if (storedValue) return JSON.parse(storedValue) as T;
            return undefined;
        } catch (error) {
            // Remove invalid data!
            sessionStorage.removeItem(key);
            return undefined;
        }
    }
}
