import { expect, test } from '@playwright/test';
import { StatusCode } from '../../api/infra/rest/ApiFunctions';
import { UsersObject } from '../../api/infra/users/UsersObject';

test.describe('api crud test for gorestapi API endpoints', async () => {
    let usersObject: UsersObject;

    test.beforeEach(async ({ request }) => {
        usersObject = new UsersObject(request);
    })

    test.afterEach(async ({ request }) => {
        await request.dispose();
    })

    test('gender equality @GOREST_API', async () => {
        await test.step('get both male and female genders count and make them even if one is geater than the other', async () => {
            const res = await usersObject.getGenderCountAndMakeGendersEven();
            expect(res?.status()).toBe(StatusCode.CREATED);
            const femaleCount = await usersObject.countFemaleGender();
            const maleCount = await usersObject.countMaleGender();
            expect(femaleCount).toEqual(maleCount);
        })
    })

    test('delete all inactive users @GOREST_API', async () => {
        await test.step('get each user with an inactive status and delete them all', async () => {
            const res = await usersObject.deleteInactiveUsers();
            expect(res?.status()).toBe(StatusCode.NO_CONTENT);
            const inactiveUsers = await usersObject.getInactiveUsersID();
            expect(inactiveUsers).toBe(0);
        })
    })

    test('email extension replacement @GOREST_API', async () => {
        await test.step('get each email and check if it ends with .co.il - if not replace each email extension with .co.il', async () => {
            const res = await usersObject.modifyEmailExtension();
            expect(res?.status()).toBe(StatusCode.OK);
            const coilExtension = await usersObject.validateEmailExtensions();
            expect(coilExtension).toBe(true);
        })
    })
})