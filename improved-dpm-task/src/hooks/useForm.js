import { useState } from "react";
import * as api from "../api/index";
export const useForm = ({ validations }) => {
  const [inputValues, setInputValues] = useState({});
  const [errors, setErrors] = useState({});
  const [audioStatus, setAudioStatus] = useState("Record an Audio");

  const handleChange = (sanitizeFn) => ({ target }) => {
    const { value, name } = target;

    // sanitize input value if necessary
    const sanitizedValue = sanitizeFn ? sanitizeFn(value) : value;
    // set values of input field
    setInputValues({
      ...inputValues,
      [name]: sanitizedValue,
    });
  };

  const handleBlur = (e) => async (valid = true, newErrors = {}) => {
    if (validations) {
      for (const key in validations) {
        // get input value where $key is the input field name
        const value = inputValues[key];
        // get all the validation criteria for input field
        const { required, pattern, custom } = validations[key];
        valid = false;

        // if input value is empty
        if (required?.value && !value) newErrors[key] = required?.message;

        // if input doesn't match our pattern
        if (pattern?.value && !RegExp(pattern.value).test(value))
          newErrors[key] = pattern.message;

        // if our input has not met our specification
        if (custom?.isValid && !custom.isValid(value))
          newErrors[key] = custom.message;
      }
      // if any of d validation rules failed
      if (!valid) return setErrors(newErrors);
    }
    setErrors({});
  };

  const handleSubmit = (e) => async (audioData) => {
    e.preventDefault();
    const validate = Boolean(
      errors && Object.keys(errors).length === 0 && audioData
    );
    console.log(validate);
    if (!audioData) setAudioStatus("Oops, record an audio.") && handleBlur();
    if (validate) {
      const result = { audioData, inputValues };
      // const formData = new FormData();
      // formData.append("audio-data", result);
      const postAudio1 = await api.postAudio(result);
      setInputValues({});
      console.log(postAudio1);
    }
  };

  return {
    inputValues,
    setInputValues,
    handleBlur,
    handleChange,
    errors,
    handleSubmit,
    audioStatus,
  };
};
