const fallbackImages = {
  earrings:
    'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=80',
  rings:
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
  chains:
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
  pendants:
    'https://images.unsplash.com/photo-1611107683227-e9060eccd846?auto=format&fit=crop&w=1200&q=80',
  bracelets:
    'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1200&q=80',
  necklaces:
    'https://images.unsplash.com/photo-1611107683227-e9060eccd846?auto=format&fit=crop&w=1200&q=80',
  sets:
    'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=1200&q=80',
}

const defaultFallbackImage =
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80'

export const getProductFallbackImage = (category) =>
  fallbackImages[category] || defaultFallbackImage

export const handleProductImageError = (event, category) => {
  event.currentTarget.onerror = null
  event.currentTarget.src = getProductFallbackImage(category)
}
