import * as Yup from 'yup'

export const logInSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Please enter a valid email'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  email: Yup.string().required('Email is required').email('Please enter a valid email'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

export const categorySchema = Yup.object().shape({
  name: Yup.string().required('Category name is required'),
  slug: Yup.string().required('Slug is required'),
  image: Yup.string()
    .required('Image URL is required')
    .url('Invalid image URL')
    .matches(/\.(avif|gif|jpe?g|png|webp)$/i, 'Image URL must be a valid image URL'),
})

export const bannerSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  image: Yup.object().shape({
    url: Yup.string()
      .required('Image URL is required')
      .url('Invalid URL')
      .matches(/\.(avif|gif|jpe?g|png|webp)$/i, 'Image URL must be a valid image URL'),
  }),
})

export const sliderSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  image: Yup.object().shape({
    url: Yup.string()
      .required('Image URL is required')
      .url('Invalid URL')
      .matches(/\.(avif|gif|jpe?g|png|webp)$/i, 'Image URL must be a valid image URL'),
  }),
})

export const reviewSchema = Yup.object().shape({
  title: Yup.string().required('Review title is required').min(4, 'Review title must be at least 4 characters'),
  comment: Yup.string().required('Review comment is required').min(4, 'Review comment must be at least 4 characters'),
})

export const addressSchema = Yup.object().shape({
  country: Yup.string().required('Please enter your country'),
  city: Yup.string().required('Please enter your city'),
  area: Yup.string().required('Please enter your area'),
  street: Yup.string().required('Street name is required'),
  postalCode: Yup.string().required('Postal code is required'),
})

export const nameSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(3, 'Name must be more than 3 characters'),
})

export const mobileSchema = Yup.object().shape({
  mobile: Yup.string()
    .required('Mobile number is required')
    .min(11, 'Mobile number must be 11 digits')
    .max(11, 'Mobile number must be 11 digits'),
})
