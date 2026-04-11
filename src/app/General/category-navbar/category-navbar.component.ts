import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';
import { AuthService } from '../../Shared/Service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonHelper } from '../../Shared/Service/common-helper.service';
import { CategoryFilterRequestDto } from '../../Model/Category';
import { Store } from '@ngrx/store';
import {
  selectCategoryTree,
  selectCategoryTreeLoading,
  selectCategoryTreeError,
  selectShouldLoadCategoryTree,
} from '../../store/Category/category.selector';
import { take } from 'rxjs';
import { loadCategoryTree } from '../../store/Category/category.action';

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

  private store = inject(Store);
  categoryTree$ = this.store.select(selectCategoryTree);
  loading$ = this.store.select(selectCategoryTreeLoading);
  error$ = this.store.select(selectCategoryTreeError);

  oCategoryFilterRequestDto: any = {
    companyId: 0,
    parentId: -1,
    isActive: true,
  };

  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private router: Router,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.getCategoryTree();

    this.categoryTree$.subscribe((res) => {
      this.megaMenus = this.buildMenu(res);
      console.log('category navbar component:', res);
    });

    this.error$.subscribe((err) => {
      if (err) {
        this.toast.error(err, 'Error!!', { progressBar: true });
      }
    });
  }

  ngOnDestroy(): void {
    this.cancelClose();
  }

  private getCategoryTree(): void {
    this.oCategoryFilterRequestDto = {
      ...this.oCategoryFilterRequestDto,
      companyId: Number(CommonHelper.GetComapyId()),
      parentId: -1,
      isActive: CommonHelper.booleanConvert(
        this.oCategoryFilterRequestDto.isActive,
      ),
    };

    this.store
      .select(selectShouldLoadCategoryTree(this.oCategoryFilterRequestDto))
      .pipe(take(1))
      .subscribe((shouldLoad) => {
        if (shouldLoad) {
          this.store.dispatch(
            loadCategoryTree({ filter: this.oCategoryFilterRequestDto }),
          );
        }
      });
  }

  // 🔥 Convert API → Menu
  buildMenu(data: any[]): any[] {
    const active = data.filter((x) => x.isActive);

    const parents = active
      .filter((x) => x.parentId === 0)
      .sort((a, b) => a.sequenceNo - b.sequenceNo);

    const children = active.filter((x) => x.parentId !== 0);

    return parents.map((parent) => {
      const childList = children
        .filter((x) => x.parentId === parent.id)
        .sort((a, b) => a.sequenceNo - b.sequenceNo);

      return {
        id: parent.id,
        parentId: parent.parentId,
        title: parent.name,
        columns: this.makeColumns(childList),
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
        items: group,
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
          categoryId: item.id,
        },
      });
    } else {
      this.router.navigate(['/product-category'], {
        queryParams: {
          categoryId: item.parentId,
          subCategoryId: item.id,
        },
      });
    }

    this.closeMenu();
  }
}
