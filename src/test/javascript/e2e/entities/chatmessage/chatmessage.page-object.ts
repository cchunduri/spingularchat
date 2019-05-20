import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ChatmessageComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-chatmessage div table .btn-danger'));
  title = element.all(by.css('jhi-chatmessage div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ChatmessageUpdatePage {
  pageTitle = element(by.id('jhi-chatmessage-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  userLoginInput = element(by.id('field_userLogin'));
  messageInput = element(by.id('field_message'));
  timeInput = element(by.id('field_time'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setUserLoginInput(userLogin) {
    await this.userLoginInput.sendKeys(userLogin);
  }

  async getUserLoginInput() {
    return await this.userLoginInput.getAttribute('value');
  }

  async setMessageInput(message) {
    await this.messageInput.sendKeys(message);
  }

  async getMessageInput() {
    return await this.messageInput.getAttribute('value');
  }

  async setTimeInput(time) {
    await this.timeInput.sendKeys(time);
  }

  async getTimeInput() {
    return await this.timeInput.getAttribute('value');
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ChatmessageDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-chatmessage-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-chatmessage'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
