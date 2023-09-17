import { APIResponse } from "@playwright/test";
import Randomizer from "../../../helpers/faker/Randomizer";
import { BaseUrl } from "../../baseUrls/BaseUrl";
import { IUser } from "../../interfaces/UserInterface";
import { ApiFunctions } from "../rest/ApiFunctions";
import { ApiEndpoints } from "../../endpoints/ApiEndpoints";

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
                const femaleObject = {
                    id: Randomizer.getRandomNumbers,
                    name: Randomizer.getRandomFirstName,
                    email: Randomizer.getRandomEmail,
                    gender: 'female',
                    status: 'active',
                }
                postResponse = await this.post(`${this.baseUrl}/${this.usersEndpoint}`, femaleObject, { tokenRequired: true, token: process.env.GORESTAPI_TOKEN })
            }
        } else if (maleCount < femaleCount) {
            for (let i = 0; i < countDifference; i++) {
                const maleObject = {
                    id: Randomizer.getRandomNumbers,
                    name: Randomizer.getRandomFirstName,
                    email: Randomizer.getRandomEmail,
                    gender: 'male',
                    status: 'active',
                }
                postResponse = await this.post(`${this.baseUrl}/${this.usersEndpoint}`, maleObject, { tokenRequired: true, token: process.env.GORESTAPI_TOKEN })
            }
        }
        return postResponse;
    }

    private async getInActiveUsers() {
        const response = await this.getUsers();
        const responseJson: IUser[] = await response.json();
        const inactiveUsers = responseJson.filter(user => user.status === 'inactive');
        return inactiveUsers;
    }

    public async getInactiveUsersID() {
        const inactiveUsers = await this.getInActiveUsers();
        const inactiveUsersId = inactiveUsers.map(user => user.id);
        return inactiveUsersId;
    }

    public async deleteInactiveUsers() {
        const inActiveUsersID = await this.getInactiveUsersID();
        let response: APIResponse | undefined;
        for (let id of inActiveUsersID) {
            response = await this.delete(`${this.baseUrl}/${this.usersEndpoint}/${id}`, { tokenRequired: true, token: process.env.GORESTAPI_TOKEN });
        }
        return response;
    }

    /**
     * @description repalce all email extension with .co.il;
     */
    public async modifyEmailExtension() {
        const getUsers = await this.getUsers();
        const usersJson: IUser[] = await getUsers.json();
        let response: APIResponse | undefined;
        for (let user of usersJson) {
            if (user.email) {
                const currentEmailExtension = await this.extractEmailExtension(user.email);
                if (currentEmailExtension !== undefined && currentEmailExtension !== '.co.il') {
                    const newEmail = user.email.replace(currentEmailExtension, '.co.il');
                    const updatedEmail = {
                        'email': newEmail,
                    }
                    response = await this.patch(`${this.baseUrl}/${this.usersEndpoint}/${user.id}`, updatedEmail, { tokenRequired: true, token: process.env.GORESTAPI_TOKEN });
                }
            }
        }
        return response;
    }

    private async getDesiredEmailExtension() {
        const users = await this.getUsers();
        const usersJson: IUser[] = await users.json();
        let emailExtensions: string[] = [];
        for (let el of usersJson) {
            if (el.email !== undefined) {
                const userEmail = await this.extractEmailExtension(el.email!);
                emailExtensions.push(userEmail!);
            }
        }
        return emailExtensions;
    }

    public async validateEmailExtensions() {
        const emailExtensions = await this.getDesiredEmailExtension();
        for (let extension of emailExtensions) {
            if (extension !== '.co.il') {
                return false;
            }
        }
        return true;
    }

    private async extractEmailExtension(email: string) {
        const domainExtension = email.split('@').pop();
        const extension = domainExtension?.substring(domainExtension.lastIndexOf('.'));
        return extension;
    }

    private async replaceEmailExtension(email: string) {
        const domainExtension = email.split('@').pop();
        const domain = domainExtension?.substring(0, domainExtension.lastIndexOf('.'));
        const extension = domainExtension?.substring(domainExtension.lastIndexOf('.'));
        if (domain !== undefined && extension !== undefined) {
            const updatedDomain = domain + extension;
            return updatedDomain;
        } else {
            throw new Error('the email domain and/or extension are undefined');
        }
    }
}