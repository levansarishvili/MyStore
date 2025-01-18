/// <reference types="cypress" />
// ***********************************************

// Login user custom command
Cypress.Commands.add("login", (email, password) => {
  cy.get("[data-cy='email-input']").type(email);
  cy.get("[data-cy='password-input']").type(password);
  cy.get("[data-cy='login-button']").click();
  cy.url().should("include", "/profile");
});

// Logout user custom command
Cypress.Commands.add("logout", () => {
  cy.login("testuser@gmail.com", "test123");
  cy.get("[data-cy='user-button']").click();
  cy.get("[data-cy='sign-out-button']").click();
  cy.url().should("include", "/login");
});
