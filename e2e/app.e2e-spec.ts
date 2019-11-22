import { Page } from './app.po';

describe('App', () => {
  let page: Page;

  beforeEach(() => {
    page = new Page();
  });

  describe('página inicial', () => {
    beforeEach(() => {
      page.navigateTo('/');
    });

    it('deve iniciar com os campos de texto vazios e o botão Remover desabilitado', () => {
      page.getDescricao().then(texto => expect(texto).toEqual(''));
      page.getPrioridade().then(texto => expect(texto).toEqual(''));
      expect(page.buttonRemover().isEnabled()).toBeFalsy();
    });

    it('deve notificar se a prioridade for inválida', async () => {
      await page.inserirTarefa("abc", 11);
      let texto = await page.getMensagemToast();
      expect(texto).toBe('A prioridade deve estar entre 1 e 10.');

      let itens = await page.getItens();
      expect(itens.length).toEqual(0);
    });

    it('deve notificar ao tentar inserir a mesma tarefa duas vezes', async () => {
      await page.inserirTarefa("abc", 5);
      await page.inserirTarefa("abc", 7);
      let texto = await page.getMensagemToast();
      expect(texto).toBe('Tarefa já cadastrada.');
    });


    it('deve inserir na lista uma tarefa válida', async () => {
      await page.inserirTarefa('abc', 5);
      let itens = await page.getItens();
      expect(itens.length).toBe(1);
      expect(itens[0]).toContain('abc');
      expect(itens[0]).toContain('Prioridade: 5');
    });

    it('deve ativar o botão Remover ao adicionar um item', async () => {
      await page.inserirTarefa('abc', 5);
      expect(page.buttonRemover().isEnabled()).toBeTruthy();
    });

    it('deve desativar o botão Remover ao adicionar e remover um item', async () => {
      await page.inserirTarefa('abc', 5);
      await page.removerPrimeiro();
      expect(page.buttonRemover().isEnabled()).toBeFalsy();
    });

    it('deve manter ordem ao inserir tarefas em ordem crescente de prioridade', async () => {
      await page.inserirTarefa("a", 1);
      await page.inserirTarefa("b", 6);
      await page.inserirTarefa("c", 9);
      let itens = await page.getItens();
      expect(itens.length).toBe(3);
      expect(itens[0]).toContain('a');
      expect(itens[0]).toContain('Prioridade: 1');
      expect(itens[1]).toContain('b');
      expect(itens[1]).toContain('Prioridade: 6');
      expect(itens[2]).toContain('c');
      expect(itens[2]).toContain('Prioridade: 9');
    });

    it('deve inverter ordem ao inserir tarefas em ordem decrescente de prioridade', async () => {
      await page.inserirTarefa("c", 9);
      await page.inserirTarefa("b", 6);
      await page.inserirTarefa("a", 1);
      let itens = await page.getItens();
      expect(itens.length).toBe(3);
      expect(itens[0]).toContain('a');
      expect(itens[0]).toContain('Prioridade: 1');
      expect(itens[1]).toContain('b');
      expect(itens[1]).toContain('Prioridade: 6');
      expect(itens[2]).toContain('c');
      expect(itens[2]).toContain('Prioridade: 9');
    });

    it('deve ordenar tarefas com prioridades iguais da mais antiga para a mais recente', async () => {
      await page.inserirTarefa("c", 5);
      await page.inserirTarefa("b", 6);
      await page.inserirTarefa("a", 5);
      let itens = await page.getItens();
      expect(itens.length).toBe(3);
      expect(itens[0]).toContain('c');
      expect(itens[0]).toContain('Prioridade: 5');
      expect(itens[1]).toContain('a');
      expect(itens[1]).toContain('Prioridade: 5');
      expect(itens[2]).toContain('b');
      expect(itens[2]).toContain('Prioridade: 6');
    });

    it('deve remover segundo elemento da lista ao ser clicado', async () => {
      await page.inserirTarefa("c", 9);
      await page.inserirTarefa("b", 6);
      await page.inserirTarefa("a", 1);
      await page.inserirTarefa("z", 2);
      await page.removerEnesimo(1);
      let itens = await page.getItens();
      expect(itens[0]).toContain('a');
      expect(itens[0]).toContain('Prioridade: 1');
      expect(itens[1]).toContain('b');
      expect(itens[1]).toContain('Prioridade: 6');
      expect(itens[2]).toContain('c');
      expect(itens[2]).toContain('Prioridade: 9');
    });

    it('deve limpar os campos de texto se inserção for bem sucedida', async () => {
      await page.inserirTarefa("abc", 9);
      const desc = await page.getDescricao();
      const pri = await page.getPrioridade();
      expect(desc).toBe('');
      expect(pri).toBe('');
    });

    it('não deve limpar os campos de texto se inserção não for bem sucedida', async () => {
      await page.inserirTarefa("abc", 12);
      const desc = await page.getDescricao();
      const pri = await page.getPrioridade();
      expect(desc).toBe('abc');
      expect(pri).toBe('12');
    });
  })
});
