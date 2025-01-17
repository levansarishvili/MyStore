describe("Authentication", () => {
  // Login user test
  it("Logs in successfully", () => {
    cy.login("testuser@gmail.com", "test123");
  });

  // Failed login test
  it("Fails to log in", () => {
    cy.visit("/login");

    cy.get("[data-cy='email-input']").type("testuser@gmail.com");

    cy.get("[data-cy='password-input']").type("incorrect_password");

    cy.get("[data-cy='login-button']").click();

    cy.url().should("not.include", "/profile");
  });
});
