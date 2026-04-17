import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import ContactPage from './ContactPage'
import CollectionPage from './CollectionPage'
import WelcomeSignupOverlay from './WelcomeSignupOverlay'

// Steps used in the customization flow sidebar.
const steps = ['Share Vision', 'Choose Diamond', 'Review']

// Default values for the login form.
const initialLoginForm = {
  email: '',
  password: '',
  showPassword: false,
}



// Password rule used before allowing a login submission.
const loginPasswordPattern = /^(?=.*[A-Z])(?=.*\d).{8,20}$/

// Images shown in the inspiration board section.
const inspirationCards = [
  {
    id: 1,
    title: 'Solitaire Whisper',
    image:
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    title: 'Pearl Balance',
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    title: 'Luxe Halo',
    image:
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80',
  },
]

// Starting account data shown in the profile section.
const initialAccountDetails = {
  firstName: 'Eliza',
  lastName: 'Rouge',
  email: 'eliza.rouge@gmail.com',
  phoneNumber: 'IN +01 1023456789',
  birthday: '24 / 10 / 1996',
  anniversary: '',
  partnersBirthday: '',
}

// Metadata for building the editable account form fields.
const accountFieldConfig = [
  { key: 'firstName', label: 'First name' },
  { key: 'lastName', label: 'Last name' },
  { key: 'email', label: 'Email' },
  { key: 'phoneNumber', label: 'Phone number' },
  { key: 'birthday', label: 'Birthday', type: 'date' },
  { key: 'anniversary', label: 'Anniversary', type: 'date' },
  { key: 'partnersBirthday', label: 'Partners Birthday', type: 'date' },
]

// A quick lookup so date fields can be formatted and validated differently.
const dateFieldKeys = new Set(['birthday', 'anniversary', 'partnersBirthday'])

// Formats date input into DD / MM / YYYY while the user types.
const formatDateInput = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  const parts = []

  if (digits.length > 0) {
    parts.push(digits.slice(0, 2))
  }

  if (digits.length > 2) {
    parts.push(digits.slice(2, 4))
  }

  if (digits.length > 4) {
    parts.push(digits.slice(4, 8))
  }

  return parts.join(' / ')
}

// Checks whether a typed date matches the expected format and a real calendar date.
const isValidDateString = (value) => {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return false
  }

  const match = trimmedValue.match(/^(\d{2}) \/ (\d{2}) \/ (\d{4})$/)

  if (!match) {
    return false
  }

  const [, dayText, monthText, yearText] = match
  const day = Number(dayText)
  const month = Number(monthText)
  const year = Number(yearText)

  if (month < 1 || month > 12 || day < 1 || year < 1900 || year > 2100) {
    return false
  }

  const maxDay = new Date(year, month, 0).getDate()
  return day <= maxDay
}

// Sample order history rendered in the orders section.
const orders = [
  {
    id: '123456789101',
    placedOn: '18 July, 2025',
    amount: '$1999.00',
    deliveredOn: 'Delivered on July 31st, 2025',
    items: [
      {
        id: 1,
        name: 'Celeste Pave Diamond rings',
        metal: '10k / Rose Gold',
        diamond: '1ctw / Princess cut',
        size: '5',
        qty: '1',
        price: '$1999.00',
        image:
          'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=80',
      },
      {
        id: 2,
        name: 'Celeste Pave Diamond rings',
        metal: '10k / Rose Gold',
        diamond: '1ctw / Princess cut',
        size: '5',
        qty: '1',
        price: '$1999.00',
        image:
          'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=700&q=80',
      },
    ],
  },
]

// Saved addresses shown in the address book section.
const savedAddresses = [
  {
    id: 1,
    label: 'Office',
    lines: [
      '1234 Blossom Lane',
      'Rosewood, California',
      '90210',
      'United States of America',
    ],
  },
  {
    id: 2,
    label: 'Home',
    lines: ['456 Maple Street', 'Sunnyvale, California 94086', 'United States of America'],
  },
  {
    id: 3,
    label: 'Mom',
    lines: ['789 Oak Avenue', 'Lakeside, California 92040', 'United States of America'],
  },
]

// Field definitions used to render the new-address form.
const addressFormFields = [
  { key: 'firstName', label: 'First name', placeholder: 'Enter First Name' },
  { key: 'apartment', label: 'Apartment, suite, etc.', placeholder: 'Enter Details' },
  { key: 'country', label: 'Country/Region', placeholder: 'Select Country/Region' },
  { key: 'city', label: 'City', placeholder: 'Select City' },
  { key: 'phone', label: 'Phone number', placeholder: 'IN   v   +01 1023456789' },
]

// Contact details passed into the contact page component.
const contactMethods = [
  { title: 'CALL US', value: '+01-0001 002 003' },
  { title: 'MAIL US', value: 'niora@gmail.com' },
  { title: 'LIVE CHAT', value: 'livechatsupport' },
]

