describe('Qauto — header and footer elements tests', { testIsolation: false }, () => {

  const HEADER_BUTTONS = ['Home', 'About', 'Contacts', 'Guest log in', 'Sign In']

  const FOOTER_SOCIAL_LINKS = [
    { name: 'Facebook', href: 'https://www.facebook.com/Hillel.IT.School' },
    { name: 'Telegram', href: 'https://t.me/ithillel_kyiv' },
    { name: 'YouTube', href: 'https://www.youtube.com/user/HillelITSchool?sub_confirmation=1' },
    { name: 'Instagram', href: 'https://www.instagram.com/hillel_itschool/' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/school/ithillel/' },
  ]

  const FOOTER_CONTACT_LINKS = [
    { text: 'ithillel.ua', href: 'https://ithillel.ua' },
    { text: 'support@ithillel.ua', href: 'mailto:developer@ithillel.ua' },
  ]

  before(() => {
    cy.visit('/')
  })

  describe('Header', () => {
    it('Header logo is visible and links to the home page', () => {
      cy.get('header')
        .find('a.header_logo')
        .should('be.visible')
        .and('have.attr', 'href', '/')
    })

    it('All navigation buttons in the header are present and visible', () => {
      HEADER_BUTTONS.forEach((name) => {
        cy.get('header')
          .contains('.header-link, .header_signin', name)
          .should('be.visible')
      })
    })

    it('Header contains exactly the expected number of interactive elements', () => {
      cy.get('header')
        .find('a, button')
        .should('have.length', HEADER_BUTTONS.length + 1)
    })
  })

  describe('Footer', () => {
    it('All social links are present and visible with correct URLs', () => {
      cy.get('.contacts_socials')
        .find('a.socials_link')
        .should('have.length', FOOTER_SOCIAL_LINKS.length)

      FOOTER_SOCIAL_LINKS.forEach(({ name, href }) => {
        cy.get('.contacts_socials')
          .find(`a.socials_link[href="${href}"]`)
          .should('be.visible')
          .and('have.attr', 'target', '_blank')
          .as(`social-${name}`)
      })
    })

    it('Contact links (site and support email) are present and visible with correct URLs', () => {
      FOOTER_CONTACT_LINKS.forEach(({ text, href }) => {
        cy.contains('a.contacts_link', text)
          .should('be.visible')
          .and('have.attr', 'href', href)
      })
    })

    it('Footer logo is visible and links to the home page', () => {
      cy.get('footer')
        .find('a.footer_logo')
        .should('be.visible')
        .and('have.attr', 'href', '/')
    })
  })
})
