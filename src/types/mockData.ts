export interface Extraction {
    page: number;
    content: string;
}

export interface Document {
    fileName: string;
    uploadDate: Date;
    filePath: string;
    extractions: Extraction[];
}