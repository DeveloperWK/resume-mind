import knownSkills from "../data/skill-list.json";
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[.,()\[\]\n]/g, " ")
    .replace(/\s+/g, " ");
};
const extractSkillsFromText = (rawText: string): string[] => {
  const normalized = normalizeText(rawText);
  const words = new Set(normalized.split(" "));

  return knownSkills.filter((skill) => {
    const skillParts = skill.toLowerCase().split(" ");
    return skillParts.every((part) => words.has(part));
  });
};

export default extractSkillsFromText;
