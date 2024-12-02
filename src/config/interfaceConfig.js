export function formatNumber(num) {
    // Check if num is a valid number
    if (num == null) {
        return ''; // or any default value you want
    }
    
    // Convert num to a number if it's a string or handle non-number types
    const validNum = Number(num);

    if (isNaN(validNum)) {
        return ''; // or return a default value like 'Invalid Number'
    }

    // Format the number
    return validNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
