import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySalesReportComponent } from './category-sales-report.component';

describe('CategorySalesReportComponent', () => {
  let component: CategorySalesReportComponent;
  let fixture: ComponentFixture<CategorySalesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorySalesReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorySalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
