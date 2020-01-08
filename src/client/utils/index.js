export function getDayAbbreviation(index) {
    switch (index) {
        case 0:
            return 'Do';
        case 1:
            return 'Lu';
        case 2:
            return 'Ma';
        case 3:
            return 'Mi';
        case 4:
            return 'Ju';
        case 5:
            return 'Vi';
        case 6:
            return 'Sa';
        default:
            return index;
    }
}
