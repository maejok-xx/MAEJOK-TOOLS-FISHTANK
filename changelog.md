# MAEJOK-TOOLS CHANGE LOG

# **_v2.6.0_**

### Notes

- Something is going on with updater, don't care to figure it out since I'm rewriting this whole thing anyway, so versioning is not correct. Don't worry about it.

### Bug Fixes

- fix console spam/tab freeze if clanless

### Features Added

- N/A

### Removed

- N/A

---

# **_v2.4.10_**/v2.5.0

### Notes

- jumping v2.5.0 because of issue with update/versioning system that I'll fix later
- Quick Scroll to bottom and name click tagging are now native Fishtank features.
- Updated some formatting

### Bug Fixes

- N/A

### Features Added

- N/A

### Removed

- Quick Scroll to bottom
- Name-click Tagging

---

# **_v2.4.9_**

### Notes

- To use ContextHelper9000: click any @User_Mention and all their messages (if any) will be highlighted in purple. To remove, click any other one of their mentions or one of their messages.

### Bug Fixes

- Fix not being able to type in mid/big chat mode when window <1100px

### Features Added

- ContextHelper9000 (Now your context seeking skills are over 9000!)

### Removed

- N/A

---

# **_v2.4.7 / 2.4.8_**

### Notes

- 2.4.7 to 2.4.8 is because I'm an idiot and updated code without testing JUST before pushing 2.4.7
- This update is just bugfixes and a little code refactoring
- Made dense chat a little less dense...might make density customizable in settings at another date

### Bug Fixes

- Fix global mission button showing through in Mid/BigChat on reload with Persist BigChat enabled
- Fix chat modes toggling when opening/saving settings
- Fix countdown timer setting not working correctly
- Fix custom setting values not saving (chatters threshold, update check frequency, etc)

### Features Added

- N/A

### Removed

- N/A

---

# **_v2.4.6_**

### Notes

- The new "MidChat" mode will break to BigChat around 1200px due to how the site handles sizing of the chat window, however, you'll still be in MidChat mode if you resize down below 1200ishpx, so you'll still need to toggle twice to get back to normal mode...this is not a bug! Don't @ me about this.

### Bug Fixes

- N/A

### Features Added

- Settings tab to edit "Friends" and "Watched" users and their corresponding highlight colors. Google HEX or RGBA color generator to find colors.
- Ability to customize Friends and Watched Users message highlight colors
- Updated BigChat to now have a "MidChat" mode. Toggle once for MidChat, twice for BigChat, and thrice to go back to the original layout.

### Removed

- N/A

---

# **_v2.4.5_**

### Notes

- Cleaned up settings Panel

### Bug Fixes

- N/A

### Features Added

- N/A

### Features Removed

- None

---

# **_v2.4.4_**

### Notes

- This update is mostly to get the update system finished, and to clean up and refactor some code, and most importantly, to put a notice in place not to bother Wes (fishtank developer) with any bugs or issues created by me distributing this plugin.

### Bug Fixes

- Issue with user message highlighting persistence (you'll need to reselect any previously highlighted users)
- Mobile navigation bar showing and XP bar being messed up while in Big Chat while at low resolutions
- Chatter count now resets when you change chat rooms

### Features Added

- These change logs
- Agreement not to bother Wes with bugs created by using this plugin
- Click chatters count to show the users. Click the name to tag them.
- Big Chat state now persists between reloads and resets to whatever state it was in when you left the site/refreshed (configurable in settings)
- "Help" links in settings to help explain what each option does
- Update checks now run periodically (disable checks or change check frequency in settings)

### Features Removed

- None
