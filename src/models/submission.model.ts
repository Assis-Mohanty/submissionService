import { Document, Schema, model } from "mongoose";

export enum SubmissionStatus {
    COMPLETED = "completed",
    PENDING = "pending",
}

export enum SubmissionLanguage {
    CPP = "cpp",
    PYTHON = "python",
}

interface ISubmissionData {
    testCaseId: string;
    status: string; 
}
const submissionDataSchema = new Schema<ISubmissionData>({
    testCaseId: { type: String, required: true },
    status: { type: String, required: true }
}, { _id: false });

export interface ISubmission extends Document {
    userId:string
    problemId: string;
    competitionId?: string;
    code: string;
    language: SubmissionLanguage;
    status: SubmissionStatus;
    submissionData: ISubmissionData[];
    createdAt: Date;
    updatedAt: Date;
}

const submissionSchema = new Schema<ISubmission>({
    userId:{
        type:String,
        required:true
    },
    problemId: { 
        type: String, 
        required: [true, "Problem Id required for the submission"] 
    },
    competitionId:{
        type:String,
        required:false
    },
    code: { 
        type: String, 
        required: [true, "Code is required for evaluation"] 
    },
    language: { 
        type: String, 
        required: [true, "Language is required for evaluation"],
        enum: Object.values(SubmissionLanguage)
    },
    status: { 
        type: String, 
        required: true, 
        default: SubmissionStatus.PENDING,
        enum: Object.values(SubmissionStatus)
    },
    submissionData: {
        type: [submissionDataSchema],
        required: true,
        default: []
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (_, record) => {
            delete (record as any).__v; 
            (record as any).id = record._id;
            delete (record as any)._id; 
            return record;
        }
    }
});

submissionSchema.index({ status: 1, createdAt: -1 });
submissionSchema.index({ competitionId: 1, problemId: 1 }); 
export const Submission = model<ISubmission>("Submission", submissionSchema);