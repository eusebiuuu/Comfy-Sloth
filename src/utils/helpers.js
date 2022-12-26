export const formatPrice = (price) => {
    const realPrice = Intl.NumberFormat('ro', {
        style: 'currency',
        currency: 'USD',
    }).format(price / 100);
    return realPrice;
}

export const getUniqueValues = () => {}
