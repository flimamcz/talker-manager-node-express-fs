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


  afterEach(function () {
    sinon.restore();
  })
})