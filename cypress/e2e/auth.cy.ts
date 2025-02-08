describe("Auth", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  // Login user test
  it("Logs in successfully", () => {
    // cy.login("testuser@gmail.com", "test123$");
    cy.get("[data-cy='email-input']")
      .should("be.visible")
      .type("testuser@gmail.com");
    cy.get("[data-cy='password-input']").should("be.visible").type("test123$");
    cy.get("[data-cy='login-button']").should("be.visible").click();
    cy.get("[data-cy='user-button']").should("be.visible");
  });

  // Failed login test
  it("Fails to log in", () => {
    cy.visit("/login");

    cy.get("[data-cy='email-input']").type("testuser@gmail.com");

    cy.get("[data-cy='password-input']").type("incorrect_password");

    cy.get("[data-cy='login-button']").click();

    cy.url().should("not.include", "/profile");
  });

  // Logout user test
  it("Logs out successfully", () => {
    cy.logout();
  });

  // Sign up user test (after sign up successfully delete user)
  it("Signs up successfully", () => {
    cy.get("[data-cy='email-input']").type("newtestuser@gmail.com");

    cy.get("[data-cy='password-input']").type("test123$");

    cy.get("[data-cy='signup-button']").click();

    cy.url().should("include", "/profile");

    cy.get("[data-cy='delete-user-button']").click();

    cy.url().should("include", "/login");
  });
});
