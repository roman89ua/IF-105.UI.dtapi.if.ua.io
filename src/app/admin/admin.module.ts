import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsComponent } from './questions/questions.component';
import { NewQuestionComponent } from './questions/new-question/new-question.component';
import { StudentsComponent } from './students/students.component';
import { StudentsService } from './students/services/students.service';
import { FacultiesComponent } from './faculties/faculties.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupComponent } from './group/group.component';
import { GroupAddEditDialogComponent } from './group/group-add-edit-dialog/group-add-edit-dialog.component';
import { GroupViewDialogComponent } from './group/group-view-dialog/group-view-dialog.component';
import { AdminUserService } from './admin-user/admin-user.service';
import { CreateUpdateUserComponent } from './admin-user/create-update-user/create-update-user.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { SharedModule } from '../shared/shared.module';
import { SpecialityListComponent } from './speciality/speciality-list/speciality-list.component';
import { DialogFormComponent } from './speciality/dialog-form/dialog-form.component';
import { NavbarComponent } from './sidenav/sidenav.component';
import { CreateEditComponent } from './faculties/create-edit/create-edit.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { SubjectsCreateModalComponent } from './subjects/subjects-create-modal/subjects-create-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TimeTableComponent } from './time-table/time-table.component';
import { TimeTableAddDialogComponent } from './time-table/time-table-add-dialog/time-table-add-dialog.component';
import { QuestionTypePipe } from './questions/pipes/question-type.pipe';
import { StudentsModalWindowComponent } from './students/students-modal-window/students-modal-window.component';
import { TestListComponent } from './tests/list/test-list.component';
import { TestAddComponent } from './tests/add/test-add.component';
import { FacultiesService } from './faculties/faculties.service';
import { TimeTablePipe } from '../shared/pipes/time-table.pipe';
import { ResultsComponent } from './results/results.component';
import { ResultsService } from './results/results.service';
import { GroupModalService } from './group/group-modal.service';
import { GroupService } from './group/group.service';
import { AboutUsService } from './about-us/about-us.service';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ResultRaitingQuestionComponent } from './results/result-raiting-question/result-raiting-question.component';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransferStudentModalWindowComponent } from './students/transfer-student-modal-window/transfer-student-modal-window.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ViewStudentModalWindowComponent } from './students/view-student-modal-window/view-student-modal-window.component';
import { ResultDetailComponent } from './results/result-detail/result-detail.component';
import { ScoreAnswerPipe } from './results/pipes/score-answer.pipe';
import { ResultGroupRaitingComponent } from './results/result-group-raiting/result-group-raiting.component';
import { TestDetailListComponent } from './test-detail/list/test-detail-list.component';
import { TestDetailAddComponent } from './test-detail/add/test-detail-add.component';
import { ResultGroupsRaitingComponent } from './results/result-groups-raiting/result-groups-raiting.component';
import { ResultsQuestionDetailComponent } from './results/results-question-detail/results-question-detail.component';
import { ExportImportComponent } from './tests/export-import/export-import.component';
import { LevelResultsChartComponent } from './results/level-results-chart/level-results-chart.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DoughnutChartComponent } from './about-us/doughnut-chart/doughnut-chart.component';
import { BarsChartComponent } from './about-us/bars-chart/bars-chart.component';
import { ProtocolComponent } from './protocol/protocol.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/MainReducer';
import { EffectsModule } from '@ngrx/effects';
import { FacultyEffects } from './store/faculty/faculty-effects';



