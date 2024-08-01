const MAX_COUNT = 5;
export const handleUploadFiles = (files: File[], uploadedFiles: File[], setFileLimit: (value: boolean) => void, setUploadedFiles: (value: File[]) => void): any => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    const response = files.some((file) => {
        console.log("FIle Type: ", file.type === "application/pdf");
        if (String(file.type) !== "application/pdf") {
            console.log("FIle not valid");
            return false;
        } else if (uploaded.findIndex((f) => f.name === file.name) === -1) {
            uploaded.push(file);
            if (uploaded.length === MAX_COUNT) setFileLimit(true);
            if (uploaded.length > MAX_COUNT) {
                alert(`You can only add a maximum of ${MAX_COUNT} files`);
                setFileLimit(false);
                limitExceeded = true;
                return false;
            }
            return true;
        } else {
            return false;
        }
    })
    if (!limitExceeded) setUploadedFiles(uploaded)
    return response;
}