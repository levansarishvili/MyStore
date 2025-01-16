describe("Authentication", () => {
  it("Logs in successfully", () => {
    cy.visit("http://localhost:3000/login");

    // cy.get("input[name=email]").type("testuser@gmail.com");

    // cy.get("input[name=password]").type("test123");

    // cy.get("[data-cy='login-button']").click().click();

    // cy.url().should("include", "/profile");
  });
});
