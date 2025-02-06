'use server';

import { revalidatePath } from 'next/cache';
import { client } from 'sanity/lib/client';

export async function deleteProduct(formData: FormData) {
  const id = formData.get('id') as string;
  await client.delete(id);
  revalidatePath('/');
}
