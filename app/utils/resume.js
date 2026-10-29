// The hero's "Download resume" link. middleware.js answers it with the file
// for the visitor's language. Japanese visitors get the 履歴書 and the
// 職務経歴書 in one zip, since one click can download only one file.
export const resumePath = "/download/resume";

export const resumeFiles = {
  en: "/BHONE AUNG KYAW - Resume.pdf",
  ja: "/ボン_アウン_チョー_応募書類.zip",
};

// The browser's first language decides, so a recruiter in Japan who reads
// English gets the English resume. The country counts only when there's no
// Accept-Language header.
export function resumeLanguage(acceptLanguage, country) {
  if (!acceptLanguage) return country === "JP" ? "ja" : "en";
  return /^\s*ja\b/i.test(acceptLanguage) ? "ja" : "en";
}
