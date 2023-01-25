const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const {salesController} = require('../../../src/controllers')
const { salesServices } = require('../../../src/services')

const { allProducts, findSearchSalesById } = require('./mocks/products.controller.mock')

describe('Testando a camada controller/sales', function () {
  it('Lista todos os produtos na rota /sales', async function () {
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    sinon.stub(salesServices, 'getAllSales').resolves({type: null, message: allProducts});
    await salesController.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  });

    it('Lista todos os produtos na rota /sales/:id', async function () {
    const req = { params: {id: 1}};
    const res = {};
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    sinon.stub(salesServices, 'getSalesById').resolves({type: null, message: findSearchSalesById});
    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(findSearchSalesById);
    });
  
  it("Responde com status: 404 e message: 'Sale not found' quando a venda não existe", async function () {
      // Arrange
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesServices, "getSalesById")
        .resolves({ type: "NOT_FOUND", message: "Sale not found" });

      // act
      await salesController.getSalesById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Sale not found",
      });
    });


  afterEach(function () {
    sinon.restore();
  })
})