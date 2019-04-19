---
title: About
---

## Intro

Welcome! We are a few [open source sanskrit programmers](https://groups.google.com/forum/#!forum/sanskrit-programmers), and this is [our centralized repository](https://github.com/sanskrit/ashtadhyayi) + [user inteface](https://ashtadhyayi.github.io/) of data pertaining to the ashtadhyayi and its commentaries. We welcome you to contribute corrections to the content or [improvements to the UI](https://github.com/ashtadhyayi/ashtadhyayi.github.io/).

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
Many vrittis were typeset via the short-lived sansknet project by Rashtriya Sanskrit Vidyapeetha, Tirupati. The content was originally gathered by diligent folks such as shrI ajit and shrI dhaval from such files ephemerally shared on the internet. This content then went through many hands. Some of this content was [also retrieved](https://github.com/ashtadhyayi/ashtadhyayi_org_data) from the excellent [ashtadhyayi.com](ashtadhyayi.com) site (where shrI nIlesh personally curates the content). We plan to periodically compare with such independently maintained sources and correct the content.

## User Interface (UI)
We use the Hugo static site generator to generate webpages, and github to host the site at [https://ashtadhyayi.github.io/](https://ashtadhyayi.github.io/). The UI heavily copies shrI nIlesh's [ashtadhyayi.com](ashtadhyayi.com).

### Automatic updates
Ordinarily, wercker piplenes set up under the [ashtadhyayi](https://github.com/sanskrit/ashtadhyayi/) and [ashtadhyayi-ui](https://github.com/ashtadhyayi/ashtadhyayi.github.io/) projects are automatically triggered upon updates to the respective repositories, leading to the updated UI.
- Status
  - content triggering UI builds: [![wercker status](https://app.wercker.com/status/ce8ccbe942e0226ce16ba45e0d2fc10f/s/master "wercker status")](https://app.wercker.com/project/byKey/ce8ccbe942e0226ce16ba45e0d2fc10f)
  - ui builds: [![wercker status](https://app.wercker.com/status/d0eeae8d13a5701771b428486ae1de1b/s/master "wercker status")](https://app.wercker.com/project/byKey/d0eeae8d13a5701771b428486ae1de1b)

### Updating the UI with the latest content (Manully)
- Update the content - `git submodule foreach "(git checkout master; git pull)&"`
- Install [Hugo](gohugo.io)
- Run `hugo` (Takes ~ 16s as of 20181224.)
- Check in and push the changed files in the doc directory to github gh-page branch.

### Technical considerations
- github.io is a convenient place to present the data (no money needed for server resources).
- The Jekyll static site generator is just too slow for data of this magnitude.
- Using javascript to dynamically include content from github.com runs into CORS problems.
