import { z } from 'zod';

export const FormSchema = z
  .object({
    name: z.string().min(8).max(20),
    email: z.string().email(),
    password: z.string(),
    confirm_password: z.string()
  })
  .refine(data => data.password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"]
  })

  // export the schema as type object by using z.infer<> so that it does not need to delcare the type in ts again
  export type FormSchemaType = z.infer<typeof FormSchema>;