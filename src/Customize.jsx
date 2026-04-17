import { useState } from 'react'

const pageLinks = [
  {
    title: 'OFFERINGS',
    links: ['Collections', 'Diamonds', 'Customize', 'Stories'],
  },
  {
    title: 'CUSTOMER CARE',
    links: ['Contact', 'Account', 'Shipping', 'Care'],
  },
  {
    title: 'ABOUT',
    links: ['About Solvi', 'Craft', 'Journal', 'Privacy'],
  },
  {
    title: 'CONTACT',
    links: ['+01-0001 002 003', 'niora@gmail.com', 'Mon - Sat', '9 AM - 7 PM'],
  },
]

const editorialTiles = [
  {
    id: 1,
    type: 'copy',
    eyebrow: 'BESPOKE DESIGN',
    title: 'Jewelry created around your story.',
    body:
      'Our custom process begins with references, conversation, and a gentle review of proportions before any stone is chosen.',
  },
  {
    id: 2,
    type: 'image',
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Diamond ring resting on stones',
  },
  {
    id: 3,
    type: 'image',
    image:
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=80',
    alt: 'Hand wearing a diamond ring',
  },
  {
    id: 4,
    type: 'copy',
    eyebrow: 'PRIVATE REVIEW',
    title: 'Sketches, references, and direction in one place.',
    body:
      'We refine mood, scale, and silhouette first so the final design feels personal instead of generic.',
  },
]

const consultationHighlights = [
  'One-on-one design consultation',
  'Stone and setting recommendations',
  'Sketch review before production',
  'Timeline guidance for gifting or events',
]

const styleDirections = [
  'Minimal',
  'Classic',
  'Modern',
  'Bold',
  'Vintage',
  'Romantic',
]

const wearingMoments = [
  'Engagement',
  'Wedding',
  'Anniversary',
  'Daily wear',
  'Statement piece',
  'Gift',
]

const initialConsultationForm = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
}

const initialVisionForm = {
  occasion: '',
  referenceNotes: '',
  designBrief: '',
  inspirationLink: '',
}

