import axios from "axios";
import { House } from "../entities/House";
import { Audio } from "expo-av";
import { Alert, Modal, ToastAndroid } from "react-native";
import storageService from "./storage/storageService";
import { ApiResponse } from "../entities/ApiResponse";
import useStore from "@/hooks/useGlobalStore";
import { showAlert } from "./alertService";
const { EXPO_PUBLIC_API_URL } = process.env;
export type MasterDataItem = {
    item1: House[];
    item2: House[];
};

const arraytProcessed: House[] = [];
const arraytToOutline: House[] = [];
let arrayBoxes: House[] | undefined;

export const initializeData = async () => {
    try {
        let masterData = await storageService.getItem<MasterDataItem>("masterData");
        arrayBoxes = masterData?.item1;
    } catch (error) {
        console.error('Error loading master data:', error);
    }
};



export const loadDataToServer = async (guide: House) => {
    try {
        const success = await loadDataToServerPromise(guide);
        const house = success.dataSingle
        if (house.statusId === 1) {
            await playSuccessSound();
            showAlert("Guía procesada", "success");
            arraytProcessed.push(guide);
        } else if (house.toOutline && house.statusId === 2) {
            await playErrorSound();
            showAlert("Enviar guía para preinspección", "warning")
            arraytToOutline.push(guide);

        } else if (house.statusId === 0 && house.pieces > house.processedPieces) {
            await playErrorSound();
            Alert.alert('Error', `Esa guía es multipieza, aún falta ${house.pieces - house.processedPieces} de ${house.pieces} piezas por escanear.`);
        }
    } catch (error: any) {
        showErrorAlert(error.message);
    }
};

// Función para reproducir sonido de éxito
const playSuccessSound = async () => {
    try {
        const { sound } = await Audio.Sound.createAsync(require('@/assets/audio/success.mp3'));
        await sound.playAsync();
    } catch (error) {
        console.error('Error al reproducir el sonido de éxito:', error);
    }
};

// Función para reproducir sonido de error
const playErrorSound = async () => {
    try {
        const { sound } = await Audio.Sound.createAsync(require('@/assets/audio/error.mp3'));
        await sound.playAsync();
    } catch (error) {
        console.error('Error al reproducir el sonido de error:', error);
    }
};

const showErrorAlert = (message: string) => {
    Alert.alert('Error', message);
};

// Método que trae la información de una master
export const getMasterData = async (masterNumber: string) => {
    try {
        const response = await axios.get(`${EXPO_PUBLIC_API_URL}/${masterNumber}`);
        await storageService.removeItem("masterData");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Método que actualiza cajas
export const updateBoxesById = async (house: House): Promise<any> => {
    try {
        const response = await axios.post(`${EXPO_PUBLIC_API_URL}/update${house.houseNo}`, house, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.data.isValid) {
            return response.data;
        } else {
            throw new Error(response.data.message || 'Error en la actualización de la caja');
        }
    } catch (error) {
        console.error('Error en updateBoxesById:', error);
        throw error;
    }
};

// Método que actualiza una caja a "Outline"
export const updateBoxToOutline = async (house: House): Promise<ApiResponse<House>> => {
    try {
        const response = await axios.post<ApiResponse<House>>(`${EXPO_PUBLIC_API_URL}/update/box/${house.houseNo}`, house, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.data.isValid) {
            return response.data;
        } else {
            throw new Error(response.data.message || 'Error en la actualización de la caja a Outline');
        }
    } catch (error) {
        console.error('Error en updateBoxToOutline:', error);
        throw error;
    }
};

export const loadDataToServerPromise = (guide: House): Promise<ApiResponse<House>> => {
    return axios.post<ApiResponse<House>>(`${EXPO_PUBLIC_API_URL}/update/${guide.houseNo}`, guide, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.data)
        .catch(error => {
            console.error('Error al cargar datos al servidor:', error);
            throw new Error(error.message);
        });
};

export const validateBox = async (inputValue: string): Promise<boolean> => {
    const { setTBoxes, setTBoxesOutline, setTBoxesStatusProcessed, setTBoxesStatusOutline, setTBoxesMissing, setTHousesToOutline, setTHousesInOutline } = useStore.getState();
    if (inputValue !== "") {
        let totalItems = arraytProcessed.concat(arraytToOutline);
        let processed = totalItems.find(item => item.houseNo == inputValue);
        if (processed == undefined) {

            let matchingElement = arrayBoxes?.find(item => item.houseNo == inputValue);

            if (matchingElement != undefined) {
                if (matchingElement.statusId === 2 || matchingElement.statusId === 1) {
                    if (matchingElement.statusId === 1) {
                        showAlert("Esa caja ya está procesada", "warning");
                    } else if (matchingElement.statusId === 2) {
                        showAlert("Esa caja ya está procesada, pero debe enviarla para preinspección", "warning");
                    }
                    await playErrorSound();
                    return false;
                } else if (matchingElement.toOutline) {
                    matchingElement.statusId = 2;
                    await loadDataToServer(matchingElement);
                    useStore.setState(prevState => ({
                        tBoxesStatusOutline: prevState.tBoxesStatusOutline + 1,
                        tHousesInOutline: prevState.tHousesInOutline + 1,
                        tBoxesMissing: prevState.tBoxesMissing - 1
                    }));
                    return true;
                } else {
                    matchingElement.statusId = 1;
                    await loadDataToServer(matchingElement);
                    useStore.setState(prevState => ({
                        tBoxesMissing: prevState.tBoxesMissing - 1,
                        tBoxesStatusProcessed: prevState.tBoxesStatusProcessed + 1
                    }));
                    return true;
                }
            }
            else {
                await playErrorSound();
                showAlert("Caja no existe!", "error")
                return false;
            }
        }
        else {
            await playErrorSound();
            showAlert("Esa caja fue procesada hace un momento!", "error")
            return true;
        }
    }
    return false;
};