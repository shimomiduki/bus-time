// script.js

// --- 時刻表データ (更新しやすいHH:MM形式) ---
// バス停 > 路線 (edoBus, toBus) > 曜日 (weekday, saturday, holiday) > 時刻 (HH:MM形式の文字列配列) の構造
const rawTimetable = {
    "聖路加国際病院（中央区役所行、八重洲口行）": {
        edoBus: { // 江戸バス（南循環）の時刻表
            weekday: [
		//平日時刻（江戸バス）
                "07:57", "08:17", "08:37", "08:57",
                "09:17", "09:37", "09:57", "10:17",
                "10:37", "10:57", "11:17", "11:37",
                "11:57", "12:17", "12:37", "12:57",
                "13:17", "13:37", "13:57", "14:17",
                "14:37", "14:57", "15:17", "15:37",
                "15:57", "16:17", "16:37", "16:57",
                "17:17", "17:37", "17:57", "18:17",
                "18:37", "18:48",
                "19:08", "19:28",
                "19:57"
            ],
            saturday: [
                // 土曜日時刻 (江戸バス)
                "08:20", "08:40", "09:00", "09:20", "09:40", "10:00", "10:20", "10:40",
                "11:00", "11:20", "11:40", "12:00", "12:20", "12:40", "13:00", "13:20",
                "13:40", "14:00", "14:20", "14:40", "15:00", "15:20", "15:40", "16:00",
                "16:20", "16:40", "17:00", "17:20", "17:40", "18:00", "18:20", "18:40",
                "19:00", "19:20", "19:40", "20:00"
            ],
            holiday: [
                // 日曜・祝日時刻 (江戸バス)
                "09:00", "09:20", "09:40", "10:00", "10:20", "10:40", "11:00", "11:20",
                "11:40", "12:00", "12:20", "12:40", "13:00", "13:20", "13:40", "14:00",
                "14:20", "14:40", "15:00", "15:20", "15:40", "16:00", "16:20", "16:40",
                "17:00", "17:20", "17:40", "18:00", "18:20", "18:40", "19:00", "19:20",
                "19:40", "20:00"
            ]
        },
        toBus: { // 都バスの時刻表
             weekday: [
                // 平日時刻 (都バス)
                "06:53", "07:13", "07:34", "07:54", "08:12", "08:30", "08:48", "09:10",
                "09:33", "09:57", "10:26", "10:54", "11:33", "12:12", "12:45", "13:09",
                "13:32", "13:55", "14:17", "14:42", "15:06", "15:31", "15:56", "16:21",
                "16:46", "17:11", "17:37", "18:02", "18:24", "18:45", "19:06", "19:28",
                "20:00", "20:33", "21:07", "21:42"
            ],
            saturday: [
                // 土曜日時刻 (都バス)
                "06:50", "07:14", "07:38", "08:03", "08:28", "08:52",
                "09:17", "09:42", "10:09", "10:36", "11:03","11:27","11:54",
                "12:20", "12:46", "13:12", "13:37", "14:03", "14:28","14:54",
                "15:23", "15:50", "16:16", "16:43", "17:09", "17:34",
                "18:00", "18:26", "18:50", "19:14", "19:47", "20:18", "20:50",
                "21:21", "21:50"
            ],
            holiday: [
                // 日曜・祝日時刻 (都バス)
                "06:48", "07:19", "07:50", "08:20", "08:52",
                "09:23", "09:55", "10:26", "10:51", "11:16","11:38","11:59",
                "12:20", "12:41", "13:03", "13:26", "13:49", "14:11", "14:33","14:58",
                "15:22", "15:52", "16:18", "16:47", "17:19",
                "18:00", "18:35", "19:22", "20:11","21:00", "21:50"
            ]
        }
    },
    "新富二丁目（北循環）": {
         edoBus: { // 
             weekday: [
                "07:08", "07:28", "07:48", "08:08", "08:28", "08:48", "09:08", "09:28",
                "09:48", "10:08", "10:28", "10:48", "11:08", "11:28", "11:48", "12:08",
                "12:28", "12:48", "13:08", "13:28", "13:48", "14:08", "14:28", "14:48",
                "15:08", "15:28", "15:48", "16:08", "16:28", "16:48", "17:08", "17:28",
                "17:48", "18:08", "18:28", "18:48", "19:08"
            ],
            saturday: [
                "07:23", "07:43", "08:03", "08:23", "08:43", "09:03", "09:23", "09:43",
                "10:03", "10:23", "10:43", "11:03", "11:23", "11:43", "12:03", "12:23",
                "12:43", "13:03", "13:23", "13:43", "14:03", "14:23", "14:43", "15:03",
                "15:23", "15:43", "16:03", "16:23", "16:43", "17:03", "17:23", "17:43",
                "18:03", "18:23", "18:43", "19:03"
            ],
            holiday: [
                "08:03", "08:23", "08:43", "09:03", "09:23", "09:43", "10:03", "10:23",
                "10:43", "11:03", "11:23", "11:43", "12:03", "12:23", "12:43", "13:03",
                "13:23", "13:43", "14:03", "14:23", "14:43", "15:03", "15:23", "15:43",
                "16:03", "16:23", "16:43", "17:03", "17:23", "17:43", "18:03", "18:23",
                "18:43", "19:03"
            ]
        }
    },
    "湊三丁目（新川方面）": { // 
         edoBus: { // 江戸バス（南循環）の時刻表
             weekday: [
                // 平日時刻 (江戸バス)
                "07:09", "07:29", "07:49", "08:09", "08:29", "08:49", "09:09", "09:29",
                "09:49", "10:09", "10:29", "10:49", "11:09", "11:29", "11:49", "12:09",
                "12:29", "12:49", "13:09", "13:29", "13:49", "14:09", "14:29", "14:49",
                "15:09", "15:29", "15:49", "16:09", "16:29", "16:49", "17:09", "17:29",
                "17:49", "18:09", "18:29", "18:49"
            ],
            saturday: [
                // 土曜日時刻 (江戸バス)
                "07:37", "07:57", "08:17", "08:37", "08:57", "09:17", "09:37", "09:57",
                "10:17", "10:37", "10:57", "11:17", "11:37", "11:57", "12:17", "12:37",
                "12:57", "13:17", "13:37", "13:57", "14:17", "14:37", "14:57", "15:17",
                "15:37", "15:57", "16:17", "16:37", "16:57", "17:17", "17:37", "17:57",
                "18:17", "18:37", "18:57"
            ],
            holiday: [
                // 日曜・祝日時刻 (江戸バス)
                "08:17", "08:37", "08:57", "09:17", "09:37", "09:57", "10:17", "10:37",
                "10:57", "11:17", "11:37", "11:57", "12:17", "12:37", "12:57", "13:17",
                "13:37", "13:57", "14:17", "14:37", "14:57", "15:17", "15:37", "15:57",
                "16:17", "16:37", "16:57", "17:17", "17:37", "17:57", "18:17", "18:37",
                "18:57"
            ]
        },
        toBus: { // 都バスの時刻表
            weekday: [
                // 平日時刻 (都バス)
                "06:55", "07:15", "07:36", "07:56", "08:14", "08:32", "08:50", "09:12",
                "09:35", "09:59", "10:28", "10:56", "11:35", "12:14", "12:47", "13:11",
                "13:34", "13:57", "14:19", "14:44", "15:08", "15:33", "15:58", "16:23",
                "16:48", "17:13", "17:39", "18:04", "18:26", "18:47", "19:08", "19:30",
                "20:02", "20:35", "21:09", "21:44"
            ],
            saturday: [
                // 土曜日時刻 (都バス)
                "06:52", "07:16", "07:40", "08:05", "08:30", "08:54", "09:19", "09:44",
                "10:11", "10:38", "11:05", "11:29", "11:56", "12:22", "12:48", "13:14",
                "13:39", "14:05", "14:30", "14:56", "15:25", "15:52", "16:18", "16:45",
                "17:11", "17:36", "18:02", "18:28", "18:52", "19:16", "19:49", "20:20",
                "20:52", "21:23", "21:52"
            ],
            holiday: [
                // 日曜祝日時刻 (都バス)
                "06:50", "07:21", "07:52", "08:22", "08:54", "09:25", "09:57", "10:28",
                "10:53", "11:18", "11:40", "12:01", "12:22", "12:43", "13:05", "13:28",
                "13:51", "14:13", "14:35", "15:00", "15:24", "15:54", "16:20", "16:49",
                "17:21", "18:02", "18:37", "19:24", "20:13", "21:02", "21:52"
            ]
        }
    }
};

