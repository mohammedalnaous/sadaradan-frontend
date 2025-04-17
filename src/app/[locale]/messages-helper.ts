import { getMessages } from 'next-intl/server';

export async function getMessagesForLayout(locale: string) {
  try {
    return await getMessages({ locale });
  } catch (error) {
    console.error('❌ Failed to load messages for locale:', locale);
    return null;
  }
}
