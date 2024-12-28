import React from 'react';

function Calendar() {
    const today = new Date(); // 今日の日付
    const year = today.getFullYear(); // 年
    const month = today.getMonth(); // 月 (0が1月)
    const date = today.getDate(); // 今日の日にち

    // 月の最初の日と最後の日
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // 最初の日の曜日 (0: 日曜日, 1: 月曜日, ...)
    const startDay = firstDayOfMonth.getDay();
    // 月の日数
    const daysInMonth = lastDayOfMonth.getDate();

    // カレンダーの配列を作成
    const calendar = [];
    let currentDay = 1;

    for (let week = 0; week < 5; week++) {
        const weekRow = [];
        for (let day = 0; day < 7; day++) {
            if (week === 0 && day < startDay) {
                // 空白セルを追加
                weekRow.push(null);
            } else if (currentDay > daysInMonth) {
                // 月を超える日は空白セル
                weekRow.push(null);
            } else {
                // 日付を追加
                weekRow.push(currentDay);
                currentDay++;
            }
        }
        calendar.push(weekRow);
    }

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
            <h2>
                {year}年 {month + 1}月
            </h2>
            <table style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        {['お', 'か', 'め', 'い', 'ん', 'こ', '！'].map((day) => (
                            <th key={day} style={{ padding: '5px', border: '1px solid #ddd' }}>
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {calendar.map((week, index) => (
                        <tr key={index}>
                            {week.map((day, idx) => (
                                <td
                                    onClick={() => window.alert("予約しました")}
                                    key={idx}
                                    style={{
                                        padding: '30px',
                                        border: '1px solid #ddd',
                                        backgroundColor: day === date ? '#ffeb3b' : 'white', // 今日をハイライト
                                    }}
                                >
                                    {day || ''}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Calendar;
