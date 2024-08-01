const registerWithGoogle = () => {
    try {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/google/login`;
    } catch (error) {
        console.error(error);
    }
};
const registerWithGithub = () => {
    try {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/github/login`;
    } catch (error) {
        console.error(error);
    }
};

export { registerWithGoogle, registerWithGithub };