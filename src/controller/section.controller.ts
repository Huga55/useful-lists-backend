import { Request, Response } from "express";
import { pick } from "lodash";
import { serverErrorHandler } from "../utils/errorsHandler.utils";
import Section from "../model/section.model";
import { checkExistSection } from "../service/section.service";
import User, { IUserDocument } from "../model/user.model";
import Note from "../model/note.model";

export const getAllSectionsHandler = async (
  request: Request,
  response: Response
) => {
  try {
    const { _id } = request.user;

    const sections = await Section.find({ user: _id }).lean();

    return response
      .status(200)
      .send(sections.map((s) => pick(s, ["_id", "name", "isDefault"])));
  } catch (e) {
    return serverErrorHandler(e, "getAllSections", response, request);
  }
};

export const createSectionHandler = async (
  request: Request,
  response: Response
) => {
  try {
    const { _id } = request.user;

    const { sectionsMax } = (await User.findById(_id).lean()) as IUserDocument;

    const countUsersSections = await Section.count({ user: _id });

    if (countUsersSections >= sectionsMax)
      return response.status(405).send({
        error: request.t("errors.limit", {
          name: request.t("names.section"),
          maxValue: sectionsMax,
        }),
      });

    const { name } = request.body;

    const isExist = await Section.findOne({ user: _id, name }).lean();

    if (isExist)
      return response
        .status(409)
        .send({ error: request.t("errors.409SectionNameExist") });

    const section = (await Section.create({ name, user: _id })).toObject();

    return response
      .status(200)
      .send(pick(section, ["_id", "name", "isDefault"]));
  } catch (e) {
    return serverErrorHandler(e, "createSection", response, request);
  }
};

export const changeSectionHandler = async (
  request: Request,
  response: Response
) => {
  try {
    const userId = request.user._id;

    const { _id, name } = request.body;

    if (!(await checkExistSection(userId, { _id }))) {
      return response
        .status(404)
        .send({ error: request.t("errors.404Section") });
    }

    if (await checkExistSection(userId, { name })) {
      return response
        .status(409)
        .send({ error: request.t("errors.409SectionNameExist") });
    }

    await Section.updateOne({ _id, user: userId }, { name });

    return response.sendStatus(200);
  } catch (e) {
    return serverErrorHandler(e, "changeSection", response, request);
  }
};

export const deleteSectionHandler = async (
  request: Request,
  response: Response
) => {
  try {
    const userId = request.user._id;

    const { _id } = request.params;

    if (!(await checkExistSection(userId, { _id, isDefault: false })))
      return response
        .status(404)
        .send({ error: request.t("errors.404Section") });

    await Section.deleteOne({ user: userId, _id });

    await Note.deleteMany({ user: userId, section: _id });

    return response.sendStatus(200);
  } catch (e) {
    return serverErrorHandler(e, "deleteSection", response, request);
  }
};
