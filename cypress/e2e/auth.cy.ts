describe("Auth", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  // Login user test
  xit("Logs in successfully", () => {
    cy.login("testuser@gmail.com", "test123");
  });

  // Failed login test
  xit("Fails to log in", () => {
    cy.visit("/login");

    cy.get("[data-cy='email-input']").type("testuser@gmail.com");

    cy.get("[data-cy='password-input']").type("incorrect_password");

    cy.get("[data-cy='login-button']").click();

    cy.url().should("not.include", "/profile");
  });

  // Logout user test
  xit("Logs out successfully", () => {
    cy.logout();
  });

  // Sign up user test (after sign up successfully delete user)
  it("Signs up successfully", () => {
    cy.get("[data-cy='email-input']").type("newtestuser@gmail.com");

    cy.get("[data-cy='password-input']").type("test123");

    cy.get("[data-cy='signup-button']").click();

    cy.url().should("include", "/profile");

    cy.get("[data-cy='delete-user-button']").click();

    cy.url().should("include", "/login");
  });
});
