import { Master } from "@/app/entities/Master";

export interface HouseDetail {
    houseId: number;
    entryManifestId: number;
    houseNo: string;
    dateCreation: string;
    senderName: string;
    senderContact: string;
    senderEmail: string;
    senderAddress: string;
    senderZipcode: string;
    senderCity: string;
    senderState: string;
    senderCountry: string;
    senderPhone: string;
    recipientName?: string; 
    recipientEmail: string;
    recipientAddress: string;
    recipientZipcode: string;
    recipientCity: string;
    recipientState: string;
    recipientCountry: string;
    recipientPhone?: string; 
    contents: string;
    pieces: number;
    deliveredPieces: number;
    weightLbs: number;
    weightKgs: number;
    declaredValue: number;
    comments?: string; // Puede ser null o undefined
    tariffCode: string;
    freight?: number; // Puede ser null o undefined
    insurance: number;
    cif: number;
    rate: number;
    baseTariff: number;
    percentageTariff: number;
    tariff: number;
    baseIva: number;
    percentageIva: number;
    iva: number;
    taxesTotal: number;
    number1166: string;
    trm: number;
    dateLiquidate?: string; 
    payDian: boolean;
    datePayDian?: string;
    contribution: number;
    clearance: number;
    readJustmentId?: number; 
    dispatchId?: number;
    entryManifest?: []; 
    master?: Master; 
}
