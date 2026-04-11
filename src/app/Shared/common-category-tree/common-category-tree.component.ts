import { FlatTreeControl } from '@angular/cdk/tree';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import {
  NzTreeFlatDataSource,
  NzTreeFlattener,
  NzTreeViewModule,
} from 'ng-zorro-antd/tree-view';
import { CategoryFilterRequestDto } from '../../Model/Category';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../Service/auth.service';
import { CommonHelper } from '../Service/common-helper.service';
import { HttpHelperService } from '../Service/http-helper.service';
import { Store } from '@ngrx/store';
import {
  selectCategoryTree,
  selectCategoryTreeLoading,
  selectCategoryTreeError,
  selectShouldLoadCategoryTree,
} from '../../store/Category/category.selector';
import { take } from 'rxjs';
import { loadCategoryTree } from '../../store/Category/category.action';

interface ApiCategoryNode {
  id: number;
  parentId: number;
  productCount?: number;
  name: string;
  hasChild?: boolean;
  icon?: string;
  isActive?: boolean;
  sequenceNo?: number;
}

interface TreeNode {
  id: number;
  parentId: number;
  productCount?: number;
  name: string;
  icon?: string;
  isActive?: boolean;
  children?: TreeNode[];
}

interface FlatNode {
  id: number;
  parentId: number;
  productCount?: number;
  expandable: boolean;
  name: string;
  icon?: string;
  isActive?: boolean;
  level: number;
}

@Component({
  selector: 'app-common-category-tree',
  standalone: true,
  imports: [
    FormsModule,
    NzIconModule,
    NzSwitchModule,
    NzIconModule,
    NzTreeViewModule,
  ],
  templateUrl: './common-category-tree.component.html',
  styleUrl: './common-category-tree.component.scss',
  providers: [DatePipe],
})
export class CommonCategoryTreeComponent implements OnInit, AfterViewInit {
  public categoryList: ApiCategoryNode[] = [];
  @Output() nodeClicked = new EventEmitter<FlatNode | null>();
  showLeafIcon = false;

  private transformer = (node: TreeNode, level: number): FlatNode => ({
    id: node.id,
    parentId: node.parentId,
    productCount: node.productCount,
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    icon: node.icon,
    isActive: node.isActive,
    level,
  });

  treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable,
  );

  treeFlattener = new NzTreeFlattener<TreeNode, FlatNode>(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children ?? [],
  );

  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);
  selectedNode: FlatNode | null = null;

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
  ) {}

  ngOnInit(): void {
    this.getCategoryTree();

    this.categoryTree$.subscribe((res) => {
      this.categoryList = Array.isArray(res) ? res : [];
      const treeData = this.buildTree(this.categoryList);
      this.dataSource.setData(treeData);
      console.log('common category tree component:', res);
    });

    this.error$.subscribe((err) => {
      if (err) {
        this.toast.error(err, 'Error!!', { progressBar: true });
      }
    });
  }

  ngAfterViewInit(): void {}

  hasChild = (_: number, node: FlatNode): boolean => node.expandable;

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

  private buildTree(data: ApiCategoryNode[]): TreeNode[] {
    const map = new Map<number, TreeNode>();
    const roots: TreeNode[] = [];

    // create all nodes
    for (const item of data) {
      map.set(item.id, {
        id: item.id,
        parentId: item.parentId,
        productCount: item.productCount,
        name: item.name,
        icon: item.icon,
        isActive: item.isActive,
        children: [],
      });
    }

    // assign parent-child
    for (const item of data) {
      const currentNode = map.get(item.id);
      if (!currentNode) continue;

      if (
        item.parentId === 0 ||
        item.parentId === -1 ||
        !map.has(item.parentId)
      ) {
        roots.push(currentNode);
      } else {
        const parentNode = map.get(item.parentId);
        parentNode?.children?.push(currentNode);
      }
    }

    // optional sorting by sequenceNo
    const sequenceMap = new Map<number, number>();
    for (const item of data) {
      sequenceMap.set(item.id, item.sequenceNo ?? 0);
    }

    const sortTree = (nodes: TreeNode[]) => {
      nodes.sort(
        (a, b) => (sequenceMap.get(a.id) ?? 0) - (sequenceMap.get(b.id) ?? 0),
      );

      for (const node of nodes) {
        if (node.children && node.children.length > 0) {
          sortTree(node.children);
        } else {
          delete node.children;
        }
      }
    };
    sortTree(roots);
    return roots;
  }

  onNodeClick(node: FlatNode): void {
    if (this.selectedNode?.id === node.id) {
      this.selectedNode = null; // unselect
      this.nodeClicked.emit(null); // optional, parent কে জানাতে
      return;
    }

    this.selectedNode = node; // select
    this.nodeClicked.emit(node);
  }
}
