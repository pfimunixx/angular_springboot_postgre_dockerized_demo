import * as shajs from 'sha.js';

export class Sha256 {
    

    static encrypt(toBeHashed : string): string {
        return shajs('sha256').update(toBeHashed).digest('hex');
    }
}