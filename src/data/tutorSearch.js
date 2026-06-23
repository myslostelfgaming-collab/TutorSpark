function normalizeText(value) {
  return String(value)
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function getTutorGradeNumbers(gradeText) {
  const normalized = normalizeText(gradeText);

  const rangeMatch = normalized.match(/grade\s*(\d+)\s*-\s*(\d+)/);

  if (rangeMatch) {
    const startGrade = Number(rangeMatch[1]);
    const endGrade = Number(rangeMatch[2]);
    const grades = [];

    for (let grade = startGrade; grade <= endGrade; grade += 1) {
      grades.push(grade);
    }

    return grades;
  }

  const singleGradeMatch = normalized.match(/grade\s*(\d+)/);

  if (singleGradeMatch) {
    return [Number(singleGradeMatch[1])];
  }

  return [];
}

function expandGradeRange(gradeText) {
  const gradeNumbers = getTutorGradeNumbers(gradeText);

  if (gradeNumbers.length === 0) {
    return gradeText;
  }

  const expandedGrades = gradeNumbers.flatMap((grade) => [
    `grade ${grade}`,
    `gr ${grade}`,
  ]);

  return `${gradeText} ${expandedGrades.join(" ")}`;
}

function getGradeQueryNumber(query) {
  const normalizedQuery = normalizeText(query);

  const gradeQueryMatch = normalizedQuery.match(/^(grade|gr)\s*(\d+)$/);

  if (gradeQueryMatch) {
    return Number(gradeQueryMatch[2]);
  }

  const numberOnlyMatch = normalizedQuery.match(/^\d+$/);

  if (numberOnlyMatch) {
    return Number(numberOnlyMatch[0]);
  }

  return null;
}

export function tutorMatchesQuery(tutor, query) {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return true;
  }

  const gradeQueryNumber = getGradeQueryNumber(query);

  if (gradeQueryNumber !== null) {
    return getTutorGradeNumbers(tutor.grades).includes(gradeQueryNumber);
  }

  const searchableText = normalizeText(
    [
      tutor.name,
      expandGradeRange(tutor.grades),
      tutor.location,
      ...tutor.subjects,
    ].join(" ")
  );

  return searchableText.includes(normalizedQuery);
}