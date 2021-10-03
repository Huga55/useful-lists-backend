import { FilterQuery } from "mongoose";
import Note, { INoteDocument } from "../model/note.model";

export const checkExistNote = async (
  userId: string,
  noteData: FilterQuery<INoteDocument>
) => {
  return Note.findOne({
    user: userId,
    ...noteData,
  }).lean();
};
