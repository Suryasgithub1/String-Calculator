

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function add(numbers) {
  if (numbers === "") {
    return 0;
  }

  let delimiterRegex = /,|\n|\r/; 
  let numbersToParse = numbers;

  if (numbers.startsWith("//")) {
    const parts = numbers.split('\n', 2);
    if (parts.length < 2) {
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

  const stringPartsAfterTrim = stringPartsAfterSplit.map(numStr => {
    const trimmed = numStr.trim();
    return trimmed;
  });

  const stringPartsAfterFilter = stringPartsAfterTrim.filter(numStr => {
    const isNotEmpty = numStr !== '';
    return isNotEmpty;
  });

  const numsArray = stringPartsAfterFilter.map(numStr => {
    const num = parseInt(numStr, 10);
    if (isNaN(num)) {
      return 0;
    }
    return num;
  });

  const negativeNumbers = numsArray.filter(num => num < 0);
  if (negativeNumbers.length > 0) {
    throw new Error(`negative numbers not allowed ${negativeNumbers.join(',')}`);
  }

  const sum = numsArray.reduce((acc, curr) => acc + curr, 0);
  return sum;
}