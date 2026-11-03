---
article_id: article_00000000-0000-4000-8000-000000000000
title: "First article"
slug: first-article
category: your-category
level: beginner
reading_order: 1
summary: "Two to four sentences on what the reader will understand by the end."
tags:
  - first-tag
content_hash: sha256:0000000000000000000000000000000000000000000000000000000000000000
classification_version: 1
classification_batch: 0
---
## The question this article answers

Open with a concrete problem the reader can recognise. Replace `article_id` with a fresh
`article_<uuid>`, `category` with one of your series' categories, and leave `content_hash` as
it is: `node tools/series/sync-series-hashes.cjs --series=<key> --write` fills it in.

The body starts with an H2, never an H1: the title comes from the frontmatter. The content checker
also wants at least one figure, one to three self-check boxes, and a "what comes next" section
right before the bibliography, as below. The section names are the series' own (here the AI
series' Turkish ones); change them in `tools/series/check-series-content.cjs` if yours differ.

![A figure's alt text states the figure's claim, so a reader who cannot see it gets the same point](assets/first-figure.svg "Şekil 1 — What the figure shows")

Şekil 1 is referred to by its number in the prose, as here: the figure supports the text, it
does not replace it.

> **Kendini yokla:** A question the reader should be able to answer after this section?

### Sırada ne var

One or two sentences on what the next article builds on this one.

## Kaynakça

- Author (Year). *Title*. Venue. [Link](https://example.org)
