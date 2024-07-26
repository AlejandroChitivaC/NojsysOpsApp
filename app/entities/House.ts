export class House {
    houseId: number;
    houseNo: string;
    statusId: number;
    masterId: number;
    dispatchId: number;
    toOutline: boolean;
    pieces: number;
    processedPieces: number;
    contents: string;
    recipientName: string;
    recipientAddress: string;
    observations: string;
    static houseNo: any;
    static statusId: number;
    static toOutline: any;

    constructor(
        houseId: number,
        houseNo: string,
        statusId: number,
        masterId: number,
        dispatchId: number,
        toOutline: boolean,
        pieces: number,
        processedPieces: number,
        contents: string,
        recipientName: string,
        recipientAddress: string,
        observations: string
    ) {
        this.houseId = houseId;
        this.houseNo = houseNo;
        this.statusId = statusId;
        this.masterId = masterId;
        this.dispatchId = dispatchId;
        this.toOutline = toOutline;
        this.pieces = pieces;
        this.processedPieces = processedPieces;
        this.contents = contents;
        this.recipientName = recipientName;
        this.recipientAddress = recipientAddress;
        this.observations = observations;
    }
}
