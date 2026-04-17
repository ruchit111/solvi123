function ContactPage({
  contactMethods,
  contactForm,
  contactErrors,
  contactMessage,
  onNavigate,
  onStaticAction,
  onContactFormChange,
  onContactSubmit,
}) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1280px] px-6 pt-[12vh] sm:px-10 lg:px-16">
      <section className="min-h-[calc(100vh-12vh)] border-x border-b border-stone-200 bg-white px-6 py-8 lg:px-12 lg:py-10">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-8 flex items-center justify-between gap-4 border-b border-stone-200 pb-5">
            <div>
              <p className="text-[10px] tracking-[0.08em] text-stone-700">CONTACT PAGE</p>
              <h1 className="mt-2 text-[18px] font-normal tracking-[0.03em] text-stone-900">
                Contact Us
              </h1>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-[10px] tracking-[0.08em] text-stone-700 transition hover:text-stone-950"
            >
              BACK TO HOME
            </button>
          </div>

          <div className="grid gap-6 border-b border-stone-200 pb-8 md:grid-cols-3">
            {contactMethods.map((method) => (
              <div key={method.title} className="text-center">
                <p className="text-[10px] tracking-[0.08em] text-stone-700">{method.title}</p>
                <button
                  type="button"
                  onClick={() => onStaticAction(`${method.title} selected.`)}
                  className="mt-3 text-[11px] text-stone-500 transition hover:text-stone-900"
                >
                  {method.value}
                </button>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-[660px]">
            <div className="mb-7 text-center">
              <p className="text-[12px] tracking-[0.04em] text-stone-900">CONTACT US</p>
              <p className="mt-3 text-[9px] leading-5 text-stone-400">
                Our dedicated team is available every day of the week to assist with any
                inquiries. Feel free to email us here or give us a call at +01-0012 001 001.
              </p>
            </div>

            <form className="space-y-4" onSubmit={onContactSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2.5 block text-[11px] text-stone-800">First name</span>
                  <input
                    type="text"
                    value={contactForm.firstName}
                    onChange={(event) => onContactFormChange('firstName', event.target.value)}
                    placeholder="First name"
                    className="w-full border-0 border-b border-stone-300 bg-transparent pb-2.5 text-[11px] text-stone-800 outline-none placeholder:text-stone-300"
                  />
                  {contactErrors.firstName ? (
                    <p className="pt-2 text-[10px] text-red-500">{contactErrors.firstName}</p>
                  ) : null}
                </label>

                <label className="block">
                  <span className="mb-2.5 block text-[11px] text-stone-800">Last name</span>
                  <input
                    type="text"
                    value={contactForm.lastName}
                    onChange={(event) => onContactFormChange('lastName', event.target.value)}
                    placeholder="Last name"
                    className="w-full border-0 border-b border-stone-300 bg-transparent pb-2.5 text-[11px] text-stone-800 outline-none placeholder:text-stone-300"
                  />
                  {contactErrors.lastName ? (
                    <p className="pt-2 text-[10px] text-red-500">{contactErrors.lastName}</p>
                  ) : null}
                </label>
              </div>

              <label className="block">
                <span className="mb-2.5 block text-[11px] text-stone-800">Email</span>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(event) => onContactFormChange('email', event.target.value)}
                  placeholder="Enter Email here"
                  className="w-full border-0 border-b border-stone-300 bg-transparent pb-2.5 text-[11px] text-stone-800 outline-none placeholder:text-stone-300"
                />
                {contactErrors.email ? (
                  <p className="pt-2 text-[10px] text-red-500">{contactErrors.email}</p>
                ) : null}
              </label>

              <div className="grid gap-4 md:grid-cols-[84px_minmax(0,1fr)]">
                <label className="block">
                  <span className="mb-2.5 block text-[11px] text-stone-800">Phone number</span>
                  <select
                    value={contactForm.phoneCode}
                    onChange={(event) => onContactFormChange('phoneCode', event.target.value)}
                    className="w-full border-0 border-b border-stone-300 bg-transparent pb-2.5 text-[11px] text-stone-800 outline-none"
                  >
                    <option value="IN">IN</option>
                    <option value="US">US</option>
                    <option value="UK">UK</option>
                  </select>
                </label>

                <label className="block md:pt-[29px]">
                  <input
                    type="text"
                    value={contactForm.phoneNumber}
                    onChange={(event) => onContactFormChange('phoneNumber', event.target.value)}
                    placeholder="Enter Number"
                    className="w-full border-0 border-b border-stone-300 bg-transparent pb-2.5 text-[11px] text-stone-800 outline-none placeholder:text-stone-300"
                  />
                  {contactErrors.phoneNumber ? (
                    <p className="pt-2 text-[10px] text-red-500">{contactErrors.phoneNumber}</p>
                  ) : null}
                </label>
              </div>

              <label className="block">
                <span className="mb-2.5 block text-[11px] text-stone-800">Message</span>
                <textarea
                  rows={3}
                  value={contactForm.message}
                  onChange={(event) => onContactFormChange('message', event.target.value)}
                  placeholder="Describe your query"
                  className="w-full resize-none border-0 border-b border-stone-300 bg-transparent pb-2.5 text-[11px] text-stone-800 outline-none placeholder:text-stone-300"
                />
                {contactErrors.message ? (
                  <p className="pt-2 text-[10px] text-red-500">{contactErrors.message}</p>
                ) : null}
              </label>

              <button
                type="submit"
                className="mt-3 h-[42px] w-full bg-[#1f1c19] text-[10px] tracking-[0.08em] text-white transition hover:bg-black"
              >
                CONTACT
              </button>

              {contactMessage ? (
                <p className="text-center text-[10px] text-stone-500">{contactMessage}</p>
              ) : null}
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ContactPage
