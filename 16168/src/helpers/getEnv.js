/**
 * Get environment variable value
 * @param {string} envname - Name of the environment variable
 * @returns {string} - Value of the environment variable
 */
export const getEnv = (envname) => {
    return import.meta.env[envname];
};
