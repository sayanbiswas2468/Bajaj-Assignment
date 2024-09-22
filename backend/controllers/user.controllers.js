const parseInputArray = (inputArray) => {
    const numbers = inputArray.filter((item) => !isNaN(item)); // Numeric values
    const alphabets = inputArray.filter((item) => isNaN(item)); // Non-numeric values
    const lowercaseAlphabets = alphabets.filter((item) => /^[a-z]$/.test(item));
    const highestLowercase = lowercaseAlphabets.length ? lowercaseAlphabets.sort()[lowercaseAlphabets.length - 1] : null;

    return { numbers, alphabets, highestLowercase };
};

const getFileProperties = (base64String) => {
    try {
        const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            return { valid: false };
        }

        const mimeType = matches[1];
        const buffer = Buffer.from(matches[2], 'base64');
        const sizeKb = buffer.length / 1024;

        return { valid: true, mimeType, sizeKb };
    } catch (error) {
        return { valid: false };
    }
};

export const postRequest = async (req, res) => {
    try {
        const { name, dob, roll_number, email, data_array, file_base64 } = req.body;

        if (!name || !dob || !roll_number || !email || !Array.isArray(data_array)) {
            return res.status(400).json({
                is_success: false,
                message: "Missing or invalid input fields"
            });
        }

        const { numbers, alphabets, highestLowercase } = parseInputArray(data_array);

        // Initialize file properties
        let fileValid = false;
        let fileMimeType = null;
        let fileSizeKb = null;

        if (file_base64) {
            const fileProps = getFileProperties(file_base64);
            fileValid = fileProps?.valid || false;
            fileMimeType = fileProps?.mimeType || null;
            fileSizeKb = fileProps?.sizeKb || null;
        }

        const formattedDob = dob.split('-').reverse().join('');
        const userId = `${name.trim().replace(/\s+/g, '_').toLowerCase()}_${formattedDob}`;

        const response = {
            is_success: true,
            user_id: userId,
            email: email,
            roll_number: roll_number,
            numbers: numbers || [],
            alphabets: alphabets || [],
            highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
            file_valid: fileValid,
            file_mime_type: fileMimeType,
            file_size_kb: fileSizeKb ? fileSizeKb.toFixed(2) : null, // Two decimal places for file size
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            is_success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export const getRequest = async (req, res) => {
    const response = {
        operation_code: 1,
    };
    res.status(200).json(response);
}