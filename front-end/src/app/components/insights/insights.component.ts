import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FixedMovement } from 'src/app/domain/fixedMovement';
import { FixedMovementService } from 'src/app/services/fixedMovement.service';
import { Profile } from 'src/app/domain/profile';
import { ProfileService } from 'src/app/services/profile.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Decimal from 'decimal.js';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.sass']
})
export class InsightsComponent {

  public selectedProfile !: Profile;
  public fixedMovements !: FixedMovement[];
  public matFixedMovements !: MatTableDataSource<FixedMovement>;
  public profileDataLoaded : boolean = false;
  public fixedMovementsDataLoaded : boolean = false;
  public addFixedMovement !: FixedMovement;
  public addFixedMovementForm !: FormGroup;
  public editFixedMovement ?: FixedMovement;
  public deleteFixedMovement ?: FixedMovement;
  public isIncome !: boolean;
  public submitted = false;
  displayedColumns: string[] = ['Concept', 'Description', 'Amount', 'Amount type'];
  amountTypeList:string[]=["daily","weekly","monthly", "quarterly", "four-monthly", "six-monthly", "annually"];
  ngSelect = this.amountTypeList[2];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private formBuilder: FormBuilder, private profileService: ProfileService, private fixedMovementService : FixedMovementService){

  }

  ngOnInit(){
    this.getSelectedProfile();
    this.getFixedMovements();

    this.addFixedMovementForm = this.formBuilder.group({
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
      amountType: [this.ngSelect, [
        Validators.required
      ]],
      startDate: ['', [
        Validators.required
      ]],
      endDate: ['', [

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

  public async getFixedMovements() : Promise<void>{
    this.fixedMovementsDataLoaded = false;
    await this.waitForProfileDataLoaded();
    this.fixedMovementService.getProfileFixedMovements(this.selectedProfile.id).subscribe(
      (response: FixedMovement[]) => {
        this.fixedMovements = response;
        response.sort((a, b) => {
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        });
        this.matFixedMovements = new MatTableDataSource(response);
        this.matFixedMovements.paginator = this.paginator;
        this.matFixedMovements.sort = this.sort;
        console.log(this.matFixedMovements);
        this.fixedMovementsDataLoaded = true;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )    
  }

  public onAddFixedMovement() {
    this.submitted = true;
    if(this.addFixedMovementForm.invalid){
      return
    }
    document.getElementById('add-fixed-movement-form')!.click();
    this.addFixedMovement = this.addFixedMovementForm.value;
    this.addFixedMovement.profile = this.selectedProfile;
    console.log(this.addFixedMovement);
    if(this.isIncome === false){
      const originalAmount = new Decimal(this.addFixedMovement.amount);
      this.addFixedMovement.amount = originalAmount.neg();
    }
    this.fixedMovementService.addFixedMovement(this.addFixedMovement).subscribe(
      (response : FixedMovement) => {
        console.log(response);
        this.getFixedMovements();
        this.submitted = false;
        this.resetAddFixedMovementForm();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
        this.submitted = false;
        this.resetAddFixedMovementForm();
      }
    )
  }

  public onUpdateFixedMovement(fixedMovement : FixedMovement) : void {
    fixedMovement.profile = this.selectedProfile;
    this.fixedMovementService.updateFixedMovement(fixedMovement).subscribe(
      (response : FixedMovement) => {
        console.log(response);
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )
    this.ngOnInit();
  }


  public onOpenModal(fixedMovement : FixedMovement | null, mode: string): void {
    const container = document.getElementById('insights')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'addFixedIncome') {
      this.isIncome = true;
      button.setAttribute('data-target', '#addFixedMovementModal');
    }
    if (mode === 'addFixedExpense') {
      this.isIncome = false;
      button.setAttribute('data-target', '#addFixedMovementModal');
    }
    if (mode === 'edit') {
      this.editFixedMovement = fixedMovement!;
      button.setAttribute('data-target', '#editFixedMovementModal');
    }
    if (mode === 'delete') {
      this.deleteFixedMovement = fixedMovement!;
      button.setAttribute('data-target', '#deleteFixedMovementModal');
    }
    container.appendChild(button);
    button.click();
  }

  resetAddFixedMovementForm() {
    this.addFixedMovementForm.reset();
    this.submitted = false;
    this.ngOnInit();
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
