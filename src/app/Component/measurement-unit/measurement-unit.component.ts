import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { PaginationComponent } from '../../Shared/pagination/pagination.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MeasurementUnitFilterDto, MeasurementUnitRequestDto } from '../../Model/MeasurementUnit';
import { UserResponseDto } from '../../Model/UserResponseDto';
import { AGGridHelper } from '../../Shared/Service/AGGridHelper';
import { AuthService } from '../../Shared/Service/auth.service';
import { CommonHelper } from '../../Shared/Service/common-helper.service';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';

@Component({
  selector: 'app-measurement-unit',
  standalone: true,
  imports: [CommonModule, FormsModule, AgGridAngular, PaginationComponent],
  templateUrl: './measurement-unit.component.html',
  styleUrl: './measurement-unit.component.scss',
    providers: [DatePipe]
})
export class MeasurementUnitComponent implements OnInit {

  private measurementunitGridApi!: any;
  public DeafultCol = AGGridHelper.DeafultCol;
  public rowData!: any[];
  public oMeasurementUnitFilterDto = new MeasurementUnitFilterDto();
  public oMeasurementUnitRequestDto = new MeasurementUnitRequestDto();
  public oCurrentUser = new UserResponseDto();

  public measurementunitId = 0;
  // pagination setup
  public pageIndex: number = 1;
  public totalRecords: number = 0;
  public totalPages: number = 0;


