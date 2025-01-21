'use server';

import { contactFormSchema } from '@/lib/schema';
import { z } from 'zod';

export async function contactFormAction(_prevState, formData) {
  console.log('Backend API URL:', process.env.NEXT_PUBLIC_BACKEND_API_URL);  // 環境変数の値をログに表示
  const defaultValues = z
    .record(z.string(), z.string())
    .parse(Object.fromEntries(formData.entries()));

  const api_url = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  try {
    // フォームデータをスキーマに従って検証
    const data = contactFormSchema.parse(Object.fromEntries(formData));

    // 実際のAPIエンドポイントにデータを送信
    const response = await fetch(`${api_url}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // APIが成功レスポンスを返さなかった場合
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit the form');
    }

    console.log('Form submitted successfully:', data);

    return {
      defaultValues: {
        name: '',
        email: '',
        message: '',
      },
      success: true,
      errors: null,
    };
  } catch (error) {
    console.error('Error submitting form:', error);

    if (error instanceof z.ZodError) {
      return {
        defaultValues,
        success: false,
        errors: Object.fromEntries(
          Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
            key,
            value?.join(', '),
          ])
        ),
      };
    }

    return {
      defaultValues,
      success: false,
      errors: { global: error.message || 'Unknown error occurred' },
    };
  }
}
