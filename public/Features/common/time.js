export {
    Hour
}

class Hour {
    static plus(value_1, value_2) {
        let total = value_1 + value_2
        return  (((total >= 24) ? total - 24 : (total < 1) ? 24 + total : total) >= 24) ? this.plus(((total > 24) ? total - 24 : (total < 1) ? 24 + total : total),0) : ((total >= 24) ? total - 24 : (total < 1) ? 24 + total : total)
    }
}