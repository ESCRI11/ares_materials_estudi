# Fonts

Self-hosted so the cheatsheet renders identically here and in CI. Loading them from a CDN
at render time meant the GitHub runner silently fell back to Liberation Sans and embedded
the wrong typeface in the PDF — with no failed request to notice.

| File | Family | Licence |
|---|---|---|
| `arimo.woff2` | Arimo (variable, 400–700) | Apache 2.0 |
| `plexmono-400.woff2`, `plexmono-500.woff2` | IBM Plex Mono | SIL Open Font Licence 1.1 |

Both licences permit redistribution. Arimo is metric-compatible with Arial, which is the
fallback the site itself names; IBM Plex Mono Medium is the face the SUPSI syllabus embeds.
