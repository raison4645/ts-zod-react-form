import { FormSchema, FormSchemaType } from '@/lib/types';
import { useForm, type FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'


// import { useContext } from 'react';
// import { UserContext } from '@/context/UserContext';

// const FormSchema = z.object({
//   name: z.string().min(8).max(20),
//   email: z.string().email(),
//   password: z.string()
// })

export const FormModule = () => {
  // const { user, setUser } = useContext(UserContext);
  // console.log(user)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    console.log('form Submission')
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-col flex border p-4 m-4 rounded gap-2 w-1/3">
        <input
          {...register("name", {
            required: "Username is required."
          })}
          type="text"
          id="name"
          placeholder='Username'
        />
        {errors.name && (
          <span>{`${errors.name.message}`}</span>
        )}

        <input
        {...register("email", {
          required: "Email address is required."
        })}
          type="text"
          id="email"
          placeholder='Email'
        />
        {errors.email && (
          <span>{`${errors.email.message}`}</span>
        )}

        <input
        {...register("password", {
          required: "Password is required.",
          minLength: {
            value: 8,
            message: "Password must be at least 8 chars"
          },
          maxLength: {
            value: 20,
            message: "Password must not be more than 20 chars"
          },
        })}
          type="password"
          id="password"
          placeholder='Password'
        />
        {errors.password && (
          <span>{`${errors.password.message}`}</span>
        )}
        <input
          {...register("confirmpassword", {
            required: "Confirm Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 chars"
            },
            maxLength: {
              value: 20,
              message: "Password must not be more than 20 chars"
            },
            validate: (value) =>
              value === getValues("password") || "Password must match"
          })}
          type="password"
          id="confirm_password"
          placeholder='Confirm Password'
        />
        {errors.confirm_password && (
          <span>{`${errors.confirm_password.message}`}</span>
        )}

        <div>
        Citizen?
          <input type="checkbox" className="ml-4 pt-3" id="citizen" />
        </div>
        <button
          className='border p-2 rounded flex justify'
          type="submit"
          onClick={onSubmit}
        >
          Submit
        </button>
      </form>
    </div>

  )
}