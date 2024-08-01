import { FaqType } from "@/types/faqs.module";

export let faqs: FaqType[] = [
    {
        id: 1,
        question: "How does the CV Analyzer work?",
        answer: "Our CV Analyzer uses advanced AI algorithms to compare the content of CVs against job descriptions. It evaluates factors such as skills, experience, and qualifications to determine the best match for your job openings.",
        isShowed: false
    },
    {
        id: 2,
        question: "Is the CV Analyzer accurate?",
        answer: "Yes, our CV Analyzer is designed to provide highly accurate results by using state-of-the-art machine learning models. It continuously learns and improves from the data it processes, ensuring reliable and precise matches.",
        isShowed: false
    },
    {
        id: 3,
        question: "Can I customize the criteria for CV analysis?",
        answer: "Absolutely! You can tailor the analysis criteria to fit your specific needs. Adjust the importance of various factors such as skills, experience, and education to better match your hiring requirements.",
        isShowed: false
    },
    {
        id: 4,
        question: "How secure is the data I upload?",
        answer: "Data security is our top priority. We use advanced encryption methods to ensure that all your data, including job descriptions and CVs, is securely stored and transmitted.",
        isShowed: false
    },
    {
        id: 5,
        question: "Can I try the CV Analyzer before committing to a subscription?",
        answer: "Yes, we offer a free trial period so you can experience the benefits of our CV Analyzer firsthand. Sign up today to see how it can streamline your hiring process.",
        isShowed: false
    },
    {
        id: 6,
        question: "What formats of CVs are supported?",
        answer: "Our CV Analyzer supports multiple formats, including PDF, DOCX, and TXT, making it easy to upload and analyze CVs regardless of their format.",
        isShowed: false
    },
    {
        id: 7,
        question: "How long does the analysis take?",
        answer: "The analysis process is very quick, typically taking just a few seconds per CV. You’ll receive the results almost instantly, allowing you to make swift hiring decisions.",
        isShowed: false
    }
];
