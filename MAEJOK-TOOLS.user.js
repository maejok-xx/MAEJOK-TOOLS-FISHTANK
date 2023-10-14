// ==UserScript==
// @name         MAEJOK-TOOLS for Fishtank.live
// @description  Tools for Fishtank.live Season 2!
// @author       maejok-xx
// @version      2.4.1
// @license      GNU GPLv3
// @homepageURL  https://github.com/maejok-xx/MAEJOK-TOOLS-FISHTANK
// @namespace    https://greasyfork.org/en/scripts/465416-maejok-tools-for-fishtank-live
// @icon         https://www.google.com/s2/favicons?domain=fishtank.live
// @match        *://*.fishtank.live/*
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';
    const VERSION = '2.4.1';

    // ---- CONFIG ----
    const elms = {
      mainHome: 'home_home',
      // chat
      chatHeader: 'chat_header',
      chatPresence: 'chat_presence',
      // chat box
      chatBox: 'chat_chat__2rdNg',
      // chat messages
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
      // top bar
      topBar: 'top-bar_top-bar',
      topBarUser: 'top-bar_user',
      topBarTitle: 'top-bar_title',
      topBarLogo: 'top-bar_logo',
      topBarClan: 'top-bar_clan',
      // modal
      modalBackdrop: 'modal_backdrop__94Bu6',
      modalContainer: 'modal_modal-container__iQODa',
      modalModal: 'modal_modal__MS70U',
      modalHeader: 'modal_header__O0ebJ',
      modalTitle: 'modal_title__TdXFC',
      modalCloseButton: 'close-button',
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

      add: {
        chatPresence: 'chat_presence__90XuO',
        chatCount: 'chat_count__D7xic',
        modalClose: ['close-button_close-button__BKUKA', 'close-button_sm__n0dZT'],
      }
    };

    let isPageLoaded = false;

    // ---- ADD SETTINGS BUTTON ----
    function createSettingsPanel() {
      if (!isPageLoaded || document.querySelector(`.${elms.modalContainer}`)) return;

      if (isBigChat) toggleBigChat();


      config.load();

      const mainHomeElement = document.querySelector(`[class*="${elms.mainHome}"]`);

      const settingsModalContainer = document.createElement('div');
      settingsModalContainer.classList.add(`${elms.modalContainer}`);
      settingsModalContainer.setAttribute('style', 'z-index: 997!important');

      const settingsModalBackdrop = document.createElement('div');
      settingsModalBackdrop.classList.add(`${elms.modalBackdrop}`);
      settingsModalBackdrop.setAttribute('style', 'z-index: 998!important');

      const settingsModal = document.createElement('div');
      settingsModal.classList.add(`${elms.modalModal}`);
      settingsModal.setAttribute('style', 'z-index: 999!important');

      const modalHeader = document.createElement('div');
      modalHeader.classList.add(`${elms.modalHeader}`);

      const modalBody = document.createElement('div');
      modalBody.classList.add(`${elms.modalBody}`);
      modalBody.style.margin = '3px 10px';
      modalBody.style.padding = '10px';

      const modalTitle = document.createElement('div');
      modalTitle.classList.add(`${elms.modalTitle}`);

      const modalTitleText = document.createElement('h2');
      modalTitleText.textContent = settingsTitle;

      const closeButtonContainer = document.createElement('div');
      closeButtonContainer.classList.add('modal_close__E9CBl');

      const closeButton = document.createElement('button');
      closeButton.classList.add(...elms.add.modalClose);
      closeButton.setAttribute('style', 'min-width: 0px!important');

      const closeButtonIcon = document.createElement('img');
      closeButtonIcon.classList.add(`close-btn`);
      closeButtonIcon.setAttribute('alt', 'Close');
      closeButtonIcon.setAttribute('width', '32');
      closeButtonIcon.setAttribute('height', '32');
      closeButtonIcon.setAttribute('src', 'https://cdn.fishtank.live/images/slices/close.png');

      const screws = document.querySelector(`[class*="${elms.modalScrews}"]`).cloneNode(true);

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

      screws.querySelector(`[class*="${elms.modalScrewsTR}"]`).remove()
      addSettingsBody(modalBody);
    }


    function closeModal() {
      if (!isPageLoaded) return;

      const modalContainer = document.querySelector(`[class*="${elms.modalContainer}"]`);
      if (!modalContainer) return;

      const chatBox = document.querySelector(`[class*="${elms.chatBox}"]`);
      chatBox.setAttribute('style', 'z-index: 4');

      const modalTitle = modalContainer.querySelector(`[class*="${elms.modalTitle}"] > h2`).innerHTML;
      if (modalTitle == settingsTitle) {
        const modalBackdrop = document.querySelector(`[class*="${elms.modalBackdrop}"]`);
        modalBackdrop.remove();
        modalContainer.remove();
      } else {
        const modalCloseButton = modalContainer.querySelector(`[class*="${elms.modalCloseButton}"]`);
        modalCloseButton.click();
      }
    }


    function createSettingsButton() {
      if (!isPageLoaded) return;
      const chatInputActionsElement = document.querySelector(`[class*="${elms.chatInputActions}"]`);
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
      const form = document.createElement('form');

      form.classList.add('maejok-settings_form');

      form.addEventListener('submit', (event) => { event.preventDefault(); saveConfig(); });

      const enableRecentChatters = createCheckbox('Enable Chatter Count', 'enableRecentChatters', ['Threshold', 'How long should someone be considered active in chat? (in minutes) (Default: 10)', [config.get('chattersThreshold'), 'min.', 'chattersThreshold']]);
      form.appendChild(enableRecentChatters);

      const enableBigChat = createCheckbox('Big Chat Mode (Hit CTRL+` or CTRL+SHIFT+SPACE to toggle)', 'enableBigChat');
      form.appendChild(enableBigChat);

      const hideTimerBigChat = createCheckbox('Hide Countdown in Big Chat Mode', 'hideTimerBigChat');
      form.appendChild(hideTimerBigChat);

      const enableClickHighlightUsers = createCheckbox('Double-Click Message to Highlight All Users Messages', 'enableClickHighlightUsers');
      form.appendChild(enableClickHighlightUsers);

      const enableAvatarTagging = createCheckbox('Avatar Click-To-Tag (chat)', 'enableAvatarTagging');
      form.appendChild(enableAvatarTagging);

      const enableNameTagging = createCheckbox('Username Click-To-Tag (chat & hover user card)', 'enableNameTagging');
      form.appendChild(enableNameTagging);

      const enableDenseChat = createCheckbox('Enable Dense Chat', 'enableDenseChat');
      form.appendChild(enableDenseChat);

      const autoClanChat = createCheckbox('Auto-Join Clan Chat', 'autoClanChat');
      form.appendChild(autoClanChat);

      const disableTimestamps = createCheckbox('Hide Timestamps (chat)', 'disableTimestamps');
      form.appendChild(disableTimestamps);

      const disableChatClans = createCheckbox('Hide Clans (chat)', 'disableChatClans');
      form.appendChild(disableChatClans);

      const disableLevels = createCheckbox('Hide XP (chat)', 'disableLevels');
      form.appendChild(disableLevels);

      const disableAvatars = createCheckbox('Hide Avatars (chat)', 'disableAvatars');
      form.appendChild(disableAvatars);
      const disableEmotes = createCheckbox('Hide Emotes (chat)', 'disableEmotes');
      form.appendChild(disableEmotes);

      const disableHappenings = createCheckbox('Hide Happenings (chat)', 'disableHappenings');
      form.appendChild(disableHappenings);

      const disableMedals = createCheckbox('Hide Medals (chat)', 'disableMedals');
      form.appendChild(disableMedals);

      const disableSystemMessages = createCheckbox('Hide System Messages (chat) (join/clan notices, War Toys, etc)', 'disableSystemMessages');
      form.appendChild(disableSystemMessages);

      // save button
      const saveButton = document.createElement('button');
      saveButton.classList.add('console-button-long_console-button-long__G6irT');
      saveButton.classList.add('console-button-long_lg__hdQwz');
      saveButton.setAttribute('type', 'submit');
      saveButton.setAttribute('style', 'margin-top: 20px;');
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
    }


    // ---- CREATE SETTINGS FORM ELEMENTS
    function createCheckbox(label, id, prompt = false /* eg: ['link text', 'prompt text', ['default value', 'text to go with value (minutes,etc)'], ] */) {
      const elmId = `maejok-${id}`
      const inputInput = document.createElement('div');
      inputInput.classList.add(`${elms.inputInput}`);
      inputInput.setAttribute('style', 'display: flex!important; margin-top: 10px!important');

      const inputLabel = document.createElement('label');
      inputLabel.setAttribute('style', 'flex-direction: row-reverse!important;');

      const inputLabelText = document.createElement('label');
      inputLabelText.classList.add(`${elms.inputLabel}`);
      inputLabelText.setAttribute('for', elmId);
      inputLabelText.setAttribute('style', 'padding-top: 2px!important;');
      inputLabelText.textContent = label

      const inputWrapper = document.createElement('div');
      inputWrapper.classList.add(`${elms.inputWrapper}`);

      const inputElement = document.createElement('input');
      inputElement.setAttribute('type', 'checkbox');
      inputElement.setAttribute('style', 'height: 20px; width: 20px');
      inputElement.checked = config.get(id);
      inputElement.id = elmId;

      if (prompt) {
        const hiddenElmId = `maejok-${prompt[2][2]}`
        const promptSpan = document.createElement('span');
        promptSpan.style.color = '#000';
        promptSpan.style.fontWeight = '600';

        const promptSpanText = document.createElement('a');
        promptSpanText.style.fontWeight = '600';
        promptSpanText.style.fontSize = '14px';
        promptSpanText.style.color = 'darkBlue';
        promptSpanText.style.textDecoration = 'none';
        promptSpanText.textContent = prompt[0]

        const openBracket = document.createTextNode('[');
        const currentValue = document.createTextNode(` (${prompt[2][0]}${[prompt[2][1]]})`);
        const closeBracket = document.createTextNode(']');

        const promptInput = document.createElement('input');
        promptInput.id = hiddenElmId;
        promptInput.type = 'hidden';
        promptInput.value = prompt[2][0]

        promptSpan.appendChild(openBracket);
        promptSpan.appendChild(promptSpanText);
        promptSpan.appendChild(currentValue);
        promptSpan.appendChild(closeBracket);
        promptSpan.appendChild(promptInput);

        promptSpanText.href = '#';
        promptSpanText.onclick = () => {
          const promptInput = getUserInput(prompt[1]) || false;
          const input = isNumeric(promptInput) ? promptInput : prompt[2][0];
          if (!input) return;
          config.set(id, input);
          currentValue.textContent = ` (${input}${[prompt[2][1]]})`;

          document.getElementById(hiddenElmId).value = input;
        };

        inputLabel.appendChild(promptSpan);
      }

      inputLabel.appendChild(inputLabelText);
      inputInput.appendChild(inputLabel);
      inputLabel.appendChild(inputWrapper);
      inputWrapper.appendChild(inputElement);

      return inputInput
    }


    function getUserInput(prompt, value) {
      const userInput = window.prompt(prompt, value);
      return userInput || false
    }


    function saveConfig() {
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
      closeModal();
    }


    // --- JOIN CLAN CHAT ----
    function joinClanChat() {
      const autoClanChatEnabled = config.get('autoClanChat');
      if (!autoClanChatEnabled) return;

      const clanButton = document.querySelector(`[class*="${elms.topBarClan}"] button`);
      const clanName = clanButton?.innerText;

      if (!clanName) return;

      const chatRoomButtons = document.querySelectorAll(`.${elms.chatRoomsList} button span`);

      chatRoomButtons.forEach(room => {
        if (room.innerText === clanName) room.click();
      });
    }


    // ---- BIG CHAT ----
    let isBigChat = false;
    function toggleBigChat() {
      if (!isPageLoaded || !config.get('enableBigChat')) return;

      const chatBoxElement = document.querySelector(`[class*="${elms.chatBox}"]`);
      const chatMessagesElement = document.querySelector(`[class*="${elms.chatMessages}"]`);
      const chatInputFormElement = document.querySelector(`[class*="${elms.chatInputForm}"]`);
      const chatChatterCountElement = document.querySelector(`.maejok-chatterCount`);
      const xpBarElement = document.querySelector(`[class*="${elms.xpBar}"]`);
      const topBarElement = document.querySelector(`[class*="${elms.topBar}"]`);
      const topBarUserElement = document.querySelector(`[class*="${elms.topBarUser}"]`);
      const topBarTitleElement = document.querySelector(`[class*="${elms.topBarTitle}"]`);
      const topBarLogoElement = document.querySelector(`[class*="${elms.topBarLogo}"]`);
      const happeningMessageElement = document.querySelector(`[class*="${elms.happeningMessage}"]`);
      const countDownTimerElement = document.querySelector(`[class*="${elms.countDownTimer}"]`);

      if (chatBoxElement) {
        chatBoxElement.classList.toggle('mTS2-chatBox-popOut');
        chatMessagesElement.classList.toggle('mTS2-chatMessages-popOut');
        chatInputFormElement.classList.toggle('mTS2-chatInput-popOut');
        chatChatterCountElement.classList.toggle('mTS2-chatters-popOut');
        xpBarElement.classList.toggle('mTS2-xpBar-popOut');
        topBarElement.classList.toggle('mTS2-topBar-popOut');
        topBarUserElement.classList.toggle('mTS2-topBarUser-popOut');
        topBarTitleElement.classList.toggle('mTS2-topBarTitle-popOut');
        topBarLogoElement.classList.toggle('mTS2-topBarLogo-popOut');
        if (config.get('hideTimerBigChat')) countDownTimerElement.classList.toggle('mTS2-countdown-popOut-hide');
        if (!config.get('hideTimerBigChat')) countDownTimerElement.classList.toggle('mTS2-countdown-popOut-show');

        if (happeningMessageElement) happeningMessageElement.style.textAlign = isBigChat ? 'unset' : 'center';
        xpBarElement.style.transition = 'margin-top 0.5s';
      }

      isBigChat = !isBigChat;
    }


    // ---- CHAT MUTATION / TIMESTAMP / DENSE CHAT ----
    let chatMutationObserver = null
    let chattersList = []
    function initChatMutationObserver(bool) {
      const configChecks = ['disableTimestamps', 'enableDenseChat', 'disableChatClan', 'disableAvatars', 'disableEmotes', 'disableHappenings'];

      if (configChecks.every(check => !config.get(check))) { chatMutationObserver?.disconnect(); }
      if (chatMutationObserver) return;

      const chatMessageList = document.querySelector(`[class*="${elms.chatMessageList}"]`);

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
        { selector: `[class*="${elms.chatClan}"]`, condition: config.get('disableChatClans') },
        { selector: `[class*="${elms.chatTimestamps}"]`, condition: config.get('disableTimestamps') },
        { selector: `[class*="${elms.chatXPLevel}"]`, condition: config.get('disableLevels') },
        { selector: `[class*="${elms.chatAvatar}"] img`, condition: config.get('disableAvatars') },
        { selector: `[class*="${elms.chatEmote}"]`, condition: config.get('disableEmotes') },
        { selector: `[class*="${elms.chatSystem}"]`, condition: config.get('disableSystemMessages') },
        { selector: `[class*="${elms.chatHappening}"]`, condition: config.get('disableHappenings') },
      ];

      options.forEach(option => {
        document.querySelectorAll(option.selector).forEach(element => {
          option.condition ? element.classList.add('mTS2-chat-hide') : element.classList.remove('mTS2-chat-hide');
        });
      });

      // HIGHLIGHT
      const highlighted = config.get('highlightedUsers');
      const friends = config.get('friends');
      const messages = document.querySelectorAll(`[class*="${elms.chatMessageOuter}"]`);
      messages.forEach(element => {
        const userElm = element.querySelector(`[class*="${elms.chatUsername}"]`);
        if (userElm) {
          const username = userElm.innerHTML.replace(/<span[^>]*>.*?<\/span>/, '');
          const highlightedIndex = highlighted.indexOf(username);
          const friendIndex = friends.indexOf(username);
          (highlightedIndex !== -1) ? element.classList.add('maejok-highlighted-user') : element.classList.remove('maejok-highlighted-user');
          (friendIndex !== -1) ? element.classList.add('maejok-friend-user') : element.classList.remove('maejok-friend-user');
        }
      });

      setDenseChat();

      chatMessageList.scrollTop = chatMessageList.scrollHeight;

      // NEW MESSAGES
      chatMutationObserver = new MutationObserver(function (mutationsList, observer) {
        mutationsList.forEach((mutation) => {
          if (mutation.type !== 'childList' || mutation.addedNodes.length === 0) return;
          mutation.addedNodes.forEach((addedNode) => {
            if (!addedNode instanceof HTMLElement) return;

            // update chatters list / highlight users
            const userElm = addedNode.querySelector(`[class*="${elms.chatUsername}"]`);
            let username = '';
            if (userElm) {
              username = userElm.innerHTML.replace(/<span[^>]*>.*?<\/span>/, '');
              if (config.get('enableRecentChatters')) {
                  updateChattersList(username, chattersList);
              }

              // HIGHLIGHT USERS
              const highlighted = config.get('highlightedUsers');
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

            let usernameColor = null;
            const chatXPLevel = addedNode.querySelector(`[class*="${elms.chatXPLevel}"]`);
            const chatUsername = addedNode.querySelector(`[class*="${elms.chatUsername}"]`);

            // DENSE CHAT
            if (chatUsername) usernameColor = chatUsername.getAttribute('style') || null;
            if (chatUsername && config.get('disableAvatars')) {
              chatUsername.style.cssText = `${usernameColor}${chatXPLevel && !config.get('disableLevels') ? `margin-left: ${chatXPLevel.offsetWidth + 2}px;` : ''}`;
            }
            if (chatXPLevel && config.get('disableAvatars')) chatXPLevel.classList.add('mTS2-denseChat-chatXPLevel-disableAvatars');

            setDenseChat(addedNode)

            // HIDE OTHER
            const options = [
              { selector: `[class*="${elms.chatEmote}"]`, condition: config.get('disableEmotes') },
              { selector: `[class*="${elms.chatMedal}"]`, condition: config.get('disableMedals') },
              { selector: `[class*="${elms.chatClan}"]`, condition: config.get('disableChatClans') },
              { selector: `[class*="${elms.chatXPLevel}"]`, condition: config.get('disableLevels') },
              { selector: `[class*="${elms.chatAvatar}"] img`, condition: config.get('disableAvatars') },
              { selector: `[class*="${elms.chatSystem}"] div`, condition: config.get('disableSystemMessages') },
              { selector: `[class*="${elms.chatHappening}"]`, condition: config.get('disableHappenings') },
              { selector: `[class*="${elms.chatTimestamps}"]`, condition: config.get('disableTimestamps') },
            ];

            options.forEach(option => {
              if (option.condition) {
                const system = `[class*="${elms.chatSystem}"] div`
                if (option.selector === system && addedNode.querySelector(system)) {
                    addedNode.classList.add('mTS2-chat-hide');
                } else {
                  addedNode.querySelectorAll(option.selector).forEach(element => element.classList.add('mTS2-chat-hide'));
                }

                if (option.condition && option.selector === `[class*="${elms.chatMedal}"]`) {
                  const message = addedNode.querySelector(`[class*="${elms.chatMessage}"]`);
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

    function setDenseChat(addedNode){
      const toDensify = [ 'chatEmote', 'chatSystem', 'chatHappening', 'chatTimestamps' ];
      const chatMessageList = document.querySelector(`[class*="${elms.chatMessageList}"]`);
      if (config.get('enableDenseChat')) {

        if (!addedNode){
          toDensify.forEach(elementName => {
            const elements = document.querySelectorAll(`[class*="${elms[elementName]}]"`);
            elements.forEach(element => {
              if (element) element.classList.add('mTS2-denseChat');
            });
          });
        }else{
          toDensify.forEach(elementName => {
            const element = addedNode.querySelector(`[class*="${elms[elementName]}]"`);
            if (element) element.classList.add('mTS2-denseChat');
          });
        }

        if (chatMessageList) chatMessageList.classList.add('mTS2-denseChat-chatMessageList');

      }else{

        toDensify.forEach(elementName => {
          const elements = document.querySelectorAll(`[class*="${elms[elementName]}]"`);
          elements.forEach(element => {
            if (element) element.classList.remove('mTS2-denseChat');
          });
        });

        if (chatMessageList) chatMessageList.classList.remove('mTS2-denseChat-chatMessageList');
      }
    }

    // ---- USER TAGGING / SCROLL TO BOTTOM ----
    function setCursorPosition(div) {
      let range = document.createRange();
      range.selectNodeContents(div);
      range.collapse(false);
      let selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      div.focus();
    }


    // listen for double click on chat message
    document.addEventListener('dblclick', function(event) {
      if (!config.get('enableClickHighlightUsers')) return
      const target = event.target;
      const parentSelector = '.chat-message-default_chat-message-default__JtJQL';

      const parent = target.closest(parentSelector);
      if (parent) {
        const usernameElement = parent.querySelector(`[class*="${elms.chatUsername}"]`)
        const username = usernameElement ? usernameElement.innerText : false
        if (username) toggleUserHighlighting(username);
        if (window.getSelection) {
          const selection = window.getSelection();
          selection.removeAllRanges();
        }
      }
    });


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
      textDiv.classList.add('console-button-long_text__ajAjy');

      button.appendChild(image);
      button.appendChild(textDiv);
      const interval = setInterval(()=>{
        tries++;
        const profile = document.querySelector(`[class*="${elms.profileActions}"]`);
        if (profile) {
          let users = config.get('friends');
          const username = document.querySelector(`[class*="${elms.profileUsername}"]`).innerText;
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


    function toggleUserHighlighting(user) {
      let users = config.get('highlightedUsers');
      const userIndex = users.indexOf(user);

      if (userIndex !== -1) {
        users.splice(userIndex, 1);
      } else {
        users.push(user);
      }

      config.set('highlightedUsers', users);
      saveConfig();
    }


    function toggleFriend(user) {
      let users = config.get('friends');
      const userIndex = users.indexOf(user);

      if (userIndex !== -1) {
        users.splice(userIndex, 1);
      } else {
        users.push(user);
      }

      config.set('friends', users);
      saveConfig();
    }


    document.addEventListener('click', (event) => {
      if (!config.get('enableNameTagging')) return
      if (event.target.className.includes(elms.chatUsername) || event.target.className.includes(elms.userCardUsername) || event.target.parentElement.className.includes(elms.chatAvatar)) {

        let chatterDisplayNameElement = null
        let chatterDisplayName = null
        if (event.target.parentElement.className == elms.chatAvatar && config.get('enableAvatarTagging')) {
          const chatAvatar = event.target.parentElement
          chatterDisplayNameElement = chatAvatar.parentElement
          chatterDisplayName = chatterDisplayNameElement.querySelector(`[class*="${elms.chatUsername}"]`).innerHTML
          let chatterClan = chatterDisplayNameElement.querySelector(`[class*="${elms.chatClan}"]`);
          if (chatterClan) chatterDisplayName = chatterDisplayName.replace(/<span[^>]*>.*?<\/span>/, '');
        } else {
          chatterDisplayNameElement = event.target
          chatterDisplayName = chatterDisplayNameElement.lastChild.textContent;
        }

        if (!chatterDisplayName) return;
        const chatInputElement = document.querySelector(`[class*="${elms.chatInput}"]`);
        let currentInput = chatInputElement.innerHTML;
        let updateInput = new KeyboardEvent('input', { bubbles: true });

        if (currentInput) {
          chatInputElement.innerHTML = currentInput + '&nbsp;@' + chatterDisplayName + '&nbsp;';
        } else {
          chatInputElement.innerHTML = '@' + chatterDisplayName + '&nbsp;';
        }
        chatInputElement.dispatchEvent(updateInput);
        setCursorPosition(chatInputElement);
      }

      // SCROLL TO BOTTOM
      if (event.target.className == elms.chatAutoScroll) {
        const chatMessageList = document.querySelector(`[class*="${elms.chatMessageList}"]`);
        chatMessageList.scrollTop = chatMessageList.scrollHeight;
      }
    });


    // ---- ADD RECENT CHATTERS COUNT ----
    function initRecentChatters() {
      const elmName = `maejok-chatter_count`;
      const chatHeader = document.querySelector(`[class*="${elms.chatPresence}"]`);
      const chatPresence = document.createElement('div');
      chatPresence.classList.add(`${elms.add.chatPresence}`);
      chatPresence.classList.add(`maejok-chatterCount`);

      const chattersText = document.createElement('div');
      chattersText.innerText = `Chatting`;

      const chattersCount = document.createElement('div');
      chattersCount.classList.add(`${elms.add.chatCount}`);
      chattersCount.classList.add(`${elmName}-count`);
      chattersCount.innerHTML = `00000`;

      chatHeader.insertAdjacentElement('afterend', chatPresence);
      chatPresence.appendChild(chattersCount);
      chatPresence.appendChild(chattersText);
    }


    function updateChattersList(user, array) {
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


    function removeExpiredUsers(array, currentTime) {
      let usersToRemove = array.filter(user => user.expires <= currentTime);

      while (usersToRemove.length > 0) {
        const indexToRemove = array.findIndex(user => user.expires <= currentTime);
        array.splice(indexToRemove, 1);
        usersToRemove = array.filter(user => user.expires <= currentTime);
      }
    }


    function setChatterCount(number) {
      const chatCount = document.querySelector(`.${elms.chatterCount}`);
      const numberString = String(number);
      const zerosToAdd = 5 - numberString.length;
      const zeroPadding = '0'.repeat(zerosToAdd);
      chatCount.innerText = zeroPadding + numberString;
    }


    // ---- UTILS ----
    const initConfig = () => {
      const settings = {
        enableBigChat: true,
        hideTimerBigChat: true,
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
        highlightedUsers: [],
        friends: [],
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
    const settingsTitle = 'MAEJOK-TOOLS Settings';
    const config = initConfig();


    function handleKeyPress(event) {
      if (!isPageLoaded) return;
      if (event.ctrlKey && event.keyCode === 192 || event.ctrlKey && event.shiftKey && event.keyCode === 32  || (isBigChat && event.keyCode === 27)) { toggleBigChat(); return; }
      if (event.keyCode === 27) { closeModal(); }
    }


    function handleUserCardButton(event) {
      const button = document.querySelector(`[class*="${elms.userCardActions}"] button`)
      if (button.innerText === "Profile") {
        createFriendButton();
      }
    }


    function handleMouseClick(event) {
      if (!isPageLoaded) return;
      if (event.target.classList.contains(`close-btn`)) { closeModal(); }
      if (event.target === document.querySelector(`[class*="${elms.modalBackdrop}"]`)) { closeModal(); }
      if (event.target === document.querySelector(`[class*="${elms.userCardActions}"] button`)) { handleUserCardButton(); }
    }


    function isNumeric(str) {
      if (typeof str != "string") return false
      if (str === undefined) return false
      return !isNaN(str) && !isNaN(parseFloat(str));
    }


    function init() {
      const intervalId = setInterval(() => {
        const chatBoxElement = document.querySelector(`[class*="${elms.chatBox}`);
        if (chatBoxElement) {
          config.load();
          isPageLoaded = true;
          console.log('MAEJOK-TOOLS for FishTank.Live Season 2 - Started!');
          const chatMessagesElement = document.querySelector(`[class*="${elms.chatMessages}"]`);
          chatMessagesElement.style.padding = '0';
          document.addEventListener('keydown', handleKeyPress);
          document.addEventListener('click', handleMouseClick);
          initChatMutationObserver();
          createSettingsButton();
          clearInterval(intervalId);
          joinClanChat();
          initRecentChatters();

          checkForUpdate((needUpdate, newVersion = false) => {
            if (!needUpdate) {
              console.info('MAEJOK-TOOLS IS UP TO DATE!.');
            } else {
              console.error(`MAEJOK-TOOLS v${VERSION} :: UPDATE AVAILABLE!  Newest version: ${newVersion}`)
              console.error(`Head on over to https://greasyfork.org/en/scripts/465416-maejok-tools-for-fishtank-live/ to update!`);

              insertUpdateMessage(`<div style="background-color:#e3e3e3;border:1px solid #E0E0E0;padding:10px;text-align:center;"><h2 style="font-size:1.2rem;margin:0"><a href="https://greasyfork.org/en/scripts/465416-maejok-tools-for-fishtank-live/" target="_blank" style="text-decoration:none;color:blue">MAEJOK-TOOLS</a></h2><p style="font-size:1rem"><a href="https://greasyfork.org/en/scripts/465416-maejok-tools-for-fishtank-live/" target="_blank" style="text-decoration:none;color:#000"><b>Click to Update<b></a></p></div>`)
            }
          });
        }
      }, 10);
    }


    function insertUpdateMessage(msg){
      const chat = document.querySelector(`[class^="${elms.chatMessageList}"]`)
      const chatMessageDiv = document.createElement('div');
      chatMessageDiv.className = 'chat-message-default_chat-message-default__JtJQL';
      const innerDiv = document.createElement('div');
      innerDiv.className = 'chat-message-default_body__iFlH4';
      innerDiv.style.display = 'block';
      const messageSpan = document.createElement('span');
      messageSpan.className = 'chat-message-default_message__milmT';
      messageSpan.innerHTML = msg;
      innerDiv.appendChild(messageSpan);
      chatMessageDiv.appendChild(innerDiv);
      chat.appendChild(chatMessageDiv);
    }


    function checkForUpdate(callback) {
      const ts = new Date().getTime();
      fetch(`https://raw.githubusercontent.com/maejok-xx/MAEJOK-TOOLS-FISHTANK/main/version.txt?cb=${ts}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`MAEJOK-TOOLS Update Checker failed with status: ${response.status}`);
          }
          return response.text();
        })
        .then(data => {
          const latestVersion = data.trim();
          if (latestVersion !== VERSION) {
            callback(true, latestVersion);
          } else {
            callback(false);
          }
        })
        .catch(error => {
          console.error('MAEJOK-TOOLS Update Checker Error:', error);
          callback(false);
        });
    }

    // ---- STYLES ----
    GM_addStyle(`
          .maejok-highlighted-user{
            background-color: rgba(245, 39, 39, 0.16)!important;
            border: 1px solid rgba(245, 39, 39, 0.26)!important;
          }

          .maejok-friend-user{
            background-color: rgba(39, 245, 39, 0.06);
            border: 1px solid rgba(39, 245, 39, 0.16);
          }

          .mTS2-chatBox-popOut {
            top: 0!important;
            left: 0!important;
            z-index: 1!important;
            width: 100%!important;
            height: 100%!important;
            position: fixed!important;
          }

          .mTS2-countdown-popOut-hide {
              z-index: -10!important;
          }

          .mTS2-countdown-popOut-show {
              z-index: 4!important;
          }

          .mTS2-chatters-popOut {
              position: absolute;
              left: 100px;
          }

          .mTS2-chatMessages-popOut {
              height: 81%!important;
              border: 0!important;
              padding: 0!important;
              margin-bottom: 0!important;
              background-color: rgba(0, 0, 0, 0.0)!important;
          }

          .mTS2-chatInput-popOut {
              margin-left: 6px!important;
              margin-right: 6px!important;
          }

          .mTS2-xpBar-popOut {
            z-index: 20!important;
            margin-top: 40px!important;
              width: calc(100% + 170px)!important;
          }

          .mTS2-topBarUser-popOut {
              visibility: hidden!important;
          }

          .mTS2-topBarTitle-popOut {
              z-index: 22!important;
          }

          .mTS2-topBar-popOut {
              z-index: 22!important;
          }

          .mTS2-topBarLogo-popOut {
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


        @media screen and (max-width: 1100px) {
            .mTS2-topBar-popOut {
                display: none!important;
            }
            .mTS2-xpBar-popOut {
              width: 50%;
              z-index: 20;
              grid-row: 6/6;
              margin-bottom: 15px;
            }
            .mTS2-chatters-popOut {
              left: 145px;
              position: absolute;
            }
        }
        @media screen and (max-width: 800px) {
            .mTS2-xpBar-popOut {
                width: 25%;
            }
            .mTS2-chatters-popOut {
              left: 130px;
              position: absolute;
            }
        }
      `);

    init();
  })();
