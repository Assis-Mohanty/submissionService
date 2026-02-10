import { Request,Response } from "express";
import { SubmissionRepository } from "../repository/submission.repository";
import { SubmissionService } from "../services/submission.service";

const submissionService = new SubmissionService(new SubmissionRepository());
export async function createSubmissionHandler (req:Request,res:Response) {
    const reqBody= req.body;
    const result = await submissionService.createSubmission(reqBody);
    res.status(201).json(result);
}

export async function getSubmissionByIdHandler (req:Request,res:Response) {
    const submissionId = req.params.id;
    const result = await submissionService.getSubmissionById(submissionId);
    res.status(200).json(result);
}
export async function getSubmissionsByProblemIdHandler (req:Request,res:Response) {
    const problemId = req.params.problemId;
    const result = await submissionService.getSubmissionsByProblemId(problemId);
    res.status(200).json(result);
}
export async function deleteSubmissionByIdHandler (req:Request,res:Response) {
    const submissionId = req.params.id;
    const result = await submissionService.deleteSubmissionById(submissionId);
    res.status(200).json({ success: result });
}
export async function updateSubmissionStatusHandler (req:Request,res:Response) {
    const submissionId = req.params.id;
    const { status, submissionData } = req.body;
    const result = await submissionService.updateSubmissionStatus(submissionId, status, submissionData);
    res.status(200).json(result);
}