// --- 計算用の時刻表データ (0時0分からの合計分数形式) ---
// rawTimetable を変換して格納します。
let calculatedTimetable = null;

// --- HH:MM形式の文字列を0時0分からの合計分数に変換する関数 ---
function timeStringToMinutes(timeString) {
    // ":" が含まれていない場合は、HHMM形式と仮定して ":" を挿入
    if (timeString.indexOf(':') === -1) {
        if (timeString.length === 4) {
            timeString = timeString.substring(0, 2) + ':' + timeString.substring(2, 4);
        } else if (timeString.length === 3) { // 例: 715 -> 07:15
             timeString = '0' + timeString.substring(0, 1) + ':' + timeString.substring(1, 3);
        }
    }
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
}

// --- rawTimetable を calculatedTimetable に変換する関数 ---
function convertTimetable() {
    calculatedTimetable = {};
    // 各バス停、各路線、各曜日ごとに変換
    for (const busStop in rawTimetable) {
        calculatedTimetable[busStop] = {};
        for (const route in rawTimetable[busStop]) {
            calculatedTimetable[busStop][route] = {
                weekday: rawTimetable[busStop][route].weekday.map(timeString => timeStringToMinutes(timeString)),
                saturday: rawTimetable[busStop][route].saturday.map(timeString => timeStringToMinutes(timeString)),
                holiday: rawTimetable[busStop][route].holiday.map(timeString => timeStringToMinutes(timeString))
            };
        }
    }
    console.log("時刻表データを計算用に変換しました。");
}

