import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultiesComponent } from './faculties.component';
import { FacultiesService } from './faculties.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { MatTableComponent } from 'src/app/shared/mat-table/mat-table.component';
import { MockComponent } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { facultiesMock, faculty } from './mock-data';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ModalService } from 'src/app/shared/services/modal.service';

fdescribe('FacultiesComponent', () => {
    let component: FacultiesComponent;
    let fixture: ComponentFixture<FacultiesComponent>;
    let mockedComponent: MatTableComponent;
    let debugElement: DebugElement;
    let apiService: any;
    let facultiesService: FacultiesService;
    beforeEach(async(() => {
        const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getRecordsRange', 'getCountRecords']);

        TestBed.configureTestingModule({
            declarations: [FacultiesComponent, MockComponent(MatTableComponent)],
            imports: [
                MatIconModule,
                MatFormFieldModule,
                MatTableModule,
                MatDialogModule,
                MatSnackBarModule,
                HttpClientModule,
                BrowserAnimationsModule,
            ],
            providers: [
                FacultiesService,
                ModalService,
                { provide: ApiService, useValue: apiServiceSpy }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FacultiesComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        mockedComponent = debugElement
            .query(By.directive(MatTableComponent)).componentInstance as MatTableComponent;
        apiService = TestBed.get(ApiService);
        facultiesService = TestBed.get(FacultiesService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should display a title "Факультети"', () => {
        const title = debugElement.query(By.css('.header > h3'));
        expect(title.nativeElement.textContent).toBe('Факультети');
    });
    it('should display a button "Додати факультет"', () => {
        const button = debugElement.query(By.css('.header > button'));
        expect(button.nativeElement.textContent).toContain('Додати факультет');
    });

    describe('openFacultyModal', () => {
        it('should call createFaculty if object is not passed as parameter', () => {
            facultiesService = debugElement.injector.get(FacultiesService);
            const openFacultyModal = spyOn(facultiesService, 'openAddFacultyDialog').and.returnValue(of(faculty));
            spyOn(component, 'createFaculty');
            component.openFacultyModal();
            expect(openFacultyModal).toHaveBeenCalled();
            expect(component.createFaculty).toHaveBeenCalledWith(faculty);
        });
        it('should call updateFaculty if object  passed as parameter', () => {
            facultiesService = debugElement.injector.get(FacultiesService);
            const openFacultyModal = spyOn(facultiesService, 'openAddFacultyDialog').and.returnValue(of(faculty));
            spyOn(component, 'updateFaculty');
            component.openFacultyModal(faculty);
            expect(openFacultyModal).toHaveBeenCalledWith(faculty);
            expect(component.updateFaculty).toHaveBeenCalledWith(faculty.faculty_id, faculty);
        });
    });
    it('should update faculty', () => {
        component.faculties = facultiesMock;
        facultiesService = debugElement.injector.get(FacultiesService);
        const updateFaculty = spyOn(facultiesService, 'updateFaculty').and.returnValue(of([faculty]));
        component.updateFaculty(2, faculty);
        expect(updateFaculty).toHaveBeenCalledWith(2, faculty);
        expect(component.faculties.find(item => item.faculty_name === faculty.faculty_name)).toBeTruthy();
    });
    it('should remove faculty', () => {
        component.faculties = facultiesMock;
        facultiesService = debugElement.injector.get(FacultiesService);
        const deleteFaculty = spyOn(facultiesService, 'deleteFaculty').and.returnValue(of({ response: 'ok' }));
        component.removeFaculty(2);
        expect(deleteFaculty).toHaveBeenCalledWith(2);
        expect(component.faculties.length).toBe(1);
    });
    it('should send the correct data to the Mat-table component ', () => {
        component.faculties = facultiesMock;
        fixture.detectChanges();

        expect(mockedComponent.data.length).toBe(2);
        expect(mockedComponent.data[0]).toEqual(facultiesMock[0]);
    });

    it('should call getAction when Mat-table emits action', () => {
        spyOn(component, 'getAction');
        mockedComponent.action.emit({
            type: 'Edit', body: {
                faculty_id: 1,
                faculty_name: 'PI-16',
                faculty_description: 'desc'
            }
        });
        expect(component.getAction).toHaveBeenCalledWith({
            type: 'Edit', body: {
                faculty_id: 1,
                faculty_name: 'PI-16',
                faculty_description: 'desc'
            }
        });
    });
});
