import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HomeService } from './services/home.service';
// import { Owner } from '@core/services/owner';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListComponent } from '@shared/components/list/list.component';

// const mockOwners: Owner[] = [
//   {
//     name: 'Turner',
//     gender: 'Male',
//     age: 40,
//     pets: [
//       {
//         name: 'Garfield',
//         type: 'Cat'
//       },
//       {
//         name: 'Hooch',
//         type: 'Dog'
//       }
//     ]
//   },
//   {
//     name: 'Sarah',
//     gender: 'Female',
//     age: 32,
//     pets: [
//       {
//         name: 'Garfield',
//         type: 'Cat'
//       }
//     ]
//   }
// ];

// const homeServiceSpy = jasmine.createSpyObj(HomeService, ['getOwners']);


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let homeSrv: HomeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent, ListComponent],
      providers: [
        // {provide: HomeService, usevalue: homeServiceSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    homeSrv = TestBed.inject(HomeService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