// スクリプト読み込み時に時刻表データを変換
convertTimetable();


// --- DOM要素を取得 ---
const searchButton = document.getElementById('searchButton');
const busStopSelect = document.getElementById('busStopSelect');
const minutesUntilNextBusDiv = document.getElementById('minutesUntilNextBus');
const timetableDisplayDiv = document.getElementById('timetableDisplay');
// 各曜日の各路線リスト要素を取得
const weekdayTimetableListEdo = document.getElementById('weekdayTimetableEdo').querySelector('.timetable-list');
const weekdayTimetableListTo = document.getElementById('weekdayTimetableTo').querySelector('.timetable-list');
const saturdayTimetableListEdo = document.getElementById('saturdayTimetableEdo').querySelector('.timetable-list');
const saturdayTimetableListTo = document.getElementById('saturdayTimetableTo').querySelector('.timetable-list');
const holidayTimetableListEdo = document.getElementById('holidayTimetableEdo').querySelector('.timetable-list');
const holidayTimetableListTo = document.getElementById('holidayTimetableTo').querySelector('.timetable-list');

// --- 検索ボタンにイベントリスナーを設定 ---
searchButton.addEventListener('click', searchNextBus);

// --- 現在の曜日を取得する関数 ---
// 戻り値: 'weekday', 'saturday', 'holiday' のいずれか
function getCurrentDayType() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0:日曜日, 1:月曜日, ..., 6:土曜日

    // 祝日判定は複雑なので、ここでは単純に土曜日と日曜祝日を分けます。
    // 実際のアプリでは祝日APIなどを利用する必要があります。
    if (dayOfWeek === 6) {
        return 'saturday'; // 土曜日
    } else if (dayOfWeek === 0) {
         // 簡単のため、日曜日は祝日扱いとします
        return 'holiday'; // 日曜日・祝日
    } else {
        return 'weekday'; // 平日 (月〜金)
    }
}

