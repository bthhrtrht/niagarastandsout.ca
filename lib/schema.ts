export function generateProductSchema(product: any) {
  const title = product?.title || 'Untitled Product';
  const description = product?.description || '';
  const image = product?.images?.edges?.[0]?.node?.originalSrc || '';
  const price = product?.variants?.edges?.[0]?.node?.price?.amount || '0.00';
  const currency = product?.variants?.edges?.[0]?.node?.price?.currencyCode || 'CAD';
  const availability = 'https://schema.org/InStock';

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    description,
    image,
    url: `https://niagarastandsout.ca/products/${product.handle}`, // adjust if needed
    sku: product?.variants?.edges?.[0]?.node?.sku || undefined,
    brand: {
      '@type': 'Brand',
      name: 'Niagara Stands Out',
    },
    offers: {
      '@type': 'Offer',
      url: `https://niagarastandsout.ca/products/${product.handle}`,
      priceCurrency: currency,
      price,
      availability,
      itemCondition: 'https://schema.org/NewCondition'
    }
  };
}
