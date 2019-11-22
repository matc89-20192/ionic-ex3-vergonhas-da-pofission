import { browser, by, element, protractor, ElementFinder } from 'protractor';

export class Page {

  navigateTo(destination) {
    return browser.get(destination);
  }

  getDescricao() {
    return this.editDescricao().getAttribute('value');
  }

  getPrioridade() {
    return this.editPrioridade().getAttribute('value');
  }

  async inserirTarefa(descricao, prioridade) {
    await this.limpar(this.editDescricao());
    await this.editDescricao().sendKeys(descricao);
    await this.limpar(this.editPrioridade());
    await this.editPrioridade().sendKeys(prioridade);
    return this.buttonAdicionar().click();
  }

  getMensagemToast() {
    return element(by.css('.toast-message')).getText();
  }

  getItens() {
    return element.all(by.css('#listView .item'))
      .map(elem => elem.getText())
  }

  removerPrimeiro() {
    return this.buttonRemover().click();
  }

  removerEnesimo(n) {
    return element.all(by.css('#listView .item')).get(n).click();
  }

  listView() {
    return element(by.css('#listView'));
  }
  editDescricao() {
    return element(by.css('#editDescricao input'));
  }
  editPrioridade() {
    return element(by.css('#editPrioridade input'));
  }
  buttonAdicionar() {
    return element(by.css('#buttonAdicionar'));
  }
  buttonRemover() {
    return element(by.css('#buttonRemover'));
  }

  async limpar(elem: ElementFinder) {
    let texto = await elem.getAttribute('value');
    let array = Array(texto.length + 1).fill(protractor.Key.BACK_SPACE);
    await elem.sendKeys(...array);
  }
}
