import Language from "../Language";


const lang:Language = new Language('lang', 1)
test('increment project count', () => {
  lang.incrementProjectCount()
  expect(lang.projectCount).toBe(2);
});