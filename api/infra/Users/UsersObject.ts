import { APIRequestContext } from "@playwright/test";
import Randomizer from "../../../helpers/faker/Randomizer";
import { BaseUrl } from "../../baseUrls/BaseUrl";
import { IUser } from "../../interfaces/UserInterface";
import { ApiFunctions } from "../rest/ApiFunctions";

const maleObject = {
    id: Randomizer.getRandomNumbers,
    name: Randomizer.getRandomFirstName,
    email: Randomizer.getRandomEmail,
    gender: 'male',
    status: 'active',
}

const femaleObject = {
    id: Randomizer.getRandomNumbers,
    name: Randomizer.getRandomFirstName,
    email: Randomizer.getRandomEmail,
    gender: 'female',
    status: 'active',
}

export class UserObject extends ApiFunctions {

    /**
     * @description get's both of the genders count then if one gender is greater than the other - it makes them even
     * @returns 
     */
    public async getGenderCountAndMakeGendersEven() {
        const baseUrl = BaseUrl.GORESTAPI_BASE_URL;
        const response = await this.get(baseUrl);
        const responseJson: IUser[] = await response.json();
        const femaleCount = responseJson.filter(user => user.gender === 'female').length;
        const maleCount = responseJson.filter(user => user.gender === 'male').length;
        const countDifference = Math.abs(maleCount - femaleCount);
        if (countDifference === 0) {
            return;
        } else if (maleCount > femaleCount) {
            for (let i = 0; i < countDifference; i++) {
                await this.post(baseUrl, femaleObject)
            }
        } else if (maleCount < femaleCount) {
            for (let i = 0; i < countDifference; i++) {
                await this.post(baseUrl, maleObject)
            }
        }
        return countDifference;
    }
}