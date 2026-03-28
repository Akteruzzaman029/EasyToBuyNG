import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';
import { AuthService } from '../../Shared/Service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonHelper } from '../../Shared/Service/common-helper.service';
import { CategoryFilterRequestDto } from '../../Model/Category';

@Component({
  selector: 'app-category-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NzMenuModule,
    NzIconModule,
  ],
  templateUrl: './category-navbar.component.html',
  styleUrl: './category-navbar.component.scss',
})
export class CategoryNavbarComponent implements OnInit, OnDestroy {
  megaMenus: any[] = [];
  activeMegaMenu: any | null = null;
  private closeTimeout: any;
  public oCategoryFilterRequestDto = new CategoryFilterRequestDto();
  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private router: Router,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.GetCategoryTree();
  }

  ngOnDestroy(): void {
    this.cancelClose();
  }

  // 🔥 Load from API
  private GetCategoryTree() {
    let currentUser = CommonHelper.GetUser();
    this.oCategoryFilterRequestDto.companyId = Number(currentUser?.companyId);
    this.oCategoryFilterRequestDto.parentId = -1;
    this.oCategoryFilterRequestDto.isActive = CommonHelper.booleanConvert(
      this.oCategoryFilterRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(`Category/GetCategoryTree`, this.oCategoryFilterRequestDto)
      .subscribe(
        (res: any) => {
          this.megaMenus = this.buildMenu(res);
          console.log(this.megaMenus);
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }


  // 🔥 Convert API → Menu
  buildMenu(data: any[]): any[] {
    const active = data.filter(x => x.isActive);

    const parents = active
      .filter(x => x.parentId === 0)
      .sort((a, b) => a.sequenceNo - b.sequenceNo);

    const children = active.filter(x => x.parentId !== 0);

    return parents.map(parent => {
      const childList = children
        .filter(x => x.parentId === parent.id)
        .sort((a, b) => a.sequenceNo - b.sequenceNo);

      return {
        id: parent.id,
        parentId: parent.parentId,
        title: parent.name,
        columns: this.makeColumns(childList)
      };
    });
  }

  // 🔥 Split into columns
  makeColumns(children: any[]): any[] {
      const groupSize = 6;
    const columns: any[] = [];

    for (let i = 0; i < children.length; i += groupSize) {
      const group = children.slice(i, i + groupSize);

      columns.push({
        title: group[0]?.subCategoryName || 'Category',
        items: group
      });
    }

    return columns;
  }

  openMenu(menu: any): void {
    this.cancelClose();
    this.activeMegaMenu = menu;
  }

  scheduleClose(): void {
    this.cancelClose();
    this.closeTimeout = setTimeout(() => {
      this.activeMegaMenu = null;
    }, 200);
  }

  cancelClose(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  closeMenu(): void {
    this.activeMegaMenu = null;
  }

  goToCategory(item: any): void {
    if (item.parentId === 0) {
      this.router.navigate(['/product-category'], {
        queryParams: {
          categoryId: item.id
        }
      });
    } else {
      this.router.navigate(['/product-category'], {
        queryParams: {
          categoryId: item.parentId,
          subCategoryId: item.id
        }
      });
    }

    this.closeMenu();
  }
}
