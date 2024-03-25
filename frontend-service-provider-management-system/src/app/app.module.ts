import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ServiceProvidersComponent } from './components/service-providers/service-providers.component';
import { ServicesComponent } from './components/services/services.component';
import { HttpClientModule } from '@angular/common/http';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { FormsModule } from '@angular/forms';
import { EditServiceComponent } from './components/edit-service/edit-service.component';
import { EditServiceProviderComponent } from './components/edit-service-provider/edit-service-provider.component';
import { AddServiceProviderComponent } from './components/add-service-provider/add-service-provider.component';
import { ServiceDescriptionsComponent } from './components/service-descriptions/service-descriptions.component';
import { NavigationMenuComponentComponent } from './components/navigation-menu-component/navigation-menu-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ServiceProvidersComponent,
    ServicesComponent,
    AddServiceComponent,
    EditServiceComponent,
    EditServiceProviderComponent,
    AddServiceProviderComponent,
    ServiceDescriptionsComponent,
    NavigationMenuComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