  public colDefsTransection: any[] = [
    { valueGetter: "node.rowIndex + 1", headerName: 'SL', width: 90, editable: false, checkboxSelection: false },
    { field: 'unitName', width: 150, headerName: 'Name', filter: true },
    { field: 'unitType', width: 150, headerName: 'Unit Type', filter: true },
    { field: 'isRound', width: 150, headerName: 'Is Round', filter: true },
    { field: 'symbol', width: 150, headerName: 'Symbol', filter: true },
    { field: 'symbolInBangla', width: 150, headerName: 'Symbol In Bangla', filter: true },
    { field: 'isSmallUnit', width: 150, headerName: 'Is Small Unit', filter: true },
    { field: 'remarks', headerName: 'Remarks' },
    { field: 'isActive', headerName: 'Status' },
  ];
  trackByFn: TrackByFunction<any> | any;
  trackByMeasurementUnit: TrackByFunction<any> | any;
  trackByMeasurementUnitFrom: TrackByFunction<any> | any;
  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private router: Router,
    private datePipe: DatePipe) {
    this.oCurrentUser = CommonHelper.GetUser();
  }


  ngOnInit(): void {
    this.GetMeasurementUnit();
  }

  PageChange(event: any) {
    this.pageIndex = Number(event);
    this.GetMeasurementUnit();
  }

  onGridReadyTransection(params: any) {
    this.measurementunitGridApi = params.api;
    this.rowData = [];
  }

  Filter() {
    this.GetMeasurementUnit();
  }

  private GetMeasurementUnit() {

    this.oMeasurementUnitFilterDto.companyId = Number(this.oCurrentUser?.companyId);
    this.oMeasurementUnitFilterDto.isActive = CommonHelper.booleanConvert(this.oMeasurementUnitFilterDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`MeasurementUnit/GetMeasurementUnit?pageNumber=${this.pageIndex}`, this.oMeasurementUnitFilterDto).subscribe(
      (res: any) => {
        this.rowData = res.items;
        this.pageIndex = res.pageIndex;
        this.totalRecords = res.totalRecords;
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }




  public InsertMeasurementUnit() {

    if (this.oMeasurementUnitRequestDto.unitName == "") {
      this.toast.warning("Please enter name", "Warning!!", { progressBar: true });
      return;
    }

    this.oMeasurementUnitRequestDto.companyId = Number(this.oCurrentUser?.companyId);
    this.oMeasurementUnitRequestDto.unitType = Number(this.oMeasurementUnitRequestDto.unitType);
    this.oMeasurementUnitRequestDto.isRound = CommonHelper.booleanConvert(this.oMeasurementUnitRequestDto.isRound);
    this.oMeasurementUnitRequestDto.isSmallUnit = CommonHelper.booleanConvert(this.oMeasurementUnitRequestDto.isSmallUnit);
    this.oMeasurementUnitRequestDto.isActive = CommonHelper.booleanConvert(this.oMeasurementUnitRequestDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`MeasurementUnit/InsertMeasurementUnit`, this.oMeasurementUnitRequestDto).subscribe(
      (res: any) => {
        CommonHelper.CommonButtonClick("closeCommonModel");
        this.GetMeasurementUnit();
        this.toast.success("Data Save Successfully!!", "Success!!", { progressBar: true });
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }

  public UpdateMeasurementUnit() {

    if (this.oMeasurementUnitRequestDto.unitName == "") {
      this.toast.warning("Please enter name", "Warning!!", { progressBar: true });
      return;
    }

    this.oMeasurementUnitRequestDto.companyId = Number(this.oCurrentUser?.companyId);
    this.oMeasurementUnitRequestDto.unitType = Number(this.oMeasurementUnitRequestDto.unitType);
    this.oMeasurementUnitRequestDto.isRound = CommonHelper.booleanConvert(this.oMeasurementUnitRequestDto.isRound);
    this.oMeasurementUnitRequestDto.isSmallUnit = CommonHelper.booleanConvert(this.oMeasurementUnitRequestDto.isSmallUnit);
    this.oMeasurementUnitRequestDto.isActive = CommonHelper.booleanConvert(this.oMeasurementUnitRequestDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`MeasurementUnit/UpdateMeasurementUnit/${this.measurementunitId}`, this.oMeasurementUnitRequestDto).subscribe(
      (res: any) => {
        CommonHelper.CommonButtonClick("closeCommonModel");
        this.GetMeasurementUnit();
        this.toast.success("Data Update Successfully!!", "Success!!", { progressBar: true });
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }
  public DeleteMeasurementUnit() {
    this.oMeasurementUnitRequestDto.isActive = CommonHelper.booleanConvert(this.oMeasurementUnitRequestDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`MeasurementUnit/DeleteMeasurementUnit/${this.measurementunitId}`, this.oMeasurementUnitRequestDto).subscribe(
      (res: any) => {
        CommonHelper.CommonButtonClick("closeCommonDelete");
        this.GetMeasurementUnit();
        this.toast.success("Data Delete Successfully!!", "Success!!", { progressBar: true });
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }
  add() {
    CommonHelper.CommonButtonClick("openCommonModel");
    this.oMeasurementUnitRequestDto = new MeasurementUnitRequestDto();
    this.measurementunitId = 0;
  }

  edit() {
    let getSelectedItem = AGGridHelper.GetSelectedRow(this.measurementunitGridApi);
    if (getSelectedItem == null) {
      this.toast.warning("Please select an item", "Warning!!", { progressBar: true })
    }
    this.measurementunitId = Number(getSelectedItem.id);
    this.oMeasurementUnitRequestDto.unitName = getSelectedItem.unitName;
    this.oMeasurementUnitRequestDto.symbol = getSelectedItem.symbol;
    this.oMeasurementUnitRequestDto.unitType =Number(getSelectedItem.unitType);
    this.oMeasurementUnitRequestDto.symbolInBangla = getSelectedItem.symbolInBangla;
    this.oMeasurementUnitRequestDto.isRound = CommonHelper.booleanConvert(getSelectedItem.isRound);
    this.oMeasurementUnitRequestDto.isSmallUnit = CommonHelper.booleanConvert(getSelectedItem.isSmallUnit);
    this.oMeasurementUnitRequestDto.isActive = CommonHelper.booleanConvert(getSelectedItem.isActive);
    this.oMeasurementUnitRequestDto.remarks = getSelectedItem.remarks;
    CommonHelper.CommonButtonClick("openCommonModel");
  }

  delete() {
    let getSelectedItem = AGGridHelper.GetSelectedRow(this.measurementunitGridApi);
    if (getSelectedItem == null) {
      this.toast.warning("Please select an item", "Warning!!", { progressBar: true })
    }
    this.measurementunitId = Number(getSelectedItem.id);
    this.oMeasurementUnitRequestDto = getSelectedItem;
    CommonHelper.CommonButtonClick("openCommonDelete");
  }


}

