// ==UserScript==
// @name         MAEJOK-TOOLS for Fishtank.live
// @description  Tools for Fishtank.live Season 2!
// @author       maejok-xx
// @version      2.4.5
// @license      GNU GPLv3
// @homepageURL  https://github.com/maejok-xx/MAEJOK-TOOLS-FISHTANK
// @namespace    https://greasyfork.org/en/scripts/465416-maejok-tools-for-fishtank-live
// @icon         https://www.google.com/s2/favicons?domain=fishtank.live
// @match        *://*.fishtank.live/*
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==



// TO RESET ALL PLUGIN DATA: Clear browser's LocalStorage for https://www.fishtank.live



(function () {
  'use strict';
  const VERSION = '2.4.5';

  // DON'T EDIT THESE!!
  const classes = {
    mainHome: 'home_home',
    // top bar
    topBar: 'top-bar_top-bar',
    topBarUser: 'top-bar_user',
    topBarTitle: 'top-bar_title',
    topBarLogo: 'top-bar_logo',
    topBarClan: 'top-bar_clan',
    topBarDisplayName: 'top-bar_display-name',
    // chat
    chatHeader: 'chat_header',
    chatPresence: 'chat_presence',
    // chat box
    chatBox: 'chat_chat__2rdNg',
    // chat messages
    chatRoomSelector: 'chat-room-selector_chat-room-selector',
    chatRoomsList: 'select_options',
    chatMessages: 'chat_messages',
    chatMessageList: 'chat_inner',
    chatAvatar: 'chat-message-default_avatar',
    chatMessageOuter: 'chat-message-default_chat',
    chatMessage: 'chat-message-default_message',
    chatTimestamps: 'chat-message-default_timestamp',
    chatEmote: 'chat-message-emote_emote',
    chatClan: 'chat-message-default_clan',
    chatHappening: 'chat-message-happening',
    chatSystem: 'chat-message-system_chat',
    chatMedal: 'medal_medal',
    chatXPLevel: 'chat-message-default_lvl',
    chatAutoScroll: 'chat_scroll',
    chatUsername: 'chat-message-default_user',
    // username
    userCardUsername: 'user-card_name',
    userCardActions: 'user-card_actions',
    profileUsername: 'user-profile_name',
    profileActions: 'user-profile_actions',
    // chat - input
    chatInputActions: 'chat-input_actions__V_ho0',
    chatInputForm: 'chat-input_chat-input__OmyQV',
        chatInput: 'chat-input_input__ozkas',
    // modal
    modalBackdrop: 'modal_backdrop__94Bu6',
    modalContainer: 'modal_modal-container__iQODa',
    modalModal: 'modal_modal__MS70U',
    modalHeader: 'modal_header__O0ebJ',
    modalTitle: 'modal_title__TdXFC',
    modalCloseButton: 'close-button_close',
    modalScrews: 'screws_screws',
    modalScrewsTR: 'screws_top-right',
    modalBody: 'modal_body__j3Bav',
    // forms
    inputWrapper: 'input_input-wrapper__xvMLO',
    inputInput: 'input_input__Zwrui',
    inputLabel: 'input_label__hviII',
    // bars
    xpBar: 'experience-bar_experience-bar',
    countDownTimer: 'countdown_countdown',
    // maejok elements:
    chatterCount: 'maejok-chatter_count-count',

    mobileNavPanel: 'mobile-nav-panel_mobile',

    add: {
      chatPresence: 'chat_presence__90XuO',
      chatCount: 'chat_count__D7xic',
      modalClose: ['close-button_close-button__BKUKA', 'close-button_sm__n0dZT'],
    }
  };

  // ELEMENT CREATION

  function openSettingsTab(tabName) {
    const tabContents = document.querySelectorAll(`[class^="maejok-settings_tab-content"]`);
    for (const tabContent of tabContents) { tabContent.style.display = "none"; }
    const content = document.querySelector(`.maejok-settings_tab-content_${tabName}`)
    content.style.display = "block";
  }

  function createSettingsPanel() {
    if (!isPageLoaded || document.querySelector(`.${classes.modalContainer}`)) return;

    isBigChat ? toggleBigChat() : playSound('click-low-short');

    config.load();

    const mainHomeElement = document.querySelector(`[class*="${classes.mainHome}"]`);

    const settingsModalContainer = document.createElement('div');
    settingsModalContainer.classList.add(`${classes.modalContainer}`);
    settingsModalContainer.setAttribute('style', 'z-index: 997!important');

    const settingsModalBackdrop = document.createElement('div');
    settingsModalBackdrop.classList.add(`${classes.modalBackdrop}`);
    settingsModalBackdrop.setAttribute('style', 'z-index: 998!important');

    const settingsModal = document.createElement('div');
    settingsModal.classList.add(`${classes.modalModal}`);
    settingsModal.setAttribute('style', 'z-index: 999!important');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add(`${classes.modalHeader}`);

    const modalBody = document.createElement('div');
    modalBody.classList.add(`${classes.modalBody}`);
    modalBody.style.margin = '3px 10px';
    modalBody.style.padding = '10px';

    const modalTitle = document.createElement('div');
    modalTitle.classList.add(`${classes.modalTitle}`);

    const modalTitleText = document.createElement('h2');
    modalTitleText.textContent = settingsTitle;

    const closeButtonContainer = document.createElement('div');
    closeButtonContainer.classList.add('modal_close__E9CBl');

    const closeButton = document.createElement('button');
    closeButton.classList.add(...classes.add.modalClose);
    closeButton.setAttribute('style', 'min-width: 0px!important');

    const closeButtonIcon = document.createElement('img');
    closeButtonIcon.classList.add(`close-btn`);
    closeButtonIcon.setAttribute('alt', 'Close');
    closeButtonIcon.setAttribute('width', '32');
    closeButtonIcon.setAttribute('height', '32');
    closeButtonIcon.setAttribute('src', 'https://cdn.fishtank.live/images/slices/close.png');

    const screws = document.querySelector(`[class*="${classes.modalScrews}"]`).cloneNode(true);

    modalHeader.appendChild(modalTitle);
    modalTitle.appendChild(modalTitleText);
    modalHeader.appendChild(closeButtonContainer);
    closeButtonContainer.appendChild(closeButton);
    closeButton.appendChild(closeButtonIcon);
    settingsModal.appendChild(modalHeader);
    settingsModal.appendChild(modalBody);
    settingsModal.appendChild(screws);
    mainHomeElement.parentElement.insertBefore(settingsModalContainer, mainHomeElement.nextSibling);
    settingsModalContainer.appendChild(settingsModalBackdrop);
    settingsModalContainer.appendChild(settingsModal);

    screws.querySelector(`[class*="${classes.modalScrewsTR}"]`).remove()
    addSettingsBody(modalBody);
  }

  function createSettingsButton() {
    if (!isPageLoaded) return;
    const chatInputActionsElement = document.querySelector(`[class*="${classes.chatInputActions}"]`);
    const settingsButton = document.createElement('button');
    settingsButton.classList.add('console-button-square_console-button-square__GpSZQ');
    settingsButton.classList.add('console-button-square_md__OiTX7');
    settingsButton.type = 'button';
    chatInputActionsElement.insertBefore(settingsButton, chatInputActionsElement.firstChild);

    const settingsButtonImage = document.createElement('img');
    settingsButtonImage.setAttribute('src', '/images/slices/console-button-square-red.png');
    settingsButton.appendChild(settingsButtonImage);

    const settingsButtonSquare = document.createElement('div');
    settingsButtonSquare.classList.add('console-button-square_text__IfVyC');
    settingsButton.appendChild(settingsButtonSquare);

    const settingsButtonIcon = document.createElement('div');
    settingsButtonIcon.classList.add('icon_icon__bDzMA');
    settingsButtonIcon.innerHTML = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path d="M2257 5065 c-568 -69 -1104 -335 -1502 -747 -183 -189 -314 -369 -429 -589 -194 -371 -286 -748 -286 -1169 0 -411 85 -770 270 -1135 129 -256 261 -437 469 -646 209 -208 390 -340 646 -469 363 -184 725 -270 1135 -270 875 0 1666 439 2144 1190 179 282 320 685 361 1036 57 491 -31 987 -255 1429 -121 240 -253 426 -445 624 -402 416 -935 679 -1513 746 -153 18 -445 18 -595 0z m623 -400 c433 -67 831 -264 1144 -565 352 -339 571 -758 641 -1225 83 -563 -60 -1130 -404 -1593 -83 -112 -311 -340 -423 -423 -520 -387 -1171 -519 -1792 -364 -583 145 -1091 545 -1370 1077 -110 210 -185 439 -223 679 -24 157 -24 461 0 618 82 527 340 984 750 1327 319 268 722 438 1147 484 117 12 403 4 530 -15z"></path>
                <path d="M1655 3526 c-86 -27 -160 -84 -210 -160 -131 -200 -55 -466 164 -573 50 -25 67 -28 161 -28 93 0 112 3 162 27 324 151 300 618  -36 731 -59 20 -183 21 -241 3z"></path>
                <path d="M3240 3531 c-100 -33 -199 -117 -243 -206 -98 -197 -11 -438 191 -533 50 -24 69 -27 162 -27 94 0 111 3 161 28 87 42 143 98 185 183 100 202 18 439 -185 532 -46 21 -73 27 -151 29 -52 1 -106 -1 -120 -6z"></path>
                <path d="M1455 2220 c-54 -109 -97 -201 -95 -203 3 -3 140 -70 304 -151 165 -80 297 -148 295 -150 -2 -3 -146 -52 -319 -111 -173 -58 -316 -108 -318 -110 -7 -7 133 -417 143 -421 6 -3 250 76 544 174 l534 179 504 -249 c277 -136 507 -248 511 -248 9 0 208 398 202 403 -3 2 -138 70 -300 151 -162 81 -296 149 -298 151 -2 2 141 51 316 109 l320 107 -70 212 c-39 117 -72 214 -74 215 -1 2 -244 -77 -538 -177 l-536 -181 -507 250 c-278 138 -509 250 -512 250 -4 0 -51 -90 -106 -200z"></path>
            </g>
        </svg>`
    settingsButtonSquare.appendChild(settingsButtonIcon);

    settingsButton.addEventListener('click', createSettingsPanel);
  }

  function addSettingsBody(modalBody) {
    const tabs = ['main','hiders','about']

    const form = document.createElement('form');

    form.classList.add('maejok-settings_form');

    form.addEventListener('submit', (event) => { event.preventDefault(); saveConfig(); });

    const settingsPanel = document.createElement('div');
    settingsPanel.className = `maejok-settings-panel`;
    settingsPanel.style.height = '450px';
    settingsPanel.style.width = '500px';
    form.appendChild(settingsPanel)

    const buttonBar = document.createElement('div');
    buttonBar.className = `maejok-settings_tab-bar`;
    buttonBar.style.textAlign = 'center';
    settingsPanel.appendChild(buttonBar)

    tabs.forEach(tab => {
      const tabButton = document.createElement('button');
      tabButton.classList.add('console-button-long_console-button-long__G6irT');
      tabButton.classList.add('console-button-long_md__y_aAD');
      tabButton.classList.add('maejok-settings_tab-button');
      tabButton.setAttribute('style', 'position: absolute;');
      tabButton.setAttribute('style', 'margin-top: 20px;');
      tabButton.setAttribute('style', 'bottom: 0px;');
      tabButton.style.width = '100%';

      const tabButtonImage = document.createElement('img');
      tabButtonImage.alt = '';
      tabButtonImage.setAttribute('loading', 'lazy');
      tabButtonImage.width = '373';
      tabButtonImage.height = '75';
      tabButtonImage.setAttribute('decoding', 'async');
      tabButtonImage.setAttribute('data-nimg', '1');
      tabButtonImage.src = 'images/slices/console-button-long-orange.png';
      tabButtonImage.style.color = 'transparent';

      const tabButtonText = document.createElement('div');
      tabButtonText.classList.add('console-button-long_text__ajAjy');
      tabButtonText.textContent = tab;

      tabButton.addEventListener("click", (event) => {
        openSettingsTab(`${tab}`);
        event.stopPropagation();
        event.preventDefault();
        playSound('click-high-short');
      });
      buttonBar.appendChild(tabButton)
      tabButton.appendChild(tabButtonImage)
      tabButton.appendChild(tabButtonText)
    });

    const tabMain = document.createElement('div');
    tabMain.className = `maejok-settings_tab-content_main`;
    tabMain.name = 'main'

    const tabHiders = document.createElement('div');
    tabHiders.className = `maejok-settings_tab-content_hiders`;
    tabHiders.name = 'hiders'

    // const tabUpdates = document.createElement('div');
    // tabUpdates.className = `maejok-settings_tab-content_updates`;
    // tabUpdates.name = 'updates'

    const tabAbout = document.createElement('div');
    tabAbout.className = `maejok-settings_tab-content_about`;
    tabAbout.name = 'about'

    settingsPanel.appendChild(tabMain)
    settingsPanel.appendChild(tabHiders)
    // settingsPanel.appendChild(tabUpdates)
    settingsPanel.appendChild(tabAbout)

    // ABOUT

    const aboutPage = document.createElement('div');
    aboutPage.innerHTML = `<div class="maejok-about"><div class="container"><h1 style="text-align: center;color: rgb(232, 0, 232);">MAEJOK-TOOLS</h1><p><strong>Author:</strong> <a href="#" id="tagUserLink" onclick="event.preventDefault();">@maejok</a> | <a href="https://twitter.com/maejok" target="_blank">x/maejok</a></p><p><strong>Version:</strong> ${VERSION}</p><p>This plugin is not created, promoted, nor endorsed by the creators of Fishtank Live.</p><p>Do not ask them for help with this plugin.</p><p>If you have issues while using the plugin, disable it and try again before you report any bugs to Wes or Fishtank staff!!</p><p>All bug reports are to be directed at <a href="#" id="tagUserLink" onclick="event.preventDefault();">@maejok</a> in Fishtank chat or on X <a href="https://twitter.com/maejok" target="_blank">x/maejok</a></p></div></div>`;
    tabAbout.appendChild(aboutPage);


    //main
    const enableRecentChatters = createCheckbox('Enable Chatter Count', 'enableRecentChatters', ['prompt', 'Threshold', 'How long should someone be considered active in chat? (in minutes) (Default: 10)', 'chattersThreshold', 'min.']);
    tabMain.appendChild(enableRecentChatters);

    const enableBigChat = createCheckbox('Big Chat Mode', 'enableBigChat', ['help', ' ? ', 'Hit CTRL+` or CTRL+SHIFT+SPACE to toggle']);
    tabMain.appendChild(enableBigChat);

    const persistBigChat = createCheckbox('Persist Big Chat State', 'persistBigChat', ['help', ' ? ', 'Remembers which state Big Chat was in last time you left the site and returns to that state on page load']);
    tabMain.appendChild(persistBigChat);

    const showTimerBigChat = createCheckbox('Show Countdown in Big Chat Mode', 'showTimerBigChat', ['help', ' ? ', 'Hides or shows the countdown timer when Big Chat is enabled']);
    tabMain.appendChild(showTimerBigChat);

    const enableClickHighlightUsers = createCheckbox('Enable Users Highlighting', 'enableClickHighlightUsers', ['help', ' ? ', 'Highlights all messages by user.  Will persist between page reloads.']);
    tabMain.appendChild(enableClickHighlightUsers);

    const enableAvatarTagging = createCheckbox('Avatar Click-To-Tag', 'enableAvatarTagging', ['help', ' ? ', 'Tags chat sender when you click their username']);
    tabMain.appendChild(enableAvatarTagging);

    const enableNameTagging = createCheckbox('Username Click-To-Tag', 'enableNameTagging', ['help', ' ? ', 'Tags chat sender when you click their avatar']);
    tabMain.appendChild(enableNameTagging);

    const enableDenseChat = createCheckbox('Enable Dense Chat', 'enableDenseChat', ['help', ' ? ', 'Removes padding around chat messages']);
    tabMain.appendChild(enableDenseChat);

    const autoClanChat = createCheckbox('Auto-Join Clan Chat', 'autoClanChat', ['help', ' ? ', 'Automatically joins your clan\'s chat upon page load']);
    tabMain.appendChild(autoClanChat);


    //hiders
    const disableTimestamps = createCheckbox('Hide Timestamps', 'disableTimestamps', ['help', ' ? ', 'Hides timestamps in chat']);
    tabHiders.appendChild(disableTimestamps);

    const disableChatClans = createCheckbox('Hide Clans', 'disableChatClans', ['help', ' ? ', 'Hides chatters clans tags in chat']);
    tabHiders.appendChild(disableChatClans);

    const disableLevels = createCheckbox('Hide Levels', 'disableLevels', ['help', ' ? ', 'Hides chatters levels in chat']);
    tabHiders.appendChild(disableLevels);

    const disableAvatars = createCheckbox('Hide Avatars', 'disableAvatars', ['help', ' ? ', 'Hides chatters avatars in chat']);
    tabHiders.appendChild(disableAvatars);

    const disableEmotes = createCheckbox('Hide Emotes', 'disableEmotes', ['help', ' ? ', 'Hides all emotes in chat']);
    tabHiders.appendChild(disableEmotes);

    const disableMedals = createCheckbox('Hide Medals', 'disableMedals', ['help', ' ? ', 'Hides all medals in chat.  If only medals are sent, the entire message is hidden']);
    tabHiders.appendChild(disableMedals);

    const disableHappenings = createCheckbox('Hide Happenings', 'disableHappenings', ['help', ' ? ', 'Hides all notices for consumables (inventory items) notices in chat']);
    tabHiders.appendChild(disableHappenings);

    const disableSystemMessages = createCheckbox('Hide System Messages', 'disableSystemMessages', ['help', ' ? ', 'Hides all room joins, clan/clanless attacks, War Toys, etc. from chat']);
    tabHiders.appendChild(disableSystemMessages);

    const enableUpdateChecks = createCheckbox('Allow plugin to check for updates', 'enableUpdateChecks', ['prompt', 'Frequency', 'How many minutes between update checks? (in minutes) (Default: 30) Note: This will also enable update checks on every page load.', 'updateCheckFrequency', 'min.']);
    tabMain.appendChild(enableUpdateChecks);

    // save button
    const saveButton = document.createElement('button');
    saveButton.classList.add('console-button-long_console-button-long__G6irT');
    saveButton.classList.add('console-button-long_lg__hdQwz');
    saveButton.setAttribute('type', 'submit');
    saveButton.setAttribute('style', 'position: absolute;');
    saveButton.setAttribute('style', 'margin-top: 20px;');
    saveButton.setAttribute('style', 'bottom: 0px;');
    saveButton.style.width = '100%';

    const saveButtonImage = document.createElement('img');
    saveButtonImage.alt = '';
    saveButtonImage.setAttribute('loading', 'lazy');
    saveButtonImage.width = '333';
    saveButtonImage.height = '60';
    saveButtonImage.setAttribute('decoding', 'async');
    saveButtonImage.setAttribute('data-nimg', '1');
    saveButtonImage.src = '/images/slices/console-button-long-green.png';
    saveButtonImage.style.color = 'transparent';

    const saveButtonText = document.createElement('div');
    saveButtonText.classList.add('console-button-long_text__ajAjy');
    saveButtonText.textContent = 'Save';

    saveButton.appendChild(saveButtonImage);
    saveButton.appendChild(saveButtonText);

    form.appendChild(saveButton);

    modalBody.appendChild(form);

    document.getElementById('tagUserLink').addEventListener('click', () => {
      tagUser('maejok');
    });

    openSettingsTab("main");
  }

  function createCheckbox(label, id, prompt = false) {
    const elmId = `maejok-${id}`
    const inputInput = document.createElement('div');
    inputInput.classList.add(`${classes.inputInput}`);
    inputInput.setAttribute('style', 'display: flex!important; margin-top: 10px!important');

    const inputLabel = document.createElement('label');
    inputLabel.setAttribute('style', 'flex-direction: row-reverse!important;');

    const inputLabelText = document.createElement('label');
    inputLabelText.classList.add(`${classes.inputLabel}`);
    inputLabelText.setAttribute('for', elmId);
    inputLabelText.setAttribute('style', 'padding-top: 2px!important;');
    inputLabelText.textContent = label

    const inputWrapper = document.createElement('div');
    inputWrapper.classList.add(`${classes.inputWrapper}`);

    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'checkbox');
    inputElement.setAttribute('style', 'height: 20px; width: 20px');
    inputElement.checked = config.get(id);
    inputElement.id = elmId;

    if (prompt) {
      const type = prompt[0];
      if (type === 'help') {
        const linkText = prompt[1];
        const alertText = prompt[2];

        const helpSpan = document.createElement('span');
        helpSpan.style.color = '#000';
        helpSpan.style.fontWeight = '600';
        helpSpan.style.cursor = "pointer";

        const helpSpanText = document.createElement('a');
        helpSpanText.style.fontWeight = '600';
        helpSpanText.style.fontSize = '14px';
        helpSpanText.style.color = 'darkBlue';
        helpSpanText.style.textDecoration = 'none';
        helpSpanText.textContent = linkText;
        helpSpanText.href = '#'

        const openBracket = document.createTextNode('[');
        const closeBracket = document.createTextNode(']');


        helpSpan.appendChild(openBracket);
        helpSpan.appendChild(helpSpanText);
        helpSpan.appendChild(closeBracket);

        helpSpanText.onclick = (event) => {
          event.preventDefault();
          alert(alertText);
        }

        inputLabel.appendChild(helpSpan);

      }

      if (type === 'prompt'){
        const linkText = prompt[1];
        const promptText = prompt[2];
        const configKey = prompt[3];
        const labelDescriptor = prompt[4];
        const configValue = config.get(configKey);

        const hiddenElmId = `maejok-${configKey}`
        const promptSpan = document.createElement('span');
        promptSpan.style.color = '#000';
        promptSpan.style.fontWeight = '600';
        promptSpan.style.cursor = "pointer";

        const promptSpanText = document.createElement('a');
        promptSpanText.style.fontWeight = '600';
        promptSpanText.style.fontSize = '14px';
        promptSpanText.style.color = 'darkBlue';
        promptSpanText.style.textDecoration = 'none';
        promptSpanText.textContent = linkText;
        promptSpanText.href = '#'

        const openBracket = document.createTextNode('[');
        const currentValue = document.createTextNode(` (${configValue}${[labelDescriptor]})`);
        const closeBracket = document.createTextNode(']');

        const promptInput = document.createElement('input');
        promptInput.id = hiddenElmId;
        promptInput.type = 'hidden';
        promptInput.value = config.get(configKey)

        promptSpan.appendChild(openBracket);
        promptSpan.appendChild(promptSpanText);
        promptSpan.appendChild(currentValue);
        promptSpan.appendChild(closeBracket);
        promptSpan.appendChild(promptInput);

        promptSpanText.onclick = (event) => {
          event.preventDefault();
          const promptInput = getUserInput(promptText) || false;
          const input = isNumeric(promptInput) ? promptInput : configValue;
          if (!input) return;
          config.set(id, input);
          currentValue.textContent = ` (${input}${[labelDescriptor]})`;

          document.getElementById(hiddenElmId).value = input;
        }

        inputLabel.appendChild(promptSpan);
      }
    }

    inputLabel.appendChild(inputLabelText);
    inputInput.appendChild(inputLabel);
    inputLabel.appendChild(inputWrapper);
    inputWrapper.appendChild(inputElement);

    return inputInput
  }

  function createFriendButton() {
    let tries = 0;
    const button = document.createElement('button');
    button.classList.add('console-button-long_console-button-long__G6irT', 'console-button-long_md__y_aAD');
    button.style.width = '100%';

    const image = document.createElement('img');
    image.src = 'https://cdn.fishtank.live/images/slices/console-button-long-gray.png';
    image.alt = '';
    image.width = '373';
    image.height = '75';

    const textDiv = document.createElement('div');
    textDiv.classList.add('maejok-friend', 'console-button-long_text__ajAjy');

    button.appendChild(image);
    button.appendChild(textDiv);
    const interval = setInterval(()=>{
      tries++;
      const profile = document.querySelector(`[class*="${classes.profileActions}"]`);
      if (profile) {
        let users = config.get('friends');
        const username = document.querySelector(`[class*="${classes.profileUsername}"]`).innerText;
        const userIndex = users.indexOf(username);
        textDiv.textContent = (userIndex !== -1) ? 'Remove Friend' : 'Add Friend';
        profile.insertAdjacentElement('afterbegin', button);
        button.onclick = ()=>{toggleFriend(username);}
        clearInterval(interval);
      } else if (tries >= 20) {
        clearInterval(interval);
      }
    }, 100);
  }


  // TOGGLES
  let isBigChat = false;
  function toggleBigChat() {
    if (!isPageLoaded || !config.get('enableBigChat')) return;
    isBigChat = !isBigChat;
    if (config.get('persistBigChat')) {
      config.set('bigChatState', isBigChat);
      config.save()
    }
    playSound('shutter');
    const chatBoxElement = document.querySelector(`[class*="${classes.chatBox}"]`);
    const chatMessagesElement = document.querySelector(`[class*="${classes.chatMessages}"]`);
    const chatInputFormElement = document.querySelector(`[class*="${classes.chatInputForm}"]`);
    const chatChatterCountElement = document.querySelector(`.maejok-chatterCount`);
    const xpBarElement = document.querySelector(`[class*="${classes.xpBar}"]`);
    const topBarElement = document.querySelector(`[class*="${classes.topBar}"]`);
    const topBarUserElement = document.querySelector(`[class*="${classes.topBarUser}"]`);
    const topBarTitleElement = document.querySelector(`[class*="${classes.topBarTitle}"]`);
    const topBarLogoElement = document.querySelector(`[class*="${classes.topBarLogo}"]`);
    const happeningMessageElement = document.querySelector(`[class*="${classes.happeningMessage}"]`);
    const countDownTimerElement = document.querySelector(`[class*="${classes.countDownTimer}"]`);
    const mobileNavPanel = document.querySelector(`[class^="${classes.mobileNavPanel}"]`);

    if (chatBoxElement) {
      chatBoxElement.classList.toggle('mTS2-chatBox-BigChat', isBigChat);
      chatMessagesElement.classList.toggle('mTS2-chatMessages-BigChat', isBigChat);
      chatInputFormElement.classList.toggle('mTS2-chatInput-BigChat', isBigChat);
      chatChatterCountElement.classList.toggle('mTS2-chatters-BigChat', isBigChat);
      xpBarElement.classList.toggle('mTS2-xpBar-BigChat', isBigChat);
      topBarElement.classList.toggle('mTS2-topBar-BigChat', isBigChat);
      topBarUserElement.classList.toggle('mTS2-topBarUser-BigChat', isBigChat);
      topBarTitleElement.classList.toggle('mTS2-topBarTitle-BigChat', isBigChat);
      topBarLogoElement.classList.toggle('mTS2-topBarLogo-BigChat', isBigChat);
      mobileNavPanel.classList.toggle('mTS2-mobileNavPanel-BigChat', isBigChat);

      if (config.get('showTimerBigChat')) countDownTimerElement?.classList.toggle('mTS2-countdown-BigChat-show', isBigChat);
      if (!config.get('showTimerBigChat')) countDownTimerElement?.classList.toggle('mTS2-countdown-BigChat-hide', isBigChat);

      if (happeningMessageElement) happeningMessageElement.style.textAlign = isBigChat ? 'unset' : 'center';
      xpBarElement.style.transition = 'margin-top 0.5s';
    }

  }

  function toggleFriend(user) {
    const friendBtn = document.querySelector(`.maejok-friend`);
    let users = config.get('friends');
    const userIndex = users.indexOf(user);

    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      playSound('click-high-short');
      if (friendBtn) friendBtn.textContent = 'Add Friend';
    } else {
      users.push(user);
      playSound('click-low-short');
      if (friendBtn) friendBtn.textContent = 'Remove Friend';
    }

    config.set('friends', users);
    saveConfig(false);
  }

  function toggleUserHighlighting(user) {
    let users = config.get('highlighted');
    const userIndex = users.indexOf(user);

    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      playSound('click-high-short');
    } else {
      users.push(user);
      playSound('click-low-short');
    }

    config.set('highlighted', users);
    saveConfig(false);
  }

  function toggleDenseChat(addedNode){
    const toDensify = [ 'chatEmote', 'chatSystem', 'chatHappening', 'chatTimestamps' ];
    const chatMessageList = document.querySelector(`[class*="${classes.chatMessageList}"]`);
    if (config.get('enableDenseChat')) {

      if (!addedNode){
        toDensify.forEach(elementName => {
          const elements = document.querySelectorAll(`[class*="${classes[elementName]}]"`);
          elements.forEach(element => {
            if (element) element.classList.add('mTS2-denseChat');
          });
        });
      }else{
        toDensify.forEach(elementName => {
          const element = addedNode.querySelector(`[class*="${classes[elementName]}]"`);
          if (element) element.classList.add('mTS2-denseChat');
        });
      }

      if (chatMessageList) chatMessageList.classList.add('mTS2-denseChat-chatMessageList');

    }else{

      toDensify.forEach(elementName => {
        const elements = document.querySelectorAll(`[class*="${classes[elementName]}]"`);
        elements.forEach(element => {
          if (element) element.classList.remove('mTS2-denseChat');
        });
      });

      if (chatMessageList) chatMessageList.classList.remove('mTS2-denseChat-chatMessageList');
    }
  }


  // MISC
  function joinClanChat() {
    const autoClanChatEnabled = config.get('autoClanChat');
    if (!autoClanChatEnabled) return;

    if (!my.clan) return;

    const chatRoomSelector = document.querySelector(`[class*="${classes.chatRoomSelector}"]`);
    const chatRoomButtons = chatRoomSelector.querySelectorAll(`[class*="${classes.chatRoomsList}"] button span`);

    chatRoomButtons.forEach(room => {
      if (room.innerText === my.clan) room.click();
    });
  }

  let chattersList = [];
  function initRecentChatters() {
    const elmName = `maejok-chatter_count`;
    const chatHeader = document.querySelector(`[class*="${classes.chatPresence}"]`);
    const chatPresence = document.createElement('div');
    chatPresence.classList.add(`${classes.add.chatPresence}`);
    chatPresence.classList.add(elmName);

    const chattersText = document.createElement('div');
    chattersText.innerText = `Chatting`;

    const chattersCount = document.createElement('div');
    chattersCount.classList.add(`${classes.add.chatCount}`);
    chattersCount.classList.add(`${elmName}-count`);
    chattersCount.innerHTML = `00000`;

    chatHeader.insertAdjacentElement('afterend', chatPresence);
    chatPresence.appendChild(chattersCount);
    chatPresence.appendChild(chattersText);

    chattersCount.addEventListener('mouseup', (event)=>{ showChattersList(event) });
  }

  function showChattersList(event) {

    const chattersListElm = document.querySelector(`.maejok-chatter_count-chatters`);
    if (chattersListElm) chattersListElm.remove('maejok-chatter_count-chatters-show');

    const chatHeader = document.querySelector(`.maejok-chatter_count`);
    const chatUserList = document.createElement('div');
    chatUserList.classList.add(`maejok-chatter_count-chatters`);
    chatUserList.style.top = `${event.clientY}px`;
    chatUserList.style.left = `${event.clientX-90}px`;

    document.body.appendChild(chatUserList);
    if (chattersList.length === 0){
      const chatterDiv = document.createElement('div');
      chatterDiv.classList.add(`maejok-chatter_count-chatter`);
      chatterDiv.innerText = "Ain't nobody hurr!";
      chatUserList.appendChild(chatterDiv);
    }else{
      chattersList.forEach(chatter => {
        const chatterDiv = document.createElement('div');
        chatterDiv.classList.add(`maejok-chatter_count-chatter`);
        chatterDiv.innerText = chatter.user;
        chatUserList.appendChild(chatterDiv);
      });
    }
    chatUserList.classList.add('maejok-chatter_count-chatters-show');
  }

  function updateChattersList(user, array, reset = false) {
    if (reset) array = [];
    const currentTime = new Date().getTime();
    const thresholdTime = currentTime + config.get('chattersThreshold') * 60 * 1000;

    const existingUser = array.find(item => item.user === user);

    if (existingUser) {
      existingUser.expires = thresholdTime;
    } else {
      array.push({ user, expires: thresholdTime });
    }

    removeExpiredUsers(array, currentTime);

    setChatterCount(array.length);
  }

  function setChatterCount(number) {
    const chatCount = document.querySelector(`.${classes.chatterCount}`);
    const numberString = String(number);
    const zerosToAdd = 5 - numberString.length;
    const zeroPadding = '0'.repeat(zerosToAdd);
    chatCount.innerText = zeroPadding + numberString;
  }

  function removeExpiredUsers(array, currentTime) {
    let usersToRemove = array.filter(user => user.expires <= currentTime);

    while (usersToRemove.length > 0) {
      const indexToRemove = array.findIndex(user => user.expires <= currentTime);
      array.splice(indexToRemove, 1);
      usersToRemove = array.filter(user => user.expires <= currentTime);
    }
  }


  // EVENTS
  function handleKeyPress(event) {
    if (!isPageLoaded) return;
    if (event.ctrlKey && event.keyCode === 192 || event.ctrlKey && event.shiftKey && event.keyCode === 32  || (isBigChat && event.keyCode === 27)) { toggleBigChat(); return; }
    if (event.keyCode === 27) { handleCloseModalEvent(); }
  }

  function handleMouseClick(event) {
    if (!isPageLoaded) return;
    handleCloseModalEvent(event);
    handleUserCardButtonEvent(event);
    handleNameTaggingEvent(event);
    handleCloseChattersList(event);
    if (hasClass(event.target, classes.chatAutoScroll)) { scrollToBottom(); playSound('tick-short'); }
  }

  function handleDblClick(event) {
    if (!isPageLoaded) return;
    handleHighlightUserEvent(event);
  }

  function handleCloseChattersList(event) {
    const chatters = document.querySelector(`.maejok-chatter_count`);
    const chattersListElm = document.querySelector(`.maejok-chatter_count-chatters`);
    if (!chatters.contains(event.target) && chattersListElm) chattersListElm.remove('maejok-chatter_count-chatters-show');
  }

  function handleHighlightUserEvent(event) {
    if (!config.get('enableClickHighlightUsers')) return
    const target = event.target;
    const parentSelector = '.chat-message-default_chat-message-default__JtJQL';
    const parent = target.closest(parentSelector);
    if (parent) {
      const usernameElement = parent.querySelector(`[class*="${classes.chatUsername}"]`)
      const username = usernameElement ? usernameElement.textContent.replace(/\[.*?\]/g, '') : false
      if (username) toggleUserHighlighting(username);
      if (window.getSelection) {
        const selection = window.getSelection();
        selection.removeAllRanges();
      }
    }
  }

  function handleUserCardButtonEvent(event) {
    const button = document.querySelector(`[class*="${classes.userCardActions}"] button`)
    if (event?.target === button) {
      if (button.innerText === "Profile") {
        createFriendButton();
      }
    }
  }

  function handleNameTaggingEvent(event) {
    let username = null
    let chatNameEl = null
    const isChatterList = hasClass(event.target, `maejok-chatter_count-chatter`);
    const isChatUsername = hasClass(event.target, classes.chatUsername);
    const isChatAvatar = hasClass(event.target.offsetParent, classes.chatAvatar);
    // get name from chatter list
    if (isChatterList) {
      username = event.target.textContent
      const chattersListElm = document.querySelector(`.maejok-chatter_count-chatters`);
      chattersListElm.remove('maejok-chatter_count-chatters-show');
    } else
    // get name from avatar
    if (isChatAvatar && config.get('enableAvatarTagging')) {
      const chatAvatar = event.target.parentElement
      chatNameEl = chatAvatar.parentElement
      username = chatNameEl.querySelector(`[class*="${classes.chatUsername}"]`).innerHTML
      let clan = chatNameEl.querySelector(`[class*="${classes.chatClan}"]`);
      if (clan) username = username.replace(/<span[^>]*>.*?<\/span>/, '');
    } else
    // get name from username
    if (isChatUsername && config.get('enableNameTagging')) {
      chatNameEl = event.target
      username = chatNameEl.lastChild.textContent;
    }
    // give up if no username
    if (!username) return;
    // insert tag
    tagUser(username);
  }

  function handleCloseModalEvent(event) {
    const modalContainer = document.querySelector(`[class*="${classes.modalContainer}"]`);
    const modalTitle = document.querySelector(`[class*="${classes.modalTitle}"]`)?.innerText;
    const closeBtn = modalContainer?.querySelector(`[class*="${classes.modalCloseButton}"]`);

    if (event == undefined) {
      if (modalTitle === settingsTitle){
        modalContainer.remove();
        playSound('shutter');
      }else if (closeBtn) {
        closeBtn.click();
      }
      return;
    }

    const modalBackdrop = document.querySelector(`[class*="${classes.modalBackdrop}"]`);
    const isMT2Modal = (hasClass(event?.target, 'close-btn') || event?.target === modalBackdrop) && (modalTitle === settingsTitle) || false;
    const isBGOrCloseBtn = ((event?.target === modalBackdrop) || (event?.target === closeBtn)) || false;

    if (isMT2Modal) {
      modalContainer.remove();
      playSound('shutter');
    } else if (isBGOrCloseBtn) {
      closeBtn.click();
    }
  }


  // UTILITY
  function tagUser(username){
    const chatInputElement = document.querySelector(`[class*="${classes.chatInput}"]`);
    let currentInput = chatInputElement.innerHTML;
    let updateInput = new KeyboardEvent('input', { bubbles: true });

    if (currentInput) {
      chatInputElement.innerHTML = currentInput + '&nbsp;@' + username + '&nbsp;';
    } else {
      chatInputElement.innerHTML = '@' + username + '&nbsp;';
    }
    chatInputElement.dispatchEvent(updateInput);
    setCursorPosition(chatInputElement);
    playSound('click-high-short');
  }
  function isNumeric(str) {
    if (typeof str != "string") return false
    if (str === undefined) return false
    return !isNaN(str) && !isNaN(parseFloat(str));
  }

  function hasClass(element, className) {
    if (!element || !className) return false;
    if (!element.classList) return false;
    for (var i = 0; i < element.classList.length; i++) {
      if (element.classList[i].includes(className)) return true;
    }
    return false;
  }

  function playSound(sound) {
    const audio = document.createElement('audio');
    const sounds = new Map([['equip', 'mp3'], ['denied', 'mp3'], ['chunk-short', 'mp3'], ['blip', 'mp3'], ['book', 'mp3'], ['click-high-short', 'mp3'], ['click-low-short', 'mp3'], ['xp', 'mp3'], ['level', 'mp3'], ['twinkle', 'mp3'], ['mention', 'mp3'], ['click-harsh-short', 'wav'], ['swap-short', 'wav'], ['shutter', 'wav'], ['complete', 'wav'], ['xp-down', 'wav'], ['power', 'wav'], ['daily', 'wav'], ['item-found', 'wav'], ['item-consumed', 'wav'],['panic', 'wav'], ['poll', 'wav'], ['tick-short', 'wav']]);
    const ext = sounds.get(sound);
    if (ext) {
      audio.src = `/sounds/${sound}.${ext}`;
      document.body.appendChild(audio);
      audio.play();
      audio.addEventListener('ended', () => { audio.remove(); });
    } else {
      console.error(`MAEJOK-TOOLS :: Sound '${sound}' not found`);
    }
  }

  function setCursorPosition(div) {
    let range = document.createRange();
    range.selectNodeContents(div);
    range.collapse(false);
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    div.focus();
  }

  function getUserInput(prompt, value) {
    const userInput = window.prompt(prompt, value);
    return userInput || false
  }

  function saveConfig(closeModal = true) {
    const form = document.querySelector('.maejok-settings_form');
    if (form) {
      const inputElements = form.querySelectorAll('input');
      inputElements.forEach((input) => {
        if (input.type === 'checkbox') {
          let settingKey = input.id.replace("maejok-", "");
          let value = input.checked ? true : false
          config.set(settingKey, value);
          // console.log(settingKey, value);
        } else if (input.type === 'hidden') {
          let settingKey = input.id.replace("maejok-", "");
          config.set(settingKey, input.value);
          // console.log(settingKey, input.value);
        }
      });
    }
    config.save();
    chatMutationObserver.disconnect();
    chatMutationObserver = null
    initChatMutationObserver();
    if (closeModal) {
      handleCloseModalEvent();
      startUpdateChecker();
    }
  }

  function scrollToBottom() {
    const chatMessageList = document.querySelector(`[class*="${classes.chatMessageList}"]`);
    chatMessageList.scrollTop = chatMessageList.scrollHeight;
  }



  // UPDATE
  let updateCheckIntervalId = null;
  let upToDateNoticeShown = false;
  function checkForUpdate() {
    checkVersion((hasUpdate, newVersion) => {
      if (!hasUpdate && upToDateNoticeShown) {
        console.info('MAEJOK-TOOLS IS UP TO DATE!.');
        upToDateNoticeShown = true;
      } else if (hasUpdate) {
        console.error(`\x1b[32mMAEJOK-TOOLS v${VERSION} :: UPDATE AVAILABLE!  Newest version: ${newVersion}`)
        console.error(`\x1b[32mHead on over to https://greasyfork.org/en/scripts/465416-maejok-tools-for-fishtank-live/ to update!`);

        insertChatMessage(`<div onclick="(event.target.tagName !== 'A') ? (document.getElementById('maejok-update').innerHTML = '<h4 style=\\'color:#F04;animation:notice-me 2s infinite;\\'>MAEJOK LOVES YOU!</h4>',window.open('https://greasyfork.org/en/scripts/465416-maejok-tools-for-fishtank-live/','_blank')) : null" style="animation:notice-me.3s 7;margin:4px;cursor:pointer;margin-top:10px;text-align:center;padding:10px"><div id="maejok-update"><h2 style="font-size:1.2rem;margin:0;color:#f07">MAEJOK-TOOLS</h2><p style="font-size:1rem;color:#fff"><b>Click to Update</b></p></div><div style="text-align:center;margin:5px 0 5px;font-size:.8rem;color:#fff">[ <a class="maejok-update" href="https://github.com/maejok-xx/MAEJOK-TOOLS-FISHTANK/blob/main/changelogs/${newVersion}.md" target="_blank">view change log</a> - <a class="maejok-update" href="#" onclick="event.preventDefault();document.getElementById('maejok-update').parentElement.remove();">dismiss</a> ]</div></div>`)

        clearInterval(updateCheckIntervalId);
        updateCheckIntervalId = null;
        upToDateNoticeShown = false;
        playSound('mention');
      }
    });
  }

  function startUpdateChecker() {
    if (!config.get('enableUpdateChecks')) {
      if (!updateCheckIntervalId) console.log('MAEJOK-TOOLS :: Update Checking Disabled');

      clearInterval(updateCheckIntervalId);
      updateCheckIntervalId = null;
    } else {
      checkForUpdate();
      updateCheckIntervalId = setInterval(checkForUpdate, config.get('updateCheckFrequency')*60*1000);
    }
  }

  function checkVersion(callback) {
    const ts = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    fetch(`https://raw.githubusercontent.com/maejok-xx/MAEJOK-TOOLS-FISHTANK/main/version.txt?cb=${ts}`)
    // fetch(`https://gist.githubusercontent.com/maejok-xx/50849b97b7262f19e40ebef6262d919f/raw/version.txt?cb=${ts}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`MAEJOK-TOOLS :: Update Checker failed with status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        const latestVersion = data.trim();
        if (latestVersion !== VERSION) {
          callback(true, latestVersion,);
        } else {
          callback(false);
        }
      })
      .catch(error => {
        console.error('MAEJOK-TOOLS Update Checker Error:', error);
        callback(false);
      });
  }

  function insertChatMessage(html){
    const chat = document.querySelector(`[class^="${classes.chatMessageList}"]`)
    const chatMessageDiv = document.createElement('div');
    chatMessageDiv.className = 'chat-message-default_chat-message-default__JtJQL';
    const innerDiv = document.createElement('div');
    innerDiv.className = 'chat-message-default_body__iFlH4';
    innerDiv.style.display = 'block';
    const messageSpan = document.createElement('span');
    messageSpan.className = 'chat-message-default_message__milmT';
    messageSpan.innerHTML = html;
    innerDiv.appendChild(messageSpan);
    chatMessageDiv.appendChild(innerDiv);
    chat.appendChild(chatMessageDiv);
    scrollToBottom();
  }

  function insertChangelog() {
      sessionStorage.removeItem('maejok-showChangelog');
      insertChatMessage(`<div id="maejok-changelog" style="animation:notice-me.3s 7;margin:4px;cursor:pointer;margin-top:10px;text-align:center;padding:10px"><h2 style="font-size:1.2rem;margin:0;color:#f07">MAEJOK-TOOLS</h2><p style="font-size:1rem;color:#fff"><b>Has been updated to v${VERSION}!</b></p><p style="font-size:.7rem;color:#fff">Refresh to start using it</p><div style="text-align:center;margin:5px 0 5px;font-size:.8rem;color:#fff">[ <a class="maejok-update" href="https://github.com/maejok-xx/MAEJOK-TOOLS-FISHTANK/blob/main/changelogs/${VERSION}.md" target="_blank">view change log</a> - <a class="maejok-update" href="#" onclick="event.preventDefault();document.getElementById('maejok-changelog').remove();">dismiss</a> ]</div></div>`);
  }

  // OBSERVERS
  let chatMutationObserver = null;
  function initChatMutationObserver() {
    const configChecks = ['disableTimestamps', 'enableDenseChat', 'disableChatClan', 'disableAvatars', 'disableEmotes', 'disableHappenings'];

    if (configChecks.every(check => !config.get(check))) { chatMutationObserver?.disconnect(); }
    if (chatMutationObserver) return;

    const chatMessageList = document.querySelector(`[class*="${classes.chatMessageList}"]`);

    if (!config.get('enableDenseChat')){
      document.querySelectorAll('[class*="mTS2-denseChat"]').forEach(function(element) {
        element.classList.forEach(function(className) {
          if (className.startsWith('mTS2-denseChat')) {
            element.classList.remove(className);
          }
        });
      });
    }

    const options = [
      { selector: `[class*="${classes.chatClan}"]`, condition: config.get('disableChatClans') },
      { selector: `[class*="${classes.chatTimestamps}"]`, condition: config.get('disableTimestamps') },
      { selector: `[class*="${classes.chatXPLevel}"]`, condition: config.get('disableLevels') },
      { selector: `[class*="${classes.chatAvatar}"] img`, condition: config.get('disableAvatars') },
      { selector: `[class*="${classes.chatEmote}"]`, condition: config.get('disableEmotes') },
      { selector: `[class*="${classes.chatSystem}"]`, condition: config.get('disableSystemMessages') },
      { selector: `[class*="${classes.chatHappening}"]`, condition: config.get('disableHappenings') },
    ];

    options.forEach(option => {
      document.querySelectorAll(option.selector).forEach(element => {
        option.condition ? element.classList.add('mTS2-chat-hide') : element.classList.remove('mTS2-chat-hide');
      });
    });

    // HIGHLIGHT
    const highlighted = config.get('highlighted');
    const friends = config.get('friends');
    const messages = document.querySelectorAll(`[class*="${classes.chatMessageOuter}"]`);
    messages.forEach(element => {
      const userElm = element.querySelector(`[class*="${classes.chatUsername}"]`);
      if (userElm) {
        const username = userElm.innerHTML.replace(/<span[^>]*>.*?<\/span>/, '');
        const highlightedIndex = highlighted.indexOf(username);
        const friendIndex = friends.indexOf(username);
        (highlightedIndex !== -1) ? element.classList.add('maejok-highlighted-user') : element.classList.remove('maejok-highlighted-user');
        (friendIndex !== -1) ? element.classList.add('maejok-friend-user') : element.classList.remove('maejok-friend-user');
      }
    });

    toggleDenseChat();

    // NEW MESSAGES
    chatMutationObserver = new MutationObserver(function (mutationsList, observer) {
      mutationsList.forEach((mutation) => {
        if (mutation.type !== 'childList' || mutation.addedNodes.length === 0) return;
        mutation.addedNodes.forEach((addedNode) => {
          if (!addedNode instanceof HTMLElement) return;

          // update chatters list / highlight users
          const userElm = addedNode.querySelector(`[class*="${classes.chatUsername}"]`);
          let username = '';
          if (userElm) {
            username = userElm.innerHTML.replace(/<span[^>]*>.*?<\/span>/, '');
            if (config.get('enableRecentChatters')) {
                updateChattersList(username, chattersList);
            }

            // HIGHLIGHT USERS
            const highlighted = config.get('highlighted');
            const highlightedIndex = highlighted.indexOf(username);
            if (highlightedIndex !== -1) {
              addedNode.classList.add('maejok-highlighted-user')
            }else{
              addedNode.classList.remove('maejok-highlighted-user');
            }
            const friends = config.get('friends');
            const friendsIndex = friends.indexOf(username);
            if (friendsIndex !== -1) {
              addedNode.classList.add('maejok-friend-user')
            }else{
              addedNode.classList.remove('maejok-friend-user');
            }
          }

          // clear chatters on room change
          let systemMessage = addedNode.querySelector(`[class*="${classes.chatSystem}"] div`);
          if (systemMessage) {
            const msg = systemMessage.textContent;
            if (msg.includes('Joined ')) updateChattersList(my.name, chattersList, true);
          }
          // end clear chatters

          let usernameColor = null;
          const chatXPLevel = addedNode.querySelector(`[class*="${classes.chatXPLevel}"]`);
          const chatUsername = addedNode.querySelector(`[class*="${classes.chatUsername}"]`);

          // DENSE CHAT
          if (chatUsername) usernameColor = chatUsername.getAttribute('style') || null;
          if (chatUsername && config.get('disableAvatars')) {
            chatUsername.style.cssText = `${usernameColor}${chatXPLevel && !config.get('disableLevels') ? `margin-left: ${chatXPLevel.offsetWidth + 2}px;` : ''}`;
          }
          if (chatXPLevel && config.get('disableAvatars')) chatXPLevel.classList.add('mTS2-denseChat-chatXPLevel-disableAvatars');

          toggleDenseChat(addedNode)

          // HIDE OTHER
          const options = [
            { selector: `[class*="${classes.chatEmote}"]`, condition: config.get('disableEmotes') },
            { selector: `[class*="${classes.chatMedal}"]`, condition: config.get('disableMedals') },
            { selector: `[class*="${classes.chatClan}"]`, condition: config.get('disableChatClans') },
            { selector: `[class*="${classes.chatXPLevel}"]`, condition: config.get('disableLevels') },
            { selector: `[class*="${classes.chatAvatar}"] img`, condition: config.get('disableAvatars') },
            { selector: `[class*="${classes.chatSystem}"] div`, condition: config.get('disableSystemMessages') },
            { selector: `[class*="${classes.chatHappening}"]`, condition: config.get('disableHappenings') },
            { selector: `[class*="${classes.chatTimestamps}"]`, condition: config.get('disableTimestamps') },
          ];

          options.forEach(option => {
            if (option.condition) {
              const system = `[class*="${classes.chatSystem}"] div`
              if (option.selector === system && addedNode.querySelector(system)) {
                  addedNode.classList.add('mTS2-chat-hide');
              } else {
                addedNode.querySelectorAll(option.selector).forEach(element => element.classList.add('mTS2-chat-hide'));
              }

              if (option.condition && option.selector === `[class*="${classes.chatMedal}"]`) {
                const message = addedNode.querySelector(`[class*="${classes.chatMessage}"]`);
                if (message && !message.innerText) {
                  addedNode.classList.add('mTS2-chat-hide');
                }
              }
            }
          });

        });
      });
    });
    chatMutationObserver.observe(chatMessageList, { attributes: false, childList: true, subtree: false, attributeOldValue: false });
  }


  // INITIALIZATIONS
  const settingsTitle = 'MAEJOK-TOOLS SETTINGS';
  const initConfig = () => {
    const settings = {
      // default settings, overwritten after saving once.
      enableUpdateChecks: true,
      updateCheckFrequency: 30,
      enableBigChat: true,
      persistBigChat: true,
      bigChatState: false,
      showTimerBigChat: false,
      enableNameTagging: true,
      enableAvatarTagging: true,
      disableTimestamps: true,
      enableDenseChat: false,
      disableChatClans: false,
      disableAvatars: false,
      disableEmotes: false,
      disableSystemMessages: false,
      disableHappenings: false,
      disableMedals: false,
      disableLevels: false,
      autoClanChat: false,
      enableRecentChatters: true,
      chattersThreshold: 10,
      enableClickHighlightUsers: true,
      highlighted: [],
      friends: [],
      agreementAccepted: false,
    };

    const get = (key) => { return settings[key]; };

    const set = (key, value) => {
      if (settings.hasOwnProperty(key)) { settings[key] = value; }
    };

    const load = () => {
      const storedSettings = JSON.parse(localStorage.getItem('s2_maejoktools-settings'));
      if (!storedSettings) return
      for (const key in storedSettings) {
        if (settings.hasOwnProperty(key)) { settings[key] = storedSettings[key]; }
      }
    };

    const save = () => {
      const storedSettings = {};
      for (const key in settings) {
        if (settings.hasOwnProperty(key)) { storedSettings[key] = settings[key]; }
      }
      localStorage.setItem('s2_maejoktools-settings', JSON.stringify(storedSettings));
    };

    return { get, set, load, save };
  };

  const config = initConfig();

  let isPageLoaded = false;
  let my = { name: null, clan: null }
  function start() {
    const initWait = setInterval(() => {
      const chatBoxElement = document.querySelector(`[class*="${classes.chatBox}`);
      if (chatBoxElement) {
        clearInterval(initWait);
        config.load();
        isPageLoaded = true;

        const chatMessagesElement = document.querySelector(`[class*="${classes.chatMessages}"]`);
        chatMessagesElement.style.padding = '0';

        const displayNameElement = document.querySelector(`[class*="${classes.topBarDisplayName}"]`);
        const clanNameElement = document.querySelector(`[class*="${classes.topBarClan}"]`);
        my.name = displayNameElement.textContent;
        my.clan = clanNameElement.textContent;

        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('click', handleMouseClick);
        document.addEventListener('dblclick', handleDblClick);

        initChatMutationObserver();
        createSettingsButton();
        joinClanChat();
        initRecentChatters();

        console.log('MAEJOK-TOOLS :: Running');
        startUpdateChecker();

        sessionStorage.getItem('maejok-showChangelog') ? insertChangelog() : null;

        if (config.get('persistBigChat')) {
          setTimeout(() => { if (config.get('bigChatState')) toggleBigChat(); }, 500);
        }
      }
    }, 10);
  }

  config.load();
  config.get('agreementAccepted') === VERSION ? start() : runAgreement();
  function runAgreement() {
    var agreement = prompt(`\nAGREEMENT:\n\nBy using MAEJOK-TOOLS you understand that this plugin is NOT endorsed nor promoted by Fishtank Live or its creators, therefore, any bugs or issues caused by the use of this plugin is NOT their problem.\n\nIf you have any issues with the site while using this plugin, DISABLE THE PLUGIN AND CONFIRM THE ISSUE STILL EXISTS BEFORE SAYING ANYTHING TO WES OR ANY OTHER STAFF.\n\nIf the problem is caused by the plugin, contact @maejok. Not Wes, not Jet... only @maejok.\n\nPLEASE, do not make bugs caused by this plugin Wes' problem or confuse him with errors that he has nothing to do with!!!\n\nIf you understand that Wes cannot and will not help you with this plugin and that this plugin may cause issues for you on the site, type \"yes sir\" below.\n\nAGAIN, DISABLE THIS PLUGIN AND MAKE SURE THIS PLUGIN ISN'T CAUSING YOUR ISSUES BEFORE YOU MAKE ANY BUG REPORTS TO WES!!!\n\nThis will show once per update.`);
    if (agreement === "yes sir") {
      config.set('agreementAccepted', VERSION);
      config.save();
      sessionStorage.setItem('maejok-showChangelog', true);
      setTimeout(() => { window.location.reload(); }, 500);
    } else {
      alert('You did not accept the agreement.  MAEJOK-TOOLS will not load.\nDisable the MAEJOK-TOOLS plugin to disable this alert.')
    }
  }

  // STYLES
  GM_addStyle(`
        .maejok-about a,
        .maejok-about a:visited {
          text-decoration: none;
          font-weight: 600;
          color: #11f8ff
        }

        .maejok-about .container {
          background-color: rgba(0,0,0,0.35);
          padding: 25px;
        }

        .maejok-about h1 {
          text-align: center;
          margin-bottom: 20px;
          color: rgb(200, 0, 200);
        }

        .maejok-about p {
          margin: 0 0 20px;
          color: white;
        }

        .maejok-settings_tab-content {
          // display: none;
          color: white;
        }

        .maejok-settings_tab-bar {
          display: flex;
          gap: 2px;
          margin-bottom: 20px;
        }

        .maejok-settings_tab-button {
          flex: 1;
          border: none;
          cursor: pointer;
          width: 100px;
          text-transform: uppercase;
        }

        .maejok-chatter_count {
          position: relative;
          display: inline-block;
          padding: 5px;
          cursor: pointer;
        }

        .maejok-chatter_count-chatters {
          display: none;
          position: absolute;
          height: auto;
          width: 200px;
          max-height: 300px;
          overflow-y: auto;
          overflow-x: hidden;
          z-index: 10;
          // background-color: #111;
          // padding: 2px;
        }

        .maejok-chatter_count-chatter {
          padding: 5px;
          color: #eee;
          background-color: #444;
          width: 200px;
          border-bottom: 1px solid #333;
        }
        .maejok-chatter_count-chatter:hover {
          color: #f0c841;
          background-color: #444;
          border-left: 3px solid white;
          cursor: pointer;
        }

        .maejok-chatter_count-chatters-show {
          display: block;
        }

        .maejok-update,
        .maejok-update:visited {
          text-decoration: none;
          color: #11f8ff;
        }

        .maejok-highlighted-user{
          background-color: rgba(245, 39, 39, 0.16)!important;
          border: 1px solid rgba(245, 39, 39, 0.26)!important;
        }

        .maejok-friend-user{
          background-color: rgba(39, 245, 39, 0.06);
          border: 1px solid rgba(39, 245, 39, 0.16);
        }

        .mTS2-chatBox-BigChat {
          top: 0!important;
          left: 0!important;
          z-index: 1!important;
          width: 100%!important;
          height: 100%!important;
          position: fixed!important;
        }

        .mTS2-countdown-BigChat-hide {
            z-index: -2!important;
        }

        .mTS2-countdown-BigChat-show {
            z-index: 4!important;
        }

        .mTS2-chatters-BigChat {
            position: absolute;
            left: 100px;
        }

        .mTS2-chatMessages-BigChat {
            height: 81%!important;
            border: 0!important;
            padding: 0!important;
            margin-bottom: 0!important;
            background-color: rgba(0, 0, 0, 0.0)!important;
        }

        .mTS2-chatInput-BigChat {
            margin-left: 6px!important;
            margin-right: 6px!important;
        }

        .mTS2-xpBar-BigChat {
          z-index: 20!important;
          margin-top: 40px!important;
            width: calc(100% + 170px)!important;
        }

        .mTS2-topBarUser-BigChat {
            visibility: hidden!important;
        }

        .mTS2-topBarTitle-BigChat {
            z-index: 22!important;
        }

        .mTS2-topBar-BigChat {
            z-index: 22!important;
        }

        .mTS2-topBarLogo-BigChat {
            margin-top: -34px!important;
            margin-left: 140px!important;
        }

        .mTS2-modalCloseButton {
            min-width: unset!important;
        }

        .mTS2-denseChat {
            padding: 0px;!important;
            flex-direction: initial!important;
        }

        .mTS2-denseChat-chatMessageList {
          gap: 0px!important;
          padding:5px!important;
      }

      .mTS2-denseChat-chatXPLevel-disableAvatars {
          top: unset!important;
          left: unset!important;
      }

      .mTS2-chat-hide {
          display: none!important;
      }

      .mTS2-mobileNavPanel-BigChat {
        display: none!important;
      }

      @keyframes notice-me {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(0.9);
        }
      }

      @media screen and (max-width: 1100px) {
          .mTS2-topBar-BigChat {
              display: none!important;
          }
          .mTS2-xpBar-BigChat {
            width: 50%!important;
            z-index: 20!important;
            grid-row: 6/6!important;
            margin-bottom: 15px!important;
          }
          .mTS2-chatters-BigChat {
            left: 145px!important;
            position: absolute!important;
          }
      }
      @media screen and (max-width: 800px) {
          .mTS2-xpBar-BigChat {
              width: 25%!important;
          }
          .mTS2-chatters-BigChat {
            left: 130px!important;
            position: absolute!important;
          }
      }
  `);
})();
