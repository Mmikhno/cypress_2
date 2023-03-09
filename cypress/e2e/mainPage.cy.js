const selectors = require("../fixtures/selectors.json");

describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://qamid.tmweb.ru/client/index.php");
  });
  it("header check", () => {
    cy.get(selectors.header1).should("contain", "Идёмвкино");
  });
  it("day qty is 7", () => {
    cy.get(selectors.weekDay).should("have.length", 7);
  });
});
