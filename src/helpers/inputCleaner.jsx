export function inputCleaner(input){
    return input.replace(/[^\w\s.-]/gi, '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}
