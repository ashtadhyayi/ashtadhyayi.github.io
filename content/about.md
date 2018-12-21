---
title: About
---

## Intro

Welcome! We are a few [open source sanskrit programmers](https://groups.google.com/forum/#!forum/sanskrit-programmers), and this is [our centralized repository](https://github.com/sanskrit/ashtadhyayi) + [ui](https://ashtadhyayi.github.io/ui/) of data pertaining to the ashtadhyayi and its commentaries. We welcome you to contribute corrections to the content or [improvements to the UI](https://github.com/ashtadhyayi/ui).

### Motivation
This data is presented in many places on the internet (wikisource, [sanskritdocuments.org](sanskritdocuments.org), avg-sanskrit, [ashtadhyayi.com](ashtadhyayi.com) etc..), but there was no centralized place where corrections and curations could happen in a crowdsourced yet controlled fashion. Hence this repository.

## Content
### Format and location
The content is curated in [https://github.com/sanskrit/ashtadhyayi](https://github.com/sanskrit/ashtadhyayi).  Each vritti file is devanagari encoded markdown text with yaml frontmatter. Shorter files (padachcheda, anuvritti, adhikara, full_sutra) are plain text files (to avoid extra work for static website generators who might be using this data). Helpful scripts are located [here](https://github.com/ashtadhyayi/data_curation).

### Contributing corrections
#### Via Github pull requests (preferred)

Follow the following steps (which only seem complicated at first, but are very simple):

- Just click on the appropriate <i class="fas fa-edit small"></i> icon.
  - This will take you to a Github page, where you will be prompted to sign up/in, and "make a fork" as necessary.
- Make and save your edits.
- Send us a "pull request".
  - Helpful videos: [here](https://youtu.be/YTbRzhQju4c?t=157), here
- Some repository moderator will then review, accept your changes and regenerate the site.

#### Manual notification (Not preferred)
Just [send us a message](https://github.com/sanskrit/ashtadhyayi/issues/new) (with the full corrected vritti text).

### Data origin
The content was originally gathered by diligent folks such as shrI ajit and shrI dhaval from files ephemerally shared on the internet. This content then went through many hands. Some of this content was [also retrieved](https://github.com/ashtadhyayi/ashtadhyayi_org_data) from the excellent [ashtadhyayi.com](ashtadhyayi.com) site (where shrI nIlesh personally curates the content). We plan to periodically compare with such independently maintained sources and correct the content.

## UI
We use the Hugo static site generator to generate webpages, and github to host the site at [https://ashtadhyayi.github.io/ui/](https://ashtadhyayi.github.io/ui/). The UI heavily copies shrI nIlesh's [ashtadhyayi.com](ashtadhyayi.com).

### Updating the UI with the latest content
- Update the content - `git pull --recurse-submodules; cd content/vritti; git pull; cd ../..`
- Install [Hugo](gohugo.io)
- Run `hugo` (Takes ~ 12s as of 20181221.)
- Check in and push the changed files to github.

### Technical considerations
- github.io is a convenient place to present the data (no money needed for server resources).
- The Jekyll static site generator is just too slow for data of this magnitude.
- Using javascript to dynamically include content from github.com runs into CORS problems.
