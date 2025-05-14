// Converts oe, ae, ue (and optionally their uppercase variants) to ö, ä, ü
export function convertVowel(input: string): string {
  return input
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü')
    .replace(/Oe/g, 'Ö')
    .replace(/Ae/g, 'Ä')
    .replace(/Ue/g, 'Ü');
}
