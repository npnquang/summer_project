import { Routes } from '@angular/router';
import { ListDriverComponent } from './list-driver/list-driver.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { DeleteDriverComponent } from './delete-driver/delete-driver.component';
import { InvalidDataComponent } from './invalid-data/invalid-data.component';
import { UpdateDriverComponent } from './update-driver/update-driver.component';
import { ListPackageComponent } from './list-package/list-package.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { DeletePackageComponent } from './delete-package/delete-package.component';
import { UpdatePackageComponent } from './update-package/update-package.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StatsComponent } from './stats/stats.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authenticationGuard } from '../guards/authentication.guard';
import { LicenceToSpeechComponent } from './licence-to-speech/licence-to-speech.component';
import { TranslateComponent } from './translate/translate.component';
import { GenerativeAiComponent } from './generative-ai/generative-ai.component';

export const routes: Routes = [
    {path: '', component: MainPageComponent},
    {path: 'driver/list', component: ListDriverComponent, canActivate: [authenticationGuard]},
    {path: 'driver/add', component: AddDriverComponent, canActivate: [authenticationGuard]},
    {path: 'driver/delete', component: DeleteDriverComponent, canActivate: [authenticationGuard]},
    {path: 'driver/update', component: UpdateDriverComponent, canActivate: [authenticationGuard]},
    {path: 'package/list', component: ListPackageComponent, canActivate: [authenticationGuard]},
    {path: 'package/add', component: AddPackageComponent, canActivate: [authenticationGuard]},
    {path: 'package/delete', component: DeletePackageComponent, canActivate: [authenticationGuard]},
    {path: 'package/update', component: UpdatePackageComponent, canActivate: [authenticationGuard]},
    {path: 'stats', component: StatsComponent, canActivate: [authenticationGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'invalid', component: InvalidDataComponent},
    {path: 'text-to-speech', component: LicenceToSpeechComponent, canActivate: [authenticationGuard]},
    {path: 'translate', component: TranslateComponent, canActivate: [authenticationGuard]},
    {path: 'distance', component: GenerativeAiComponent, canActivate: [authenticationGuard]},
    {path: '**', component: PageNotFoundComponent}
];
