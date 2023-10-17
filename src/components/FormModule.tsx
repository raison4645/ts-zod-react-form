import {z} from 'zod';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';

const mySchema = z.string();

export const FormModule = () => {
  const { user, setUser } = useContext(UserContext);
  // console.log(user)

  return (
    <div>
      <form action="" className="flex-col flex border p-4 m-4 rounded gap-2" style={{display: 'none'}}>
        <label>User Name</label>
        <input type="text"/>
        <label>Email</label>
        <input type="text"/>
        <label>ID</label>
        <input type="password"/>
        <div>
          <label>citizen?</label>
          <input type="checkbox"/>
        </div>
        <button className='border p-2 rounded flex justify '>Submit</button>
      </form>
    </div>

  )
}