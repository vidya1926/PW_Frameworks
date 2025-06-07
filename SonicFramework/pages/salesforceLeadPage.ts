import { Page, Locator, BrowserContext } from "@playwright/test";
import { selectors } from "./selectors";
import { PlaywrightWrapper } from "../helpers/playwright";
import { FakerData } from "../helpers/fakerUtils";


export class SalesforceLeadPage extends PlaywrightWrapper {
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    public async newButton() {
        await this.validateElementVisibility(selectors.newBtn, "New Button")
        await this.click(selectors.newBtn, "New", "Button")
    }
    public async salutation(value: string) {
        await this.click(selectors.leads.salutation, "Salutation", "Button")
        await this.click(selectors.leads.saluationValue(value), "Salutation Value", "Button")
    }

    public async firstName(value: string) {
        await this.type(selectors.leads.firstName, "First Name", value)
    }

    public async lastName(value: string) {
        await this.type(selectors.leads.lastName, "Last Name", value)
    }


    public async Company(value: string) {
        await this.type(selectors.leads.company, "Last Name", value)
    }

    public async saveButton() {
        await this.click(selectors.saveBtn, "Save", "Button")
    }

    public async verifiTheLeadAccount(expectedValue: string) {
        await this.validateElementVisibility(selectors.leads.verificationText, "Lead Name")
        const leadName = await this.getInnerText(selectors.leads.verificationText)
        await this.verification(selectors.leads.verificationText, expectedValue);
        return leadName
    }

    public async searchLead(value: string) {
        await this.validateElementVisibility(selectors.leads.searchLeadInput, "Search Field");
        await this.typeAndEnter(selectors.leads.searchLeadInput, "Search Field", value);
    }

    public async editLead(){
        await this.click(selectors.leads.showAction,"Action","Dropdown")
        await this.click(selectors.leads.editLead,"Edit","Button")
        await this.typeAndEnter(selectors.leads.phoneNumber,"Phone number",FakerData.getMobileNumber())
    }

      public async leadID(userName: string) {
        await this.spinnerDisappear()
        await this.click(selectors.leads.userId(userName), userName, "User Name")
    }

    public async verifyToastmessage(){
        return await this.getInnerText(selectors.leads.toastessage)     
          
    }
    public async expandButton() {
        await this.click(selectors.leads.expandBtn, "Expand Button", "Button")
    }

    public async deleteLead() {
        await this.validateElementVisibility(selectors.leads.deleteLead, "Delete");
                await this.click(selectors.leads.showAction,"Action","Dropdown")

        await this.click(selectors.leads.deleteLead, "Delete", "Button");
    }

    public async deletePopUP() {
        await this.click(selectors.deletePopUp, "Delete", "Button")
    }

    public async verifiTheDeletedData() {
        await this.page.waitForLoadState('load')
        await this.verification(selectors.noItemToDisplay, "No items to display")
    }
}