<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Single scrolling landing page at `/` composed from `src/components/site/*`; nav uses in-page `#section` anchors because the owner asked for smooth-scroll sections.
- All contact details, prices and service copy live in `src/lib/site.ts` so every section (services, payment, footer) stays consistent.
- Uploaded logo, doctor photo and payment QR are served via `.asset.json` pointers in `src/assets/`; never replace, crop, filter or overlay the QR.
- Colors/fonts are tokens in `src/styles.css`; components use semantic classes only.
- Appointment requests are validated in a server function (`src/lib/appointment.functions.ts`) and relayed to the doctor via FormSubmit's AJAX endpoint with a fixed Referer (`SITE_URL`), so one relay activation covers preview and published; nothing is stored because the owner chose email-only.
- Form rules and message text live in `src/lib/appointment.ts`, shared by browser and server so both validate identically.
