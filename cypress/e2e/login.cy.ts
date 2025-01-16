describe("Authentication", () => {
  // Login user test
  it("Logs in successfully", () => {
    cy.visit("/login");

    cy.get("input[name=email]").type("testuser@gmail.com");

    cy.get("input[name=password]").type("test123");

    cy.get("[data-cy='login-button']").click();

    cy.url().should("include", "/profile");
  });

  // Failed login test
  it("Fails to log in", () => {
    cy.visit("/login");

    cy.get("input[name=email]").type("testuser@gmail.com");

    cy.get("input[name=password]").type("incorrect_password");

    cy.get("[data-cy='login-button']").click();

    cy.url().should("not.include", "/profile");
  });
});
