
import * as yup from 'yup'

export const signupSchema = yup.object().shape({
     firstName:yup.string().required(),
     lastName:yup.string().required(),
     email:yup.string().email('Email is invalid').required('Email is required'),
     phoneNumber:yup.number('Invalid Phone Number').min(10),
     password:yup.string().min(6, 'Password must be at least 6 characters').max(15).required(),
     confirmPassword:yup.string().oneOf([yup.ref("password"),null],'Passwords must match'),
})
// export const signupSchema = Yup.object().shape({
//      firstName: Yup.string()
//        .min(2, 'Too Short!')
//        .max(50, 'Too Long!')
//        .required('Required'),
//      lastName: Yup.string()
//        .min(2, 'Too Short!')
//        .max(50, 'Too Long!')
//        .required('Required'),
//      email: Yup.string().email('Invalid email').required('Required'),
//    });