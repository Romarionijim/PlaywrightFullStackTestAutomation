import {expect, test} from '@playwright/test';
import { BasePage } from '../../pages/BasePage';

test.describe('', async() =>  {


    test.beforeEach(async({page}) => {
       
    })

    test.afterEach(async({context}) => {
        await context.clearCookies();
    })
    
    test('', async() => {
   
    })

})