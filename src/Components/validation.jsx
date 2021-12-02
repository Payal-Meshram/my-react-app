const validation = (student) => {
  let errors = {};
  if (!student.stuname) {
    errors.stuname = "Name is required";
  }
  if (!student.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(student.email)) {
    errors.email = "Email is Invalid";
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

export default validation;
