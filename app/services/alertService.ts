import { useAlert } from '@/components/AlertContext'; // Ajusta la ruta según tu estructura de proyecto

let showAlertFunction: ((message: string, type?: 'success' | 'error' | 'warning') => void) | null = null;

export const setAlertFunction = (alertFunc: (message: string, type?: 'success' | 'error' | 'warning') => void) => {
    showAlertFunction = alertFunc;
};

export const showAlert = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    if (showAlertFunction) {
        showAlertFunction(message, type);
    } else {
        console.error('showAlertFunction is not set');
    }
};
