export const formatPrice = (price) => {
    const realPrice = Intl.NumberFormat('ro', {
        style: 'currency',
        currency: 'USD',
    }).format(price / 100);
    return realPrice;
}

export const getUniqueValues = (data, field) => {
    let allFields = data.map(item => item[field]);
    if (field === 'colors') {
        allFields = allFields.flat();
    }
    return ['all', ...new Set(allFields)];
}
