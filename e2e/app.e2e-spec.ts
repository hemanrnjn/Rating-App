import { Task2Page } from './app.po';

describe('task2 App', () => {
  let page: Task2Page;

  beforeEach(() => {
    page = new Task2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
