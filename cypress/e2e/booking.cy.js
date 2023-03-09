const sets = require("../fixtures/seats.json");
const selectors = require("../fixtures/selectors.json");
beforeEach(() => {
  cy.visit("http://qamid.tmweb.ru/client/payment.php");
});
describe("template spec", () => {
  sets.forEach((item) => {
    it("should book tickets", () => {
      cy.get(selectors.weekDay).eq(4).click();
      cy.get(selectors.hall)
        .contains("SuperHall")
        .parent()
        .contains("12:00")
        .click();

      item.data.forEach((seat) => {
        cy.get(
          //`.buying-scheme__row:nth-child(${seat.row}) span:nth-child(${seat.seat})`
          selectors.row +
            `(${seat.row})` +
            " " +
            selectors.seat +
            `(${seat.seat})`
        ).click();
      });
      cy.get(selectors.button).click();
      cy.get(selectors.header2).should("contain", "Вы выбрали билеты:");
      cy.get(selectors.chairs).should("contain", item.expected);
      cy.get(selectors.button).click();
      cy.get(selectors.header2).should("contain", "Электронный билет");
    });

    it("should cancel booking", () => {
      cy.get(selectors.weekDay).eq(5).click();
      cy.get(selectors.hall)
        .contains("TEST HALL")
        .parent()
        .contains("23:45")
        .click();
      //cy.get(".buying-scheme__row:nth-child(1) span:nth-child(1)").click();
      cy.get(selectors.row + "(1)" + " " + selectors.seat + "(1)").click();
      cy.get(selectors.row + "(1)" + " " + selectors.seat + "(1)").click();
      cy.get(".buying-scheme__row:nth-child(1) span:nth-child(1)").should(
        "not.have.class",
        "buying-scheme__chair_taken"
      );
    });
  });
});
