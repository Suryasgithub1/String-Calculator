
export function add(numbers) {
  if (numbers === "") {
    return 0;
  }

  let delimiter = /,|\n/; 
  let numbersToParse = numbers;

  if (numbers.startsWith("//")) {
    const parts = numbers.split('\n', 2); 
    if (parts.length < 2) {
      throw new Error("Invalid format for custom delimiter. Expected '//[[delimiter]]\\n[[numbers...]]'");
    }
    const delimiterDef = parts?.[0]; 
    const customDelimiterMatch = delimiterDef?.match(/^\/\/\[(.*?)\]$/);

    if (customDelimiterMatch && customDelimiterMatch?.[1]) {
      delimiter = new RegExp(escapeRegExp(customDelimiterMatch?.[1]));
    } else {
      delimiter = new RegExp(escapeRegExp(delimiterDef?.substring(2))); 
    }
    numbersToParse = parts?.[1];
  }

  const numsArray = numbersToParse
    ?.split(delimiter)
    .filter(numStr => numStr.trim() !== '') 
    .map(Number) ?? []; 

  const negativeNumbers = numsArray.filter(num => num < 0);

  if (negativeNumbers.length > 0) {
    throw new Error(`negative numbers not allowed ${negativeNumbers.join(',')}`);
  }

  return numsArray.reduce((sum, current) => sum + current, 0);
}


function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
}