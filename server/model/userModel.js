const users = [];

function createUser(user) {
  const newUser = {
    id: Date.now().toString(),
    name: user.name,
    email: user.email.toLowerCase(),
    password: user.password,
  };

  users.push(newUser);
  return newUser;
}

function findUserByEmail(email) {
  return users.find((user) => user.email === email.toLowerCase());
}

module.exports = {
  createUser,
  findUserByEmail,
};
