// ==UserScript==
// @name         MAEJOK-TOOLS for Fishtank.live
// @description  Tools for Fishtank.live Season 2!
// @author       maejok-xx
// @version      2.3.1
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

// ---- CONFIG ----
    const elms = {
        // main
            mainBackground: 'background_background__fNMDL',
        // chat
            chatHeader: 'chat_header__8kNPS',
            chatPresence: 'chat_presence__90XuO',
            chatCount: 'chat_count__D7xic',
            // chat box
                chatBox: 'chat_chat__2rdNg',
                // chat messages
                    chatRoomsList: 'select_options__t1ibN',
                    chatMessages: 'chat_messages__2IBEJ',
                        chatMessageList: 'chat_inner__cymIB',
                        chatAvatar: 'chat-message-default_avatar__eVmdi',
                        chatMessageOuter: 'chat-message-default_chat-message-default__JtJQL',
                        chatMessage: 'chat-message-default_message__milmT',
                        chatMessageBody: 'chat-message-default_body__iFlH4',
                        chatTimestamps: 'chat-message-default_timestamp__sGwZy',
                        chatSystem: 'chat-message-system_chat-message-system__qZ_cD',
                        chatEmote: 'chat-message-emote_chat-message-emote__NWoZG',
                        chatClan: 'chat-message-default_clan__t_Ggo',
                        chatHappening: 'chat-message-happening_chat-message-happening__tYeDU',
                        chatSystem: 'chat-message-system_chat-message-system__qZ_cD',
                        chatMedal: 'medal_medal__Hqowf',
                        chatXPLevel: 'chat-message-default_lvl__QXf_z',
                        chatAutoScroll: 'chat_scroll__6Tqdf',
                        chatUsername: 'chat-message-default_user__uVNvH',
                // username
                    userCardUsername: 'user-card_name__2Es9n',
                    profileUsername: 'user-profile_name__W1Vn1',
                // chat - input
                    chatInputActions: 'chat-input_actions__V_ho0',
                    chatInputForm: 'chat-input_chat-input__OmyQV',
                        chatInput: 'chat-input_input__ozkas',
                        chatInputPlaceholder: 'chat-input_placeholder__LVY_6',
        // top bar
            topBar: 'top-bar_top-bar___Z0QX',
                topBarUser: 'top-bar_user__J28x0',
                topBarTitle: 'top-bar_title__DJbDC',
                topBarLogo: 'top-bar_logo__XL0_C',
                topBarClan: 'top-bar_clan__qikGL',
                topBarAdmin: 'admin-toolbar_admin-toolbar__Jlc17',
        // modal
            modalBackdrop: 'modal_backdrop__94Bu6',
            modalContainer: 'modal_modal-container__iQODa',
                modalModal: 'modal_modal__MS70U',
                    modalHeader: 'modal_header__O0ebJ',
                        modalTitle: 'modal_title__TdXFC',
                        modalCloseButton: 'close-button_close-button__BKUKA',
                        modalCloseButton2: 'close-button_sm__n0dZT',
                        modalScrews: 'screws_screws__letgM',
                            modalScrewsTL: 'screws_top-left__8K2_Q',
                            modalScrewsTR: 'screws_top-right__kdqNC',
                            modalScrewsBL: 'screws_bottom-left__Kz1OJ',
                            modalScrewsBR: 'screws_bottom-right__ebrGH',
                    modalBody: 'modal_body__j3Bav',
        // forms
            // inputs
                inputWrapper: 'input_input-wrapper__xvMLO',
                inputInput: 'input_input__Zwrui',
                inputLabel: 'input_label__hviII',
                consoleButton: 'console-button-square_md__OiTX7',
        // misc
            // bars
                xpBar: 'experience-bar_experience-bar__nVDge',
                announcementBar: 'announcement_announcement__Sow3P ',
        // maejok elements:
            chatterCount: 'maejok-chatter_count-count',
    };
    const settingsTitle = 'MAEJOK-TOOLS Settings';

    let isPageLoaded = false;


