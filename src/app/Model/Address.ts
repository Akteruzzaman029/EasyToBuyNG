export class AddressFilterDto {
    constructor() {

        this.userId = "";
        this.pickerName = "";
        this.pickerNumber = "";
        this.streetAddress = "";
        this.building = "";
        this.city = "";
        this.state = "";
        this.zipCode = "";
        this.isDefault = true;
        this.remarks = "";
        this.isActive = true;
    }
    public userId: string;
    public pickerName: string;
    public pickerNumber: string;
    public streetAddress: string;
    public building: string;
    public city: string;
    public state: string;
    public zipCode: string;
    public isDefault: boolean;
    public remarks: string;
    public isActive: boolean;
}

export class AddressRequestDto {

    constructor() {
        this.userId = "";
        this.pickerName = "";
        this.pickerNumber = "";
        this.streetAddress = "";
        this.building = "";
        this.city = "";
        this.state = "";
        this.zipCode = "";
        this.isDefault = true;
        this.remarks = "";
        this.isActive = true;
    }
    public userId: string;
    public pickerName: string;
    public pickerNumber: string;
    public streetAddress: string;
    public building: string;
    public city: string;
    public state: string;
    public zipCode: string;
    public isDefault: boolean;
    public remarks: string;
    public isActive: boolean;
}