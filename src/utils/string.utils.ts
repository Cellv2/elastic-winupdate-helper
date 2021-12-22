/**
 * Trims and removes trailing slashes
 *
 * @param {string} stringToCheck The string to check
 * @returns {string} The checked string
 */
export const trimAndRemoveTrailingSlash = (stringToCheck: string): string => {
    let checkedString = stringToCheck.trim();

    if (stringToCheck.endsWith("/")) {
        checkedString = checkedString.slice(0, -1);
    }

    return checkedString;
};
