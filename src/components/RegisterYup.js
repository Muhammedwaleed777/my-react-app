import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
  age: yup.number()
    .required('Age is required')
    .min(18, 'You must be at least 18 years old')
    .max(100, 'Age must be less than 100')
});

function RegisterYup() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  function onSubmit(data) {
    console.log('Form Data:', data);
    alert(`Registration Successful!\nName: ${data.name}\nEmail: ${data.email}`);
  }

  return (
    <div style={{
      maxWidth: '400px',
      margin: '0 auto',
      padding: '30px',
      backgroundColor: '#f5f5f5',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ textAlign: 'center' }}>📝 Registration (Yup)</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name:</label>
          <input {...register('name')} placeholder="Enter your name" style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '5px', fontSize: '16px' }} />
          {errors.name && <p style={{ color: 'red', marginTop: '5px' }}>{errors.name.message}</p>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
          <input {...register('email')} placeholder="Enter your email" style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '5px', fontSize: '16px' }} />
          {errors.email && <p style={{ color: 'red', marginTop: '5px' }}>{errors.email.message}</p>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password:</label>
          <input type="password" {...register('password')} placeholder="Enter your password" style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '5px', fontSize: '16px' }} />
          {errors.password && <p style={{ color: 'red', marginTop: '5px' }}>{errors.password.message}</p>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Confirm Password:</label>
          <input type="password" {...register('confirmPassword')} placeholder="Confirm your password" style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '5px', fontSize: '16px' }} />
          {errors.confirmPassword && <p style={{ color: 'red', marginTop: '5px' }}>{errors.confirmPassword.message}</p>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Age:</label>
          <input type="number" {...register('age')} placeholder="Enter your age" style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '5px', fontSize: '16px' }} />
          {errors.age && <p style={{ color: 'red', marginTop: '5px' }}>{errors.age.message}</p>}
        </div>

        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', fontSize: '18px', cursor: 'pointer' }}>Register</button>
      </form>
    </div>
  );
}

export default RegisterYup;