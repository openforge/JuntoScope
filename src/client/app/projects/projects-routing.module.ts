import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsDashboardComponent } from './containers/projects-dashboard/projects-dashboard.component';
import { AddProjectsComponent } from './containers/add-projects/add-projects.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsDashboardComponent,
  },
  {
    path: 'add-projects',
    component: AddProjectsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
