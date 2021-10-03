import { Request, Response } from "express";
import { omit, pick } from "lodash";
import Note, { INoteDocument } from "../model/note.model";
import Timer, { ITimerDocument } from "../model/timer.model";
import User, { IUserDocument } from "../model/user.model";
import { checkExistNote } from "../service/note.service";
import { serverErrorHandler } from "../utils/errorsHandler.utils";

export const getNoteInfoHandler = async (
  request: Request,
  response: Response
) => {
  try {
    const { _id } = request.params;

    const userId = request.user._id;

    const note = (await Note.findOne({
      _id,
      user: userId,
    }).lean()) as INoteDocument | null;

    if (!note)
      return response.status(404).send({ error: request.t("errors.404Note") });

    const timers = ((await Timer.find({ note: _id }).lean()) || []) as
      | ITimerDocument[]
      | [];

    return response.status(200).send({
      ...omit(note, ["createdAt", "updatedAt"]),
      timers: timers.map((t) => omit(t, ["createdAt", "updatedAt"])),
    });
  } catch (e) {
    return serverErrorHandler(e, "getNoteInfoHandler", response, request);
  }
};

interface ICreateNoteParams {
  name: string;
  description: string;
  sectionId: string;
}

export const createNoteInfoHandler = async (
  request: Request,
  response: Response
) => {
  try {
    const { description, name, sectionId } = request.body as ICreateNoteParams;

    const userId = request.user._id;

    const { notesMax } = (await User.findById(userId).lean()) as IUserDocument;

    const countUsersNotes = await Note.count({ section: sectionId });

    if (countUsersNotes >= notesMax)
      return response.status(405).send({
        error: request.t("errors.limit", {
          name: request.t("names.note"),
          maxValue: notesMax,
        }),
      });

    const isNoteExist = await Note.findOne({ section: sectionId, name }).lean();

    if (isNoteExist)
      return response
        .status(409)
        .send({ error: request.t("errors.409NoteNameExist") });

    const note = (
      await Note.create({ name, description, section: sectionId, user: userId })
    ).toObject();

    return response
      .status(200)
      .send(pick(note, ["_id", "name", "description"]));
  } catch (e) {
    return serverErrorHandler(e, "createNoteInfoHandler", response, request);
  }
};

interface IChangeNoteParams {
  _id: string;
  name: string;
  description: string;
  sectionId: string;
}

export const changeNoteHandler = async (
  request: Request,
  response: Response
) => {
  try {
    const { _id, description, name, sectionId } =
      request.body as IChangeNoteParams;

    const userId = request.user._id;

    if (!(await checkExistNote(userId, { _id }))) {
      return response.status(404).send({ error: request.t("errors.404Note") });
    }

    if (
      await checkExistNote(userId, {
        section: sectionId,
        name,
        _id: { $ne: _id },
      })
    ) {
      return response
        .status(409)
        .send({ error: request.t("errors.409NoteNameExist") });
    }

    await Note.updateOne({ _id, user: userId }, { name, description });

    return response.sendStatus(200);
  } catch (e) {
    return serverErrorHandler(e, "changeNoteHandler", response, request);
  }
};

export const deleteNoteHandler = async (
  request: Request,
  response: Response
) => {
  try {
    const { _id } = request.params;

    const userId = request.user._id;

    if (!(await checkExistNote(userId, { _id }))) {
      return response.status(404).send({ error: request.t("errors.404Note") });
    }

    await Note.deleteOne({ user: userId, _id });

    await Timer.deleteMany({ note: _id });

    return response.sendStatus(200);
  } catch (e) {
    return serverErrorHandler(e, "deleteNoteHandler", response, request);
  }
};
