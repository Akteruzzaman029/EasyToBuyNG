import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TrackByFunction,
} from '@angular/core';
import { AddressRequestDto, AddressFilterDto } from '../../Model/Address';
import { CommonHelper } from '../../Shared/Service/common-helper.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Shared/Service/auth.service';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';
import { UserResponseDto } from '../../Model/UserResponseDto';
import { FormsModule } from '@angular/forms';
import { AGGridHelper } from '../../Shared/Service/AGGridHelper';

@Component({
  selector: 'app-delivery-address',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './delivery-address.component.html',
  styleUrl: './delivery-address.component.scss',
  providers:[DatePipe]
})
export class DeliveryAddressComponent implements OnInit {
  @Output() deliveryAddress = new EventEmitter<any>();
  private addressGridApi!: any;
  public DeafultCol = AGGridHelper.DeafultCol;
  public rowData: any[]=[];
  public oAddressFilterDto = new AddressFilterDto();
  public oAddressRequestDto = new AddressRequestDto();
  public oCurrentUser = new UserResponseDto();

  public defaultAddress: any;

  public addressId = 0;
  // pagination setup
  public pageIndex: number = 1;
  public totalRecords: number = 0;
  public totalPages: number = 0;

  trackByFn: TrackByFunction<any> | any;
  trackByAddress: TrackByFunction<any> | any;
  trackByAddressFrom: TrackByFunction<any> | any;
  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private router: Router,
    private datePipe: DatePipe,
  ) {
    this.oCurrentUser = CommonHelper.GetUser();
  }

  ngOnInit(): void {
    this.GetAddress();
  }

  PageChange(event: any) {
    this.pageIndex = Number(event);
    this.GetAddress();
  }

  Filter() {
    this.GetAddress();
  }

  ChangeAddress() {
    this.addressId = 0;
  }

  private GetAddress() {
    this.oAddressFilterDto.isActive = CommonHelper.booleanConvert(
      this.oAddressFilterDto.isActive,
    );
    this.oAddressFilterDto.userId = this.oCurrentUser.userId;
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `Address/GetAddress?pageNumber=${this.pageIndex}`,
        this.oAddressFilterDto,
      )
      .subscribe(
        (res: any) => {
          this.rowData = res.items.length>0 ?res.items:[];
          if( this.rowData?.length>0){
            this.defaultAddress = this.rowData.find((x) => x.isDefault == true);
            this.deliveryAddress.emit(this.defaultAddress);
          }else{
            this.defaultAddress=null;
          }
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }

  public InsertAddress() {
    this.oAddressRequestDto.userId = this.oCurrentUser.userId;
    this.oAddressRequestDto.isDefault = CommonHelper.booleanConvert(
      this.oAddressRequestDto.isDefault,
    );
    this.oAddressRequestDto.isActive = true;
    // After the hash is generated, proceed with the API call
    this.http.Post(`Address/InsertAddress`, this.oAddressRequestDto).subscribe(
      (res: any) => {
        CommonHelper.CommonButtonClick('closeCommonModel');
        this.GetAddress();
        this.toast.success('Data Save Successfully!!', 'Success!!', {
          progressBar: true,
        });
      },
      (err) => {
        this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
      },
    );
  }

  public UpdateAddress() {
    // if (this.oAddressRequestDto.name == "") {
    //   this.toast.warning("Please enter name", "Warning!!", { progressBar: true });
    //   return;
    // }

    this.oAddressRequestDto.isActive = CommonHelper.booleanConvert(
      this.oAddressRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(`Address/UpdateAddress/${this.addressId}`, this.oAddressRequestDto)
      .subscribe(
        (res: any) => {
          CommonHelper.CommonButtonClick('closeCommonModel');
          this.GetAddress();
          this.toast.success('Data Update Successfully!!', 'Success!!', {
            progressBar: true,
          });
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }
  public DeleteAddress() {
    this.oAddressRequestDto.isActive = CommonHelper.booleanConvert(
      this.oAddressRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(`Address/DeleteAddress/${this.addressId}`, this.oAddressRequestDto)
      .subscribe(
        (res: any) => {
          CommonHelper.CommonButtonClick('closeCommonDelete');
          this.GetAddress();
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
    this.oAddressRequestDto = new AddressRequestDto();
    this.addressId = 0;
  }

  edit() {
    let getSelectedItem = AGGridHelper.GetSelectedRow(this.addressGridApi);
    if (getSelectedItem == null) {
      this.toast.warning('Please select an item', 'Warning!!', {
        progressBar: true,
      });
    }
    this.addressId = Number(getSelectedItem.id);
    this.oAddressRequestDto.pickerName = getSelectedItem.pickerName;
    this.oAddressRequestDto.pickerNumber = getSelectedItem.pickerNumber;
    this.oAddressRequestDto.streetAddress = getSelectedItem.streetAddress;
    this.oAddressRequestDto.building = getSelectedItem.building;
    this.oAddressRequestDto.city = getSelectedItem.city;
    this.oAddressRequestDto.state = getSelectedItem.state;
    this.oAddressRequestDto.zipCode = getSelectedItem.zipCode;
    this.oAddressRequestDto.isActive = true;
    this.oAddressRequestDto.isDefault = CommonHelper.booleanConvert(
      getSelectedItem.isDefault,
    );
    this.oAddressRequestDto.remarks = getSelectedItem.remarks;
    CommonHelper.CommonButtonClick('openCommonModel');
  }

  delete() {
    let getSelectedItem = AGGridHelper.GetSelectedRow(this.addressGridApi);
    if (getSelectedItem == null) {
      this.toast.warning('Please select an item', 'Warning!!', {
        progressBar: true,
      });
    }
    this.addressId = Number(getSelectedItem.id);
    this.oAddressRequestDto = getSelectedItem;
    CommonHelper.CommonButtonClick('openCommonDelete');
  }
}
