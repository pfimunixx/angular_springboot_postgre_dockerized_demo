import Decimal from 'decimal.js';
import { Profile } from "./profile";

export interface Movement{
    id : number;
    concept : string;
    description : string;
    amount : Decimal;
    date : Date;
    profile : Profile;
}