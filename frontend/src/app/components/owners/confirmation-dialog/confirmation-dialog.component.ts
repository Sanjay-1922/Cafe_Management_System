import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
 @Component({   selector: 'app-confirmation-dialog',
     templateUrl: './confirmation-dialog.component.html', 
       styleUrls: ['./confirmation-dialog.component.css'],
       imports: [CommonModule,FormsModule,SidebarComponent
        
       ]
      
      
      }) 
       export class ConfirmationDialogComponent {   isVisible = false;    @Output()
         onConfirm = new EventEmitter<boolean>();    show(): void {     this.isVisible = true;   }    hide(): void {     this.isVisible = false;   }    confirm(): void {     this.onConfirm.emit(true);     this.hide();   }    cancel(): void {     this.onConfirm.emit(false);     this.hide();   } }