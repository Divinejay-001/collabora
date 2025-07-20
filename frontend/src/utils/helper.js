export const validateEmail = (email) => {
   const regex  = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email);
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split('.'); // <-- use [ ]
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  return fractionalPart 
    ? `${formattedInteger}.${fractionalPart}` 
    : formattedInteger;
};