const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
      },
      {
        path: 'dashboard', component: DashboardComponent,
      },
      {
        path: 'aboutUs', component: AboutUsComponent,
      },
      {
        path: 'admin-user', component: AdminUserComponent,
        data: {
          breadcrumb: 'shared.breadbreadcrumb.admin-user'
        }
      },
      {
        path: 'faculties', component: FacultiesComponent,
        data: {
          breadcrumb: 'shared.breadbreadcrumb.faculties'
        }
      },
      {
        path: 'group',
        data: {
          breadcrumb: 'shared.breadbreadcrumb.group'
        },
        children: [
          { path: '', component: GroupComponent },
          {
            path: 'Students/:id', component: StudentsComponent,
            data: {
              breadcrumb: 'shared.breadbreadcrumb.Students'
            }
          },
          {
            path: 'results/:id', component: ResultsComponent,
            data: {
              breadcrumb: 'shared.breadbreadcrumb.resultsId'
            }
          },
        ]
      },
      {
        path: 'subjects',
        data: {
          breadcrumb: 'shared.breadbreadcrumb.subjects'
        },
        children: [
          { path: '', component: SubjectsComponent },
          {
            path: 'timetable', component: TimeTableComponent,
            data: {
              breadcrumb: 'shared.breadbreadcrumb.timetable'
            }
          },
          {
            path: 'tests',
            data: {
              breadcrumb: 'shared.breadbreadcrumb.tests'
            },
            children: [
              { path: '', component: TestListComponent },
              {
                path: 'test-detail', component: TestDetailListComponent,
                data: {
                  breadcrumb: 'Налаштування тестів'
                }
              },
              {
                path: ':id/questions',
                data: {
                  breadcrumb: 'shared.breadbreadcrumb.questions'
                },
                children: [
                  { path: '', component: QuestionsComponent },
                  { path: ':questionId/:mode', component: NewQuestionComponent },
                  { path: 'new', component: NewQuestionComponent },
                ]
              },
            ]
          },
        ]
      },
      {
        path: 'speciality', component: SpecialityListComponent,
        data: {
          breadcrumb: 'shared.breadbreadcrumb.speciality'
        }
      },
      {
        path: 'results', component: ResultsComponent,
        data: {
          breadcrumb: 'shared.breadbreadcrumb.results'
        }
      },
      {
        path: 'protocol', component: ProtocolComponent,
        data: {
          breadcrumb: 'shared.breadbreadcrumb.protocol'
        }
      },
    ]
  }
];
@NgModule({
  declarations: [
    AdminComponent,
    StudentsComponent,
    StudentsModalWindowComponent,
    FacultiesComponent,
    GroupComponent,
    GroupAddEditDialogComponent,
    GroupViewDialogComponent,
    TestListComponent,
    TestAddComponent,
    TestDetailListComponent,
    TestDetailAddComponent,
    QuestionsComponent,
    NewQuestionComponent,
    AdminUserComponent,
    CreateUpdateUserComponent,
    SpecialityListComponent,
    DialogFormComponent,
    NavbarComponent,
    CreateEditComponent,
    SubjectsComponent,
    SubjectsCreateModalComponent,
    TimeTableComponent,
    TimeTablePipe,
    TimeTableAddDialogComponent,
    QuestionTypePipe,
    DashboardComponent,
    ResultsComponent,
    ResultRaitingQuestionComponent,
    TransferStudentModalWindowComponent,
    ViewStudentModalWindowComponent,
    ResultDetailComponent,
    ScoreAnswerPipe,
    ResultGroupRaitingComponent,
    ResultGroupsRaitingComponent,
    ResultsQuestionDetailComponent,
    ExportImportComponent,
    LevelResultsChartComponent,
    AboutUsComponent,
    DoughnutChartComponent,
    BarsChartComponent,
    ProtocolComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    ImageCropperModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ChartsModule,
    StoreModule.forFeature('admin',reducers),
    EffectsModule.forFeature([FacultyEffects])
  ],
  providers: [
    AdminUserService,
    StudentsService,
    FacultiesService,
    ResultsService,
    GroupModalService,
    GroupService,
    AboutUsService
  ],
  exports: [
    TimeTablePipe,
  ],
  entryComponents: [
    NavbarComponent,
    CreateUpdateUserComponent,
    DialogFormComponent,
    GroupAddEditDialogComponent,
    CreateEditComponent,
    GroupViewDialogComponent,
    SubjectsCreateModalComponent,
    TestAddComponent,
    TestDetailAddComponent,
    TimeTableAddDialogComponent,
    StudentsModalWindowComponent,
    ResultRaitingQuestionComponent,
    TransferStudentModalWindowComponent,
    StudentsModalWindowComponent,
    ViewStudentModalWindowComponent,
    ResultDetailComponent,
    ResultGroupRaitingComponent,
    ResultGroupsRaitingComponent,
    ExportImportComponent,
    LevelResultsChartComponent,
    ResultsQuestionDetailComponent,

  ]
})
export class AdminModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