// Content blocks used to build the privacy policy section.
const privacySections = [
  {
    title: 'Information We Collect',
    content: [
      'We may collect the following types of personal information:',
      'Contact details: Name, email address, phone number, and shipping/billing address.',
      'Order details: Items purchased, order history, and preferences.',
      'Payment information: Processed securely through third-party providers.',
      'Website usage data: IP address, browser type, device information, pages visited, and time spent.',
    ],
    isList: true,
  },
  {
    title: 'How We Use Your Information',
    content: [
      'We use your data to:',
      'Process and deliver your orders.',
      'Personalize your shopping experience.',
      'Send updates, offers, and newsletters if you opt-in.',
      'Respond to customer support inquiries.',
      'Improve our website and services.',
      'We never sell your personal information to third parties.',
    ],
    isList: true,
  },
  {
    title: 'Sharing Your Information',
    content: [
      'Your data may be shared with:',
      'Trusted third parties who assist in order processing, payment, delivery, and marketing.',
      'Law enforcement or legal authorities if required to comply with legal obligations.',
      'All partners are bound by strict confidentiality agreements and data protection standards.',
    ],
    isList: true,
  },
  {
    title: 'Cookies & Tracking Technologies',
    content: [
      'We use cookies to improve your browsing experience, analyze website traffic, and offer tailored promotions.',
      'You can manage your cookie preferences through your browser settings.',
      'To learn more, see our Cookie Policy.',
    ],
    isList: false,
  },
]

// Content blocks used to build the buy-back policy section.
const buyBackSections = [
  {
    title: 'What We Offer:',
    items: [
      '80% of the diamond value based on the prevailing market price.',
      '100% of the metal value calculated at the current metal rate.',
      'The final amount will be subject to deductions for making charges and applicable taxes.',
    ],
  },
  {
    title: 'Conditions:',
    items: [
      'Buyback is only available for jewelry purchased directly from Niora Jewel.',
      'Original certification must be returned.',
      'Missing certifications may result in a deduction from the final buyback value.',
      'Jewelry must not be altered, damaged, or modified by third-party jewelers.',
      'Shipping charges for returning the product will be borne by the customer.',
    ],
  },
  {
    title: 'How to Initiate a Buyback:',
    items: [
      'To begin the buyback process, contact our team at [support@solvijewel.com] with your:',
      'Order details',
      'Product photos',
      'Certification documents',
      'Our team will evaluate your item and provide a quote based on current rates and conditions.',
    ],
  },
]


// Footer link groups shown in the fixed footer.
const footerColumns = [
  {
    title: 'OFFERINGS',
    links: ['Category', 'Collection', 'Customize', 'Buy Back', 'Blogs'],
  },
  {
    title: 'CUSTOMER CARE',
    links: ['Contact', 'Account', 'Shipping & Returns', 'Jewellery care', 'Customs'],
  },
  {
    title: 'ABOUT',
    links: ['About Solvi', 'Behind the craft', 'Stories'],
  },
  {
    title: 'COMMUNITY',
    links: ['Instagram', 'Facebook', 'Pinterest'],
  },
]



// Route paths used by the small client-side navigation logic.
const BASE_PATH = import.meta.env.BASE_URL || '/'
const HOME_PATH = BASE_PATH === '/' ? '/' : BASE_PATH.replace(/\/$/, '')
const CONTACT_PATH = `${HOME_PATH}/contact-us`
const COLLECTIONS_PATH = `${HOME_PATH}/collections`

