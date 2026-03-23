export class BrandFilterDto {
  constructor() {
    this.companyId = 0;
    this.name = '';
    this.isActive = true;
  }
  public companyId: number;
  public name: string;
  public isActive: boolean;
}

export class BrandRequestDto {
  constructor() {
    this.name = '';
    this.icon = '';
    this.sequenceNo = 0;
    this.fileId = 0;
    this.companyId = 0;
    this.isActive = true;
    this.remarks = '';
  }
  public name: string;
  public icon: string;
  public sequenceNo: number;
  public fileId: number;
  public companyId: number;
  public remarks: string;
  public isActive: boolean;
}
