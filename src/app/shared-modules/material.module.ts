import { NgModule } from '@angular/core';
import { MatCardModule, MatButtonModule, MatListModule, MatChipsModule, MatGridListModule, MatIconModule } from '@angular/material';

const APP_MATERIAL_MODULES = [
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatChipsModule,
    MatGridListModule,
    MatIconModule
];

@NgModule({
    declarations: [],
    imports: [ APP_MATERIAL_MODULES ],
    exports: [ APP_MATERIAL_MODULES ],
    providers: [],
})
export class MaterialModule {}