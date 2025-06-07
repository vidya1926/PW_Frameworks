import { expect } from "@playwright/test"
import { test } from "../customFixtures/salesForceFixture"
import { FakerData } from "../helpers/fakerUtils"

let firstName = FakerData.getFirstName()
let lastName=FakerData.getLastName()
//test.use({ storageState: "logins/salesforceLogin.json" })
test(`Creating Lead`, async ({ SalesforceLogin, SalesforceHome, SalesforceLead }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Ajay Michael' },
        { type: 'TestCase', description: 'Creating Lead' },
    );
    await SalesforceLogin.salesforceLogin("ADMINLOGIN");
    //await SalesforceLogin.verifyHomeLabel();
    await SalesforceHome.appLauncher();
    await SalesforceHome.viewAll();
    await SalesforceHome.searchApp("Leads");
    await SalesforceHome.app("Leads");
    await SalesforceLead.newButton();
    await SalesforceLead.salutation("Mr.");
    await SalesforceLead.firstName(firstName);
    await SalesforceLead.lastName(lastName);
    await SalesforceLead.Company(FakerData.randomCityName());
    await SalesforceLead.saveButton();
    await SalesforceLead.verifiTheLeadAccount(firstName)
})



test('Edit an Lead ', async ({ SalesforceLogin, SalesforceHome,SalesforceLead}) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Vidya' },
        { type: 'TestCase', description: 'Edit Lead' },
        { type: 'Test Description', description: "Update the  lead" }
    );  
        await SalesforceLogin.salesforceLogin("ADMINLOGIN");
        await SalesforceHome.appLauncher();
        await SalesforceHome.viewAll();
        await SalesforceHome.searchApp("Leads");
        await SalesforceHome.app("Leads");
        await SalesforceLead.searchLead(lastName)    
        await SalesforceLead.editLead()
        await SalesforceLead.saveButton()
        expect(await SalesforceLead.verifyToastmessage()).toContain(lastName)
      });

     

test('Delete the  Lead ', async ({ SalesforceLogin, SalesforceHome,SalesforceLead}) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Vidya' },
        { type: 'TestCase', description: 'Delete Lead' },
        { type: 'Test Description', description: "Delete the created lead" }
    );  
        await SalesforceLogin.salesforceLogin("ADMINLOGIN");
        await SalesforceHome.appLauncher();
        await SalesforceHome.viewAll();
        await SalesforceHome.searchApp("Leads");
        await SalesforceHome.app("Leads");
        await SalesforceLead.searchLead(lastName)    
        await SalesforceLead.deleteLead()
        await SalesforceLead.deletePopUP()
        await SalesforceLead.verifiTheDeletedData()    
      });