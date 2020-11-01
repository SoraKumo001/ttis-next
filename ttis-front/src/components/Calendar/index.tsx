import { JSWindow } from '@jswf/react';
import { useState } from 'react';

const weekStr = ['日', '月', '火', '水', '木', '金', '土'];

interface Props {
  date?: Date;
  onDate?: (date: Date) => void;
}

export const CalendarView = ({ date, onDate }: Props) => {
  const [nowDate, setNowDate] = useState(date || new Date());
  const days: number[] = [];
  const day = new Date(nowDate.getFullYear(), nowDate.getMonth());

  day.setDate(1 - day.getDay());
  for (let i = 0; i < 7 * 6; i++) {
    days[i] = day.getTime();
    day.setDate(day.getDate() + 1);
  }
  return (
    <>
      <style jsx>{`
        .root {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .period {
          display: flex;
          padding: 0.2em;
        }
        .period > div {
          display: flex;
          flex: 1;
          justify-content: center;
        }
        .period > div > div {
          margin: 0 1ex;
        }
        .calendar {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .weeks {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
        }
        .week {
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          background-color: #cccccc;
          margin: 1px;
        }
        .week:nth-of-type(1) {
          color: red;
        }
        .week:nth-last-of-type(1) {
          color: blue;
        }
        .days {
          background-color: #aaaaaa;
          flex: 1;
          display: grid;
          grid-template-columns: repeat(7, 1fr);
        }
        .day {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          background-color: #eeeeee;
          padding: 0 0.5em;
          margin: 1px;
        }
        .day:hover {
          text-decoration: underline;
        }
      `}</style>
      <JSWindow title="Calendar">
        <div className="root">
          <div className="period">
            <div className="year">
              <button
                onClick={() => setNowDate(new Date(nowDate.setFullYear(nowDate.getFullYear() - 1)))}
              >
                ←
              </button>
              <div>{nowDate.getFullYear()}年</div>
              <button
                onClick={() => setNowDate(new Date(nowDate.setFullYear(nowDate.getFullYear() + 1)))}
              >
                →
              </button>
            </div>
            <div className="month">
              <button
                onClick={() => setNowDate(new Date(nowDate.setMonth(nowDate.getMonth() - 1)))}
              >
                ←
              </button>
              <div>{nowDate.getMonth() + 1}月</div>
              <button
                onClick={() => setNowDate(new Date(nowDate.setMonth(nowDate.getMonth() + 1)))}
              >
                →
              </button>
            </div>
          </div>
          <div className="calendar">
            <div className="weeks">
              {weekStr.map((name) => (
                <div className="week" key={name}>
                  {name}
                </div>
              ))}
            </div>
            <div className="days">
              {days.map((day) => (
                <div className="day" key={day} onClick={() => onDate && onDate(new Date(day))}>
                  {new Date(day).getDate()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </JSWindow>
    </>
  );
};
