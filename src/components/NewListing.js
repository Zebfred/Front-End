import React from 'react';
import { withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {addListing} from '../actions/listingsActions'

function NewListing(props){

    const { values, touched, errors } = props;

    const checkPrice = (e) => {
        e.preventDefault();
        console.log(props)
    }
    return (
            <Form className='new-form'>
                <label htmlFor="bed_number">Bedrooms</label>
                <Field
                    name='bed_number' 
                    id='bed_number'
                    placeholder="No. of Bedrooms"
                    value={values.bed_number}
                />
                {touched.bed_number && errors.bed_number && (
                    <p className="errors"> {errors.bed_number}</p>
                )}
                <label htmlFor="bath_number">Bathrooms</label>
                <Field
                    name='bath_number' 
                    id='bath_number'
                    placeholder="No. of bathrooms"
                    value={values.bath_number}
                />
                {touched.bath_number && errors.bath_number && (
                    <p className="errors"> {errors.bath_number}</p>
                )}
                <label htmlFor="zip">Zip Code</label>
                <Field
                    
                    name='zip' 
                    id='zip'
                    placeholder="Zip Code"
                    value={values.zip}
                />
                {touched.zip && errors.zip && (
                    <p className="errors"> {errors.zip}</p>
                )}
                <label htmlFor="address">Street Address</label>
                <Field
                    name='address' 
                    id='address'
                    placeholder="Street Address"
                    value={values.address}
                />
                {touched.address && errors.address && (
                    <p className="errors"> {errors.address}</p>)}
                <label htmlFor="city">City</label>
                <Field
                    name='city' 
                    id='city'
                    placeholder="City"
                    value={values.city}
                />
                {touched.city && errors.city && (
                    <p className="errors"> {errors.city}</p>)}
                <label htmlFor="state">State</label>
                <Field
                    name='state' 
                    id='state'
                    placeholder="State"
                    value={values.state}
                />
                {touched.state && errors.state && (
                    <p className="errors"> {errors.state}</p>)}
                <label htmlFor="price">Price</label>
                <Field
                    name='price' 
                    id='price'
                    placeholder="Price"
                    value={values.price}
                />
                {touched.price && errors.price && (
                    <p className="errors"> {errors.price}</p>)}
                <label htmlFor="sqft">Square-Footage</label>
                <Field
                    name='sqft' 
                    id='sqft'
                    placeholder="Sq.Ft"
                    value={values.sqft}
                />
                {touched.sqft && errors.sqft && (
                    <p className="errors"> {errors.sqft}</p>)}
                    <label htmlFor="email">Email Address</label>
                <Field
                    name='email' 
                    id='email'
                    placeholder="Email"
                    value={values.email}
                />
                {touched.email && errors.email && (
                    <p className="errors"> {errors.email}</p>)}
                <div className='label'>
                    <label htmlFor="date">Check-In Date</label>
                </div>
                <Field
                    
                    name='date' 
                    id='date'
                    placeholder="Date"
                    value={values.date}
                />
                {touched.date && errors.date && (
                    <p className="errors"> {errors.date}</p>)}
                
                <div className="editmodal-btns">
                    <button disabled={!values.bed_number || !values.bath_number || !values.zip} onClick={checkPrice}className="new-btn">Check Price</button>
                    
                    <button disabled={Object.getOwnPropertyNames(touched).length === 0|| !(Object.getOwnPropertyNames(errors).length === 0)}type="submit" className="new-btn">Create Listing</button>
                </div>
            </Form>
    )
}

const FormikNewListing = withFormik({
    mapPropsToValues({ 
        bed_number,
        bath_number,
        zip,
        address,
        city,
        state,
        price,
        sqft,
        email,
        date,
        }) {
        return {
            bed_number: bed_number || "",
            bath_number: bath_number || "",
            zip: zip || "",
            address: address || "",
            city: city || "",
            state: state ||"",
            price: price || "",
            sqft: sqft || "",
            email: email || "",
            date: date || ""
        };
    },
    validationSchema: Yup.object().shape({
        bed_number:Yup.string().required("Bedrooms required"),
        bath_number:Yup.string().required("Bathrooms required"),
        zip: Yup.string().required("Zip Required").test('len', 'Must be exactly 5 characters', val => val && val.toString().length === 5),
        address:Yup.string().required('Address Required'),
        city:Yup.string().required('City Required'),
        price:Yup.string().required('Price Required'),
        email: Yup.string().email('Invalid Email Address').required('Email required'),
        date: Yup.string().required('Date Required')
    }),
    handleSubmit(values, {props, resetForm}) {
        props.addListing(props.match.params.id, values);
        resetForm();
    }
})(NewListing);

export default connect(null, {addListing})(FormikNewListing);