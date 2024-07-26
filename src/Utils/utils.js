export const prepareDisplayName = (name) => {
  if (!name) return "User";

  const nameParts = name.split(" ");
  if (nameParts.length <= 1) {
    return nameParts[0];
  }

  return `${nameParts[0]} ${nameParts[1]}`;
};
