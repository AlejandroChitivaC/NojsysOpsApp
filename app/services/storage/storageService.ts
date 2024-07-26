import { House } from '@/app/entities/House';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Función para guardar datos en AsyncStorage
const setItem = async (key: string, value: any): Promise<void> => {
    try {
        // Convertir el valor a JSON si no es un string
        const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error('Error saving data:', e);
    }
};
const setHouseItem = async (key: string, value: House[]): Promise<void> => {
    try {
        let data = JSON.stringify(value);
        console.log(data)
        await AsyncStorage.setItem(key,data);
    } catch (e) {
        console.error("Error")
    }
}
const setStringItem = async (key: string, value: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.error('Error saving data:', e);
    }
}

// Función para obtener datos de AsyncStorage
const getItem = async <T>(key: string): Promise<T | null> => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
    } catch (e) {
        console.error('Error retrieving data:', e);
        return null;
    }
};

// Función para obtener un string de AsyncStorage
const getStringItem = async (key: string): Promise<string | null> => {
    try {
        const data = await AsyncStorage.getItem(key);
        return data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

// Función para eliminar datos de AsyncStorage
const removeItem = async (key: string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.error('Error removing data:', e);
    }
};

export default {
    setItem,
    getItem,
    removeItem,
    getStringItem,
    setStringItem,
    setHouseItem
};
