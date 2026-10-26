# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-10-26T06:25:06.879Z
> Files: 252 tracked | Anatomy hits: 0 | Misses: 0

## ../../Users/ANIL~1.AKM/AppData/Local/Temp/claude/C--dev-anil-lib/b2ff9965-4841-407d-911f-80e83f3a9f4b/scratchpad/

- `arastirma-run5.md` — 21. Run 5 kaynak kanalları ve tuzaklar (2026-10-26) (~4137 tok)
- `avail.py` (~270 tok)
- `h2t.py` — P: handle_starttag, handle_endtag, handle_startendtag, handle_data (~889 tok)
- `html2txt.py` — P: handle_starttag, handle_endtag, handle_data, main (~599 tok)
- `restperm.py` — text (~409 tok)

## ../../Users/ANIL~1.AKM/AppData/Local/Temp/claude/C--dev-anil-lib/e6106818-ba07-4599-83c4-cae30bc2a6dc/scratchpad/

- `bib.py` — /*.md", recursive=True)): (~975 tok)
- `measure.mjs` — DOM measurement for changed series pages: 3 widths x 3 themes. (~984 tok)

## ../../Users/ANIL~1.AKM/AppData/Local/Temp/claude/C--dev-anil-lib/e6106818-ba07-4599-83c4-cae30bc2a6dc/scratchpad/borc_bcf/

- `author_pass.py` — Second pass: first-author surname + title token overlap against a proceedings list. (~543 tok)
- `fetch.py` — Fetch a URL into the dl/ folder (untrusted data). Usage: python -I fetch.py <url> <outname> (~425 tok)
- `match_nips_downloads.py` — norm (~432 tok)
- `parse_colm.py` — norm (~624 tok)
- `parse_pmlr.py` — norm (~838 tok)
- `pdftext.py` — Crude PDF text extraction (FlateDecode + Tj/TJ). Usage: python -I pdftext.py <pdf> <out.txt> [maxstr (~506 tok)
- `results.json` (~6610 tok)
- `select.py` (~293 tok)

## ../../Users/ANIL~1.AKM/AppData/Local/Temp/claude/C--dev-anil-lib/e6106818-ba07-4599-83c4-cae30bc2a6dc/scratchpad/crossref_rel/

- `analyze.py` — Analyse sweep.jsonl: update relations, title/author/year mismatches, nonexistent DOIs. (~1921 tok)
- `authors.py` — Compare kunye author lists with Crossref author lists (family names, count, order). (~930 tok)
- `build_results.py` (~6564 tok)
- `dois.py` — Collect every DOI from bib.json (links re-parsed from raw so nested parentheses survive). (~881 tok)
- `epmc_sweep.py` — Second channel: Europe PMC commentCorrection list for every DOI (resumable). (~614 tok)
- `epmc.py` — Europe PMC: find a DOI's record (PMID/PMCID), print abstract and full text (if open). (~560 tok)
- `extra.py` — Extra: kunyes whose publisher link carries no DOI -> look the DOI up in Crossref by title, read upda (~811 tok)
- `handles.py` — doi.org handle API for every DOI (existence + resolving URL); resumable. (~524 tok)
- `notices.py` — Fetch Crossref records of every update notice found in analysis.json (sequential, 1 req/s). (~643 tok)
- `survey.py` (~300 tok)
- `sweep.py` — Resumable Crossref sweep: /works/<doi> + /works?filter=updates:<doi>; 404 -> doi.org handle API (+ D (~1369 tok)

## ../../Users/ANIL~1.AKM/AppData/Local/Temp/claude/C--dev-anil-lib/e6106818-ba07-4599-83c4-cae30bc2a6dc/scratchpad/dogrula-r3-x7/

- `check_edits.py` (~185 tok)
- `cr.py` — get, brief (~661 tok)
- `fetch.py` — fetch, summarize (~703 tok)
- `results_full.json` — Declares journal (~14596 tok)
- `results.json` (~1050 tok)

## ../../Users/ANIL~1.AKM/AppData/Local/Temp/claude/C--dev-anil-lib/e6106818-ba07-4599-83c4-cae30bc2a6dc/scratchpad/dogrula-r3x/scripts/

- `build.py` — E (~15059 tok)
- `cr.py` — auth, show (~507 tok)
- `ctx.py` (~204 tok)
- `fetch.py` (~518 tok)
- `meta.py` (~130 tok)
- `urls_arxiv.txt` (~53 tok)
- `urls_cost.txt` (~182 tok)
- `urls_crossref.txt` (~277 tok)
- `urls_pdf.txt` (~129 tok)
- `urls_web.txt` (~409 tok)
- `urls_web2.txt` (~110 tok)

## ../../Users/ANIL~1.AKM/AppData/Local/Temp/claude/C--dev-anil-lib/e6106818-ba07-4599-83c4-cae30bc2a6dc/scratchpad/dogrula-v3/

- `arx.py` (~373 tok)
- `build_results.py` — R (~9293 tok)
- `colm.py` (~349 tok)
- `colm2.py` (~473 tok)
- `dumps.py` (~416 tok)
- `edits_check.py` (~4619 tok)
- `getpdf.py` (~281 tok)
- `govai.py` (~270 tok)
- `llama.py` — title (~503 tok)
- `net.py` — NoRedir: fetch, redirect_request (~705 tok)
- `pages.py` — meta, title (~740 tok)
- `xref.py` (~685 tok)

## ../../Users/ANIL~1.AKM/AppData/Local/Temp/claude/C--dev-anil-lib/e6106818-ba07-4599-83c4-cae30bc2a6dc/scratchpad/kabul1/

- `acl_parse.py` — Parse anthology.bib.gz into a compact JSONL of (key, title, authors, booktitle/journal, year, url, d (~576 tok)
- `aclcheck.py` — ACL-family labels vs Anthology: find same-title record; compare venue family (main/findings/workshop (~731 tok)
- `analyze.py` — venue_tokens (~531 tok)
- `arxiv_api.py` — Query export.arxiv.org for every arXiv id in bib.json (40 per call, 3 s apart). Resumable: arxiv.jso (~717 tok)
- `arxiv_report.py` (~439 tok)
- `authcmp.py` — Compare bib author surname sequence with the official list record (exact title matches only). (~789 tok)
- `author_pass.py` — Author-only pass: for non-peer-reviewed bib entries, list records (2024+) sharing first author + >=2 (~815 tok)
- `build_lists.py` — Parse every downloaded acceptance list into lists.jsonl: {src, venue, year, title, authors[], url, e (~2955 tok)
- `build_results.py` — Assemble results.json for the StructuredOutput (data in findings_data.json + coverage_data.json). (~262 tok)
- `cands.py` (~573 tok)
- `candset.py` (~612 tok)
- `coverage_data.json` — 64 dosya, docs/seri-boun, docs/seri-guvenlik, content/series-guvenlik altında yeni klasörler, .wolf/ (~3124 tok)
- `crossref_dois.py` (~356 tok)
- `crossref_report.py` — norm (~350 tok)
- `crossref_title.py` — Crossref bibliographic search for non-peer-reviewed bib entries (journal/proceedings versions). Sequ (~875 tok)
- `explore.py` (~216 tok)
- `fetch_many.py` — fetch_many.py LISTFILE : each line 'url outname'; skips existing nonempty files; logs to fetchlog.js (~356 tok)
- `fetch.py` — fetch.py URL OUTPATH [--head] : download with browser-like UA, print status/size/final url. (~434 tok)
- `findings_data.json` (~9882 tok)
- `inspect_json.py` (~202 tok)
- `labelcheck.py` — Systematic reverse check: every bib entry labelled with a venue+year we hold a full list for must ap (~1019 tok)
- `list1.txt` (~329 tok)
- `list2.txt` (~121 tok)
- `list3.txt` (~130 tok)
- `match.py` — Match every bib entry against lists.jsonl (run-2 method). Output matches.jsonl. (~1605 tok)
- `openalex26.py` — OpenAlex fallback for the arXiv ids Semantic Scholar did not return: list every location/source of t (~380 tok)
- `orcheck.py` — Map every OpenReview forum id in bib.json to the official dumps/lists; compare label (venue family/y (~810 tok)
- `pdfhead.py` — Crude first-page text from a PDF (Flate streams, TJ/Tj strings). Usage: pdfhead.py file.pdf [nstream (~241 tok)
- `peercheck.py` — Reverse check: peer-labelled bib entries vs strong list matches (venue family / year / track). (~1660 tok)
- `s2_batch.py` — Semantic Scholar paper/batch for every arXiv id (small batches, backoff on 429). Resumable: s2.jsonl (~452 tok)
- `s2_report.py` (~510 tok)
- `titlediff.py` — For peer-labelled entries: same-venue/year list record with first-author hit but different title -> (~528 tok)

## ../../Users/ANIL~1.AKM/AppData/Local/Temp/claude/C--dev-anil-lib/e6106818-ba07-4599-83c4-cae30bc2a6dc/scratchpad/linkcheck/

- `alt_channels.py` — Alternative official channels for walled / unreachable targets: doi.org handles, NCBI E-utilities, W (~1006 tok)
- `arxiv_q.py` — Query export.arxiv.org for every arXiv id in batches of 40 (3 s gap). Resumable. (~878 tok)
- `arxiv_report.py` (~425 tok)
- `arxiv_title.py` — arXiv API title search for a few works, printing author lists (3 s between calls). (~378 tok)
- `author_check.py` — Compare bibliography author lists with the target page's author list (citation_author / arXiv). (~891 tok)
- `author_detail.py` (~261 tok)
- `build_results.py` — Assemble results.json (findings + coverage) for the link-target layer. (~9323 tok)
- `common.py` — Shared helpers for the link-target check (read-only over the repo). (~834 tok)
- `doi_check.py` — Existence check for every DOI via doi.org/api/handles (responseCode 1 = exists, 100 = not found). Re (~560 tok)
- `dupes.py` — Same work (normalized title) linked under different identities across the series. (~739 tok)
- `links.py` — Build the unique-URL table with categories. (~720 tok)
- `name_in_page.py` — Fetch pages and report whether given surnames occur anywhere in the body (visible text or PDF first (~709 tok)
- `net.py` — HTTP fetch helper: status, final URL, title, PDF first lines. (~2296 tok)
- `or_check.py` — Verify OpenReview ids against conference dumps and lists (no openreview.net access). (~1422 tok)
- `or_fetch.py` — Download conference dumps / lists used to verify OpenReview ids (to ../linkcheck_src/). (~395 tok)
- `pdfgrep.py` — pdfgrep.py <url> [first_page last_page] [regex] : run pdftotext on the cached download of url. (~287 tok)
- `pmlr306.py` — Match ICML 2026 items against the new PMLR v306 index. (~709 tok)
- `retry.py` — Retry selected URLs (urllib then curl). Usage: retry.py [--curl] url1 url2 ... | retry.py --auto (~469 tok)
- `sweep_web.py` — Fetch every non-DOI, non-arXiv, non-OpenReview link once (resumable). Per-host serial, 1.2 s gap. (~459 tok)
- `web_report.py` — Compare fetched page titles with bibliography titles; flag suspects. (~764 tok)
- `write_results.py` — sayfalar, sayfadaki (~2464 tok)

## ../../Users/ANIL~1.AKM/AppData/Local/Temp/claude/C--dev-anil-lib/e6106818-ba07-4599-83c4-cae30bc2a6dc/scratchpad/verify3/

- `arxiv_parse.py` (~286 tok)
- `dryrun.py` (~224 tok)
- `fetch.py` — NoRedirect: redirect_request, fetch (~696 tok)
- `results.json` (~12278 tok)

## ../../Users/ANIL~1.AKM/AppData/Local/Temp/claude/C--dev-anil-lib/e6106818-ba07-4599-83c4-cae30bc2a6dc/scratchpad/verify_bulgu_b/

- `crossref.py` — Crossref lookups, 1 req/s sequential. Usage: python -I crossref.py <doi> [<doi> ...] (~492 tok)
- `fetch.py` — fetch, save (~497 tok)
- `grephtml.py` — Grep an HTML file (tags kept) for a needle and print raw context. Usage: python -I grephtml.py <file (~177 tok)
- `insp_cooper.py` — txt (~449 tok)
- `pdftext.py` — Minimal PDF text grep: decompress Flate streams and pull text from TJ/Tj operators. (~547 tok)
- `qdump.py` — Query a conference orals-posters dump. Usage: python -I qdump.py <dumpfile> <field> <needle> (~255 tok)

## ../anil-lib-bakim3-render/bakim3-render/

- `common.mjs` — Logs in once (Server Action form) and stores the session; reuses it if still valid. (~1290 tok)
- `cta-contrast.mjs` — Compares the landing CTA (bg-accent text-white, pre-existing) with the reset confirm button. (~464 tok)
- `dp-gap.mjs` — Article 22, agirlikli-aralik-dp-tablosu.svg: real ink extents of the table columns (rows y >= 250), (~1114 tok)
- `fig-shot.mjs` — Seçilen makalelerdeki seçilen şekillerin light/dark ekran görüntüsü (bakım run 3 doğrulaması). (~437 tok)
- `geometry.mjs` — BOUN real-render geometry gate (maintenance run 3, 2026-10-26). (~6497 tok)
- `ink-boxes.mjs` — Prints ink boxes (10x canvas metrics) of the text runs of one SVG whose y lies in a range. (~550 tok)
- `pageerror-probe.mjs` — Bir sayfayı taze bağlamlarla N kez açıp pageerror ve 4xx/5xx yanıtları toplar (gezici hata ayrımı). (~320 tok)
- `probe.mjs` — Declares browser (~644 tok)
- `probe2.mjs` — Method check: list text runs whose SVG advance differs from canvas width, or whose (~506 tok)
- `themes.mjs` — BOUN real-render theme gate (maintenance run 3, 2026-10-26). (~5416 tok)
- `w375.mjs` — Rendered figure widths and effective 13-unit label size per viewport width (article 23 + global min) (~336 tok)
- `zoom.mjs` — Zoomed visual confirmation of geometry.mjs "metin-çizgi" candidates (text ink box entered by a strok (~805 tok)

## ../anil-lib-ux/artifacts/ux/


## ./


## .agents/skills/handoff/


## .claude/

- `launch.json` (~59 tok)

## .claude/rules/


## 2026-10-05 — Manual series progress reset


## 2026-10-21 — Güven Sınırı serisi (üçüncü seri) giriş haritası


## 2026-10-21 — OWASP serisi bağlam aktarımı için keşfedilen kaynaklar


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/03ccb4c3-d4f7-4d0a-86f1-65d9cd447984/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/10e08d09-4faa-414b-b0b8-7bae72876fb0/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/10e08d09-4faa-414b-b0b8-7bae72876fb0/scratchpad/verify/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/219dba1e-e9ce-4e11-a1cc-2c97c171f067/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/27096232-ef5b-4abb-acff-1fb931791f16/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/27bd5fa2-b8ca-4f57-943a-a287c0666b07/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/27bd5fa2-b8ca-4f57-943a-a287c0666b07/scratchpad/wf/debt-venue/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/27bd5fa2-b8ca-4f57-943a-a287c0666b07/scratchpad/wf/num-1/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/27bd5fa2-b8ca-4f57-943a-a287c0666b07/scratchpad/wf/num-2/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/27bd5fa2-b8ca-4f57-943a-a287c0666b07/scratchpad/wf/num-3/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/27bd5fa2-b8ca-4f57-943a-a287c0666b07/scratchpad/wf/num-4/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/27bd5fa2-b8ca-4f57-943a-a287c0666b07/scratchpad/wf/sweep-1/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/27bd5fa2-b8ca-4f57-943a-a287c0666b07/scratchpad/wf/sweep-2/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/27bd5fa2-b8ca-4f57-943a-a287c0666b07/scratchpad/wf/sweep-3/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/27bd5fa2-b8ca-4f57-943a-a287c0666b07/scratchpad/wf/sweep-4/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/27bd5fa2-b8ca-4f57-943a-a287c0666b07/scratchpad/wf/sweep-5/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/27bd5fa2-b8ca-4f57-943a-a287c0666b07/scratchpad/wf2/check-1/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/27bd5fa2-b8ca-4f57-943a-a287c0666b07/scratchpad/wf2/check-2/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/27bd5fa2-b8ca-4f57-943a-a287c0666b07/scratchpad/wf2/check-3/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/27bd5fa2-b8ca-4f57-943a-a287c0666b07/scratchpad/wf2/check-3/run/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/27bd5fa2-b8ca-4f57-943a-a287c0666b07/scratchpad/wf2/check-4/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/32dd4f14-333e-4d01-961e-edfc8de89f77/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/3646e9e5-8f9a-4078-abf2-b7b3cb24ea42/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/3cecdbbb-0489-4226-8bc3-856d8edbe563/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/3cecdbbb-0489-4226-8bc3-856d8edbe563/scratchpad/research/a115-recall/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/3cecdbbb-0489-4226-8bc3-856d8edbe563/scratchpad/research/a115-sources/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/3cecdbbb-0489-4226-8bc3-856d8edbe563/scratchpad/research/a116-recall/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/3cecdbbb-0489-4226-8bc3-856d8edbe563/scratchpad/research/a116-sources/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/3cecdbbb-0489-4226-8bc3-856d8edbe563/scratchpad/research/a117/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/3cecdbbb-0489-4226-8bc3-856d8edbe563/scratchpad/research/a118/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/3cecdbbb-0489-4226-8bc3-856d8edbe563/scratchpad/tools/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/3cecdbbb-0489-4226-8bc3-856d8edbe563/scratchpad/verify/v115/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/3cecdbbb-0489-4226-8bc3-856d8edbe563/scratchpad/verify/v116/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/3cecdbbb-0489-4226-8bc3-856d8edbe563/scratchpad/verify/v117/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/3cecdbbb-0489-4226-8bc3-856d8edbe563/scratchpad/verify/v118/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/3f16d1e2-9271-46e4-851e-b522326f9e03/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/43aeecde-fc24-42a9-9acd-9370f13cf189/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/46105a02-dc62-4c76-a799-b816a68efa70/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/47dcc4fc-d5cd-487c-895e-0d8b267108b0/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/522e37d9-4ffd-482b-8b8c-534fe85ea064/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/56038114-cd40-448d-9567-155d5700d427/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/584e3279-ea3e-4479-a104-d1d51b11b572/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/5eac0600-2634-4f13-801b-0ca9aaa90b5b/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/627b540f-da13-4dd2-a8b5-be70b0c01ea5/scratchpad/b6/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/686dd6a6-3819-46c8-adc3-5dacf57eba08/scratchpad/boun-b4/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/6fd2322f-ef99-4384-b741-7749808004d2/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/789ba616-f817-46a6-8065-e9ce7f20ec03/scratchpad/b8/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/791bd47e-e985-4412-bcb6-24c47570592c/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/7ed3753d-c162-4d6b-89e2-8af119d9a92c/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/84c91739-9a4e-465b-bec5-b770bfc86161/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/883cb5bb-ed11-4944-95dd-d2b9ffa4d5d2/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/88e0b871-f830-4719-9c89-428d4f7c391f/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/890ea0df-91db-4bff-be3d-02f55153d8ba/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/8d7d5be6-3b1e-4d25-a92b-79b189509d45/scratchpad/b8/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/90ecd7c5-a165-40b0-84d8-19360e7af4d4/scratchpad/links/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/90ecd7c5-a165-40b0-84d8-19360e7af4d4/scratchpad/official/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/90ecd7c5-a165-40b0-84d8-19360e7af4d4/scratchpad/wf/alt-svg/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/90ecd7c5-a165-40b0-84d8-19360e7af4d4/scratchpad/wf/kume-b/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/90ecd7c5-a165-40b0-84d8-19360e7af4d4/scratchpad/wf/kume-c/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/90ecd7c5-a165-40b0-84d8-19360e7af4d4/scratchpad/wf/kumeA/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/90ecd7c5-a165-40b0-84d8-19360e7af4d4/scratchpad/wf/repro/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/90ecd7c5-a165-40b0-84d8-19360e7af4d4/scratchpad/wf/skeptic-ab/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/90ecd7c5-a165-40b0-84d8-19360e7af4d4/scratchpad/wf/skeptic-cd/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/93fb4c2a-83ad-45ed-bdc2-fb6de97973a6/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/964ae327-139d-46c2-bd32-7dcaea27accd/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/9c68700c-4168-4b93-8b88-e7b6f013eca8/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/9cbe8f91-842f-4dfc-a7b1-98ad23791177/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/a66dbd48-5c70-496b-96ea-65ab9809399c/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/b3287c97-e0f7-480d-9e39-6d39ce7d1b0f/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/b357d561-7929-47e4-928c-fb5b661508db/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/b60faeed-d52e-439a-ae92-4a123388a76a/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/c5fcd13f-0c50-4b18-b590-de2f6b97beb4/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/d2bfc8ef-93ea-4a8a-85d8-43073b9287ca/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/db92c409-5e48-4a44-a062-40622d4ed8bd/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/e1f45040-c729-4235-a0ae-6df2a28aa30d/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/e5a4fc87-3a97-4eb4-afe8-9681d9da07ff/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/ea96cadd-5e00-4a54-a697-5ebfd7134545/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/ebba4b56-a033-4853-a901-94ae0b1891f9/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/edd1cce2-097e-4338-ad72-8698dcf742a0/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/f2ac87b9-3efa-45c5-922b-f666ba7317ce/scratchpad/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/f2ac87b9-3efa-45c5-922b-f666ba7317ce/scratchpad/fh/


## C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/fc263103-4f75-4d36-bd76-58c81eaf86df/scratchpad/


## C:/Users/anil.akman/.claude/projects/D--dev-anil-lib/memory/


## C:/Users/anil.akman/AppData/Local/Temp/claude/D--dev-anil-lib/2b44744a-95c9-4284-8b91-bf366f98f51c/scratchpad/src/


## C:/Users/anil.akman/AppData/Local/Temp/claude/D--dev-anil-lib/bf073ece-266e-4e44-b980-230c04471820/scratchpad/


## C:/Users/anil.akman/AppData/Local/Temp/claude/D--dev-anil-lib/eec20059-3b22-4975-b9af-f7cf476b7f59/scratchpad/


## Nokta atışı devam etme (2026-09-02)


## Session navigation additions (2026-10-05)


## Yeni içerik/yardımcılar (2026-09-02)


## artifacts/b10-render/


## artifacts/b10-research/


## artifacts/b11-research/


## artifacts/b12-research/


## artifacts/b13-research/


## artifacts/b14-bakim/


## artifacts/b14-research/


## artifacts/b15-research/


## artifacts/b16-research/


## artifacts/b17-research/


## artifacts/b18-research/


## artifacts/b19-research/


## artifacts/b20-research/


## artifacts/b22-research/


## artifacts/b7-render/


## artifacts/b8-render/


## artifacts/b9-research/


## artifacts/bakim2-2026-09-25/


## artifacts/bakim2-2026-09-26/


## artifacts/bakim2-2026-09-26/ana/


## artifacts/bakim2-2026-09-26/durum-sayilari/


## artifacts/bakim2-2026-09-26/k4-isletim-1/


## artifacts/bakim2-2026-09-26/linkler/


## artifacts/bakim2-2026-09-26/resmi/


## artifacts/bakim3-2026-10-26/ana/

- `arastirma_yaz.py` — ARASTIRMA.md: başlık paragrafını güncelle ve §21'i sona ekle (CRLF korunur). (~289 tok)
- `arastirma-21.md` — 21. Bakım run'ı 3'te doğrulanan kaynaklar ve düzeltmeler (2026-10-26) (~3493 tok)
- `etiket_kaydir.py` — Kenar çizgisine binen kısa etiketler için gereken yatay kaydırmayı hesaplar. (~703 tok)
- `filozof_model.py` — Makale 30'un filozof modellerini sayar: her filozof 0 = ilk çatalı bekliyor/düşünüyor, (~500 tok)
- `handoff_yaz.py` — HANDOFF.md'yi run 3 için günceller (CRLF korunur). (~952 tok)
- `handoff-bakim.md` — Bundan sonrası: bakım (~942 tok)
- `handoff-borclar.md` — Açık borçlar (2026-10-26 bakım run'ı 3'ten sonra) (~538 tok)
- `handoff-dogrulama.md` — Bu run'da doğrulananlar (bakım run'ı 3, 2026-10-26) (~618 tok)
- `handoff-run3.md` — Bakım run'ı 3'te ne yapıldı (2026-10-26) (~869 tok)
- `handoff-sorunlar.md` (~668 tok)
- `kilit_model.py` — Makale 31'in iki kilitli modelini bırakma sırasına göre sayar (ana oturumun bağımsız hesabı). (~430 tok)
- `kontrast_kayit.py` — Koyu tema kontrast düzeltmesinin kayıtları: HANDOFF, ARASTIRMA §21.4, OpenWolf. (~1642 tok)
- `wolf_yaz.py` — OpenWolf kayıtları: buglog (yeni girdiler), cerebrum (öğrenimler, tekrar etme, karar), memory satırl (~2809 tok)

## artifacts/bakim3-2026-10-26/denetim/

- `denetim.py` — -*- coding: utf-8 -*- (~14090 tok)
- `selftest.py` — -*- coding: utf-8 -*- (~1866 tok)

## artifacts/bakim3-2026-10-26/dogrulama/

- `birlestir.py` — Bulgular + şüpheci hükümlerini birleştirir, kısa tablo basar. (~408 tok)

## artifacts/bakim3-2026-10-26/dogrulama/k1/

- `alinti_denetle.py` — k1 bulgularının alıntılarını ve yayılım alıntılarını dosyada birebir arar; gövde kelime sayısını yaz (~1264 tok)
- `dogum_gunu.py` — k1-15: 27 kişide doğum günü çakışma olasılığının tam değeri (kesirli aritmetikle). (~261 tok)
- `pdf_ara.py` — Bir PDF'in metnini çıkarıp verilen düzenli ifadelerin çevresini yazar. (~218 tok)
- `uyari_acilislari.py` — BOUN korpusunda paragraf başında 'uyarı' etiketiyle açılan satırları listeler (k1-07 yayılımı). (~183 tok)

## artifacts/bakim3-2026-10-26/dogrulama/k2/

- `alinti_denetim.py` — k2: bulgu alintilari ve yayilim alintilari dosyada birebir (ve tek) geciyor mu? (~1692 tok)
- `ezber_kapanis.py` — Ezber kapanisi varyantlarinin paragraf sonu olup olmadigini ve son iki cumlesini yazdirir. (~428 tok)
- `hesap_dogrulama_k2.py` — k2 kumesi icin bagimsiz hesaplar (dogrulayici, 2026-10-26). (~1623 tok)
- `kelime_say.py` — k2 makalelerinin duzyazi kelime sayisi (check-series-content.cjs mantiginin Python esi). (~336 tok)
- `pdf_metin.py` — Basit PDF metin cikarici: FlateDecode akislarini acar, Tj/TJ metnini toplar. (~434 tok)
- `svg_parse.py` — k2 dogrulama: BOUN SVG'lerinin hepsini XML olarak ayristir. (~135 tok)

## artifacts/bakim3-2026-10-26/dogrulama/k3/

- `k3_hesap.py` — k3 kümesi bağımsız doğrulama hesapları (bakım 3, 2026-10-26) (~798 tok)
- `k3_svg_xml.py` — k3-18: BOUN SVG'lerinin XML iyi biçimliliği (bağımsız tarama) (~153 tok)
- `k3_uygula_kontrol.py` — k3: önerilen son düzeltmeleri ve yayılım değişikliklerini BELLEKTE uygular (diske yazmaz); (~3954 tok)

## artifacts/bakim3-2026-10-26/dogrulama/k4/

- `k4_metin_kontrol.py` — k4: alt metin kelime sayısı ve önerilen metinlerin dosyada birebir bulunduğunun denetimi. (~779 tok)
- `k4_skeptik.py` — k4 kümesi şüpheci doğrulaması — bağımsız hesaplar (denetçinin betikleri kullanılmadı). (~1836 tok)

## artifacts/bakim3-2026-10-26/dogrulama/k5/

- `k5_3sat_bagimsiz_kume.py` — k5-12 bağımsız doğrulama: 3SAT -> bağımsız küme indirgemesi. (~758 tok)
- `k5_bellman_ford.py` — k5-02 / k5-03 bağımsız doğrulama (skeptik). (~888 tok)
- `k5_kelime_bandi.py` — check-series-content.cjs countProseWords mantığının Python taklidi; düzeltme öncesi/sonrası bant den (~1728 tok)
- `k5_sayilar.py` — k5-04 / k5-05 / k5-06 / k5-18 bağımsız sayısal denetimler. (~316 tok)

## artifacts/bakim3-2026-10-26/dogrulama/k6/

- `alinti_kontrol.py` — verify that each k6 finding quote and each propagation quote occurs verbatim in its file (~714 tok)
- `k6_dogrulama.py` — k6 skeptic verification script (independent of the auditor's scripts) (~1410 tok)

## artifacts/bakim3-2026-10-26/dogrulama/k7/

- `k7_alt_sayim.py` — k7-04 ve k7-17 alt metin kelime sayımı (düzeltme öncesi/sonrası) ve alıntı eşleşmesi. (~401 tok)
- `k7_dogrulama.py` — k7 kümesi için bağımsız sayısal doğrulama (denetçinin betikleri kullanılmadı). (~1340 tok)

## artifacts/bakim3-2026-10-26/dogrulama/k8/

- `alinti_k8.py` — k8: bulguların alıntıları dosyada birebir geçiyor mu, hangi satırda, kaç kez (~1282 tok)
- `kelime_k8.py` — k8: dört makalenin düzyazı kelime sayısı (denetleyicinin kuralına benzer kendi sayımım) (~314 tok)
- `sayim_k8.py` — k8 skeptik doğrulama: omurga/kutu sayımı, heap yüksekliği, kapı derinliği (~552 tok)

## artifacts/bakim3-2026-10-26/fark/g1-6/

- `dogum_gunu.py` (~86 tok)

## artifacts/bakim3-2026-10-26/fark/g15-20/

- `asimptotik.py` — crossing of log2 n and n^0.1 (large root) (~111 tok)
- `medyan.py` — make, solve, T (~188 tok)

## artifacts/bakim3-2026-10-26/fark/g21-25/

- `kontrol.py` — f, comp, bf (~1133 tok)

## artifacts/bakim3-2026-10-26/fark/g26-33/

- `durumlar.py` — Bakim 3 fark denetimi, grup 26-33: durum sayilarini yeniden hesapla. (~1007 tok)

## artifacts/bakim3-2026-10-26/fark/g34-41/

- `alt_words.py` — g34-41: count words in changed alt texts and figure titles; check title punctuation and note lengths (~654 tok)
- `svg-measure.mjs` — g34-41 fresh-eyes check: measure text extents of changed SVGs (working tree + HEAD) with Inter 420. (~652 tok)

## artifacts/bakim3-2026-10-26/fark/g7-14/

- `dogrula.py` — sim (~698 tok)

## artifacts/bakim3-2026-10-26/kapilar/

- `prerender-summary.cjs` — Summarize .next/prerender-manifest.json of a built copy. (~567 tok)
- `pw-failures.cjs` — Read a Playwright JSON report and print stats plus non-passing tests. (~519 tok)
- `run-gates.sh` — BOUN maintenance run 3 (2026-10-26) - re-runnable verification gates on an isolated copy. (~3232 tok)

## artifacts/bakim3-2026-10-26/linkler/

- `cites.py` — Dump citing Kaynakça lines per URL, and PDF page counts via pdftotext form feeds. (~632 tok)
- `crossref.py` — Query Crossref for every cited DOI (and, supplementary, DOIs of classic papers cited by URL). (~1327 tok)
- `crossref2.py` — Full Crossref work records (incl. updated-by / relation) for supplementary DOIs. (~616 tok)
- `ctx.py` — Print context snippets: python ctx.py <idx> <regex> [width] [maxhits] (~200 tok)
- `eom_watch.py` — Retry encyclopediaofmath.org every 60 s for up to 12 attempts; log to eom_watch.log. (~307 tok)
- `extract.py` — Extract every http(s) URL and DOI from BOUN series articles and SVG assets. (~1505 tok)
- `fetch.py` — Fetch every unique URL with curl (desktop Chrome UA), one retry on failure. (~975 tok)
- `final.py` — Build final TSV + results.json (one row per unique URL) from fetch.json, titles.json and manual verd (~4959 tok)
- `needles.py` — Targeted content checks: search fetched bodies (HTML stripped / pdftotext) for needles. (~1162 tok)
- `ocwpdf.py` — Resolve OCW resource pages to their PDF and print the first lines of page 1. (~514 tok)
- `ostep.py` — OSTEP: map cited 'Chapter N: Title' to the chapter PDF linked from the home page, (~807 tok)
- `qpdf.py` — Check quotes of one cite line against a set of local PDFs; report which PDF holds each quote. (~425 tok)
- `quotes.py` — Check quoted English strings in citing Kaynakça entries against the fetched source text. (~621 tok)
- `seccheck.py` — Check explicit section/definition claims against a book text (first-occurrence based, TOC-aware). (~805 tok)
- `titles.py` — Extract HTML <title> / PDF first-page lines for each fetched body. (~653 tok)
- `toccheck.py` — Check 'N.M Title' and 'N. bölüm (Title' claims in Kaynakça entries against publisher TOCs. (~638 tok)

## artifacts/bakim3-2026-10-26/olgu/

- `goster.py` — Seçilen bulguları tam metinle basar. Kullanım: goster.py onemli | goster.py k1-01 k3-04 ... (~250 tok)
- `topla.py` — Olgu denetimi workflow çıktısını tek dosyaya toplar ve kısa tablo basar. (~344 tok)

## artifacts/bakim3-2026-10-26/olgu/k1/

- `hesap_k1.py` — k1 küme (makale 1-6) sayısal iddialarının bağımsız yeniden hesabı. (~1604 tok)
- `html_text.py` — Extract visible text from downloaded official pages and print relevant passages. (~253 tok)

## artifacts/bakim3-2026-10-26/olgu/k2/

- `hesap_k2_ek.py` — k2 ek hesaplar: 2-3 ağacı seviye sınırı, AVL 10^9 yüksekliği, ikili ağaç 10^9 seviyesi (~286 tok)
- `hesap_k2.py` — k2 kümesi (makale 7–12) sayısal denetim betiği — bakım run 3, 2026-10-26 (~2262 tok)
- `pdf_metin.py` — Basit PDF metin çıkarıcı (FlateDecode akışlarındaki Tj/TJ dizgileri) — yalnız okuma amaçlı (~318 tok)

## artifacts/bakim3-2026-10-26/olgu/k3/

- `hesap.py` — k3 küme olgu denetimi — bağımsız hesaplar (13–17) (~1605 tok)

## artifacts/bakim3-2026-10-26/olgu/k4/

- `k4_hesap.py` — k4 olgu denetimi: makale 18-22 sayısal iddiaları (~2592 tok)
- `k4_medyan_oran.py` — Makale 20: grup boyutu g için garanti edilen eleme oranı ve pay toplamı (~354 tok)

## artifacts/bakim3-2026-10-26/olgu/k5/

- `bf_ornek.py` — 23: Bellman-Ford bes dugumlu ornek onerisi ve 25: 3SAT -> bagimsiz kume ornegi (~556 tok)
- `k5_hesap.py` — k5 olgu denetimi: 23-27 makalelerinin sayisal iddialarinin yeniden hesabi (~2479 tok)

## artifacts/bakim3-2026-10-26/olgu/k6/

- `filozoflar.py` — Makale 30: yemek yiyen filozoflar durum sayıları (82 / 70 / 11) için olası model. (~540 tok)
- `kilitlenme_dongu.py` — Makale 31: iki kilitli model (her iş parçacığı bir kez: al, al, bırak, bırak). (~778 tok)
- `sayilar.py` — Küme k6 (makale 28–32): makalelerin kendi tanımlarından sayıların yeniden hesabı. (~835 tok)

## artifacts/bakim3-2026-10-26/olgu/k7/

- `a33_sayfa_degistirme.py` — k7 / makale 33: sayfa degistirme izleri, Belady, dongusel is yuku, saat, AMAT (~809 tok)
- `a34_disk_inode.py` — k7 / makale 34: disk sureleri, bagli ayirma ortalamasi, inode aritmetigi, bit eslemi, erisim sayimla (~663 tok)
- `a35_a37_hesap.py` — k7 / makale 35 ve 37 hesaplari (~561 tok)
- `a36_olasilik.py` — k7 / makale 36: kesirli aritmetik ve tam hesaplar (~890 tok)

## artifacts/bakim3-2026-10-26/olgu/k8/

- `alinti_kontrol.py` — Bulgu alıntılarının dosyada birebir geçtiğini ve satır numarasını doğrular (~1220 tok)
- `hesap_k8.py` — k8 olgu denetimi — hesap betiği (makale 38, 39, 40, 41) (~828 tok)

## artifacts/bakim3-2026-10-26/resmi/

- `article_quotes.py` — /*.md"), recursive=True)) (~898 tok)
- `claims_grep.py` — /*.md"), recursive=True)) (~752 tok)
- `compare.py` — Search every ledger quote (ARASTIRMA.md §1/§10/§16/§17/§18.1/§19.1/§20.1) in the live text. (~2716 tok)
- `extract.py` — Extract plain text from the <main id=content> region of saved CmpE pages. (~897 tok)
- `fields.py` — Tabulate course-page fields and curriculum rows; run absence checks. (~787 tok)
- `unrecorded.py` — List sentences of the ms-program Application / Pre-evaluation / Scientific Interview / (~509 tok)

## artifacts/bakim3-2026-10-26/uygula/

- `kur.py` — Doğrulanmış bulgulardan düzenleme listesi kurar; çakışmaları ve eşleşmeyen alıntıları raporlar. (~936 tok)
- `uygula_docs.py` — Defter (ARASTIRMA) ve yol haritası (YOL-HARITASI) düzeltmeleri: edits.json'daki docs/ girdileri. (~225 tok)
- `uygula_docs2.py` — YOL-HARITASI'nda makalelerle hizalanması gereken dört ifade. (~256 tok)
- `uygula.py` — Bakım run 3: ana oturumun onayladığı düzenlemeleri uygular. (~5263 tok)
- `uygula2.py` — İkinci geçiş: kalıp taramasında kalan dört etiket/sıklık iddiası. (~354 tok)
- `uygula3.py` — Üçüncü geçiş: kaynaksız mülakat sıklığı iddiaları (SOZLESME §1, §2). (~292 tok)
- `uygula4.py` — Dördüncü geçiş: fark incelemesinin kabul edilen bulguları ve aynı sınıftaki kaynaksız mülakat (~2677 tok)

## artifacts/boun-render/


## artifacts/editoryal-2026-09-25/


## artifacts/git-revizyon/


## artifacts/git-revizyon/render/


## artifacts/guvenlik-run2/


## artifacts/guvenlik-run2/render/


## artifacts/guvenlik-run3/


## artifacts/guvenlik-run3/render/


## artifacts/guvenlik-run4/


## artifacts/guvenlik-run5/

- `blok-dogrula.mjs` — Yazıdaki her ```bash bloğunu (ardında ```text bloğu varsa) tek bir bash sürecinde sırayla koşturur (~973 tok)
- `deney10.sh` — Declares parseOptions (~1137 tok)
- `deney9.sh` — Declares parseOptions (~1660 tok)
- `figs.mjs` — Şekil ön denetimi: her SVG'yi üç temanın CSS değişkenleri ve Inter ile tek başına çizer, getBBox ile (~1930 tok)
- `hash-new.cjs` — Katalogda henüz olmayan yazının content_hash'ini sync-series-hashes.cjs ile aynı kuralla hesaplar (~264 tok)

## artifacts/guvenlik-run5/render/

- `paged.mjs` — E2E sığma kuralının dört durumu (tests/e2e/series-reader.spec.ts "fits diagrams and tables"), (~992 tok)
- `shoot.mjs` — Gerçek render ölçümü: yalıtılmış kopyada çalışan üretim sunucusuna depodaki e2e test kimliğiyle gire (~1677 tok)

## artifacts/owasp-run1/


## artifacts/owasp-run1/render/


## artifacts/ux-render/


## boun/


## content/


## content/articles/agents-and-retrieval/


## content/articles/case-studies/


## content/articles/foundations/


## content/articles/models-and-training/


## content/articles/multimodal-and-future/


## content/articles/reasoning-and-memory/


## content/articles/safety-and-evaluation/


## content/series-boun/


## content/series-boun/articles/algorithms/


## content/series-boun/articles/data-structures/


## content/series-boun/articles/discrete-math/


## content/series-boun/articles/interview-method/


## content/series-boun/articles/operating-systems/


## content/series-boun/articles/supporting-fundamentals/


## content/series-boun/assets/acgozlu-algoritmalar-ne-zaman-ve-neden-calisir/


## content/series-boun/assets/agaclar-ve-ikili-arama-agaclari/


## content/series-boun/assets/alt-sinirlar-olasiliksal-ve-paralel-algoritmalar/


## content/series-boun/assets/asimptotik-analiz-tanimlar-ve-ispatli-karsilastirma/


## content/series-boun/assets/bellek-yonetimi-adres-cevirisi-ve-sayfalama/


## content/series-boun/assets/bilgisayar-organizasyonu-osnin-altindaki-makine/


## content/series-boun/assets/bilimsel-mulakat-ne-bekleniyor-bu-seri-nasil-calisiyor/


## content/series-boun/assets/bol-ve-yonet-kazanc-nereden-gelir/


## content/series-boun/assets/c-ve-bellek-sistem-programlama-penceresi/


## content/series-boun/assets/cebirsel-yapilar-ve-boolean-cebiri/


## content/series-boun/assets/cpu-zamanlama-olcutler-kurallar-ve-geri-besleme/


## content/series-boun/assets/dengeli-arama-avlden-b-agacina/


## content/series-boun/assets/dinamik-programlama-alt-problemi-bulmak/


## content/series-boun/assets/diziler-bagli-listeler-yigin-ve-kuyruk/


## content/series-boun/assets/dogruluk-dongu-degismezleriyle-ispat/


## content/series-boun/assets/dosya-sistemleri-ve-giris-cikis/


## content/series-boun/assets/graf-algoritmalari-mst-ve-en-kisa-yollar/


## content/series-boun/assets/graf-temsilleri-bfs-ve-dfs/


## content/series-boun/assets/graflar-ve-agaclar-tanimlar-ve-ilk-ispatlar/


## content/series-boun/assets/hashing-sabit-zamanin-bedeli/


## content/series-boun/assets/heap-ve-oncelik-kuyrugu/


## content/series-boun/assets/isletim-sistemi-nedir-cekirdek-sistem-cagrisi-evrim/


## content/series-boun/assets/ispat-teknikleri-dogrudan-celiskiyle-karsi-ornekle/


## content/series-boun/assets/kapanis-zayif-nokta-haritasi-ve-son-hafta-plani/


## content/series-boun/assets/karmasiklik-big-o-ile-dusunmeye-baslamak/


## content/series-boun/assets/kilitlenme-kosullar-ve-stratejiler/


## content/series-boun/assets/klasik-eszamanlilik-problemleri-cozumu-savunmak/


## content/series-boun/assets/koruma-guvenlik-ve-linux-somutlamasi/


## content/series-boun/assets/kumeler-fonksiyonlar-ve-bagintilar/


## content/series-boun/assets/np-tamlik-hesaplamanin-sinirlari/


## content/series-boun/assets/olasilik-ve-istatistik-mulakat-icin-cekirdek/


## content/series-boun/assets/onermeler-ve-niceleyiciler-mantigin-dili/


## content/series-boun/assets/sanal-bellek-talep-sayfalama-ve-degistirme/


## content/series-boun/assets/sayma-kombinatorigin-temel-araclari/


## content/series-boun/assets/senkronizasyon-kilit-semafor-ve-monitor/


## content/series-boun/assets/siralama-algoritmalari-karsilastirmali-ve-otesi/


## content/series-boun/assets/sozlu-anlatim-provasi-tahta-takip-sorusu-arastirma-yonu/


## content/series-boun/assets/surecler-ve-is-parcaciklari/


## content/series-boun/assets/tumevarim-ve-ozyineleme-ayni-fikrin-iki-yuzu/


## content/series-boun/assets/veritabanlari-iliskisel-model-indeks-ve-transaction/


## content/series-boun/assets/yinelemeler-ve-master-teoremi/


## content/series-guvenlik/


## content/series-guvenlik/articles/collaboration-and-delivery/

- `github-ekip-akisi-push-pr-merge-dagitim.md` — Yeşil iki PR, kırmızı bir main (~11341 tok)
- `surum-ve-dagitim-etiket-github-release.md` — Aynı ad, iki içerik (~9995 tok)

## content/series-guvenlik/articles/design-and-configuration/


## content/series-guvenlik/articles/owasp-and-verification/


## content/series-guvenlik/articles/version-control/


## content/series-guvenlik/assets/ayrisan-gecmisi-birlestirmek-merge-rebase-squash/


## content/series-guvenlik/assets/git-zihinsel-modeli-dal-bir-isaretcidir/


## content/series-guvenlik/assets/github-ekip-akisi-push-pr-merge-dagitim/

- `iki-taraf-bes-karar.svg` (~1595 tok)
- `yesil-kontrol-baska-birlesim.svg` (~1285 tok)

## content/series-guvenlik/assets/guvenli-varsayilanlar-yapilandirma/


## content/series-guvenlik/assets/hata-yolunda-guvenlik-a10-2025/


## content/series-guvenlik/assets/kod-kaybetmeden-geri-almak/


## content/series-guvenlik/assets/owasp-top-10-2025-i-okumak/


## content/series-guvenlik/assets/surum-ve-dagitim-etiket-github-release/

- `surum-dali-hotfix.svg` (~1632 tok)
- `tasinan-etiket-iki-surum.svg` (~2319 tok)

## content/series-guvenlik/assets/tehdit-modelleme-guven-sinirini-cizmek/


## content/series-guvenlik/assets/uzak-depoyla-esitlenmek-fetch-pull-push/


## content/series/


## content/series/ — Batch 3 (makale 15–18)


## content/series/articles/agents-and-retrieval/


## content/series/articles/case-studies/


## content/series/articles/foundations/


## content/series/articles/models-and-training/


## content/series/articles/multimodal-and-future/


## content/series/articles/reasoning-and-memory/


## content/series/articles/safety-and-evaluation/

- `kotuye-kullanim-siber-biyolojik-ve-bilgi-operasyonlari.md` — Modelin değil, saldırganın hesabı (~8741 tok)

## content/series/assets/


## content/series/assets/acik-agirliklar-ve-model-ekosistemi/


## content/series/assets/acik-sorular-alanin-bilmedikleri/


## content/series/assets/agi-tartismasi-tanimlar-testler-zaman-cizelgeleri/


## content/series/assets/ajan-bellegi-ve-durum-yonetimi/


## content/series/assets/ajan-degerlendirmesi-basariyi-olcmek/


## content/series/assets/ajan-ekonomisi-maliyet-gecikme-guvenilirlik/


## content/series/assets/ajan-guvenligi-istem-enjeksiyonu-ve-kum-havuzu/


## content/series/assets/ajan-mimarileri/


## content/series/assets/ajan-nedir-kontrol-dongusu-olarak-llm/


## content/series/assets/akil-yuruten-modeller-dogrulanabilir-odulle-egitim/


## content/series/assets/akil-yurutme-nedir-tanim-olcum-ve-tartisma/


## content/series/assets/aktivasyonlara-mudahale-yonlendirme-ve-sondalar/


## content/series/assets/aldatma-ve-durum-farkindaligi-tartismalari/


## content/series/assets/arac-kullanimi-islev-cagrisi/


## content/series/assets/arama-ve-planlama-oz-tutarlilik-ve-agaclar/


## content/series/assets/arastirma-sorusu-ve-deney-tasarimi-hipotez-taban-cizgisi-ablasyon/


## content/series/assets/atif-model-neden-boyle-dedi/


## content/series/assets/baglam-penceresi-istemin-anatomisi/


## content/series/assets/beliren-yetenekler-tartismasi-aniden-mi-geliyor/


## content/series/assets/belirsizlik-ve-kalibrasyon-model-ne-kadar-emin/


## content/series/assets/bellek-sohbet-icinde-ve-sohbetler-arasinda/


## content/series/assets/bilgi-kurami-entropi-capraz-entropi-ve-kl/


## content/series/assets/bilgi-parametrelerde-nasil-durur-model-hafizasi/


## content/series/assets/bilgi-tazeligi-guncellik-kaynak-guveni-ve-atif/


## content/series/assets/bilgisayar-kullanan-ajanlar/


## content/series/assets/bilimde-yapay-zeka-kesif-araci-olarak-llm/


## content/series/assets/bir-calismayi-okumak-iddia-kanit-ve-hakemlik/


## content/series/assets/birlesik-modeller-her-sey-token-mu/


## content/series/assets/cikarim-aninda-hesap-dusunme-suresi-satin-almak/


## content/series/assets/coklu-ajan-sistemleri-isbirligi-ve-orkestrasyon/


## content/series/assets/constitutional-ai-ve-olceklenebilir-denetim/


## content/series/assets/dagitik-egitim-paralellik-stratejileri/


## content/series/assets/dalkavukluk-ve-model-karakteri/


## content/series/assets/degerlendirme-101-benchmarklar-ne-olcer-ne-olcemez/


## content/series/assets/degerlendirme-bilimi-benchmarklarin-otesi/


## content/series/assets/dikkatin-otesi-ssm-ve-alternatif-mimariler/


## content/series/assets/dogrulama-modelin-cevabini-kontrol-etmek/


## content/series/assets/donanim-ekosistemi-gpudan-ozel-ciplere/


## content/series/assets/dunya-modelleri-metnin-otesinde-anlamak/


## content/series/assets/dusunce-zinciri-ara-adimlarin-gucu-ve-siniri/


## content/series/assets/egitim-verisi-toplama-temizlik-karisim-ve-tekrar/


## content/series/assets/embeddinglerin-donusu-anlamsal-arama/


## content/series/assets/enerji-maliyet-ve-cevresel-ayak-izi/


## content/series/assets/fine-tuning-ve-lora-modeli-kendi-isine-uyarlamak/


## content/series/assets/genelleme-kurami-ezber-ile-ogrenme-arasinda/


## content/series/assets/getirme-aramanin-modern-hali/


## content/series/assets/goruntu-ve-video-uretimi-difuzyona-giris/


## content/series/assets/goruntuyu-anlamak-goruntu-dil-modelleri/


## content/series/assets/gpu-zihinsel-modeli-hesap-bellek-bant-genisligi/


## content/series/assets/guvenlik-egitimi-reddetme-sinirlar-ve-dengeler/


## content/series/assets/halusinasyon-model-neden-ve-ne-zaman-uydurur/


## content/series/assets/ham-modelden-asistana-post-training-haritasi/


## content/series/assets/hiz-ve-maliyet-servis-yiginlama-ve-spekulatif-uretim/


## content/series/assets/hizalama-sorunu-ne-istedigimizi-soylemek-zor/


## content/series/assets/in-context-learning-ornekle-ogrenme/


## content/series/assets/insan-ajan-isbirligi-denetim-ve-devir/


## content/series/assets/insan-degerlendirmesi-ve-hakem-modeller/


## content/series/assets/insan-tercihlerinden-ogrenmek-rlhf-ve-otesi/


## content/series/assets/istem-muhendisligi-kanita-dayali-bir-bakis/


## content/series/assets/jailbreak-ve-kirmizi-takim/


## content/series/assets/kendi-asistanin-kucuk-olcekte-sft-ve-dpo/


## content/series/assets/kendi-egitim-kosun-tokenizer-veri-ve-dongu/


## content/series/assets/kirlilik-ve-ezber-benchmarklara-guven-krizi/


## content/series/assets/klasik-makine-ogrenmesi-turu-llmden-once-ve-yaninda/


## content/series/assets/kod-yazan-ajanlar-yazilim-muhendisliginde-llm/


## content/series/assets/kosunun-guvenilirligi-kontrol-noktasi-sicrama-ve-gozlem/


## content/series/assets/kotuye-kullanim-siber-biyolojik-ve-bilgi-operasyonlari/


## content/series/assets/kuantizasyon-modeli-kucultme-sanati/


## content/series/assets/kucuk-ama-guclu-damitma-ve-kucuk-modeller/


## content/series/assets/kv-cache-ve-cikarim-ekonomisi/


## content/series/assets/matrisin-icini-okumak-rank-ozdeger-ve-svd/


## content/series/assets/mcp-ve-arac-ekosistemleri/


## content/series/assets/mekanistik-yorumlanabilirlik-devreleri-okumak/


## content/series/assets/mikro-gpt-bir-transformeri-elle-kurmak/


## content/series/assets/modelin-bilgisi-neden-yetmez-rag-e-giris/


## content/series/assets/olasiligin-dili-dagilimlar-beklenti-ve-en-buyuk-olabilirlik/


## content/series/assets/olcumun-disiplini-istatistiksel-test-ve-benchmark-bilimi/


## content/series/assets/optimizasyonun-kurami-gradyanin-matematigi/


## content/series/assets/ozellikler-ve-superpozisyon-modelin-ic-dili/


## content/series/assets/parcalama-yeniden-siralama-ve-rag-hattinin-incelikleri/


## content/series/assets/pekistirmeli-ogrenmenin-temelleri-markov-karar-sureci/


## content/series/assets/performans-muhendisligi-dikkati-hizlandirmak/


## content/series/assets/rag-degerlendirmesi-dogruluk-ve-kaynak-sadakati/


## content/series/assets/ragin-otesi-getirerek-akil-yuruten-sistemler/


## content/series/assets/robotik-ve-somutlasmis-yapay-zeka/


## content/series/assets/saglamlik-dagilim-kaymasi-ve-dusmanca-girdiler/


## content/series/assets/seffaflik-model-kartlari-ve-sistem-kartlari/


## content/series/assets/ses-konusma-ve-gercek-zamanli-modeller/


## content/series/assets/sinir-aglari-katmanlarin-icinde-ne-oluyor/


## content/series/assets/sistem-istemleri-roller-ve-sohbet-bicimi/


## content/series/assets/son-adim-haritayi-yeniden-cizmek/


## content/series/assets/sorumlu-olcekleme-sinir-model-guvenlik-cerceveleri/


## content/series/assets/surec-denetimi-adim-adim-odullendirme/


## content/series/assets/surekli-ogrenme-ve-kisisellestirme/


## content/series/assets/talimatla-egitim-supervised-fine-tuning/


## content/series/assets/tekrarlanabilirlik-negatif-sonuc-ve-acik-bilim/


## content/series/assets/ucta-yapay-zeka-telefonda-ve-cihazda-llm/


## content/series/assets/uzun-baglam-pencereyi-buyutmenin-bedeli/


## content/series/assets/uzun-ufuk-cok-adimli-gorevlerde-tutarlilik/


## content/series/assets/vaka-incelemesi-bir-llm-urunu-nasil-kurulur/


## content/series/assets/vaka-incelemesi-bir-sinir-model-nasil-yapilir/


## content/series/assets/vektor-veritabanlari-ve-dizinleme/


## content/series/assets/vektorler-ve-matrisler-embeddingin-matematigi/


## content/series/assets/verimli-mimariler-uzman-karisimlari-moe/


## content/series/assets/web-kod-ve-dosyalarla-calisan-modeller/


## content/series/assets/yapilandirilmis-cikti-json-kod-ve-kisitli-uretim/


## content/series/assets/yonetisim-politika-standartlar-ve-regulasyon/


## content/series/assets/yuzuncu-adim-sezgiden-bilime-haritanin-sentezi/


## docs/seri-boun/


## docs/seri-guvenlik/

- `HANDOFF.md` — "Güven Sınırı: Güvenli Yazılım ve Kaynak Kod Yönetimi" — Handoff (~4214 tok)

## docs/seri/


## docs/superpowers/plans/


## docs/superpowers/specs/


## drizzle/


## inbox/


## prompts/


## scripts/


## src/


## src/app/

- `accent-contrast.test.ts` — White text may only sit on `--accent-fill`, never on `--accent`. In light and sepia (~895 tok)

## src/app/api/reader-sync/


## src/app/boun/


## src/app/boun/[slug]/


## src/app/guvenlik/


## src/app/guvenlik/[slug]/


## src/app/login/


## src/app/read/


## src/app/read/[slug]/


## src/app/seri/


## src/app/seri/[slug]/


## src/app/yonetim/


## src/app/yonetim/ (2026-09-02 eklendi)


## src/app/yonetim/[userId]/


## src/components/dashboard/


## src/components/reader/

- `article-marks.tsx` — ArticleMarks (~1794 tok)

## src/components/series/

- `series-landing.tsx` — Rota tabanı, ör. "/seri" veya "/boun". (~4072 tok)
- `series-progress-reset.tsx` — Short series name used inside the confirmation sentence ("… serisindeki"). (~1306 tok)

## src/lib/


## src/lib/auth/


## src/lib/auth/ (2026-09-02 genişletildi)


## src/lib/content/


## src/lib/db/


## src/lib/preferences/


## src/lib/progress/


## src/lib/reader-data/


## src/lib/reader-data/server/


## src/lib/reader-layout/


## src/lib/reader/


## src/lib/stats/


## src/lib/stats/ (2026-09-02 eklendi)


## src/lib/stats/server/


## src/test/


## test-results/


## tests/e2e/


## tools/


## tools/dev/


## tools/lib/


## tools/publish/


## tools/series/

