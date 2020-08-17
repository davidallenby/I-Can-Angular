import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HomeService } from './services/home.service';
import { Owner } from '@core/services/owner';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListComponent } from '@shared/components/list/list.component';

const mockOwners: Owner[] = [
  {
    name: 'Turner',
    gender: 'Male',
    age: 40,
    pets: [
      {
        name: 'Garfield',
        type: 'Cat'
      },
      {
        name: 'Hooch',
        type: 'Dog'
      }
    ]
  },
  {
    name: 'Sarah',
    gender: 'Female',
    age: 32,
    pets: [
      {
        name: 'Garfield',
        type: 'Cat'
      }
    ]
  }
];

const homeServiceSpy = jasmine.createSpyObj(HomeService, ['getOwners']);


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let homeSrv: HomeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent, ListComponent],
      providers: [
        {provide: HomeService, usevalue: homeServiceSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    homeSrv = TestBed.inject(HomeService);
    spyOn(homeSrv, 'getOwners').and.returnValue(of(mockOwners));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title of "AGL Developer Test!"', () => {
    const titleContent = fixture.nativeElement.querySelector('h1').textContent;
    expect(titleContent).toBe('AGL Developer Test! 🐶');
  });

  it('should have two lists', () => {
    const compiled = fixture.elementRef.nativeElement;
    const lists = compiled.querySelectorAll('app-list');
    expect(lists.length).toBe(2);
  });

  it('should have a list titled "Male" and a list titled "Female"', () => {
    const compiled = fixture.elementRef.nativeElement;
    const list = compiled.querySelectorAll('app-list');
    expect(list[0].querySelector('p').textContent).toBe('Male');
    expect(list[1].querySelector('p').textContent).toBe('Female');
  });

  it('each list should have an item with the text "Garfield"', () => {
    const compiled = fixture.elementRef.nativeElement;
    const list = compiled.querySelectorAll('app-list');
    list.forEach(element => {
      console.log(element.querySelector('ul li'));
      expect(element.querySelector('ul li').innerHTML).toBe('Garfield');
    });
  });

});
