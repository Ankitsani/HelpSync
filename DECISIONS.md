# Design and Engineering Decisions — HelpSync Redesign

## 1. Design & Layout Approach: Choice and Rationale
We chose a **Sleek Dark-First Theme with an Interactive Mockup Browser Canvas** over the alternative of a static marketing page with illustration graphics or high-level screenshots. 

* **Why?** Support ticket software is highly visual and operational. Users want to see how status updates propagate and how clean the workspace feels. By embedding a fully interactive "Browser Frame Mockup" directly on the landing page, we let users create a ticket and watch it resolve in real-time (transitioning from *Open* → *In Progress* → *Resolved*). This demonstrates the core value proposition of HelpSync (real-time status tracking) in under 3 seconds.
* **Alternative Considered & Rejected:** A traditional light-themed page featuring static icon grids and screenshots of the existing app. We rejected this because HelpSync's current app UI is highly structured but light-themed; transitioning immediately from a dark-themed brand header into a generic white grid felt disconnected. A cohesive dark/light mode toggle with smooth CSS-bezier transitions across the Navbar, Landing Page, and Footer creates a much more premium look.

## 2. Trade-Offs under Time Pressure & Future Roadmap
* **The Trade-Off:** We simulated the ticket resolution flow entirely in client-side React state using simulated timers, rather than writing full mock WebSockets or connecting the landing page directly to a backend demo database. 
* **If we had a full week:** We would implement a guest sandbox environment that opens a fully functional, read-only dashboard connecting to a temporary MongoDB-backed test instance. This would allow prospective users to click around the *actual* dashboard, assign tickets, and toggle columns rather than interacting with a client-only mockup card. We would also add a theme state sync to the backend user profiles so the chosen dark/light preference persists across all authenticated views seamlessly.

## 3. AI Tooling & Manual Verification Log
* **Where AI was used:**
  * Drafted the state-based particle/confetti simulation for the Konami code easter egg.
  * Scaffolded the Tailwind CSS v4 color gradients for dark/light mode switches.
  * Generated standard mock data representing high-fidelity customer support tickets.
* **What was manually verified & adjusted:**
  * **Tailwind v4 class compatibility:** Manually verified and adjusted class tags in `Navbar.jsx` and `Footer.jsx` to ensure clean transitions on background changes. Verified that `dark:` triggers correctly using `document.documentElement` class list mutations.
  * **State cleanup:** Ensured that the custom requestAnimationFrame loop for the Konami code particles is cancelled correctly on unmount to prevent memory leaks.
  * **Interactive Demo flow timers:** Carefully adjusted the status transition timers in the demo from 2.5s (routing) to 5.5s (resolved) so the user has ample time to read the status badges changing without the simulation feeling rushed.
