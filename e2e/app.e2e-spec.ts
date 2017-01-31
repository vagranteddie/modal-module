import { ModalModulePage } from './app.po';

describe('modal-module App', function() {
  let page: ModalModulePage;

  beforeEach(() => {
    page = new ModalModulePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
