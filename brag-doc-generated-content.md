# Brag Doc

**Owner:** Simon Curran  
**Role:** Senior Frontend Engineer  
**Last Updated:** 2026-04-29  
**Career Dev Matrix:** [Open](https://auladbrokes-my.sharepoint.com/:x:/r/personal/sam_marshall_ladbrokes_com_au/Document[…]waf7a581916204c7982e403d2a8caec56&csf=1&web=1&e=ZbzokY)

> Auto-maintained by /brag-doc:update. Company-agnostic, resume-portable.
> Copy entries into Confluence when Atlassian MCP is wired up.

---

## Q2 2026

- Added a maximum odds cap to the custom odds selection feature, preventing
  invalid bet configurations from being submitted
- Delivered a refactored live racing channel integration for a consumer-facing
  betting platform — centralising channel logic, removing per-brand
  configuration files, and expanding unit test coverage across the live vision
  feature
- Improved Playwright E2E test infrastructure by replacing UI-coupled feature
  flag setup with direct API calls and session storage — decoupling tests from
  debug UI and improving reliability across the test suite
- Resolved a user-facing bug where exotic bet selections were lost when
  toggling between boxed and non-boxed modes — patching the race card bet
  component and adding comprehensive regression test coverage
- Fixed navigation and highlight state bugs in the racing interface's
  multi-leg bet header — ensuring correct meeting routing and active state
  display across standard and legacy routing modes
- Standardised i18n locale key naming conventions across the racing feature
  — aligning all namespace keys to the project's UPPER_SNAKE_CASE standard
- Identified and removed an incorrect event emission in the race card
  component, eliminating spurious event bus calls and improving component
  reliability
- Authored a Claude skill encoding the split-spec E2E pattern for
  feature-flagged UI rollouts — covering split-file structure,
  fixture-driven POM selection, skip guard boilerplate, Playwright locator
  hierarchy, and sequential MR chain — giving the team a reusable,
  zero-reinvention guide for uplifting specs across a multi-brand
  sportsbook platform

---

## Q1 2026

- Delivered a new betting product type end-to-end — integrating live data,
  wiring to the betting flow, and building a new informational UI panel with
  unit tests and design system stories, enabling the feature to ship across
  the racing interface
- Resolved multiple defects in the quick-bet flow for fixed-place and
  win/place bet types, including incorrect display logic and a cleanup of
  shared betting hooks that removed redundant code across the module
- Addressed a broad set of race card stability and UX issues: incorrect tab
  state on race changes, a video player re-opening unexpectedly on page load,
  runner sorting failures when prices were unavailable, keyboard accessibility
  issues in the bet-type selector, and regional price display corrections for
  a specific market
- Authored a GitHub Copilot code review skill for the engineering team,
  enabling engineers to run automated, project-standards-aligned reviews
  directly from the CLI or VS Code Copilot Chat — reducing reliance on manual
  checklists and enforcing consistent coding standards across all contributors
- Authored a security audit skill and project-specific security instructions
  for the AI coding assistant, covering XSS prevention, sensitive data
  handling, and safe navigation patterns across the frontend codebase
- Maintained the end-to-end test infrastructure by resolving a fixture
  composition issue that was causing test setup failures
- Implemented a Money Back Odds betting table as a new race card bet type,
  with full unit test coverage and design system price button enhancements
  to support the new bet flow
- Built a Blended runner group table as a new race card bet type, decoupling
  selection logic from the existing bet type architecture and extending the
  price button design system component
- Added error state handling to the race card screen, surfacing meaningful
  feedback when race data fails to load
- Overhauled the live vision picture-in-picture experience in the race card
  — shipping an updated PIP design, smooth open animation for mobile inline
  players, and preventing conflicts with the sports video player
- Added fixed odds exotic notifications and resolved fluctuations display
  issues in the race card
- Added comprehensive test coverage for new race card bet type components
  and restructured test files across the racing feature

---

## Q4 2025

- Resolved a navigation defect in the account management area, correcting
  incorrect menu item display
- Built the race card compounds betting table — a substantial new feature
  enabling compound exotic bet type selection with combo odds calculation,
  meeting leg navigation, and betslip integration
- Delivered a series of bet type selector improvements: autoscrolling to the
  active tab, Storybook documentation, tab underline accuracy, hiding
  correctly on resulted races, and compound routing
- Added race card skeleton loader components for mobile and desktop,
  improving perceived loading performance during data fetching
- Upgraded the project to Storybook v10 and resolved associated component
  story compatibility issues across the design system

---

## Q3 2025

- Collaborated with senior engineers to define the GraphQL query structure
  for the new race card screen, balancing immediate data requirements with
  long-term expandability for one of the most critical pages across the
  platform
- Delivered final phase contributions to the Racing IA product, ensuring
  component quality and consistency across the racing feature set
- Completed promotion process from Mid-level to Senior Frontend Engineer,
  compiling evidence of contributions and leadership impact
- Undertook a company-led Leadership Fundamentals course, identifying
  personal leadership style (Democratic Coach) and strengths in building
  trust, involving others in decisions, and supporting individual development
- Presented a frontend security session to the wider engineering community,
  covering Vue and HTML security patterns — a topic pursued independently to
  broaden knowledge and share learnings with the team
- Received feedback from James Dinnes, Frontend SRE — "I think you deserve
  it, you're on top of code quality, making life easier for us and I didn't
  even have to worry about anything racing-ia"
- Received feedback from Jane Foster, Staff QA Engineer — "When Simon asked
  me for feedback for promotion to a senior, my first response was that I
  couldn't believe he wasn't already holding that title. Simon shows a
  maturity in his communications and decision making that we want in our
  senior staff members. He regularly shows that he is willing to take on
  extra responsibility to help get things across the line. An example of this
  is how he has continued to maintain and champion our Playwright E2E test
  suite, when others who have been involved previously have dropped away."
- Received feedback from Blake McClaer, Delivery Manager — "Def support that
  jump to senior — in particular one area I have seen you really grow in is
  those wider cross team comms and support and guidance."
- Built the picture-in-picture (PIP) live video player for the racing
  interface from the ground up — delivering a draggable overlay container,
  custom player controls, racing-specific footer, scheduling, inline mode,
  and mobile web support, enabling users to watch live racing whilst
  navigating other content
- Integrated an international iframe-based video player into the race card
  header with comprehensive test coverage, expanding live vision support to
  international racing markets
- Reorganised the live vision codebase to separate legacy and new
  implementations, improving maintainability for future video player work
- Improved the bet type selector across multiple iterations — addressing tab
  heights, compound bet type routing, and general stability
- Enhanced racing route configuration to respond correctly to feature flag
  state, ensuring graceful degradation when features are toggled

---

## Q2 2025

- Added a new icon component to the core design system integrating a
  widely-adopted icon library, providing consistent iconography across web,
  iOS, and Android — unblocking downstream product teams dependent on this
  component before completing their uplift work
- Became a core approver and reviewer for the shared design system component
  library, contributing to quality standards for components used across all
  brand environments
- Led development of core and racing-specific components for the Racing IA
  product, collaborated with the backend team on GraphQL queries, and
  established white-label component patterns for other teams to follow
- Supported the Breakpoints Navigation team with code reviews, design system
  documentation, a rebuild of the site footer, and side menu icon work —
  raising unit test consistency and identifying bugs across the product
- Added a VS Code launch configuration enabling developers to start the
  frontend development server directly from the IDE
- Rebuilt the quick-bet side panel for Racing IA, decoupling it from legacy
  code and migrating it to new GraphQL data responses
- Icon and skeleton loader components were recognised by another engineering
  team as high-priority shared deliverables that directly unblocked their own
  uplift work
- Ran an impromptu session for frontend engineers on Racing IA to clarify
  white-label component principles and new GraphQL fragment-based prop
  patterns, addressing inconsistencies from team members unfamiliar with the
  updated standards
- Ran a cross-discipline session with a backend colleague explaining GraphQL
  fragment usage in the frontend codebase, improving mutual understanding
  between disciplines
- Peer programmed with members of the Breakpoints and Nav team on white-label
  component patterns, aligning Storybook documentation with Figma designs
- Received feedback from Sheldon Braxton, Product Designer — positive
  feedback regarding senior engineer trajectory and suitability for design
  engineering
- Resolved a set of pre-release polish issues for the Racing IA product —
  including UI edge cases, layout regressions, empty state handling, date
  calculation bugs, and component-level fixes across the racing interface
  ahead of launch

---

## Q1 2025

- Implemented feature flag toggle support within individual end-to-end tests,
  resolving failures caused by flags being in an unexpected state — ensuring
  features are verified in both enabled and disabled states and improving
  overall test suite reliability
- Built the loading skeleton component for the frontend uplift — a core
  shared component used across all brand environments to reduce perceived load
  time and smooth the user experience during data fetching
- Added a Tailwind CSS plugin to the frontend build system, enabling standard
  styles to be defined and selectively overridden per product — resolving
  conflicts that were forcing non-standard workarounds in product teams
- Contributed white-label components to the frontend uplift initiative,
  ensuring quality and adherence to design system principles throughout
- Received feedback from Alex Artlett, Frontend Staff Engineer — "The
  reality is, you already are very skilled as an FE generally PLUS have
  specialised FE knowledge too. Knowing intimately how React JS, Vue 2 + Vue
  3 work. Knowing intimately how to work with multiple global store libs like
  Vuex + Redux. Working with Tanstack / React Query, Apollo, URQL, multiple
  ways of CSS. Knowing microfrontends, knowing how to write e2e tests — I
  cannot stress how at most places, the most you're expected to know is how
  to write unit tests. Just want you to know, last year I gave you a shout
  out to your EM because of how much you were smashing it."
- Received feedback from James Dinnes, Frontend SRE — general positive
  feedback for the previous 6 months of contributions

---

## Q4 2024

- Overhauled the frontend feature flag debug menu — a significantly outdated
  internal tool — enabling QA and developers to toggle feature flags in UAT
  without restarting local development, reducing friction in manual testing
  workflows
- Contributed white-label components to the frontend uplift initiative,
  providing guidance to other frontend developers on design system principles
- Completed an internal Android/Kotlin upskilling course, broadening
  cross-platform mobile development knowledge
- Presented a live demonstration in the engineering Web Tech Forum on how a
  promotional competition product was built, providing a reusable reference
  for other engineers facing similar tight-turnaround deliveries
- Upskilled QA engineers in Playwright end-to-end test coding standards and
  quality practices, improving consistency and maintainability across the
  shared test suite

---

## Q3 2024

- Rebuilt a promotional competition frontend to be generic and reusable,
  enabling future competitions to be delivered quickly from a configurable
  base rather than built from scratch under deadline pressure
- Improved the quality and reliability of the Playwright end-to-end test
  suite — upskilling QA engineers, reducing test flakiness, and meeting the
  business deadline to activate the full e2e suite across the frontend
- Walked a senior QA colleague through running the frontend against a local
  branch for shoulder-check testing, enabling them to replicate and teach
  the workflow to their own team

---

## Q1 2024

- Received feedback from Brendan Butcher, Senior Frontend Engineer — "Simon
  has an amazing eye for small detail, and the overall general desire to
  improve and be the best developer he can be. When reviewing MRs Simon has
  the ability to look at the diff and pick out cleaner ways to do things, or
  ways that align to our coding guidelines. He is always available for peer
  programming and is quick to respond with any questions."

---

## Q4 2023

- Wrote a significant portion of E2E tests and added tooling to the automated
  mobile testing framework, upskilling the native app QA team in writing and
  maintaining tests (Sep–Nov 2023)
- Built a shared composable to group race data efficiently, preventing
  unnecessary data from being committed to the application state store —
  resolving significant memory consumption issues causing slow page
  performance and browser crashes in the racing section
- Published the frontend release checklist as shared internal documentation,
  turning institutional knowledge into a repeatable, accessible process
- Received feedback from Sam Marshall, Senior QA — "Simon is an easy person
  to work with. He is capable of tackling challenges within RN, FE, and our
  E2E testing framework. He prioritises doing things the right way and always
  wants to implement the best solution possible. Simon has played significant
  roles in projects like NHE, where he quickly up-skilled himself in RN, and
  Odds Surge, where he took a feature from a tech spike to implementation and
  release. He also completed the UFC competition site within a tight
  timeframe, which was very impressive."
- Received feedback from Alex Arlett, Frontend Staff Engineer — "The thing
  that impresses me the most is his level of attention to detail for all
  things related to quality — whether it be matching designs, maintaining and
  improving code quality via the code reviews he gives, or making sure his
  own work is of the highest standard. Simon understands things end-to-end
  and whenever there is something he doesn't understand, he is not afraid to
  figure it out by himself or ask someone who does understand."

---

## Q3 2023

- Received a public shoutout in the engineering community for authoring
  documentation that helps teams add new bet type products — demonstrating
  the lasting value of knowledge-sharing initiatives
- Published the frontend release checklist to internal documentation,
  turning institutional knowledge into a shared, repeatable process
- Received feedback from Saish Dharvotka, Delivery Manager — "Simon is a
  rare engineer who has an unwavering amount of work ethic. His commitment
  to excellence, coupled with a relentless curiosity, sets him apart. His
  ability to approach challenges with a pragmatic mindset is particularly
  commendable — he not only tackles problems head-on but consistently
  develops solutions that are innovative and practical."

---

## Q2 2023

- Built the Market Control V2 feature across all brand environments,
  upskilling React Native team members to contribute frontend code during
  the delivery (Feb–Jun 2023)
- Delivered a high-profile promotional competition site under a very tight
  deadline — working across frontend, Vue 3 migration patterns, and a full
  duplication of the sign-up flow to support the competition's isolated
  environment
- Began consistent knowledge sharing within the frontend engineering chapter,
  passing on patterns and learnings from day-to-day work to peers (ongoing)

---

## Q1 2023

- Led the Odds Surge bet type feature from tech spike through to full release
  — sole ownership across backend prioritisation, admin availability rules,
  frontend and React Native implementation, and design system price button
  updates
- Ran an async retrospective on the Odds Surge delivery, producing a reusable
  internal guide for adding new bet type products that has since been
  referenced by other teams
- First full feature owned independently from spike to release
- Delivered a Vue and frontend architecture rundown to colleagues joining the
  Market Control V2 project from a different tech background, enabling them
  to contribute effectively

---

## Q4 2022

- Promoted from Graduate/Junior level to Mid-level Frontend Engineer
- Received quantitative validation from product metrics confirming the
  quality and impact of work delivered on the New Homepage Experience product
- Received Rookie of the Year nomination — "An extremely capable developer
  with a good sense of understanding and problem solving. He is a key part of
  the team and you can count on him to get his portion of work done but is
  always looking to do more. Very valuable."
- Received Rookie of the Year nomination from Filip Maslovarić — "Simon is
  someone who has catapulted himself from peak to peak in his experience over
  the last year, improving everything that he works on, and avidly learning
  as much as he can with every new project or task he gets. Inspiring traits
  for all rookies, and a model of how enthusiasm to keep learning and
  practicing will reward you."
- Received anonymous Rookie of the Year nomination — "Dude is a beast when
  it comes to learning the ropes. Has already made an impact in RN work, and
  has way more approved merges than anyone in the New Homepage Experience
  team."
- Received Culture Setter of the Year nomination — "Simon is always open to
  helping out, providing feedback, and pushing to uplift the code quality in
  the projects."

---

## Q3 2022

- Became a key contributor on the New Homepage Experience product, rapidly
  upskilling in React Native and TypeScript — onboarding and technically
  supporting multiple new starters to reach the team's high code quality bar
  (Jul 2022–Feb 2023)
- Became a core reviewer and approver for the mobile design system, writing
  core components and contributing to foundational design system principles
  as the library took shape (Jul 2022–ongoing)
- Received feedback from Johan Piquet, Developer — "I really enjoy working
  with Simon who is always keen to help out and to share his time with the
  rest of the team. Simon has helped me both in RN and Storybook as well as
  sharing tips around working at the company in general."
- Received feedback from Katrina Tomaszczyk, Product Manager — "From the
  beginning Simon demonstrated exceptional communication and dedication.
  Skills that Simon demonstrated were clarifying requirements, offering
  different solutions and explanations as to why and what each offered.
  Excellent communication throughout the entire journey and release strategy.
  I have seen him go from strength to strength where he now mentors and
  guides others. Simon is one of the humblest, patient, honest, dedicated
  people I have had the pleasure to meet and work with."
- Received feedback from Claire Holmes, Corporate Communications Manager —
  "Simon was fantastic to work with. No question was too silly, no task too
  hard and no change too pesky. What I really valued about working with Simon
  was that he wasn't afraid to look beyond his remit and call out ideas and
  opportunities for improvement — even if it wasn't his 'job' to look for
  those things. Simon brought so much value to our team throughout a stressful
  and time-poor period."
- Received feedback from Paul Southall, Head of Business Services —
  "Dependable. Self-organising. Culture add. Relative to peers, more
  capable."
- Received feedback from Merina, Delivery Lead — "Good communicator, a team
  player, has a high level of ownership. Documentation that he has done has
  been really helpful. Over time his technical expertise has improved a LOT."

---

## Q2 2022

- Designed and built the frontend for an external company Hackathon event,
  volunteering on the event days in addition to the build (Apr 2022)
- Completed the graduate/SWAT support rotation and transitioned into a
  product team as a frontend developer
- Completed a GraphQL fundamentals course, gaining the knowledge needed to
  build and work with GQL queries — applied directly in product work from
  this point onwards
- Completed a React Native course covering hooks and RN patterns, increasing
  confidence ahead of the New Homepage Experience product
- Built and launched the external Hackathon website collaboratively —
  recognition of this work led directly to being invited to join a product
  team as a frontend developer
- Began consistent, high-volume code review contributions across the
  engineering team — a primary vehicle for passing on knowledge, patterns,
  and quality standards to peers (Jun 2022–ongoing)

---

## Q1 2021

- Joined the organisation as part of the SWAT technical support team,
  monitoring and responding to engineer queries in the support channel and
  handling bug fixes across the frontend and backend codebase
  (Feb 2021–Jun 2022)
- Onboarded through the graduate team, continuing bug fix contributions
  before moving into a product team

---
