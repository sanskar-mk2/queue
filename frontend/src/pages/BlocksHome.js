import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useEffect, useRef, useState } from "react";
import uniqolor from "uniqolor";
dayjs.extend(utc);

function BlocksHome() {
    const [hours, set_hours] = useState([]);
    const [days, set_days] = useState([]);
    const [time_slots, set_time_slots] = useState([]);
    // const [hints, set_hints] = useState([]);
    const ref = useRef([]);
    useEffect(() => {
        console.log(uniqolor(""));
        let start = dayjs().utc().startOf("month");
        const end = dayjs().utc().endOf("month");
        const time_slots = [];
        let idx = 0;
        while (start.isBefore(end)) {
            time_slots.push({
                idx: idx,
                date: start,
                lit: false,
                input: false,
            });
            ref.current.push(null);
            start = start.add(1, "hour");
            idx += 1;
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

    const input_box = (obj) => {
        set_time_slots(
            time_slots.map((e) => {
                if (obj.date.unix() === e.date.unix()) {
                    return { ...e, input: true };
                } else {
                    return e;
                }
            })
        );
        ref.current[obj.idx].focus();
    };

    const focus_lost = (obj) => {
        set_time_slots(
            time_slots.map((e) => {
                if (obj.date.unix() === e.date?.unix()) {
                    return { ...e, input: false };
                } else {
                    return e;
                }
            })
        );
        // set_hints([...new Set(ref.current.map((e) => e.value))]);
    };

    const key_down = (e) => {
        if (e.key === "Enter") {
            e.target.blur();
        }
    };

    const lights_out = () => {
        set_time_slots(
            time_slots.map((e) => {
                return { ...e, lit: false };
            })
        );
    };

    return (
        <>
            {/* <datalist id="hints">{hints.map()}</datalist> */}
            <table onMouseLeave={() => lights_out()}>
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
                                        onClick={() => input_box(f)}
                                        title={f.date.toString()}
                                        style={{
                                            backgroundColor: ref.current[f.idx]
                                                ?.value
                                                ? uniqolor(
                                                      ref.current[f.idx].value,
                                                      { lightness: 75 }
                                                  ).color
                                                : "#ffffff00",
                                            borderStyle: ref.current[f.idx]
                                                ?.value
                                                ? "solid"
                                                : "",
                                        }}
                                        className={`${
                                            f.lit ? "bg-green-300" : ""
                                        } w-8 h-8 border-dashed rounded-md border-2 border-pink-800`}
                                        key={f.date.unix()}
                                    >
                                        <input
                                            onBlur={() => focus_lost(f)}
                                            className={`${
                                                f.input ? "" : "w-0"
                                            }`}
                                            ref={(e) =>
                                                (ref.current[f.idx] = e)
                                            }
                                            onKeyDown={(e) => key_down(e)}
                                        />
                                    </td>
                                ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default BlocksHome;
