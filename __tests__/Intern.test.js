const Intern = require('../lib/Intern');


test('test intern school', () => {
  const mockSchool = 'Pokemon University';
  const intern = new Intern('Meowth', 18, 'Meowth@teamrocket.com', mockSchool);
  expect(intern.getSchool()).toBe(`${mockSchool}`);
});


test('test intern role', () => {
  const mockSchool = 'Pokemon University';
  const intern = new Intern('Meowth', 18, 'Meowth@teamrocket.com', mockSchool);
  expect(intern.getRole()).toBe('Intern');
});