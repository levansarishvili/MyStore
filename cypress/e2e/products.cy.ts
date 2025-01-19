describe("products", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  // Add/Remove product test (user must be pro member to add/remove product)
  it("Adds a new product", () => {
    cy.login("testuser@gmail.com", "test123");
    cy.visit("/store");

    cy.get("[data-cy='product-name-input']").type("Test Product");

    cy.get("[data-cy='product-price-input']").type("9.99");

    cy.get("[data-cy='product-description-input']").type("Test Description");

    cy.get("[data-cy='product-category-input']").type("Test Category");

    cy.get("[data-cy='product-image-input']").type(
      "https://cdn.dummyjson.com/products/images/sports-accessories/American%20Football/thumbnail.png"
    );

    cy.get("[data-cy='add-product-button']").click();

    cy.wait(1000);

    cy.get("h2").contains("Test Product");

    // Delete product after successfully adding it and logout
    cy.get("[data-cy='delete-product-button']").first().click();

    cy.url().should("include", "?deleted=true");

    cy.get("[data-cy='user-button']").click();
    cy.get("[data-cy='sign-out-button']").click();
    cy.url().should("include", "/login");
  });
});
