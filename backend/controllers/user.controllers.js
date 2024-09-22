export const postRequest = async (req, res) => {
    const { data, file_b64 } = req.body;

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());

    const highestLowercase = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

    const fileValid = file_b64 ? true : false; 
    const fileMimeType = fileValid ? "image/png" : null; 
    const fileSizeKb = file_b64 ? Buffer.from(file_b64, 'base64').length / 1024 : 0;

    res.json({
        is_success: true,
        user_id: "sayan_biswas_02122003",
        email: "sayan_biman@srmap.edu.in",
        roll_number: "AP21110011129",
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase,
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKb
    });
};

export const getRequest = async (req, res) => {
    res.json({ operation_code: 1 });
}