import { TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/shared/services/api.service';
import { FacultiesService } from './faculties.service';
import { MatDialog } from '@angular/material/dialog';
import { Faculty } from 'src/app/shared/entity.interface';
import { of, Observable } from 'rxjs';

fdescribe('FacultyService', () => {
    const obj: Faculty = {
      faculty_id: 1,
      faculty_name: 'PI',
      faculty_description: 'desc'
    };
    let facultyService: FacultiesService;
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['createEntity', 'updEntity', 'delEntity']);
    const  matDiaglog = jasmine.createSpyObj('MatDiaglog', ['open']);

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          FacultiesService,
          {provide: ApiService, useValue: apiServiceSpy},
          {provide: MatDialog, useValue: matDiaglog}
        ]
      });
      facultyService = TestBed.get(FacultiesService);
    });

    it('should be created', () => {
      expect(facultyService).toBeTruthy();
    });


    describe('Method createFaculty', () => {
      it ('should called ones createEntity', () => {
        facultyService.createFaculty(obj);
        expect(apiServiceSpy.createEntity).toHaveBeenCalledWith('Faculty', obj);
        expect(apiServiceSpy.createEntity).toHaveBeenCalledTimes(1);
       });
    });

    describe('Method updateFaculty', () => {
      it ('should called ones updateEntity', () => {
        facultyService.updateFaculty(obj.faculty_id, obj);
        expect(apiServiceSpy.updEntity).toHaveBeenCalledWith('Faculty', obj, obj.faculty_id);
        expect(apiServiceSpy.updEntity).toHaveBeenCalledTimes(1);
       });
    });

    describe('Method deleteFaculty', () => {
      it ('should called ones delEntity', () => {
        facultyService.deleteFaculty(obj.faculty_id);
        expect(apiServiceSpy.delEntity).toHaveBeenCalledWith('Faculty', obj.faculty_id);
        expect(apiServiceSpy.delEntity).toHaveBeenCalledTimes(1);
       });
    });

    describe('Method openAddFacultyDialog', () => {
      it ('should create subscription to Dialog', () => {
        const openDialogSpy = matDiaglog.open.and.returnValue({afterClosed: () => of(true)});
        facultyService.openAddFacultyDialog();
        expect(matDiaglog.open).toHaveBeenCalled();
        expect(openDialogSpy).toHaveBeenCalled();
       });
    });
});




