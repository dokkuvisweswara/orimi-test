export const scrollToTop = () =>  {
    if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

export const getCurrencyWithPayment = (amount: any, currency: any) => {
   let priceSymbol: any = {
        "MNT": "₮",
        "INR": "₹",
        "USD": "$"
    };

    let symbol = priceSymbol[currency];
    if (symbol) {
       return `${amount / 100}${symbol}`
    } else {
       return `${currency} ${amount / 100}`
    }


}