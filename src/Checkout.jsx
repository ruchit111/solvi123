import { useState } from 'react'
import { handleProductImageError } from './productImageFallbacks'

const createEmptyAddress = () => ({
  streetName: '',
  country: '',
  townCity: '',
  state: '',
  zipCode: '',
})

const formatCurrency = (value) =>
  `$${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

function Checkout({ cartItems, onNavigate, onSubmitCheckout }) {
  const [contactDetails, setContactDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  })
  const [shippingAddress, setShippingAddress] = useState(createEmptyAddress)
  const [billingAddress, setBillingAddress] = useState(createEmptyAddress)
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    nameOnCard: '',
  })
  const [useShippingForBilling, setUseShippingForBilling] = useState(true)
  const [discountCode, setDiscountCode] = useState('')
  const [discountRate, setDiscountRate] = useState(0)
  const [discountMessage, setDiscountMessage] = useState('')
  const [formErrors, setFormErrors] = useState({})

  const subtotal = cartItems.reduce((total, item) => total + item.priceValue * item.quantity, 0)
  const discountAmount = subtotal * discountRate
  const shippingAmount = 0
  const estimatedTaxes = Math.max((subtotal - discountAmount) * 0.03, 0)
  const total = Math.max(subtotal - discountAmount + shippingAmount + estimatedTaxes, 0)

  const handleContactChange = (key, value) => {
    setContactDetails((current) => ({ ...current, [key]: value }))
    setFormErrors((current) => {
      if (!current[key]) {
        return current
      }

      const nextErrors = { ...current }
      delete nextErrors[key]
      return nextErrors
    })
  }

  const handleAddressChange = (type, key, value) => {
    const setter = type === 'shipping' ? setShippingAddress : setBillingAddress
    const errorKey = `${type}-${key}`

    setter((current) => ({ ...current, [key]: value }))
    setFormErrors((current) => {
      if (!current[errorKey]) {
        return current
      }

      const nextErrors = { ...current }
      delete nextErrors[errorKey]
      return nextErrors
    })
  }

  const handlePaymentChange = (key, value) => {
    let nextValue = value

    if (key === 'cardNumber') {
      nextValue = value
        .replace(/\D/g, '')
        .slice(0, 16)
        .replace(/(.{4})/g, '$1 ')
        .trim()
    }

    if (key === 'expirationDate') {
      const digits = value.replace(/\D/g, '').slice(0, 4)
      nextValue =
        digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2, 4)}` : digits
    }

    if (key === 'securityCode') {
      nextValue = value.replace(/\D/g, '').slice(0, 4)
    }

    setPaymentDetails((current) => ({ ...current, [key]: nextValue }))
    setFormErrors((current) => {
      if (!current[key]) {
        return current
      }

      const nextErrors = { ...current }
      delete nextErrors[key]
      return nextErrors
    })
  }

  const handleApplyDiscount = () => {
    const normalizedCode = discountCode.trim().toUpperCase()

    if (!normalizedCode) {
      setDiscountRate(0)
      setDiscountMessage('Enter a discount code before applying.')
      return
    }

    if (normalizedCode === 'SOLVI10') {
      setDiscountRate(0.1)
      setDiscountMessage('SOLVI10 applied. You saved 10% on your order.')
      return
    }

    setDiscountRate(0)
    setDiscountMessage('That discount code is not valid yet.')
  }

  const handleBillingToggle = (checked) => {
    setUseShippingForBilling(checked)

    if (!checked) {
      return
    }

    setFormErrors((current) => {
      const nextErrors = { ...current }
      delete nextErrors['billing-streetName']
      delete nextErrors['billing-country']
      delete nextErrors['billing-townCity']
      delete nextErrors['billing-state']
      delete nextErrors['billing-zipCode']
      return nextErrors
    })
  }

  const validateAddress = (type, address, nextErrors) => {
    if (!address.streetName.trim()) {
      nextErrors[`${type}-streetName`] = 'Street name is required.'
    }

    if (!address.country.trim()) {
      nextErrors[`${type}-country`] = 'Country is required.'
    }

    if (!address.townCity.trim()) {
      nextErrors[`${type}-townCity`] = 'Town / City is required.'
    }

    if (!address.state.trim()) {
      nextErrors[`${type}-state`] = 'State is required.'
    }

    if (!address.zipCode.trim()) {
      nextErrors[`${type}-zipCode`] = 'Zip Code is required.'
    }
  }

  const handleCheckoutSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {}

    if (!contactDetails.firstName.trim()) {
      nextErrors.firstName = 'First name is required.'
    }

    if (!contactDetails.lastName.trim()) {
      nextErrors.lastName = 'Last name is required.'
    }

    if (!contactDetails.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactDetails.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!contactDetails.phoneNumber.trim()) {
      nextErrors.phoneNumber = 'Phone number is required.'
    } else if (contactDetails.phoneNumber.replace(/\D/g, '').length < 10) {
      nextErrors.phoneNumber = 'Enter a valid phone number.'
    }

    validateAddress('shipping', shippingAddress, nextErrors)

    if (!useShippingForBilling) {
      validateAddress('billing', billingAddress, nextErrors)
    }

    if (paymentDetails.cardNumber.replace(/\s/g, '').length !== 16) {
      nextErrors.cardNumber = 'Card number must be 16 digits.'
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentDetails.expirationDate)) {
      nextErrors.expirationDate = 'Use MM/YY format.'
    }

    if (!/^\d{3,4}$/.test(paymentDetails.securityCode)) {
      nextErrors.securityCode = 'Security code must be 3 or 4 digits.'
    }

    if (!paymentDetails.nameOnCard.trim()) {
      nextErrors.nameOnCard = 'Name on card is required.'
    }

    if (cartItems.length === 0) {
      nextErrors.cart = 'Your cart is empty. Add products before checking out.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors)
      return
    }

    setFormErrors({})
    onSubmitCheckout({
      customerName: `${contactDetails.firstName.trim()} ${contactDetails.lastName.trim()}`,
      total,
    })
  }

  const renderInput = ({
    autoComplete,
    className = '',
    error,
    label,
    name,
    onChange,
    placeholder,
    type = 'text',
    value,
  }) => (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[11px] tracking-[0.02em] text-stone-700">{label}</span>
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`h-10 w-full border bg-white px-3 text-[12px] text-stone-900 outline-none transition placeholder:text-stone-400 ${
          error ? 'border-red-300' : 'border-stone-200 focus:border-stone-500'
        }`}
      />
      {error ? <p className="mt-1 text-[11px] text-red-500">{error}</p> : null}
    </label>
  )

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-12vh)] w-full max-w-[1280px] items-center px-6 pt-[12vh] sm:px-10 lg:px-16">
        <section className="w-full border-x border-b border-stone-200 bg-white px-6 py-14 text-center lg:px-12">
          <p className="text-[11px] tracking-[0.18em] text-stone-500">CHECKOUT</p>
          <h1 className="mt-4 font-serif text-[34px] text-stone-900">Your cart is empty.</h1>
          <p className="mx-auto mt-4 max-w-[420px] text-[13px] leading-6 text-stone-600">
            Add products to your bag first, then come back here to finish the order.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('collections-page')}
            className="mt-8 h-11 min-w-[170px] border border-stone-900 bg-stone-900 px-5 text-[11px] tracking-[0.12em] text-white transition hover:bg-white hover:text-stone-900"
          >
            CONTINUE SHOPPING
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-[1280px] px-6 pb-12 pt-[12vh] sm:px-10 lg:px-16">
      <section className="border-x border-b border-stone-200 bg-white px-6 py-8 lg:px-10 lg:py-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.18em] text-stone-500">CHECKOUT</p>
            <h1 className="mt-3 font-serif text-[32px] leading-none text-stone-900 sm:text-[40px]">
              Complete your order.
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

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_360px] lg:items-start">
          <form className="space-y-8" onSubmit={handleCheckoutSubmit}>
            <section className="space-y-4">
              <div>
                <p className="text-[13px] text-stone-900">Contact Details</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {renderInput({
                  autoComplete: 'given-name',
                  error: formErrors.firstName,
                  label: 'First name',
                  name: 'firstName',
                  onChange: (value) => handleContactChange('firstName', value),
                  placeholder: 'First name',
                  value: contactDetails.firstName,
                })}
                {renderInput({
                  autoComplete: 'family-name',
                  error: formErrors.lastName,
                  label: 'Last name',
                  name: 'lastName',
                  onChange: (value) => handleContactChange('lastName', value),
                  placeholder: 'Last name',
                  value: contactDetails.lastName,
                })}
              </div>

              {renderInput({
                autoComplete: 'email',
                error: formErrors.email,
                label: 'Email',
                name: 'email',
                onChange: (value) => handleContactChange('email', value),
                placeholder: 'Enter Email here',
                type: 'email',
                value: contactDetails.email,
              })}

              {renderInput({
                autoComplete: 'tel',
                error: formErrors.phoneNumber,
                label: 'Phone number',
                name: 'phoneNumber',
                onChange: (value) => handleContactChange('phoneNumber', value),
                placeholder: 'IN  +91  Enter Number',
                value: contactDetails.phoneNumber,
              })}
            </section>

            <section className="space-y-4">
              <div>
                <p className="text-[13px] text-stone-900">Shipping Address</p>
              </div>

              {renderInput({
                autoComplete: 'shipping address-line1',
                error: formErrors['shipping-streetName'],
                label: 'Street Name',
                name: 'shippingStreetName',
                onChange: (value) => handleAddressChange('shipping', 'streetName', value),
                placeholder: 'Street Name',
                value: shippingAddress.streetName,
              })}

              {renderInput({
                autoComplete: 'shipping country-name',
                error: formErrors['shipping-country'],
                label: 'Country',
                name: 'shippingCountry',
                onChange: (value) => handleAddressChange('shipping', 'country', value),
                placeholder: 'Country',
                value: shippingAddress.country,
              })}

              {renderInput({
                autoComplete: 'shipping address-level2',
                error: formErrors['shipping-townCity'],
                label: 'Town / City',
                name: 'shippingTownCity',
                onChange: (value) => handleAddressChange('shipping', 'townCity', value),
                placeholder: 'Town / City',
                value: shippingAddress.townCity,
              })}

              <div className="grid gap-4 sm:grid-cols-2">
                {renderInput({
                  autoComplete: 'shipping address-level1',
                  error: formErrors['shipping-state'],
                  label: 'State',
                  name: 'shippingState',
                  onChange: (value) => handleAddressChange('shipping', 'state', value),
                  placeholder: 'State',
                  value: shippingAddress.state,
                })}
                {renderInput({
                  autoComplete: 'shipping postal-code',
                  error: formErrors['shipping-zipCode'],
                  label: 'Zip Code',
                  name: 'shippingZipCode',
                  onChange: (value) => handleAddressChange('shipping', 'zipCode', value),
                  placeholder: 'Zip Code',
                  value: shippingAddress.zipCode,
                })}
              </div>

              <label className="flex items-center gap-3 text-[12px] text-stone-700">
                <input
                  type="checkbox"
                  checked={useShippingForBilling}
                  onChange={(event) => handleBillingToggle(event.target.checked)}
                  className="h-4 w-4 accent-stone-900"
                />
                <span>Use for Billing Address</span>
              </label>
            </section>

            {!useShippingForBilling ? (
              <section className="space-y-4">
                <div>
                  <p className="text-[13px] text-stone-900">Billing Address</p>
                </div>

                {renderInput({
                  autoComplete: 'billing address-line1',
                  error: formErrors['billing-streetName'],
                  label: 'Street Name',
                  name: 'billingStreetName',
                  onChange: (value) => handleAddressChange('billing', 'streetName', value),
                  placeholder: 'Street Name',
                  value: billingAddress.streetName,
                })}

                {renderInput({
                  autoComplete: 'billing country-name',
                  error: formErrors['billing-country'],
                  label: 'Country',
                  name: 'billingCountry',
                  onChange: (value) => handleAddressChange('billing', 'country', value),
                  placeholder: 'Country',
                  value: billingAddress.country,
                })}

                {renderInput({
                  autoComplete: 'billing address-level2',
                  error: formErrors['billing-townCity'],
                  label: 'Town / City',
                  name: 'billingTownCity',
                  onChange: (value) => handleAddressChange('billing', 'townCity', value),
                  placeholder: 'Town / City',
                  value: billingAddress.townCity,
                })}

                <div className="grid gap-4 sm:grid-cols-2">
                  {renderInput({
                    autoComplete: 'billing address-level1',
                    error: formErrors['billing-state'],
                    label: 'State',
                    name: 'billingState',
                    onChange: (value) => handleAddressChange('billing', 'state', value),
                    placeholder: 'State',
                    value: billingAddress.state,
                  })}
                  {renderInput({
                    autoComplete: 'billing postal-code',
                    error: formErrors['billing-zipCode'],
                    label: 'Zip Code',
                    name: 'billingZipCode',
                    onChange: (value) => handleAddressChange('billing', 'zipCode', value),
                    placeholder: 'Zip Code',
                    value: billingAddress.zipCode,
                  })}
                </div>
              </section>
            ) : null}

            <section className="space-y-4">
              <div>
                <p className="text-[13px] text-stone-900">Payment Details</p>
              </div>

              <div className="flex items-center justify-between border border-stone-200 bg-stone-50 px-3 py-3 text-[11px] text-stone-700">
                <span>Credit Card</span>
                <div className="flex items-center gap-2 text-[10px] tracking-[0.08em] text-stone-500">
                  <span>VISA</span>
                  <span>PAY</span>
                  <span>MC</span>
                </div>
              </div>

              {renderInput({
                autoComplete: 'cc-number',
                error: formErrors.cardNumber,
                label: 'Card Number',
                name: 'cardNumber',
                onChange: (value) => handlePaymentChange('cardNumber', value),
                placeholder: '1234 5678 9012 3456',
                value: paymentDetails.cardNumber,
              })}

              <div className="grid gap-4 sm:grid-cols-2">
                {renderInput({
                  autoComplete: 'cc-exp',
                  error: formErrors.expirationDate,
                  label: 'Expiration Date (MM/YY)',
                  name: 'expirationDate',
                  onChange: (value) => handlePaymentChange('expirationDate', value),
                  placeholder: 'MM/YY',
                  value: paymentDetails.expirationDate,
                })}
                {renderInput({
                  autoComplete: 'cc-csc',
                  error: formErrors.securityCode,
                  label: 'Security Code',
                  name: 'securityCode',
                  onChange: (value) => handlePaymentChange('securityCode', value),
                  placeholder: 'CVV',
                  value: paymentDetails.securityCode,
                })}
              </div>

              {renderInput({
                autoComplete: 'cc-name',
                error: formErrors.nameOnCard,
                label: 'Name on Card',
                name: 'nameOnCard',
                onChange: (value) => handlePaymentChange('nameOnCard', value),
                placeholder: 'Name on Card',
                value: paymentDetails.nameOnCard,
              })}
            </section>

            {formErrors.cart ? <p className="text-[12px] text-red-500">{formErrors.cart}</p> : null}

            <button
              type="submit"
              className="h-11 w-full bg-[#1f1c19] text-[11px] tracking-[0.12em] text-white transition hover:bg-black"
            >
              CHECKOUT
            </button>

            <p className="text-center text-[11px] text-stone-500">
              Taxes and shipping calculated at checkout.
            </p>
          </form>

          <aside className="border border-stone-200 bg-[#faf8f4] p-5 lg:sticky lg:top-[15vh]">
            <p className="text-[13px] text-stone-900">Order Summary ({cartItems.length})</p>

            <div className="mt-5 space-y-4">
              {cartItems.map((item) => (
                <article key={item.id} className="flex gap-3 border-b border-stone-200 pb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(event) => handleProductImageError(event, item.category)}
                    className="h-[72px] w-[72px] rounded-[20px] bg-white object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1 text-[11px] text-stone-600">
                    <p className="text-[12px] text-stone-900">{item.name}</p>
                    <p className="mt-1">{item.category}</p>
                    <p className="mt-1">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-[12px] text-stone-900">
                    {formatCurrency(item.priceValue * item.quantity)}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-5 flex gap-2">
              <input
                type="text"
                value={discountCode}
                onChange={(event) => setDiscountCode(event.target.value)}
                placeholder="Discount code or Gift card"
                className="h-10 flex-1 border border-stone-200 bg-white px-3 text-[12px] text-stone-900 outline-none placeholder:text-stone-400"
              />
              <button
                type="button"
                onClick={handleApplyDiscount}
                className="h-10 min-w-[84px] bg-[#1f1c19] px-4 text-[10px] tracking-[0.08em] text-white transition hover:bg-black"
              >
                APPLY
              </button>
            </div>

            {discountMessage ? (
              <p className="mt-2 text-[11px] text-stone-500">{discountMessage}</p>
            ) : null}

            <div className="mt-6 space-y-2 text-[12px] text-stone-600">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>{shippingAmount === 0 ? 'Free' : formatCurrency(shippingAmount)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Estimated taxes</span>
                <span>{formatCurrency(estimatedTaxes)}</span>
              </div>
              {discountAmount > 0 ? (
                <div className="flex items-center justify-between text-green-700">
                  <span>Discount</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              ) : null}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-stone-200 pt-5">
              <span className="text-[13px] text-stone-900">Total</span>
              <span className="text-[18px] text-stone-900">{formatCurrency(total)}</span>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default Checkout
