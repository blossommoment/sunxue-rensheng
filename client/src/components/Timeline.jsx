import { motion } from "framer-motion";

const items = [
  { year: "2007", title: "北大时光", desc: "少年孙学在学霸BUFF中觉醒。" },
  { year: "2013", title: "创立TRON", desc: "从概念到热度，步步赢。" },
  { year: "2019", title: "巴菲特午餐", desc: "肾结石与午餐的量子纠缠。" },
  { year: "2021", title: "全球行走", desc: "热度与争议并行的艺术。" }
];

export default function Timeline() {
  return (
    <div className="timeline">
      {items.map((item, idx) => (
        <motion.div
          key={item.year}
          className="timeline-item"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <strong>{item.year} · {item.title}</strong>
          <div>{item.desc}</div>
        </motion.div>
      ))}
    </div>
  );
}
