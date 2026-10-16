// Where Google Analytics waits for the visitor's consent: the EEA (the EU
// plus Iceland, Liechtenstein and Norway), the UK and Switzerland. Kept apart
// from analytics.js so middleware.js, which runs on the edge, imports only
// this list.
export const consentCountries = [
  ...["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR"],
  ...["HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK"],
  ...["SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH"],
];

// Set by middleware.js to "eu" inside that region and "other" outside it.
export const regionCookie = "consent-region";
