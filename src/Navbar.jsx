import { useEffect, useRef, useState } from 'react'
import { FiGlobe, FiHeart, FiSearch, FiShoppingBag, FiUser, FiX } from 'react-icons/fi'
import { handleProductImageError } from './productImageFallbacks'

const navItems = [
  { label: 'Collections', target: 'collections-page' },
  { label: 'Diamonds', target: 'diamonds-page' },
  { label: 'Customize', target: 'customize-page' },
  { label: 'About', target: 'about-page' },
]

const mobileNavItems = [...navItems, { label: 'Contact', target: 'contact-us' }]

function Navbar({
  cartCount,
  cartItems,
  cartSubtotal,
  onCheckout,
  onDecreaseCartItem,
  onIncreaseCartItem,
  onNavigate,
  onRemoveCartItem,
}) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const desktopCartPanelRef = useRef(null)
  const mobileCartPanelRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const cartContainers = [desktopCartPanelRef.current, mobileCartPanelRef.current].filter(
        Boolean,
      )

      if (cartContainers.length > 0 && cartContainers.every((ref) => !ref.contains(event.target))) {
        setIsCartOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const handleNavigate = (sectionId) => {
    if (onNavigate) {
      onNavigate(sectionId)
    }

    setIsCartOpen(false)
  }

  const renderCartPanel = () =>
    isCartOpen ? (
      <div className="absolute right-0 top-[calc(100%+14px)] z-50 w-[min(320px,calc(100vw-2rem))] rounded-[24px] border border-stone-200 bg-white p-4 shadow-[0_24px_60px_rgba(50,38,28,0.18)]">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] tracking-[0.12em] text-stone-500">SHOPPING CART</p>
            <p className="mt-1 text-[13px] text-stone-900">{cartCount} item(s)</p>
          </div>
          <button
            type="button"
            aria-label="Close cart"
            onClick={() => setIsCartOpen(false)}
            className="transition hover:text-stone-950"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="rounded-2xl bg-stone-50 px-4 py-6 text-center text-[12px] text-stone-500">
            Your cart is empty.
          </p>
        ) : (
          <div className="max-h-[360px] space-y-3 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <article
                key={item.id}
                className="rounded-[20px] border border-stone-200 bg-[#fcfbf8] p-3"
              >
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(event) => handleProductImageError(event, item.category)}
                    className="h-16 w-16 rounded-2xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] text-stone-900">{item.name}</p>
                    <p className="mt-1 text-[11px] text-stone-500">{item.price}</p>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex items-center rounded-full border border-stone-300">
                        <button
                          type="button"
                          onClick={() => onDecreaseCartItem(item.id)}
                          className="h-8 w-8 text-[16px] transition hover:bg-stone-100"
                        >
                          -
                        </button>
                        <span className="min-w-8 text-center text-[12px] text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onIncreaseCartItem(item.id)}
                          className="h-8 w-8 text-[16px] transition hover:bg-stone-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveCartItem(item.id)}
                        className="text-[11px] tracking-[0.08em] text-stone-500 transition hover:text-stone-900"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {cartItems.length > 0 ? (
          <div className="mt-4 border-t border-stone-200 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] tracking-[0.1em] text-stone-500">SUBTOTAL</span>
              <span className="text-[13px] text-stone-900">
                ${cartSubtotal.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsCartOpen(false)
                onCheckout()
              }}
              className="mt-4 h-10 w-full bg-[#1f1c19] text-[11px] tracking-[0.12em] text-white transition hover:bg-black"
            >
              CHECKOUT
            </button>
            <p className="mt-2 text-center text-[10px] text-stone-500">
              Shipping, taxes and discount calculated at checkout.
            </p>
          </div>
        ) : null}
      </div>
    ) : null

  const renderCartControl = (panelRef) => (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        aria-label="Bag"
        onClick={() => setIsCartOpen((current) => !current)}
        className="relative transition hover:text-stone-950"
      >
        <FiShoppingBag className="h-4 w-4" />
        {cartCount > 0 ? (
          <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-stone-900 px-1 text-[9px] text-white">
            {cartCount}
          </span>
        ) : null}
      </button>

      {renderCartPanel()}
    </div>
  )

  return (
    <header className="fixed top-0 z-50 h-[12vh] min-h-[88px] w-full border-b border-stone-200 bg-[#fcfbf8]">
      <div className="mx-auto flex h-full w-full max-w-[1280px] flex-col px-4 sm:px-6 lg:px-14">
        <div className="hidden h-[34%] items-center justify-between border-b border-stone-200 text-[0.72rem] text-stone-500 lg:flex">
          <button
            type="button"
            onClick={() => handleNavigate('contact-us')}
            className="transition hover:text-stone-900"
          >
            Contact us
          </button>

          <div className="flex items-center gap-4 text-stone-700">
            <button type="button" aria-label="Search" className="transition hover:text-stone-900">
              <FiSearch className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex items-center gap-2 transition hover:text-stone-900"
            >
              <FiGlobe className="h-4 w-4" />
              <span>US</span>
            </button>
          </div>
        </div>

        <div className="hidden flex-1 grid-cols-[1fr_auto_1fr] items-center gap-4 lg:grid">
          <nav className="hidden items-center gap-7 text-[0.82rem] text-stone-700 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavigate(item.target)}
                className="transition hover:text-stone-950"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => handleNavigate('home')}
            className="justify-self-start font-serif text-[1.7rem] font-normal tracking-[0.38em] text-stone-900 lg:justify-self-center"
          >
            Solvi
          </button>

          <div className="flex items-center justify-end gap-4 text-stone-700">
            {renderCartControl(desktopCartPanelRef)}
            <button
              type="button"
              aria-label="Wishlist"
              className="transition hover:text-stone-950"
            >
              <FiHeart className="h-4 w-4" />
            </button>
            <button type="button" aria-label="Account" className="transition hover:text-stone-950">
              <FiUser className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex h-full flex-col justify-center gap-3 py-3 lg:hidden">
          <div className="grid grid-cols-[1fr_auto] items-center gap-4">
            <button
              type="button"
              onClick={() => handleNavigate('home')}
              className="justify-self-start font-serif text-[1.5rem] font-normal tracking-[0.32em] text-stone-900"
            >
              Solvi
            </button>

            <div className="flex items-center justify-end gap-4 text-stone-700">
              {renderCartControl(mobileCartPanelRef)}

              <button
                type="button"
                aria-label="Wishlist"
                className="transition hover:text-stone-950"
              >
                <FiHeart className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Account"
                className="transition hover:text-stone-950"
              >
                <FiUser className="h-4 w-4" />
              </button>
            </div>
          </div>

          <nav className="-mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1 text-[10px] tracking-[0.14em] text-stone-700 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {mobileNavItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavigate(item.target)}
                className="shrink-0 rounded-full border border-stone-300 bg-white px-3 py-2 transition hover:border-stone-900 hover:text-stone-950"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
