import { FiX } from 'react-icons/fi'

const welcomeImage =
  'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1400&q=80'

const newsletterImage =
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1400&q=80'

const accountSignupImage =
  'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1400&q=80'

const loginImage =
  'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1400&q=80'

function OverlayPanel({ children, image, imageAlt, onClose, panelClassName = '', imageClassName = '' }) {
  return (
    <div
      className={`relative grid overflow-hidden bg-white lg:grid-cols-[0.9fr_1.35fr] ${panelClassName}`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close overlay"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white/95 text-stone-800 transition hover:bg-stone-100"
      >
        <FiX className="h-5 w-5" />
      </button>

      <div className="flex items-center justify-center border-b border-stone-200 bg-[#fbfaf8] px-8 py-14 sm:px-12 lg:border-b-0 lg:border-r lg:px-16">
        <div className="w-full max-w-[386px]">{children}</div>
      </div>

      <div className={imageClassName}>
        <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
      </div>
    </div>
  )
}

function AuthTabs({ activeTab, onSelect }) {
  return (
    <div className="mb-7 text-center">
      <div className="inline-flex items-center gap-3 text-[13px] tracking-[0.06em] text-stone-900">
        <button
          type="button"
          onClick={() => onSelect('login')}
          className={activeTab === 'login' ? 'text-stone-950' : 'text-stone-500'}
        >
          LOG IN
        </button>
        <button
          type="button"
          onClick={() => onSelect('signup')}
          className={activeTab === 'signup' ? 'text-stone-950' : 'text-stone-500'}
        >
          SIGN UP
        </button>
      </div>
      <div className="mx-auto mt-3 h-px w-44 bg-stone-300" />
    </div>
  )
}

function WelcomeSignupOverlay({
  step,
  email,
  message,
  signupForm,
  loginForm,
  authMessage,
  onEmailChange,
  onExplore,
  onClose,
  onNewsletterSubmit,
  onSignupFieldChange,
  onSignupSubmit,
  onLoginFieldChange,
  onLoginSubmit,
  onStepChange,
}) {
  if (!step) {
    return null
  }

  const basePanelClassName = 'min-h-[calc(100vh-12vh)]'
  const baseImageClassName = 'min-h-[320px] lg:h-[calc(100vh-12vh)]'

  return (
    <section
      id="welcome-signup"
      className="scroll-mt-[12vh] border-x border-b border-stone-200 bg-white"
    >
      {step === 'welcome' ? (
        <OverlayPanel
          image={welcomeImage}
          imageAlt="Jewellery welcome visual"
          onClose={onClose}
          panelClassName={basePanelClassName}
          imageClassName={baseImageClassName}
        >
          <div className="space-y-6 text-center">
            <div className="space-y-4">
              <p className="text-[13px] tracking-[0.18em] text-stone-900">WELCOME!</p>
              <div className="mx-auto h-px w-20 bg-stone-300" />
              <p className="text-[13px] leading-6 text-stone-600">
                Enjoy 10% off your first purchase as a token of timeless elegance.
                <br />
                (Use code: FIRST10 at checkout)
              </p>
            </div>

            <button
              type="button"
              onClick={onExplore}
              className="h-11 w-full bg-[#1f1c19] text-[11px] tracking-[0.12em] text-white transition hover:bg-black"
            >
              EXPLORE NOW
            </button>
          </div>
        </OverlayPanel>
      ) : null}

      {step === 'newsletter' ? (
        <OverlayPanel
          image={newsletterImage}
          imageAlt="Newsletter signup visual"
          onClose={onClose}
          panelClassName={basePanelClassName}
          imageClassName={baseImageClassName}
        >
          <div className="space-y-5">
            <div className="space-y-4 text-center lg:text-left">
              <p className="text-[13px] tracking-[0.18em] text-stone-900">EXPLORE NOW</p>
              <div className="mx-auto h-px w-24 bg-stone-300 lg:mx-0" />
              <p className="text-[13px] leading-6 text-stone-600">
                Signup for our newsletter and be the first to discover the latest
                collections, special offers, and BTS.
              </p>
            </div>

            <label className="block">
              <span className="mb-2 block text-[12px] text-stone-800">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => onEmailChange(event.target.value)}
                placeholder="Enter Email here"
                className="h-11 w-full border border-stone-300 bg-white px-4 text-[12px] text-stone-800 outline-none placeholder:text-stone-400"
              />
            </label>

            <button
              type="button"
              onClick={onNewsletterSubmit}
              className="h-11 w-full bg-[#1f1c19] text-[11px] tracking-[0.12em] text-white transition hover:bg-black"
            >
              SIGN UP
            </button>

            {message ? <p className="text-[11px] text-stone-500">{message}</p> : null}
          </div>
        </OverlayPanel>
      ) : null}

      {step === 'account-signup' ? (
        <OverlayPanel
          image={accountSignupImage}
          imageAlt="Account signup visual"
          onClose={onClose}
          panelClassName={basePanelClassName}
          imageClassName={baseImageClassName}
        >
          <AuthTabs activeTab="signup" onSelect={onStepChange} />

          <form
            className="space-y-3"
            onSubmit={(event) => {
              event.preventDefault()
              onSignupSubmit()
            }}
          >
            <label className="block">
              <span className="mb-2 block text-[12px] text-stone-800">First name</span>
              <input
                type="text"
                value={signupForm.firstName}
                onChange={(event) => onSignupFieldChange('firstName', event.target.value)}
                placeholder="First name"
                className="h-12 w-full rounded-[4px] border border-stone-300 bg-white px-4 text-[12px] text-stone-800 outline-none placeholder:text-stone-400"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[12px] text-stone-800">Last name</span>
              <input
                type="text"
                value={signupForm.lastName}
                onChange={(event) => onSignupFieldChange('lastName', event.target.value)}
                placeholder="Last name"
                className="h-12 w-full rounded-[4px] border border-stone-300 bg-white px-4 text-[12px] text-stone-800 outline-none placeholder:text-stone-400"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[12px] text-stone-800">Email</span>
              <input
                type="email"
                value={signupForm.email}
                onChange={(event) => onSignupFieldChange('email', event.target.value)}
                placeholder="Enter Email here"
                className="h-12 w-full rounded-[4px] border border-stone-300 bg-white px-4 text-[12px] text-stone-800 outline-none placeholder:text-stone-400"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[12px] text-stone-800">Password</span>
              <input
                type={signupForm.showPassword ? 'text' : 'password'}
                value={signupForm.password}
                onChange={(event) => onSignupFieldChange('password', event.target.value)}
                placeholder="Enter Password"
                className="h-12 w-full rounded-[4px] border border-stone-300 bg-white px-4 text-[12px] text-stone-800 outline-none placeholder:text-stone-400"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[12px] text-stone-800">Confirm Password</span>
              <input
                type={signupForm.showPassword ? 'text' : 'password'}
                value={signupForm.confirmPassword}
                onChange={(event) => onSignupFieldChange('confirmPassword', event.target.value)}
                placeholder="Re-Enter Password"
                className="h-12 w-full rounded-[4px] border border-stone-300 bg-white px-4 text-[12px] text-stone-800 outline-none placeholder:text-stone-400"
              />
            </label>

            <label className="flex items-center gap-3 pt-1 text-[11px] text-stone-500">
              <input
                type="checkbox"
                checked={signupForm.showPassword}
                onChange={(event) => onSignupFieldChange('showPassword', event.target.checked)}
                className="h-4 w-4 rounded-[4px] border border-stone-300 accent-stone-900"
              />
              <span>Show password</span>
            </label>

            {authMessage ? <p className="pt-1 text-[11px] text-stone-500">{authMessage}</p> : null}

            <button
              type="submit"
              className="mt-6 h-12 w-full bg-[#1f1c19] text-[11px] tracking-[0.12em] text-white transition hover:bg-black"
            >
              SIGN UP
            </button>
          </form>
        </OverlayPanel>
      ) : null}

      {step === 'login' ? (
        <OverlayPanel
          image={loginImage}
          imageAlt="Login visual"
          onClose={onClose}
          panelClassName={basePanelClassName}
          imageClassName={baseImageClassName}
        >
          <AuthTabs activeTab="login" onSelect={onStepChange} />

          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault()
              onLoginSubmit()
            }}
          >
            <label className="block">
              <span className="mb-2 block text-[12px] text-stone-800">Email/ User name</span>
              <input
                type="text"
                value={loginForm.email}
                onChange={(event) => onLoginFieldChange('email', event.target.value)}
                placeholder="Enter Email / User name"
                className="h-12 w-full rounded-[4px] border border-stone-300 bg-white px-4 text-[12px] text-stone-800 outline-none placeholder:text-stone-400"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[12px] text-stone-800">Password</span>
              <input
                type={loginForm.showPassword ? 'text' : 'password'}
                value={loginForm.password}
                onChange={(event) => onLoginFieldChange('password', event.target.value)}
                placeholder="Enter Password"
                minLength={8}
                maxLength={20}
                pattern="(?=.*[A-Z])(?=.*\d).{8,20}"
                title="Password must be 8 to 20 characters and include at least one capital letter and one number."
                className="h-12 w-full rounded-[4px] border border-stone-300 bg-white px-4 text-[12px] text-stone-800 outline-none placeholder:text-stone-400"
              />
            </label>

            <div className="flex items-center justify-between gap-4 text-[11px] text-stone-500">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={loginForm.showPassword}
                  onChange={(event) => onLoginFieldChange('showPassword', event.target.checked)}
                  className="h-4 w-4 rounded-[4px] border border-stone-300 accent-stone-900"
                />
                <span>Show password</span>
              </label>
              <button type="button" className="transition hover:text-stone-800">
                Forgot password?
              </button>
            </div>

            {authMessage ? <p className="text-[11px] text-stone-500">{authMessage}</p> : null}

            <button
              type="submit"
              className="mt-7 h-12 w-full bg-[#1f1c19] text-[11px] tracking-[0.12em] text-white transition hover:bg-black"
            >
              LOG IN
            </button>
          </form>
        </OverlayPanel>
      ) : null}
    </section>
  )
}

export default WelcomeSignupOverlay
