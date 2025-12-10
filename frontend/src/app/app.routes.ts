import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { DiagnosisComponent } from './components/diagnosis/diagnosis';
import { AdviceComponent } from './components/advice/advice';
import { MarketComponent } from './components/market/market';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'diagnosis', component: DiagnosisComponent },
    { path: 'advice', component: AdviceComponent },
    { path: 'market', component: MarketComponent },
];
