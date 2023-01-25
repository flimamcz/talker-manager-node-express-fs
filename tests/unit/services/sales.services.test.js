const { expect } = require("chai");
const sinon = require("sinon");

const { allProducts, findSearchSalesById } = require("./mocks/sales.services.mock");
const { salesServices } = require("../../../src/services");

const { salesModel } = require("../../../src/models");

describe("Testando camada services", function () {
  it("Listando todos os produtos na rota /sales", async function () {
    sinon.stub(salesModel, "getAllSales").resolves(allProducts);

    const result = await salesServices.getAllSales();

    expect(result.message).to.be.deep.equal(allProducts);
  });

  it("Listando produto por ID", async function () {
    sinon.stub(salesModel, "getSalesById").resolves(findSearchSalesById);

    const result = await salesServices.getSalesById(2);

    expect(result.message).to.be.deep.equal(findSearchSalesById);
  });

  afterEach(function () {
    sinon.restore();
  });
});
