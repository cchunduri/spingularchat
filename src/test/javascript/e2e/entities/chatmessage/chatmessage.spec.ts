/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ChatmessageComponentsPage, ChatmessageDeleteDialog, ChatmessageUpdatePage } from './chatmessage.page-object';

const expect = chai.expect;

describe('Chatmessage e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let chatmessageUpdatePage: ChatmessageUpdatePage;
  let chatmessageComponentsPage: ChatmessageComponentsPage;
  let chatmessageDeleteDialog: ChatmessageDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Chatmessages', async () => {
    await navBarPage.goToEntity('chatmessage');
    chatmessageComponentsPage = new ChatmessageComponentsPage();
    await browser.wait(ec.visibilityOf(chatmessageComponentsPage.title), 5000);
    expect(await chatmessageComponentsPage.getTitle()).to.eq('spingularchatApp.chatmessage.home.title');
  });

  it('should load create Chatmessage page', async () => {
    await chatmessageComponentsPage.clickOnCreateButton();
    chatmessageUpdatePage = new ChatmessageUpdatePage();
    expect(await chatmessageUpdatePage.getPageTitle()).to.eq('spingularchatApp.chatmessage.home.createOrEditLabel');
    await chatmessageUpdatePage.cancel();
  });

  it('should create and save Chatmessages', async () => {
    const nbButtonsBeforeCreate = await chatmessageComponentsPage.countDeleteButtons();

    await chatmessageComponentsPage.clickOnCreateButton();
    await promise.all([
      chatmessageUpdatePage.setUserLoginInput('userLogin'),
      chatmessageUpdatePage.setMessageInput('message'),
      chatmessageUpdatePage.setTimeInput('time')
    ]);
    expect(await chatmessageUpdatePage.getUserLoginInput()).to.eq('userLogin', 'Expected UserLogin value to be equals to userLogin');
    expect(await chatmessageUpdatePage.getMessageInput()).to.eq('message', 'Expected Message value to be equals to message');
    expect(await chatmessageUpdatePage.getTimeInput()).to.eq('time', 'Expected Time value to be equals to time');
    await chatmessageUpdatePage.save();
    expect(await chatmessageUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await chatmessageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Chatmessage', async () => {
    const nbButtonsBeforeDelete = await chatmessageComponentsPage.countDeleteButtons();
    await chatmessageComponentsPage.clickOnLastDeleteButton();

    chatmessageDeleteDialog = new ChatmessageDeleteDialog();
    expect(await chatmessageDeleteDialog.getDialogTitle()).to.eq('spingularchatApp.chatmessage.delete.question');
    await chatmessageDeleteDialog.clickOnConfirmButton();

    expect(await chatmessageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
