import {DepartmentService} from './department.service';
import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('DepartmentService', () => {
  let injector: TestBed;
  let service: DepartmentService;
  let httpMock: HttpTestingController;

  const dummyDepartments = [
    {employees: [], id: 1, name: 'DUMMY-NAME-1'},
    {employees: [], id: 2, name: 'DUMMY-NAME-2'}
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DepartmentService]
    }).compileComponents();
    injector = getTestBed();
    service = injector.inject(DepartmentService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  describe('#getAllDepartments', () => {
    it('should return a Observable<Department[]>', () => {
      service.getAllDepartments().subscribe(departments => {
        expect(departments.length).toBe(2);
        expect(departments).toEqual(dummyDepartments);
        console.log(departments);
      });

      const req = httpMock.expectOne(service.getUrl());
      expect(req.request.method).toBe('GET');
      req.flush(dummyDepartments);
    });
  });

  describe('#getDepartmentById', () => {
    it('should return a Observable<Department>', () => {
      service.getDepartmentById(1).subscribe(department => {
        expect(department.id).toBe(1);
        expect(department.name).toBe('DUMMY-NAME-1');
        expect(department.employees.length).toBe(0);
      });

      const req = httpMock.expectOne(service.getUrl() + '1');
      expect(req.request.method).toBe('GET');
      req.flush(dummyDepartments[0]);
    });
  });
});
