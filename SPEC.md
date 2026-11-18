# Phase 2.1 List Capture Specification

## Goal

Build a deterministic parser/normalizer that represents the visible data of each result card faithfully and returns at most 10 canonical profile records per explicit batch.

## Non-goals

- No LinkedIn login, cookies, API calls, or private endpoints.
- No browser navigation or DOM automation in this module.
- No infinite scroll, pagination, background crawling, retries, or write actions.
- No fabricated values when a field is absent.
- No record created from mutual-connection text, a snippet, or a nested child node alone.

## Input contract

The module should accept bounded card boundaries from a host adapter. The preferred input is structured card data; a DOM/HTML adapter may be tested separately.

```js
{
  source: 'linkedin-list',
  cards: [
    {
      cardIndex: 0,
      profileUrl: 'https://www.linkedin.com/in/example',
      visibleText: 'Example Person\nProduct Designer\nExample Co\nNew York\n2nd\n…',
      fields: {
        name: 'Example Person',
        headline: 'Product Designer',
        company: 'Example Co',
        location: 'New York',
        connectionDegree: '2nd',
        visibleSnippet: '…'
      },
      mutualConnections: ['Mutual connection text']
    }
  ],
  limit: 10
}
```

If an adapter cannot establish a profile URL or a card boundary, it must return diagnostic evidence rather than guess a person record.

## Output contract

```json
{
  "schemaVersion": "1.0",
  "source": "linkedin-list",
  "captureScope": "visible-result-cards",
  "records": [
    {
      "profileUrl": "https://www.linkedin.com/in/example",
      "name": "Example Person",
      "headline": "Product Designer",
      "company": "Example Co",
      "location": "New York",
      "connectionDegree": "2nd",
      "mutualConnections": ["Mutual connection text"],
      "visibleSnippet": "…",
      "rawCardText": "Example Person\nProduct Designer\n…",
      "sourceCardIndex": 0,
      "missingFields": []
    }
  ],
  "recordCount": 1,
  "truncated": false,
  "diagnostics": {
    "cardsSeen": 1,
    "cardsAccepted": 1,
    "duplicatesRemoved": 0,
    "rejectedWithoutProfileUrl": 0,
    "rejectedWithoutCardBoundary": 0
  }
}
```

## Identity and fidelity rules

1. Normalize profile URLs for identity: remove tracking/query/hash noise, normalize trailing slash, and preserve the canonical profile path.
2. One accepted profile URL equals one record per batch.
3. Preserve raw visible card text in `rawCardText`.
4. Preserve mutual connections as a nested field or evidence field; never emit them as records.
5. Keep missing data empty or list it in `missingFields`; never infer it from unrelated text.
6. Deduplicate by normalized profile URL while retaining the first complete card and recording the duplicate count.
7. Enforce the requested limit; set `truncated` when eligible cards exceed it.
8. Keep field parsing tolerant, but make acceptance strict: no profile URL or no card boundary means no person record.

## Required tests

- Basic card produces exactly one record.
- Ten cards produce ten records.
- Eleven eligible cards produce ten records and `truncated: true`.
- Duplicate profile URLs produce one record and increment `duplicatesRemoved`.
- Mutual-connection lines remain nested and never become records.
- Navigation/sidebar text is ignored when it is outside card boundaries.
- Missing fields are explicit.
- Tracking parameters do not create duplicate identities.
- A malformed card produces a redacted diagnostic/rejection, not a fabricated record.
- Raw card text is preserved.

## Integration handoff

The host Work Module should call this module after the Bridge/adapter has completed its bounded visible read. The renderer should receive only the returned canonical JSON. No Shell policy, Auth policy, AI policy, or browser permission changes belong in this repository.
