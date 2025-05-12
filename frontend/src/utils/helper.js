export const validateEmail = (email) =>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}

export const getInitials = (name) => {
    if (!name) return '';
    const letters = name.split(" ");
    let initial = "";
    for (let i = 0; i < Math.min(letters.length, 2); i++) {
      if (letters[i] && letters[i][0]) {
        initial += letters[i][0].toUpperCase();
      }
    }
    return initial;
  };