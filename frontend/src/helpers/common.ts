/**
 * Format a date string into a more readable format.
 * @param dateStr The date string to format.
 */
export const formatDate = (dateStr: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

/**
 * Validate an email address.
 * @param email The email address to validate.
 */
export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

/**
 * Capitalize the first letter of a string.
 * @param str The string to capitalize.
 */
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
