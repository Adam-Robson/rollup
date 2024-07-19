import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.SUPABASE_URL;
const key = import.meta.env.SUPABASE_KEY;

export const store = createClient(url, key);

/**
 * A function that checks for errors in the response data.
 *
 * @param {object} data - The data object to be checked.
 * @param {object} error - The error object to be checked for error messages.
 * @return {object} The data object.
 */
export function checkError({ data, error }) {
  if (error) console.error(`An error occurred during the response: ${error.message}`);
  return data;
}
