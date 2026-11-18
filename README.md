# UIL Phase 2.1 — List Capture Module

Temporary public staging repository for building and testing a standalone LinkedIn-style result-list capture module. This repository is deliberately independent of any production workspace. It contains no credentials, live endpoints, private source, browser extension package, or user data.

## Objective

Given a bounded visible result-list payload, return one faithful record for each actual result card. Preserve card-level text and fields without turning mutual-connection lines, nested snippets, navigation labels, or sidebar text into separate people records.

The module must be developed as a pure, deterministic component first:

```text
fixture or Bridge result payload → ListCaptureModule → canonical JSON
```

## Read first

1. [`SPEC.md`](./SPEC.md) — requirements, input/output contract, identity and safety rules.
2. [`QUESTIONS.md`](./QUESTIONS.md) — questions to resolve before changing the contract.
3. [`fixtures/list-basic.html`](./fixtures/list-basic.html) — synthetic example only.
4. [`test/list-capture.test.mjs`](./test/list-capture.test.mjs) — acceptance expectations.

## Integration target

The finished module will eventually be adapted into an existing browser research Work Module. The host adapter must provide bounded visible card boundaries; this repository must not add browser automation, credential handling, crawling, retries, or write actions.

Expected host boundary:

```js
const result = captureList({
  cards: boundedVisibleCards,
  limit: 10,
  source: 'linkedin-list'
});
```

## Temporary staging lifecycle

This is a public build-and-review repository. After the module is verified, the implementation and reviewed tests will be migrated into the main Work Module, the integration evidence will be recorded, and this repository may be archived or deleted.
