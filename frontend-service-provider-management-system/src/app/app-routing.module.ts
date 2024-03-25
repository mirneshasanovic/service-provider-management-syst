import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ServiceProvidersComponent } from './components/service-providers/service-providers.component';
import { ServicesComponent } from './components/services/services.component';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { EditServiceComponent } from './components/edit-service/edit-service.component';
import { EditServiceProviderComponent } from './components/edit-service-provider/edit-service-provider.component';
import { AddServiceProviderComponent } from './components/add-service-provider/add-service-provider.component';
import { ServiceDescriptionsComponent } from './components/service-descriptions/service-descriptions.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'edit-service/:id', component: EditServiceComponent },
  { path: 'add-service', component: AddServiceComponent},
  { path: 'edit-service-provider/:id', component: EditServiceProviderComponent },
  { path: 'service-providers', component: ServiceProvidersComponent },
  { path: 'add-service-provider', component: AddServiceProviderComponent },
  { path: 'service-descriptions', component: ServiceDescriptionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
