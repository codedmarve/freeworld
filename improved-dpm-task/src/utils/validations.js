export const validations = {
  email: {
    custom: {
      isValid: (value) => value && value.length > 6,
      message: "Minimum of 6 characters required",
    },
    pattern: {
      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Enter a valid email address",
    },
    required: {
      value: true,
      message: "This field is required",
    },
  },
};
