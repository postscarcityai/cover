# Video Inventory

Reviewed: 2026-04-04
Updated: 2026-04-04T01:40:00-04:00
Project: PostScarcity AI work page
Output path: `~/dev/psai-site/content/work-research/video-inventory.md`

## Live site check

Checked:
- `https://postscarcity.ai/work`
- `https://postscarcity.ai/work?tab=video`

Result:
- No visible video tab on the live `/work` page.
- The `?tab=video` URL returns the same page. There is no separate video view.
- The live page HTML contains zero `<iframe>` embeds.
- No YouTube or Vimeo project embeds are attached to the live portfolio.
- The only YouTube URL surfaced on the live page is the footer social link: `https://youtube.com/@postscarcityai`

## Repo confirmation

Checked repo: `~/dev/psai-site`

Relevant files:
- `app/work/page.tsx`
- `components/video-embed.tsx`
- `app/work/finesse/page.tsx`
- `app/work/vibe-jam/page.tsx`
- `site.config.ts`

Findings:
- `app/work/page.tsx` renders a fixed list of project cards only: AMC Defense Law, Finesse Plastic Surgery, Vibe Jam, and Heathos Pulse.
- There is no tab state and no handling for `tab=video` in the work page.
- There is no `VideoEmbed` usage wired into the `/work` page or the current case study pages.
- `components/video-embed.tsx` exists and supports YouTube and Vimeo embeds, but it is not connected to the portfolio.
- `site.config.ts` has `social.youtube` set to an empty string, so there is no configured YouTube channel link in the repo config.
- `app/work/finesse/page.tsx` mentions a homepage video treatment in copy, but does not embed a video.
- `app/work/vibe-jam/page.tsx` mentions video in project description copy, but does not embed a video.

## Project video inventory

No project-specific embedded videos were found.

| Video title | Project | Embed URL | Description |
| --- | --- | --- | --- |
| None found | None | None | No embedded YouTube or Vimeo videos are connected to the live `/work` page or current case study pages. |

## Supporting references

### `app/work/page.tsx`
Current projects surfaced on `/work`:
- AMC Defense Law
- Finesse Plastic Surgery
- Vibe Jam
- Heathos Pulse

None of these entries include a video field or embed URL.

### `components/video-embed.tsx`
This component can normalize these sources into embeds:
- `youtube.com`
- `youtu.be`
- `vimeo.com`
- `player.vimeo.com`

That confirms video support exists in the codebase, but not in the current portfolio implementation.

### Text-only video mentions
- `app/work/finesse/page.tsx`
  - Mentions a full-viewport homepage video treatment.
- `app/work/vibe-jam/page.tsx`
  - Mentions video as part of the project scope.

These are text references only, not embedded portfolio videos.

## Bottom line

There is no video inventory to extract from the live PostScarcity AI work page right now. The repo has a reusable video embed component ready for future use, but no case study videos are currently attached to `/work`.
