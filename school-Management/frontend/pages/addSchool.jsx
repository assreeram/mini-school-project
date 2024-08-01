import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  contact: yup.string().matches(/^\d+$/, 'Contact must be a number').required('Contact is required'),
  email_id: yup.string().email('Invalid email').required('Email is required'),
  image: yup.mixed().required('Image is required'),
});

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    try {
      await axios.post('/api/schools', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('School added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add school.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Add School</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input type="text" {...register('name')} />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <label>Address:</label>
          <input type="text" {...register('address')} />
          <p>{errors.address?.message}</p>
        </div>
        <div>
          <label>City:</label>
          <input type="text" {...register('city')} />
          <p>{errors.city?.message}</p>
        </div>
        <div>
          <label>State:</label>
          <input type="text" {...register('state')} />
          <p>{errors.state?.message}</p>
        </div>
        <div>
          <label>Contact:</label>
          <input type="text" {...register('contact')} />
          <p>{errors.contact?.message}</p>
        </div>
        <div>
          <label>Email:</label>
          <input type="email" {...register('email_id')} />
          <p>{errors.email_id?.message}</p>
        </div>
        <div>
          <label>Image:</label>
          <input type="file" {...register('image')} />
          <p>{errors.image?.message}</p>
        </div>
        <button type="submit">Add School</button>
      </form>
    </div>
  );
}
