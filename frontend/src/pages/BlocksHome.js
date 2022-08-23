import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useEffect, useRef, useState } from "react";
import uniqolor from "uniqolor";
import PieGraph from "../components/PieGraph";
dayjs.extend(utc);

function BlocksHome() {
    const [hours, set_hours] = useState([]);
    const [days, set_days] = useState([]);
    const [time_slots, set_time_slots] = useState([]);
    const [hints, set_hints] = useState([]);
    const [pie_data, set_pie_data] = useState([]);
    const ref = useRef([]);
    useEffect(() => {
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
        const hints = [...new Set(ref.current.map((e) => e?.value))];
        const clean_hints = hints.filter((e) => e);
        set_hints([...clean_hints]);
        const data = [];
        clean_hints.forEach((e) => {
            data.push({ name: e, value: 0 });
        });
        ref.current.forEach((e) => {
            if (e?.value) {
                const idx = data.findIndex((f) => e.value === f.name);
                data[idx].value += 1;
            }
        });
        set_pie_data([...data]);
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
        <div className="flex">
            <datalist id="hints">
                {hints.map((e, i) => (
                    <option key={i} value={e} />
                ))}
            </datalist>
            <div className="grow">
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
                                                backgroundColor: ref.current[
                                                    f.idx
                                                ]?.value
                                                    ? uniqolor(
                                                          ref.current[f.idx]
                                                              .value,
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
                                                list="hints"
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
            </div>
            <PieGraph data={pie_data} />
        </div>
    );
}

export default BlocksHome;
