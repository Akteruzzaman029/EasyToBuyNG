export class WebsiteSectionFilterDto {
    constructor() {
        this.name = '';
        this.headerName = '';
        this.isActive = true;
    }
    public name: string;
    public headerName: string;
    public isActive: boolean;
}

export class WebsiteSectionRequestDto {
    constructor() {
        this.name = '';
        this.headerName = '';
        this.sequenceNo = 0;
        this.fileId = 0;
        this.remarks = '';
        this.isActive = true;
        this.userId = '';
    }
    public name: string;
    public headerName: string;
    public sequenceNo: number;
    public fileId: number;
    public remarks: string;
    public isActive: boolean;
    public userId: string; 
}