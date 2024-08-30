import * as yup from "yup";
import { required, ageText, emailText, phoneText, passLenText, passLettersText, passCheckText, consentText, ageMinText, ageMaxText } from "./constants";

export const validationSchemaPartOne = yup.object().shape({
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

export const validationSchemaPartTwo = yup.object().shape({
    firstname: yup.string().required(required),
    lastname: yup.string().required(required),
    patronymic: yup.string(),
    email: yup.string().email(emailText).required(required),
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
      .min(new Date(1900, 0, 1), ageMinText)
      .max(new Date(), ageMaxText) 
      .required(required),
    gender: yup.string().required(required),
    consent: yup
      .bool()
      .oneOf([true], consentText)
      .required(required),
  });

export const validationSchemaPartThree = yup.object().shape({
    firstName: yup.string().required(required),
    lastName: yup.string().required(required),
    middleName: yup.string(),
    email: yup.string().email(emailText).required(required),
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
      //.min(new Date(1900, 0, 1), ageMinText)
      .max(new Date(), ageMaxText) 
      .required(required),
    gender: yup.string().required(required),
  });

export const validationSchemaAuth = yup.object().shape({
    phone: yup
      .string()
      .required(required),
      //.matches(/^(8\d{10}|\+7\d{10})$/, phoneText),
    password: yup
      .string()
      .required(required)
      .min(6, passLenText)
      .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, passLettersText),
  });

export const isValidCode = (value) => {
    const regex = /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/;
    return regex.test(value);
}