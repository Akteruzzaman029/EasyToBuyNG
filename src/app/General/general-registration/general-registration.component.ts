import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AspNetUsersRequestDto } from '../../Model/AspNetUsers';
import { AuthService } from '../../Shared/Service/auth.service';
import { CommonHelper } from '../../Shared/Service/common-helper.service';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';

@Component({
  selector: 'app-general-registration',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './general-registration.component.html',
  styleUrl: './general-registration.component.scss',
  providers: [ToastrService]
})
export class GeneralRegistrationComponent {
  public oAspNetUsersRequestDto = new AspNetUsersRequestDto();
  currentRole: any;
  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private route: Router,
    private datePipe: DatePipe) {
    this.currentRole = authService.GetCurrentUserRole();
  }

  Registration() {

    this.oAspNetUsersRequestDto.fullName = this.oAspNetUsersRequestDto.firstName + " " + this.oAspNetUsersRequestDto.lastName
    if (this.oAspNetUsersRequestDto.fullName == "") {
      this.toast.warning("Please enter fullName", "Warning!!", { progressBar: true });
      return;
    }

    if (this.oAspNetUsersRequestDto.email == "") {
      this.toast.warning("Please enter email", "Warning!!", { progressBar: true });
      return;
    }
    if (!CommonHelper.IsValidEmail(this.oAspNetUsersRequestDto.email)) {
      this.toast.warning("Please enter valid email.", "Warning!!", { progressBar: true });
      return;
    }

    if (this.oAspNetUsersRequestDto.phoneNumber == "") {
      this.toast.warning("Please enter phone number", "Warning!!", { progressBar: true });
      return;
    }
    if (!CommonHelper.isValidNumber(this.oAspNetUsersRequestDto.phoneNumber)) {
      this.toast.warning("Number must be exactly 11 digits.", "Warning!!", { progressBar: true });
      return;
    }

    if (this.oAspNetUsersRequestDto.password == "") {
      this.toast.warning("Please enter password", "Warning!!", { progressBar: true });
      return;
    }

    if (this.oAspNetUsersRequestDto.confirmPassword == "") {
      this.toast.warning("Please enter confirm password", "Warning!!", { progressBar: true });
      return;
    }

    let currentUser = CommonHelper.GetUser();
    this.oAspNetUsersRequestDto.type = 5;

    // After the hash is generated, proceed with the API call
    this.http.Post(`AspNetUsers/InsertAspNetUsers`, this.oAspNetUsersRequestDto).subscribe(
      (res: any) => {
        debugger
        this.toast.success("Data Save Successfully!!", "Success!!", { progressBar: true });
        this.oAspNetUsersRequestDto = new AspNetUsersRequestDto();
        this.route.navigateByUrl("/login");

      },
      (err) => {

        this.toast.error(err.error.message, "Error!!", { progressBar: true });
      }
    );
  }
}
