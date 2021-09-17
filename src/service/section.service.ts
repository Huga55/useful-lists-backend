import Section from "../model/section.model";

export const checkExistSection = async (userId: string, sectionId: string) => {
  return Section.findOne({
    _id: sectionId,
    user: userId,
  }).lean();
};

export const createDefaultSections = async (userId: string) => {
  await Section.insertMany([
    { user: userId, name: "Мои фильмы", isDefault: true },
    { user: userId, name: "Мои книги", isDefault: true },
    { user: userId, name: "Нужно сделать", isDefault: true },
  ]);
};
