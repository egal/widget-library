declare namespace Cypress {
  interface Chainable<Subject = string> {
    preventSubmit(form: string): Chainable<Element>
  }
}
