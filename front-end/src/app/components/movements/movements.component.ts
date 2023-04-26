import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Movement } from 'src/app/domain/movement';
import { Profile } from 'src/app/domain/profile';
import { MovementService } from 'src/app/services/movement.service';
import { ProfileService } from 'src/app/services/profile.service';
import Decimal from 'decimal.js';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.sass']
})
export class MovementsComponent {

  public selectedProfile !: Profile;
  public movements !: Movement[];
  public addMovement !: Movement;
  public editMovement ?: Movement;
  public deleteMovement ?: Movement;
  public profileDataLoaded : boolean = false;
  public isIncome !: boolean;
  page_size: number = 10;
  page_number: number = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private profileService: ProfileService, private movementService : MovementService){

  }

  ngOnInit(){
    this.getSelectedProfile();
    this.getMovements();
  }

  getSelectedProfile() {
    this.profileDataLoaded = false;
    this.profileService.getProfileById(parseInt(localStorage.getItem('selectedProfileId')!)).subscribe(
      (response : Profile) => {
        console.log(response);
        this.selectedProfile = response;
        this.profileDataLoaded = true;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public async getMovements() : Promise<void>{
    await this.waitForProfileDataLoaded();
    this.movementService.getProfileMovements(this.selectedProfile.id).subscribe(
      (response: Movement[]) => {
        this.movements = response;
        console.log(this.movements);
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )
    
  }

  public onAddMovement(addMovementForm : NgForm): void {
    document.getElementById('add-movement-form')!.click();
    this.addMovement = addMovementForm.value;
    this.addMovement.profile = this.selectedProfile;
    if(this.isIncome === false){
      const originalAmount = new Decimal(this.addMovement.amount);
      this.addMovement.amount = originalAmount.neg();
    }
    this.movementService.addMovement(this.addMovement).subscribe(
      (response : Movement) => {
        console.log(response);
        addMovementForm.reset();
        this.getMovements();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
        addMovementForm.reset();
      }
    ) 
  }

  public onUpdateMovement(movement : Movement) : void {
    movement.profile = this.selectedProfile;
    this.movementService.updateMovement(movement).subscribe(
      (response : Movement) => {
        console.log(response);
        this.getMovements();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteMovement(movementId : number) : void {
    this.movementService.deleteMovement(movementId).subscribe(
      (response : void) => {
        console.log(response);
        this.getMovements();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }

  public searchMovements(key: string): void {
    console.log(key);
    const results: Movement[] = [];
    for (const employee of this.movements) {
      if (employee.concept.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.description.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.movements = results;
    if (results.length === 0 || !key) {
      this.getMovements();
    }
  }

  sortMovementsByConcept() {
    this.movements = this.movements.sort((a, b) => {
      if (a.concept < b.concept) {
        return -1;
      }
      if (a.concept > b.concept) {
        return 1;
      }
      return 0;
    });
  }

  handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }

  public onOpenModal(movement : Movement | null, mode: string): void {
    const container = document.getElementById('movements')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'addIncome') {
      this.isIncome = true;
      button.setAttribute('data-target', '#addMovementModal');
    }
    if (mode === 'addExpense') {
      this.isIncome = false;
      button.setAttribute('data-target', '#addMovementModal');
    }
    if (mode === 'edit') {
      this.editMovement = movement!;
      button.setAttribute('data-target', '#editMovementModal');
    }
    if (mode === 'delete') {
      this.deleteMovement = movement!;
      button.setAttribute('data-target', '#deleteMovementModal');
    }
    container.appendChild(button);
    button.click();
  }

  waitForProfileDataLoaded(): Promise<void> {
    return new Promise(resolve => {
      const intervalId = setInterval(() => {
        if (this.profileDataLoaded) {
          clearInterval(intervalId);
          resolve();
        }
      }, 100);
    });
  }
}
