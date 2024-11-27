export interface ICV {
    cv_id: number
    job_id: number
    candidate_name: string
    candidate_email: string
    is_recommended: boolean
    recommendation_points: number
    cv_features: ICVFeature
}

export interface ICVFeature {
    summary: string
    skills: string
    education: string
    experience: string
}