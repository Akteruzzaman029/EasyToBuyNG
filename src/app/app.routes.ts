import { Routes } from '@angular/router';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { LoginComponent } from './Shared/login/login.component';
import { CategoryComponent } from './Component/category/category.component';
import { RegistrationComponent } from './Component/registration/registration.component';
import { LoginGuard } from './Shared/Service/login.guard';
import { HomeComponent } from './Component/home/home.component';
import { AdminComponent } from './Component/admin/admin.component';
import { InstructorComponent } from './Component/instructor/instructor.component';
import { AppointmentComponent } from './Component/appointment/appointment.component';
import { PackageComponent } from './Component/package/package.component';
import { PaymentComponent } from './Component/payment/payment.component';
import { SlotComponent } from './Component/slot/slot.component';
import { SlotAssignmentComponent } from './Component/slot-assignment/slot-assignment.component';
import { UserPackageComponent } from './Component/user-package/user-package.component';
import { UserComponent } from './Component/user/user.component';
import { DrivingComponent } from './DrivingWebsite/driving/driving.component';
import { ContentComponent } from './Component/content/content.component';
import { StudentComponent } from './Component/student/student.component';
import { VehicleComponent } from './Component/vehicle/vehicle.component';
import { BookingComponent } from './Component/booking/booking.component';
import { BookingRescheduleComponent } from './Component/booking-reschedule/booking-reschedule.component';
import { AttendanceComponent } from './Component/attendance/attendance.component';
import { FinalTestResultComponent } from './Component/final-test-result/final-test-result.component';
import { LessonProgresComponent } from './Component/lesson-progres/lesson-progres.component';
import { VehicleAvailabilityComponent } from './Component/vehicle-availability/vehicle-availability.component';
import { BookingProcessComponent } from './Component/booking-process/booking-process.component';
import { AdminRegistrationComponent } from './Component/admin-registration/admin-registration.component';
import { BookingCreateComponent } from './Component/booking-create/booking-create.component';
import { ProgressDetailComponent } from './Component/progress-detail/progress-detail.component';
import { ExpenditureComponent } from './Component/expenditure/expenditure.component';
import { ExpenditureCreateComponent } from './Component/expenditure-create/expenditure-create.component';
import { ExpenditureHeadComponent } from './Component/expenditure-head/expenditure-head.component';
import { ExpenditureHeadCreateComponent } from './Component/expenditure-head-create/expenditure-head-create.component';
import { PackageCreateComponent } from './Component/package-create/package-create.component';
import { SlotCreateComponent } from './Component/slot-create/slot-create.component';
import { DueListComponent } from './Component/due-list/due-list.component';
import { PaymentCollectionReportsComponent } from './Component/payment-collection-reports/payment-collection-reports.component';
import { LessonCreateComponent } from './Component/lesson-create/lesson-create.component';
import { StudentDetailComponent } from './Component/student-detail/student-detail.component';
import { PaymentCreateComponent } from './Component/payment-create/payment-create.component';
import { ProfitAndLossComponent } from './Component/profit-and-loss/profit-and-loss.component';
import { ProfitAndLossDetailComponent } from './Component/profit-and-loss-detail/profit-and-loss-detail.component';
import { CalenderComponent } from './Component/calender/calender.component';
import { DayWiseBookingComponent } from './Component/day-wise-booking/day-wise-booking.component';
import { CheckListComponent } from './Component/check-list/check-list.component';
import { CheckListCreateComponent } from './Component/check-list-create/check-list-create.component';
import { CalenderSlotComponent } from './Component/calender-slot/calender-slot.component';
import { PackTypeComponent } from './Component/pack-type/pack-type.component';
import { MeasurementUnitComponent } from './Component/measurement-unit/measurement-unit.component';
import { ProductComponent } from './Component/product/product.component';
import { OrderPaymentComponent } from './Component/order-payment/order-payment.component';
import { OrderComponent } from './Component/order/order.component';
import { EasyToBuyHomeComponent } from './General/easy-to-buy-home/easy-to-buy-home.component';
import { CheckOutComponent } from './General/check-out/check-out.component';
import { CompanyComponent } from './Component/company/company.component';
import { CheckOutProcessComponent } from './General/check-out-process/check-out-process.component';
import { GeneralRegistrationComponent } from './General/general-registration/general-registration.component';
import { GeneralLoginComponent } from './General/general-login/general-login.component';
import { CustomerOrderComponent } from './General/customer-order/customer-order.component';
import { WebSectionComponent } from './Component/web-section/web-section.component';
import { UserRole } from './Shared/Service/auth.service';
import { authGuard } from './Shared/Service/auth.guard';
import { TermsAndConditionsComponent } from './General/terms-and-conditions/terms-and-conditions.component';
import { AboutUsComponent } from './General/about-us/about-us.component';
import { ShippingAndReturnsComponent } from './General/shipping-and-returns/shipping-and-returns.component';
import { OfficeAddressComponent } from './General/office-address/office-address.component';
import { ContractUsComponent } from './General/contract-us/contract-us.component';
import { ProductCategoryComponent } from './General/product-category/product-category.component';
import { CategoryTreeComponent } from './Component/category-tree/category-tree.component';
import { CommonCategoryTreeComponent } from './Shared/common-category-tree/common-category-tree.component';
import { ProductDetailComponent } from './Component/product-detail/product-detail.component';
import { BannerComponent } from './Component/banner/banner.component';
import { CustomCategoryComponent } from './Component/custom-category/custom-category.component';
import { MyDashboardComponent } from './General/my-dashboard/my-dashboard.component';
import { LoayalityProgramComponent } from './General/loayality-program/loayality-program.component';
import { EVouchersComponent } from './General/evouchers/evouchers.component';
import { MyOrderComponent } from './General/my-order/my-order.component';
import { AccountDetailComponent } from './General/account-detail/account-detail.component';
import { MyAccountHomeComponent } from './General/my-account-home/my-account-home.component';
import { MyAddressComponent } from './General/my-address/my-address.component';
import { CustomCategoryConfigComponent } from './Component/custom-category-config/custom-category-config.component';
import { OrderTypeComponent } from './Component/OrderProcess/order-type/order-type.component';
import { OrderFlowComponent } from './Component/OrderProcess/order-flow/order-flow.component';
import { OrderFlowStageComponent } from './Component/OrderProcess/order-flow-stage/order-flow-stage.component';
import { OrderFlowStageTransitionComponent } from './Component/OrderProcess/order-flow-stage-transition/order-flow-stage-transition.component';
import { OrderTrackingComponent } from './Component/OrderProcess/order-tracking/order-tracking.component';
import { OrderDeliveryChargeDetailComponent } from './Component/OrderProcess/order-delivery-charge-detail/order-delivery-charge-detail.component';
import { OrderChargeAdjustmentComponent } from './Component/OrderProcess/order-charge-adjustment/order-charge-adjustment.component';
import { OrderDeliveryComponent } from './Component/OrderProcess/order-delivery/order-delivery.component';
import { SalesOrderComponent } from './Component/OrderProcess/sales-order/sales-order.component';
import { SalesOrderItemComponent } from './Component/OrderProcess/sales-order-item/sales-order-item.component';
import { CounterComponent } from './store/Counter/counter/counter.component';
import { LocationPickerComponent } from './Component/admin/location-picker/location-picker.component';
import { AdminDashboardComponent } from './Component/admin-dashboard/admin-dashboard.component';
import { QRCodeScannerComponent } from './Component/qrcode-scanner/qrcode-scanner.component';
import { ProductCreateComponent } from './Component/product-create/product-create.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Product',
    data: {
      roles: [
        UserRole.NORMALUSER,
        UserRole.GENERALUSER,
        UserRole.ADMIN,
        UserRole.SYSTEMADMIN,
      ],
    },
    children: [
      {
        path: '',
        component: EasyToBuyHomeComponent,
        title: 'Rongtuli Cosmetics Home',
        data: {
          roles: [UserRole.NORMALUSER, UserRole.ADMIN, UserRole.SYSTEMADMIN],
        },
      },
      {
        path: 'product-category',
        component: ProductCategoryComponent,
        title: 'Product Category',
        data: {
          roles: [UserRole.NORMALUSER, UserRole.ADMIN, UserRole.SYSTEMADMIN],
        },
      },
      {
        path: 'counter',
        component: CounterComponent,
        title: 'Counter',
        data: {
          roles: [UserRole.NORMALUSER, UserRole.ADMIN, UserRole.SYSTEMADMIN],
        },
      },
      {
        path: 'product-detail/:id',
        component: ProductDetailComponent,
        title: 'Product Detail',
        data: {
          roles: [UserRole.NORMALUSER, UserRole.ADMIN, UserRole.SYSTEMADMIN],
        },
      },

      {
        path: 'contact-us',
        component: ContractUsComponent,
        title: 'Contact Us',
        data: {
          roles: [UserRole.NORMALUSER, UserRole.ADMIN, UserRole.SYSTEMADMIN],
        },
      },
      {
        path: 'office-address',
        component: OfficeAddressComponent,
        title: 'Office Address',
        data: {
          roles: [UserRole.NORMALUSER, UserRole.ADMIN, UserRole.SYSTEMADMIN],
        },
      },
      {
        path: 'shipping-returns',
        component: ShippingAndReturnsComponent,
        title: 'Shipping & Returns',
        data: {
          roles: [UserRole.NORMALUSER, UserRole.ADMIN, UserRole.SYSTEMADMIN],
        },
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
        title: 'About Us',
        data: {
          roles: [UserRole.NORMALUSER, UserRole.ADMIN, UserRole.SYSTEMADMIN],
        },
      },
      {
        path: 'terms-and-conditions',
        component: TermsAndConditionsComponent,
        title: 'Terms & Conditions',
        data: {
          roles: [UserRole.NORMALUSER, UserRole.ADMIN, UserRole.SYSTEMADMIN],
        },
      },

      {
        path: 'checkout',
        component: CheckOutComponent,
        title: 'Checkout',
        data: {
          roles: [UserRole.NORMALUSER, UserRole.ADMIN, UserRole.SYSTEMADMIN],
        },
      },
      {
        path: 'checkout-process',
        component: CheckOutProcessComponent,
        title: 'Checkout Process',
        data: {
          roles: [UserRole.NORMALUSER, UserRole.ADMIN, UserRole.SYSTEMADMIN],
        },
      },
      {
        path: 'qrcode-scanner',
        component: QRCodeScannerComponent,
        title: 'QR Code Scanner',
        data: {
          roles: [UserRole.NORMALUSER, UserRole.ADMIN, UserRole.SYSTEMADMIN],
        },
      },
      {
        path: 'registration',
        component: GeneralRegistrationComponent,
        title: 'Registration',
        data: {
          roles: [UserRole.NORMALUSER, UserRole.ADMIN, UserRole.SYSTEMADMIN],
        },
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'Log in User',
        data: {
          roles: [UserRole.NORMALUSER, UserRole.ADMIN, UserRole.SYSTEMADMIN],
        },
      },
      {
        path: 'orders',
        component: CustomerOrderComponent,
        title: 'Order List',
        canActivate: [authGuard],
        data: {
          roles: [UserRole.GENERALUSER, UserRole.ADMIN, UserRole.SYSTEMADMIN],
        },
      },
      { path: 'login', component: GeneralLoginComponent, title: 'Login' },
      {
        path: 'account',
        component: MyAccountHomeComponent,
        title: 'My Account',
        data: {
          roles: [UserRole.GENERALUSER, UserRole.ADMIN, UserRole.SYSTEMADMIN],
        },
        children: [
          {
            path: '',
            component: MyDashboardComponent,
            title: 'My Dashboard',
            data: {
              roles: [
                UserRole.NORMALUSER,
                UserRole.ADMIN,
                UserRole.SYSTEMADMIN,
              ],
            },
          },
          {
            path: 'loyality-program',
            component: LoayalityProgramComponent,
            title: 'Loayality Program',
            data: {
              roles: [
                UserRole.NORMALUSER,
                UserRole.ADMIN,
                UserRole.SYSTEMADMIN,
              ],
            },
          },
          {
            path: 'e-vouchers',
            component: EVouchersComponent,
            title: 'E-Vouchers',
            data: {
              roles: [
                UserRole.NORMALUSER,
                UserRole.ADMIN,
                UserRole.SYSTEMADMIN,
              ],
            },
          },
          {
            path: 'orders',
            component: MyOrderComponent,
            title: 'My Orders',
            data: {
              roles: [
                UserRole.NORMALUSER,
                UserRole.ADMIN,
                UserRole.SYSTEMADMIN,
              ],
            },
          },
          {
            path: 'address',
            component: MyAddressComponent,
            title: 'My Address',
            data: {
              roles: [
                UserRole.NORMALUSER,
                UserRole.ADMIN,
                UserRole.SYSTEMADMIN,
              ],
            },
          },
          {
            path: 'detail',
            component: AccountDetailComponent,
            title: 'Account Detail',
            data: {
              roles: [
                UserRole.NORMALUSER,
                UserRole.ADMIN,
                UserRole.SYSTEMADMIN,
              ],
            },
          },
          
        ],
      },
    ],
  },

  {
    path: 'admin',
    canActivate: [authGuard],
    data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
    component: AdminComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'Log in User' },
      {
        path: 'common-category-tree',
        component: CommonCategoryTreeComponent,
        title: 'Category Tree',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'category-tree',
        component: CategoryTreeComponent,
        title: 'Category Tree',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'registration',
        component: RegistrationComponent,
        canActivate: [LoginGuard],
        title: 'Registration',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        title: 'Dashboard',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },

      {
        path: 'order-type',
        component: OrderTypeComponent,
        title: 'Order Type',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'order-flow',
        component: OrderFlowComponent,
        title: 'Order Flow',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'order-flow-stage',
        component: OrderFlowStageComponent,
        title: 'Order Flow Stage',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'order-flow-stage-transition',
        component: OrderFlowStageTransitionComponent,
        title: 'Order Flow Stage Transition',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'order-tracking',
        component: OrderTrackingComponent,
        title: 'Order Tracking',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'order-delivery-charge-detail',
        component: OrderDeliveryChargeDetailComponent,
        title: 'Order Delivery Charge Detail',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'order-charge-adjustment',
        component: OrderChargeAdjustmentComponent,
        title: 'Order Charge Adjustment',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'order-delivery',
        component: OrderDeliveryComponent,
        title: 'Order Delivery',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'sales-order`',
        component: SalesOrderComponent,
        title: 'Sales Order',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'sales-order-item',
        component: SalesOrderItemComponent,
        title: 'Sales Order Item',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },




      {
        path: 'appointment',
        component: AppointmentComponent,
        title: 'Appointment List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'instructor',
        component: InstructorComponent,
        title: 'Instructor List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'student',
        component: StudentComponent,
        title: 'Student List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'student-detail/:id',
        component: StudentDetailComponent,
        title: 'Student Deatail',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'student-registration/:id/:date',
        component: AdminRegistrationComponent,
        title: 'Registration',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'payment',
        component: PaymentComponent,
        title: 'Payment List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'payment/:id',
        component: PaymentCreateComponent,
        title: 'Payment Create',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'package',
        component: PackageComponent,
        title: 'Package List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'due-list',
        component: DueListComponent,
        title: 'Due List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'profit-loss',
        component: ProfitAndLossComponent,
        title: 'Profit And Loss List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'profit-loss-detail',
        component: ProfitAndLossDetailComponent,
        title: 'Profit And Loss Detail List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'payment-collection-list',
        component: PaymentCollectionReportsComponent,
        title: 'Payment Collection Report',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'package/:id',
        component: PackageCreateComponent,
        title: 'Package Create',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      // { path: 'slot', component: SlotComponent, title: 'Slot List' },
      {
        path: 'slot',
        component: CalenderSlotComponent,
        title: 'Calender Slot List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'slot/:id',
        component: SlotCreateComponent,
        title: 'Slot Create',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      { path: 'content', component: ContentComponent, title: 'Content List' },
      {
        path: 'instructor-availability',
        component: SlotAssignmentComponent,
        title: 'Instructor Availability List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'vehicle-availability',
        component: VehicleAvailabilityComponent,
        title: 'Vehicle Availability List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'user-package',
        component: UserPackageComponent,
        title: 'User Package List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'user',
        component: UserComponent,
        title: 'User List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'vehicle',
        component: VehicleComponent,
        title: 'Vehicle List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'lesson',
        component: BookingComponent,
        title: 'Lesson List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'lesson/:id',
        component: BookingCreateComponent,
        title: 'Lesson Create',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'lesson-create/:id/:date',
        component: LessonCreateComponent,
        title: 'Lesson Create',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'booking-process',
        component: BookingProcessComponent,
        title: 'Booking Process List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'booking-reschedule',
        component: BookingRescheduleComponent,
        title: 'Booking Reschedule List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'attendance',
        component: AttendanceComponent,
        title: 'Attendance List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'final-test-result',
        component: FinalTestResultComponent,
        title: 'FinalTest Result List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'lesson-progres/:id',
        component: LessonProgresComponent,
        title: 'LessonProgres Create',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'progres-detail/:id',
        component: ProgressDetailComponent,
        title: 'LessonProgres Detail',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'expenditure',
        component: ExpenditureComponent,
        title: 'Expenditure',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'expenditure/:id',
        component: ExpenditureCreateComponent,
        title: 'Expenditure Create',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      { path: 'checklist', component: CheckListComponent, title: 'CheckList' },
      {
        path: 'checklist/:id',
        component: CheckListCreateComponent,
        title: 'CheckList Create',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'head',
        component: ExpenditureHeadComponent,
        title: 'Expenditure Head',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'head/:id',
        component: ExpenditureHeadCreateComponent,
        title: ' Expenditure Head Create',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'calender',
        component: CalenderComponent,
        title: ' Calender Create',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'calender/:id',
        component: DayWiseBookingComponent,
        title: ' Calender Create',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },

      {
        path: 'category',
        component: CategoryComponent,
        title: 'Category List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'custom-category',
        component: CustomCategoryComponent,
        title: 'Custom Category List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'custom-category-config',
        component: CustomCategoryConfigComponent,
        title: 'Custom Category Config List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'company',
        component: CompanyComponent,
        title: 'Company List',
        data: { roles: [UserRole.SYSTEMADMIN] },
      },
      { path: 'packType', component: PackTypeComponent, title: ' PackType' },
      {
        path: 'measurement-unit',
        component: MeasurementUnitComponent,
        title: ' Measurement Unit',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'product',
        component: ProductComponent,
        title: ' Product List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'order',
        component: OrderComponent,
        title: ' Order List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'order-payment',
        component: OrderPaymentComponent,
        title: ' Order Payment List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'web-section',
        component: WebSectionComponent,
        title: 'Web Section List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'banner',
        component: BannerComponent,
        title: 'Banner List',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'select-location',
        component: LocationPickerComponent,
        title: 'Location Selection',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      },
      {
        path: 'product-create',
        component: ProductCreateComponent,
        title: 'Product Create',
        data: { roles: [UserRole.ADMIN, UserRole.SYSTEMADMIN] },
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'admin/login',
  },
];
