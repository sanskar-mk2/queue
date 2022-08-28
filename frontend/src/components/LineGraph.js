import { useEffect } from "react";
import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line,
} from "recharts";
import uniqolor from "uniqolor";

function LineGraph({ line_data }) {
    useEffect(() => {
        console.log("linedata!!!", line_data);
    }, [line_data]);
    return (
        <LineChart
            width={1600}
            height={600}
            data={line_data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.keys(line_data[0])
                .filter((e) => e !== "date")
                .map((e, i) => (
                    <Line
                        key={i}
                        type="monotone"
                        dataKey={e}
                        strokeWidth={3}
                        stroke={uniqolor(e).color}
                    />
                ))}
        </LineChart>
    );
}

export default LineGraph;