// ---- ADD SETTINGS BUTTON ----
    function createSettingsPanel(){
        if (!isPageLoaded || document.querySelector(`.${elms.modalContainer}`)) return;

        config.load();

        const mainHomeElement = document.querySelector(`.${elms.mainHome}`);

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
        closeButton.classList.add(`${elms.modalCloseButton}`);
        closeButton.classList.add(`${elms.modalCloseButton2}`);
        closeButton.setAttribute('style', 'min-width: 0px!important');

        const closeButtonIcon = document.createElement('img');closeButtonIcon.setAttribute('alt', 'Close');
        closeButtonIcon.setAttribute('loading', 'lazy');
        closeButtonIcon.setAttribute('width', '32');
        closeButtonIcon.setAttribute('height', '32');
        closeButtonIcon.setAttribute('decoding', 'async');
        closeButtonIcon.setAttribute('data-nimg', '1');
        closeButtonIcon.setAttribute('src', '/images/slices/close.png');

        closeButtonIcon.style.color = 'transparent';

        const screws = document.querySelector(`.${elms.modalScrews}`).cloneNode(true);

        modalHeader.appendChild(modalTitle);
        modalTitle.appendChild(modalTitleText);
        modalHeader.appendChild(closeButtonContainer);
        closeButtonContainer.appendChild(closeButton);
        closeButton.appendChild(closeButtonIcon);
        settingsModal.appendChild(modalHeader);
        settingsModal.appendChild(modalBody);
        settingsModal.appendChild(screws);
        mainHomeElement.parentNode.insertBefore(settingsModalContainer, mainHomeElement.nextSibling);
        settingsModalContainer.appendChild(settingsModalBackdrop);
        settingsModalContainer.appendChild(settingsModal);

        if (screws) screws.querySelector(`.${elms.modalScrewsTR}`).remove();
        addSettingsBody(modalBody);
    }

    function closeModal(){
        if (!isPageLoaded) return;

        const modalContainer = document.querySelector(`.${elms.modalContainer}`);
        if (!modalContainer) return;

        const chatBox = document.querySelector(`.${elms.chatBox}`);
        chatBox.setAttribute('style', 'z-index: 4');

        const modalTitle = modalContainer.querySelector(`.${elms.modalTitle} > h2`).innerHTML;
        if (modalTitle == settingsTitle){
            const modalBackdrop = document.querySelector(`.${elms.modalBackdrop}`);
            modalBackdrop.remove();
            modalContainer.remove();
        }else{
            const modalCloseButton = modalContainer.querySelector(`.${elms.modalCloseButton2}`);
            modalCloseButton.click();
        }
    }

    function createSettingsButton(){
        if (!isPageLoaded) return;
        const chatInputActionsElement = document.querySelector(`.${elms.chatInputActions}`);
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

    function addSettingsBody(modalBody){
        const form = document.createElement('form');

        form.classList.add('maejok-settings_form');

        form.addEventListener('submit', (event) => { event.preventDefault(); saveConfig();});

        const enableRecentChatters = createCheckbox('Enable Chatter Count', 'enableRecentChatters', ['Threshold', 'How long should someone be considered active in chat? (in minutes) (Default: 10)', [config.get('chattersThreshold'), 'min.', 'chattersThreshold']]);
        form.appendChild(enableRecentChatters);

        const enableBigChat = createCheckbox('Big Chat Mode', 'enableBigChat');
        form.appendChild(enableBigChat);

        const disableTimestamps = createCheckbox('Hide Timestamps (chat)', 'disableTimestamps');
        form.appendChild(disableTimestamps);

        const enableAvatarTagging = createCheckbox('Avatar Click-To-Tag (chat)', 'enableAvatarTagging');
        form.appendChild(enableAvatarTagging);

        const enableNameTagging = createCheckbox('Username Click-To-Tag (chat & profile)', 'enableNameTagging');
        form.appendChild(enableNameTagging);

        const enableDenseChat = createCheckbox('Enable Dense Chat', 'enableDenseChat');
        form.appendChild(enableDenseChat);

        const autoClanChat = createCheckbox('Auto-Join Clan Chat', 'autoClanChat');
        form.appendChild(autoClanChat);

        const disableChatClans = createCheckbox('Hide Clans (chat)', 'disableChatClans');
        form.appendChild(disableChatClans);

        const disableLevels = createCheckbox('Hide XP (chat)', 'disableLevels');
        form.appendChild(disableLevels);

        const disableAvatars = createCheckbox('Hide Avatars (chat)', 'disableAvatars');
        form.appendChild(disableAvatars);
        const disableEmotes = createCheckbox('Hide Emotes (chat)', 'disableEmotes');
        form.appendChild(disableEmotes);

        // const disableHappenings = createCheckbox('Hide Happenings (chat)', 'disableHappenings');
        // form.appendChild(disableHappenings);

        const disableMedals = createCheckbox('Hide Medals (chat)', 'disableMedals');
        form.appendChild(disableMedals);

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
    function createCheckbox(label, id, prompt = false /* eg: ['link text', 'prompt text', ['default value', 'text to go with value (minutes,etc)'], ] */){
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

        if (prompt){
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
            promptSpanText.onclick = ()=>{
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


    function saveConfig(){
        const form = document.querySelector('.maejok-settings_form');
        const inputElements = form.querySelectorAll('input');
        inputElements.forEach((input) => {
            if (input.type === 'checkbox'){
                let settingKey = input.id.replace("maejok-", "");
                let value = input.checked ? true : false
                config.set(settingKey, value);
                // console.log(settingKey, value);
            } else if (input.type === 'hidden'){
                let settingKey = input.id.replace("maejok-", "");
                config.set(settingKey, input.value);
                // console.log(settingKey, input.value);
            }
        });
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

        const clanButton = document.querySelector(`.${elms.topBarClan} button`);
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

        const chatBoxElement = document.querySelector(`.${elms.chatBox}`);
        const chatMessagesElement = document.querySelector(`.${elms.chatMessages}`);
        const chatInputFormElement = document.querySelector(`.${elms.chatInputForm}`);
        const chatChatterCountElement = document.querySelector(`.maejok-chatterCount`);
        const xpBarElement = document.querySelector(`.${elms.xpBar}`);
        const topBarElement = document.querySelector(`.${elms.topBar}`);
        const topBarUserElement = document.querySelector(`.${elms.topBarUser}`);
        const topBarTitleElement = document.querySelector(`.${elms.topBarTitle}`);
        const topBarLogoElement = document.querySelector(`.${elms.topBarLogo}`);
        const happeningMessageElement = document.querySelector(`.${elms.happeningMessage}`);

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

            if (happeningMessageElement) happeningMessageElement.style.textAlign = isBigChat ? 'unset' : 'center';
            xpBarElement.style.transition = 'margin-top 0.5s';
        }

        isBigChat = !isBigChat;
    }


// ---- CHAT MUTATION / TIMESTAMP / DENSE CHAT ----
    let chatMutationObserver = null
    let chattersList = []
    function initChatMutationObserver(){
        const configChecks = ['disableTimestamps', 'enableDenseChat','disableChatClan','disableAvatars','disableEmotes','disableHappenings' ];

        if (configChecks.every(check => !config.get(check))) { chatMutationObserver?.disconnect(); }
        if (chatMutationObserver) return;

        const chatMessageList = document.querySelector(`.${elms.chatMessageList}`);
        chatMutationObserver = new MutationObserver(function(mutationsList, observer) {
            mutationsList.forEach((mutation) => {
                if (mutation.type !== 'childList' || mutation.addedNodes.length === 0) return;
                mutation.addedNodes.forEach((addedNode) => {
                    if (!addedNode instanceof HTMLElement) return;
                    if (config.get('enableRecentChatters')){
                        const userElm = addedNode.querySelector(`.${elms.chatUsername}`);
                        if (userElm) {
                            let username = userElm.innerHTML
                            username = username.replace(/<span[^>]*>.*?<\/span>/, '');
                            updateChattersList(username, chattersList);
                        }
                    }
                    if (config.get('enableDenseChat')) {
                        let usernameColor = null;
                        let nameMargin = '';
                        const denseCSS = 'padding: 0px!important; flex-direction: initial;'
                        const chatMessages = document.querySelector(`.${elms.chatMessages}`);
                        const chatMessageOuter = document.querySelector(`.${elms.chatMessageOuter}`);
                        const chatTimestamps = addedNode.querySelector(`.${elms.chatTimestamps}`);
                        const chatSystem = addedNode.querySelector(`.${elms.chatSystem}`);
                        const chatEmote = addedNode.querySelector(`.${elms.chatEmote}`);
                        const chatHappening = document.querySelector(`.${elms.chatHappening}`);
                        const chatXPLevel = addedNode.querySelector(`.${elms.chatXPLevel}`);
                        const chatUsername = addedNode.querySelector(`.${elms.chatUsername}`);
                        if (chatMessageList) chatMessageList.setAttribute('style', 'gap: 0px!important;padding:5px!important;');
                        if (chatMessageOuter) chatMessageOuter.setAttribute('style', 'padding-top: 4px; padding-bottom: 4px;');
                        if (chatTimestamps) chatTimestamps.setAttribute('style', denseCSS);
                        if (chatSystem) chatSystem.setAttribute('style', denseCSS);
                        if (chatEmote) chatEmote.setAttribute('style', denseCSS);
                        if (chatHappening) chatHappening.setAttribute('style', denseCSS);
                        if (chatXPLevel && config.get('disableAvatars')) chatXPLevel.setAttribute('style', 'postition: relative; top: unset; left: unset');
                        if (chatUsername) usernameColor = chatUsername.getAttribute('style') || null;
                        if (!config.get('disableLevels') && chatXPLevel) nameMargin = ` margin-left: ${chatXPLevel.offsetWidth+2}px;`;
                        if (chatUsername && config.get('disableAvatars')) chatUsername.setAttribute('style', `${usernameColor}${nameMargin }`);
                    }else{
                        const chatMessages = document.querySelector(`.${elms.chatMessages}`);
                        if (chatMessages) chatMessages.setAttribute('style', 'padding:0!important;');
                    }
                    if (config.get('disableTimestamps')){
                        const timestamp = addedNode.querySelector(`.${elms.chatTimestamps}`);
                        if (timestamp) timestamp.style.display = 'none';
                    }
                    if (config.get('disableAvatars')){
                        const avatar = addedNode.querySelector(`.${elms.chatAvatar} > img`);
                        if (avatar) avatar.style.display = 'none';
                    }
                    if (config.get('disableLevels')){
                        const level = addedNode.querySelector(`.${elms.chatXPLevel}`);
                        if (level) level.style.display = 'none';
                    }
                    if (config.get('disableChatClans')){
                        const clan = addedNode.querySelector(`.${elms.chatClan}`);
                        if (clan) clan.style.display = 'none';
                    }
                    if (config.get('disableEmotes')){
                        if (addedNode.classList.contains(elms.chatEmote)) addedNode.style.display = 'none';
                    }
                    // if (config.get('disableHappenings')){
                    //     if (addedNode.classList.contains(elms.chatHappening)) addedNode.style.display = 'none';
                    // }
                    if (config.get('disableMedals')){
                        const message = addedNode.querySelector(`.${elms.chatMessage}`);
                        const medals = addedNode.querySelectorAll(`.${elms.chatMedal}`);
                        if (message && !message.innerText) {
                            addedNode.style.display = 'none';
                        } else {
                            if (medals) medals.forEach((medal) => { medal.style.display = 'none' });
                        }
                    }
                });
            });
        });
        chatMutationObserver.observe(chatMessageList, { attributes: false, childList: true, subtree: false, attributeOldValue: false });
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

    document.addEventListener('click', (event) => {
        if (!config.get('enableNameTagging')) return
        if (event.target.className == elms.chatUsername || event.target.className == elms.userCardUsername || event.target.parentElement.className == elms.chatAvatar){

            let chatterDisplayNameElement = null
            let chatterDisplayName = null
            if (event.target.parentElement.className == elms.chatAvatar && config.get('enableAvatarTagging')){
                const chatAvatar = event.target.parentElement
                chatterDisplayNameElement = chatAvatar.parentElement
                chatterDisplayName = chatterDisplayNameElement.querySelector(`.${elms.chatUsername}`).innerHTML
                let chatterClan = chatterDisplayNameElement.querySelector(`.${elms.chatClan}`);
                if (chatterClan) chatterDisplayName = chatterDisplayName.replace(/<span[^>]*>.*?<\/span>/, '');
            }else{
                chatterDisplayNameElement = event.target
                chatterDisplayName = chatterDisplayNameElement.lastChild.textContent;
            }

            if (!chatterDisplayName) return;
            const chatInputElement = document.querySelector(`.${elms.chatInput}`);
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
            const chatMessageList = document.querySelector(`.${elms.chatMessageList}`);
            chatMessageList.scrollTop = chatMessageList.scrollHeight;
        }
    });


// ---- ADD RECENT CHATTERS COUNT ----
    function initRecentChatters(){
        const elmName = `maejok-chatter_count`;
        const chatHeader = document.querySelector(`.${elms.chatPresence}`);
        const chatPresence = document.createElement('div');
        chatPresence.classList.add(`${elms.chatPresence}`);
        chatPresence.classList.add(`maejok-chatterCount`);

        const chattersText = document.createElement('div');
        chattersText.innerText=`Chatting`;

        const chattersCount = document.createElement('div');
        chattersCount.classList.add(`${elms.chatCount}`);
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
            enableNameTagging: true,
            enableAvatarTagging: true,
            disableTimestamps: true,
            enableDenseChat: false,
            disableChatClans: false,
            disableAvatars: false,
            disableEmotes: false,
            disableHappenings: false,
            disableMedals: false,
            disableLevels: false,
            autoClanChat: false,
            enableRecentChatters: true,
            chattersThreshold: 10,
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

    function handleKeyPress(event) {
        if (!isPageLoaded) return;
        if (event.ctrlKey && event.keyCode === 192 || (isBigChat && event.keyCode === 27)) { toggleBigChat(); return; }
        if (event.keyCode === 27) { closeModal(); }
    }

    function handleMouseClick(event) {
        if (!isPageLoaded) return;
        if (isTarget(event, document.querySelector(`.${elms.modalCloseButton} > img`))) { closeModal(); }
        if (isTarget(event, document.querySelector(`.${elms.modalBackdrop}`))) { closeModal(); }
    }

    function isTarget(event, element){ return element && event.target === element ? true : false }

    function init() {
        const intervalId = setInterval(() => {
            const chatBoxElement = document.querySelector(`.${elms.chatBox}`);
            if (chatBoxElement) {
                config.load();
                isPageLoaded = true;
                console.log('MAEJOK-TOOLS for FishTank.Live Season 2 - Started!');
                const chatMessagesElement = document.querySelector(`.${elms.chatMessages}`);
                chatMessagesElement.style.padding = '0';
                document.addEventListener('keydown', handleKeyPress);
                document.addEventListener('click', handleMouseClick);
                initChatMutationObserver();
                createSettingsButton();
                clearInterval(intervalId);
                joinClanChat();
                initRecentChatters();
            }
        }, 10);
    }

    function isNumeric(str) {
        if (typeof str != "string") return false
        if (str === undefined) return false
        return !isNaN(str) && !isNaN(parseFloat(str));
    }
// ---- STYLES ----
    GM_addStyle(`
        .mTS2-chatBox-popOut {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }

        .mTS2-chatters-popOut {
            position: absolute;
            left: 100px;
        }

        .mTS2-chatMessages-popOut {
            height: 81%;
            background-color: rgba(0, 0, 0, 0.0);
            border: 0;
            margin-bottom: 0;
            padding: 0;
        }

        .mTS2-chatInput-popOut {
            margin-left: 6px;
            margin-right: 6px;
        }

        .mTS2-xpBar-popOut {
            margin-top: 40px;
            width: calc(100% + 170px);
            z-index: 20;
        }

        .mTS2-topBarUser-popOut {
            visibility: hidden;
        }

        .mTS2-topBarTitle-popOut {
            z-index: 22;
        }

        .mTS2-topBar-popOut {
            z-index: 22;
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
            flex-direction: initial;
        }


        @media screen and (max-width: 1100px) {
            .mTS2-topBar-popOut {
                display: none!important;
            }
            .mTS2-xpBar-popOut {
                margin-bottom: 15px;
                width: 50%;
                grid-row: 6/6;
                z-index: 20;
            }
            .mTS2-chatters-popOut {
                position: absolute;
                left: 145px;
            }
        }
        @media screen and (max-width: 800px) {
            .mTS2-xpBar-popOut {
                width: 25%;
            }
            .mTS2-chatters-popOut {
                position: absolute;
                left: 130px;
            }
        }
    `);

    init();
})();
