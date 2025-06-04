function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Adds numbers from a string input based on specified rules.
 *
 * @param {string} numbers - A string of comma-separated numbers,
 * or numbers separated by newlines,
 * or numbers with custom delimiters.
 * @returns {number} The sum of the numbers.
 * @throws {Error} If negative numbers are present.
 */
export function add(numbers) {
  console.log('--- ADD FUNCTION START ---');
  console.log('Input string (received by add):', JSON.stringify(numbers));

  if (numbers === "") {
    console.log('Input is empty string, returning 0.');
    return 0;
  }

  let delimiterRegex = /,|\n|\r/; // Default delimiters: comma, newline, or carriage return
  let numbersToParse = numbers;

  if (numbers.startsWith("//")) {
    console.log('Custom delimiter detected.');
    // Split by actual newline to separate delimiter definition from numbers
    const parts = numbers.split('\n', 2);
    console.log('Parts after splitting by literal newline:', JSON.stringify(parts)); // Diagnostic log for custom delimiter split
    if (parts.length < 2) {
      console.error('Invalid format for custom delimiter: missing numbers part.');
      throw new Error("Invalid format for custom delimiter. Expected '//[[delimiter]]\\n[[numbers...]]'");
    }
    const delimiterDef = parts[0];

    const customDelimiterMatch = delimiterDef.match(/^\/\/\[(.*?)\]$/);
    if (customDelimiterMatch && customDelimiterMatch[1]) {
      delimiterRegex = new RegExp(escapeRegExp(customDelimiterMatch[1]));
    } else {
      delimiterRegex = new RegExp(escapeRegExp(delimiterDef.substring(2)));
    }
    numbersToParse = parts[1];
  }

  const safeNumbersToParse = String(numbersToParse || '');

  const stringPartsAfterSplit = safeNumbersToParse.split(delimiterRegex);
  console.log('1. String parts after initial split:', JSON.stringify(stringPartsAfterSplit));

  const stringPartsAfterTrim = stringPartsAfterSplit.map(numStr => {
    const trimmed = numStr.trim();
    return trimmed;
  });
  console.log('2. String parts after trim:', JSON.stringify(stringPartsAfterTrim));

  const stringPartsAfterFilter = stringPartsAfterTrim.filter(numStr => {
    const isNotEmpty = numStr !== '';
    return isNotEmpty;
  });
  console.log('3. String parts after filter:', JSON.stringify(stringPartsAfterFilter));

  const numsArray = stringPartsAfterFilter.map(numStr => {
    const num = parseInt(numStr, 10);
    if (isNaN(num)) {
      return 0;
    }
    return num;
  });

  console.log('--- DIAGNOSTIC: Final array of numbers before summation ---', numsArray);

  const negativeNumbers = numsArray.filter(num => num < 0);
  if (negativeNumbers.length > 0) {
    throw new Error(`negative numbers not allowed ${negativeNumbers.join(',')}`);
  }

  const sum = numsArray.reduce((acc, curr) => acc + curr, 0);
  console.log('Calculated sum:', sum);
  console.log('--- ADD FUNCTION END ---');
  return sum;
}