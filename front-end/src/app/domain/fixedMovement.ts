import Decimal from 'decimal.js';
import { Profile } from "./profile";

export interface FixedMovement{
    id : number;
    concept : string;
    description : string;
    amount : Decimal;
    startDate : Date;
    endDate : Date;
    amountType : string;
    profile : Profile;
}