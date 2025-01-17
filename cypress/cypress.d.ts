declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to log in a user.
     * @param email - The user's email address.
     * @param password - The user's password.
     */
    login(email: string, password: string): Chainable<void>;
  }
}
