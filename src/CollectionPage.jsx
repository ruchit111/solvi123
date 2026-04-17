import { useState } from 'react'
import {
  blurredGallery,
  collectionHeroImage,
  filterOptions,
  necklaceShowcaseImage,
  productCards,
} from './collectionData'
import { handleProductImageError } from './productImageFallbacks'

function CollectionPage({ onAddToCart, cartItems, onNavigate }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredProducts =
    activeFilter === 'all'
      ? productCards
      : productCards.filter((product) => product.category === activeFilter)

  const productQuantities = cartItems.reduce((totals, item) => {
    totals[item.id] = item.quantity
    return totals
  }, {})

  return (
    <main className="mx-auto w-full max-w-[1280px] px-6 pt-[12vh] sm:px-10 lg:px-16">
      <section className="overflow-hidden border-x border-b border-stone-200 bg-[#f6f3ee]">
        <div className="grid min-h-[calc(100vh-12vh)] lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative min-h-[360px] overflow-hidden">
            <img
              src={collectionHeroImage}
              alt="Blurred jewellery editorial portrait"
              className="h-full w-full scale-110 object-cover blur-md"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,18,18,0.18),rgba(18,18,18,0.04))]" />
          </div>

          <div className="flex items-center border-t border-stone-200 px-6 py-10 lg:border-l lg:border-t-0 lg:px-10">
            <div className="max-w-[330px] space-y-5">
              <p className="text-[11px] tracking-[0.22em] text-stone-700">COLLECTIONS</p>
              <h1 className="font-serif text-[42px] leading-[0.95] text-stone-900 sm:text-[52px]">
                Blurred light,
                <br />
                sharp detail.
              </h1>
              <p className="text-[13px] leading-6 text-stone-600">
                A dedicated collection page inspired by your reference, with soft-focus
                imagery and a separate necklace feature section.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="h-11 min-w-[150px] border border-stone-900 px-5 text-[11px] tracking-[0.12em] text-stone-900 transition hover:bg-stone-900 hover:text-white"
              >
                BACK TO HOME
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-x border-b border-stone-200 bg-white px-6 py-8 lg:px-12 lg:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.18em] text-stone-700">EDITORIAL BOARD</p>
            <p className="mt-2 text-[13px] text-stone-500">
              Soft blur treatment across the collection imagery.
            </p>
          </div>
          <p className="text-[11px] text-stone-400">01 / 03</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {blurredGallery.map((card) => (
            <article key={card.id} className="overflow-hidden bg-stone-100">
              <img
                src={card.image}
                alt={card.title}
                className="aspect-[3/4] w-full object-cover"
              />
            </article>
          ))}
        </div>
      </section>

      <section className="border-x border-b border-stone-200 bg-[#fcfbf8]">
        <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
          <div className="border-b border-stone-200 px-6 py-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-10">
            <p className="text-[11px] tracking-[0.18em] text-stone-700">NECKLACE FEATURE</p>
            <h2 className="mt-4 font-serif text-[34px] leading-[1.02] text-stone-900 sm:text-[42px]">
              Spotlight on
              <br />
              sculpted necklaces.
            </h2>
            <p className="mt-4 max-w-[360px] text-[13px] leading-6 text-stone-600">
              This section is the separate necklace image area you asked for when the user
              opens the collection page.
            </p>
          </div>

          <div className="min-h-[340px] overflow-hidden">
            <img
              src={necklaceShowcaseImage}
              alt="Statement necklace feature"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-x border-b border-stone-200 bg-white px-6 py-8 lg:px-12 lg:py-10">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] tracking-[0.18em] text-stone-700">FILTERS</p>
            <p className="mt-2 text-[13px] text-stone-500">
              Showing {filteredProducts.length} of {productCards.length} products.
            </p>
          </div>
          <p className="text-[11px] text-stone-400">CURATED EDIT</p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`min-h-10 rounded-full border px-4 text-[11px] tracking-[0.12em] transition ${
                activeFilter === filter.id
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-stone-300 bg-white text-stone-700 hover:border-stone-900 hover:text-stone-900'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-[0_18px_50px_rgba(50,38,28,0.06)]"
            >
              <div className="aspect-[4/5] overflow-hidden bg-[#f7f4ef]">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(event) => handleProductImageError(event, product.category)}
                  className="h-full w-full bg-white p-6 object-contain object-center transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="px-4 pb-4 pt-3 text-[12px] text-stone-600">
                <p className="text-[10px] tracking-[0.16em] text-stone-400">
                  {product.category}
                </p>
                <p className="mt-1 text-stone-700">{product.name}</p>
                <p className="mt-1">{product.price}</p>
                <button
                  type="button"
                  onClick={() => onAddToCart(product)}
                  className="mt-4 h-10 w-full rounded-full border border-stone-900 bg-stone-900 px-4 text-[11px] tracking-[0.12em] text-white transition hover:bg-white hover:text-stone-900"
                >
                  {productQuantities[product.id]
                    ? `ADD TO CART (${productQuantities[product.id]})`
                    : 'ADD TO CART'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default CollectionPage
