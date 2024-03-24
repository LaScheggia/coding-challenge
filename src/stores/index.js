import { createPinia } from 'pinia';

const pinia = createPinia();

export const useStore = () => {
  return pinia;
};

export default pinia;