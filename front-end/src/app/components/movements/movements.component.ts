import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Movement } from 'src/app/domain/movement';
import { Profile } from 'src/app/domain/profile';
import { MovementService } from 'src/app/services/movement.service';
import { ProfileService } from 'src/app/services/profile.service';
import Decimal from 'decimal.js';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.sass']
})
export class MovementsComponent {

  public selectedProfile !: Profile;
  public movements !: Movement[];
  public matMovements !: MatTableDataSource<Movement>;
  public addMovement !: Movement;
  public addMovementForm !: FormGroup;
  public editMovement ?: Movement;
  public deleteMovement ?: Movement;
  public profileDataLoaded : boolean = false;
  public movementsDataLoaded : boolean = false;
  public isIncome !: boolean;
  public balance : Decimal = new Decimal(0);
  public submitted = false;
  displayedColumns: string[] = ['Concept', 'Description', 'Amount', 'Date'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private formBuilder: FormBuilder, private profileService: ProfileService, private movementService : MovementService){

  }

  ngOnInit(){
    this.getSelectedProfile();
    this.getMovements();
    this.getBalance();

    this.addMovementForm = this.formBuilder.group({
      concept:['', [
        Validators.required
      ]],
      description:['', [
        Validators.maxLength(200)
      ]],
      amount:['', [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/)
      ]],
      date: ['', [
        Validators.required
      ]]
    })
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
    this.movementsDataLoaded = false;
    await this.waitForProfileDataLoaded();
    this.movementService.getProfileMovements(this.selectedProfile.id).subscribe(
      (response: Movement[]) => {
        this.movements = response;
        response.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        this.matMovements = new MatTableDataSource(response);
        this.matMovements.paginator = this.paginator;
        this.matMovements.sort = this.sort;
        console.log(this.movements);
        this.movementsDataLoaded = true;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )    
  }

  public async getBalance() {
    this.balance = new Decimal(0);
    await this.waitForMovementsDataLoaded();
    this.movements.forEach(movement => {
      this.balance = this.balance.plus(new Decimal(movement.amount));
    });
  }

  public onAddMovement() {
    this.submitted = true;
    if(this.addMovementForm.invalid){
      return
    }
    document.getElementById('add-movement-form')!.click();
    this.addMovement = this.addMovementForm.value;
    this.addMovement.profile = this.selectedProfile;
    if(this.isIncome === false){
      const originalAmount = new Decimal(this.addMovement.amount);
      this.addMovement.amount = originalAmount.neg();
    }
    this.movementService.addMovement(this.addMovement).subscribe(
      (response : Movement) => {
        console.log(response);
        this.addMovementForm.reset();
        this.getMovements();
        this.balance = this.balance.plus(new Decimal(response.amount));
        this.submitted = false;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
        this.addMovementForm.reset();
        this.submitted = false;
      }
    )
  }

  public onUpdateMovement(movement : Movement) : void {
    movement.profile = this.selectedProfile;
    this.movementService.updateMovement(movement).subscribe(
      (response : Movement) => {
        console.log(response);
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )
    this.ngOnInit();
  }

  public onDeleteMovement(movementId : number) : void {
    this.movementService.deleteMovement(movementId).subscribe(
      (response : void) => {
        console.log(response);
        this.ngOnInit();
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

  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.matMovements.filter = filterValue.trim().toLowerCase();

      if (this.matMovements.paginator) {
        this.matMovements.paginator.firstPage();
      }
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

  resetAddMovementForm() {
    this.addMovementForm.reset();
    this.submitted = false;
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

  waitForMovementsDataLoaded(): Promise<void> {
    return new Promise(resolve => {
      const intervalId = setInterval(() => {
        if (this.movementsDataLoaded) {
          clearInterval(intervalId);
          resolve();
        }
      }, 100);
    });
  }
}
