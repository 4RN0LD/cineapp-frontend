import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatToolbarModule, MatDividerModule, MatMenuModule, MatSidenavModule, MatCardModule, MatDatepickerModule, MatSelectModule, MatNativeDateModule, MAT_DATE_LOCALE, MatStepperModule, MatSlideToggleModule, MatGridListModule, MatCheckboxModule, MatListModule, MatChipsModule, MatTabsModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDividerModule,
    MatMenuModule,   
    MatSidenavModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatCheckboxModule,
    MatListModule,
    MatChipsModule,
    MatTabsModule
  ],
  exports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDividerModule,
    MatMenuModule,  
    MatSidenavModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatCheckboxModule,
    MatListModule,
    MatChipsModule,
    MatTabsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ]
})
export class MaterialModule { }
