import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '27850756-bbddce2f901f47d46fa8e0033',
    orientation: 'horizontal',
    image_type: 'photo',
    per_page: 12,
  },
});

export const getPhoto = async (q, page = 1) => {
  const { data } = await instance('/', {
    params: {
      q,
      page,
    },
  });
  return data;
};