// --- 次のバスを検索して表示する関数 ---
function searchNextBus() {
    const selectedBusStop = busStopSelect.value; // 選択されたバス停
    const currentDayType = getCurrentDayType(); // 現在の曜日タイプ

    // 選択されたバス停の時刻表データを取得
    const busStopTimetable = calculatedTimetable[selectedBusStop];
    const rawBusStopTimetable = rawTimetable[selectedBusStop]; // 表示用

    const now = new Date();
    // 現在時刻を「0時0分からの合計分数」に変換
    const currentMinutesTotal = now.getHours() * 60 + now.getMinutes();

    let nextBusTime = null; // 次に早いバスの時刻（分単位）
    let nextBusRoute = ''; // 次に早いバスの路線 ('江戸バス' または '都バス')

    // 江戸バスの次の便を検索
    const nextEdoBusTime = busStopTimetable.edoBus ? findNextDeparture(busStopTimetable.edoBus[currentDayType], currentMinutesTotal) : null;

    // 都バスの次の便を検索 (都バスがあるバス停のみ)
    let nextToBusTime = null;
    if (busStopTimetable.toBus) {
        nextToBusTime = findNextDeparture(busStopTimetable.toBus[currentDayType], currentMinutesTotal);
    }

    // 次に早いバスを判定
    if (nextEdoBusTime !== null && (nextToBusTime === null || nextEdoBusTime <= nextToBusTime)) {
        nextBusTime = nextEdoBusTime;
        nextBusRoute = '江戸バス';
    } else if (nextToBusTime !== null) {
        nextBusTime = nextToBusTime;
        nextBusRoute = '都バス';
    }

    // 結果表示エリアをクリア
    minutesUntilNextBusDiv.innerHTML = '';
    // 全ての時刻表リストをクリア
    document.querySelectorAll('.timetable-list').forEach(ul => ul.innerHTML = '');

    // 曜日ごとの時刻表セクションを全て非表示にする
    document.querySelectorAll('.timetable-section').forEach(section => section.classList.add('hidden'));

    // 該当する曜日の時刻表セクションを表示する
    const currentDaySectionId = `${currentDayType}Timetable`;
    document.getElementById(currentDaySectionId).classList.remove('hidden');

    // 該当曜日の江戸バス時刻表を表示
    if (rawBusStopTimetable.edoBus && rawBusStopTimetable.edoBus[currentDayType]) { // 該当曜日のデータが存在するか確認
         displayTimetableList(rawBusStopTimetable.edoBus[currentDayType], document.getElementById(`${currentDayType}TimetableEdo`).querySelector('.timetable-list'));
         document.getElementById(`${currentDayType}TimetableEdo`).classList.remove('hidden'); // 江戸バスのセクションを表示
    } else {
         // データがない場合はセクションを非表示にする
         document.getElementById(`${currentDayType}TimetableEdo`).classList.add('hidden');
    }


    // 該当曜日の都バス時刻表を表示 (都バスがあるバス停のみ)
    if (rawBusStopTimetable.toBus && rawBusStopTimetable.toBus[currentDayType]) { // 該当曜日のデータが存在するか確認
         document.getElementById(`${currentDayType}TimetableTo`).classList.remove('hidden'); // 都バスのセクションを表示
         displayTimetableList(rawBusStopTimetable.toBus[currentDayType], document.getElementById(`${currentDayType}TimetableTo`).querySelector('.timetable-list'));
    } else {
         // 都バスがないバス停の場合はセクションを非表示にする
         document.getElementById(`${currentDayType}TimetableTo`).classList.add('hidden');
    }


    // 次のバスが見つかった場合
    if (nextBusTime !== null) {
        // 次のバスまでの残り時間を分で計算
        const minutesUntilNextBus = nextBusTime - currentMinutesTotal;

        // 残り時間を時間と分に変換して表示形式を決定
        let timeUntilNextBusText = '';
        if (minutesUntilNextBus >= 60) {
            const hours = Math.floor(minutesUntilNextBus / 60);
            const minutes = minutesUntilNextBus % 60;
            timeUntilNextBusText = `${hours}時間${minutes}分後`;
        } else {
            timeUntilNextBusText = `${minutesUntilNextBus}分後`;
        }


        // 「あと何分後」を表示
        minutesUntilNextBusDiv.innerHTML = `
            <p><strong>${selectedBusStop}</strong></p>
            <p>次に早いバス: <strong>約 ${timeUntilNextBusText}</strong> です。</p>
            <p>（${nextBusRoute}）</p>
            <p>出発予定時刻: ${Math.floor(nextBusTime / 60).toString().padStart(2, '0')}時${(nextBusTime % 60).toString().padStart(2, '0')}分</p>
        `;
    } else {
        // 本日の運行が終了している場合
         minutesUntilNextBusDiv.innerHTML = `
            <p><strong>${selectedBusStop}</strong></p>
            <p>本日のバスは終了しました。</p>
        `;
    }
}

// --- 現在時刻より後の最初の出発時刻を見つけるヘルパー関数 ---
// timetable: 時刻の配列 (分単位)
// currentMinutesTotal: 現在時刻 (分単位)
// 戻り値: 次の出発時刻 (分単位) または null (本日の運行終了)
function findNextDeparture(timetable, currentMinutesTotal) {
    // 時刻表を順番に見ていく
    for (let i = 0; i < timetable.length; i++) {
        // 現在時刻以上の時刻が見つかったら、それが次の出発時刻
        if (timetable[i] >= currentMinutesTotal) {
            return timetable[i];
        }
    }
    // 時刻表の最後まで見ても見つからなかった場合、本日の運行は終了
    return null;
}

// --- 時刻表リストを表示する関数 ---
function displayTimetableList(timetable, ulElement) {
    if (!timetable || timetable.length === 0) {
        ulElement.innerHTML = '<li>時刻表データがありません。</li>';
        return;
    }
    ulElement.innerHTML = timetable.map(time => `<li>${time}</li>`).join('');
}


// --- PWA (Progressive Web App) 関連の処理 ---
// Service Workerを登録します。
// Service Workerはバックグラウンドで動作し、オフラインでのキャッシュなどを担当します。
// 注意: Service Workerは 'file://' から開いたローカルファイルでは動作しません。
//       ウェブサーバー経由でアクセスする必要があります。
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js') // sw.js のパスを指定
            .then(registration => {
                // 登録成功
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                // 登録失敗
                console.log('Service Worker registration failed:', error);
            });
    });
}
