export const getInitials = (fullName: string) => {
  const words = fullName.split(' ');
  const name = words[0];
  const surname = words[1];

  return name[0] + surname[0];
};
