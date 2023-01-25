const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const { allProducts, findSearchSalesById} = require("./mocks/sales.model.mock");

const { salesModel } = require("../../../src/models");

describe("Testando camada model /sales", function () {
  it("Listando todos os produtos na rota /sales", async function () {
    sinon.stub(connection, "execute").resolves([allProducts]);

    const result = await salesModel.getAllSales();

    expect(result).to.be.deep.equal(allProducts);
  });

  it("Listando produto por ID na rota /sales/:id", async function () {
    sinon.stub(connection, "execute").resolves([findSearchSalesById]);

    const result = await salesModel.getSalesById(2);

    expect(result).to.be.deep.equal(findSearchSalesById);
  });

  afterEach(function () {
    sinon.restore();
  });
});
