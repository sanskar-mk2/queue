import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useEffect, useRef, useState } from "react";
import uniqolor from "uniqolor";
import PieGraph from "../components/PieGraph";
import { BlockConstants } from "../constants/BlockConstants";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBlocksContext } from "../hooks/useBlocksContext";
dayjs.extend(utc);

function BlocksHome() {
    const { time_slots, dispatch } = useBlocksContext();
    const { user } = useAuthContext();

    const [hours, set_hours] = useState([]);
    const [days, set_days] = useState([]);
    // const [time_slots, set_time_slots] = useState([]);
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
                date: start.toISOString(),
                lit: false,
                input: false,
                title: "",
            });
            ref.current.push(null);
            start = start.add(1, "hour");
            idx += 1;
        }
        dispatch({
            type: BlockConstants.SEED_BLOCKS,
            payload: [...time_slots],
        });
        set_hours([
            ...new Set(time_slots.map((e) => dayjs(e.date).utc().hour())),
        ]);
        set_days([
            ...new Set(time_slots.map((e) => dayjs(e.date).utc().date())),
        ]);
        const fetch_blocks = async () => {
            const respone = await fetch("/api/blocks", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const json = await respone.json();
            if (respone.ok) {
                dispatch({
                    type: BlockConstants.CREATE_BLOCK,
                    payload: json,
                });
            }
        };
        if (user) {
            fetch_blocks();
        }
    }, [dispatch, user]);

    const light_up = (f) => {
        dispatch({
            type: BlockConstants.LIGHT_UP,
            payload: f,
        });
    };

    const input_box = (obj) => {
        const blocks = time_slots.map((e) => {
            if (dayjs(obj.date).utc().unix() === dayjs(e.date).utc().unix()) {
                return { ...e, input: true };
            } else {
                return e;
            }
        });
        dispatch({
            type: BlockConstants.SEED_BLOCKS,
            payload: blocks,
        });
        ref.current[obj.idx].focus();
    };

    const handle_upsert = async (title, timestamp) => {
        if (!user) {
            console.error("You must be logged in");
            return;
        }

        const block = { title, timestamp };
        const response = await fetch("/api/blocks", {
            method: "PUT",
            body: JSON.stringify(block),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        });

        const json = await response.json();

        if (!response.ok) {
            console.error(json.error);
        }

        if (response.ok) {
            console.log(json);
            dispatch({
                type: BlockConstants.UPDATE_BLOCK,
                payload: {
                    _id: json._id,
                    title: json.title,
                    date: json.timestamp,
                },
            });
        }
        return response.ok;
    };

    const handle_delete = async (_id, timestamp) => {
        if (!user) {
            console.error("You must be logged in");
            return;
        }

        const response = await fetch(`/api/blocks/${_id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        const json = await response.json();

        if (!response.ok) {
            console.error(json.error);
        }

        if (response.ok) {
            console.log(json);
            dispatch({
                type: BlockConstants.DELETE_BLOCK,
                payload: {
                    date: timestamp,
                },
            });
        }
        return response.ok;
    };

    const focus_lost = async (obj) => {
        if (obj.title !== ref.current[obj.idx].value) {
            let resp;
            if (ref.current[obj.idx].value === "") {
                resp = await handle_delete(obj._id, obj.date);
            } else {
                resp = await handle_upsert(
                    ref.current[obj.idx].value,
                    obj.date
                );
            }
            if (!resp) {
                ref.current[obj.idx].value = obj.title;
            }
        } else {
            const blocks = time_slots.map((e) => {
                if (
                    dayjs(obj.date).utc().unix() === dayjs(e.date).utc()?.unix()
                ) {
                    return {
                        ...e,
                        input: false,
                    };
                } else {
                    return e;
                }
            });
            dispatch({ type: BlockConstants.SET_BLOCKS, payload: blocks });
        }

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
        dispatch({
            type: BlockConstants.LIGHTS_OFF,
        });
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
                                    .filter(
                                        (e) => dayjs(e.date).utc().hour() === h
                                    )
                                    .map((f) => (
                                        <td
                                            onMouseEnter={() => light_up(f)}
                                            onClick={() => input_box(f)}
                                            title={dayjs(f.date)
                                                .utc()
                                                .toString()}
                                            style={{
                                                backgroundColor: ref.current[
                                                    f.idx
                                                ]?.value
                                                    ? uniqolor(
                                                          ref.current[f.idx]
                                                              .value
                                                      ).color
                                                    : "",
                                                borderStyle: ref.current[f.idx]
                                                    ?.value
                                                    ? "solid"
                                                    : "",
                                            }}
                                            className={`${
                                                f.lit ? "bg-green-300" : ""
                                            } w-8 h-8 relative border-dashed rounded-md border-2 border-pink-800`}
                                            key={dayjs(f.date).utc().unix()}
                                        >
                                            <input
                                                list="hints"
                                                onBlur={() => focus_lost(f)}
                                                className={`${
                                                    f.input
                                                        ? "p-2 bottom-8 left-8"
                                                        : "top-0 left-0 w-0 opacity-0"
                                                } absolute rounded-bl-none rounded-tr-full rounded-tl-full rounded-br-full h-8`}
                                                ref={(e) =>
                                                    (ref.current[f.idx] = e)
                                                }
                                                defaultValue={f.title}
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
