export class BannerFilterRequestDto {
  constructor() {
    this.name = '';
    this.typeTag = '';
    this.companyId = 0;
    this.isActive = true;
  }
  public name: string;
  public typeTag: string;
  public companyId: number;
  public isActive: boolean;
}

export class BannerRequestDto {
  constructor() {
    this.name = '';
    this.title = '';
    this.typeTag = '';
    this.description = '';
    this.companyId = 0;
    this.fileId = 0;
    this.parentId = 0;
    this.sequenceNo = 0;
    this.isActive = true;
    this.remarks = '';
  }
  public name: string;
  public title: string;
  public typeTag: string;
  public description: string;
  public remarks: string;
  public companyId: number;
  public fileId: number;
  public parentId: number;
  public sequenceNo: number;
  public isActive: boolean;
}
