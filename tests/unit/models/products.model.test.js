const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const { allProducts, oneProduct} = require("./mocks/products.model.mock");

const { productsModel } = require("../../../src/models");

describe("Testando camada model", function () {
  it("Listando todos os produtos", async function () {
    sinon.stub(connection, "execute").resolves([allProducts]);

    const result = await productsModel.getAllProducts();

    expect(result).to.be.deep.equal(allProducts);
  });

  it("Listando produto por ID", async function () {
    sinon.stub(connection, "execute").resolves([[oneProduct]]);

    const result = await productsModel.getProductById(2);

    expect(result).to.be.deep.equal(oneProduct);
  });

  afterEach(function () {
    sinon.restore();
  });
});
