import * as utils from "../utils";
const data = utils.readFile("day-21/mock.txt").split(/\r?\n/);

const parsed = data.map((line) => {
  const [ingredientsStr, allergensStr] = line.split(" (contains ");
  const ingredients = ingredientsStr.split(" ");
  const allergens = allergensStr.slice(0, -1).split(", ");
  return { ingredients, allergens };
});

let possibleTranslations = new Map<string, Set<string>>();
let impossibleTranslations = new Map<string, Set<string>>();

for (let i = 0; i < parsed.length; i++) {
  for (let j = 0; j < parsed[i].allergens.length; j++) {
    const allergen = parsed[i].allergens[j];
    const ingredients = parsed[i].ingredients;
    const freshSet = new Set<string>(ingredients);

    if (!possibleTranslations.has(allergen)) {
      // all options are possible translations for this allergen
      possibleTranslations = possibleTranslations.set(allergen, freshSet);
      impossibleTranslations = impossibleTranslations.set(
        allergen,
        new Set<string>()
      );
      continue;
    }

    // loop through ingredients
    for (let k = 0; k < ingredients.length; k++) {
      const ingredient = ingredients[k];
      // skip if already on impossible list
      if (impossibleTranslations.get(allergen)?.has(ingredient)) continue;

      // skip if already on possible list
      if (possibleTranslations.get(allergen)?.has(ingredient)) continue;

      // if it isn't already possible, then add to impossible list
      if (!possibleTranslations.get(allergen)?.has(ingredient)) {
        impossibleTranslations = impossibleTranslations.set(
          allergen,
          impossibleTranslations.get(allergen)?.add(ingredient) ?? new Set()
        );
        console.log("impossibleTranslations", impossibleTranslations);
        continue;
      }
    }

    // remove possibilities, if they don't appear in the new list of ingredients
    const possibleTranslationsForAllergen = possibleTranslations.get(allergen);
    possibleTranslationsForAllergen?.forEach((possTrans) => {
      if (!ingredients.includes(possTrans)) {
        possibleTranslationsForAllergen?.delete(possTrans);
        impossibleTranslations = impossibleTranslations.set(
          allergen,
          impossibleTranslations.get(allergen)?.add(possTrans) ?? new Set()
        );
      }
    });
  }
}
console.log("\n\nFinished running\n\n");

console.log("possibleTranslations", possibleTranslations);
console.log("impossibleTranslations", impossibleTranslations);

// next, if there is only one option, then we can
// problem is, how many times do I have to iterate over it, (n times)

// key is translation, value is english allergen
let translatedWords = new Map<string, string>();

possibleTranslations.forEach((vals, key) => {
  console.log(`Looking at ${key}`);
  if (vals.size === 1) {
    // translation found!
    const translation: string = vals.values().next().value;
    console.log(`Translation found: ${translation}`);
    translatedWords = translatedWords.set(translation, key);
    possibleTranslations.delete(key);
  } else {
    // remove words that have been translated from possibilities
    vals.forEach((val) => {
      if (translatedWords.has(val)) {
        console.log(`Removing ${val} as a possible translation of ${key}`);
        vals.delete(val);
      }
    });
  }
});

console.log("translatedWords", translatedWords);
