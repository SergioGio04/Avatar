import { CommonModule } from '@angular/common';
import { Component, Injector } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Bottle } from '../models/bottle';
import { BottleService } from '../services/bottle.service';
import { BottleParams } from '../models/bottle-params';
import { DetailBaseComponent } from '../../abstracts/detail-base.component';
import { CategoryServiceService } from '../../category/category-service.service';
import { Category } from '../../category/category';
import { MatSelectModule } from '@angular/material/select';
import { HtmlGeneratorComponent } from '../../html-generator/html-generator.component';

@Component({
  selector: 'app-bottle-detail',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, CommonModule, HtmlGeneratorComponent, MatSelectModule],
  templateUrl: './bottle-detail.component.html',
  styleUrl: './bottle-detail.component.scss'
})
export class BottleDetailComponent extends DetailBaseComponent<Bottle, BottleService, BottleParams> {
  
  listCategories:Category[];
  selectedId:string|undefined;

  constructor(
    injector: Injector,
    private bottleService: BottleService,
    private categoryService: CategoryServiceService, 
    protected activatedRoute: ActivatedRoute
  ) {
    super(injector);
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    let defaultSelectConfig= { enabled: true, value:"0", label:"niente" };
    this.listCategories= await this.categoryService.getListCategories(defaultSelectConfig);
    
    this.activatedRoute.params.subscribe( (params:any) => {
      if(params[this.getParamsId()]=="0"){
        this.selectedId= this.listCategories[0].id;
      }
    });
  }

  override initializationForm(): void {
    this.form.addControl("brand", new UntypedFormControl(undefined));
    this.form.addControl("cost", new UntypedFormControl(undefined));
    this.form.addControl("categoryId",  new UntypedFormControl(undefined));
  }
  override getParamsId(): string {
    return "idBottle";
  }
  override getModel(json?: any): Bottle {
    return new Bottle(json);
  }
  override getService(): BottleService {
    return this.bottleService;
  }


}
