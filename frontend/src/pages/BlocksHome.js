import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
dayjs.extend(utc);

function BlocksHome() {
    const [hours, set_hours] = useState([]);
    const [days, set_days] = useState([]);
    const [time_slots, set_time_slots] = useState([]);
    useEffect(() => {
        let start = dayjs().utc().startOf("month");
        const end = dayjs().utc().endOf("month");
        const time_slots = [];
        while (start.isBefore(end)) {
            time_slots.push({ date: start, lit: false });
            start = start.add(1, "hour");
        }
        set_time_slots([...time_slots]);
        set_hours([...new Set(time_slots.map((e) => e.date.hour()))]);
        set_days([...new Set(time_slots.map((e) => e.date.date()))]);
    }, []);
    const light_up = (f) => {
        set_time_slots(
            time_slots.map((u) => {
                if (
                    u.date.date() === f.date.date() ||
                    u.date.hour() === f.date.hour()
                ) {
                    return { ...u, lit: true };
                } else {
                    return { ...u, lit: false };
                }
            })
        );
    };

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        {days.map((e) => (
                            <th key={e}>{e}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {hours.map((h) => (
                        <tr key={h}>
                            <td className="font-bold">{h}</td>
                            {time_slots
                                .filter((e) => e.date.hour() === h)
                                .map((f) => (
                                    <td
                                        onMouseEnter={() => light_up(f)}
                                        title={f.date.toString()}
                                        className={`${
                                            f.lit ? "bg-green-300" : ""
                                        } w-8 h-8 border-dashed rounded-md border-2 border-pink-800`}
                                        key={f.date.unix()}
                                    ></td>
                                ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default BlocksHome;
