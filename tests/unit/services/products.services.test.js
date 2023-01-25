const { expect } = require("chai");
const sinon = require("sinon");

const { allProducts, oneProduct } = require("./mocks/products.services.mock");
const { productsServices } = require("../../../src/services");

const { productsModel } = require("../../../src/models");

describe("Testando camada services", function () {
  it("Listando todos os produtos", async function () {
    sinon.stub(productsModel, "getAllProducts").resolves(allProducts);

    const result = await productsServices.getAllProducts();

    expect(result.message).to.be.deep.equal(allProducts);
  });

  it("Listando produto por ID", async function () {
    sinon.stub(productsModel, "getProductById").resolves(oneProduct);

    const result = await productsServices.getProductById(2);

    expect(result.message).to.be.deep.equal(oneProduct);
  });

  afterEach(function () {
    sinon.restore();
  });
});
