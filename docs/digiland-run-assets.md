# Digiland Run asset handoff

The `/digiland-run` page follows the supplied 2025 reference. Original medal, racepack, and community assets are integrated; remaining provisional assets are listed below.

| Asset | Current implementation | Replace here |
| --- | --- | --- |
| Hero and information background | Original `public/bg_content_header.png` | `src/app/digiland-run/page.tsx` and `run.css` |
| Racepack photo collage | Original `public/content_grid.png` | `Racepack` in `page.tsx` |
| HM, 10K, 5K medals | Original `public/medals/medals_21k.png`, `medals_10k.png`, `medals_5k.png` | `Medal` in `src/components/digiland-run/run-artwork.tsx` |
| BIB, goodie bag, jersey | Original `public/rpc/bib.png`, `tas.png`, `jersey.png` | `BibArtwork`, `BagArtwork`, `JerseyArtwork` in `run-artwork.tsx` |
| Community photos and caption bubble | Original `public/community/image(8).png` (Telkomrunners), `image(9).png` (Skolari), `image(10).png` (Running Rage), and `Vector.png` | `COMMUNITIES` in `page.tsx` and community styles in `run.css`; native transparent shapes are preserved |
| Sponsor logos | Original `public/sponsors/*.png` | Shared `src/components/sponsors.tsx`, reused by Home, Digiland Run, and Community |
| MyTelkomsel wordmark and ticket CTA | Original `public/logo_my_telkomsel.png` | Shared `src/components/cta.tsx`, reused by Home and Digiland Run; `id` preserves the ticket anchor and `href` selects the ticket destination |
| Telkom and Telkomsel footer logos | Original `public/logo_telkom.png` and `public/logo_telkomsel.png` | Shared `src/components/footer.tsx`, reused by Home, Digiland Run, and Community |
| Footer Digiland logo | Original `public/dgld-digiland-2025.svg` | Shared `src/components/footer.tsx` |

The tabs beyond the visible terms use provisional copy based on the supplied reference. Final FAQ, prizes, route maps, guide, Saturday racepack hours, and ticket deep link can be supplied alongside the final assets. The current ticket CTA opens the MyTelkomsel website. Community registration links to `/community`.

At widths below 1024px, the run introduction uses "ENJOY YOUR RUN", and category cards, racepack products, and essential information stack in one column. The Goers banner appears only on mobile and tablet; its Buy Tickets button is intentionally static (disabled) pending a ticket URL. Racepack artwork retains the supplied assets and their proportions. Dates and venue continue to use the 2025 event data, rather than the older dates shown in the mobile layout reference.

## Community form

`/community` follows the supplied form reference and reuses the Digiland Run hero and shared sponsor/footer components. The form validates community name, city (with a custom city option), team leader, Instagram username, member count, and Indonesian WhatsApp number. Invalid submission focuses the first invalid field and provides field-level error text.

As requested, submission is a frontend mockup. Valid submission opens a confirmation dialog with all six community details; "Ubah Data" returns to the filled form, and "Konfirmasi Pengajuan" advances to OTP verification. Successful verification switches to a simulated success message. All stages visibly identify the flow as a simulation. Closing, pressing Escape, or clicking the backdrop preserves the form values. No data is sent or persisted. Connect an approved API endpoint in `src/components/community/community-form.tsx` when the backend is ready, and replace the simulated confirmation with the real API result.

WhatsApp verification is also a frontend simulation, implemented in `src/components/community/community-otp.tsx`. The flow is: valid form submission → review community details → Konfirmasi Pengajuan → OTP popup → simulated success. OTP appears only in the popup after confirmation. The disclosed six-digit demo code is `123456`, with a 30-second resend cooldown and five-minute expiry. Incorrect or incomplete codes show errors inside the popup. Ubah Nomor WhatsApp returns to the filled form; confirming again creates a fresh challenge for the current number. Closing the popup also clears the challenge. No message is sent, and this client-side state is not authentication: replace both challenge issuance and verification with a server-backed OTP provider when integrating the API.
