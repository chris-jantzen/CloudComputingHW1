export const verifyUser = (user) => {
  const requiredProps = [
    'username',
    'password',
    'firstName',
    'lastName',
    'email',
  ]
  return (
    requiredProps.filter((prop) => {
      return user[prop] !== undefined
    }).length === 0
  )
}
