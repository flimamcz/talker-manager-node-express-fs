const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const {productsController} = require('../../../src/controllers')
const { productsServices } = require('../../../src/services')

const { allProducts, oneProduct } = require('./mocks/products.controller.mock')

describe('Testando a camada controller', function () {
  it('Lista todos os produtos na rota /products', async function () {
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    sinon.stub(productsServices, 'getAllProducts').resolves({type: null, message: allProducts});
    await productsController.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  });

    it('Lista todos os produtos na rota /products/:id', async function () {
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    sinon.stub(productsServices, 'getAllProducts').resolves({type: null, message: oneProduct});
    await productsController.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(oneProduct);
    });
  
    it("Retorna'Product not found' quando o produto não existe", async function () {
      // Arrange
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsServices, "getProductById")
        .resolves({ type: 'NOT_FOUND', message: 'Product not found' });

      // act
      await productsController.getProductById(req, res);

      // assert
      expect(res.status).to.have.been
        .calledWith(404);
      expect(res.json).to.have.been
        .calledWith({ message: "Product not found" });
    });
  
  it("Retorna 200 e message com o produto a partir do seu id", async function () {
      // Arrange
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsServices, "getProductById")
        .resolves({ type: null, message: allProducts[0] });

      // act
      await productsController.getProductById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts[0]);
    });

  afterEach(function () {
    sinon.restore();
  })
})