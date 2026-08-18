import bcrypt from 'bcryptjs';

const plainPassword = 'Admin@123';

bcrypt.hash(plainPassword, 10)
  .then(hash => {
    console.log('Hashed password:', hash);
  })
  .catch(err => {
    console.error(err);
  });
