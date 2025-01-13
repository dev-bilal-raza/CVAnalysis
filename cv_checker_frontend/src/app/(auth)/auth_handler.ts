import config from '@/common/config';
const registerWithGoogle = () => {
  try {
    window.location.href = `${config.apiV1Url}/auth/google/login`;
  } catch (error) {
    console.error(error);
  }
};
const registerWithGithub = () => {
  try {
    window.location.href = `${config.apiV1Url}/auth/github/login`;
  } catch (error) {
    console.error(error);
  }
};

export { registerWithGoogle, registerWithGithub };
