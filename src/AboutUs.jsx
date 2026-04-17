const aboutFooterColumns = [
  {
    title: 'OFFERINGS',
    links: ['Collections', 'Diamonds', 'Customize', 'Stories'],
  },
  {
    title: 'CUSTOMER CARE',
    links: ['Contact', 'Account', 'Shipping & Returns', 'Jewellery care'],
  },
  {
    title: 'ABOUT',
    links: ['About Solvi', 'Behind the craft', 'Journal', 'Community'],
  },
  {
    title: 'CONTACT',
    links: ['+01-0001 002 003', 'niora@gmail.com', 'Mon - Sat', '9 AM - 7 PM'],
  },
]

const aboutImages = {
  hero:
    'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1400&q=80',
  founder:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
  craft:
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=80',
  vision:
    'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80',
  fallback:
    'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1400&q=80',
}

const handleEditorialImageError = (event) => {
  event.currentTarget.onerror = null
  event.currentTarget.src = aboutImages.fallback
}

function AboutUs({ onNavigate }) {
  return (
    <main className="mx-auto w-full max-w-[1280px] px-6 pt-[12vh] sm:px-10 lg:px-16">
      <section className="border-x border-b border-stone-200 bg-white px-6 py-7 lg:px-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.18em] text-stone-500">ABOUT</p>
            <h1 className="mt-3 font-serif text-[36px] leading-[0.96] text-stone-900 sm:text-[44px]">
              The world behind Solvi.
            </h1>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="text-[11px] tracking-[0.12em] text-stone-500 transition hover:text-stone-900"
          >
            BACK TO HOME
          </button>
        </div>
      </section>

      <section className="border-x border-b border-stone-200 bg-white">
        <div className="grid lg:grid-cols-[1.18fr_0.82fr]">
          <div className="min-h-[360px] overflow-hidden bg-stone-100">
            <img
              src={aboutImages.hero}
              alt="Editorial portrait wearing statement jewellery"
              onError={handleEditorialImageError}
              className="h-full w-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="border-t border-stone-200 px-6 py-8 lg:border-l lg:border-t-0 lg:px-10 lg:py-10">
            <p className="text-[10px] tracking-[0.18em] text-stone-500">ABOUT US</p>
            <h2 className="mt-4 font-serif text-[34px] leading-[0.98] text-stone-900 sm:text-[40px]">
              We design modern jewellery
              <br />
              with emotional clarity.
            </h2>
            <p className="mt-5 text-[12px] leading-7 text-stone-600">
              Solvi was created for people who want jewellery to feel quiet,
              intentional, and deeply personal. We are drawn to clean silhouettes,
              balanced proportions, and materials that hold memory without feeling
              overworked.
            </p>
            <p className="mt-4 text-[12px] leading-7 text-stone-600">
              Every collection begins with story, texture, and mood before it moves
              into metal and stone. That rhythm helps us make pieces that feel lived in
              from the very beginning.
            </p>
          </div>
        </div>
      </section>

      <section className="border-x border-b border-stone-200 bg-white px-6 py-8 lg:px-10 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-[10px] tracking-[0.18em] text-stone-500">ABOUT THE FOUNDER</p>
            <h2 className="font-serif text-[30px] leading-[1.02] text-stone-900 sm:text-[36px]">
              A practice shaped by discipline,
              <br />
              softness, and precision.
            </h2>
            <p className="text-[12px] leading-7 text-stone-600">
              Our founder built Solvi from a desire to slow jewellery down. Instead of
              chasing volume, the studio developed a process that values restraint,
              honest materials, and forms that remain elegant over time.
            </p>
            <p className="text-[12px] leading-7 text-stone-600">
              That point of view continues to guide each release, from custom projects
              to ready-to-wear pieces. The goal is always the same: create jewellery that
              feels refined, wearable, and unmistakably personal.
            </p>
          </div>

          <div className="overflow-hidden bg-[#f6f3ee]">
            <img
              src={aboutImages.founder}
              alt="Founder portrait"
              onError={handleEditorialImageError}
              className="aspect-[4/3] w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      <section className="border-x border-b border-stone-200 bg-white">
        <div className="grid lg:grid-cols-[1fr_0.92fr]">
          <div className="min-h-[320px] overflow-hidden bg-stone-100">
            <img
              src={aboutImages.craft}
              alt="Craft detail and jewelry making process"
              onError={handleEditorialImageError}
              className="h-full w-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="border-t border-stone-200 px-6 py-8 lg:border-l lg:border-t-0 lg:px-10 lg:py-10">
            <p className="text-[10px] tracking-[0.18em] text-stone-500">OUR STUDIO</p>
            <h2 className="mt-4 font-serif text-[30px] leading-[1.02] text-stone-900 sm:text-[36px]">
              Thoughtful craft is our
              <br />
              starting point.
            </h2>
            <p className="mt-5 text-[12px] leading-7 text-stone-600">
              The studio works with a calm, deliberate pace. We spend time on scale,
              comfort, and finish so every piece feels considered in the hand and on the
              body.
            </p>
            <p className="mt-4 text-[12px] leading-7 text-stone-600">
              From first sketches to final polish, we keep the process close. That
              allows the details to stay coherent and the final piece to feel complete
              rather than assembled.
            </p>
          </div>
        </div>
      </section>

      <section className="border-x border-b border-stone-200 bg-white px-6 py-8 lg:px-10 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-[10px] tracking-[0.18em] text-stone-500">OUR VISION</p>
            <h2 className="font-serif text-[30px] leading-[1.02] text-stone-900 sm:text-[36px]">
              Jewellery that feels quiet,
              <br />
              luminous, and lasting.
            </h2>
            <p className="text-[12px] leading-7 text-stone-600">
              We believe the most powerful pieces do not need to shout. They carry
              presence through proportion, light, and the ease with which they become
              part of daily life.
            </p>
            <p className="text-[12px] leading-7 text-stone-600">
              Solvi exists to create those kinds of objects: clear in intention,
              beautiful in detail, and ready to hold meaning for years to come.
            </p>
          </div>

          <div className="overflow-hidden bg-[#f8f5ef]">
            <img
              src={aboutImages.vision}
              alt="Close detail of a ring and jewellery styling"
              onError={handleEditorialImageError}
              className="aspect-[4/3] w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      <section className="border-x border-b border-stone-200 bg-[#faf8f4] px-6 py-10 lg:px-10">
        <div className="max-w-[760px]">
          <p className="text-[10px] tracking-[0.18em] text-stone-500">OUR ETHOS</p>
          <p className="mt-5 font-serif text-[28px] leading-[1.25] text-stone-900 sm:text-[34px]">
            Create fewer, better pieces. Let beauty come from clarity, craft, and the
            confidence to keep things refined.
          </p>
        </div>
      </section>

      <footer className="border-x border-b border-stone-200 bg-white px-6 py-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[repeat(4,140px)_1fr] lg:items-end">
          {aboutFooterColumns.map((column) => (
            <div key={column.title} className="space-y-2">
              <p className="text-[10px] tracking-[0.12em] text-stone-500">{column.title}</p>
              <div className="space-y-1 text-[11px] text-stone-700">
                {column.links.map((link) => (
                  <p key={link}>{link}</p>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-start lg:justify-end">
            <p className="text-[10px] tracking-[0.12em] text-stone-400">
              Solvi Jewellery. Crafted with intention.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default AboutUs
