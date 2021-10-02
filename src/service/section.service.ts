import Section from "../model/section.model";

interface ISectionChange {
  _id?: string;
  name?: string;
  isDefault?: boolean;
}

export const checkExistSection = async (
  userId: string,
  sectionData: ISectionChange
) => {
  return Section.findOne({
    user: userId,
    ...sectionData,
  }).lean();
};

export const createDefaultSections = async (userId: string) => {
  await Section.insertMany([
    { user: userId, name: "Мои фильмы", isDefault: true },
    { user: userId, name: "Мои книги", isDefault: true },
    { user: userId, name: "Нужно сделать", isDefault: true },
  ]);
};
