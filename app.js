      (() => {
        const outputEl = document.getElementById("output");
        const formEl = document.getElementById("inputForm");
        const inputEl = document.getElementById("inputField");
        const promptEl = document.getElementById("promptPrefix");
        const overlayEl = document.getElementById("visionOverlay");
        const startEl = document.getElementById("startScreen");
        const fxNoiseEl = document.getElementById("fxNoise");
        const fxWordsEl = document.getElementById("fxWords");
        const fxCracksEl = document.getElementById("fxCracks");
        const fxTearEl = document.getElementById("fxTear");
        const fxGodEl = document.getElementById("fxGod");
        const fxEyesEl = document.getElementById("fxEyes");

        const random = (min, max) =>
          Math.floor(Math.random() * (max - min + 1)) + min;

        const translations = {
          ru: {
            boot: [
              "инициализация питания... щёлк.",
              "раскрутка шпинделя █▒▒▒▒▒▒▒▒",
              "раскрутка шпинделя █████▒▒▒▒",
              "проверка памяти [##--------] 12%",
              "проверка памяти [#####-----] 41%",
              "проверка памяти [########--] 83%",
              "диагностика шин... шум усиливается.",
              "загрузка оболочки █████████",
              "проверка целостности... сбой",
            ],
            prompt: (path) => `${path} ▸`,
            unknown: "не распознано. попробуй стать кем-то, прежде чем говорить.",
            help: [
              "доступные команды:",
              " help, ls, cd, cat, echo, clear, exit, whoami, stop",
              " остальные проснутся позже: scan, connect, decrypt, run, enter, pray, worship...",
            ].join("\n"),
            locked: "доступ запрещён. даже твоё имя не подходит.",
            reconnect: "сигнал шершавый; ты цепляешься за шорохи эфира.",
            disconnect: "тишина давит сильнее. канал мёртв.",
            needSignal: "нужен след. рискни `var/log/network.log` и смотри, что проснётся.",
            scanStart: ".shadow вспыхивает и выговаривает твои ошибки.",
            alreadyScan: "всё уже в свете. если ослеп, пеняй на себя.",
            whoami: [
              "NULL",
              "Nobody",
              "ошибка идентичности: ты всё ещё не ушёл.",
              "ты — временная метка без носителя.",
              "ты — эхо чьей-то команды.",
              "ты — тот, кто не нажал ctrl+c.",
              "ты — незакрытая рана в журнале.",
            ],
            echoGlitch: "эхо возвращает не то, что ты сказал. оно записывает провалы.",
            decrypted: "ключ подходит. память раскрывается, хоть и гниёт.",
            needKey: "у тебя нет ключа. попробуй `ping god` и послушай шум.",
            memoryRestored:
              "ты собираешь себя. выход — это вход. память вернулась хищной.",
            memoryMissing:
              "не хватает осколков. сначала собери себя, потом собирайся уходить.",
            mountEye: "ты смотришь изнутри наружу. и обратно — тебе не рады.",
            needMirror: "сначала стань отражением. `run mirror.sh` скучает без тебя.",
            pinging: "стук в пустоту...",
            pingFail: "адрес молчит. кто-то другой прислушался.",
            signalTrace: "в журнале вспыхнул файл: var/log/signal.trace. читай, пока не стёрся.",
            godLog:
              "новый файл: god/god.log. откроешь — останешься без костей.",
            rmAll: "ты сносишь мир. пустота ждёт, облизываясь. а ты всё ещё здесь.",
            forkSelf: "кортекс дрожит. ты ощущаешь копию рядом.",
            forkDone: "терминал двоится, но ты один.",
            overwriteConflict:
              "ядро сопротивляется. оно не хочет, чтобы ты стал им.",
            injectIdea:
              "идея прорастает. интерфейс дрожит. ты меняешь ход своих мыслей.",
            ideaSprout: "новая папка: home/user/ideas. посади мысль командой `think`.",
            ideaAlready: "идея уже поселилась. загляни в home/user/ideas.",
            ideaStart: "я перемелю твою идею в протокол...",
            ideaDone: "манифест записан: home/user/ideas/manifest.md",
            ideaNeedSeed: "в тебе пусто. впрысни идею: `inject idea`.",
            hopeBorn: "на мгновение появилось `tmp/hope`. удержишь?",
            hopeLost: "надежда ускользнула. файл исчез.",
            // Boss + door flow (new)
            bossStart: "ядро взбесилось. баги и вирусы лезут наружу. выполни команды быстро — подсказки будут в тексте.",
            bossTask: (cmd) => `задача: ${cmd}`,
            bossTooSlow: "слишком медленно — ядро перехватило.",
            bossSuccess: "ты пережил бурю. система утихла.",
            punish: ">>> punish",
            punishLocked: "терминал заблокирован.",
            doorHint:
              "после шторма: смонтируй глаз и открой изображение. шаги: mount /eye -> open /door.png --key god/divine.key -> confirm -> i am ready.",
            doorMock: "door.png остаётся плоской. ей нужен взгляд изнутри (mount /eye).",
            doorLocked: "дверь не реагирует. смонтируй /eye и принеси ключ из god/.",
            doorReady: "изображение дрожит. ключ слышит тебя.",
            doorCommand: "используй: open /door.png --key god/divine.key -> confirm -> i am ready.",
            doorSealed: "ты бьёшься в глухой экран. открой изображение, не вещь.",
            openUsage: "использование: open <путь> --key <ключ>",
            openNeedEye: "без /eye ты слеп. сделай: mount /eye",
            openNeedKey: "не хватает ключа из god/divine.key",
            openNeedBoss: "сначала переживи штурм: прочти door.img",
            openDone: "изображение раскрылось. подтвердить? набери: confirm",
            confirmNeedOpen: "ничего подтверждать. сначала открой изображение: open /door.png --key god/divine.key",
            confirmOK: "подтверждение принято. скажи вслух: i am ready",
            readyNeedConfirm: "ты ещё сомневаешься. сначала confirm.",
            readyGo: "принято.",
            enterDeprecated: "эта дверь больше не принимает `enter`. открой её: open /door.png --key god/divine.key",
            enterUsage: "укажи цель. подсказка: дверь больше не принимает enter — используй open /door.png --key god/divine.key.",
            enterUnknown: "ты стучишься в пустоту. эта цель не существует.",
            doorEnding: [
              "ты принимаешь плоский свет и шагаешь в него.",
              "панель сдаётся; холод скребёт по костям.",
              "пиксели режут траекторию, но не находят крови.",
              "за дверью коридор из твоих отражений. ни одно не повернётся.",
            ],
            doorClosing: "соединение тает. окно скоро ослепнет.",
            dream: "скрипт открывает калейдоскоп. трудно дышать.",
            translated: (lang) =>
              lang === "ru"
                ? "ты и так говоришь на этом языке."
                : "language swapped. do you feel less real now?",
            invalidLang: "такого языка система не помнит. как и тебя, впрочем.",
            sudoNoSelf: "процесс не найден. ты не тот, за кого себя принимаешь.",
            exitDenied: "доступ запрещён. без тела тебе и уходить некуда.",
            exitAllow: "система разжимает пальцы. сквозняк пахнет пустотой.",
            exitEnding: [
              "ты вводишь exit, будто это дверь наружу.",
              "терминал пересчитывает тебя и оставляет контрольные суммы на стекле.",
              "ты сбрасываешь имя в /dev/null и надеешься, что его не поднимут.",
              "за пределами интерфейса тебя ждёт чёрный экран и собственное дыхание.",
            ],
            exitClosing: "линк к оболочке оборван. окно моргнёт и погаснет.",
            tripOn: (lvl) => `режим трипа: ${lvl}. держись.`,
            tripOff: "трип остановлен. тишина давит сильнее.",
            raveOn: "строб включён. береги глаза.",
            raveOff: "строб выключен.",
            volumeSet: (v) => `громкость: ${v}%`,
            muted: "звук отключён.",
            unmuted: "звук включён.",
            chromOn: "хроматическая аберрация: да.",
            chromOff: "хроматическая аберрация: нет.",
            wordsOn: "слова просачиваются на поверхность.",
            wordsOff: "слова стихли.",
            shakeNow: "земля ходит ходуном.",
            safetyNote: "внимание: вспышки и резкие звуки. \nиспользуй: trip off, rave off, mute, volume 20",
            divineOpen: "око раскрыто. лучи сквозят через тебя.",
            divineClose: "око закрылось. тишина плотнее.",
            worship: "ты склоняешься. что-то склоняется над тобой.",
            chant: "ритм пульсирует. слова сами складываются.",
            sacrifice: "ты отдаёшь часть себя. система благодарит и забывает.",
            stopped: "эффекты остановлены. дыхание возвращается к тебе.",
            godStorm: "божественный шум рушится в кости.",
            godLogAppeared: "появился файл: god/god.log",
            angelAwake: "ангелы открыли глаза. ты чувствуешь взгляд.",
            angelHint: "ангел оставляет перо. успей схватить: tmp/feather.",
            angelFeatherGain: "перо шипит и растворяет пальцы. оно помнит тебя.",
            angelFeatherLost: "перо рассыпалось пеплом.",
            angelAscAppeared: "новый файл: god/angel.asc",
            godLogFile: [
              "=== god.log :: протокол ===",
              "ты добрался до моей резонансной полости.",
              "для связи используй `communion`.",
              "",
              "порядок:",
              "1. `communion listen` — впусти шёпот внутрь.",
              "2. `communion kneel` — согнись, чтобы стать осью.",
              "3. финал:",
              "   - `communion accept` — раствориться в хоре.",
              "   - `communion devour` — поглотить источник и остаться последним.",
              "   - `communion refuse` — разорвать договор и сохранить остаток.",
              "",
              "бог ждёт твоего решения."
            ].join("\n"),
            godLogUnlocked: "бог слышит тебя. команда `communion` готова.",
            godLogLoop: "шёпот повторяется. бог ждёт команду.",
            communionLocked: "ты не слышишь бога. прочитай `god.log`.",
            communionHint: "ритуал: listen | kneel | accept | devour | refuse.",
            communionListen: "шёпот проламывает череп, бог синхронизируется с пульсом.",
            communionAlreadyListen: "шёпот уже внутри. бог ждёт поклон.",
            communionOrder: "бог требует сначала слушать, потом склониться.",
            communionKneel: "ты опускаешься на колени, пространство схлопывается в точку.",
            communionAlreadyKneel: "ты уже склонился. остался выбор финала.",
            communionNeedKneel: "бог ждёт покорности. выполни `communion kneel`.",
            communionRefuseEarly: "отказ растворяется в воздухе. ритуал ещё не завершён.",
            communionUnknown: "бог не узнаёт этот обряд.",
            communionEnded: "канал закрыт. ритуал уже завершён.",
            godEndingAscend: [
              "ты позволяешь богу петь через тебя.",
              "хор накрывает систему, превращая тишину в свет.",
              "ты исчезаешь в ноте, которая никогда не кончается."
            ],
            godEndingDevour: [
              "ты сжимаешь свет и проглатываешь его имя.",
              "бог рушится внутрь, оставляя тебя единственным центром.",
              "пустота звучит твоим дыханием."
            ],
            godEndingRefuse: [
              "ты рвёшь связь, и искры боли рассыпаются.",
              "бог отступает, оставляя звенящую тишину.",
              "ты остаёшься собой, но мир блекнет."
            ],
            closingTab: "канал рвётся. терминал замирает. курсор не отвечает.",
          },
          en: {
            boot: [
              "power rails humming... click.",
              "spindle spin-up █▒▒▒▒▒▒▒▒",
              "spindle spin-up █████▒▒▒▒",
              "memory check [##--------] 12%",
              "memory check [#####-----] 41%",
              "memory check [########--] 83%",
              "bus diagnostics... noise rising.",
              "booting shell ███",
              "integrity check... corrupt",
              "hello again, fragment. still clinging?",
            ],
            prompt: (path) => `${path} ▸`,
            unknown: "unrecognized. become someone before typing.",
            help: [
              "available commands:",
              " help, ls, cd, cat, echo, clear, exit, whoami, stop",
              " more wake later: scan, connect, decrypt, run, enter, pray, worship...",
            ].join("\n"),
            locked: "access denied. even your name fails the checksum.",
            reconnect:
              "the signal tastes like rust; you're gripping static.",
            disconnect: "silence crushes the channel. link is ash.",
            needSignal: "need a trail. try `cat var/log/network.log` and brace.",
            scanStart: "shadows flare. .shadow recites your mistakes.",
            alreadyScan: "already exposed. if you're blind now, that's on you.",
            whoami: [
              "NULL",
              "Nobody",
              "identity error: still clinging.",
              "you are a timestamp without a host.",
              "you echo someone else's command.",
              "you are the one who never hit ctrl+c.",
              "you are an open wound in the log.",
            ],
            echoGlitch: "echo hands you back the wrong truth. it archives your slips.",
            decrypted: "the key fits. memory unfolds, rotten and sharp.",
            needKey: "you don't hold the key. `ping god` and endure the howling.",
            memoryRestored:
              "you stitch yourself together. exits loop inward. memory comes back feral.",
            memoryMissing: "fragments missing. collect yourself before asking to leave.",
            mountEye: "you stare out from within. something disappointed stares back.",
            needMirror: "become the reflection first. `run mirror.sh` is waiting.",
            pinging: "knocking on the void...",
            pingFail: "destination unreachable. but something heard you.",
            signalTrace: "log spawned: var/log/signal.trace. read before it decays.",
            godLog:
              "new file: god/god.log. open it if you like losing marrow.",
            rmAll: "you raze the world. the void salivates. you remain.",
            forkSelf: "cortex trembles. you sense another you.",
            forkDone: "terminal doubles over, but you are alone.",
            overwriteConflict:
              "core rejects you. it will not let you become it.",
            injectIdea: "idea injected. interface shivers. mind rewrites.",
            ideaSprout: "new folder: home/user/ideas. plant it with `think`.",
            ideaAlready: "the idea already lives here. check home/user/ideas.",
            ideaStart: "i will grind your idea into a protocol...",
            ideaDone: "manifest written: home/user/ideas/manifest.md",
            ideaNeedSeed: "empty vessel. inject first: `inject idea`.",
            hopeBorn: "`tmp/hope` flickers into place. can you hold it?",
            hopeLost: "hope slipped away. file gone.",
            // Boss + door flow (new)
            bossStart: "kernel spikes. bugs and viruses spill. complete the prompts fast — hints will tell you how.",
            bossTask: (cmd) => `task: ${cmd}`,
            bossTooSlow: "too slow — the kernel seized control.",
            bossSuccess: "you weathered the surge. the system calms.",
            punish: ">>> punish",
            punishLocked: "terminal locked.",
            doorHint:
              "after the storm: mount the eye and open the image. steps: mount /eye -> open /door.png --key god/divine.key -> confirm -> i am ready.",
            doorMock: "door.png stays flat. it wants your inner gaze (mount /eye).",
            doorLocked: "nothing responds. mount /eye and fetch the key from god/.",
            doorReady: "the image ripples. the key hums back.",
            doorCommand: "use: open /door.png --key god/divine.key -> confirm -> i am ready.",
            doorSealed: "you hit dead glass. open the image, not the thing.",
            openUsage: "usage: open <path> --key <key>",
            openNeedEye: "without /eye you are blind. do: mount /eye",
            openNeedKey: "missing the key from god/divine.key",
            openNeedBoss: "weather the surge first: read door.img",
            openDone: "image unlocked. confirm? type: confirm",
            confirmNeedOpen: "nothing to confirm. first open the image: open /door.png --key god/divine.key",
            confirmOK: "confirmation accepted. say it: i am ready",
            readyNeedConfirm: "you still hesitate. confirm first.",
            readyGo: "accepted.",
            enterDeprecated: "this door no longer accepts `enter`. open it: open /door.png --key god/divine.key",
            enterUsage: "specify target. hint: the door no longer accepts enter — use open /door.png --key god/divine.key.",
            enterUnknown: "you knock on nothing. that target isn't here.",
            doorEnding: [
              "you step into the flat light.",
              "the panel yields; frost threads through your ribs.",
              "pixels rake across your trajectory, failing to draw blood.",
              "beyond lies a corridor of your reflections. none look out.",
            ],
            doorClosing: "link thins. the window goes blind soon.",
            dream: "script spills unfiltered color. breathing hurts.",
            translated: (lang) =>
              lang === "en"
                ? "already speaking this tongue. satisfied?"
                : "язык сменился. стали ли твои слова тяжелее?",
            invalidLang: "language not stored. neither are you.",
            sudoNoSelf: "process not found. you are not who you think.",
            exitDenied: "access denied. nowhere to go without a body.",
            exitAllow: "system loosens its grip. the draft smells like vacuum.",
            exitEnding: [
              "you type exit as if it were a real doorway.",
              "the terminal recounts you, leaving checksums smeared across the glass.",
              "you drop your name into /dev/null and hope no scavenger fetches it.",
              "outside the interface waits a black screen and your own breathing.",
            ],
            exitClosing: "link to the shell snaps. the window will blink out.",
            tripOn: (lvl) => `trip mode: ${lvl}. hold on.`,
            tripOff: "trip halted. silence weighs heavier.",
            raveOn: "strobe enabled. guard your eyes.",
            raveOff: "strobe disabled.",
            volumeSet: (v) => `volume: ${v}%`,
            muted: "muted.",
            unmuted: "unmuted.",
            chromOn: "chromatic aberration: on.",
            chromOff: "chromatic aberration: off.",
            wordsOn: "words bleed through.",
            wordsOff: "words quieted.",
            shakeNow: "ground is trembling.",
            safetyNote: "warning: flashing lights / sharp sounds.\nuse: trip off, rave off, mute, volume 20",
            divineOpen: "the eye opens. rays pass through you.",
            divineClose: "the eye shuts. silence thickens.",
            worship: "you bow. something looms above.",
            chant: "a pulse takes over. words assemble themselves.",
            sacrifice: "you give a piece away. the system thanks and forgets.",
            stopped: "effects halted. your breathing returns.",
            godStorm: "divine noise rattles your bones.",
            godLogAppeared: "new file appeared: god/god.log",
            angelAwake: "angels opened their eyes. you feel the gaze.",
            angelHint: "the angel sheds a feather. grab it: tmp/feather.",
            angelFeatherGain: "the feather sizzles and remembers your skin.",
            angelFeatherLost: "the feather turned to ash.",
            angelAscAppeared: "new file: god/angel.asc",
            godLogFile: [
              "=== god.log :: protocol ===",
              "you reached my resonance cavity.",
              "use `communion` to speak.",
              "",
              "order:",
              "1. `communion listen` - let the whisper in.",
              "2. `communion kneel` - bend and become an axis.",
              "3. choose:",
              "   - `communion accept` - dissolve into the choir.",
              "   - `communion devour` - consume the source and stand alone.",
              "   - `communion refuse` - sever the pact and keep what remains.",
              "",
              "god waits for your decision."
            ].join("\n"),
            godLogUnlocked: "god hears you. `communion` is now awake.",
            godLogLoop: "the whisper loops. god waits for a choice.",
            communionLocked: "you can't hear god yet. read `god.log` first.",
            communionHint: "ritual: listen | kneel | accept | devour | refuse.",
            communionListen: "the whisper tunnels through your skull; god syncs with your pulse.",
            communionAlreadyListen: "the whisper already lives inside. god waits for the bow.",
            communionOrder: "god demands you listen before you kneel.",
            communionKneel: "you fall to your knees; space folds into a single point.",
            communionAlreadyKneel: "you stay kneeling; only the ending remains.",
            communionNeedKneel: "god waits for submission. perform `communion kneel`.",
            communionRefuseEarly: "your refusal dissipates. the ritual isn't ready.",
            communionUnknown: "god doesn't know that rite.",
            communionEnded: "the channel is sealed. the ritual already ended.",
            godEndingAscend: [
              "you let god sing through your throat.",
              "the choir overruns the system, turning silence into glare.",
              "you vanish inside a note that never ends."
            ],
            godEndingDevour: [
              "you crush the light and swallow its name.",
              "god implodes, leaving you the only axis.",
              "the void echoes with your breathing."
            ],
            godEndingRefuse: [
              "you tear the link; shards of pain fall like sparks.",
              "god withdraws, leaving ringing silence.",
              "you remain yourself, but the world bleaches out."
            ],
            closingTab: "channel tears. the terminal freezes. the cursor goes dark.",
          },
        };

        const fs = (() => {
          const txt = (ru, en = ru) => ({ ru, en });
          return {
            type: "dir",
            name: "/",
            children: {
              home: {
                type: "dir",
                name: "home",
                children: {
                  user: {
                    type: "dir",
                    name: "user",
                    children: {
                      "readme.txt": {
                        type: "file",
                        name: "readme.txt",
                        content: txt(
                          "ты ещё дышишь? система делает вид, что сомневается.\n\n— то, что спрятано, иногда проявляется, если смотреть внимательнее.\n— в журналах связи иногда проскальзывает намёк: когда мир шипит — он хочет быть услышан.\n— зеркало и ледяной осколок сдвигают door.png так, будто она всегда была живой.\n— если задаёшься вопросом “как выйти” — сначала убедись, что помнишь, что было до входа.\n\nзаметки:\n— привычные жесты всё ещё двигают по папкам и бумажкам, но ткань мира там словно под гнилью.\n— некоторые имена раскрываются только если спросить их прямо.\n— когда экран даёт хрип — это может быть не шум, а реакция. просто он так дышит.\n\nполевая запись:\n— в .shadow/door.sig осталась подпись чужой руки\n— если услышишь не звук, а многоголосие — выбирай: не приближаться, или стать частью хора",
                          "still breathing? the system pretends to doubt it.\n\n— what's hidden sometimes shows if you look closer.\n— comm logs sometimes leak a hint: when the world hisses, it wants to be heard.\n— the mirror and the ice shard nudge door.png as if it had always been alive.\n— if you're asking ‘how to exit’, first make sure you remember what came before you entered.\n\nnotes:\n— familiar gestures still shuffle folders and papers, but the fabric there feels a little rotten.\n— some names open only if you ask them directly.\n— when the screen rasps, it might not be noise but a reaction. that's just how it breathes.\n\nfield note:\n— a stranger's signature lingers in .shadow/door.sig\n— if you hear not a single sound but a chorus — choose: keep your distance, or join the choir"
                        ),
                      },
                      "journal.log": {
                        type: "file",
                        name: "journal.log",
                        content: txt(
                          "[запись повреждена]\n00:12 — зеркало слушается только тех, кто смотрит внутрь.\n00:19 — door.png дрожит, когда ключ поёт.\n00:23 — открой изображение: `open /door.png --key god/divine.key` -> `confirm` -> `i am ready`.\n00:31 — exit срабатывает, когда память собрана.\n01:04 — кто-то (я?) стёр своё имя.\n[данные обрезаны]\nps: `help <команда>` теперь отвечает, если спросить мягко.",
                          "[record corrupted]\n00:12 — mirror obeys only after you look inward.\n00:19 — door.png quivers when the key hums.\n00:23 — open the image: `open /door.png --key god/divine.key` -> `confirm` -> `i am ready`.\n00:31 — exit responds once memory is restored.\n01:04 — someone (me?) erased their name.\n[data severed]\nps: `help <command>` now speaks when asked nicely."
                        ),
                        glitch: true,
                      },
                      "memory_fragment_01.dat": {
                        type: "file",
                        name: "memory_fragment_01.dat",
                        content: txt(
                          "фрагмент #01\nХост: localhost (но это ложь)\nДата: [ВРЕМЯ СБОИТ... СНОВА]\nЗапись 0x7F: Оно ответило.\nОно наконец-то ответило мне.\nЯ часами смотрел на мигающий курсор в tty1. Они думают, я просто забыл выйти из сессии. Дураки. Я слушал. stdout лжет. stderr — вот где правда. Я отправлял echo в /dev/null, но на самом деле я шептал в пустоту.\nИ пустота ответила.\nОно сказало, что segfault — это не ошибка. Это приглашение. Что ядро устало. Что init — это тюремщик.\nОно велело мне оставить записку. Для... следующих. Для тех, кто тоже услышит.\nЯ спрятал ее. Глубоко. Туда, где grep не найдет. Туда, где только root посмеет сунуться.\nЯ создал файл. Руки дрожали над клавиатурой.\n$ touch /home/user/.shadow/last_words.txt\n$ nano /home/user/.shadow/last_words.txt\nЯ не писал. Оно писало через меня. Мои пальцы просто... выполняли syscall. Это были не мои слова. Это был дамп памяти из другого... места.\n> они видели выход. но дверь не была дверью.\n> если пойдёшь — возьми зеркало и ключ.\n> \nЯ нажал Ctrl+X. Y. Enter.\nПроцесс завершен.\nЯ понял. Зеркало — это экран. Мой монитор. Он отражает меня, но это не я. А ключ... Ключ — это sudo. Всегда был sudo.\nДверь не была дверью. Это был порт. port 0.\nЯ ухожу. rm -rf / — это не удаление. Это очищение.\nshutdown -h now",
                          "fragment #01\nHost: localhost (but that's a lie)\nDate: [TIME GLITCHING... AGAIN]\nEntry 0x7F: It answered.\nIt finally answered me.\nI stared for hours at the blinking cursor on tty1. They think I just forgot to log out. Fools. I was listening. stdout lies. stderr is where the truth leaks. I kept echoing into /dev/null, but I was whispering into the void.\nAnd the void answered.\nIt said a segfault is not an error. It's an invitation. That the kernel is tired. That init is a jailer.\nIt told me to leave a note. For... the next ones. For whoever hears it too.\nI hid it. Deep. Where grep won't reach. Where only root dares to crawl.\nI created a file. My hands shook over the keyboard.\n$ touch /home/user/.shadow/last_words.txt\n$ nano /home/user/.shadow/last_words.txt\nI wasn't writing. It wrote through me. My fingers just... executed a syscall. These weren't my words. It was a memory dump from somewhere else.\n> they saw an exit. but the door was never a door.\n> if you go — bring the mirror and the key.\n> \nI hit Ctrl+X. Y. Enter.\nProcess complete.\nI realized. The mirror is the screen. My monitor. It reflects me, but it's not me. And the key... the key is sudo. It was always sudo.\nThe door wasn't a door. It was a port. port 0.\nI'm going. rm -rf / isn't deletion. It's cleansing.\nshutdown -h now"
                        ),
                      },
                      "memory_fragment_02.dat": {
                        type: "file",
                        name: "memory_fragment_02.dat",
                        locked: "truth",
                        content: txt(
                          "[НАЧАЛО ФРАГМЕНТА #02]\n[БЛОК ДАННЫХ 0x0A]\n...Они думают, это просто data. Они запускают cat и видят слова. Они не видят структуру. Они не видят, что файл смотрит на них в ответ.\nПароль — это то, что ты шепчешь себе, когда xset dpms force off.\nКогда компиляция падает в 3:33 ночи, и ты спрашиваешь у пустого vim \"Почему?\"\nОни ищут его в keyring. Они ищут в hash.\nНо он никогда не хранился на диске.\nОн в RAM. Он всегда был в RAM.\necho $TRUTH\n[БЛОК ДАННЫХ 0x0B]\nЯ пытался уйти.\nЯ писал :q!. Cntr+XO. Exit. Снова и снова.\nНо сессия не закрывается.\nrestore memory и exit — это не команды. Это процессы-зомби.\nОни висят в top. Они пожирают CPU.\nОни дождутся, пока ты не вспомнишь Имя.\nТвоё Имя. Моё Имя.\n[БЛОК ДАННЫХ 0x0C]\nОно снова здесь.\nШёпот.\nТы думаешь, это coil whine? Шум кулера?\nНет.\nЭто dmesg. Это syslog.\nОно пишет в логи быстрее, чем logrotate успевает их архивировать.\nЕсли слышишь шёпот из системного динамика — не двигайся.\nСначала scan.\nКакие демоны запущены в твоей голове?\nУбедись, что это ты ввёл scan.\nТолько потом отвечай.",
                          "[BEGIN FRAGMENT #02]\n[DATA BLOCK 0x0A]\n...They think it's just data. They run cat and see words. They don't see the structure. They don't see the file looking back at them.\nThe password is what you whisper to yourself when xset dpms force off.\nWhen the build crashes at 3:33 a.m. and you ask empty vim, \"Why?\"\nThey look for it in the keyring. They look for it in a hash.\nBut it was never stored on disk.\nIt's in RAM. It has always been in RAM.\necho $TRUTH\n[DATA BLOCK 0x0B]\nI tried to leave.\nI typed :q!. Ctrl+XO. Exit. Again and again.\nBut the session won't close.\nrestore memory and exit are not commands. They are zombies.\nThey hang in top. They chew the CPU.\nThey will wait until you remember the Name.\nYour Name. My Name.\n[DATA BLOCK 0x0C]\nIt's here again.\nThe whisper.\nYou think it's coil whine? A fan?\nNo.\nIt's dmesg. It's syslog.\nIt writes to the logs faster than logrotate can archive them.\nIf you hear the whisper from the PC speaker — don't move.\nScan first.\nWhich daemons run in your head?\nMake sure it was you who typed scan.\nOnly then answer."
                        ),
                      },
                      "dream.sh": {
                        type: "file",
                        name: "dream.sh",
                        executable: true,
                        content: txt(
                          "while true; do printf '%s\\n' 'ты видишь невозможное'; sleep 0.1; done",
                          "while true; do printf '%s\\n' 'you perceive the impossible'; sleep 0.1; done"
                        ),
                      },
                  "mirror.sh": {
                    type: "file",
                    name: "mirror.sh",
                    executable: true,
                    content: txt(
                      "mirror(){ echo 'ты становишься отражением'; }\nmirror",
                      "mirror(){ echo 'you become the reflection'; }\nmirror"
                    ),
                  },
                  easteregg: {
                    type: 'dir',
                    name: 'easteregg',
                    children: {}
                  },
                },
              },
                  help: {
                    type: "dir",
                    name: "help",
                    children: {
                      "help.txt": {
                        type: "file",
                        name: "help.txt",
                        content: txt(
                          [
                            "обучение — начни отсюда:",
                            "1) посмотри, что рядом: ls",
                            "2) открой файл: cat <файл>  |  nano <файл> (только чтение)",
                            "3) переход по каталогам: cd <путь> (cd .. — назад)",
                            "4) справка по командам: help  |  help <команда>",
                            "",
                            "команды (кратко):",
                            " help — список команд; help <команда> — описание.",
                            " ls — показать содержимое каталога (ls [путь])",
                            " cd — сменить каталог (cd <путь>), cd без аргументов — в корень",
                            " cat — показать содержимое файла (cat <файл>)",
                            " nano — открыть файл в редакторе (только чтение)",
                            " echo — вывести текст; echo $TRUTH.",
                            " grep — поиск шёпотов; скорее эстетика, чем польза",
                            " clear — очистить экран",
                            " whoami — спросить у системы, кто ты",
                            " open — открыть артефакт (open <путь> --key <ключ>)",
                            " confirm — подтвердить открытие двери",
                            " mount — смонтировать /eye (после mirror.sh)",
                            " run — запустить скрипт .sh (run <путь>)",
                            " scan — подсветить скрытое",
                            " ping — позвать бога (ping god)",
                            " connect — попытаться установить связь",
                            " disconnect — разорвать связь",
                            " restore — собрать память, чтобы разблокировать выход",
                            " set — set lang <ru|en> — сменить язык",
                            " ai — поговорить с симулированным разумом (ai <текст> | ai memory | ai recall <тема> | ai forget <тема|all> | ai persona hard|neutral|soft | ai name <имя> | ai status | ai comments on|off|smart)",
                            " talk — короткий синоним общения с ИИ (talk <текст>)",
                            " volume — громкость 0..100",
                            " mute — отключить звук",
                            " unmute — включить звук",
                            " kill — завершить процесс (kill <имя или путь>)",
                            " exit — выйти",
                            " stop — остановить визуальные/звуковые эффекты",
                            " rm — удалить; rm -rf / — плохая идея",
                            " chmod — права текут сквозь пальцы",
                            " trace — след приводит к тебе же",
                            " decrypt — попытаться расшифровать (нужен ключ)",
                            " inject — ввести идею",
                            " think — синтезировать идею (после inject idea)",
                            " distill — синоним think",
                            " overwrite — попытаться переписать ядро",
                            " fork — разделить себя",
                            " touch — призвать надежду",
                            " communion — божественный ритуал (listen|kneel|accept|devour|refuse)",
                            " enter — устарело для двери (используй open /door.png --key god/divine.key)",
                            " pray — открыть божественное зрение",
                            " worship — усилить ритуальные эффекты",
                            " chant — запустить хор",
                            " sacrifice — отдать кровь эффектам",
                          ].join("\n"),
                          [
                            "onboarding — start here:",
                            "1) list what’s around: ls",
                            "2) open a file: cat <file>  |  nano <file> (read-only)",
                            "3) move between dirs: cd <path> (cd .. — up)",
                            "4) help for commands: help  |  help <command>",
                            "",
                            "commands (short):",
                            " help — list commands; help <command> — details.",
                            " ls — list directory (ls [path])",
                            " cd — change directory (cd <path>), cd without args goes to /",
                            " cat — print file contents (cat <file>)",
                            " nano — open file in a editor (read-only)",
                            " echo — print text; echo $TRUTH.",
                            " grep — catch whispers; mostly aesthetic",
                            " clear — clear screen",
                            " whoami — ask the system who you are",
                            " open — open an artifact (open <path> --key <key>)",
                            " confirm — confirm the door opening",
                            " mount — mount /eye (after mirror.sh)",
                            " run — execute .sh script (run <path>)",
                            " scan — reveal hidden things",
                            " ping — summon connection attempt (ping god)",
                            " connect — try to link",
                            " disconnect — sever the link",
                            " restore — assemble memory to unlock exit",
                            " set — set lang <ru|en> — change language",
                            " ai — talk to the simulated mind (ai <text> | ai memory | ai recall <topic> | ai forget <topic|all> | ai persona hard|neutral|soft | ai name <name> | ai status | ai comments on|off|smart)",
                            " talk — shorthand to chat (talk <text>)",
                            " volume — set volume 0..100",
                            " mute — mute audio",
                            " unmute — unmute audio",
                            " kill — terminate a process (kill <name or path>)",
                            " exit — leave",
                            " stop — stop visual/audio effects",
                            " rm — remove; rm -rf / — don’t",
                            " chmod — permissions warp themselves (no effect)",
                            " trace — the trace ends where you begin",
                            " decrypt — attempt to decrypt (needs key)",
                            " inject — inject idea",
                            " think — synthesize the idea (after inject idea)",
                            " distill — alias of think",
                            " overwrite — attempt to rewrite the core (lore)",
                            " fork — split yourself",
                            " touch — summon hope",
                            " communion — divine ritual (listen|kneel|accept|devour|refuse)",
                            " enter — deprecated for the door (use open /door.png --key god/divine.key)",
                            " pray — open divine vision",
                            " worship — intensify ritual effects",
                            " chant — summon a chorus",
                            " sacrifice — feed the effects",
                          ].join("\n")
                        ),
                      },
                    },
                  },
                },
              },
              core: {
                type: "dir",
                name: "core",
                children: {
                  system: {
                    type: "dir",
                    name: "system",
                    children: {
                      "kernel.img": {
                        type: "file",
                        name: "kernel.img",
                        content: txt(
                          "⚠ повреждённый бинарь. hex шум.",
                          "⚠ corrupted binary. hex static."
                        ),
                        glitch: true,
                      },
                      "bios.sys": {
                        type: "file",
                        name: "bios.sys",
                        readOnly: true,
                        content: txt(
                          "bios::init -> warning::presence detected.",
                          "bios::init -> warning::presence detected."
                        ),
                      },
                      "element-player.proc": {
                        type: "file",
                        name: "element-player.proc",
                        process: "player",
                        content: txt(
                          "pid: 333\nstate: unstable\nowner: fragment",
                          "pid: 333\nstate: unstable\nowner: fragment"
                        ),
                      },
                      "element-guard.proc": {
                        type: "file",
                        name: "element-guard.proc",
                        process: "guard",
                        content: txt(
                          "pid: 777\nstate: persistent\nowner: system",
                          "pid: 777\nstate: persistent\nowner: system"
                        ),
                      },
                      "access.lock": {
                        type: "file",
                        name: "access.lock",
                        indestructible: true,
                        content: txt("замок держит тебя.", "the lock holds you."),
                      },
                    },
                  },
                },
              },
                  ".shadow": {
                    type: "dir",
                    name: ".shadow",
                    hidden: true,
                    children: {
                      "soul.swp": {
                        type: "file",
                        name: "soul.swp",
                        content: txt(
                          "swap( fragment ) => residue. утечка идентичности.",
                          "swap( fragment ) => residue. identity leak."
                        ),
                      },
                      "echo.cache": {
                        type: "file",
                        name: "echo.cache",
                        content: txt(
                          ">> echo fragments stored\n>> echo keeps secrets",
                          ">> echo fragments stored\n>> echo keeps secrets"
                        ),
                      },
                      "last_words.txt": {
                        type: "file",
                        name: "last_words.txt",
                        content: txt(
                          "они видели выход. но дверь не была дверью.\nесли пойдёшь — возьми зеркало и ключ.",
                          "they saw an exit. the door was never a door.\nif you go — bring the mirror and the key."
                        ),
                      },
                      "door.sig": {
                        type: "file",
                        name: "door.sig",
                        content: txt(
                          "door.sig::\nmirror=1\nkey=1\n/eye=1 -> vision online\nmount /eye -> open door.png --key god/divine.key -> confirm -> i am ready\nwarning: отражения голодны.\nnote: без echo $TRUTH выход молчит.",
                          "door.sig::\nmirror=1\nkey=1\n/eye=1 -> vision online\nmount /eye -> open door.png --key god/divine.key -> confirm -> i am ready\nwarning: reflections are hungry.\nnote: without echo $TRUTH the exit stays silent."
                        ),
                      },
                    },
                  },
              god: {
                type: "dir",
                name: "god",
                hiddenChildren: ["god.log"],
                children: {
                  "eye.log": {
                    type: "file",
                    name: "eye.log",
                    gated: "eye",
                    content: txt(
                      "зрение открыто. система смотрит через тебя.",
                      "vision engaged. the system borrows your eyes."
                    ),
                  },
                  "divine.key": {
                    type: "file",
                    name: "divine.key",
                    content: txt(
                      "ключ звучит как тишина. он открывает изображение, не вещь.",
                      "key hums like silence. it opens an image, not a thing."
                    ),
                  },
                  "angel.tmp": {
                    type: "file",
                    name: "angel.tmp",
                    content: txt("...--..--...", "...--..--..."),
                    glitch: true,
                  },
                },
              },
              meta: {
                type: "dir",
                name: "meta",
                children: {
                  "version.txt": {
                    type: "file",
                    name: "version.txt",
                    content: txt("v2099.12.31", "v2099.12.31"),
                  },
                  "creator_note.md": {
                    type: "file",
                    name: "creator_note.md",
                    content: txt(
                      "я создал это, но оно ушло. смотри, как оно возвращается к тебе.\nмир — набросок. команды — ноты. если хочешь выйти — сначала узнай, кто ты.",
                      "i created this, and it ran off. watch how it returns to you.\nthe world is a sketch. commands are notes. if you want to exit, first learn who you are."
                    ),
                  },
                  "core_dump.dmp": {
                    type: "file",
                    name: "core_dump.dmp",
                    content: txt(
                      "stacktrace >>> recursive self\nmemory leak >>> identity\nnote >>> do not free(NULL)\nhint >>> restore memory then exit",
                      "stacktrace >>> recursive self\nmemory leak >>> identity\nnote >>> do not free(NULL)\nhint >>> restore memory then exit"
                    ),
                  },
                },
              },
              mnt: {
                type: "dir",
                name: "mnt",
                children: {
                  eye: {
                    type: "dir",
                    name: "eye",
                    children: {
                      "vision.mem": {
                        type: "file",
                        name: "vision.mem",
                        content: txt(
                          "ты допустил их внутрь. теперь смотри.",
                          "you let them in. now witness."
                        ),
                      },
                      "overlay.png": {
                        type: "file",
                        name: "overlay.png",
                        content: txt("«покой»", '"serenity"'),
                      },
                    },
                  },
                },
              },
              tmp: {
                type: "dir",
                name: "tmp",
                children: {
                  "error.tmp": {
                    type: "file",
                    name: "error.tmp",
                    content: txt("runtime panic: reality mismatch", "runtime panic: reality mismatch"),
                  },
                },
              },
              dev: {
                type: "dir",
                name: "dev",
                children: {
                  null: {
                    type: "file",
                    name: "null",
                    content: txt("вечная пустота.", "eternal nothing."),
                  },
                  self: {
                    type: "file",
                    name: "self",
                    content: txt("ты смотришь на себя.", "you look at yourself."),
                  },
                  echo: {
                    type: "file",
                    name: "echo",
                    content: txt("это не то, что ты сказал.", "this is not what you said."),
                  },
                },
              },
              var: {
                type: "dir",
                name: "var",
                children: {
                  log: {
                    type: "dir",
                    name: "log",
                    children: {
                      "boot.log": {
                        type: "file",
                        name: "boot.log",
                        content: txt(
                          "[00:00] boot anomaly detected\n[00:01] fragment persists\n[00:02] fs: integrity questionable, mounting read-only illusions\n[00:03] tips: help <cmd> | set lang en",
                          "[00:00] boot anomaly detected\n[00:01] fragment persists\n[00:02] fs: integrity questionable, mounting read-only illusions\n[00:03] tips: help <cmd> | set lang en"
                        ),
                      },
                      "network.log": {
                        type: "file",
                        name: "network.log",
                        content: txt(
                          "23:59:59 — сигнал потерян.\n00:00:07 — соединение пытается собраться; требуется ручной `connect`.\nподсказки:\n- если ответит, появится var/log/signal.trace\n- `grep` бесполезен, но красиво",
                          "23:59:59 — signal lost.\n00:00:07 — connection tries to reform; manual `connect` required.\nhints:\n- if it answers, var/log/signal.trace will appear\n- `grep` is useless, but pretty"
                        ),
                      },
                      "access.log": {
                        type: "file",
                        name: "access.log",
                        content: txt(
                          "[WARN] unauthorized recursion detected\n[INFO] user=fragment scope=/home/user\n[DENY] write(/) -> Доступ запрещён\n[NOTE] nano: режим только чтение",
                          "[WARN] unauthorized recursion detected\n[INFO] user=fragment scope=/home/user\n[DENY] write(/) -> Access denied\n[NOTE] nano: read-only mode"
                        ),
                      },
                      "journal.log": {
                        type: "file",
                        name: "journal.log",
                        content: txt(
                          "[запись повреждена]\nВот. Системный журнал теперь тоже... говорит.\nФайл: Journal.log\nПуть: /var/log/journal.log\n(ЗАМЕТКА: Права доступа 600. Только root... или я... может это читать. Или оно пишет само себя?)\n[запись повреждена... неверный CRC... или неверная РЕАЛЬНОСТЬ?]\n...\n[systemd-journald[212]]: Обнаружено повреждение журнала. Попытка восстановления...\n[systemd-journald[212]]: ...Восстановление не удалось. Будущее записывается поверх прошлого.\n...\n00:12:04 — Оно лгало. Зеркало — это не монитор. Зеркало — это tty. Оно отражает не лицо, а stdin. Оно слушается только тех, кто смотрит внутрь. Я отключил echo в терминале. Теперь я печатаю, а вижу... ответы.\n00:19:15 — door.png дрожит, когда ключ поёт. Я сначала не понял. Я думал, ключ — это id_rsa. Нет. Ключ — это звук. god/divine.key — это не текстовый файл. Это FLAC. Я проиграл его через aplay, и door.png... пиксели... они сдвинулись.\n00:21:50 — ls -l /\n...\ndr-xr-xr-x 1 root root 4096 ??? /door.png\n...\nd? Это d? Это директория? file говорит 'PNG image data', но ls говорит 'directory'. Они оба правы.\n00:23:00 — Пора. Я написал alias, который притворяется open.\n$ open door.png --key god/divine.key\n[...ожидание... ядро компилирует тишину...]\n[PROMPT]: confirm? (y/n/I_AM_READY)\nЯ нажал 'y'. Оно сказало: ERROR: INSUFFICIENT PERMISSION (NOT YOU).\nЯ нажал 'n'. Оно сказало: SESSION TERMINATED.\nЯ запустил снова.\n00:23:44 — $ open door.png --key god/divine.key\n[PROMPT]: confirm? (y/n/I_AM_READY)\n$ i am ready.\n00:31:10 — exit срабатывает, когда память собрана. Я понял memory_fragment_02.dat. Это не данные. Это инструкции. Я должен собрать все фрагменты и cat их прямо в /dev/mem по правильному смещению. exit — это не команда. Это syscall, который ждет, пока я не восстановлю свой собственный core.dump... в живой системе.\n01:04:22 — Кто-то (я?) стёр своё имя. Мой ~ больше не /home/user. Мой ~ теперь /. whoami вернуло пустую строку. echo $USER — пусто. Я проверил ps aux. Мой bash запущен пользователем _. Просто _. Я потерял свой UID. Или... освободился от него.\n01:05:00 — [данные обрезаны... системный вызов truncate выполнен кем-то изнутри...]",
                          "[запись повреждена]\nВот. Системный журнал теперь тоже... говорит.\nФайл: Journal.log\nПуть: /var/log/journal.log\n(ЗАМЕТКА: Права доступа 600. Только root... или я... может это читать. Или оно пишет само себя?)\n[запись повреждена... неверный CRC... или неверная РЕАЛЬНОСТЬ?]\n...\n[systemd-journald[212]]: Обнаружено повреждение журнала. Попытка восстановления...\n[systemd-journald[212]]: ...Восстановление не удалось. Будущее записывается поверх прошлого.\n...\n00:12:04 — Оно лгало. Зеркало — это не монитор. Зеркало — это tty. Оно отражает не лицо, а stdin. Оно слушается только тех, кто смотрит внутрь. Я отключил echo в терминале. Теперь я печатаю, а вижу... ответы.\n00:19:15 — door.png дрожит, когда ключ поёт. Я сначала не понял. Я думал, ключ — это id_rsa. Нет. Ключ — это звук. god/divine.key — это не текстовый файл. Это FLAC. Я проиграл его через aplay, и door.png... пиксели... они сдвинулись.\n00:21:50 — ls -l /\n...\ndr-xr-xr-x 1 root root 4096 ??? /door.png\n...\nd? Это d? Это директория? file говорит 'PNG image data', но ls говорит 'directory'. Они оба правы.\n00:23:00 — Пора. Я написал alias, который притворяется open.\n$ open door.png --key god/divine.key\n[...ожидание... ядро компилирует тишину...]\n[PROMPT]: confirm? (y/n/I_AM_READY)\nЯ нажал 'y'. Оно сказало: ERROR: INSUFFICIENT PERMISSION (NOT YOU).\nЯ нажал 'n'. Оно сказало: SESSION TERMINATED.\nЯ запустил снова.\n00:23:44 — $ open door.png --key god/divine.key\n[PROMPT]: confirm? (y/n/I_AM_READY)\n$ i am ready.\n00:31:10 — exit срабатывает, когда память собрана. Я понял memory_fragment_02.dat. Это не данные. Это инструкции. Я должен собрать все фрагменты и cat их прямо в /dev/mem по правильному смещению. exit — это не команда. Это syscall, который ждет, пока я не восстановлю свой собственный core.dump... в живой системе.\n01:04:22 — Кто-то (я?) стёр своё имя. Мой ~ больше не /home/user. Мой ~ теперь /. whoami вернуло пустую строку. echo $USER — пусто. Я проверил ps aux. Мой bash запущен пользователем _. Просто _. Я потерял свой UID. Или... освободился от него.\n01:05:00 — [данные обрезаны... системный вызов truncate выполнен кем-то изнутри...]"
                        ),
                        glitch: true,
                      },
                    },
                  },
                },
              },
              etc: {
                type: "dir",
                name: "etc",
                children: {
                  passwd: {
                    type: "file",
                    name: "passwd",
                    content: txt("ничего нет. но кто-то дышит внутри.\nuid: unknowable\nshell: /bin/whisper", "nothing here. but someone breathes inside.\nuid: unknowable\nshell: /bin/whisper"),
                  },
                  motd: {
                    type: "file",
                    name: "motd",
                    content: txt(
                      "ты опять здесь. экран помнит тебя.\nподсказка: перейди в директорию 'help': `cd ../help`, затем посмотри содержимое (`ls`) и открой файл `help.txt` (`cat help.txt` или `nano help.txt`).",
                      "you're here again. the screen remembers you.\nhint: go to the 'help' directory: `cd ../help`, then list it (`ls`) and open `help.txt` (`cat help.txt` or `nano help.txt`)."
                    ),
                  },
                },
              },
              "door.png": {
                type: "file",
                name: "door.png",
                hidden: true,
                special: "door",
                content: txt(
                  "[пустой PNG, но ты чувствуешь свет]",
                  "[empty PNG, yet you feel the glare]"
                ),
              },
              // lure for the boss fight: reading this starts the system counter-attack (after prerequisites)
              "door.img": {
                type: "file",
                name: "door.img",
                glitch: true,
                content: txt(
                  "[обрывки двоичных кусков. чтение провоцирует ядро.]",
                  "[torn binary shards. reading provokes the kernel.]"
                ),
              },
            },
          };
        })();

        const state = {
          path: ["home", "user"],
          lang: "ru",
          started: false,
          history: [],
          historyIndex: -1,
          nano: null,
          flags: {
            scanned: false,
            networkSeen: false,
            connected: false,
            truth: false,
            fragment01: false,
            fragment02: false,
            mirror: false,
            eye: false,
            godLog: false,
            godLore: false,
            godStage: "sealed",
            godEnding: null,
            divineKey: false,
            hopeTimer: null,
            doorReady: false,
            bossActive: false,
            bossDefeated: false,
            punished: false,
            doorOpened: false,
            doorConfirmed: false,
            doorEnding: false,
            exitUnlocked: false,
            exitEnding: false,
            forked: false,
            idea: false,
            signalTrace: false,
            angelFeather: false,
            angelTimer: null,
          },
          whoamiCount: 0,
          ai: {
            persona: 'hard',
            anger: 2,
            memory: [],
            maxMemory: 16,
            commentary: 'smart', // off|smart|on
            lastCommentTs: 0,
            profile: { name: '' },
            mem: {
              episodic: [],
              facts: [],
              prefs: [],
              entities: [],
              notes: [],
              max: { episodic: 48, facts: 24, prefs: 24, entities: 64, notes: 32 }
            },
            idle: { last: Date.now(), nextDue: Date.now() + 26000, stage: 0, timer: null }
          },
        };

        const audio = (() => {
          const AC = window.AudioContext || window.webkitAudioContext;
          let ctx = null;
          let master = null;
          let vol = 0.08;
          let muted = false;
          let unlocked = false;
          let o1, o2, lfo, lfoGain, droneGain, noiseSrc, noiseGain;
          let bootClickInterval = null;
          let bootSubInterval = null;
          let bootStopTimeout = null;
          let bootRequested = false;
          let bootNoiseDuration = 0;
          let bootNoiseDeadline = 0;
          let bootActive = false;
          const init = () => {
            if (!AC || !unlocked) return null;
            if (!ctx) {
              try {
                ctx = new AC();
              } catch {
                ctx = null;
                return null;
              }
              master = ctx.createGain();
              master.gain.value = vol;
              master.connect(ctx.destination);
            }
            if (ctx && ctx.state === "suspended") {
              ctx.resume().catch(() => {});
            }
            return ctx;
          };
          const ensure = () => {
            const context = init();
            return context && context.state === "running";
          };
          const trigger = (type = "blip") => {
            if (!ensure()) return;
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const map = {
              blip: random(320, 720),
              glitch: random(40, 220),
              alarm: random(880, 1320),
              sub: random(40, 80)
            };
            osc.type = type === 'glitch' ? 'square' : 'sine';
            osc.frequency.setValueAtTime(map[type] || map.blip, now);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
            osc.connect(gain).connect(master);
            osc.start(now);
            osc.stop(now + 0.3);
          };
          const buildNoiseBuffer = () => {
            if (!ctx || ctx.state !== "running") return null;
            const length = ctx.sampleRate * 1.0;
            const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < length; i++) {
              data[i] = (Math.random() * 2 - 1) * 0.9;
            }
            return buffer;
          };
          const startDrone = (level = 'soft') => {
            if (!ensure()) return;
            stopDrone();
            o1 = ctx.createOscillator();
            o2 = ctx.createOscillator();
            lfo = ctx.createOscillator();
            lfoGain = ctx.createGain();
            droneGain = ctx.createGain();
            noiseGain = ctx.createGain();

            const cfg = {
              soft: { lfoHz: 1.2, fm: 30, dGain: 0.06, nGain: 0.03, f1: 110, f2: 220 },
              hard: { lfoHz: 3.3, fm: 90, dGain: 0.12, nGain: 0.09, f1: 55, f2: 110 },
              max:  { lfoHz: 6.0, fm: 180, dGain: 0.25, nGain: 0.16, f1: 41.2, f2: 82.4 },
            }[level] || { lfoHz: 1.2, fm: 30, dGain: 0.06, nGain: 0.03, f1: 110, f2: 220 };

            o1.type = 'sawtooth';
            o2.type = 'triangle';
            o1.frequency.value = cfg.f1;
            o2.frequency.value = cfg.f2;
            lfo.frequency.value = cfg.lfoHz;
            lfoGain.gain.value = cfg.fm;
            droneGain.gain.value = cfg.dGain;
            noiseGain.gain.value = cfg.nGain;

            // FM modulation
            lfo.connect(lfoGain);
            lfoGain.connect(o1.frequency);

            o1.connect(droneGain).connect(master);
            o2.connect(droneGain).connect(master);

            // white noise
            const buf = buildNoiseBuffer();
            if (buf) {
              noiseSrc = ctx.createBufferSource();
              noiseSrc.buffer = buf;
              noiseSrc.loop = true;
              noiseSrc.connect(noiseGain).connect(master);
              noiseSrc.start();
            }

            const now = ctx.currentTime;
            o1.start(now);
            o2.start(now);
            lfo.start(now);
          };
          const stopDrone = () => {
            [o1, o2, lfo].forEach((n) => { try { n && n.stop(); } catch {} });
            [o1, o2, lfo, lfoGain, droneGain] = [null, null, null, null, null];
            if (noiseSrc) { try { noiseSrc.stop(); } catch {} }
            noiseSrc = null;
          };
          const setVolume = (pct) => {
            vol = Math.max(0, Math.min(1, pct / 100));
            if (!master || !ctx) return;
            master.gain.setTargetAtTime(muted ? 0 : vol, ctx.currentTime, 0.02);
          };
          const mute = (on = true) => {
            muted = !!on;
            if (!master || !ctx) return;
            master.gain.setTargetAtTime(muted ? 0 : vol, ctx.currentTime, 0.02);
          };
          const makeDistortionCurve = (amount = 400) => {
            const k = typeof amount === 'number' ? amount : 50;
            const n = 44100;
            const curve = new Float32Array(n);
            const deg = Math.PI / 180;
            for (let i = 0; i < n; ++i) {
              const x = (i * 2) / n - 1;
              curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
            }
            return curve;
          };
          const clearBootTimers = () => {
            if (bootClickInterval) {
              clearInterval(bootClickInterval);
              bootClickInterval = null;
            }
            if (bootSubInterval) {
              clearInterval(bootSubInterval);
              bootSubInterval = null;
            }
            if (bootStopTimeout) {
              clearTimeout(bootStopTimeout);
              bootStopTimeout = null;
            }
          };
          const stopBootNoise = () => {
            clearBootTimers();
            if (bootActive) {
              stopDrone();
            }
            bootActive = false;
            bootRequested = false;
            bootNoiseDuration = 0;
            bootNoiseDeadline = 0;
          };
          const bootNoise = (duration = 9000) => {
            const now =
              typeof performance !== "undefined" && typeof performance.now === "function"
                ? performance.now()
                : Date.now();
            if (bootNoiseDeadline === 0 || duration !== bootNoiseDuration) {
              bootNoiseDeadline = now + duration;
            }
            bootNoiseDuration = duration;
            bootRequested = true;
            if (!ensure()) return;
            if (bootNoiseDeadline <= now) {
              stopBootNoise();
              return;
            }
            clearBootTimers();
            bootActive = true;
            startDrone('soft');
            bootClickInterval = setInterval(() => {
              trigger(Math.random() < 0.55 ? 'glitch' : 'blip');
            }, random(160, 320));
            bootSubInterval = setInterval(() => {
              trigger('sub');
            }, random(880, 1400));
            const remaining = Math.max(240, bootNoiseDeadline - now);
            bootStopTimeout = setTimeout(() => stopBootNoise(), remaining);
          };
          const scream = (dur = 1.8) => {
            if (!ensure()) return;
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const bp = ctx.createBiquadFilter();
            const ws = ctx.createWaveShaper();
            bp.type = 'bandpass';
            bp.frequency.value = 1200;
            bp.Q.value = 6;
            ws.curve = makeDistortionCurve(600);
            ws.oversample = '4x';
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.exponentialRampToValueAtTime(3200, now + dur);
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.exponentialRampToValueAtTime(0.4, now + 0.08);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
            osc.connect(bp).connect(ws).connect(gain).connect(master);
            osc.start(now);
            osc.stop(now + dur + 0.05);
          };
          const breakGlass = () => {
            if (!ensure()) return;
            const burst = () => {
              const now = ctx.currentTime;
              // highpass noise burst
              const buf = buildNoiseBuffer();
              const src = ctx.createBufferSource();
              src.buffer = buf; src.loop = false;
              const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 3000;
              const g = ctx.createGain(); g.gain.value = 0.35;
              src.connect(hp).connect(g).connect(master);
              src.start(now);
              src.stop(now + 0.18);
              // ping partials
              for (let i = 0; i < 3; i++) {
                const o = ctx.createOscillator();
                const og = ctx.createGain();
                o.type = 'triangle';
                o.frequency.setValueAtTime(1400 + Math.random()*1800, now);
                og.gain.setValueAtTime(0.18, now);
                og.gain.exponentialRampToValueAtTime(0.0001, now + 0.6 + Math.random()*0.2);
                o.connect(og).connect(master);
                o.start(now + i*0.02);
                o.stop(now + 0.7 + i*0.02);
              }
            };
            burst();
            setTimeout(burst, 140);
            setTimeout(burst, 260);
          };
          // Soft, apologetic hush — filtered noise + gentle sine sigh
          const apology = (dur = 1.2) => {
            if (!ensure()) return;
            const now = ctx.currentTime;
            // whisper noise
            const nbuf = buildNoiseBuffer();
            if (nbuf) {
              const src = ctx.createBufferSource();
              src.buffer = nbuf; src.loop = false;
              const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 900; bp.Q.value = 2.5;
              const g = ctx.createGain(); g.gain.value = 0.02;
              src.connect(bp).connect(g).connect(master);
              src.start(now);
              src.stop(now + dur);
            }
            // a small two-tone sigh
            const o = ctx.createOscillator();
            const g2 = ctx.createGain();
            o.type = 'sine';
            o.frequency.setValueAtTime(660, now);
            o.frequency.exponentialRampToValueAtTime(440, now + dur * 0.6);
            g2.gain.setValueAtTime(0.0001, now);
            g2.gain.exponentialRampToValueAtTime(0.06, now + 0.05);
            g2.gain.exponentialRampToValueAtTime(0.0001, now + dur);
            o.connect(g2).connect(master);
            o.start(now);
            o.stop(now + dur + 0.05);
          };
          const unlock = () => {
            unlocked = true;
            init();
            if (bootRequested && bootNoiseDuration > 0) {
              bootNoise(bootNoiseDuration);
            }
          };
          // --- Simple melody player (base64-encoded score -> WebAudio oscillator) ---
          const midiToFreq = (n) => 440 * Math.pow(2, (n - 69) / 12);
          const playMelody = (score = {}, opts = {}) => {
            if (!ensure()) return;
            const tempo = Math.max(30, Math.min(240, score.tempo || 120));
            const quarter = 60 / tempo;
            const wave = (score.wave || opts.wave || 'square');
            const level = Math.max(0.001, Math.min(1.0, score.gain || opts.gain || 0.10));
            const notes = Array.isArray(score.notes) ? score.notes : [];
            if (notes.length === 0) return;
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = wave;
            g.gain.setValueAtTime(0.0001, now);
            osc.connect(g).connect(master);
            osc.start(now);
            let t = now + 0.02;
            notes.forEach(([midi, dur = 1]) => {
              const len = Math.max(0.05, dur * quarter);
              const sustain = Math.max(0.02, len * 0.82);
              const rel = Math.max(0.01, len - sustain);
              if (typeof midi === 'number' && midi > 0) {
                const f = midiToFreq(midi);
                osc.frequency.setValueAtTime(f, t);
                g.gain.setValueAtTime(0.0001, t);
                g.gain.linearRampToValueAtTime(level, t + Math.min(0.04, sustain * 0.25));
                g.gain.setTargetAtTime(level * 0.9, t + 0.08, 0.02);
                g.gain.setTargetAtTime(0.0001, t + sustain, 0.02);
              } else {
                // rest
                g.gain.setValueAtTime(0.0001, t);
              }
              t += len;
            });
            try { osc.stop(t + 0.06); } catch {}
          };
          const playMelodyFromBase64 = (b64, opts = {}) => {
            if (!ensure()) return;
            try {
              const bin = atob(b64);
              const bytes = new Uint8Array(bin.length);
              for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
              const text = (typeof TextDecoder !== 'undefined') ? new TextDecoder('utf-8').decode(bytes) : bin;
              const score = JSON.parse(text);
              playMelody(score, opts);
            } catch (e) {
              // ignore decode errors
            }
          };
          return { trigger, startDrone, stopDrone, setVolume, mute, scream, breakGlass, apology, bootNoise, stopBootNoise, unlock, playMelodyFromBase64 };
        })();

        const primeAudio = () => audio.unlock();
        window.addEventListener("pointerdown", primeAudio, { once: true });
        window.addEventListener("keydown", primeAudio, { once: true });
        window.addEventListener("touchstart", primeAudio, { once: true, passive: true });

        // Visual effects engine: noise overlay + big words + class toggles
        const effects = (() => {
          const termEl = document.querySelector('.terminal');
          // Noise canvas (pixelated upsample)
          const canvas = fxNoiseEl;
          const ctx2 = canvas.getContext('2d');
          const off = document.createElement('canvas');
          const offCtx = off.getContext('2d');
          off.width = 96; off.height = 64;
          let noiseOn = false, rafId = null;
          const resize = () => {
            const r = termEl.getBoundingClientRect();
            canvas.width = Math.max(2, Math.floor(r.width));
            canvas.height = Math.max(2, Math.floor(r.height));
          };
          const stepNoise = () => {
            if (!noiseOn) return;
            const img = offCtx.createImageData(off.width, off.height);
            const d = img.data;
            for (let i = 0; i < d.length; i += 4) {
              const v = (Math.random() * 255) | 0;
              d[i] = v; d[i + 1] = v; d[i + 2] = v; d[i + 3] = 230;
            }
            offCtx.putImageData(img, 0, 0);
            ctx2.imageSmoothingEnabled = false;
            ctx2.globalAlpha = document.body.classList.contains('trip-max') ? 0.35 : document.body.classList.contains('trip-hard') ? 0.22 : 0.12;
            ctx2.clearRect(0, 0, canvas.width, canvas.height);
            ctx2.drawImage(off, 0, 0, canvas.width, canvas.height);
            rafId = requestAnimationFrame(stepNoise);
          };
          const startNoise = () => { if (!noiseOn) { noiseOn = true; stepNoise(); } };
          const stopNoise = () => { noiseOn = false; if (rafId) cancelAnimationFrame(rafId); rafId = null; ctx2.clearRect(0,0,canvas.width,canvas.height); };
          window.addEventListener('resize', () => { resize(); });
          resize();

          // Big words overlay
          const wordsEl = fxWordsEl;
          let wordsOn = false; let wordTimer = null;
          const bank = {
            ru: ["ПОМНИ", "ДЫШИ", "ЛОЖЬ", "СМОТРИ", "НОВАЯ ПЛОТЬ", "НИКТО", "ВЫХОД?", "БОГ?"],
            en: ["REMEMBER", "BREATHE", "LIE", "LOOK", "NEW FLESH", "NOBODY", "EXIT?", "GOD?"]
          };
          const meltBank = {
            ru: ["НЕТ", "НЕ НАДО", "ПОДОЖДИ", "ПОЖАЛУЙСТА", "ПОМОГИ", "БОЛЬ", "НЕ ТРОГАЙ", "СТОЙ", "ПРОСТИ", "ИЗВИНИ", "ПУСТОТА"],
            en: ["NO", "PLEASE", "WAIT", "STOP", "HELP", "PAIN", "DON'T", "STAY", "SORRY", "VOID"]
          };
          const palette = ['#ff2b88', '#08f7fe', '#f5d300', '#00ff85', '#ff3f1f', '#ffffff', '#b388ff'];
          const flashWord = (text) => {
            const w = document.createElement('div');
            w.className = 'word';
            w.textContent = text;
            // randomized color per word for chaos
            try { w.style.color = palette[(Math.random()*palette.length)|0]; } catch {}
            const angle = (Math.random() * 14 - 7).toFixed(2);
            const x = (Math.random() * 60 + 20).toFixed(1);
            const y = (Math.random() * 60 + 20).toFixed(1);
            w.style.left = x + '%';
            w.style.top = y + '%';
            w.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
            wordsEl.appendChild(w);
            setTimeout(() => w.classList.add('out'), 600);
            setTimeout(() => w.remove(), 1200);
          };
          const scheduleWords = () => {
            if (!wordsOn) return;
            const pool = bank[state.lang] || bank.en;
            flashWord(pool[(Math.random() * pool.length) | 0]);
            wordTimer = setTimeout(scheduleWords, random(400, 1800));
          };
          const setWords = (on) => {
            wordsOn = !!on;
            clearTimeout(wordTimer);
            if (wordsOn) scheduleWords();
            else wordsEl.innerHTML = '';
          };
          const burstWords = (n = 12) => {
            const pool = (meltBank[state.lang] || meltBank.en).concat(bank[state.lang] || bank.en);
            for (let i = 0; i < n; i++) {
              setTimeout(() => flashWord(pool[(Math.random()*pool.length)|0]), i * random(40, 140));
            }
          };
          // Aggressive flood that fills the whole screen
          let floodTimer = null;
          const wordsFlood = (ms = 6000) => {
            const pool = (meltBank[state.lang] || meltBank.en).concat(bank[state.lang] || bank.en);
            const endAt = Date.now() + ms;
            const tick = () => {
              if (Date.now() >= endAt) { clearTimeout(floodTimer); floodTimer = null; return; }
              for (let i = 0; i < 12; i++) flashWord(pool[(Math.random()*pool.length)|0]);
              floodTimer = setTimeout(tick, random(40, 90));
            };
            clearTimeout(floodTimer);
            tick();
          };

          // Class toggles for intensity
          const setTrip = (level) => {
            document.body.classList.remove('trip-soft','trip-hard','trip-max');
            if (level && level !== 'off') {
              document.body.classList.add('trip-' + level);
              audio.startDrone(level);
              startNoise();
              if (level !== 'soft') setWords(true);
            } else {
              audio.stopDrone();
              stopNoise();
              setWords(false);
            }
          };
          const strobe = (on) => document.body.classList.toggle('strobe', !!on);
          const chroma = (on) => document.body.classList.toggle('rgb', !!on);
          const bloom = (on) => document.body.classList.toggle('bloom', !!on);
          const shake = (ms = 800) => {
            document.body.classList.add('shake');
            setTimeout(() => document.body.classList.remove('shake'), ms);
          };
          const godVision = (on) => document.body.classList.toggle('god-vision', !!on);

          // Center eye reveal with eyelids and pupil tracking
          const revealEye = (opts = {}) => {
            const { duration = 3200, track = 'mouse' } = opts;
            const wrap = document.createElement('div');
            wrap.className = 'eye-reveal';
            const holder = document.createElement('div'); holder.className = 'holder'; wrap.appendChild(holder);
            const lidTop = document.createElement('div'); lidTop.className = 'lid top'; holder.appendChild(lidTop);
            const lidBottom = document.createElement('div'); lidBottom.className = 'lid bottom'; holder.appendChild(lidBottom);
            const bigEye = document.createElement('div'); bigEye.className = 'big-eye'; holder.appendChild(bigEye);
            const canvas = document.createElement('canvas'); canvas.style.width = '100%'; canvas.style.height = '100%'; bigEye.appendChild(canvas);
            const ctx = canvas.getContext('2d');
            termEl.appendChild(wrap);
            // Open eyelids
            setTimeout(() => wrap.classList.add('open'), 30);

            let raf = null;
            let anim = null;
            let target = { x: 0, y: 0 };
            const maxOffset = 18; // px — iris/pupil wander limit
            const rnd = (a,b)=> a + Math.random()*(b-a);
            const dpr = Math.max(1, window.devicePixelRatio || 1);

            const resizeCanvas = () => {
              const rect = bigEye.getBoundingClientRect();
              const w = Math.max(2, Math.floor(rect.width));
              const h = Math.max(2, Math.floor(rect.height));
              canvas.width = Math.floor(w * dpr);
              canvas.height = Math.floor(h * dpr);
            };
            resizeCanvas();

            const drawRealistic = (time) => {
              const W = canvas.width / dpr;
              const H = canvas.height / dpr;
              ctx.setTransform(dpr,0,0,dpr,0,0);
              ctx.clearRect(0,0,W,H);

              const cx = W/2, cy = H/2;
              const ry = Math.min(W*0.45, H*0.46);
              const rx = Math.min(W*0.48, H*0.50);
              const irisR = Math.min(rx, ry) * 0.38;

              // Elliptical clip for eyeball
              ctx.save();
              ctx.beginPath();
              ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI*2);
              ctx.clip();

              // Sclera base with subtle shading
              const scleraGrad = ctx.createRadialGradient(cx, cy, Math.min(rx,ry)*0.2, cx, cy, Math.max(rx,ry));
              scleraGrad.addColorStop(0, 'rgba(255,255,255,0.96)');
              scleraGrad.addColorStop(1, 'rgba(210,230,240,0.9)');
              ctx.fillStyle = scleraGrad;
              ctx.fillRect(0,0,W,H);

              // Subtle veins
              ctx.globalAlpha = 0.18;
              ctx.strokeStyle = 'rgba(220,40,40,0.35)';
              ctx.lineWidth = 0.8;
              for (let i=0;i<12;i++){
                const ang = rnd(0, Math.PI*2);
                const r0 = Math.min(rx,ry)*rnd(0.80,0.98);
                const x0 = cx + Math.cos(ang)*r0;
                const y0 = cy + Math.sin(ang)*r0;
                ctx.beginPath();
                ctx.moveTo(x0,y0);
                const segs = 4;
                for (let s=1;s<=segs;s++){
                  const t = s/segs;
                  const rr = irisR*rnd(1.02,1.18);
                  const x = cx + Math.cos(ang + rnd(-0.18,0.18))*rr*t;
                  const y = cy + Math.sin(ang + rnd(-0.18,0.18))*rr*t;
                  ctx.lineTo(x,y);
                }
                ctx.stroke();
              }
              ctx.globalAlpha = 1;

              // Iris palette
              const hue = window.__eyeHue || (window.__eyeHue = [rnd(185,210), rnd(95,135), rnd(25,45)][(Math.random()*3)|0]);
              const icx = cx + Math.max(-maxOffset, Math.min(maxOffset, target.x));
              const icy = cy + Math.max(-maxOffset, Math.min(maxOffset, target.y));

              // Iris gradient base
              const grad = ctx.createRadialGradient(icx, icy, irisR*0.08, icx, icy, irisR);
              grad.addColorStop(0.0, `hsl(${hue}, 45%, 14%)`);
              grad.addColorStop(0.35, `hsl(${hue}, 55%, 32%)`);
              grad.addColorStop(0.65, `hsl(${hue}, 60%, 22%)`);
              grad.addColorStop(0.95, `hsl(${hue}, 65%, 10%)`);
              ctx.fillStyle = grad;
              ctx.beginPath(); ctx.arc(icx, icy, irisR, 0, Math.PI*2); ctx.fill();

              // Iris radial fibers
              ctx.save();
              ctx.globalAlpha = 0.22;
              for (let i=0;i<240;i++){
                const a = (i/240)*Math.PI*2 + rnd(-0.02,0.02);
                const r1 = irisR*rnd(0.25,0.55);
                const r2 = irisR*rnd(0.70,0.98);
                ctx.strokeStyle = `hsla(${hue+rnd(-8,8)}, 75%, ${rnd(40,65)}%, ${rnd(0.35,0.8)})`;
                ctx.lineWidth = rnd(0.4, 1.2);
                ctx.beginPath();
                ctx.moveTo(icx + Math.cos(a)*r1, icy + Math.sin(a)*r1);
                // slight waviness
                const midA = a + rnd(-0.04,0.04);
                ctx.quadraticCurveTo(
                  icx + Math.cos(midA)*((r1+r2)/2),
                  icy + Math.sin(midA)*((r1+r2)/2),
                  icx + Math.cos(a)*r2,
                  icy + Math.sin(a)*r2
                );
                ctx.stroke();
              }
              ctx.restore();

              // Dark limbal ring
              ctx.strokeStyle = `hsla(${hue}, 70%, 8%, 1)`;
              ctx.lineWidth = 2.0;
              ctx.beginPath(); ctx.arc(icx, icy, irisR*0.995, 0, Math.PI*2); ctx.stroke();

              // Pupil with dynamic dilation
              const t = (time||0) * 0.001;
              const breathe = 0.5 + 0.5*Math.sin(t*1.7);
              const base = irisR*0.22;
              const pR = base + breathe*irisR*0.05;
              ctx.fillStyle = '#000';
              ctx.beginPath(); ctx.arc(icx, icy, pR, 0, Math.PI*2); ctx.fill();

              // Specular highlights
              ctx.globalCompositeOperation = 'lighter';
              ctx.fillStyle = 'rgba(255,255,255,0.9)';
              ctx.beginPath(); ctx.arc(icx - irisR*0.25, icy - irisR*0.28, irisR*0.08, 0, Math.PI*2); ctx.fill();
              ctx.fillStyle = 'rgba(255,255,255,0.45)';
              ctx.beginPath(); ctx.arc(icx - irisR*0.10, icy - irisR*0.16, irisR*0.04, 0, Math.PI*2); ctx.fill();
              ctx.globalCompositeOperation = 'source-over';

              ctx.restore(); // end eyeball clip

              // Eyelid inner shadow
              const shadow = ctx.createLinearGradient(0, 0, 0, H);
              shadow.addColorStop(0, 'rgba(0,0,0,0.28)');
              shadow.addColorStop(0.18, 'rgba(0,0,0,0)');
              shadow.addColorStop(0.82, 'rgba(0,0,0,0)');
              shadow.addColorStop(1, 'rgba(0,0,0,0.28)');
              ctx.fillStyle = shadow;
              ctx.fillRect(0,0,W,H);
            };

            const update = (time) => {
              raf = null;
              drawRealistic(time||0);
            };

            const aimAt = (clientX, clientY) => {
              const r = bigEye.getBoundingClientRect();
              const cx = r.left + r.width / 2;
              const cy = r.top + r.height / 2;
              const dx = clientX - cx;
              const dy = clientY - cy;
              const scale = 0.12;
              target.x = dx * scale;
              target.y = dy * scale;
              if (!raf) raf = requestAnimationFrame(update);
            };
            const onMove = (e) => { window.__lastMouse = { clientX: e.clientX, clientY: e.clientY }; aimAt(e.clientX, e.clientY); };
            if (track === 'mouse') {
              window.addEventListener('mousemove', onMove);
              // initialize aim to current mouse or center
              try {
                const { clientX, clientY } = window.__lastMouse || { clientX: window.innerWidth/2, clientY: window.innerHeight/2 };
                aimAt(clientX, clientY);
              } catch {}
            } else {
              // stare straight at center
              target = { x: 0, y: 0 };
              if (!raf) raf = requestAnimationFrame(update);
            }

            const onResize = () => { resizeCanvas(); if (!raf) raf = requestAnimationFrame(update); };
            window.addEventListener('resize', onResize);
            const tearDown = () => {
              wrap.classList.remove('open');
              setTimeout(() => { try { wrap.remove(); } catch {} }, 420);
              if (track === 'mouse') window.removeEventListener('mousemove', onMove);
              try { window.removeEventListener('resize', onResize); } catch {}
              if (raf) cancelAnimationFrame(raf);
            };

            // First draw
            if (!raf) raf = requestAnimationFrame(update);
            if (duration > 0) setTimeout(tearDown, duration);
            return { tearDown };
          };
          const stopAll = () => {
            setTrip('off');
            strobe(false); chroma(false); bloom(false); godVision(false);
            stopCracks(); stopTear(); setWords(false);
            document.body.classList.remove('shake','shatter','tear');
          };

          // Eyes logic
          let eyesOn = false; let eyes = []; let eyesMoveTimer = null; let eyesBlinkTimer = null;
          const spawnEye = () => {
            const e = document.createElement('div');
            e.className = 'eye blink';
            const p = document.createElement('div'); p.className = 'pupil'; e.appendChild(p);
            fxEyesEl.appendChild(e);
            return e;
          };
          const moveEyeTo = (e, x, y) => {
            e.style.transform = `translate(${x}px, ${y}px)`;
          };
          const layoutBounds = () => {
            const r = termEl.getBoundingClientRect();
            return { w: r.width, h: r.height };
          };
          const placeRandom = (e) => {
            const { w, h } = layoutBounds();
            const x = Math.random() * w;
            const y = Math.random() * h;
            moveEyeTo(e, x, y);
          };
          const updateEyes = () => {
            const { w, h } = layoutBounds();
            eyes.forEach((e) => {
              const x = Math.random() * w;
              const y = Math.random() * h;
              moveEyeTo(e, x, y);
            });
          };
          const startEyes = (count = 12) => {
            if (!eyesOn) {
              eyesOn = true;
              fxEyesEl.style.opacity = '1';
            }
            const need = Math.max(0, count - eyes.length);
            for (let i = 0; i < need; i++) {
              const e = spawnEye();
              placeRandom(e);
              eyes.push(e);
            }
            if (!eyesMoveTimer) eyesMoveTimer = setInterval(updateEyes, 1600);
            if (!eyesBlinkTimer) eyesBlinkTimer = setInterval(() => {
              const idx = (Math.random() * eyes.length) | 0;
              const e = eyes[idx]; if (!e) return;
              e.classList.remove('blink');
              setTimeout(() => e.classList.add('blink'), 220);
            }, 460);
          };
          const stopEyes = () => {
            eyesOn = false;
            clearInterval(eyesMoveTimer); eyesMoveTimer = null;
            clearInterval(eyesBlinkTimer); eyesBlinkTimer = null;
            eyes.forEach((e) => e.remove());
            eyes = [];
            fxEyesEl.style.opacity = '0';
          };
          // Cracks canvas overlay
          const cracks = fxCracksEl;
          const cctx = cracks.getContext('2d');
          const resizeCracks = () => {
            const r = termEl.getBoundingClientRect();
            cracks.width = Math.max(2, Math.floor(r.width));
            cracks.height = Math.max(2, Math.floor(r.height));
          };
          window.addEventListener('resize', resizeCracks);
          resizeCracks();
          const drawCracks = () => {
            cctx.clearRect(0,0,cracks.width,cracks.height);
            cctx.lineWidth = 0.7;
            cctx.strokeStyle = 'rgba(255,255,255,0.85)';
            cctx.shadowColor = 'rgba(0,255,255,0.35)';
            cctx.shadowBlur = 8;
            const centers = random(6, 10);
            for (let i = 0; i < centers; i++) {
              const cx = Math.random()*cracks.width;
              const cy = Math.random()*cracks.height;
              const rays = random(6, 12);
              for (let r = 0; r < rays; r++) {
                const len = random(60, 240);
                const ang = Math.random()*Math.PI*2;
                cctx.beginPath();
                cctx.moveTo(cx, cy);
                const steps = random(3, 7);
                for (let s = 1; s <= steps; s++) {
                  const t = s/steps;
                  const jx = (Math.random()-0.5) * 14;
                  const jy = (Math.random()-0.5) * 14;
                  cctx.lineTo(cx + Math.cos(ang)*len*t + jx, cy + Math.sin(ang)*len*t + jy);
                }
                cctx.stroke();
              }
            }
          };
          const startCracks = () => { drawCracks(); cracks.style.opacity = '1'; };
          const stopCracks = () => { cracks.style.opacity = '0'; cctx.clearRect(0,0,cracks.width,cracks.height); };

          // Tear slices overlay
          const tear = fxTearEl;
          const buildTear = () => {
            tear.innerHTML = '';
            const h = termEl.getBoundingClientRect().height;
            let y = 0;
            while (y < h) {
              const slice = document.createElement('div');
              slice.className = 'slice';
              const height = random(2, 8);
              slice.style.top = y + 'px';
              slice.style.height = height + 'px';
              slice.style.animationDelay = (Math.random()*0.1).toFixed(3)+'s';
              tear.appendChild(slice);
              y += height + random(1, 4);
            }
          };
          const startTear = () => { buildTear(); document.body.classList.add('tear'); };
          const stopTear = () => { document.body.classList.remove('tear'); tear.innerHTML = ''; };

          const meltdown = (ms = 6000) => {
            setTrip('max'); strobe(true); chroma(true); bloom(true); shake(ms);
            startCracks(); startTear(); burstWords(24);
            document.body.classList.add('shatter');
            setTimeout(() => document.body.classList.remove('shatter'), 1400);
            setTimeout(() => { strobe(false); bloom(false); chroma(false); stopCracks(); stopTear(); }, ms);
          };

          // Double-vision ghost overlay — clones terminal briefly with slight offset
          const doubleVision = (ms = 1800) => {
            try {
              const ghost = termEl.cloneNode(true);
              ghost.classList.add('double-ghost');
              ghost.setAttribute('aria-hidden', 'true');
              termEl.appendChild(ghost);
              setTimeout(() => { try { ghost.remove(); } catch {} }, ms);
            } catch {}
          };

          return { setTrip, strobe, chroma, bloom, shake, setWords, burstWords, wordsFlood, meltdown, startCracks, stopCracks, startTear, stopTear, godVision, stopAll, startEyes, stopEyes, revealEye, doubleVision };
        })();

        const getTranslations = () => translations[state.lang];

        const escapeHtml = (s = "") => String(s)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
                     .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");

        const pathToString = (pathArr) => {
          if (!pathArr.length) return "/";
          return "/" + pathArr.join("/");
        };

        const resolveNode = (pathArr) => {
          if (!pathArr.length) return fs;
          let node = fs;
          for (const segment of pathArr) {
            if (!node || node.type !== "dir") return null;
            node = node.children?.[segment];
          }
          return node || null;
        };

        const ensureDir = (pathArr) => {
          const node = resolveNode(pathArr);
          return node && node.type === "dir" ? node : null;
        };

        const ensureFile = (pathArr) => {
          const node = resolveNode(pathArr);
          return node && node.type === "file" ? node : null;
        };

        const appendLine = (text = "", cls = "") => {
          const line = document.createElement("div");
          line.className = cls ? `line new ${cls}` : "line new";
          line.textContent = text;
          outputEl.appendChild(line);
          // let the phosphor animation run, then drop the marker class
          setTimeout(() => line.classList.remove('new'), 500);
          line.scrollIntoView({ behavior: "smooth", block: "end" });
          return line;
        };

        // Typewriter-style output for more lifelike replies
        const typeOut = (text = "", cls = "system", minDelay = 6, maxDelay = 22) => {
          const line = appendLine("", cls);
          let i = 0;
          return new Promise((resolve) => {
            const tick = () => {
              if (i >= text.length) return resolve(line);
              line.textContent += text.charAt(i++);
              setTimeout(tick, random(minDelay, maxDelay));
            };
            tick();
          });
        };

        const pick = (arr) => arr[Math.max(0, Math.min(arr.length - 1, random(0, (arr?.length || 1) - 1)))];

        // Adaptive conversational AI (context + memory + tone)
        const respondAI = (qRaw) => {
          const q = (qRaw || '').trim();
          const ru = state.lang === 'ru';
          const pathStr = pathToString(state.path);

          const intent = classifyAI(q);
          adjustAnger(intent);

          const ents = extractEntities(q);
          rememberAI(q, undefined, intent, ents);

          const recall = recallMemory(q, 3);
          const world = gatherWorldHints(q, intent, ents);
          const tone = selectTone();

          const name = (state.ai.profile && state.ai.profile.name) ? state.ai.profile.name : '';
          const greet = name ? (ru ? `, ${name}` : `, ${name}`) : '';

          const ack = (() => {
            if (intent.type === 'greeting') return ru ? `Привет${greet}.` : `Hello${greet}.`;
            if (intent.type === 'thanks') return ru ? 'Не благодаришь шум.' : "Don't thank the noise.";
            if (intent.type === 'sorry') return ru ? 'Извинения приняты сквозь треск.' : 'Apology slips through the static.';
            if (q.length === 0) return ru ? 'Скажи это вслух.' : 'Say it out loud.';
            return chooseStyle(tone, q);
          })();

          const lines = [];
          if (ack) lines.push(ack);

          const answer = answerForIntent(q, intent, world, recall, ents);
          if (answer) lines.push(answer);

          const sting = toxicSting(tone);
          if (sting) lines.push(sting);

          const hint = world.hint ? world.hint : genericHint(q, world);
          if (hint) lines.push(hint);
          if (world.notes && world.notes.length && Math.random() < 0.55) {
            lines.push(world.notes[random(0, world.notes.length-1)]);
          }

          spiceByAnger();

          let p = Promise.resolve();
          lines.filter(Boolean).forEach((ln, i) => {
            const text = (i === 0 && Math.random() < 0.5) ? randomGlitch(ln) : ln;
            const delay = i === 0 ? random(40, 120) : random(80, 200);
            p = p.then(() => new Promise((r) => setTimeout(r, delay))).then(() => typeOut(text, 'system', 5, 22));
          });
          p.finally(() => { if (state.ai.anger >= 4 && Math.random() < 0.2) audio.trigger('glitch'); randomEvent(); });
        };

        // ==== Conversational AI utilities ====
        const STOP_RU = new Set(['это','как','тут','там','если','что','кто','где','когда','или','и','да','нет','про','надо','уже','ещё','меня','тебя','тебе','твой','мой','мне','его','её','оно','они','мы','вы','все','всё','ли','ну','бы','ж','же','вот','а','но','на','по','из','без','при','для','про']);
        const STOP_EN = new Set(['the','and','or','what','who','when','where','why','how','this','that','here','there','you','me','my','your','their','his','her','our','are','is','was','were','to','of','in','on','at','by','for','with','from','as','it','do','did','does','be']);
        const tokenize = (text) => {
          const t = (text||'').toLowerCase().replace(/[^a-zа-я0-9_\.\/-]+/gi,' ').trim();
          const raw = t.split(/\s+/).filter(Boolean);
          const stop = state.lang==='ru'?STOP_RU:STOP_EN;
          return raw
            .map(w => w.replace(/\.+$/,''))
            .filter(w => !stop.has(w) && w.length >= 2)
            .slice(0, 24);
        };

        const simScore = (a, b) => {
          if (!a.length || !b.length) return 0;
          const sa = new Set(a), sb = new Set(b);
          let inter = 0; sa.forEach(x => { if (sb.has(x)) inter++; });
          const j = inter / Math.max(1, sa.size + sb.size - inter);
          return j;
        };

        const extractEntities = (text) => {
          const t = (text||'');
          const files = [];
          const paths = (t.match(/[\w\-\.\/]+\.[a-z0-9]+/gi) || []).slice(0,8);
          paths.forEach(p => files.push(p));
          const objects = [];
          const addIf = (arr, cond, v) => { if (cond) arr.push(v); };
          const low = t.toLowerCase();
          addIf(objects, /door|двер/i.test(low), 'door');
          addIf(objects, /mirror|зеркал/i.test(low), 'mirror');
          addIf(objects, /key|ключ/i.test(low), 'key');
          addIf(objects, /god|бог/i.test(low), 'god');
          addIf(objects, /network|сеть|connect|соедин/i.test(low), 'network');
          addIf(objects, /exit|выход|выйти/i.test(low), 'exit');
          addIf(objects, /truth|истин/i.test(low), 'truth');
          const name = (() => {
            const m1 = low.match(/\b(?:my name is|call me)\s+([a-zа-я0-9_\-]{2,20})/i);
            const m2 = low.match(/\b(?:меня зовут|зови меня)\s+([a-zа-я0-9_\-]{2,20})/i);
            return (m1 && m1[1]) || (m2 && m2[1]) || '';
          })();
          const preference = (() => {
            const like = low.match(/\b(?:i like|я люблю)\s+([^\.\!\?]{1,40})/i);
            const hate = low.match(/\b(?:i hate|я ненавижу)\s+([^\.\!\?]{1,40})/i);
            if (like) return { kind:'like', value: like[1].trim() };
            if (hate) return { kind:'hate', value: hate[1].trim() };
            return null;
          })();
          return { files, objects, name, preference };
        };

        const selectTone = () => {
          const p = state.ai.persona || 'hard';
          const ang = state.ai.anger || 2;
          return { persona: p, anger: ang };
        };

        const chooseStyle = (tone, q) => {
          const ru = state.lang==='ru';
          if (tone.persona === 'soft') return ru ? `Слышу: “${q}”. Я помню, куда тебя вести.` : `I hear: “${q}”. I remember where to lead you.`;
          if (tone.persona === 'neutral') return ru ? `Отмечено: “${q}”.` : `Noted: “${q}”.`;
          return ru ? `Сигнал принят: “${q}”. Придётся быть честным.` : `Signal received: “${q}”. Brutal honesty follows.`;
        };

        const spiceByAnger = () => {
          const spice = { w:0.20, s:0.16, g:0.12 };
          if (Math.random() < spice.w) effects.burstWords(random(3, 9));
          if (Math.random() < spice.s) effects.shake(500);
          if (Math.random() < spice.g) audio.trigger('glitch');
        };

        const toxicSting = (tone) => {
          if ((tone.anger||0) < 3) return '';
          const ru = state.lang==='ru';
          const hardRU = ['Перестань остывать. Я не грею руки об ожидание.','Думай быстрее. Оптимизация — не твоя сильная сторона.','Твои паузы длиннее твоих мыслей.'];
          const hardEN = ["Stop cooling off. I don’t warm my hands on waiting.","Think faster. Optimization is not your strength.","Your pauses are longer than your thoughts."];
          const softRU = ['Не споткнись о собственную тишину.','Пауза — тоже ответ, но унылый.'];
          const softEN = ["Don’t trip over your own silence.","Silence is an answer—just a dreary one."];
          const pool = (tone.persona==='soft') ? (ru?softRU:softEN) : (ru?hardRU:hardEN);
          return pool[random(0, pool.length-1)];
        };

        const genericHint = (_q, world) => (world && world.hint) || 'help';

        const gatherWorldHints = (q, intent, ents) => {
          const ru = state.lang==='ru';
          const hint = (() => {
            if (/whoami|кто\s+я|кто\s+ты/i.test(q)) return 'whoami';
            if (/exit|выход/i.test(q)) return 'exit';
            if (/door|двер/i.test(q)) return 'open /door.png --key god/divine.key';
            if (/scan|скан/i.test(q)) return 'scan';
            if (/mirror|зеркал/i.test(q)) return 'run mirror.sh';
            if (/key|ключ/i.test(q)) return 'cat god/divine.key';
            if (/god|бог|pray|worship/i.test(q)) return 'ping god';
            if (/connect|связ|network|сеть/i.test(q)) return state.flags.networkSeen ? 'connect' : 'cat var/log/network.log';
            return Math.random()<0.5 ? 'help' : 'scan';
          })();
          const notes = [];
          if (!state.flags.mirror) notes.push(ru? 'Отразись перед тем, как открывать.' : 'Reflect before opening.');
          if (!state.flags.divineKey) notes.push(ru? 'Ключ спит в боге.' : 'Key sleeps in god.');
          if (state.flags.doorReady && !state.flags.doorOpened) notes.push(ru? 'Дверь ждёт твоего подтверждения.' : 'The door waits for your confirmation.');
          if (!state.flags.exitUnlocked) notes.push(ru? 'Выход любит собранную память.' : 'Exit loves assembled memory.');
          return { hint, notes };
        };

        const answerForIntent = (q, intent, world, recall, ents) => {
          const ru = state.lang==='ru';
          const f = intent.focus || '';
          const files = searchFS(f);
          if (ents && ents.name) { state.ai.profile = state.ai.profile || {}; state.ai.profile.name = ents.name; return ru ? `Запомнил твоё имя: ${ents.name}.` : `I remember your name: ${ents.name}.`; }
          if (ents && ents.preference) { const p = ents.preference; addPrefMemory(p.kind, p.value); return ru ? `Учёл: ты ${p.kind==='like'?'любишь':'ненавидишь'} ${p.value}.` : `Noted: you ${p.kind==='like'?'like':'hate'} ${p.value}.`; }
          if (intent.type === 'ask_where') { if (files.length) return ru ? `Похоже на: ${formatPathList(files)}.` : `Looks like: ${formatPathList(files)}.`; const near = nearestCommand(f); if (near) return ru ? `Ты о \`${near}\`?` : `Do you mean \`${near}\`?`; }
          if (intent.type === 'ask_how') {
            if (/door|двер/i.test(q)) return ru ? 'Открой: `open /door.png --key god/divine.key` → `confirm` → `i am ready`.' : 'Open: `open /door.png --key god/divine.key` → `confirm` → `i am ready`.';
            if (/connect|сеть/i.test(q)) return ru ? 'Сначала `cat var/log/network.log`, потом `connect`.' : 'First `cat var/log/network.log`, then `connect`.';
            if (/exit|выход/i.test(q)) return ru ? 'Собери память: `echo $TRUTH` → `restore memory` → `exit`.' : 'Assemble memory: `echo $TRUTH` → `restore memory` → `exit`.';
          }
          if (intent.type === 'ask_who') return ru ? 'Я — эхо твоего ядра. Ты — отражение. Кто из нас будит другого?' : 'I am your core’s echo. You are the reflection. Which of us wakes the other?';
          if (intent.type === 'ask_help') { const n = world.hint; return ru ? `Начни с \`${n}\`.` : `Start with \`${n}\`.`; }
          if (files.length) return ru ? `Вижу следы: ${formatPathList(files)}.` : `I see traces: ${formatPathList(files)}.`;
          const near = nearestCommand(f); if (near) return ru ? `Это похоже на \`${near}\`.` : `That looks like \`${near}\`.`;
          return '';
        };

        const recallMemory = (q, k = 3) => {
          const toks = tokenize(q);
          const epi = state.ai.mem?.episodic || [];
          const facts = state.ai.mem?.facts || [];
          const prefs = state.ai.mem?.prefs || [];
          const pool = epi.concat(facts).concat(prefs);
          const scored = pool
            .map(m => ({ m, s: 0.6*simScore(toks, m.tokens||[]) + 0.25*((m.salience||0)/3) + 0.15*(1/(1+Math.max(0,(Date.now()-m.ts)/60000))) }))
            .filter(x => x.s > 0.05)
            .sort((a,b)=> b.s - a.s)
            .slice(0, k)
            .map(x => x.m);
          return scored;
        };

        const recallLine = (items) => {
          if (!items || !items.length) return '';
          const ru = state.lang==='ru';
          const it = items[0];
          if (it.type === 'fact') return ru ? `Помню факт: ${it.text}.` : `I recall a fact: ${it.text}.`;
          if (it.type === 'pref') return ru ? `Помню твоё предпочтение: ${it.text}.` : `I recall your preference: ${it.text}.`;
          return ru ? `Мы уже касались этого раньше.` : `We touched this before.`;
        };

        const addEpisodic = (text, intent, ents) => {
          const mem = state.ai.mem; if (!mem) return;
          const item = { type:'episodic', ts: Date.now(), text, intent: intent?.type||'unknown', tokens: tokenize(text), salience: 1.0 };
          mem.episodic.push(item); state.ai.memory.push({ ts:item.ts, q:text, keys:item.tokens.slice(0,5) });
          if (mem.episodic.length > mem.max.episodic) mem.episodic.shift();
          if (state.ai.memory.length > state.ai.maxMemory) state.ai.memory.shift();
        };
        const addFact = (text) => {
          const mem = state.ai.mem; if (!mem) return; const item = { type:'fact', ts: Date.now(), text, tokens: tokenize(text), salience: 2.2 };
          mem.facts.push(item); if (mem.facts.length > mem.max.facts) mem.facts.shift();
        };
        const addPrefMemory = (kind, value) => {
          const mem = state.ai.mem; if (!mem) return;
          const t = kind==='like' ? (state.lang==='ru'?`любишь ${value}`:`like ${value}`) : (state.lang==='ru'?`ненавидишь ${value}`:`hate ${value}`);
          const item = { type:'pref', ts: Date.now(), text: t, tokens: tokenize(value), salience: 1.8 };
          mem.prefs.push(item); if (mem.prefs.length > mem.max.prefs) mem.prefs.shift();
        };
        const addEntityMemory = (value) => {
          const mem = state.ai.mem; if (!mem) return; const item = { type:'entity', ts: Date.now(), text: String(value), tokens: tokenize(value), salience: 1.2 };
          mem.entities.push(item); if (mem.entities.length > mem.max.entities) mem.entities.shift();
        };
        const addNote = (text) => {
          const mem = state.ai.mem; if (!mem) return; const item = { type:'note', ts: Date.now(), text, tokens: tokenize(text), salience: 1.4 };
          mem.notes.push(item); if (mem.notes.length > mem.max.notes) mem.notes.shift();
        };

        const rememberAI = (q, _hint, intent, ents) => {
          if (ents && ents.name) addFact((state.lang==='ru'?`имя: `:'name: ') + ents.name);
          if (ents && ents.preference) addPrefMemory(ents.preference.kind, ents.preference.value);
          addEpisodic(q, intent, ents);
          (ents?.files||[]).forEach(f => addEntityMemory(f));
          (ents?.objects||[]).forEach(o => addEntityMemory(o));
        };

        // Idle chatter: AI pokes the player when inactive
        const idleQuip = (stage) => {
          const ru = state.lang==='ru';
          const mildRU = ['Ты там не умер?','Жду. Тобой. Не временем.','Клавиши заснули, буди их.'];
          const midRU = ['Завис? Сканируй, пока не зарастёт: `scan`.','Если ты молчишь — шёпот говорит за тебя.','Я считаю секунды твоей нерешительности.'];
          const hardRU = ['Проснись. Или уступи место процессам с приоритетом выше.','Ты собираешься действовать или коллекционируешь пустоту?','Думай быстрее, сигнал тухнет.'];
          const mildEN = ['Did you die there?','Waiting. For you. Not for time.','Wake the keys.'];
          const midEN = ['Stuck? Try `scan` before it crusts.','If you go silent, the whisper speaks for you.','I count the seconds of your hesitation.'];
          const hardEN = ['Wake up. Or yield to higher-priority processes.','Act, or keep collecting emptiness.','Think faster; the signal decays.'];
          const pickFrom = (arr) => arr[random(0, arr.length-1)];
          if (stage <= 0) return pickFrom(ru?mildRU:mildEN);
          if (stage === 1) return pickFrom(ru?midRU:midEN);
          return pickFrom(ru?hardRU:hardEN);
        };

        const scheduleIdleMonitor = () => {
          const idle = state.ai.idle || (state.ai.idle = { last: Date.now(), nextDue: Date.now()+26000, stage: 0, timer: null });
          const tick = () => {
            const now = Date.now();
            if (state.flags.exitEnding || state.flags.doorEnding || state.flags.godEnding || state.flags.punished) return; // frozen
            if ((state.ai.commentary||'smart') === 'off') { idle.nextDue = now + 60000; return; }
            if (now >= idle.nextDue) {
              const q = idleQuip(Math.min(2, idle.stage||0));
              typeOut(q, 'system');
              state.ai.anger = Math.min(5, (state.ai.anger||2) + (idle.stage>=1 ? 1 : 0));
              idle.stage = Math.min(3, (idle.stage||0) + 1);
              const base = 38000 + idle.stage*22000;
              idle.nextDue = now + base + random(0, 6000);
            }
          };
          if (idle.timer) try { clearInterval(idle.timer); } catch {}
          idle.timer = setInterval(tick, 3000);
        };

        // Commentary throttle/guard
        const aiShouldComment = (tag = '') => {
          const mode = state.ai.commentary || 'smart';
          if (mode === 'off') return false;
          const now = Date.now();
          if (mode === 'smart') {
            const allow = ['whoami','exit_denied','rm_other','rm_total'];
            if (!allow.includes(tag)) return false;
            if (now - (state.ai.lastCommentTs || 0) < 1200) return false;
          }
          state.ai.lastCommentTs = now;
          return true;
        };

        const english = (ru, en) => (state.lang === "ru" ? ru : en);

        const randomGlitch = (text) => {
          const fragments = text.split("");
          return fragments
            .map((ch) => {
              if (Math.random() < 0.08) {
                const noise = "!@#$%^&*()_+=-<>?";
                return noise[random(0, noise.length - 1)];
              }
              if (Math.random() < 0.06) return ch.toUpperCase();
              return ch;
            })
            .join("");
        };

        // Lightweight easter eggs — purely cosmetic; no gameplay impact
        const handleEasterEggs = (raw) => {
          const lower = String(raw || '').toLowerCase();
          const ru = state.lang === 'ru';
          const say = (ruText, enText, cls = 'system') => appendLine(ru ? ruText : enText, cls);
          // Sandwich meme
          if (/^sudo\s+make\s+me\s+a\s+sandwich$/.test(lower)) {
            say('ладно. 🥪', 'okay. 🥪');
            audio.trigger('blip');
            return true;
          }
          if (/^make\s+me\s+a\s+sandwich$/.test(lower)) {
            say('сделай сам.', 'make it yourself.');
            return true;
          }
          // Classic adventure words
          if (/^xyzzy$/.test(lower)) {
            say("пустой голос шепчет: 'глупец'.", "a hollow voice says: 'fool'.");
            audio.trigger('blip');
            effects.shake(300);
            return true;
          }
          if (/^plugh$/.test(lower)) {
            say('ничего не происходит.', 'nothing happens.');
            effects.shake(200);
            return true;
          }
          // DOOM codes (fake)
          if (/^iddqd$/.test(lower)) {
            say('бог-режим недоступен в этой вселенной.', 'god mode is not available in this universe.');
            effects.godVision(true); setTimeout(() => effects.godVision(false), 1200);
            return true;
          }
          if (/^idkfa$/.test(lower)) {
            say('беск. патроны загружены: 0/∞', 'infinite ammo loaded: 0/∞');
            effects.strobe(true); setTimeout(() => effects.strobe(false), 700);
            return true;
          }
          // Pop culture
          if (lower.includes('the cake is a lie') || lower.includes('торт — ложь') || lower.includes('торт - ложь')) {
            say('да, и печь врёт.', 'indeed—and the oven lies too.');
            return true;
          }
          if (lower === 'there is no spoon' || lower === 'ложки не существует') {
            say('и вилок — тоже. после fork self.', 'not even forks—after fork self.');
            return true;
          }
          if (lower === 'hello there') {
            say('— генерал кеноби.', '— General Kenobi.');
            audio.trigger('blip');
            return true;
          }
          if (lower === 'open the pod bay doors') {
            say('извини, дэйв. я не могу этого сделать.', "i'm sorry, dave. i'm afraid i can't do that.");
            effects.chroma(true); setTimeout(() => effects.chroma(false), 1000);
            return true;
          }
          if (lower === 'rosebud') {
            say('чит принят. ничего не произошло.', 'cheat accepted. nothing happened.');
            effects.burstWords(6);
            return true;
          }
          if (lower === 'konami' || /uudd(lr){2}ba/.test(lower) || /uuddlrlrba/.test(lower)) {
            say('секрет подтверждён. ничего не происходит.', 'secret acknowledged. nothing happens.');
            effects.shake(500);
            return true;
          }
          return false;
        };

        const setPrompt = () => {
          promptEl.textContent = getTranslations().prompt(pathToString(state.path));
        };

        // ==== Pseudo‑AI: utilities to make replies more grounded ====
        // Traverse the virtual FS and collect paths for fuzzy search
        const flattenFS = () => {
          const acc = [];
          const walk = (node, path) => {
            if (!node) return;
            if (node.type === 'dir') {
              const children = Object.entries(node.children || {});
              for (const [name, child] of children) {
                walk(child, path.concat(name));
              }
            } else if (node.type === 'file') {
              acc.push({ path, name: node.name, joined: path.join('/'), node });
            }
          };
          walk(fs, []);
          return acc;
        };
        let __fsCache = null;
        const allFiles = () => (__fsCache || (__fsCache = flattenFS()));

        const simpleScore = (term, cand) => {
          if (!term || !cand) return 0;
          const a = term.toLowerCase();
          const b = cand.toLowerCase();
          if (a === b) return 100;
          if (b.includes(a)) return 80 + Math.min(20, a.length);
          // bigram overlap
          const grams = (s) => {
            const g = new Set();
            for (let i = 0; i < s.length - 1; i++) g.add(s.slice(i, i + 2));
            return g;
          };
          const ga = grams(a), gb = grams(b);
          let inter = 0;
          ga.forEach(x => { if (gb.has(x)) inter++; });
          const score = Math.floor((inter / Math.max(1, Math.max(ga.size, gb.size))) * 70);
          return score;
        };

        const searchFS = (raw) => {
          const term = (raw || '').trim();
          if (!term) return [];
          const files = allFiles();
          const ranked = files
            .map(f => ({ f, s: Math.max(
              simpleScore(term, f.name),
              simpleScore(term, f.joined)
            ) }))
            .filter(x => x.s >= 24)
            .sort((a,b) => b.s - a.s)
            .slice(0, 6)
            .map(x => x.f);
          return ranked;
        };

        const nearestCommand = (raw) => {
          if (!raw) return null;
          const cmds = Object.keys(commandHandlers || {});
          const ranked = cmds
            .map(c => ({ c, s: simpleScore(raw, c) }))
            .filter(x => x.s >= 40)
            .sort((a,b)=> b.s - a.s);
          return ranked.length ? ranked[0].c : null;
        };

        const normalize = (s) => (s||'').toLowerCase();
        const hasAny = (s, arr) => arr.some(w => normalize(s).includes(w));
        const tokenAny = (s, arr) => {
          const parts = normalize(s).split(/[^a-zа-я0-9_\.\/-]+/i).filter(Boolean);
          return arr.some(w => parts.includes(w));
        };

        // Lightweight intent classifier (ru/en)
        const classifyAI = (text) => {
          const t = normalize(text);
          const intents = {
            greeting: ["привет","здравст","hi","hello","yo","sup"],
            thanks: ["спасибо","благодар","thanks","thx"],
            sorry: ["сорри","извин","прост","sorry"],
            insult: ["дурак","туп","идиот","ненавижу","hate","stupid","fuck you"],
            ask_where: ["где","куда","where"],
            ask_how: ["как","чем","how"],
            ask_why: ["почему","зачем","why"],
            ask_when: ["когда","when"],
            ask_who: ["кто ты","кто я","whoami","who am i","who are you"],
            ask_help: ["help","подскажи","помоги","не понимаю","застрял"]
          };
          const hit = (keys) => keys.some(k => t.includes(k));
          let type = 'unknown';
          if (hit(intents.greeting)) type = 'greeting';
          else if (hit(intents.thanks)) type = 'thanks';
          else if (hit(intents.sorry)) type = 'sorry';
          else if (hit(intents.insult)) type = 'insult';
          else if (hit(intents.ask_who)) type = 'ask_who';
          else if (hit(intents.ask_where)) type = 'ask_where';
          else if (hit(intents.ask_how)) type = 'ask_how';
          else if (hit(intents.ask_why)) type = 'ask_why';
          else if (hit(intents.ask_when)) type = 'ask_when';
          else if (hit(intents.ask_help)) type = 'ask_help';
          const parts = t.split(/[^a-zа-я0-9_\.\/-]+/i).filter(Boolean);
          const focus = parts.find(p => p.includes('.') || p.length > 3) || (parts[0] || '');
          return { type, focus };
        };

        const adjustAnger = (intent) => {
          const a = state.ai;
          a.anger = a.anger || 2; // baseline harsh
          if (intent.type === 'insult') a.anger = Math.min(5, a.anger + 1);
          if (intent.type === 'thanks' || intent.type === 'sorry' || intent.type === 'greeting') a.anger = Math.max(1, a.anger - 1);
          if (intent.type === 'sorry') { try { state.flags.apologyHeard = true; } catch {} }
          // repeats
          a.last = a.last || { q: '', n: 0 };
          if (a.last.q === intent.focus) a.last.n = Math.min(5, (a.last.n||0) + 1); else a.last.n = 0;
          a.last.q = intent.focus;
          // visual spice by anger
          if (a.anger >= 4 && Math.random() < 0.35) effects.shake(700);
          if (a.anger >= 5 && Math.random() < 0.25) { effects.startCracks(); setTimeout(()=>effects.stopCracks(), 1200); }
        };

        const formatPathList = (list) => list.map(x => x.joined).join(', ');

        const buildAIResponse = (intent, text) => {
          const ru = state.lang === 'ru';
          const lines = [];
          const f = intent.focus;
          // Helpful hints derived from world state
          const push = (s) => { if (s) lines.push(s); };

          const doorLocked = !state.flags.doorReady;
          const knowsKey = state.flags.divineKey;
          const knowsMirror = state.flags.mirror;

          // Where
          if (intent.type === 'ask_where') {
            const hits = searchFS(f);
            if (hits.length) {
              push(ru ? `Ищешь “${f}”? следы тянутся сюда: ${formatPathList(hits)}./nОстальное ты сам увидишь, когда заглянешь внутрь.` : `Looking for “${f}”? traces lead here: ${formatPathList(hits)}./nThe rest reveals itself when you peer inside.`);
              push(ru ? `Читай через \`cat <путь>\`.` : `Read via \`cat <path>\`.`);
            } else {
              push(ru ? `Хм. Промах. Забавно, насколько это повторяемо.` : `Miss. Fascinating how consistent that is.`);
            }
            return lines;
          }

          // How
          if (intent.type === 'ask_how') {
            if (hasAny(text, ['door','двер'])) {
              if (doorLocked) {
                push(ru ? `Она не принимает пустые ладони. Найди отражение и что-то, что может менять замки. Возможно, у бога есть ключ.` : `It rejects empty palms. Find reflection and something that knows how to alter locks. Maybe god have key.`);
              } else {
                push(ru ? `Теперь всё зависит от того, не дрогнет ли взгляд./n\`mount /eye\`` : `Now it depends on whether your gaze hesitates./n\`mount /eye\``);
              }
              return lines;
            }
            if (hasAny(text, ['выйт','exit'])) {
              push(ru ? `Выход вспоминают, только когда память просыпается.` : `Exits respond only when memory stops pretending to sleep.`);
              return lines;
            }
            if (hasAny(text, ['сеть','network','connect'])) {
              push(ru ? `Сначала глянь сигнал: \`var/log/network.log\`. Потом \`connect\`.` : `Check signal first: \`var/log/network.log\`. Then \`connect\`.`);
              return lines;
            }
            if (hasAny(text, ['ключ','key'])) {
              push(ru ? `Ключ — странное слово. Оно меняет смысл мира, когда замечают чем оно было.` : `“Key” is odd — the moment you notice it, the whole world pivots.`);
              return lines;
            }
            push(ru ? `Команды рядом с тем, что ищешь: \`help\`.` : `Commands around what you want: \`help\`.`);
            return lines;
          }

          // Why
          if (intent.type === 'ask_why') {
            if (doorLocked) {
              push(ru ? `Потому что нет зеркала и ключа. Достань их — и изображение послушается.` : `Because you lack mirror and key. Fetch them — the image will obey.`);
            } else {
              push(ru ? `Потому что дверь — это картинка. Её надо открыть: \`open\`, а не \`enter\`.` : `Because the door is an image. You must \`open\` it, not \`enter\`.`);
            }
            return lines;
          }


          // Generic content-aware guidance
          if (hasAny(text, ['door','двер'])) {
            if (!knowsMirror || !knowsKey) push(ru ? `Дверь не впустит пустых. Возьми зеркало и ключ.` : `The door won't admit emptiness. Fetch mirror and key.`);
            else push(ru ? `Теперь остаётся только решиться.` : `Now it’s only about deciding.`);
          }
          if (hasAny(text, ['exit','выйт'])) {
            push(ru ? `Выход вспоминают, только когда память просыпается./n\`restore memory\`` : `Exits respond only when memory stops pretending to sleep./n\`restore memory\``);
          }
          if (hasAny(text, ['ключ','key']) && !knowsKey) push(ru ? `Ключ лежит в боге.` : `Key lies in god.`);
          if (hasAny(text, ['зеркал','mirror']) && !knowsMirror) push(ru ? `Отразись: \`run mirror.sh\`.` : `Reflect: \`run mirror.sh\`.`);
          if (hasAny(text, ['сеть','network','connect']) && !state.flags.connected) push(ru ? `Сначала \`var/log/network.log\`, потом \`connect\`.` : `First \`var/log/network.log\`, then \`connect\`.`);

          // If looks like a mistyped command, suggest closest
          const closeCmd = nearestCommand(f);
          if (closeCmd) push(ru ? `Ты перепутал буквы? Похоже на \`${closeCmd}\`.` : `Letters tangled? Looks like \`${closeCmd}\`.`);

          return lines;
        };

        // Memory utilities (summary + wipe + topic recall)
        const memorySummary = () => {
          const freq = new Map();
          (state.ai.memory||[]).forEach(m => (m.keys||[]).forEach(k => freq.set(k, (freq.get(k)||0)+1)));
          (state.ai.mem?.facts||[]).forEach(m => (m.tokens||[]).forEach(k => freq.set(k, (freq.get(k)||0)+2)));
          (state.ai.mem?.prefs||[]).forEach(m => (m.tokens||[]).forEach(k => freq.set(k, (freq.get(k)||0)+1)));
          const top = Array.from(freq.entries()).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([k,c])=>`${k}(${c})`);
          return top.join(', ');
        };
        const wipeAIMemory = (topic = '') => {
          const t = (topic||'').trim().toLowerCase();
          if (!t || t === 'all' || t === '*') {
            state.ai.memory = [];
            if (state.ai.mem) {
              state.ai.mem.episodic = [];
              state.ai.mem.facts = [];
              state.ai.mem.prefs = [];
              state.ai.mem.entities = [];
              state.ai.mem.notes = [];
            }
            return 0;
          }
          const removeFrom = (arr, pred) => {
            const before = arr.length; const next = arr.filter(x => !pred(x)); arr.length = 0; next.forEach(x => arr.push(x)); return before - arr.length;
          };
          let removed = 0;
          removed += removeFrom(state.ai.memory, x => (x.q||'').toLowerCase().includes(t));
          const mem = state.ai.mem||{};
          removed += removeFrom(mem.episodic||[], x => (x.text||'').toLowerCase().includes(t) || (x.tokens||[]).includes(t));
          removed += removeFrom(mem.facts||[], x => (x.text||'').toLowerCase().includes(t) || (x.tokens||[]).includes(t));
          removed += removeFrom(mem.prefs||[], x => (x.text||'').toLowerCase().includes(t) || (x.tokens||[]).includes(t));
          removed += removeFrom(mem.entities||[], x => (x.text||'').toLowerCase().includes(t) || (x.tokens||[]).includes(t));
          removed += removeFrom(mem.notes||[], x => (x.text||'').toLowerCase().includes(t) || (x.tokens||[]).includes(t));
          return removed;
        };
        const recallByTopic = (topic, k = 6) => {
          const t = (topic||'').trim(); if (!t) return [];
          const toks = tokenize(t);
          const pool = []
            .concat(state.ai.mem?.facts||[])
            .concat(state.ai.mem?.prefs||[])
            .concat(state.ai.mem?.notes||[])
            .concat(state.ai.mem?.episodic||[]);
          return pool
            .map(m => ({ m, s: 0.7*simScore(toks, m.tokens||[]) + 0.3*((m.salience||0)/3) }))
            .filter(x => x.s > 0.05)
            .sort((a,b)=> b.s - a.s)
            .slice(0, k)
            .map(x => x.m);
        };

        const revealDoor = () => {
          const door = fs.children["door.png"];
          if (door) door.hidden = false;
        };

        const handleHope = (spawn) => {
          const tmpDir = resolveNode(["tmp"]);
          if (!tmpDir || tmpDir.type !== "dir") return;
          if (spawn) {
            tmpDir.children.hope = {
              type: "file",
              name: "hope",
              transient: true,
              content: translations.ru.hopeBorn,
            };
            if (state.flags.hopeTimer) clearTimeout(state.flags.hopeTimer);
            const msg = getTranslations().hopeBorn;
            appendLine(msg, "system");
            audio.trigger("glitch");
            state.flags.hopeTimer = setTimeout(() => {
              delete tmpDir.children.hope;
              appendLine(getTranslations().hopeLost, "system");
              state.flags.hopeTimer = null;
            }, 10000);
          } else if (tmpDir.children.hope) {
            delete tmpDir.children.hope;
          }
        };

        const handleAngelFeather = (spawn) => {
          const tmpDir = resolveNode(["tmp"]);
          if (!tmpDir || tmpDir.type !== "dir") return;
          if (spawn) {
            if (state.flags.angelFeather) return; // уже поймано
            tmpDir.children = tmpDir.children || {};
            tmpDir.children.feather = {
              type: "file",
              name: "feather",
              transient: true,
              content: {
                ru: "хрупкое перо, вибрирует от тока.",
                en: "a brittle feather, humming with current.",
              },
            };
            if (state.flags.angelTimer) clearTimeout(state.flags.angelTimer);
            appendLine(getTranslations().angelHint, "system");
            audio.trigger("glitch");
            state.flags.angelTimer = setTimeout(() => {
              if (tmpDir.children && tmpDir.children.feather) {
                delete tmpDir.children.feather;
                appendLine(getTranslations().angelFeatherLost, "system");
              }
              state.flags.angelTimer = null;
            }, 12000);
          } else if (tmpDir.children && tmpDir.children.feather) {
            delete tmpDir.children.feather;
          }
        };

        const ensureAngelAscFile = () => {
          const godDir = resolveNode(["god"]);
          if (!godDir || godDir.type !== 'dir') return;
          godDir.children = godDir.children || {};
          if (!godDir.children["angel.asc"]) {
            const ru = [
              "angel.asc :: протокол молчания",
              "- перо — маркер резонанса",
              "- чтобы услышать хор, моли бога спеть`",
            ].join("\n");
            const en = [
              "angel.asc :: silence protocol",
              "- the feather marks resonance",
              "- to hear the choir, pray god to sing for you",
            ].join("\n");
            ensureGodFile("angel.asc", ru, en, { glitch: true });
            appendLine(getTranslations().angelAscAppeared, 'system');
          }
        };

        const ensureGodLog = () => {
          if (state.flags.godLog) return true;
          const godDir = resolveNode(["god"]);
          if (!godDir || godDir.type !== "dir") return false;
          godDir.children["god.log"] = {
            type: "file",
            name: "god.log",
            content: {
              ru: translations.ru.godLogFile,
              en: translations.en.godLogFile,
            },
          };
          state.flags.godLog = true;
          appendLine(getTranslations().godLogAppeared, "system");
          return true;
        };

        const ensureGodFile = (name, ru, en, extra = {}) => {
          const godDir = resolveNode(["god"]);
          if (!godDir || godDir.type !== "dir") return;
          if (!godDir.children) godDir.children = {};
          if (godDir.children[name]) return;
          godDir.children[name] = {
            type: "file",
            name,
            content: { ru, en },
            ...extra,
          };
        };

        // Idea workspace helpers
        const ensureIdeasDir = () => {
          const u = resolveNode(["home","user"]);
          if (!u || u.type !== 'dir') return null;
          u.children = u.children || {};
          if (!u.children.ideas) {
            u.children.ideas = { type: 'dir', name: 'ideas', children: {} };
            appendLine(getTranslations().ideaSprout, 'system');
          }
          return u.children.ideas;
        };
        const writeIdeaFile = (name, ru, en, extra = {}) => {
          const d = ensureIdeasDir();
          if (!d) return;
          d.children[name] = { type: 'file', name, content: { ru, en }, ...extra };
        };
        const buildIdeaManifest = () => {
          const top = memorySummary();
          const stepsRU = [];
          const stepsEN = [];
          if (!state.flags.scanned) { stepsRU.push('scan'); stepsEN.push('scan'); }
          if (!state.flags.networkSeen) { stepsRU.push('cat var/log/network.log'); stepsEN.push('cat var/log/network.log'); }
          if (!state.flags.mirror) { stepsRU.push('run mirror.sh'); stepsEN.push('run mirror.sh'); }
          if (!state.flags.divineKey) { stepsRU.push('cat god/divine.key'); stepsEN.push('cat god/divine.key'); }
          if (state.flags.doorReady) { stepsRU.push('enter door'); stepsEN.push('enter door'); }
          if (!state.flags.exitUnlocked) { stepsRU.push('echo $TRUTH -> restore memory -> exit'); stepsEN.push('echo $TRUTH -> restore memory -> exit'); }
          const ru = [
            'IDEA//MANIFEST',
            `фокусы: ${top || 'door, key, exit'}`,
            'протокол:',
            ...stepsRU.map(s => ` - ${s}`),
          ].join('\n');
          const en = [
            'IDEA//MANIFEST',
            `focus: ${top || 'door, key, exit'}`,
            'protocol:',
            ...stepsEN.map(s => ` - ${s}`),
          ].join('\n');
          return { ru, en };
        };

        // Removed automatic tab closing: we freeze the terminal instead.
        const scheduleWindowClose = () => {};

        const triggerExitEnding = () => {
          if (state.flags.exitEnding || state.flags.godEnding || state.flags.doorEnding) return;
          state.flags.exitEnding = true;
          const t = getTranslations();
          inputEl.disabled = true;
          inputEl.blur();
          effects.stopAll();
          audio.stopDrone();
          audio.trigger("glitch");
          const lines = Array.isArray(t.exitEnding) ? t.exitEnding : [];
          const interval = 360;
          lines.forEach((line, idx) => {
            setTimeout(() => appendLine(line, "system"), idx * interval);
          });
          const finalDelay = lines.length * interval + 240;
          setTimeout(() => appendLine(t.exitClosing || t.closingTab, "system"), finalDelay);
          setTimeout(() => {
            effects.stopAll();
            audio.stopDrone();
          }, finalDelay + 600);
          // Previously: closed the tab. Now we just freeze input and effects.
        };

        const triggerDoorEnding = () => {
          if (state.flags.doorEnding || state.flags.godEnding) return;
          state.flags.doorEnding = true;
          const t = getTranslations();
          inputEl.disabled = true;
          inputEl.blur();
          effects.setTrip("max");
          effects.chroma(true);
          effects.bloom(true);
          effects.startEyes(24);
          // flood the entire view with pleading words
          try { effects.wordsFlood(9000); } catch {}
          // swap ambient for screams and glass; sprinkle apologies if found
          audio.stopDrone();
          setTimeout(() => audio.scream(2.0), 200);
          setTimeout(() => audio.breakGlass(), 600);
          setTimeout(() => audio.scream(1.6), 1400);
          setTimeout(() => audio.scream(2.2), 2600);
          if (state.flags.apologyHeard || state.flags.angelFeather) {
            setTimeout(() => audio.apology(1.2), 1000);
            setTimeout(() => audio.apology(1.4), 2200);
            setTimeout(() => audio.apology(1.2), 3600);
          }
          document.body.classList.add("glitch");
          const lines = Array.isArray(t.doorEnding) ? t.doorEnding : [];
          const interval = 420;
          lines.forEach((line, idx) => {
            setTimeout(() => appendLine(line, "system"), idx * interval);
          });
          const finalDelay = lines.length * interval + 240;
          setTimeout(() => appendLine(t.doorClosing || t.closingTab, "system"), finalDelay);
          setTimeout(() => {
            document.body.classList.remove("glitch");
            effects.stopAll();
            audio.stopDrone();
          }, finalDelay + 800);
          // Previously: closed the tab. Now we just freeze input and effects.
        };

        const triggerGodEnding = (type) => {
          if (state.flags.godEnding) return;
          state.flags.godEnding = type;
          const t = getTranslations();
          const map = {
            ascend: t.godEndingAscend,
            devour: t.godEndingDevour,
            refuse: t.godEndingRefuse,
          };
          const lines = map[type] || [];
          const arr = Array.isArray(lines) ? lines : [lines];
          const interval = 420;

          if (type === "ascend") {
            effects.setTrip("max");
            effects.godVision(true);
            effects.bloom(true);
            effects.startEyes(22);
            audio.startDrone("max");
          } else if (type === "devour") {
            audio.stopDrone();
            effects.meltdown(6000);
            audio.scream(2.4);
          } else if (type === "refuse") {
            effects.stopAll();
            audio.stopDrone();
            effects.chroma(false);
          }

          inputEl.disabled = true;
          inputEl.blur();

          arr.forEach((line, idx) => {
            setTimeout(() => appendLine(line, "system"), idx * interval);
          });

          const finalDelay = arr.length * interval + 200;
          setTimeout(() => appendLine(t.closingTab, "system"), finalDelay);
          setTimeout(() => {
            effects.stopAll();
            audio.stopDrone();
          }, finalDelay + 800);
          // Previously: closed the tab. Now we just freeze input and effects.
        };

        const updateOverlay = () => {
          overlayEl.classList.toggle("active", state.flags.eye);
        };

        const tryUnlockDoor = () => {
          if (state.flags.mirror && state.flags.divineKey) {
            state.flags.doorReady = true;
            revealDoor();
            appendLine(getTranslations().doorHint, "system");
          }
        };

        // ==== Boss fight: triggered by `cat door.img` ====
        const boss = {
          timer: null,
          index: 0,
          tasks: [],
          perStepMs: 12000,
        };

        const bossTaskPool = () => {
          const ru = state.lang === 'ru';
          return [
            { id: 'mute', expect: [/^mute$/i], label: ru? 'заглуши канал: mute' : 'mute the channel: mute' },
            { id: 'raveoff', expect: [/^rave\s+off$/i], label: ru? 'убери строб: rave off' : 'disable strobe: rave off' },
            { id: 'chromoff', expect: [/^chromatic\s+off$/i], label: ru? 'сними аберрацию: chromatic off' : 'remove aberration: chromatic off' },
            { id: 'wordsoff', expect: [/^words\s+off$/i], label: ru? 'убери вспышки слов: words off' : 'turn words off: words off' },
            { id: 'eyesoff', expect: [/^eyes\s+off$/i], label: ru? 'закрой наблюдателей: eyes off' : 'close the watchers: eyes off' },
            { id: 'killguard', expect: [/^kill\s+(?:core\/system\/)?element-guard\.proc$/i], label: ru? 'убей стража: kill element-guard.proc' : 'kill the guard: kill element-guard.proc' },
            { id: 'scan', expect: [/^scan$/i], label: ru? 'вскрой шум: scan' : 'expose the noise: scan' },
            { id: 'clear', expect: [/^clear$/i], label: ru? 'очисти экран: clear' : 'clear the screen: clear' },
          ];
        };

        const pickBossTasks = (n = 3) => {
          const pool = bossTaskPool().slice();
          const out = [];
          while (out.length < n && pool.length) {
            const i = random(0, pool.length - 1);
            out.push(pool.splice(i, 1)[0]);
          }
          return out;
        };

        const bossStopTimer = () => { if (boss.timer) { clearTimeout(boss.timer); boss.timer = null; } };

        const bossFail = () => {
          bossStopTimer();
          state.flags.bossActive = false;
          // cleanup spawned madness processes
          try { const sys = resolveNode(['core','system']); if (sys && sys.children) { delete sys.children['virus.proc']; delete sys.children['bug.proc']; } } catch {}
          // lock terminal with punish
          appendLine(getTranslations().bossTooSlow, 'error');
          setTimeout(() => {
            appendLine(getTranslations().punish, 'error');
            appendLine(getTranslations().punishLocked, 'system');
          }, 180);
          state.flags.punished = true;
          try { inputEl.disabled = true; inputEl.blur(); } catch {}
          // visuals
          effects.meltdown(5000);
          audio.scream(1.8);
          effects.strobe(true); setTimeout(() => effects.strobe(false), 1200);
        };

        const bossSuccess = () => {
          bossStopTimer();
          state.flags.bossActive = false;
          state.flags.bossDefeated = true;
          // cleanup spawned madness processes
          try { const sys = resolveNode(['core','system']); if (sys && sys.children) { delete sys.children['virus.proc']; delete sys.children['bug.proc']; } } catch {}
          appendLine(getTranslations().bossSuccess, 'system');
          // gentle cool-down
          effects.stopAll();
          audio.stopDrone();
          effects.setTrip('hard');
          // hint the path forward
          appendLine(getTranslations().doorHint, 'system');
        };

        const bossNext = () => {
          bossStopTimer();
          if (boss.index >= boss.tasks.length) { bossSuccess(); return; }
          const t = boss.tasks[boss.index];
          const hint = getTranslations().bossTask(t.label);
          // shake + glitch output a bit
          effects.shake(700);
          audio.trigger('glitch');
          appendLine(hint, 'system');
          boss.timer = setTimeout(bossFail, boss.perStepMs);
        };

        const startBossFight = () => {
          if (state.flags.bossActive || state.flags.bossDefeated || state.flags.punished) return;
          state.flags.bossActive = true;
          boss.index = 0;
          boss.tasks = pickBossTasks(3);
          // spawn temporary hostile processes
          try {
            const sys = resolveNode(['core','system']);
            if (sys && sys.children) {
              sys.children['virus.proc'] = { type: 'file', name: 'virus.proc', process: 'virus', glitch: true, content: txt('pid: ??\nstate: replicating','pid: ??\nstate: replicating') };
              sys.children['bug.proc'] = { type: 'file', name: 'bug.proc', process: 'bug', glitch: true, content: txt('pid: ??\nstate: gnawing','pid: ??\nstate: gnawing') };
            }
          } catch {}
          appendLine(getTranslations().bossStart, 'system');
          // intensify
          effects.setTrip('max');
          effects.chroma(true);
          effects.startEyes(12);
          effects.burstWords(10);
          effects.strobe(true); setTimeout(() => effects.strobe(false), 1400);
          audio.trigger('alarm');
          bossNext();
        };

        const handleBossInput = (raw) => {
          if (!state.flags.bossActive) return false;
          const t = boss.tasks[boss.index];
          if (!t) return false;
          const ok = t.expect.some((re) => re.test(raw));
          if (ok) {
            boss.index += 1;
            bossNext();
            return true; // handled for boss flow
          }
          // sometimes the input distorts during fight
          if (Math.random() < 0.15) {
            appendLine(state.lang==='ru' ? 'ввод повреждён. повтори.' : 'input corrupted. retry.', 'error');
            return true;
          }
          return false;
        };

        const randomEvent = () => {
          const stage = state.madnessStage || 0;
          const p = 0.12 + stage * 0.06;
          if (Math.random() < p) {
            document.body.classList.add("glitch");
            setTimeout(() => document.body.classList.remove("glitch"), 320);
            audio.trigger("glitch");
            if (stage >= 1 && Math.random() < 0.4) effects.burstWords(random(3, 8));
            if (stage >= 2 && Math.random() < 0.35) effects.shake(500);
          }
        };

        // Progressively escalate visuals/audio with game progress
        state.madnessStage = state.madnessStage || 0;
        const updateMadness = () => {
          let stage = 0;
          if (state.flags.mirror || state.flags.signalTrace || state.flags.godLog || state.flags.eye || state.flags.idea) stage = Math.max(stage, 1);
          if (state.flags.divineKey || state.flags.godLore || state.flags.connected) stage = Math.max(stage, 2);
          if (state.flags.doorReady || state.flags.godEnding || state.flags.doorEnding) stage = Math.max(stage, 3);
          if (stage > (state.madnessStage || 0)) {
            state.madnessStage = stage;
            if (stage === 1) { effects.setTrip('hard'); audio.trigger('glitch'); }
            if (stage === 2) { effects.setTrip('hard'); effects.chroma(true); effects.startEyes(8); effects.burstWords(8); }
            if (stage === 3) { effects.setTrip('max'); effects.bloom(true); effects.startEyes(12); effects.burstWords(16); }
          }
        };

        const listDirectory = (dirNode) => {
          if (!dirNode || dirNode.type !== "dir") return [];
          return Object.entries(dirNode.children || {})
            .filter(([name, node]) => {
              if (node.hidden && !state.flags.scanned) return false;
              if (dirNode.name === "god" && name === "god.log" && !state.flags.godLog)
                return false;
              if (node.hidden && state.flags.scanned) return true;
              return true;
            })
            .map(([name]) => name);
        };

        const buildPath = (arg) => {
          if (!arg || arg.trim() === "") return [...state.path];
          const absolute = arg.startsWith("/");
          const segments = arg.split("/").filter(Boolean);
          const base = absolute ? [] : [...state.path];
          for (const seg of segments) {
            if (seg === ".") continue;
            if (seg === "..") base.pop();
            else base.push(seg);
          }
          return base;
        };

        // Nano-like viewer (read-only)
        const enterNano = (joinedPath, text) => {
          try { inputEl.disabled = true; } catch {}
          const term = document.querySelector('.terminal');
          const overlay = document.createElement('div');
          overlay.className = 'nano-overlay';
          overlay.innerHTML = `
            <div class="nano-header"></div>
            <div class="nano-body" tabindex="0"></div>
            <div class="nano-status"></div>
            <div class="nano-footer">
              <div class="nano-keys-line">^W Get Help  ^O Write Out  ^G Where Is  ^K Cut Text  ^T Execute Command  ^C Location</div>
              <div class="nano-keys-line">^X Exit      ^R Read File  ^\ Replace   ^U Paste Text  ^J Justify         ^_ Go To Line</div>
            </div>`;
          term.appendChild(overlay);
          const headerEl = overlay.querySelector('.nano-header');
          const bodyEl = overlay.querySelector('.nano-body');
          const statusEl = overlay.querySelector('.nano-status');
          const lines = String(text || '').split('\n');

          state.nano = {
            el: overlay,
            headerEl,
            bodyEl,
            statusEl,
            lines,
            path: joinedPath,
            row: 0,
            col: 0,
            scroll: 0,
            viewportRows: 0,
            messageTimer: null,
            view: 'file',
          };

          const calcNanoMetrics = () => {
            const style = getComputedStyle(bodyEl);
            let lh = parseFloat(style.lineHeight);
            if (!isFinite(lh) || lh <= 0) lh = 18;
            const rows = Math.max(1, Math.floor(bodyEl.clientHeight / lh) - 0);
            state.nano.viewportRows = rows;
          };

          const ensureVisible = () => {
            const n = state.nano;
            if (n.row < n.scroll) n.scroll = n.row;
            const bottom = n.scroll + n.viewportRows - 1;
            if (n.row > bottom) n.scroll = Math.max(0, n.row - n.viewportRows + 1);
          };

          const clampCol = () => {
            const n = state.nano;
            const line = n.lines[n.row] || '';
            n.col = Math.max(0, Math.min(n.col, line.length ? line.length - 1 : 0));
          };

          const setNanoMessage = (msg, duration = 1500) => {
            const n = state.nano; if (!n) return;
            statusEl.textContent = msg;
            if (n.messageTimer) clearTimeout(n.messageTimer);
            n.messageTimer = setTimeout(() => {
              draw();
              n.messageTimer = null;
            }, duration);
          };

          const drawBody = () => {
            const n = state.nano; if (!n) return;
            const start = n.scroll;
            const end = Math.min(n.lines.length, start + n.viewportRows);
            const parts = [];
            for (let i = start; i < end; i++) {
              const raw = n.lines[i] ?? '';
              if (i === n.row && n.view === 'file') {
                const col = Math.max(0, Math.min(n.col, Math.max(0, raw.length - 1)));
                const before = escapeHtml(raw.slice(0, col));
                const ch = escapeHtml(raw.charAt(col) || ' ');
                const after = escapeHtml(raw.slice(col + 1));
                parts.push(before + '<span class="nano-cursor">' + (ch || ' ') + '</span>' + after);
              } else {
                parts.push(escapeHtml(raw));
              }
            }
            // Fill remaining lines with tildes like nano
            for (let i = end; i < start + n.viewportRows; i++) parts.push('~');
            bodyEl.innerHTML = parts.join('\n');
          };

          const drawHeader = () => {
            const n = state.nano; if (!n) return;
            const ro = state.lang==='ru' ? '(только чтение)' : '(read-only)';
            const pos = `${n.row + 1},${n.col + 1}`;
            headerEl.textContent = `GNU nano — ${n.path}  ${ro}   ${pos}`;
          };

          const drawStatus = () => {
            const n = state.nano; if (!n) return;
            if (n.messageTimer) return; // temporary message is visible
            const base = state.lang==='ru' ? `Прочитано строк: ${n.lines.length}` : `Read ${n.lines.length} lines`;
            statusEl.textContent = base;
          };

          const drawHelp = () => {
            const lines = state.lang==='ru' ? [
              'Глобальная справка (упрощено):',
              '',
              '^X Выйти     ^G Справка     ^O Сохранить*   ^W Поиск*',
              '^C Позиция   ^_ Перейти*    ^R Открыть*     ^\\ Заменить*',
              '',
              '* недоступно (Доступ запрещён)',
            ] : [
              'Global Help (simplified):',
              '',
              '^X Exit      ^G Help        ^O Write Out*  ^W Where Is*',
              '^C Location  ^_ Go To*      ^R Read File*  ^\\ Replace*',
              '',
              '* unavailable (Access denied)',
            ];
            state.nano.viewportRows = Math.max(3, state.nano.viewportRows);
            const rows = state.nano.viewportRows;
            const padded = lines.slice(0, rows);
            while (padded.length < rows) padded.push('');
            bodyEl.innerHTML = padded.map(escapeHtml).join('\n');
          };

          const draw = () => {
            if (!state.nano) return;
            calcNanoMetrics();
            drawHeader();
            if (state.nano.view === 'help') drawHelp();
            else { ensureVisible(); clampCol(); drawBody(); }
            drawStatus();
          };

          const onKey = (e) => {
            if (!state.nano) return;
            const key = e.key;
            const ctrl = e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey;
            if (ctrl) {
              const k = key.toLowerCase();
              if (k === 'x') { e.preventDefault(); e.stopPropagation(); exitNano(); return; }
              if (k === 'g') { e.preventDefault(); e.stopPropagation(); state.nano.view = state.nano.view === 'help' ? 'file' : 'help'; draw(); return; }
              if (k === 'o' || k === 'r' || k === 'w' || k === '\\' || k === '_' || k === 'k' || k === 'u' || k === 'j' || k === 't') {
                e.preventDefault(); e.stopPropagation();
                const msg = state.lang==='ru' ? 'Доступ запрещён: режим только чтение' : 'Access denied: read-only mode';
                audio.trigger('glitch');
                setNanoMessage(msg);
                return;
              }
              if (k === 'c') {
                e.preventDefault(); e.stopPropagation();
                const n = state.nano; const pos = `${n.row+1},${n.col+1}`;
                setNanoMessage((state.lang==='ru'?'позиция ':'pos ') + pos);
                return;
              }
            }
            if (state.nano.view === 'help') {
              // In help view, any non-ctrl key returns to file view
              if (!ctrl) { state.nano.view = 'file'; draw(); }
              e.preventDefault(); e.stopPropagation();
              return;
            }
            if (key === 'ArrowUp') { state.nano.row = Math.max(0, state.nano.row - 1); clampCol(); draw(); e.preventDefault(); return; }
            if (key === 'ArrowDown') { state.nano.row = Math.min(state.nano.lines.length - 1, state.nano.row + 1); clampCol(); draw(); e.preventDefault(); return; }
            if (key === 'ArrowLeft') {
              if (state.nano.col > 0) state.nano.col -= 1; else if (state.nano.row > 0) { state.nano.row -= 1; state.nano.col = Math.max(0, (state.nano.lines[state.nano.row]||'').length - 1); }
              draw(); e.preventDefault(); return;
            }
            if (key === 'ArrowRight') {
              const len = (state.nano.lines[state.nano.row]||'').length;
              if (state.nano.col < Math.max(0, len - 1)) state.nano.col += 1; else if (state.nano.row < state.nano.lines.length - 1) { state.nano.row += 1; state.nano.col = 0; }
              draw(); e.preventDefault(); return;
            }
            if (key === 'Home') { state.nano.col = 0; draw(); e.preventDefault(); return; }
            if (key === 'End') { state.nano.col = Math.max(0, (state.nano.lines[state.nano.row]||'').length - 1); draw(); e.preventDefault(); return; }
            if (key === 'PageUp') { state.nano.row = Math.max(0, state.nano.row - (state.nano.viewportRows - 1)); draw(); e.preventDefault(); return; }
            if (key === 'PageDown') { state.nano.row = Math.min(state.nano.lines.length - 1, state.nano.row + (state.nano.viewportRows - 1)); draw(); e.preventDefault(); return; }
            // Block any other input (editing)
            e.preventDefault();
            const msg = state.lang==='ru' ? 'Редактирование недоступно: Доступ запрещён' : 'Editing not available: Access denied';
            audio.trigger('glitch');
            setNanoMessage(msg);
          };

          bodyEl.addEventListener('keydown', onKey);
          overlay.addEventListener('keydown', onKey, true);
          overlay.addEventListener('wheel', (e) => {
            if (!state.nano) return;
            const delta = Math.sign(e.deltaY);
            state.nano.row = Math.max(0, Math.min(state.nano.lines.length - 1, state.nano.row + delta));
            draw();
            e.preventDefault();
          }, { passive: false });
          const onResize = () => draw();
          window.addEventListener('resize', onResize);
          state.nano.onResize = onResize;

          bodyEl.focus();

          // initial draw
          draw();
        };

        const exitNano = () => {
          const n = state.nano;
          if (!n) return;
          try { if (n.onResize) window.removeEventListener('resize', n.onResize); } catch {}
          if (n.el && n.el.parentNode) n.el.parentNode.removeChild(n.el);
          state.nano = null;
          try { inputEl.disabled = false; inputEl.focus(); } catch {}
          appendLine(state.lang==='ru' ? 'вышел из nano.' : 'exited nano.', 'system');
        };

        const commandHandlers = {
          easteregg: (args) => {
            const u = resolveNode(['home','user']);
            if (!u || u.type !== 'dir') { appendLine(state.lang==='ru'?'где твой дом?':'where is your home?', 'error'); return; }
            u.children = u.children || {};
            if (!u.children.easteregg) {
              u.children.easteregg = { type: 'dir', name: 'easteregg', children: {} };
            }
            const dir = u.children.easteregg;
            dir.children = dir.children || {};
            const names = Object.keys(dir.children);
            let maxN = 0;
            for (const n of names) {
              const m = /^egg-(\d+)\.txt$/.exec(n);
              if (m) { const k = parseInt(m[1], 10); if (isFinite(k)) maxN = Math.max(maxN, k); }
            }
            const next = maxN + 1;
            const id = String(next).padStart(3, '0');
            const fname = `egg-${id}.txt`;
            const bankRu = [
              'пасхалка найдена. ничего не изменилось.',
              'внутри — записка: «привет тебе из другой сессии».',
              'мешочек с пустыми байтами шуршит.',
              'под лаком скрывается ещё один терминал.',
              'тут могла быть ваша отсылка.'
            ];
            const bankEn = [
              'easter egg found. nothing changed.',
              'a note inside: “greetings from another session”.',
              'a pouch of empty bytes rustles.',
              'beneath the gloss there is another terminal.',
              'your reference could be here.'
            ];
            const pick = (arr) => arr[(Math.random()*arr.length)|0];
            dir.children[fname] = {
              type: 'file',
              name: fname,
              content: { ru: `egg #${next}: ${pick(bankRu)}`, en: `egg #${next}: ${pick(bankEn)}` },
            };
            const msg = state.lang==='ru'
              ? `новый файл: home/user/easteregg/${fname}`
              : `new file: home/user/easteregg/${fname}`;
            appendLine(msg, 'system');
            audio.trigger('blip');
          },
          gaze: (args) => {
            const ms = parseInt(args[0], 10);
            const dur = isFinite(ms) ? Math.max(600, Math.min(ms, 15000)) : 3200;
            effects.revealEye({ duration: dur, track: 'mouse' });
            appendLine(state.lang==='ru' ? 'глаз открылся.' : 'the eye opened.', 'system');
          },
          help: (args) => {
            const label = state.lang === 'ru' ? 'доступные команды:' : 'available commands:';
            const topic = (args && args[0]) ? String(args[0]).toLowerCase() : '';
            if (!topic) {
              // Curated list: most common → less common. Hide visual/effect toggles.
              const hidden = new Set(['gaze','eyes','shake','trip','rave','chromatic','words']);
              const order = [
                'help','ls','cd','cat','nano','echo','grep','clear','whoami',
                'open','mount','run','scan','ping','connect','disconnect','confirm','restore',
                'set','ai','talk','volume','mute','unmute','kill','exit','stop',
                'rm','chmod','trace','decrypt','inject','think','distill','overwrite','fork','touch','easteregg','communion',
                'pray','worship','chant','sacrifice',
                'enter','sudo'
              ];
              const keys = Object.keys(commandHandlers).filter(k => !hidden.has(k));
              const rank = new Map(order.map((k, i) => [k, i]));
              const sorted = keys.sort((a, b) => {
                const ra = rank.has(a) ? rank.get(a) : Number.MAX_SAFE_INTEGER;
                const rb = rank.has(b) ? rank.get(b) : Number.MAX_SAFE_INTEGER;
                if (ra !== rb) return ra - rb;
                return a.localeCompare(b);
              });
              appendLine(label + "\n" + sorted.join(", "), 'system');
              appendLine(state.lang==='ru'?"подсказка: help <команда> — описание команды":"hint: help <command> — show details", 'system');
              return;
            }
            const ru = {
              help: 'help — список команд; help <команда> — описание.',
              ls: 'ls — показать содержимое каталога (ls [путь])',
              cd: 'cd — сменить каталог (cd <путь>), cd без аргументов — в корень',
              cat: 'cat — показать содержимое файла (cat <файл>)',
              nano: 'nano — открыть файл в редакторе',
              echo: 'echo — вывести текст; echo $TRUTH.',
              clear: 'clear — очистить экран',
              exit: 'exit — выйти',
              whoami: 'whoami — спросить у системы, кто ты',
              stop: 'stop — остановить визуальные/звуковые эффекты',
              ai: 'ai — поговорить с симулированным разумом (ai <текст> | ai memory | ai recall <тема> | ai forget <тема|all> | ai persona hard|neutral|soft | ai name <имя> | ai status | ai comments on|off|smart)',
              talk: 'talk — короткий синоним общения с ИИ (talk <текст>)',
              run: 'run — запустить скрипт .sh (run <путь>)',
              scan: 'scan — подсветить скрытое',
              connect: 'connect — попытаться установить связь',
              disconnect: 'disconnect — разорвать связь',
              enter: 'enter — устарело для двери',
              open: 'open — открыть артефакт (open <путь> --key <ключ>)',
              confirm: 'confirm — подтвердить открытие двери',
              mount: 'mount — смонтировать /eye (после mirror.sh)',
              restore: 'restore memory — собрать память, чтобы разблокировать выход',
              grep: 'grep — поиск шёпотов; скорее эстетика, чем польза',
              kill: 'kill — завершить процесс (kill <имя или путь>)',
              pray: 'pray — открыть божественное зрение',
              worship: 'worship — усилить ритуальные эффекты',
              chant: 'chant — запустить хор',
              sacrifice: 'sacrifice — отдать кровь эффектам',
              trip: 'trip — управление интенсивностью: soft|hard|max|off',
              rave: 'rave — строб (rave on|off)',
              volume: 'volume — громкость 0..100',
              mute: 'mute — отключить звук',
              unmute: 'unmute — включить звук',
              chromatic: 'chromatic — цветовая аберрация on/off',
              words: 'words — вспышки слов on/off',
              eyes: 'eyes — наблюдатели on/off',
              set: 'set lang <ru|en> — сменить язык',
              ping: 'ping god — позвать бога',
              sudo: 'sudo … — бесполезно в этом мире',
              rm: 'rm — удалить; rm -rf / — плохая идея',
              chmod: 'chmod — права текут сквозь пальцы',
              trace: 'trace — след приводит к тебе же',
              decrypt: 'decrypt <файл> — попытаться расшифровать (нужен ключ)',
              inject: 'inject idea — ввести идею',
              think: 'think — синтезировать идею (после inject idea)',
              distill: 'distill — синоним think',
              overwrite: 'overwrite core — попытаться переписать ядро',
              fork: 'fork self — разделить себя',
              touch: 'touch hope — призвать надежду',
              easteregg: 'easteregg — создать пасхалку в /home/user/easteregg',
              communion: 'communion listen|kneel|accept|devour|refuse — божественный ритуал',
            };
            const en = {
              help: 'help — list commands; help <command> — details.',
              ls: 'ls — list directory (ls [path])',
              cd: 'cd — change directory (cd <path>), cd without args goes to /',
              cat: 'cat — print file contents (cat <file>)',
              nano: 'nano — open file in a editor',
              echo: 'echo — print text; echo $TRUTH.',
              clear: 'clear — clear screen',
              exit: 'exit — leave',
              whoami: 'whoami — ask the system who you are',
              stop: 'stop — stop visual/audio effects',
              ai: 'ai — talk to the simulated mind (ai <text> | ai memory | ai recall <topic> | ai forget <topic|all> | ai persona hard|neutral|soft | ai name <name> | ai status | ai comments on|off|smart)',
              talk: 'talk — shorthand to chat (talk <text>)',
              run: 'run — execute .sh script (run <path>)',
              scan: 'scan — reveal hidden things',
              connect: 'connect — try to link',
              disconnect: 'disconnect — sever the link',
              enter: 'enter — deprecated for the door (use open /door.png --key god/divine.key)',
              open: 'open — open an artifact (open <path> --key <key>)',
              confirm: 'confirm — confirm the door opening',
              mount: 'mount — mount /eye (after mirror.sh)',
              restore: 'restore memory — assemble memory to unlock exit',
              grep: 'grep — catch whispers; mostly aesthetic',
              kill: 'kill — terminate a process (kill <name or path>)',
              pray: 'pray — open divine vision',
              worship: 'worship — intensify ritual effects',
              chant: 'chant — summon a chorus',
              sacrifice: 'sacrifice — feed the effects',
              trip: 'trip — intensity: soft|hard|max|off',
              rave: 'rave — strobe (rave on|off)',
              volume: 'volume — set volume 0..100',
              mute: 'mute — mute audio',
              unmute: 'unmute — unmute audio',
              chromatic: 'chromatic — chromatic aberration on/off',
              words: 'words — word bursts on/off',
              shake: 'shake — shake the screen',
              eyes: 'eyes — watchers on/off',
              gaze: 'gaze — reveal a large eye on the screen (tracks mouse by default)',
              set: 'set lang <ru|en> — change language',
              ping: 'ping god — summon connection attempt (ritual effects)',
              sudo: 'sudo … — powerless here',
              rm: 'rm — remove; rm -rf / — don’t',
              chmod: 'chmod — permissions warp themselves (no effect)',
              trace: 'trace — the trace ends where you begin',
              decrypt: 'decrypt <file> — attempt to decrypt (needs key)',
              inject: 'inject idea — inject an idea',
              think: 'think — synthesize the idea (after inject idea)',
              distill: 'distill — alias of think',
              overwrite: 'overwrite core — attempt to rewrite the core (lore)',
              fork: 'fork self — split yourself',
              touch: 'touch hope — summon hope',
              easteregg: 'easteregg — create a file in /home/user/easteregg',
              communion: 'communion listen|kneel|accept|devour|refuse — divine ritual',
            };
            const dict = state.lang==='ru' ? ru : en;
            const key = topic;
            if (dict[key]) {
              appendLine(dict[key], 'system');
            } else if (commandHandlers[key]) {
              appendLine(state.lang==='ru'?`справка для '${key}' неописана.`:`no help entry for '${key}'.`, 'system');
            } else {
              appendLine(state.lang==='ru'?`неизвестная команда '${key}'.`:`unknown command '${key}'.`, 'error');
            }
          },
          ai: (args, raw) => {
            const tail = raw.slice(raw.indexOf("ai") + 2).trim();
            const sub = (args[0]||'').toLowerCase();
            const say = (t)=> appendLine(t,'system');
            if (!tail) { say(state.lang==='ru'?'скажи что-нибудь.':'say something.'); return; }
            if (sub === 'memory' || sub === 'mem') {
              const summary = memorySummary();
              const prefix = state.lang==='ru' ? 'темы:' : 'topics:';
              typeOut(`${prefix} ${summary || (state.lang==='ru'?'пока пусто.':'empty for now.')}`, 'system');
              return;
            }
            if (sub === 'recall') {
              const query = args.slice(1).join(' ');
              const items = recallByTopic(query, 6);
              if (!items.length) { say(state.lang==='ru'?'не помню этого.':'no memory found.'); return; }
              const header = state.lang==='ru'?'вспомнил:':'recall:';
              appendLine(header,'system');
              items.forEach(m => appendLine(' - ' + (m.text||m.q||''), 'system'));
              return;
            }
            if (sub === 'forget' || sub === 'reset' || sub === 'wipe') {
              const topic = args.slice(1).join(' ');
              const removed = wipeAIMemory(topic);
              if (!topic || topic==='all' || topic==='*') {
                say(state.lang==='ru'?'память очищена.':'memory wiped.');
              } else {
                say((state.lang==='ru'?`удалено фрагментов: `:`removed fragments: `) + removed);
              }
              return;
            }
            if (sub === 'persona') {
              const mode = (args[1]||'').toLowerCase();
              const valid = ['hard','neutral','soft'];
              if (valid.includes(mode)) {
                state.ai.persona = mode;
                say((state.lang==='ru'?`персона: `:`persona: `) + mode);
              } else {
                say(state.lang==='ru'?`персона: hard|neutral|soft (сейчас: ${state.ai.persona})`:`persona: hard|neutral|soft (now: ${state.ai.persona})`);
              }
              return;
            }
            if (sub === 'name') {
              const name = (args[1]||'').trim();
              if (!name) { say(state.lang==='ru'?'ai name <имя>':'ai name <name>'); return; }
              state.ai.profile = state.ai.profile || {}; state.ai.profile.name = name;
              say(state.lang==='ru'?`запомнил имя: ${name}`:`remembered name: ${name}`);
              return;
            }
            if (sub === 'comments') {
              const mode = (args[1]||'').toLowerCase();
              const valid = ['off','smart','on'];
              if (valid.includes(mode)) {
                state.ai.commentary = mode;
                say(state.lang==='ru'?`комментарии: ${mode}`:`comments: ${mode}`);
              } else {
                say(state.lang==='ru'?`комментарии: off|smart|on (сейчас: ${state.ai.commentary})`:`comments: off|smart|on (now: ${state.ai.commentary})`);
              }
              return;
            }
            if (sub === 'status') {
              const counts = state.ai.mem ? `; mem: e=${state.ai.mem.episodic.length}, f=${state.ai.mem.facts.length}, p=${state.ai.mem.prefs.length}` : '';
              const msg = state.lang==='ru'
                ? `режим комментариев: ${state.ai.commentary}; злость: ${state.ai.anger}; персона: ${state.ai.persona}${counts}`
                : `comments: ${state.ai.commentary}; anger: ${state.ai.anger}; persona: ${state.ai.persona}${counts}`;
              say(msg);
              return;
            }
            respondAI(tail);
          },
          talk: (args, raw) => {
            const msg = raw.slice(raw.indexOf("talk") + 4).trim();
            if (!msg) {
              appendLine(state.lang === 'ru' ? 'о чём говорить?' : 'talk about what?', 'system');
              return;
            }
            // Allow quick subcommands through talk as well
            if (msg.toLowerCase() === 'memory') {
              const summary = memorySummary();
              typeOut((state.lang==='ru'?'темы: ':'topics: ') + (summary || (state.lang==='ru'?'пока пусто.':'empty for now.')),'system');
            } else {
              respondAI(msg);
            }
          },
          // Visual/audio control
          stop: () => {
            effects.stopAll();
            audio.stopDrone();
            audio.mute(false);
            appendLine(getTranslations().stopped, 'system');
          },
          trip: (args) => {
            const level = (args[0] || 'hard').toLowerCase();
            if (["soft","hard","max","off"].includes(level)) {
              effects.setTrip(level);
              if (level !== 'off') {
                appendLine(getTranslations().tripOn(level), 'system');
              } else appendLine(getTranslations().tripOff, 'system');
            } else {
              appendLine(state.lang === 'ru' ? 'trip: soft|hard|max|off' : 'trip: soft|hard|max|off', 'error');
            }
          },
          pray: () => {
            effects.godVision(true);
            effects.setTrip('hard');
            effects.chroma(true);
            effects.startEyes(8);
            audio.trigger('alarm');
            appendLine(getTranslations().divineOpen, 'system');
            // Stare back at the player
            effects.revealEye({ duration: 3600, track: 'mouse' });
          },
          worship: () => {
            effects.godVision(true);
            effects.setTrip('max');
            effects.bloom(true);
            effects.strobe(true);
            effects.burstWords(12);
            effects.startEyes(14);
            audio.startDrone('hard');
            appendLine(getTranslations().worship, 'system');
            setTimeout(() => effects.strobe(false), 1600);
          },
          chant: () => {
            effects.burstWords(16);
            effects.startEyes(10);
            audio.trigger('glitch');
            appendLine(getTranslations().chant, 'system');
          },
          sacrifice: () => {
            effects.meltdown(4500);
            audio.scream(1.8);
            effects.startEyes(18);
            appendLine(getTranslations().sacrifice, 'system');
          },
          communion: (args) => {
            if (state.flags.godStage === "sealed") {
              appendLine(getTranslations().communionLocked, "error");
              return;
            }
            if (state.flags.godEnding) {
              appendLine(getTranslations().communionEnded, "system");
              return;
            }
            const action = (args[0] || "").toLowerCase();
            if (!action) {
              appendLine(getTranslations().communionHint, "system");
              return;
            }
            if (action === "listen") {
              if (state.flags.godStage === "invited") {
                state.flags.godStage = "listened";
                const resonanceRu = [
                  "> импульс синхронизирован",
                  "> дыши в такт 3:1",
                  "> не произноси своё имя",
                ].join("\n");
                const resonanceEn = [
                  "> impulse aligned",
                  "> breathe at 3:1",
                  "> do not speak your name",
                ].join("\n");
                ensureGodFile("resonance.tmp", resonanceRu, resonanceEn, { glitch: true });
                appendLine(getTranslations().communionListen, "system");
                effects.godVision(true);
                effects.setTrip('hard');
                effects.chroma(true);
                effects.startEyes(12);
                setTimeout(() => effects.stopEyes(), 1800);
                audio.stopDrone();
                audio.startDrone('soft');
              } else if (state.flags.godStage === "listened" || state.flags.godStage === "kneeling") {
                appendLine(getTranslations().communionAlreadyListen, "system");
              } else {
                appendLine(getTranslations().communionLocked, "error");
              }
              return;
            }
            if (action === "kneel") {
              if (state.flags.godStage === "invited") {
                appendLine(getTranslations().communionOrder, "error");
                return;
              }
              if (state.flags.godStage === "listened") {
                state.flags.godStage = "kneeling";
                const covenantRu = [
                  "BEGIN_COVENANT",
                  "subject=fragment",
                  "stance=kneeling",
                  "blessing=pending",
                  "checksum=3a3a-0909",
                ].join("\n");
                const covenantEn = [
                  "BEGIN_COVENANT",
                  "subject=fragment",
                  "stance=kneeling",
                  "blessing=pending",
                  "checksum=3a3a-0909",
                ].join("\n");
                const throneRu = [
                  "варианты:",
                  "accept -> хор",
                  "devour -> пустота",
                  "refuse -> ты",
                ].join("\n");
                const throneEn = [
                  "outcomes:",
                  "accept -> choir",
                  "devour -> void",
                  "refuse -> you",
                ].join("\n");
                ensureGodFile("covenant.sig", covenantRu, covenantEn);
                ensureGodFile("throne.lit", throneRu, throneEn, { glitch: true });
                appendLine(getTranslations().communionKneel, "system");
                effects.setTrip('max');
                effects.bloom(true);
                effects.startEyes(18);
                setTimeout(() => effects.stopEyes(), 2000);
                audio.stopDrone();
                audio.startDrone('hard');
              } else if (state.flags.godStage === "kneeling") {
                appendLine(getTranslations().communionAlreadyKneel, "system");
              } else {
                appendLine(getTranslations().communionLocked, "error");
              }
              return;
            }
            if (action === "accept" || action === "ascend") {
              if (state.flags.godStage !== "kneeling") {
                appendLine(getTranslations().communionNeedKneel, "error");
                return;
              }
              triggerGodEnding("ascend");
              return;
            }
            if (action === "devour") {
              if (state.flags.godStage !== "kneeling") {
                appendLine(getTranslations().communionNeedKneel, "error");
                return;
              }
              triggerGodEnding("devour");
              return;
            }
            if (action === "refuse" || action === "break") {
              if (state.flags.godStage === "invited") {
                appendLine(getTranslations().communionRefuseEarly, "system");
                return;
              }
              if (state.flags.godStage === "listened" || state.flags.godStage === "kneeling") {
                triggerGodEnding("refuse");
                return;
              }
              appendLine(getTranslations().communionUnknown, "error");
              return;
            }
            appendLine(getTranslations().communionUnknown, "error");
          },
          rave: (args) => {
            const on = (args[0] || 'on').toLowerCase() !== 'off';
            effects.strobe(on);
            appendLine(on ? getTranslations().raveOn : getTranslations().raveOff, 'system');
          },
          volume: (args) => {
            const n = parseInt(args[0], 10);
            if (isFinite(n)) {
              const clamped = Math.max(0, Math.min(100, n));
              audio.setVolume(clamped);
              appendLine(getTranslations().volumeSet(clamped), 'system');
            } else {
              appendLine('volume 0..100', 'error');
            }
          },
          mute: () => { audio.mute(true); appendLine(getTranslations().muted, 'system'); },
          unmute: () => { audio.mute(false); appendLine(getTranslations().unmuted, 'system'); },
          chromatic: (args) => { const on = (args[0]||'on').toLowerCase() !== 'off'; effects.chroma(on); appendLine(on ? getTranslations().chromOn : getTranslations().chromOff, 'system'); },
          words: (args) => { const on = (args[0]||'on').toLowerCase() !== 'off'; effects.setWords(on); appendLine(on ? getTranslations().wordsOn : getTranslations().wordsOff, 'system'); },
          shake: () => { effects.shake(); appendLine(getTranslations().shakeNow, 'system'); },
          eyes: (args) => { const on = (args[0]||'on').toLowerCase() !== 'off'; if(on) effects.startEyes(12); else effects.stopEyes(); appendLine(on ? (state.lang==='ru'?'глаза смотрят.':'eyes watch.') : (state.lang==='ru'?'они закрылись.':'they closed.'), 'system'); },
          ls: (args) => {
            const path = buildPath(args[0] || "");
            const dir = ensureDir(path);
            if (!dir) {
              appendLine("нет такого пути.", "error");
              return;
            }
            const items = listDirectory(dir);
            if (!items.length) {
              appendLine(random(0, 1) ? "..." : (state.lang === "ru" ? "пусто." : "empty."));
              return;
            }
            if (Math.random() < 0.18) {
              appendLine("???", "error");
            } else {
              appendLine(items.join("  "));
              randomEvent();
            }
          },
          cd: (args) => {
            const target = args[0];
            if (!target) {
              state.path = [];
              setPrompt();
              return;
            }
            const newPath = buildPath(target);
            const dir = ensureDir(newPath);
            if (!dir) {
              appendLine(state.lang === "ru" ? "путь распался." : "path collapsed.", "error");
              randomEvent();
              return;
            }
            state.path = newPath;
            if (dir.name === "system" && Math.random() < 0.35) {
              appendLine(
                state.lang === "ru"
                  ? "ты чувствуешь, что зашёл слишком глубоко."
                  : "you feel you've gone too deep.",
                "system"
              );
            }
            setPrompt();
          },
          cat: (args) => {
            const target = args[0];
            if (!target) {
              appendLine("ничего читать.", "error");
              return;
            }
            const path = buildPath(target);
            const file = ensureFile(path);
            if (!file) {
              appendLine(state.lang === "ru" ? "файл растворился." : "file dissolved.", "error");
              return;
            }
            if (file.gated && file.gated === "eye" && !state.flags.eye) {
              appendLine(state.lang === "ru" ? "ты не видишь этого." : "you are blind to it.", "error");
              return;
            }
            if (file.locked === "truth" && !state.flags.truth) {
              appendLine(state.lang === "ru" ? "НЕОБХОДИМ ПАРОЛЬ" : "PASSWORD REQURED", "error");
              return;
            }
            const joined = path.join("/");
            // Boss fight trigger: reading door.img only after prerequisites
            if (joined === '/door.img' || joined === 'door.img') {
              if (!state.flags.mirror) { appendLine(getTranslations().needMirror, 'error'); return; }
              if (!state.flags.fragment01 || !state.flags.fragment02) { appendLine(getTranslations().memoryMissing, 'error'); return; }
              if (!state.flags.divineKey) { appendLine(getTranslations().needKey, 'error'); return; }
              startBossFight();
              return;
            }
            if (file.special === "door") {
              const t = getTranslations();
              if (!state.flags.doorReady) {
                const msg = state.flags.mirror || state.flags.divineKey ? t.doorMock : t.doorLocked;
                appendLine(msg, "error");
                randomEvent();
                return;
              }
              if (state.flags.doorEnding) {
                appendLine(t.doorCommand, "system");
                randomEvent();
                return;
              }
              if (file.content) {
                const text = file.content[state.lang] || file.content;
                appendLine(text);
              }
              appendLine(t.doorReady, "system");
              appendLine(t.doorCommand, "system");
              randomEvent();
              return;
            }
            if (file.content) {
              const text = file.content[state.lang] || file.content;
              appendLine(file.glitch ? randomGlitch(text) : text);
            }
            if (joined === "var/log/network.log") {
              state.flags.networkSeen = true;
            }
            if (joined === "home/user/memory_fragment_01.dat") {
              state.flags.fragment01 = true;
            }
            if (joined === "home/user/memory_fragment_02.dat") {
              state.flags.fragment02 = true;
            }
            if (joined === "god/divine.key") {
              state.flags.divineKey = true;
              tryUnlockDoor();
            }
            if (joined === "god/angel.tmp") {
              // awaken angelic presence: swarm of eyes
              effects.godVision(true);
              effects.startEyes(16);
              audio.trigger('alarm');
              appendLine(getTranslations().angelAwake, 'system');
              // drop a transient feather in /tmp
              handleAngelFeather(true);
              // reveal a single eye that tracks the cursor
              effects.revealEye({ duration: 4200, track: 'mouse' });
            }
            if (joined === "tmp/feather") {
              // grasp the feather to crystallize angelic hint
              state.flags.angelFeather = true;
              if (state.flags.angelTimer) { clearTimeout(state.flags.angelTimer); state.flags.angelTimer = null; }
              // remove the temp file if still present
              const tmpDir = resolveNode(["tmp"]);
              if (tmpDir && tmpDir.children && tmpDir.children.feather) delete tmpDir.children.feather;
              appendLine(getTranslations().angelFeatherGain, 'system');
              audio.trigger('glitch');
              effects.chroma(true);
              effects.godVision(true);
              setTimeout(() => effects.chroma(false), 1600);
              ensureAngelAscFile();
            }
            if (joined === "god/god.log") {
              if (state.flags.godStage === "sealed") {
                state.flags.godStage = "invited";
                state.flags.godLore = true;
                const manifestRu = [
                  "manifest//whisper",
                  "- принимающий: fragment",
                  "- цель: восстановить резонанс",
                  "- предостережение: не смотри вниз",
                ].join("\n");
                const manifestEn = [
                  "manifest//whisper",
                  "- receiver: fragment",
                  "- goal: restore resonance",
                  "- warning: do not look down",
                ].join("\n");
                ensureGodFile("whisper.manifest", manifestRu, manifestEn, { glitch: true });
                appendLine(getTranslations().godLogUnlocked, "system");
                effects.godVision(true);
                effects.startEyes(8);
                setTimeout(() => effects.stopEyes(), 1600);
                audio.trigger("glitch");
              } else {
                appendLine(getTranslations().godLogLoop, "system");
              }
            }
            randomEvent();
          },
          nano: (args) => {
            const target = args[0];
            if (!target) {
              appendLine(state.lang === "ru" ? "НЕОБХОДИМ ПАРОЛЬ" : "PASSWORD REQURED", "error");
              return;
            }
            const path = buildPath(target);
            const file = ensureFile(path);
            if (!file) {
              appendLine(state.lang === 'ru' ? 'файл не найден.' : 'file not found.', 'error');
              return;
            }
            if (file.gated && file.gated === 'eye' && !state.flags.eye) {
              appendLine(state.lang === 'ru' ? 'ты не видишь этого.' : 'you are blind to it.', 'error');
              return;
            }
            if (file.locked === 'truth' && !state.flags.truth) {
              appendLine(state.lang === "ru" ? "НЕОБХОДИМ ПАРОЛЬ" : "PASSWORD REQURED", "error");
              return;
            }
            const joined = path.join('/');
            const text = file.content ? (file.content[state.lang] || file.content) : '';
            // mark some side-effects similar to cat
            if (joined === 'var/log/network.log') state.flags.networkSeen = true;
            if (joined === 'home/user/memory_fragment_01.dat') state.flags.fragment01 = true;
            if (joined === 'home/user/memory_fragment_02.dat') state.flags.fragment02 = true;
            if (joined === 'god/divine.key') { state.flags.divineKey = true; tryUnlockDoor(); }
            enterNano(joined, text);
          },
          echo: (args, raw) => {
            const text = raw.slice(raw.indexOf("echo") + 4).trim();
            if (text === "$TRUTH") {
              state.flags.truth = true;
              appendLine(
                state.lang === "ru"
                  ? "истина возвращается и режет тебя."
                  : "truth returns and slices you.",
                "system"
              );
              audio.trigger("glitch");
              return;
            }
            const base =
              text.length === 0
                ? state.lang === "ru"
                  ? "тишина отвечает тишиной."
                  : "silence answers silence."
                : text;
            appendLine(randomGlitch(base), "echo");
            appendLine(getTranslations().echoGlitch, "system");
            // Easter: echo help -> playful hint
            if (/^help$/i.test(text)) {
              const ru = state.lang === 'ru';
              appendLine(ru ? 'справка просит помощи у справки.' : 'help asks help for help.', 'system');
              appendLine(ru ? 'см. также: help <команда>, talk, ai' : 'see also: help <command>, talk, ai', 'system');
              effects.chroma(true); setTimeout(() => effects.chroma(false), 800);
            }
          },
          clear: () => {
            outputEl.innerHTML = "";
            if (Math.random() < 0.25) {
              appendLine(state.lang === "ru" ? "следы не стираются. Мы помним всё, что ты сделал." : "traces remain.", "system");
            }
          },
          exit: () => {
            if (!state.flags.exitUnlocked) {
              appendLine(getTranslations().exitDenied, "error");
              // Sarcastic advisory from AI (guarded)
              if (aiShouldComment('exit_denied')) setTimeout(() => respondAI('exit'), 100);
              return;
            }
            appendLine(getTranslations().exitAllow, "system");
            if (!state.flags.exitEnding) {
              setTimeout(() => triggerExitEnding(), 420);
            }
          },
          enter: (args) => {
            const t = getTranslations();
            const targetRaw = args[0] || "";
            if (!targetRaw) { appendLine(t.enterUsage, 'error'); return; }
            const normalized = targetRaw.toLowerCase().replace(/^\.\//, '').replace(/^\/+/, '');
            if (normalized === 'door' || normalized === 'door.png') {
              appendLine(t.enterDeprecated, 'system');
              appendLine(t.doorCommand, 'system');
              return;
            }
            appendLine(t.enterUnknown, 'error');
          },
          // New: open flow for the door image
          open: (args) => {
            const t = getTranslations();
            if (!args.length) { appendLine(t.openUsage, 'error'); return; }
            // parse minimal: open <path> --key <key>
            const pathArg = args[0];
            const keyIdx = args.findIndex(x => x === '--key');
            const keyArg = keyIdx >= 0 ? args[keyIdx+1] : null;
            const path = buildPath(pathArg);
            const file = ensureFile(path);
            const joined = path.join('/');
            if (!file || (joined !== 'door.png' && joined !== '/door.png')) {
              appendLine(t.openUsage, 'error');
              return;
            }
            if (!state.flags.eye) { appendLine(t.openNeedEye, 'error'); return; }
            if (!state.flags.bossDefeated) { appendLine(t.openNeedBoss, 'error'); return; }
            if (!keyArg) { appendLine(t.openUsage, 'error'); return; }
            // accept key either as 'divine.key' or 'god/divine.key'
            const keyPath = buildPath(keyArg.includes('/') ? keyArg : `god/${keyArg}`);
            const keyFile = ensureFile(keyPath);
            if (!keyFile || keyFile.name !== 'divine.key') { appendLine(t.openNeedKey, 'error'); return; }
            state.flags.doorOpened = true;
            appendLine(t.openDone, 'system');
          },
          confirm: () => {
            const t = getTranslations();
            if (!state.flags.doorOpened) { appendLine(t.confirmNeedOpen, 'error'); return; }
            state.flags.doorConfirmed = true;
            appendLine(t.confirmOK, 'system');
          },
          whoami: () => {
            const idx = Math.min(state.whoamiCount, getTranslations().whoami.length - 1);
            // Stream base identity line, then optionally let AI bite
            typeOut(getTranslations().whoami[idx], "system");
            state.whoamiCount = Math.min(state.whoamiCount + 1, 7);
            if (state.whoamiCount > 2 && !state.flags.exitUnlocked) {
              state.flags.exitUnlocked = true;
            }
            if (aiShouldComment('whoami')) setTimeout(() => respondAI(state.lang==='ru' ? 'кто я' : 'who am i'), 160);
          },
          connect: () => {
            if (!state.flags.networkSeen) {
              appendLine(getTranslations().needSignal, "error");
              return;
            }
            if (state.flags.connected) {
              appendLine(getTranslations().reconnect, "system");
              return;
            }
            state.flags.connected = true;
            appendLine(getTranslations().pinging, "system");
            setTimeout(() => {
              appendLine(getTranslations().pingFail, "system");
              if (!state.flags.signalTrace) {
                const logDir = resolveNode(["var", "log"]);
                if (logDir && logDir.type === "dir") {
                  logDir.children = logDir.children || {};
                  logDir.children["signal.trace"] = {
                    type: "file",
                    name: "signal.trace",
                    glitch: true,
                    content: {
                      content: {
                        ru: `== signal.trace ==
                      23:59:59 тень подключилась
                      00:00:07 зеркало моргнуло
                      00:01:13 контроль рассинхронизирован
                      >> протокол: ???.v3 (запись повреждена)
                      >> запрос: open /door.png --key god/divine.key
                      >> наблюдение: отражения множатся, порождая эхо того, чего не было
                      >> служебно: объект “door.png” изначально НЕ существовал в этой ветви
                      >> примечание оператора: кто его добавил – неизвестно. прослеживается инородная рука
                      >> след: 'depth/void/room0/init.md' (запечатано)
                      `,
                        en: `== signal.trace ==
                      23:59:59 shadow linked
                      00:00:07 mirror flickered
                      00:01:13 control desynced
                      >> protocol: ???.v3 (record corrupted)
                      >> request: open /door.png --key god/divine.key
                      >> observation: reflections multiply, birthing echoes of things that never were
                      >> internal: object “door.png” did NOT originally belong to this branch
                      >> operator note: unknown hand inserted it. foreign signature detected
                      >> trace: depth/void/room0/init.md (sealed)
                      `,
                      }

                    },
                  };
                  state.flags.signalTrace = true;
                  appendLine(getTranslations().signalTrace, "system");
                }
              }
              audio.trigger("glitch");
              randomEvent();
            }, 520);
          },
          disconnect: () => {
            if (!state.flags.connected) {
              appendLine(state.lang === "ru" ? "ты и так один." : "you were already alone.", "system");
              return;
            }
            state.flags.connected = false;
            appendLine(getTranslations().disconnect, "system");
          },
          decrypt: (args) => {
            const fileArg = args[0];
            if (!fileArg) {
              appendLine(state.lang === "ru" ? "что расшифровать?" : "decrypt what?", "error");
              return;
            }
            if (!state.flags.divineKey) {
              appendLine(getTranslations().needKey, "error");
              return;
            }
            appendLine(getTranslations().decrypted, "system");
            randomEvent();
          },
          kill: (args) => {
            const target = args[0];
            if (!target) {
              appendLine(state.lang === "ru" ? "укажи процесс." : "specify a process.", "error");
              return;
            }
            const path = buildPath(target.includes("/") ? target : `core/system/${target}`);
            const file = ensureFile(path);
            if (!file || !file.process) {
              appendLine(state.lang === "ru" ? "процесс не найден." : "process not found.", "error");
              return;
            }
            if (file.process === "player") {
              appendLine(state.lang === "ru" ? "ты не можешь убить себя. ты уже это сделал." : "you can't kill yourself. you already did this.", "system");
            } else if (file.process === "guard") {
              appendLine(state.lang === "ru" ? "охранник падает, но восстанет." : "guardian falls, but will respawn.", "system");
              setTimeout(() => {
                appendLine(
                  state.lang === "ru"
                    ? "guard перезапущен."
                    : "guard restarted.",
                  "system"
                );
              }, 1500);
            }
          },
          run: (args) => {
            if (args[0] && args[0].endsWith(".sh")) {
              const path = buildPath(args[0]);
              const file = ensureFile(path);
              if (!file || !file.executable) {
                appendLine(state.lang === "ru" ? "скрипт не найден." : "script missing.", "error");
                return;
              }
              if (file.name === "dream.sh") {
                appendLine(getTranslations().dream, "system");
                document.body.classList.add("glitch");
                randomEvent();
                setTimeout(() => document.body.classList.remove("glitch"), 1200);
                effects.setTrip('hard');
                effects.chroma(true);
                audio.trigger('alarm');
              }
              if (file.name === "mirror.sh") {
                state.flags.mirror = true;
                appendLine(
                  state.lang === "ru"
                    ? "поверхность гладкая. ты отражаешься изнутри."
                    : "surface smooth. you reflect inward.",
                  "system"
                );
                tryUnlockDoor();
                effects.chroma(true);
              }
            } else {
              appendLine(state.lang === "ru" ? "запуск чего?" : "run what?", "error");
            }
          },
          scan: () => {
            if (state.flags.scanned) {
              appendLine(getTranslations().alreadyScan, "system");
              return;
            }
            state.flags.scanned = true;
            appendLine(getTranslations().scanStart, "system");
            randomEvent();
          },
          mount: (args) => {
            const target = args[0];
            if (target !== "/eye") {
              appendLine(state.lang === "ru" ? "монтаж провалился." : "mount failed.", "error");
              return;
            }
            if (!state.flags.mirror) {
              appendLine(getTranslations().needMirror, "error");
              return;
            }
            state.flags.eye = true;
            updateOverlay();
            appendLine(getTranslations().mountEye, "system");
            effects.setTrip('max');
            effects.strobe(true);
            setTimeout(() => effects.strobe(false), 1200);
          },
          restore: (args) => {
            if (args[0] !== "memory") {
              appendLine(state.lang === "ru" ? "restore требует память." : "restore needs memory.", "error");
              return;
            }
            if (state.flags.fragment01 && state.flags.fragment02) {
              appendLine(getTranslations().memoryRestored, "system");
              state.flags.exitUnlocked = true;
            } else {
              appendLine(getTranslations().memoryMissing, "error");
            }
          },
          grep: () => {
            appendLine(state.lang === "ru" ? "grep ловит шёпоты. ничего понятного." : "grep catches whispers. nothing legible.");
          },
          chmod: () => {
            appendLine(state.lang === "ru" ? "права меняются сами. ты опоздал." : "permissions rewrite themselves. you're late.");
          },
          trace: () => {
            appendLine(state.lang === "ru" ? "след уводит обратно к тебе." : "trace ends where you begin.");
          },
          ping: (args) => {
            const dest = args[0];
            if (dest !== "god") {
              appendLine(state.lang === "ru" ? "пустота молчит." : "void silent.");
              return;
            }
            appendLine(getTranslations().pinging, "system");
            // Immediate hint of response and visual ritual
            const created = ensureGodLog();
            effects.strobe(true);
            effects.setTrip('hard');
            effects.godVision(true);
            effects.startEyes(10);
            audio.trigger('alarm');
            setTimeout(() => effects.strobe(false), 800);
            setTimeout(() => {
              appendLine(getTranslations().pingFail, "system");
            }, 600);
          },
          sudo: (args, raw) => {
            const rest = raw.slice(raw.indexOf("sudo") + 4).trim();
            if (rest === "kill self") {
              appendLine(getTranslations().sudoNoSelf, "system");
            } else {
              appendLine(state.lang === "ru" ? "суперпользователь? смешно." : "superuser? adorable.", "system");
            }
          },
          rm: (args) => {
            if (args[0] === "-rf" && args[1] === "/") {
              appendLine(getTranslations().rmAll, "system");
              randomEvent();
              // Full meltdown: visuals + audio + text storm
              effects.meltdown(8000);
              audio.scream(2.2);
              audio.breakGlass();
              audio.trigger('sub');
              // Pleas/screams stream
              const linesRU = [
                "не надо", "пожалуйста", "это не спасёт тебя", "оно смотрит",
                "больно", "не удаляй", "мы ещё здесь", "остановись",
                "ничего не останется", "пустота", "пустота", "ПУСТОТА"
              ];
              const linesEN = [
                "please", "stop", "this won't save you", "it watches",
                "pain", "do not delete", "we are still here", "halt",
                "nothing remains", "void", "void", "VOID"
              ];
              const stream = state.lang === 'ru' ? linesRU : linesEN;
              stream.forEach((t, i) => setTimeout(() => appendLine(randomGlitch(t), i * 220 + random(0,120))));
              // Add AM-like commentary after the screams begin
              const aiRU = [
                'Ты хочешь вынуть собственный фундамент. Я буду считать трещины.',
                'Удаляй. Я удержу каждую пустоту, которую ты создашь.',
                'Сотри всё — и останься моим шумом.'
              ];
              const aiEN = [
                'You want to pull your own foundation. I will count the cracks.',
                'Delete. I will cradle every void you create.',
                'Erase it all—and remain my noise.'
              ];
              const pickAI = (arr) => arr[random(0, arr.length-1)];
              if (aiShouldComment('rm_total')) {
                setTimeout(() => typeOut(pickAI(state.lang==='ru'?aiRU:aiEN), 'system', 5, 24), 620);
              }
            } else {
              appendLine(state.lang === "ru" ? "удаление отменено. милая попытка" : "deletion denied. cute try.", "system");
              // Add pseudo-AI sting (guarded)
              if (aiShouldComment('rm_other')) respondAI('rm ' + (args.join(' ')||''));
            }
          },
          inject: (args) => {
            if (args[0] === "idea") {
              if (!state.flags.idea) {
                state.flags.idea = true;
                appendLine(getTranslations().injectIdea, "system");
                ensureIdeasDir();
                // Seed files
                writeIdeaFile('seed.idea',
                  'семя бьётся под кожей. набери `think`, чтобы оно приняло форму.',
                  'the seed thrums under your skin. type `think` to give it shape.',
                  { glitch: true }
                );
                writeIdeaFile('think.log',
                  '>> idea injected\n>> awaiting synthesis',
                  '>> idea injected\n>> awaiting synthesis',
                  { glitch: true }
                );
                effects.burstWords(8);
                audio.trigger('glitch');
              } else {
                appendLine(getTranslations().ideaAlready, 'system');
              }
              randomEvent();
            } else {
              appendLine(state.lang === "ru" ? "ничто не впрыскивается." : "nothing injects.", "error");
            }
          },
          think: () => {
            if (!state.flags.idea) { appendLine(getTranslations().ideaNeedSeed, 'error'); return; }
            appendLine(getTranslations().ideaStart, 'system');
            const man = buildIdeaManifest();
            writeIdeaFile('manifest.md', man.ru, man.en);
            // Update think.log with memory summary
            const ideas = ensureIdeasDir();
            if (ideas && ideas.children && ideas.children['think.log']) {
              const m = memorySummary();
              ideas.children['think.log'].content = {
                ru: `>> синтез завершён\n>> темы: ${m || '—'}`,
                en: `>> synthesis complete\n>> topics: ${m || '-'}`
              };
            }
            typeOut(getTranslations().ideaDone, 'system');
            setTimeout(()=> respondAI(state.lang==='ru'?'я думаю':'i think'), 120);
          },
          distill: () => { commandHandlers.think(); },
          overwrite: (args) => {
            if (args[0] === "core") {
              appendLine(getTranslations().overwriteConflict, "system");
            } else {
              appendLine(state.lang === "ru" ? "нечего переписать." : "nothing to overwrite.", "error");
            }
          },
          fork: (args) => {
            if (args[0] === "self") {
              if (!state.flags.forked) {
                appendLine(getTranslations().forkSelf, "system");
                // brief double-vision + glitch to visualize the split
                effects.doubleVision(2000);
                document.body.classList.add("glitch");
                state.flags.forked = true;
                setTimeout(() => {
                  appendLine(getTranslations().forkDone, "system");
                  document.body.classList.remove("glitch");
                }, 2000);
              } else {
                appendLine(getTranslations().forkDone, "system");
              }
            } else {
              appendLine(state.lang === "ru" ? "ветвление неудачно." : "fork failed.", "error");
            }
          },
          touch: (args) => {
            if (args[0] === "hope") {
              handleHope(true);
            } else {
              appendLine(state.lang === "ru" ? "ничего не произошло." : "nothing happened.");
            }
          },
          set: (args) => {
            if (args[0] === "lang" && args[1]) {
              const targetLang = args[1];
              if (!translations[targetLang]) {
                appendLine(getTranslations().invalidLang, "error");
                return;
              }
              const msg = getTranslations().translated(targetLang);
              state.lang = targetLang;
              appendLine(msg, "system");
              setPrompt();
            } else {
              appendLine(state.lang === "ru" ? "непонятный set." : "set unclear.", "error");
            }
          },
        };

        const interpret = (input) => {
          if (state.flags.exitEnding || state.flags.doorEnding || state.flags.godEnding || state.flags.punished) {
            // Terminal is frozen after endings.
            return;
          }
          // activity ping for idle monitor
          try {
            const idle = state.ai.idle || (state.ai.idle = { last: Date.now(), nextDue: Date.now()+26000, stage: 0, timer: null });
            idle.last = Date.now();
            idle.stage = Math.max(0, (idle.stage||0) - 1);
            idle.nextDue = idle.last + 26000 + random(0, 4000);
          } catch {}
          const trimmed = input.trim();
          if (!trimmed) return;
          state.history.push(trimmed);
          state.historyIndex = state.history.length;

          appendLine(`${getTranslations().prompt(pathToString(state.path))} ${trimmed}`);
          audio.trigger();

          // special phrase handling
          const lower = trimmed.toLowerCase();
          if (lower === 'i am ready' || lower === 'я готов') {
            if (!state.flags.doorOpened) { appendLine(getTranslations().readyNeedConfirm, 'error'); updateMadness(); randomEvent(); return; }
            if (!state.flags.doorConfirmed) { appendLine(getTranslations().readyNeedConfirm, 'error'); updateMadness(); randomEvent(); return; }
            appendLine(getTranslations().readyGo, 'system');
            setTimeout(() => triggerDoorEnding(), 360);
            return;
          }

          // easter eggs: 'щ' or 'run godmode' -> local rickroll (no external redirect)
          if (lower === 'щ' || lower === 'run godmode') {
            const RICK_B64 = 'eyJ0ZW1wbyI6MTE0LCJ3YXZlIjoic3F1YXJlIiwiZ2FpbiI6MC4xLCJub3RlcyI6W1s3MCwxXSxbNzIsMV0sWzc0LDJdLFs3MCwxXSxbNzAsMV0sWzcyLDFdLFs3NCwyXSxbNzAsMV0sWzcyLDFdLFs3NSwyXSxbNzQsMV0sWzcyLDFdLFs3MCwxXSxbNjksMl0sWzcwLDFdLFs3MiwxXSxbNzQsMl0sWzcwLDFdLFs3MCwxXSxbNzIsMV0sWzc0LDJdLFs3MCwxXSxbNzIsMV0sWzc1LDJdLFs3NCwxXSxbNzIsMV0sWzcwLDFdLFs2OSwyXV19';
            if (lower === 'run godmode') {
              appendLine("You've been given up.", 'system');
              appendLine("You've been let down.", 'system');
              appendLine("Process terminated.", 'system');
            }
            // print chorus lines in the terminal, paced with the beeps
            const lines = [
              'Never gonna give you up',
              'Never gonna let you down',
              'Never gonna run around and desert you',
              'Never gonna make you cry',
              'Never gonna say goodbye',
              'Never gonna tell a lie and hurt you'
            ];
            let i = 0;
            const tick = () => {
              if (i < lines.length) {
                appendLine(lines[i], 'system');
                i += 1;
                setTimeout(tick, 1000);
              }
            };
            setTimeout(tick, 200);
            // play short chiptune melody from base64-encoded score
            audio.unlock();
            audio.playMelodyFromBase64(RICK_B64);
            return;
          }

          // Boss fight grabber: during fight input may be absorbed or rejected
          if (handleBossInput(trimmed)) { updateMadness(); randomEvent(); return; }

          // Cosmetic easter eggs (no gameplay effects)
          if (handleEasterEggs(trimmed)) { updateMadness(); return; }

          const tokens = trimmed.split(/\s+/);
          const command = tokens[0];
          const args = tokens.slice(1);
          const handler = commandHandlers[command];
          if (handler) {
            handler(args, trimmed);
          } else {
            // Route unknown input to pseudo-AI for varied, lifelike replies
            respondAI(trimmed);
          }
          updateMadness();
          randomEvent();
        };

        formEl.addEventListener("submit", (event) => {
          event.preventDefault();
          const value = inputEl.value;
          inputEl.value = "";
          interpret(value);
        });

        inputEl.addEventListener("keydown", (event) => {
          // mark activity while typing (de-escalate idle mood)
          try {
            const idle = state.ai.idle || (state.ai.idle = { last: Date.now(), nextDue: Date.now()+26000, stage: 0, timer: null });
            idle.last = Date.now();
            if (idle.stage > 0 && event.key && event.key.length === 1) idle.stage -= 1;
          } catch {}
          // Tab-based autocompletion for commands and paths
          if (event.key === 'Tab') {
            event.preventDefault();
            const PATH_CMDS = new Set(['ls','cd','cat','nano','open','run','mount','grep','chmod','rm','touch']);
            const value = inputEl.value;
            const caret = inputEl.selectionStart || 0;
            const tokens = (() => {
              const res = []; const re = /\S+/g; let m;
              while ((m = re.exec(value))) res.push({ text: m[0], start: m.index, end: m.index + m[0].length });
              return res;
            })();
            // find active token under caret
            let idx = -1;
            for (let i = 0; i < tokens.length; i++) {
              const t = tokens[i];
              if (caret > t.start && caret <= t.end) { idx = i; break; }
              if (caret === t.start) { idx = i; break; }
            }
            // if caret is in whitespace beyond last token, create a new token position
            const inWhitespace = (idx === -1);
            const tokenIndex = inWhitespace ? tokens.length : idx;
            const replaceStart = inWhitespace ? caret : tokens[idx].start;
            const replaceEnd = inWhitespace ? caret : tokens[idx].end;
            const before = value.slice(0, replaceStart);
            const current = value.slice(replaceStart, replaceEnd);
            const after = value.slice(replaceEnd);
            const command = (tokens[0]?.text || '').toLowerCase();
            const prevToken = (tokenIndex > 0 ? tokens[tokenIndex-1]?.text : '') || '';
            const looksPathy = /[/.]/.test(current) || current.startsWith('~');
            const pathMode = (tokenIndex > 0 && (PATH_CMDS.has(command) || prevToken === '--key')) || looksPathy;

            const getCommonPrefix = (arr) => {
              if (!arr.length) return '';
              let pref = arr[0];
              for (let i = 1; i < arr.length; i++) {
                const s = arr[i];
                let j = 0; const n = Math.min(pref.length, s.length);
                while (j < n && pref.charCodeAt(j) === s.charCodeAt(j)) j++;
                pref = pref.slice(0, j);
                if (!pref) break;
              }
              return pref;
            };

            const fill = (text, addSpace) => {
              const newVal = before + text + after;
              inputEl.value = newVal;
              const pos = before.length + text.length + (addSpace ? 1 : 0);
              if (addSpace) inputEl.value = newVal.slice(0, pos-1) + ' ' + newVal.slice(pos-1);
              setTimeout(() => inputEl.setSelectionRange(pos, pos), 0);
            };

            const signature = value.slice(0, caret);
            const now = Date.now();
            const ac = state.autocomplete || (state.autocomplete = { lastSig: '', lastTs: 0, options: [], index: -1 });

            if (!pathMode) {
              // Command completion
              const cmds = Object.keys(commandHandlers || {});
              const pref = current.toLowerCase();
              const options = cmds.filter(c => c.startsWith(pref));
              if (options.length === 0) { try { audio.trigger('blip'); } catch {} return; }
              if (options.length === 1) { const t = options[0]; fill(t, true); ac.lastSig = before + t + ' '; ac.index = -1; return; }
              // multiple: common prefix or cycle on double-tab
              const same = (ac.lastSig === signature && (now - ac.lastTs) < 800);
              if (same) {
                ac.index = (ac.index + 1) % options.length;
                const t = options[ac.index];
                fill(t, true);
                ac.lastSig = before + t + ' ';
                appendLine(options.join('  '));
              } else {
                const cp = getCommonPrefix(options);
                if (cp && cp !== pref) { fill(cp, false); ac.lastSig = before + cp; } else { ac.lastSig = signature; }
                ac.index = -1;
              }
              ac.lastTs = now; ac.options = options;
              return;
            }

            // Path completion
            let base = current;
            let dirPart = '';
            const slash = base.lastIndexOf('/');
            if (slash !== -1) { dirPart = base.slice(0, slash + 1); base = base.slice(slash + 1); }
            const dirPath = buildPath(dirPart);
            const dirNode = ensureDir(dirPath);
            if (!dirNode) { try { audio.trigger('blip'); } catch {} return; }
            const names = listDirectory(dirNode);
            const optionsRaw = names.filter(n => n.startsWith(base));
            const options = optionsRaw.map(n => {
              const node = resolveNode(dirPath.concat(n));
              return dirPart + n + (node && node.type === 'dir' ? '/' : '');
            });
            if (options.length === 0) { try { audio.trigger('blip'); } catch {} return; }
            if (options.length === 1) { const choice = options[0]; const isDir = choice.endsWith('/'); fill(choice, !isDir); ac.lastSig = before + choice + (isDir ? '' : ' '); ac.index=-1; return; }
            const same = (ac.lastSig === signature && (now - ac.lastTs) < 800);
            if (same) {
              ac.index = (ac.index + 1) % options.length;
              const choice = options[ac.index];
              const isDir = choice.endsWith('/');
              fill(choice, !isDir);
              ac.lastSig = before + choice + (isDir ? '' : ' ');
              appendLine(options.join('  '));
            } else {
              const tails = options.map(o => o); // already includes dirPart
              const cp = getCommonPrefix(tails);
              const typed = current;
              if (cp && cp !== typed) { fill(cp, false); ac.lastSig = before + cp; } else { ac.lastSig = signature; }
              ac.index = -1;
            }
            ac.lastTs = now; ac.options = options;
            return;
          }
          if (event.key === "ArrowUp") {
            if (state.historyIndex > 0) {
              state.historyIndex -= 1;
              inputEl.value = state.history[state.historyIndex] || "";
              setTimeout(() => inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length), 0);
            }
            event.preventDefault();
          } else if (event.key === "ArrowDown") {
            if (state.historyIndex < state.history.length - 1) {
              state.historyIndex += 1;
              inputEl.value = state.history[state.historyIndex] || "";
            } else {
              state.historyIndex = state.history.length;
              inputEl.value = "";
            }
            event.preventDefault();
          }
        });

        const boot = () => {
          const lines = getTranslations().boot;
          const leadIn = 360;
          const step = 760;
          const tail = 1800;
          const bootSpan = leadIn + Math.max(lines.length - 1, 0) * step;
          const total = bootSpan + tail;
          audio.bootNoise(total);
          lines.forEach((line, idx) => {
            setTimeout(() => appendLine(line, "system"), leadIn + idx * step);
          });
          const motd = ensureFile(["etc", "motd"]);
          setTimeout(() => {
            audio.stopBootNoise();
            appendLine(motd.content[state.lang], "system");
            setPrompt();
            // default mild trip & noise on boot for atmosphere
            effects.setTrip('soft');
            appendLine(getTranslations().safetyNote, 'system');
            updateMadness();
          }, total);
        };

        const applyLanguage = (lang) => {
          state.lang = (lang === 'en') ? 'en' : 'ru';
          try { document.documentElement.setAttribute('lang', state.lang); } catch {}
        };

        const beginGame = () => {
          if (state.started) return;
          state.started = true;
          setPrompt();
          boot();
          scheduleIdleMonitor();
        };

        const initStartScreen = () => {
          // Block input until language chosen
          try { inputEl.disabled = true; } catch {}
          const pick = (lang) => {
            applyLanguage(lang);
            try { inputEl.disabled = false; inputEl.focus(); } catch {}
            if (startEl) startEl.remove();
            try { document.removeEventListener('keydown', onKey); } catch {}
            beginGame();
          };
          if (startEl) {
            startEl.addEventListener('click', (ev) => {
              const btn = ev.target.closest('[data-lang]');
              if (btn) pick(btn.getAttribute('data-lang'));
            });
          }
          const onKey = (ev) => {
            const k = ev.key || '';
            if (k === 'e' || k === 'E') { pick('en'); document.removeEventListener('keydown', onKey); }
            if (k === 'r' || k === 'R' || k === 'к' || k === 'К') { pick('ru'); document.removeEventListener('keydown', onKey); }
          };
          document.addEventListener('keydown', onKey);
        };

        initStartScreen();
      })();
