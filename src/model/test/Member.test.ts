import Member from "../Member";

const member:Member = new Member()
test('increment project count', () => {
  member.name = 'Foo'
  expect(member.name).toBe('Foo');
});