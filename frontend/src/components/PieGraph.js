import { PieChart, Pie, Cell, LabelList } from "recharts";
import uniqolor from "uniqolor";
function PieGraph({ data }) {
    return (
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
            >
                <LabelList position="outside" dataKey="name" stroke="fillColor" fontWeight="bold" />
                {data.map((e, i) => (
                    <Cell key={`cell-${i}`} fill={uniqolor(e.name).color} />
                ))}
            </Pie>
        </PieChart>
    );
}

export default PieGraph;
