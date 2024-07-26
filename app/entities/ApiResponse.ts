export interface ApiResponse<T> {
    isValid: boolean;
    message: string;
    dataSingle: T;
}