export const useStorage = () => {
    if (typeof window !== 'undefined') {
        const storage = window.localStorage;
        return {
            storage,
            set: storage.setItem,
            get: storage.getItem,
            remove: storage.removeItem,
        };
    }
    return {};
};
