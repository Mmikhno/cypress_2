const credentials = require("../fixtures/credentials.json");
const selectors = require("../fixtures/selectors.json");

describe("login tests", () => {
  beforeEach(() => {
    cy.visit("http://qamid.tmweb.ru/admin/");
  });
  it("Happy path - login with valid credentials", () => {
    cy.login(credentials[0].login, credentials[0].password);
    cy.get(selectors.header1).should("contain", "Идёмвкино");
    cy.get(selectors.subtitle).should("contain", "Администраторррская");
  });
  it("wrong email", () => {
    cy.login(credentials[1].login, credentials[1].password);
    cy.get(selectors.email)
      .then((foundItem) => foundItem[0].checkValidity())
      .should("be.false");
    cy.get(selectors.email)
      .then((foundItem) => foundItem[0].validationMessage)
      .should(
        "contain",
        `Адрес электронной почты должен содержать символ "@". В адресе "${credentials[1].login}" отсутствует символ "@".`
      );
  });
  it("wrong email - dot issue", () => {
    cy.login(credentials[2].login, credentials[2].password);
    cy.get(selectors.email)
      .then((foundItem) => foundItem[0].checkValidity())
      .should("be.false");
    cy.get(selectors.email)
      .then((foundItem) => foundItem[0].validationMessage)
      .should("contain", `Недопустимое положение символа "." в адресе ".ru".`);
  });
  it("invalid email", () => {
    cy.login(credentials[3].login, credentials[3].password);
    cy.get("body").should("contain", "Ошибка авторизации!");
  });
  it("invalid password", () => {
    cy.login(credentials[4].login, credentials[4].password);
    cy.get("body").should("contain", "Ошибка авторизации!");
  });
});
