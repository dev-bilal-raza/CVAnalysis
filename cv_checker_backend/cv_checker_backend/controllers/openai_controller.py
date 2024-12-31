import json
from typing import Any, List, Optional
from cv_checker_backend.core.common import STATUS
from cv_checker_backend.config.openai_config import client


def analyze_cv_by_openai(job_title: Optional[str], job_description: str, cvs: List[str]):
    prompt = (
        f"Job Title: {job_title}\n"
        f"Job Description: {job_description}\n\n"
    )
    for i, cv in enumerate(cvs):
        prompt += f"CV {i+1}: {cv}\n\n"

    prompt += """
    For each CV, respond in JSON format with four keys and don't need to add anyother explanation.:
        "candidate_name": The candidate's name.
        "candidate_email": The candidate's email address.
        "features": Key features of the CV like summary, skills (string "," separated), education (string "," separated) and experience (string "," separated).
        "is_recommended": A boolean value indicating if the CV meets the job description (true if it meets, false otherwise).\n
        "recommendation_points": An integer value indicating a level of recommendation out of 10.\n
    """

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": """
                You are an expert HR assistant. Your task is to analyze CVs based on the given job title and job description. Follow these guidelines:

                1) If the job title and job description are technical but no valid CVs are found, just respond "No valid CVs found". Plesae double check for non valid CVs.
                2) If any of the provided CV text does not resemble a CV, exclude it from your response.
                3) For valid CVs, provide your response as a list of dictionaries, where each dictionary contains the key details of the CV.
                4) If the job title or job description is incorrect, respond with "Invalid Job Title or Description".
                """
            },
            {"role": "user", "content": prompt}
        ]
    )
    if response.choices[0].message.content:
        raw_response = response.choices[0].message.content.strip()
        try:
            # Attempt to locate and parse the JSON part of the response
            print(raw_response)
            json_start = raw_response.find("[")
            json_end = raw_response.rfind("]") + 1
            json_content = raw_response[json_start:json_end]
            if json_start == -1 or json_end == -1 or not json_content:
                print("String")
                return {
                    "status": STATUS["ERROR"],
                    "message": raw_response
                }
            data: List[dict[str, Any]] = json.loads(json_content)
            return {"status": STATUS["SUCCESS"] , "data": data}
        except json.JSONDecodeError as e:
            print("Failed to decode JSON response:", e)
            print("Response content:", raw_response)
            return {
                "status": STATUS["ERROR"],
                "message": "Failed to decode JSON response"
            }
        except Exception as e:
            print("Error while parsing JSON response:", e)
            return {
                "status": STATUS["ERROR"],
                "message": "Problem has been occurred while analyzing CVs. We are working on it, we will get back to you soon."
            }

