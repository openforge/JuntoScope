import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';

import { ImportProjectsListComponent } from './components/import-projects-list/import-projects-list.component';
import { ScopesListComponent } from './components/scopes-list/scopes-list.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ImportProjectsComponent } from './containers/import-projects/import-projects.component';
import { AddProjectsComponent } from './containers/add-projects/add-projects.component';
import { ProjectsDashboardComponent } from './containers/projects-dashboard/projects-dashboard.component';

@NgModule({
  imports: [CommonModule, ProjectsRoutingModule],
  declarations: [
    ImportProjectsListComponent,
    ScopesListComponent,
    ProjectsListComponent,
    ImportProjectsComponent,
    AddProjectsComponent,
    ProjectsDashboardComponent,
  ],
})
export class ProjectsModule {}