function Customize({ onNavigate }) {
  const [activePage, setActivePage] = useState('overview')
  const [consultationForm, setConsultationForm] = useState(initialConsultationForm)
  const [consultationErrors, setConsultationErrors] = useState({})
  const [consultationMessage, setConsultationMessage] = useState('')
  const [visionForm, setVisionForm] = useState(initialVisionForm)
  const [visionErrors, setVisionErrors] = useState({})
  const [visionMessage, setVisionMessage] = useState('')
  const [selectedStyles, setSelectedStyles] = useState(['Minimal', 'Classic'])
  const [uploadedFileName, setUploadedFileName] = useState('')

  const handleConsultationChange = (key, value) => {
    setConsultationForm((current) => ({ ...current, [key]: value }))
    setConsultationErrors((current) => {
      if (!current[key]) {
        return current
      }

      const nextErrors = { ...current }
      delete nextErrors[key]
      return nextErrors
    })
  }

  const handleVisionChange = (key, value) => {
    setVisionForm((current) => ({ ...current, [key]: value }))
    setVisionErrors((current) => {
      if (!current[key]) {
        return current
      }

      const nextErrors = { ...current }
      delete nextErrors[key]
      return nextErrors
    })
  }

  const handleConsultationSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {}

    if (!consultationForm.firstName.trim()) {
      nextErrors.firstName = 'First name is required.'
    }

    if (!consultationForm.lastName.trim()) {
      nextErrors.lastName = 'Last name is required.'
    }

    if (!consultationForm.phoneNumber.trim()) {
      nextErrors.phoneNumber = 'Phone number is required.'
    }

    if (!consultationForm.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(consultationForm.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setConsultationErrors(nextErrors)
      setConsultationMessage('')
      return
    }

    setConsultationErrors({})
    setConsultationMessage(
      `Consultation request saved for ${consultationForm.firstName.trim()} ${consultationForm.lastName.trim()}.`,
    )
    setConsultationForm(initialConsultationForm)
  }

  const toggleStyleDirection = (style) => {
    setSelectedStyles((current) => {
      if (current.includes(style)) {
        return current.filter((item) => item !== style)
      }

      return [...current, style]
    })
  }

  const handleVisionSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {}

    if (!visionForm.occasion) {
      nextErrors.occasion = 'Choose when you plan to wear the piece.'
    }

    if (!visionForm.designBrief.trim()) {
      nextErrors.designBrief = 'Describe the design you want to create.'
    }

    if (selectedStyles.length === 0) {
      nextErrors.selectedStyles = 'Select at least one design direction.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setVisionErrors(nextErrors)
      setVisionMessage('')
      return
    }

    setVisionErrors({})
    setVisionMessage('Your inspiration brief has been saved. We are ready for the next step.')
  }

  const renderFooter = () => (
    <section className="border-x border-b border-stone-200 bg-white px-6 py-6 lg:px-10">
      <div className="grid gap-6 lg:grid-cols-[repeat(4,120px)_1fr] lg:items-end">
        {pageLinks.map((column) => (
          <div key={column.title} className="space-y-2">
            <p className="text-[10px] tracking-[0.12em] text-stone-500">{column.title}</p>
            <div className="space-y-1 text-[11px] text-stone-700">
              {column.links.map((link) => (
                <p key={link}>{link}</p>
              ))}
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-3 lg:items-end">
          <p className="text-[10px] tracking-[0.12em] text-stone-500">
            {activePage === 'overview' ? 'PAGE 01 / 02' : 'PAGE 02 / 02'}
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setActivePage('overview')}
              className={`h-9 min-w-[108px] border px-4 text-[10px] tracking-[0.1em] transition ${
                activePage === 'overview'
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-stone-300 text-stone-700 hover:border-stone-900'
              }`}
            >
              CONSULT
            </button>
            <button
              type="button"
              onClick={() => setActivePage('vision')}
              className={`h-9 min-w-[108px] border px-4 text-[10px] tracking-[0.1em] transition ${
                activePage === 'vision'
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-stone-300 text-stone-700 hover:border-stone-900'
              }`}
            >
              SHARE VISION
            </button>
          </div>
        </div>
      </div>
    </section>
  )

  return (
    <main className="mx-auto w-full max-w-[1280px] px-6 pt-[12vh] sm:px-10 lg:px-16">
      {activePage === 'overview' ? (
        <>
          <section className="border-x border-b border-stone-200 bg-white">
            <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
              <div className="grid gap-px bg-stone-200 sm:grid-cols-2">
                {editorialTiles.map((tile) =>
                  tile.type === 'image' ? (
                    <article key={tile.id} className="min-h-[260px] overflow-hidden bg-white">
                      <img
                        src={tile.image}
                        alt={tile.alt}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </article>
                  ) : (
                    <article
                      key={tile.id}
                      className="flex min-h-[260px] flex-col justify-between bg-[#f8f5ef] p-6 lg:p-8"
                    >
                      <p className="text-[10px] tracking-[0.18em] text-stone-500">
                        {tile.eyebrow}
                      </p>
                      <div className="space-y-3">
                        <h1 className="font-serif text-[28px] leading-[1.02] text-stone-900">
                          {tile.title}
                        </h1>
                        <p className="max-w-[280px] text-[12px] leading-6 text-stone-600">
                          {tile.body}
                        </p>
                      </div>
                    </article>
                  ),
                )}
              </div>

              <div className="border-t border-stone-200 px-6 py-8 lg:border-l lg:border-t-0 lg:px-10 lg:py-10">
                <p className="text-[10px] tracking-[0.18em] text-stone-500">CUSTOM CONSULTATION</p>
                <h2 className="mt-4 font-serif text-[38px] leading-[0.95] text-stone-900 sm:text-[46px]">
                  Start with the story,
                  <br />
                  not the setting.
                </h2>
                <p className="mt-5 max-w-[420px] text-[13px] leading-7 text-stone-600">
                  The first stage focuses on understanding your references, proportions,
                  lifestyle, and the feeling you want the piece to carry. This page is
                  inspired by the first left-side reference from your design.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {consultationHighlights.map((item) => (
                    <div
                      key={item}
                      className="border border-stone-200 bg-[#fcfbf8] px-4 py-4 text-[12px] text-stone-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-[28px] border border-stone-200 bg-[#faf8f4] p-5">
                  <p className="text-[10px] tracking-[0.16em] text-stone-500">DESIGN NOTE</p>
                  <div className="mt-4 rounded-[24px] border border-dashed border-stone-300 bg-white px-5 py-6">
                    <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
                      <div className="space-y-3">
                        <p className="text-[12px] text-stone-800">Sketch direction</p>
                        <div className="relative h-[180px] overflow-hidden rounded-[20px] border border-stone-200 bg-[linear-gradient(180deg,#faf8f3,#ffffff)]">
                          <div className="absolute left-[18%] top-[16%] h-[68%] w-[34%] rounded-full border border-stone-400" />
                          <div className="absolute left-[52%] top-[18%] h-[60%] w-[16%] rounded-full border border-stone-300" />
                          <div className="absolute left-[12%] top-[50%] h-px w-[30%] bg-stone-300" />
                          <div className="absolute left-[62%] top-[34%] h-px w-[20%] bg-stone-300" />
                          <div className="absolute left-[32%] top-[22%] h-[18%] w-[10%] rounded-[12px] border border-stone-400" />
                          <p className="absolute bottom-4 left-4 text-[10px] tracking-[0.12em] text-stone-400">
                            DESIGN BLUEPRINT
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 text-[11px] leading-6 text-stone-600">
                        <p>
                          Bring mood boards, sketches, reference photos, or even just a few
                          words describing the mood you want.
                        </p>
                        <p>
                          We refine silhouette and scale before moving into the gemstone
                          selection stage.
                        </p>
                        <button
                          type="button"
                          onClick={() => setActivePage('vision')}
                          className="mt-2 h-10 min-w-[150px] bg-[#1f1c19] px-5 text-[10px] tracking-[0.12em] text-white transition hover:bg-black"
                        >
                          NEXT PAGE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-x border-b border-stone-200 bg-white px-6 py-8 lg:px-10 lg:py-10">
            <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
              <div className="space-y-5">
                <div className="overflow-hidden border border-stone-200 bg-[#f6f3ee] p-4">
                  <img
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80"
                    alt="Jewelry sketching desk"
                    className="aspect-[4/3] w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-3 rounded-[28px] border border-stone-200 bg-[#faf8f4] p-5">
                  <p className="text-[10px] tracking-[0.14em] text-stone-500">
                    WHAT TO PREPARE
                  </p>
                  <ul className="space-y-2 text-[12px] leading-6 text-stone-600">
                    <li>Reference photos or screenshots</li>
                    <li>Preferred metal tone or color direction</li>
                    <li>Target timeline and estimated budget</li>
                    <li>Any sentimental details to preserve</li>
                  </ul>
                </div>
              </div>

              <form className="space-y-5" onSubmit={handleConsultationSubmit}>
                <div>
                  <p className="text-[10px] tracking-[0.16em] text-stone-500">
                    BOOK A FREE CONSULTATION
                  </p>
                  <h3 className="mt-4 font-serif text-[34px] leading-none text-stone-900">
                    Let&apos;s begin your piece.
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    ['firstName', 'First Name'],
                    ['lastName', 'Last Name'],
                    ['phoneNumber', 'Phone Number'],
                    ['email', 'Email Address'],
                  ].map(([key, label]) => (
                    <label key={key} className="block">
                      <span className="mb-2 block text-[11px] text-stone-700">{label}</span>
                      <input
                        type={key === 'email' ? 'email' : 'text'}
                        value={consultationForm[key]}
                        onChange={(event) => handleConsultationChange(key, event.target.value)}
                        className={`h-11 w-full border bg-white px-3 text-[12px] text-stone-900 outline-none transition ${
                          consultationErrors[key]
                            ? 'border-red-300'
                            : 'border-stone-200 focus:border-stone-500'
                        }`}
                      />
                      {consultationErrors[key] ? (
                        <p className="mt-1 text-[11px] text-red-500">{consultationErrors[key]}</p>
                      ) : null}
                    </label>
                  ))}
                </div>

                <button
                  type="submit"
                  className="h-11 min-w-[184px] border border-stone-900 px-5 text-[11px] tracking-[0.12em] text-stone-900 transition hover:bg-stone-900 hover:text-white"
                >
                  BOOK CONSULTATION
                </button>

                {consultationMessage ? (
                  <p className="text-[12px] text-stone-500">{consultationMessage}</p>
                ) : null}
              </form>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="overflow-hidden border-x border-b border-stone-200 bg-white">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="min-h-[320px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1400&q=80"
                  alt="Hand wearing a custom engagement ring"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="border-t border-stone-200 px-6 py-8 lg:border-l lg:border-t-0 lg:px-10 lg:py-10">
                <p className="text-[10px] tracking-[0.18em] text-stone-500">SHARE VISION</p>
                <h2 className="mt-4 font-serif text-[38px] leading-[0.95] text-stone-900 sm:text-[46px]">
                  Show us the direction
                  <br />
                  you have in mind.
                </h2>
                <p className="mt-5 max-w-[380px] text-[13px] leading-7 text-stone-600">
                  This second screen is based on the next reference from the left side of
                  your image, with a hero image, notes area, and inspiration upload field.
                </p>

                <div className="mt-8 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setActivePage('overview')}
                    className="h-10 min-w-[120px] border border-stone-300 px-4 text-[10px] tracking-[0.1em] text-stone-700 transition hover:border-stone-900"
                  >
                    PREVIOUS PAGE
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('home')}
                    className="h-10 min-w-[120px] border border-stone-900 px-4 text-[10px] tracking-[0.1em] text-stone-900 transition hover:bg-stone-900 hover:text-white"
                  >
                    BACK TO HOME
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="border-x border-b border-stone-200 bg-white px-6 py-8 lg:px-10 lg:py-10">
            <div className="grid gap-8 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-10">
              <aside className="space-y-4">
                <p className="text-[10px] tracking-[0.16em] text-stone-500">PROCESS</p>
                <button
                  type="button"
                  onClick={() => setActivePage('overview')}
                  className="block text-left text-[13px] text-stone-500 transition hover:text-stone-900"
                >
                  Custom Story
                </button>
                <button
                  type="button"
                  className="block text-left text-[13px] text-stone-900 underline decoration-[1px] underline-offset-[5px]"
                >
                  Share Vision
                </button>
                <p className="text-[12px] text-stone-400">Choose Diamond</p>
                <p className="text-[12px] text-stone-400">Review</p>
              </aside>

              <form className="space-y-7" onSubmit={handleVisionSubmit}>
                <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
                  <div className="space-y-4">
                    <div>
                      <p className="text-[12px] text-stone-900">Share Vision</p>
                      <p className="mt-2 text-[11px] leading-6 text-stone-500">
                        Upload inspiration or write a short brief to help guide the first
                        draft.
                      </p>
                    </div>

                    <label className="block">
                      <span className="mb-2 block text-[11px] text-stone-700">
                        When should you wear this diamond?
                      </span>
                      <select
                        value={visionForm.occasion}
                        onChange={(event) => handleVisionChange('occasion', event.target.value)}
                        className={`h-11 w-full border bg-white px-3 text-[12px] text-stone-900 outline-none ${
                          visionErrors.occasion
                            ? 'border-red-300'
                            : 'border-stone-200 focus:border-stone-500'
                        }`}
                      >
                        <option value="">Choose Occasion</option>
                        {wearingMoments.map((moment) => (
                          <option key={moment} value={moment}>
                            {moment}
                          </option>
                        ))}
                      </select>
                      {visionErrors.occasion ? (
                        <p className="mt-1 text-[11px] text-red-500">{visionErrors.occasion}</p>
                      ) : null}
                    </label>
                  </div>

                  <div className="space-y-4">
                    <label className="block rounded-[24px] border border-dashed border-stone-300 bg-[#faf8f4] px-5 py-8 text-center">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*,.pdf"
                        onChange={(event) =>
                          setUploadedFileName(event.target.files?.[0]?.name || '')
                        }
                      />
                      <p className="text-[11px] tracking-[0.16em] text-stone-500">
                        UPLOAD INSPIRATION
                      </p>
                      <p className="mt-3 text-[12px] leading-6 text-stone-600">
                        {uploadedFileName
                          ? `Attached: ${uploadedFileName}`
                          : 'Drag, drop, or click to add screenshots, sketches, or reference images.'}
                      </p>
                      <span className="mt-4 inline-flex h-8 min-w-[34px] items-center justify-center border border-stone-300 px-3 text-[12px] text-stone-700">
                        +
                      </span>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-[11px] text-stone-700">
                        Inspiration Link
                      </span>
                      <input
                        type="url"
                        value={visionForm.inspirationLink}
                        onChange={(event) =>
                          handleVisionChange('inspirationLink', event.target.value)
                        }
                        placeholder="Paste link"
                        className="h-11 w-full border border-stone-200 bg-white px-3 text-[12px] text-stone-900 outline-none transition focus:border-stone-500"
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[12px] text-stone-900">Select design direction</p>
                  <div className="flex flex-wrap gap-3">
                    {styleDirections.map((style) => {
                      const isSelected = selectedStyles.includes(style)

                      return (
                        <button
                          key={style}
                          type="button"
                          onClick={() => toggleStyleDirection(style)}
                          className={`min-h-10 rounded-full border px-4 text-[11px] tracking-[0.12em] transition ${
                            isSelected
                              ? 'border-stone-900 bg-stone-900 text-white'
                              : 'border-stone-300 bg-white text-stone-700 hover:border-stone-900'
                          }`}
                        >
                          {style}
                        </button>
                      )
                    })}
                  </div>
                  {visionErrors.selectedStyles ? (
                    <p className="text-[11px] text-red-500">{visionErrors.selectedStyles}</p>
                  ) : null}
                </div>

                <label className="block">
                  <span className="mb-2 block text-[11px] text-stone-700">Reference Notes</span>
                  <textarea
                    value={visionForm.referenceNotes}
                    onChange={(event) => handleVisionChange('referenceNotes', event.target.value)}
                    rows={4}
                    placeholder="Mention silhouettes, settings, stones, or references you already love."
                    className="w-full border border-stone-200 bg-white px-3 py-3 text-[12px] text-stone-900 outline-none transition focus:border-stone-500"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-[11px] text-stone-700">Describe your vision</span>
                  <textarea
                    value={visionForm.designBrief}
                    onChange={(event) => handleVisionChange('designBrief', event.target.value)}
                    rows={6}
                    placeholder="Tell us about the shape, scale, metal tone, and how you want the piece to feel."
                    className={`w-full border bg-white px-3 py-3 text-[12px] text-stone-900 outline-none transition ${
                      visionErrors.designBrief
                        ? 'border-red-300'
                        : 'border-stone-200 focus:border-stone-500'
                    }`}
                  />
                  {visionErrors.designBrief ? (
                    <p className="mt-1 text-[11px] text-red-500">{visionErrors.designBrief}</p>
                  ) : null}
                </label>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="h-11 min-w-[150px] bg-[#1f1c19] px-5 text-[11px] tracking-[0.12em] text-white transition hover:bg-black"
                  >
                    SAVE BRIEF
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePage('overview')}
                    className="h-11 min-w-[150px] border border-stone-300 px-5 text-[11px] tracking-[0.12em] text-stone-700 transition hover:border-stone-900"
                  >
                    BACK
                  </button>
                </div>

                {visionMessage ? <p className="text-[12px] text-stone-500">{visionMessage}</p> : null}
              </form>
            </div>
          </section>
        </>
      )}

      {renderFooter()}
    </main>
  )
}

export default Customize
