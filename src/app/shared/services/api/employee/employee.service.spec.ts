import {EmployeeService} from './employee.service';
import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('EmployeeService', () => {
  let injector: TestBed;
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  const dummyEmployees = [
    {uuid: 'ID-1', name: 'John', surname: 'Doe', email: 'johndoe@email.com', phone: '0612345678', gender: 0, place: 'Home', bio: ''},
    {uuid: 'ID-2', name: 'Johnathan', surname: 'Doeno', email: 'jonathan@email.com', phone: '0612345678', gender: 1, place: 'Home', bio: ''}
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService]
    }).compileComponents();
    injector = getTestBed();
    service = injector.inject(EmployeeService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should create', () => {
    expect(service).toBeTruthy();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  describe('#getURL', () => {
    it('should return http://localhost:8008/api/employees/', () => {
      expect(service.getUrl()).toBe('http://localhost:8008/api/employees/');
    });
  });

  describe('#getAllEmployees', () => {
    it('should return a Observable<Employee[]>', () => {
      service.getAllEmployees().subscribe(
        employees => {
          expect(employees.length).toBe(2);
          expect(employees).toEqual(dummyEmployees);
        }, err => {
          console.log('catched');
        });

      const req = httpMock.expectOne(service.getUrl());
      expect(req.request.method).toBe('GET');
      req.flush(dummyEmployees);
    });
  });

  describe('#getEmployeeById', () => {
    it('should return a Observable<Employee>', () => {
      service.getEmployeeById('1').subscribe(
        employee => {
          expect(employee.uuid).toBe('ID-1');
          expect(employee.name).toBe('John');
          expect(employee.surname).toBe('Doe');
          expect(employee.email).toBe('johndoe@email.com');
          expect(employee.phone).toBe('0612345678');
          expect(employee.gender).toBe(0);
          expect(employee.place).toBe('Home');
          expect(employee.bio).toBe('');
        }, _ => {
          console.log('catched');
        });

      const req = httpMock.expectOne(service.getUrl() + '1');
      expect(req.request.method).toBe('GET');
      req.flush(dummyEmployees[0]);
    });
  });
});
