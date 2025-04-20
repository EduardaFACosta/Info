import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements AfterViewInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { icon: string, title: string, message: string, redirectToList: boolean },
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => this.closeDialog(), 2500);
  }

  closeDialog() {
    this.dialogRef.close();
    if (this.data.redirectToList) {
      this.router.navigate(['/list']);
    }
  }
}