import axios from 'axios';
import { showAlert } from './alertService';
import { ApiResponse } from '@/app/entities/ApiResponse';
import { Dispatch } from '@/app/entities/Dispatch'; // Asegúrate de que esta ruta y nombre sean correctos

const { EXPO_PUBLIC_API_URL_DISPATCH } = process.env;

export const fetchOpenDispatch = async (): Promise<Dispatch[] | null> => {
    try {
        const response = await axios.get<ApiResponse<Dispatch[]>>(`${EXPO_PUBLIC_API_URL_DISPATCH}/dispatchS`);
        // const response = await axios.get<ApiResponse<Dispatch[]>>("https://localhost:44329/api/Dispatch/dispatchs");
        console.log(response);
        if (response.data.isValid && response.data.dataSingle) {
            console.log(response.data.dataSingle);
            return response.data.dataSingle;
        } else {
            showAlert("No se encontraron despachos abiertos.", "error");
            return null;
        }
    } catch (error) {
        showAlert("Ocurrió un error al traer la información de despachos abiertos.", "error");
        return null;
    }
};
