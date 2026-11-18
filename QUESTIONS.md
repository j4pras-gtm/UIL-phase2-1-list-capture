# Questions for the implementing Manus session

Ask the supervising user before changing the contract if any answer is unclear.

1. Is the host adapter providing structured card boundaries, HTML, or both?
2. Which profile URL shapes should be treated as canonical for the target site?
3. Should raw visible text preserve whitespace exactly or use a normalized copy plus an exact field?
4. Which fields are required for acceptance besides a profile URL and card boundary?
5. Should duplicate cards prefer the first card, the longest raw text, or the most complete field set?
6. What exact diagnostic event shape does the host Work Module expect?
7. Is the batch limit always 10, or should the module accept another bounded limit for tests?
8. Are there reviewed anonymized fixtures available beyond the synthetic fixture in this repository?

Do not resolve these questions by adding broad selectors, scraping unrelated page text, or weakening the identity rules.
