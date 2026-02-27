import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrService } from 'ngx-toastr';
import { BannerFilterRequestDto, BannerRequestDto } from '../../Model/Banner';
import { PaginationComponent } from '../../Shared/pagination/pagination.component';
import { AGGridHelper } from '../../Shared/Service/AGGridHelper';
import { AuthService } from '../../Shared/Service/auth.service';
import { CommonHelper } from '../../Shared/Service/common-helper.service';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
     CommonModule,
    FormsModule,
    RouterModule,
    AgGridAngular,
    PaginationComponent,
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',  providers: [DatePipe],
})
export class BannerComponent implements OnInit {
  private BannerGridApi!: any;
  public DeafultCol = AGGridHelper.DeafultCol;
  public rowData!: any[];
  public BannerList: any[] = [];
  public oBannerFilterRequestDto = new BannerFilterRequestDto();
  public oBannerRequestDto = new BannerRequestDto();

  public BannerId = 0;
  // pagination setup
  public pageIndex: number = 1;
  public totalRecords: number = 0;
  public totalPages: number = 0;
  public hasPreviousPage: boolean = false;
  public hasNextPage: boolean = false;
  public totalPageNumbers: number[] = [];

  public colDefsTransection: any[] = [
    {
      valueGetter: 'node.rowIndex + 1',
      headerName: 'SL',
      width: 90,
      editable: false,
      checkboxSelection: false,
    },
    { field: 'name', width: 150, headerName: 'Banner Name', filter: true },
    {
      field: 'subBannerName',
      width: 150,
      headerName: 'Sub Banner Name',
      filter: true,
    },
    { field: 'remarks', headerName: 'Remarks' },
    { field: 'isActive', headerName: 'Status' },
  ];
  trackByFn: TrackByFunction<any> | any;
  trackByBanner: TrackByFunction<any> | any;
  trackByBannerFrom: TrackByFunction<any> | any;
  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private router: Router,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.GetBanners();
    this.GetBanner();
  }

  PageChange(event: any) {
    this.pageIndex = Number(event);
    this.GetBanner();
  }

  onGridReadyTransection(params: any) {
    this.BannerGridApi = params.api;
    this.rowData = [];
  }

  detailToGrid(params: any) {
    const eDiv = document.createElement('div');
    eDiv.innerHTML =
      ' <button class="btn btn-success p-0 px-1"> <i class="bi bi-eye-fill"></i> Detail</button>';
    eDiv.addEventListener('click', () => {
      this.router.navigateByUrl('transactions/' + params.data.transactionId);
    });
    return eDiv;
  }

  Filter() {
    this.GetBanner();
  }

  private GetBanner() {
    let currentUser = CommonHelper.GetUser();
    this.oBannerFilterRequestDto.companyId = Number(currentUser?.companyId);
    this.oBannerFilterRequestDto.isActive = CommonHelper.booleanConvert(
      this.oBannerFilterRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `Banner/GetBanner?pageNumber=${this.pageIndex}`,
        this.oBannerFilterRequestDto,
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          this.rowData = res.items;
          this.pageIndex = res.pageIndex;
          this.totalPages = res.totalPages;
          this.totalRecords = res.totalRecords;
          this.hasPreviousPage = res.hasPreviousPage;
          this.hasNextPage = res.hasNextPage;
          this.totalPageNumbers = CommonHelper.generateNumbers(
            this.pageIndex,
            this.totalPages,
          );
          this.BannerGridApi.sizeColumnsToFit();
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }

  private GetBanners() {
    let currentUser = CommonHelper.GetUser();
    this.oBannerFilterRequestDto.companyId = Number(currentUser?.companyId);
    this.oBannerFilterRequestDto.isActive = CommonHelper.booleanConvert(
      this.oBannerFilterRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(`Banner/GetAllCategories`, this.oBannerFilterRequestDto)
      .subscribe(
        (res: any) => {
          this.BannerList = res;
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }

  public InsertBanner() {
    if (this.oBannerRequestDto.name == '') {
      this.toast.warning('Please enter name', 'Warning!!', {
        progressBar: true,
      });
      return;
    }
    let currentUser = CommonHelper.GetUser();
    this.oBannerRequestDto.companyId = Number(currentUser.companyId);
    this.oBannerRequestDto.parentId = Number(
      this.oBannerRequestDto.parentId,
    );
    this.oBannerRequestDto.isActive = CommonHelper.booleanConvert(
      this.oBannerRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(`Banner/InsertBanner`, this.oBannerRequestDto)
      .subscribe(
        (res: any) => {
          CommonHelper.CommonButtonClick('closeCommonModel');
          this.GetBanner();
          this.toast.success('Data Save Successfully!!', 'Success!!', {
            progressBar: true,
          });
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }

  public UpdateBanner() {
    if (this.oBannerRequestDto.name == '') {
      this.toast.warning('Please enter name', 'Warning!!', {
        progressBar: true,
      });
      return;
    }
    let currentUser = CommonHelper.GetUser();
    this.oBannerFilterRequestDto.companyId = Number(currentUser.companyId);
    this.oBannerRequestDto.isActive = CommonHelper.booleanConvert(
      this.oBannerRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `Banner/UpdateBanner/${this.BannerId}`,
        this.oBannerRequestDto,
      )
      .subscribe(
        (res: any) => {
          CommonHelper.CommonButtonClick('closeCommonModel');
          this.GetBanner();
          this.toast.success('Data Update Successfully!!', 'Success!!', {
            progressBar: true,
          });
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }
  public DeleteBanner() {
    this.oBannerRequestDto.isActive = CommonHelper.booleanConvert(
      this.oBannerRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `Banner/DeleteBanner/${this.BannerId}`,
        this.oBannerRequestDto,
      )
      .subscribe(
        (res: any) => {
          CommonHelper.CommonButtonClick('closeCommonDelete');
          this.GetBanner();
          this.toast.success('Data Delete Successfully!!', 'Success!!', {
            progressBar: true,
          });
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }
  add() {
    CommonHelper.CommonButtonClick('openCommonModel');
    this.oBannerRequestDto = new BannerRequestDto();
    this.BannerId = 0;
  }

  edit() {
    let getSelectedItem = AGGridHelper.GetSelectedRow(this.BannerGridApi);
    if (getSelectedItem == null) {
      this.toast.warning('Please select an item', 'Warning!!', {
        progressBar: true,
      });
    }
    this.BannerId = Number(getSelectedItem.id);
    this.oBannerRequestDto.name = getSelectedItem.name;
    this.oBannerRequestDto.parentId = Number(getSelectedItem.parentId);
    this.oBannerRequestDto.sequenceNo = Number(getSelectedItem.sequenceNo);
    this.oBannerRequestDto.isActive = CommonHelper.booleanConvert(
      getSelectedItem.isActive,
    );
    this.oBannerRequestDto.remarks = getSelectedItem.remarks;
    CommonHelper.CommonButtonClick('openCommonModel');
  }

  delete() {
    let getSelectedItem = AGGridHelper.GetSelectedRow(this.BannerGridApi);
    if (getSelectedItem == null) {
      this.toast.warning('Please select an item', 'Warning!!', {
        progressBar: true,
      });
    }
    this.BannerId = Number(getSelectedItem.id);
    this.oBannerRequestDto.name = getSelectedItem.name;
    this.oBannerRequestDto.parentId = Number(getSelectedItem.parentId);
    this.oBannerRequestDto.sequenceNo = Number(getSelectedItem.sequenceNo);
    this.oBannerRequestDto.isActive = getSelectedItem.isActive;
    this.oBannerRequestDto.remarks = getSelectedItem.remarks;
    CommonHelper.CommonButtonClick('openCommonDelete');
  }

  public onFileChange(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.http.UploadFile(`UploadedFile/Upload`, file).subscribe(
        (res: any) => {
          this.oBannerRequestDto.fileId = res.id;
        },
        (err) => {
          console.log(err.ErrorMessage);
        },
      );
    }
  }

  public onPreviousPage(): void {
    if (this.hasPreviousPage) {
      this.pageIndex--;
      this.GetBanner();
    }
  }

  public onPage(pageNumber: number): void {
    if (this.hasNextPage) {
      this.pageIndex = pageNumber;
      this.GetBanner();
    }
  }

  public onNextPage(): void {
    if (this.hasNextPage) {
      this.pageIndex++;
      this.GetBanner();
    }
  }
}
