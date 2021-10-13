const Engineer = require('../lib/Engineer');

// jest.mock('../lib/Engineer');

test('check for engineer github user', () => {
  const mockUserId = 'Cassidy13';
  const engineer = new Engineer('Cassidy', 38, 'Cassidy@teamrocket.com', mockUserId);
  expect(engineer.getGitHub()).toBe(`https://github.com/${mockUserId}`);
});

//check engineer getRole()
test('check for engineer change', () => {
  const mockUserId = 'Cassidy13';
  const engineer = new Engineer('Cassidy', 38, 'Cassidy@teamrocket.com', mockUserId);
  expect(engineer.getRole()).toBe('Engineer');
});
  