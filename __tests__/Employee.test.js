const Employee = require('../lib/Employee');

// jest.mock('../lib/Employee');
// test emply object 
test('create employee object with name, id and email', () => {
    const employee = new Employee ('Jessie', 25, 'Jessie@teamrocket.com');
    expect(employee.name).toEqual(expect.any(String));
});

test('test id is a number', () => {
    const employee = new Employee('Jessie', 25, 'Jessie@teamrocket.com');
    expect(employee.id).toEqual(expect.any(Number));
});

test('test that email is string', () => {
    const employee = new Employee ('Jessie', 25, 'Jessie@teamrocket.com');
    expect(employee.email).toEqual(expect.any(String));

}); 

test('test this.name in Employee', () => {
    const employee = new Employee('Jessie', 25, 'Jessie@teamrocket.com');
    expect(employee.getName()).toEqual(expect.any(String));
  });
  
  
  test('test this.id in Employee', () => {
    const employee = new Employee('Jessie', 25, 'Jessie@teamrocket.com');
    expect(employee.getId()).toEqual(expect.any(Number));
  });
  
  
  test('test this.email in Employee', () => {
    const employee = new Employee('Jessie', 25, 'Jessie@teamrocket.com');
    expect(employee.getEmail()).toEqual(expect.any(String));
  });
  
  
  test('test the role in Employee', () => {
    const employee = new Employee('Jessie', 25, 'Jessie@teamrocket.com');
    expect(employee.getRole()).toBe('Employee');
  });