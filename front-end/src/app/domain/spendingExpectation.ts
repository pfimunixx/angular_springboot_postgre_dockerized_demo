import Decimal from 'decimal.js';
import { Profile } from "./profile";

export interface SpendingExpectation{
    id : number;
    concept : string;
    amount : Decimal;
    amountType : string;
    profile : Profile;
}