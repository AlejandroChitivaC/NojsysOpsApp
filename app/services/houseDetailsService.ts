import axios from 'axios';
import { showAlert } from './alertService';
import { ApiResponse } from '@/app/entities/ApiResponse';
import { HouseDetail } from '@/app/entities/HouseDetail';
const { EXPO_PUBLIC_API_URL } = process.env;
export const fetchHouseDetails = async (houseNo: string): Promise<HouseDetail | null> => {
    console.log(EXPO_PUBLIC_API_URL);
    try {
        const response = await axios.get<ApiResponse<HouseDetail>>(`${EXPO_PUBLIC_API_URL}/houses/details/${houseNo}`);
        if (response.data.isValid && response.data.dataSingle) {
            console.log(response.data.dataSingle);
            return response.data.dataSingle;
        } else {
            showAlert("No se encontró la información de la guía.", "error");
            return null;
        }
    } catch (error) {
        showAlert("Ocurrió un error al traer la información de la guía.", "error");
        return null;
    }
};
