const Manager = require('../lib/Manager');


test('creates test for officeNumber', () => {
  const mockPhone = 5555555555;
  const manager = new Manager('Giovanni', 35, 'giovanni@teamrocket.com', mockPhone);
  expect(manager.officeNumber).toBe(mockPhone);
});
//role change
test('test role change for manager', () => {
  const mockPhone = 5555555555;
  const manager = new Manager('Giovanni', 35, 'giovanni@teamrocket.com', mockPhone);
  expect(manager.getRole()).toBe('Manager');
});