import * as yup from "yup";
import { required, ageText, emailText, phoneText, passLenText, passLettersText, passCheckText } from "./constants";

const validationSchemaPartOne = yup.object().shape({
    phone: yup
      .string()
      .required(required)
      .matches(/^(8\d{10}|\+7\d{10})$/, phoneText),
    password: yup
      .string()
      .required(required)
      .min(6, passLenText)
      .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, passLettersText),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], passCheckText)
      .required(required),
    code: yup.string().when("isAdmin", {
      is: true,
      then: yup
        .string()
        .matches(/^\d{4}-\d{4}-\d{4}-\d{4}$/, "Admin code format is invalid")
        .required("Admin code is required"),
    }),
  });

  const validationSchemaPartTwo = yup.object().shape({
    firstName: yup.string().required(required),
    lastName: yup.string().required(required),
    middleName: yup.string(),
    email: yup.string().email(emailText).nullable(),
    birthDate: yup
      .date()
      .nullable()
      .transform((value, originalValue) => originalValue === "" ? null : value)
      .test("age", ageText, function (value) {
        if (!value) return true; 
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age >= 18;
      })
      .max(new Date(), "Birth date cannot be in the future") 
      .required(required),
    gender: yup.string().nullable(),
    consent: yup
      .bool()
      .oneOf([true], "You must accept the terms")
      .required(required),
  });

  const validationSchemaAuth = yup.object().shape({
    phone: yup
      .string()
      .required(required)
      .matches(/^(8\d{10}|\+7\d{10})$/, phoneText),
    password: yup
      .string()
      .required(required)
      .min(6, passLenText)
      .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, passLettersText),
  });

const isValidCode = (value) => {
    const regex = /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/;
    return regex.test(value);
}

export {
    validationSchemaPartOne,
    validationSchemaPartTwo,
    validationSchemaAuth,
    isValidCode,
}