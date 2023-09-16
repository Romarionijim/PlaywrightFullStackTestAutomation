import { expect, test } from '@playwright/test';
import { UsersObject } from '../../api/infra/Users/UsersObject';
import { StatusCode } from '../../api/infra/rest/ApiFunctions';

test.describe('api crud test for gorestapi API endpoints', async () => {
    let usersObject: UsersObject;

    test.beforeEach(async ({ request }) => {
        usersObject = new UsersObject(request);
    })

    test.afterEach(async ({ request }) => {
        await request.dispose();
    })

    test('gender equality', async () => {
        await test.step('get both male and female genders count and make them even if one is geater than the other', async () => {
            const res = await usersObject.getGenderCountAndMakeGendersEven();
            expect(res?.status()).toBe(StatusCode.CREATED);
            const femaleCount = await usersObject.countFemaleGender();
            const maleCount = await usersObject.countMaleGender();
            expect(femaleCount).toEqual(maleCount);
        })
    })
})