// Helper function to get relative path for history API
const getFullPath = (path) => {
  if (BASE_PATH === '/') return path
  return `${BASE_PATH}${path}`.replace(/\/\//g, '/')
}

// Helper function to extract relative path from full pathname
const getRelativePath = (pathname) => {
  if (BASE_PATH === '/') return pathname
  if (pathname.startsWith(BASE_PATH)) {
    return pathname.slice(BASE_PATH.length - 1) || '/'
  }
  return pathname
}

function App() {
  // Component state for page navigation, overlays, account forms, and status messages.
  const [activeStep, setActiveStep] = useState(steps[2])
  const [currentPath, setCurrentPath] = useState(() => {
    const relativePath = getRelativePath(window.location.pathname)
    if (relativePath === '/contact-us' || relativePath === `${HOME_PATH}/contact-us`) {
      return CONTACT_PATH
    }
    if (relativePath === '/collections' || relativePath === `${HOME_PATH}/collections`) {
      return COLLECTIONS_PATH
    }
    return HOME_PATH
  })
  const [pendingSection, setPendingSection] = useState(null)
  const [overlayStep, setOverlayStep] = useState('welcome')
  const [signupEmail, setSignupEmail] = useState('')
  const [overlayEmail, setOverlayEmail] = useState('')
  const [isFooterFixed, setIsFooterFixed] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [accountDetails, setAccountDetails] = useState(initialAccountDetails)
  const [draftAccountDetails, setDraftAccountDetails] = useState(initialAccountDetails)
  const [accountErrors, setAccountErrors] = useState({})
  const [statusMessage, setStatusMessage] = useState('')
  const [signupMessage, setSignupMessage] = useState('')
  const [overlayMessage, setOverlayMessage] = useState('')
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
  })
  const [loginForm, setLoginForm] = useState(initialLoginForm)
  const [authMessage, setAuthMessage] = useState('')
  const [addressForm, setAddressForm] = useState({
    firstName: '',
    apartment: '',
    country: '',
    city: '',
    phone: '',
    isDefault: false,
  })
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: 'IN',
    phoneNumber: '',
    message: '',
  })
  const [contactErrors, setContactErrors] = useState({})
  const [contactMessage, setContactMessage] = useState('')

  // Keeps the UI in sync when the user navigates with the browser back/forward buttons.
  useEffect(() => {
    const handlePopState = () => {
      const relativePath = getRelativePath(window.location.pathname)
      setCurrentPath(
        relativePath === '/contact-us' || relativePath === `${HOME_PATH}/contact-us`
          ? CONTACT_PATH
          : relativePath === '/collections' || relativePath === `${HOME_PATH}/collections`
            ? COLLECTIONS_PATH
            : HOME_PATH,
      )
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  // Shows the fixed footer only while the home page is within the intended scroll range.
  useEffect(() => {
    const updateFooterState = () => {
      if (currentPath !== HOME_PATH) {
        setIsFooterFixed(false)
        return
      }

      const profileSection = document.getElementById('about')
      const addressesSection = document.getElementById('addresses')

      if (!profileSection) {
        setIsFooterFixed(false)
        return
      }

      const headerOffset = window.innerHeight * 0.12
      const triggerPoint = profileSection.offsetTop - headerOffset
      const hidePoint = addressesSection
        ? addressesSection.offsetTop - headerOffset
        : Number.POSITIVE_INFINITY

      setIsFooterFixed(window.scrollY >= triggerPoint && window.scrollY < hidePoint)
    }

    updateFooterState()
    window.addEventListener('scroll', updateFooterState, { passive: true })
    window.addEventListener('resize', updateFooterState)

    return () => {
      window.removeEventListener('scroll', updateFooterState)
      window.removeEventListener('resize', updateFooterState)
    }
  }, [currentPath])

  // After switching back to the home page, scrolls to the section the user asked for.
  useEffect(() => {
    if (currentPath !== HOME_PATH || !pendingSection) {
      return
    }

    const animationFrameId = window.requestAnimationFrame(() => {
      const element = document.getElementById(pendingSection)

      if (element) {
        const header = document.querySelector('header')
        const headerHeight = header ? header.offsetHeight : 0
        const elementTop = element.getBoundingClientRect().top + window.scrollY

        window.scrollTo({
          top: Math.max(elementTop - headerHeight, 0),
          behavior: 'smooth',
        })
      }

      setPendingSection(null)
    })

    return () => window.cancelAnimationFrame(animationFrameId)
  }, [currentPath, pendingSection])

  // Changes the visible route and resets the page scroll position.
  const navigateToPath = (path) => {
    const fullPath = getFullPath(path === CONTACT_PATH ? '/contact-us' : path === COLLECTIONS_PATH ? '/collections' : '/')
    if (window.location.pathname !== fullPath) {
      window.history.pushState({}, '', fullPath)
    }

    setCurrentPath(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handles both page-to-page navigation and smooth scrolling to home page sections.
  const scrollToSection = (sectionId) => {
    if (sectionId === 'contact-us') {
      navigateToPath(CONTACT_PATH)
      return
    }

    if (sectionId === 'collections-page') {
      navigateToPath(COLLECTIONS_PATH)
      return
    }

    if (sectionId === 'home') {
      navigateToPath(HOME_PATH)
      return
    }

    if (currentPath !== HOME_PATH) {
      setPendingSection(sectionId)
      navigateToPath(HOME_PATH)
      return
    }

    const element = document.getElementById(sectionId)

    if (element) {
      const header = document.querySelector('header')
      const headerHeight = header ? header.offsetHeight : 0
      const elementTop = element.getBoundingClientRect().top + window.scrollY

      window.scrollTo({
        top: Math.max(elementTop - headerHeight, 0),
        behavior: 'smooth',
      })
    }
  }

  // Updates profile form values and clears any error for the edited field.
  const handleAccountFieldChange = (key, value) => {
    const nextValue = dateFieldKeys.has(key) ? formatDateInput(value) : value

    setDraftAccountDetails((current) => ({ ...current, [key]: nextValue }))
    setAccountErrors((current) => {
      if (!current[key]) {
        return current
      }

      const nextErrors = { ...current }
      delete nextErrors[key]
      return nextErrors
    })
  }

  // Switches profile edit mode on or saves the profile after validation.
  const handleEditToggle = () => {
    if (isEditing) {
      const nextErrors = {}

      accountFieldConfig.forEach(({ key, label, type }) => {
        const value = draftAccountDetails[key].trim()

        if (!value) {
          nextErrors[key] = `${label} is required.`
          return
        }

        if (type === 'date' && !isValidDateString(value)) {
          nextErrors[key] = `${label} must be in DD / MM / YYYY format.`
        }
      })

      if (Object.keys(nextErrors).length > 0) {
        setAccountErrors(nextErrors)
        setStatusMessage('Please fix the highlighted fields before saving.')
        return
      }

      setAccountDetails(draftAccountDetails)
      setAccountErrors({})
      setIsEditing(false)
      setStatusMessage('Profile details updated successfully.')
      return
    }

    setDraftAccountDetails(accountDetails)
    setAccountErrors({})
    setIsEditing(true)
    setStatusMessage('Edit mode enabled.')
  }

  // Stores placeholder action messages for buttons that are not fully connected yet.
  const handleStaticAction = (message) => {
    setStatusMessage(message)
  }

  // Updates the add-address form state.
  const handleAddressFormChange = (key, value) => {
    setAddressForm((current) => ({ ...current, [key]: value }))
  }

  // Prevents a page reload and shows a temporary save message for addresses.
  const handleAddressSave = (event) => {
    event.preventDefault()
    setStatusMessage('Address form saved. Connect this action next.')
  }

  // Updates contact form fields and removes old field errors as the user types.
  const handleContactFormChange = (key, value) => {
    setContactForm((current) => ({ ...current, [key]: value }))
    setContactErrors((current) => {
      if (!current[key]) {
        return current
      }

      const nextErrors = { ...current }
      delete nextErrors[key]
      return nextErrors
    })
  }

  // Validates the contact form, shows errors, and clears the form after success.
  const handleContactSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {}

    if (!contactForm.firstName.trim()) {
      nextErrors.firstName = 'First name is required.'
    }

    if (!contactForm.lastName.trim()) {
      nextErrors.lastName = 'Last name is required.'
    }

    if (!contactForm.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email.trim())) {
      nextErrors.email = 'Enter a valid email.'
    }

    if (!contactForm.phoneNumber.trim()) {
      nextErrors.phoneNumber = 'Phone number is required.'
    }

    if (!contactForm.message.trim()) {
      nextErrors.message = 'Message is required.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setContactErrors(nextErrors)
      setContactMessage('Please complete the contact form correctly.')
      return
    }

    setContactErrors({})
    setContactMessage(`Thanks ${contactForm.firstName.trim()}, your enquiry has been sent.`)
    setContactForm({
      firstName: '',
      lastName: '',
      email: '',
      phoneCode: 'IN',
      phoneNumber: '',
      message: '',
    })
  }

  // Handles the footer newsletter signup form.
  const handleSignupSubmit = () => {
    const trimmedEmail = signupEmail.trim()

    if (!trimmedEmail) {
      setSignupMessage('Please enter your email address.')
      return
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)

    if (!isValidEmail) {
      setSignupMessage('Please enter a valid email address.')
      return
    }

    setSignupMessage(`Subscribed with ${trimmedEmail}.`)
    setSignupEmail('')
  }

  // Moves the welcome overlay from the intro step to the newsletter step.
  const handleOverlayExplore = () => {
    setOverlayStep('newsletter')
    setOverlayMessage('')
  }

  // Closes the overlay and clears any related messages.
  const handleOverlayClose = () => {
    setOverlayStep(null)
    setOverlayMessage('')
    setAuthMessage('')
  }

  // Validates the overlay email step, then moves the user into account signup.
  const handleOverlaySignupSubmit = () => {
    const trimmedEmail = overlayEmail.trim()

    if (!trimmedEmail) {
      setOverlayMessage('Please enter your email address.')
      return
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)

    if (!isValidEmail) {
      setOverlayMessage('Please enter a valid email address.')
      return
    }

    setSignupMessage(`Subscribed with ${trimmedEmail}.`)
    setOverlayMessage(`Subscribed with ${trimmedEmail}.`)
    setSignupForm((current) => ({ ...current, email: trimmedEmail }))
    setOverlayStep('account-signup')
  }

  // Updates signup form fields inside the overlay.
  const handleSignupFormChange = (key, value) => {
    setSignupForm((current) => ({ ...current, [key]: value }))
    setAuthMessage('')
  }

  // Updates login form fields inside the overlay.
  const handleLoginFormChange = (key, value) => {
    setLoginForm((current) => ({ ...current, [key]: value }))
    setAuthMessage('')
  }

  // Switches the overlay between signup and login views.
  const handleAuthStepChange = (step) => {
    setAuthMessage('')
    if (step === 'login') {
      setLoginForm(initialLoginForm)
    }
    setOverlayStep(step === 'signup' ? 'account-signup' : 'login')
  }

  // Validates account signup details before letting the user continue to login.
  const handleAccountSignupSubmit = () => {
    if (
      !signupForm.firstName.trim() ||
      !signupForm.lastName.trim() ||
      !signupForm.email.trim() ||
      !signupForm.password.trim() ||
      !signupForm.confirmPassword.trim()
    ) {
      setAuthMessage('Please fill all signup details.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupForm.email.trim())) {
      setAuthMessage('Please enter a valid email address.')
      return
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      setAuthMessage('Password and confirm password must match.')
      return
    }

    setLoginForm(initialLoginForm)
    setAuthMessage('Signup complete. Please log in.')
    setOverlayStep('login')
  }

  // Validates login details and closes the overlay on success.
  const handleLoginSubmit = () => {
    if (!loginForm.email.trim() || !loginForm.password.trim()) {
      setAuthMessage('Please enter your login details.')
      return
    }

    if (!loginPasswordPattern.test(loginForm.password)) {
      setAuthMessage(
        'Password must be 8 to 20 characters and include at least one capital letter and one number.'
      )
      return
    }

    setSignupMessage(`Welcome back, ${loginForm.email.trim()}.`)
    setAuthMessage('')
    setOverlayMessage('')
    setOverlayStep(null)
  }

  // These flags decide which top-level page view should be rendered.
  const isContactPage = currentPath === CONTACT_PATH
  const isCollectionsPage = currentPath === COLLECTIONS_PATH

  // Main render: shows the contact page, collection page, or the home page sections.
  return (
    <div className="app-shell bg-[#fcfbf8] text-stone-800">
      <Navbar onNavigate={scrollToSection} />

      {/* Render the dedicated contact page when the route matches. */}
      {isContactPage ? (
        <ContactPage
          contactMethods={contactMethods}
          contactForm={contactForm}
          contactErrors={contactErrors}
          contactMessage={contactMessage}
          onNavigate={scrollToSection}
          onStaticAction={handleStaticAction}
          onContactFormChange={handleContactFormChange}
          onContactSubmit={handleContactSubmit}
        />
      ) : isCollectionsPage ? (
        <>
          {/* Render the standalone collections page when that route is active. */}
          <CollectionPage onNavigate={scrollToSection} />
        </>
      ) : (
        <main className="mx-auto w-full max-w-[1280px] px-6 pb-[25vh] pt-[12vh] sm:px-10 lg:px-16">
          {/* The welcome/auth overlay appears on top of the home page until dismissed. */}
          <WelcomeSignupOverlay
            step={overlayStep}
            email={overlayEmail}
            message={overlayMessage}
            signupForm={signupForm}
            loginForm={loginForm}
            authMessage={authMessage}
            onEmailChange={setOverlayEmail}
            onExplore={handleOverlayExplore}
            onClose={handleOverlayClose}
            onNewsletterSubmit={handleOverlaySignupSubmit}
            onSignupFieldChange={handleSignupFormChange}
            onSignupSubmit={handleAccountSignupSubmit}
            onLoginFieldChange={handleLoginFormChange}
            onLoginSubmit={handleLoginSubmit}
            onStepChange={handleAuthStepChange}
          />

          {/* Hero section introducing the customization experience. */}
        <section
          id="customize"
          className="grid min-h-[calc(100vh-37vh)] scroll-mt-[12vh] border-x border-b border-stone-200 bg-white lg:grid-cols-[1.65fr_0.95fr]"
        >
          <div className="min-h-[320px] lg:h-[85vh]">
            <img
              src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1400&q=80"
              alt="Diamond ring on hand"
              className="h-full max-h-[85vh] w-full object-cover"
            />
          </div>

          <div className="flex items-center border-t border-stone-200 px-6 py-8 lg:border-l lg:border-t-0 lg:px-10">
            <div className="max-w-[300px] space-y-3">
              <p className="text-[11px] tracking-[0.18em] text-stone-900">CUSTOMIZE</p>
              <p className="text-[13px] leading-6 text-stone-600">
                Design a piece that feels personal, refined, and lasting. Choose the
                diamond, setting, and finish with a calm guided process.
              </p>
            </div>
          </div>
        </section>

        {/* Step-based inspiration board for the customization journey. */}
        <section
          id="collections"
          className="grid min-h-[calc(100vh-37vh)] scroll-mt-[12vh] gap-8 border-x border-b border-stone-200 bg-white px-6 py-8 lg:grid-cols-[170px_minmax(0,1fr)] lg:px-12"
        >
          <aside className="flex flex-row flex-wrap gap-4 pt-1 lg:flex-col lg:gap-5">
            {steps.map((step) => (
              <button
                key={step}
                type="button"
                onClick={() => setActiveStep(step)}
                className={`text-left text-[14px] text-stone-700 transition hover:text-stone-950 ${
                  activeStep === step ? 'underline underline-offset-6' : ''
                }`}
              >
                {step}
              </button>
            ))}
          </aside>

          <div className="flex flex-col justify-center">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-[13px] text-stone-700">{activeStep}</p>
              <button type="button" className="text-[11px] text-stone-500">
                Inspiration Board
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {inspirationCards.map((card) => (
                <article key={card.id} className="overflow-hidden bg-stone-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="aspect-[3/4] w-full object-cover"
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Profile section where account details can be viewed and edited. */}
        <section
          id="about"
          className="min-h-[calc(100vh-37vh)] scroll-mt-[12vh] border-x border-b border-stone-200 bg-white px-6 py-8 lg:px-12"
        >
          <div className="grid gap-8 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-10">
            <aside className="pt-1">
              <h1 className="mb-8 text-[18px] font-normal tracking-[0.02em] text-stone-900">
                MY ACCOUNT
              </h1>

              <nav className="flex flex-col gap-6 text-[14px] text-stone-700">
                <button
                  type="button"
                  onClick={() => scrollToSection('about')}
                  className="w-fit text-left text-stone-950 underline decoration-[1px] underline-offset-[5px]"
                >
                  Profile Info
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('orders')}
                  className="w-fit text-left transition hover:text-stone-950"
                >
                  Orders
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('addresses')}
                  className="w-fit text-left transition hover:text-stone-950"
                >
                  Addresses
                </button>
                <button
                  type="button"
                  onClick={() => handleStaticAction('Logout action is ready to be connected.')}
                  className="w-fit text-left transition hover:text-stone-950"
                >
                  Logout
                </button>
              </nav>
            </aside>

            <article className="flex min-h-0 flex-col justify-between border border-stone-300 bg-white px-5 py-6 lg:min-h-[calc(100vh-37vh-4rem)] lg:px-6">
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {accountFieldConfig.map(({ key, label, type }) => (
                    <div key={key} className="space-y-1 border-b border-stone-200 pb-2">
                      <p className="text-[11px] text-stone-500">{label}</p>
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            inputMode={type === 'date' ? 'numeric' : 'text'}
                            maxLength={type === 'date' ? 14 : undefined}
                            placeholder={type === 'date' ? 'DD / MM / YYYY' : ''}
                            value={draftAccountDetails[key]}
                            onChange={(event) =>
                              handleAccountFieldChange(key, event.target.value)
                            }
                            className="w-full bg-transparent text-[13px] text-stone-800 outline-none placeholder:text-stone-400"
                          />
                          {accountErrors[key] ? (
                            <p className="text-[11px] text-red-500">{accountErrors[key]}</p>
                          ) : null}
                        </>
                      ) : (
                        <p className="text-[13px] text-stone-800">{accountDetails[key]}</p>
                      )}
                    </div>
                  ))}
                </div>

                {statusMessage ? (
                  <p className="text-[12px] text-stone-500">{statusMessage}</p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={handleEditToggle}
                className="mt-6 h-[40px] min-w-[126px] self-start border border-stone-900 px-5 text-[11px] tracking-[0.04em] text-stone-900 transition hover:bg-stone-900 hover:text-white"
              >
                {isEditing ? 'SAVE DETAILS' : 'EDIT DETAILS'}
              </button>
            </article>
          </div>
        </section>

        {/* Orders section listing previous purchases and quick actions. */}
        <section
          id="orders"
          className="min-h-[calc(100vh-37vh)] scroll-mt-[12vh] border-x border-b border-stone-200 bg-white px-6 py-8 lg:px-12"
        >
          <div className="grid gap-8 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-10">
            <aside className="pt-1">
              <h2 className="mb-8 text-[18px] font-normal tracking-[0.02em] text-stone-900">
                MY ACCOUNT
              </h2>

              <nav className="flex flex-col gap-6 text-[14px] text-stone-700">
                <button
                  type="button"
                  onClick={() => scrollToSection('about')}
                  className="w-fit text-left transition hover:text-stone-950"
                >
                  Profile Info
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('orders')}
                  className="w-fit text-left text-stone-950 underline decoration-[1px] underline-offset-[5px]"
                >
                  Orders
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('addresses')}
                  className="w-fit text-left transition hover:text-stone-950"
                >
                  Addresses
                </button>
                <button
                  type="button"
                  onClick={() => handleStaticAction('Logout action is ready to be connected.')}
                  className="w-fit text-left transition hover:text-stone-950"
                >
                  Logout
                </button>
              </nav>
            </aside>

            <div className="space-y-6">
              {orders.map((order) => (
                <article key={order.id} className="border border-stone-300 bg-white">
                  <header className="grid gap-4 border-b border-stone-300 px-5 py-4 md:grid-cols-[1.2fr_0.9fr_0.8fr_auto_auto] md:items-start lg:px-6">
                    <div>
                      <p className="text-[11px] text-stone-500">Order ID</p>
                      <p className="mt-1 text-[13px] leading-5 text-stone-800">#{order.id}</p>
                    </div>

                    <div>
                      <p className="text-[11px] text-stone-500">Placed</p>
                      <p className="mt-1 text-[13px] leading-5 text-stone-800">{order.placedOn}</p>
                    </div>

                    <div>
                      <p className="text-[11px] text-stone-500">Amount</p>
                      <p className="mt-1 text-[13px] leading-5 text-stone-800">{order.amount}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleStaticAction(`Viewing order #${order.id}.`)}
                      className="h-[40px] min-w-[126px] border border-stone-500 px-4 text-[11px] tracking-[0.04em] text-stone-700 transition hover:bg-stone-50"
                    >
                      VIEW ORDER
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStaticAction(`Opening invoice for order #${order.id}.`)}
                      className="h-[40px] min-w-[126px] border border-stone-500 px-4 text-[11px] tracking-[0.04em] text-stone-700 transition hover:bg-stone-50"
                    >
                      VIEW INVOICE
                    </button>
                
                  </header>

                  {/* Each ordered item is rendered as its own product summary row. */}

                  <div className="px-5 lg:px-6">
                    {order.items.map((item, index) => (
                      <section
                        key={item.id}
                        className={`py-6 ${
                          index !== order.items.length - 1 ? 'border-b border-stone-200' : ''
                        }`}
                      >
                        <div className="grid gap-5 md:grid-cols-[112px_minmax(0,1fr)_95px]">
                          <div className="h-[148px] w-[112px] overflow-hidden bg-[#f7f5f2]">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <h2 className="text-[16px] font-normal leading-6 text-stone-900">
                              {item.name}
                            </h2>
                            <p className="text-[13px] text-stone-700">Metal: {item.metal}</p>
                            <p className="text-[13px] text-stone-700">Diamond: {item.diamond}</p>
                            <p className="text-[13px] text-stone-700">Size: {item.size}</p>
                            <p className="text-[13px] text-stone-700">Qty: {item.qty}</p>
                          </div>

                          <p className="text-left text-[16px] text-stone-900 md:text-right">
                            {item.price}
                          </p>
                        </div>

                        <div className="mt-5 flex flex-col gap-3 text-[13px] text-stone-700 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-3">
                            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-stone-900 text-[8px] font-medium text-white">
                              OK
                            </span>
                            <p>{order.deliveredOn}</p>
                          </div>

                          <div className="flex items-center gap-3 text-stone-900">
                            <button
                              type="button"
                              onClick={() => handleStaticAction(`Viewing ${item.name}.`)}
                              className="transition hover:text-stone-600"
                            >
                              View Product
                            </button>
                            <span className="h-4 w-px bg-stone-300" />
                            <button
                              type="button"
                              onClick={() => handleStaticAction(`Buying ${item.name} again.`)}
                              className="transition hover:text-stone-600"
                            >
                              Buy Again
                            </button>
                          </div>
                        </div>
                      </section>
                    ))}
                  </div>
                </article>
              ))}
              {statusMessage ? <p className="text-[12px] text-stone-500">{statusMessage}</p> : null}
            </div>
          </div>
        </section>

        {/* Address book section with saved addresses and a new-address form. */}
        <section
          id="addresses"
          className="scroll-mt-[12vh] border-x border-b border-stone-200 bg-white px-6 py-8 lg:px-12"
        >
          <div className="grid gap-8 lg:grid-cols-[170px_minmax(0,1fr)] lg:gap-8">
            <aside className="pt-1">
              <h2 className="mb-7 text-[17px] font-normal tracking-[0.02em] text-stone-900">
                MY ACCOUNT
              </h2>

              <nav className="flex flex-col gap-5 text-[13px] text-stone-700">
                <button
                  type="button"
                  onClick={() => scrollToSection('about')}
                  className="w-fit text-left transition hover:text-stone-950"
                >
                  Profile Info
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('orders')}
                  className="w-fit text-left transition hover:text-stone-950"
                >
                  Orders
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('addresses')}
                  className="w-fit text-left text-stone-950 underline decoration-[1px] underline-offset-[5px]"
                >
                  Addresses
                </button>
                <button
                  type="button"
                  onClick={() => handleStaticAction('Logout action is ready to be connected.')}
                  className="w-fit text-left transition hover:text-stone-950"
                >
                  Logout
                </button>
              </nav>
            </aside>

            <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_270px]">
              <div>
                <div className="mb-6">
                  <p className="text-[15px] font-normal tracking-[0.02em] text-stone-900">
                    SAVED ADDRESSES
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {savedAddresses.map((address) => (
                    <article
                      key={address.id}
                      className="flex min-h-[182px] flex-col justify-between border border-stone-300 bg-white"
                    >
                      <div className="space-y-1 px-5 py-6 text-[13px] leading-6 text-stone-700">
                        <h3 className="mb-1 text-[15px] font-normal text-stone-900">
                          {address.label}
                        </h3>
                        {address.lines.map((line) => (
                          <p key={`${address.id}-${line}`}>{line}</p>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 border-t border-stone-300 text-[11px] tracking-[0.04em] text-stone-900">
                        <button
                          type="button"
                          onClick={() => handleStaticAction(`Edit action ready for ${address.label}.`)}
                          className="h-9 border-r border-stone-300 transition hover:bg-stone-50"
                        >
                          EDIT
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStaticAction(`Remove action ready for ${address.label}.`)}
                          className="h-9 transition hover:bg-stone-50"
                        >
                          REMOVE
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => handleStaticAction('Add new address button clicked.')}
                    className="h-10 min-w-[146px] border border-stone-400 px-5 text-[10px] tracking-[0.05em] text-stone-800 transition hover:bg-stone-900 hover:text-white"
                  >
                    ADD NEW ADDRESS
                  </button>
                </div>
              </div>

              <aside className="border border-stone-200 bg-white px-5 py-7">
                <p className="mb-8 text-center text-[14px] tracking-[0.03em] text-stone-900">
                  ADD NEW ADDRESS
                </p>

                <form className="space-y-6" onSubmit={handleAddressSave}>
                  {addressFormFields.map((field) => (
                    <label key={field.key} className="block">
                      <span className="mb-2.5 block text-[12px] text-stone-800">
                        {field.label}
                      </span>
                      <input
                        type="text"
                        value={addressForm[field.key]}
                        onChange={(event) =>
                          handleAddressFormChange(field.key, event.target.value)
                        }
                        placeholder={field.placeholder}
                        className="w-full border-0 border-b border-stone-300 bg-transparent pb-2.5 text-[12px] text-stone-800 outline-none placeholder:text-stone-400"
                      />
                    </label>
                  ))}

                  <label className="flex items-center gap-3 text-[11px] text-stone-700">
                    <input
                      type="checkbox"
                      checked={addressForm.isDefault}
                      onChange={(event) =>
                        handleAddressFormChange('isDefault', event.target.checked)
                      }
                      className="h-4 w-4 rounded-none border border-stone-300 accent-stone-900"
                    />
                    <span>Save address as Default</span>
                  </label>

                  <button
                    type="submit"
                    className="mt-1 h-[42px] w-full bg-[#1f1c19] text-[11px] tracking-[0.08em] text-white transition hover:bg-black"
                  >
                    SAVE ADDRESS
                  </button>
                </form>
              </aside>
            </div>
          </div>

        </section>

        {/* Privacy policy section built from reusable content data. */}
        <section
          id="privacy-policy"
          className="scroll-mt-[12vh] border-x border-b border-stone-200 bg-white px-6 py-8 lg:px-12 lg:py-10"
        >
          <div className="mx-auto max-w-[980px]">
            <div className="max-w-[860px]">
              <h2 className="text-[16px] font-normal text-stone-900">Privacy Policy</h2>
              <p className="mt-4 text-[10px] text-stone-500">By- Alexander Maquenzy</p>
              <p className="mt-1 text-[10px] text-stone-500">Last Updated on- 07 June , 2025</p>

              <p className="mt-6 text-[12px] leading-6 text-stone-700">
                At Solvi, we value your trust. This Privacy Policy outlines how we collect,
                use, and protect your personal information when you visit our website or
                engage with our services. By using our website, you agree to the terms of this
                policy.
              </p>

              <div className="mt-7 space-y-7">
                {privacySections.map((section) => (
                  <div key={section.title}>
                    <h3 className="mb-4 text-[13px] font-normal text-stone-900">
                      {section.title}
                    </h3>

                    {section.isList ? (
                      <div className="space-y-2 text-[12px] leading-6 text-stone-700">
                        <p>{section.content[0]}</p>
                        <ul className="space-y-1 pl-4">
                          {section.content.slice(1).map((item) => (
                            <li key={item} className="list-disc">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="space-y-2 text-[12px] leading-6 text-stone-700">
                        {section.content.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Buy-back policy section built from reusable content data. */}
        <section
          id="buy-back"
          className="scroll-mt-[12vh] border-x border-b border-stone-200 bg-white px-6 py-8 lg:px-12 lg:py-10"
        >
          <div className="mx-auto max-w-[980px]">
            <div className="max-w-[860px]">
              <h2 className="text-[16px] font-normal text-stone-900">BUY BACK</h2>
              <p className="mt-4 text-[10px] text-stone-500">By- Alexander Maquenzy</p>
              <p className="mt-1 text-[10px] text-stone-500">Last Updated on- 07 June , 2025</p>

              <p className="mt-6 text-[12px] leading-6 text-stone-700">
                At Solvi Jewel, we understand that your jewelry needs may change over time.
                That&apos;s why we offer a Lifetime Buyback Policy allowing you to sell your
                jewelry back to us with confidence.
              </p>

              <div className="mt-7 space-y-7">
                {buyBackSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="mb-4 text-[13px] font-normal text-stone-900">
                      {section.title}
                    </h3>
                    <ul className="space-y-1 pl-4 text-[12px] leading-6 text-stone-700">
                      {section.items.map((item) => (
                        <li key={item} className="list-disc">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      )}

      {/* Fixed footer with quick links and newsletter signup. */}
      <footer
        className={`fixed bottom-0 left-0 z-40 h-[25vh] w-full border-t border-stone-200 bg-[#faf8f4] transition-opacity duration-200 ${
          isFooterFixed ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="mx-auto grid h-full w-full max-w-[1280px] gap-6 px-6 py-6 sm:px-10 lg:grid-cols-[repeat(4,140px)_1fr] lg:px-16 lg:py-8">
          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-2">
              <h3 className="text-[11px] tracking-[0.12em] text-stone-900">{column.title}</h3>
              <div className="space-y-1.5 text-[12px] text-stone-600">
                {column.links.map((link) => (
                  <button
                    key={link}
                    type="button"
                    className="block text-left transition hover:text-stone-900"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="space-y-3 lg:pl-6">
            <p className="text-[12px] leading-5 text-stone-700">
              Signup for curated insights and special updates from Solvi.
            </p>
            <div className="flex items-center border-b border-stone-300 pb-2">
              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(event) => setSignupEmail(event.target.value)}
                className="w-full bg-transparent text-[12px] outline-none placeholder:text-stone-400"
              />
              <button
                type="button"
                onClick={handleSignupSubmit}
                className="text-[11px] tracking-[0.12em] text-stone-900"
              >
                SUBMIT
              </button>
            </div>
            {signupMessage ? <p className="text-[11px] text-stone-500">{signupMessage}</p> : null}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
