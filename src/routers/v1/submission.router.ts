import express from 'express';
import { createSubmissionHandler, deleteSubmissionByIdHandler, getSubmissionByIdHandler, getSubmissionsByProblemIdHandler, updateSubmissionStatusHandler } from '../../controllers/submission.controller';

const submissionRouter = express.Router();

submissionRouter.post('/',createSubmissionHandler)
submissionRouter.get('/',getSubmissionByIdHandler)
submissionRouter.get('/problem/:problemId',getSubmissionsByProblemIdHandler)
submissionRouter.delete('/:id',deleteSubmissionByIdHandler)
submissionRouter.put('/:id/',updateSubmissionStatusHandler)

export default submissionRouter;