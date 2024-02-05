export function joinClasses(...classes) {
    return classes
        .flat(1)
        .filter(c => c && typeof c === 'string')
        .join(' ');
}