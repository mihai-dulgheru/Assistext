import axios from 'axios';

export const fetchCompletion = async (inputText) => {
  try {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const response = await axios.post(`${apiUrl}/completions`, {
      prompt: inputText,
      maxTokens: 12,
      temperature: 0,
    });
    return response.data.choices[0].text.split(/[\n.]/)[0].trim();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Server returned an error:', error.response.data);
      } else if (error.request) {
        console.error('No response received from server:', error.request);
      } else {
        console.error('Request setup error:', error.message);
      }
    } else {
      console.error('Request error:', error.message);
    }
    return '';
  }
};
