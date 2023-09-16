import { APIRequestContext, APIResponse } from "@playwright/test";
import Randomizer from "../../../helpers/faker/Randomizer";
import { BaseUrl } from "../../baseUrls/BaseUrl";
import { IUser } from "../../interfaces/UserInterface";
import { ApiFunctions } from "../rest/ApiFunctions";
import { ApiEndpoints } from "../../endpoints/ApiEndpoints";

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

export class UsersObject extends ApiFunctions {
    private baseUrl = BaseUrl.GORESTAPI_BASE_URL;
    private usersEndpoint = ApiEndpoints.USERS;

    private async getUsers() {
        const url = this.baseUrl;
        const endPoint = this.usersEndpoint;
        const response = await this.get(`${url}/${endPoint}`);
        return response;
    }

    public async countMaleGender() {
        const response = await this.getUsers();
        const responseJson: IUser[] = await response.json();
        const maleCount = responseJson.filter(user => user.gender === 'male').length;
        return maleCount;
    }

    public async countFemaleGender() {
        const response = await this.getUsers();
        const responseJson: IUser[] = await response.json();
        const femaleCount = responseJson.filter(user => user.gender === 'female').length;
        return femaleCount;
    }

    /**
     * @description get's both of the genders count then if one gender is greater than the other - it makes them even
     * @returns 
     */
    public async getGenderCountAndMakeGendersEven() {
        const femaleCount = await this.countFemaleGender();
        const maleCount = await this.countMaleGender();
        const countDifference = Math.abs(maleCount - femaleCount);
        let postResponse: APIResponse | undefined;
        if (countDifference === 0) {
            return;
        } else if (maleCount > femaleCount) {
            for (let i = 0; i < countDifference; i++) {
                postResponse = await this.post(`${this.baseUrl}/${this.usersEndpoint}`, femaleObject)
            }
        } else if (maleCount < femaleCount) {
            for (let i = 0; i < countDifference; i++) {
                postResponse = await this.post(`${this.baseUrl}/${this.usersEndpoint}`, maleObject)
            }
        }
        return postResponse;
    }
}